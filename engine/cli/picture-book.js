#!/usr/bin/env node
// picture-book: init, new, build, check. Plain Node, no dependencies.
'use strict';
const fs = require('fs'), path = require('path'), vm = require('vm');

const ROOT = path.resolve(__dirname, '..', '..');
const ENG = path.join(ROOT, 'engine'), BOOKS = path.join(ROOT, 'books');
const SITE = path.join(ROOT, 'site'), OUT = path.join(ROOT, 'out');

const read = p => fs.readFileSync(p, 'utf8');
const write = (p, s) => { fs.mkdirSync(path.dirname(p), { recursive: true }); fs.writeFileSync(p, s); };
const expr = p => read(p).trim().replace(/;\s*$/, '');           // a file holding one expression
const evalFile = p => vm.runInNewContext('(' + expr(p) + '\n)', {}, { filename: p });
const fill = (s, map) => Object.entries(map).reduce((a, [k, v]) => a.split('{{' + k + '}}').join(v), s);
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
const die = m => { console.error('error: ' + m); process.exit(1); };

const shelf = () => evalFile(path.join(BOOKS, 'shelf.js'));
const slugs = args => (args.length && !args.includes('--all') ? args : shelf());

function loadBook(slug) {
  const dir = path.join(BOOKS, slug);
  if (!fs.existsSync(dir)) die(`no book at books/${slug}`);
  const config = evalFile(path.join(dir, 'book.config.js'));
  const cut = evalFile(path.join(dir, 'cut.js'));
  const pages = cut.map(name => {
    const pd = path.join(dir, 'pages', name);
    for (const f of ['lines.js', 'scene.js']) if (!fs.existsSync(path.join(pd, f))) die(`books/${slug}/pages/${name}/${f} is missing (named in cut.js)`);
    return { name, lines: expr(path.join(pd, 'lines.js')), scene: expr(path.join(pd, 'scene.js')) };
  });
  const onDisk = fs.readdirSync(path.join(dir, 'pages')).filter(n => fs.statSync(path.join(dir, 'pages', n)).isDirectory());
  const unused = onDisk.filter(n => !cut.includes(n));
  const helpers = fs.existsSync(path.join(dir, 'helpers.js')) ? read(path.join(dir, 'helpers.js')) : '';
  return { slug, dir, config, cut, pages, helpers, unused };
}

function bookJs(b) {
  const sc = b.pages.map(p => `/* ${p.name} */ Object.assign({name:${JSON.stringify(p.name)}},\n${p.lines},\n${p.scene})`).join(',\n\n');
  return [read(path.join(ENG, 'runtime/shapes.js')), read(path.join(ENG, 'runtime/cast.js')), b.helpers,
    `/* ---------- the pages, in cut order ---------- */\nconst SC=[\n${sc}\n];`, read(path.join(ENG, 'runtime/book.js'))].join('\n\n');
}

const SKELETON = '<!doctype html><html lang="en"><head><meta charset="utf-8">' +
  '<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">' +
  '<style>:root{color-scheme:light;box-sizing:border-box;padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}' +
  'body{margin:0;font:14px -apple-system,BlinkMacSystemFont,sans-serif}img{max-width:100%}[hidden]{display:none!important}</style></head><body>\n{{BODY}}\n</body></html>\n';

const bookBody = b => fill(read(path.join(ENG, 'runtime/shell.html')), { CSS: read(path.join(ENG, 'runtime/book.css')), JS: bookJs(b), TITLE: esc(b.config.title) });

function check(slug) {
  const b = loadBook(slug), out = [];
  const el = () => new Proxy(function () {}, { get: (t, k) => k === 'querySelectorAll' ? () => [] : k === 'dataset' ? {} : el(), set: () => true, apply: () => el() });
  const ctx = { document: { getElementById: el, addEventListener() {} }, window: {}, setTimeout() {}, clearTimeout() {}, console, __out: out };
  vm.createContext(ctx);
  vm.runInContext(bookJs(b) + `;
const __lum=c=>{const h=/^#([0-9a-f]{6})$/i.exec(c);if(!h)return 1;const n=parseInt(h[1],16);return(.299*(n>>16)+.587*((n>>8)&255)+.114*(n&255))/255};
SC.forEach((sc,i)=>{const at='page '+i+' ('+sc.name+')';
  for(const k of ['bg','cap','hint','draw'])if(!sc[k])__out.push('WARN '+at+': missing '+k);
  if(__lum(sc.bg)<.7&&!sc.dark)__out.push('WARN '+at+': background '+sc.bg+' is dark; use a pale P.* colour or set dark:true');
  if(/\\u2014/.test(sc.cap||''))__out.push('WARN '+at+': em dash in the caption');
  let tappable=false;
  for(const n of [0,1,2,3,4,5,7,9,12,30]){S={n};const s=sc.draw(S);
    if(/NaN|undefined/.test(s))throw new Error(at+' at '+n+' taps: '+s.match(/.{0,60}(NaN|undefined).{0,20}/)[0]);
    if(/data-tap/.test(s))tappable=true;}
  if(!tappable)__out.push('WARN '+at+': nothing to tap');
});
__out.push('ok: '+SC.length+' spreads (cover + '+(SC.length-1)+' pages)');`, ctx, { filename: `books/${slug}` });
  for (const u of b.unused) out.unshift(`WARN pages/${u} exists but is not in cut.js`);
  console.log(`${slug}\n  ` + [...new Set(out)].join('\n  '));
}

function build(args) {
  const artifact = args.includes('--artifact'), root = args.includes('--root'), dest = root ? ROOT : SITE, label = root ? '' : 'site/';
  const list = slugs(args.filter(a => !a.startsWith('--') || a === '--all'));
  for (const slug of list) {
    const b = loadBook(slug), body = bookBody(b);
    if (artifact) { write(path.join(OUT, slug + '.html'), body); console.log(`out/${slug}.html (page body, for publishing as an Artifact)`); continue; }
    write(path.join(dest, slug, 'index.html'), fill(SKELETON, { BODY: body }));
    for (const a of b.config.aliases || [])
      write(path.join(dest, a), `<!doctype html><meta charset="utf-8"><title>${esc(b.config.title)}</title><meta http-equiv="refresh" content="0; url=${slug}/"><p><a href="${slug}/">${esc(b.config.title)}</a></p>\n`);
    console.log(`${label}${slug}/index.html`);
  }
  if (artifact) return;
  const cards = shelf().map(s => { const c = evalFile(path.join(BOOKS, s, 'book.config.js'));
    return `    <li><a href="${s}/">\n      <div class="swatch" style="background:${esc(c.swatch || '#a9d5e8')}">${esc(c.tag || '')}</div>\n      <h2>${esc(c.title)}</h2>\n      <p>${esc(c.blurb || '')}</p></a></li>`; }).join('\n');
  write(path.join(dest, 'index.html'), fill(read(path.join(ENG, 'site/index.html')), { CARDS: cards }));
  if (root) write(path.join(dest, '.nojekyll'), '');
  console.log(label + 'index.html');
}

function copyDir(from, to, map) {
  for (const e of fs.readdirSync(from, { withFileTypes: true })) {
    const f = path.join(from, e.name), t = path.join(to, e.name);
    if (e.isDirectory()) copyDir(f, t, map); else write(t, fill(read(f), map));
  }
}

function init([slug, title]) {
  if (!slug || !title) die('usage: picture-book init <slug> "<Title>"');
  const dir = path.join(BOOKS, slug);
  if (fs.existsSync(dir)) die(`books/${slug} already exists`);
  copyDir(path.join(ENG, 'template/book'), dir, { TITLE: title.replace(/'/g, '’') });
  console.log(`books/${slug}/ created. Add '${slug}' to books/shelf.js when it is ready to appear on the site.`);
}

function newPage([slug, page]) {
  if (!slug || !page) die('usage: picture-book new <slug> <page>');
  const dir = path.join(BOOKS, slug, 'pages', page);
  if (!fs.existsSync(path.join(BOOKS, slug))) die(`no book at books/${slug}`);
  if (fs.existsSync(dir)) die(`books/${slug}/pages/${page} already exists`);
  copyDir(path.join(ENG, 'template/page'), dir, {});
  console.log(`books/${slug}/pages/${page}/ created. Add '${page}' to books/${slug}/cut.js where it belongs in the story.`);
}

const [cmd, ...args] = process.argv.slice(2);
if (cmd === 'build') build(args);
else if (cmd === 'check') slugs(args).forEach(check);
else if (cmd === 'init') init(args);
else if (cmd === 'new') newPage(args);
else { console.log('usage: picture-book <init <slug> "<Title>" | new <slug> <page> | build [slug...|--all] [--artifact|--root] | check [slug...|--all]>'); process.exit(cmd ? 1 : 0); }
