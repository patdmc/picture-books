#!/usr/bin/env node
// picture-book: init, new, build, check. Plain Node, no dependencies.
'use strict';
const fs = require('fs'), path = require('path'), vm = require('vm');

const ROOT = path.resolve(__dirname, '..', '..');
const ENG = path.join(ROOT, 'engine'), BOOKS = path.join(ROOT, 'books');
const SITE = path.join(ROOT, 'site'), OUT = path.join(ROOT, 'out');
const PAGES = path.join(ROOT, 'docs');   // the published site: GitHub Pages serves main:/docs

const read = p => fs.readFileSync(p, 'utf8');
const write = (p, s) => { fs.mkdirSync(path.dirname(p), { recursive: true }); fs.writeFileSync(p, s); };
const expr = p => read(p).trim().replace(/;\s*$/, '');           // a file holding one expression
const evalFile = p => vm.runInNewContext('(' + expr(p) + '\n)', {}, { filename: p });
const fill = (s, map) => Object.entries(map).reduce((a, [k, v]) => a.split('{{' + k + '}}').join(v), s);
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
class PBError extends Error {}
const die = m => { throw new PBError(m); };   // the CLI prints it and exits; the editor shows it

const FORMS = ['chain', 'recipe', 'journey', 'cumulative', 'call-response', 'fortunately', 'countdown'];   // see engine/docs/STORY.md
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
  const casts = fs.readdirSync(path.join(ENG, 'runtime/casts')).filter(f => f.endsWith('.js')).sort().map(f => read(path.join(ENG, 'runtime/casts', f)));
  return [read(path.join(ENG, 'runtime/shapes.js')), read(path.join(ENG, 'runtime/cast.js')), ...casts, b.helpers,
    `const BOOK=${JSON.stringify({ style: b.config.style || 'paper', cast: b.config.cast || 'paper' })};\n/* ---------- the pages, in cut order ---------- */\nconst SC=[\n${sc}\n];`, read(path.join(ENG, 'runtime/book.js'))].join('\n\n');
}

const SKELETON = '<!doctype html><html lang="en"><head><meta charset="utf-8">' +
  '<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">' +
  '<style>:root{color-scheme:light;box-sizing:border-box;padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}' +
  'body{margin:0;font:14px -apple-system,BlinkMacSystemFont,sans-serif}img{max-width:100%}[hidden]{display:none!important}</style></head><body>\n{{BODY}}\n</body></html>\n';

const bookBody = b => fill(read(path.join(ENG, 'runtime/shell.html')), { CSS: read(path.join(ENG, 'runtime/book.css')), JS: bookJs(b), TITLE: esc(b.config.title) });

function check(slug) { console.log(checkReport(slug)); }

// Draws every page of a book in every style and cast; returns the report (ok or WARN lines). Throws on a broken page.
function checkReport(slug) {
  const b = loadBook(slug), out = [];
  const el = () => new Proxy(function () {}, { get: (t, k) => k === 'querySelectorAll' ? () => [] : k === 'dataset' ? {} : el(), set: () => true, apply: () => el() });
  if (b.config.form && !FORMS.includes(b.config.form)) out.push(`WARN book.config.js: unknown form '${b.config.form}' (one of ${FORMS.join(', ')})`);
  let at = '';
  const shown = new Map();   // command typed in a term() -> first page that shows it
  const ctx = { document: { getElementById: el, addEventListener() {}, createElement: el }, window: {}, URLSearchParams, setTimeout() {}, clearTimeout() {}, console, __out: out,
    __warn: m => out.push(`WARN ${at}: ${m}`), __cmd: c => { if (!shown.has(c)) shown.set(c, at); }, __setAt: a => { at = a; } };
  vm.createContext(ctx);
  vm.runInContext(bookJs(b) + `;
if(BOOK.style&&!STYLES.includes(BOOK.style))__out.push('WARN book.config.js: unknown style '+BOOK.style+' (one of '+STYLES.join(', ')+')');
if(BOOK.cast&&!CASTS[BOOK.cast])__out.push('WARN book.config.js: unknown cast '+BOOK.cast+' (one of '+Object.keys(CASTS).join(', ')+')');
const __lum=c=>{const h=/^#([0-9a-f]{6})$/i.exec(c);if(!h)return 1;const n=parseInt(h[1],16);return(.299*(n>>16)+.587*((n>>8)&255)+.114*(n&255))/255};
SC.forEach((sc,i)=>{const at='page '+i+' ('+sc.name+')';__setAt(at);
  if('commands' in sc){if(!Array.isArray(sc.commands)||!sc.commands.length)throw new Error(at+': a cheat sheet needs at least one entry in commands');
    sc.commands.forEach((c,j)=>{if(!c||typeof c.cmd!=='string'||!c.cmd.trim())throw new Error(at+': commands['+j+'] has no cmd')})}
  for(const k of ['bg','cap','hint','draw'])if(!sc[k])__out.push('WARN '+at+': missing '+k);
  if(__lum(sc.bg)<.7&&!sc.dark)__out.push('WARN '+at+': background '+sc.bg+' is dark; use a pale P.* colour or set dark:true');
  if(/\\u2014/.test(sc.cap||''))__out.push('WARN '+at+': em dash in the caption');
  let tappable=false;
  for(const style of STYLES)for(const cast of Object.keys(CASTS)){STYLE=style;useCast(cast);
    for(const n of [0,1,2,3,4,5,7,9,12,30]){S={n};const s=sc.draw(S);
      if(/NaN|undefined/.test(s))throw new Error(at+' in '+style+' with the '+cast+' cast at '+n+' taps: '+s.match(/.{0,60}(NaN|undefined).{0,20}/)[0]);
      if(/data-tap/.test(s))tappable=true;}}
  STYLE='paper';useCast('paper');
  if(!tappable)__out.push('WARN '+at+': nothing to tap');
});
__setAt('');globalThis.__sheet=SC.flatMap(sc=>(sc.commands||[]).map(c=>c.cmd.trim()));
__out.push('ok: '+SC.length+' spreads (cover + '+(SC.length-1)+' pages), styles: '+STYLES.join(', ')+'; casts: '+Object.keys(CASTS).join(', '));`, ctx, { filename: `books/${slug}` });
  const sheet = ctx.__sheet;
  if (shown.size && !sheet.length) out.unshift(`WARN the art types ${shown.size} command(s) but the book has no cheat sheet (new ${slug} cheat-sheet --sheet)`);
  else for (const [c, where] of shown) if (!sheet.includes(c.trim())) out.unshift(`WARN ${where}: "${c}" is typed in the art but missing from the cheat sheet`);
  for (const u of b.unused) out.unshift(`WARN pages/${u} exists but is not in cut.js`);
  return `${slug}\n  ` + [...new Set(out)].join('\n  ');
}

function build(args) {
  const artifact = args.includes('--artifact'), root = args.includes('--pages') || args.includes('--root'), dest = root ? PAGES : SITE, label = root ? 'docs/' : 'site/';
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
  // One shelf per series, in the order the series first appears in shelf.js; books with no series come first, unlabelled.
  const shelves = new Map();
  for (const s of shelf()) { const c = evalFile(path.join(BOOKS, s, 'book.config.js')), k = c.series || '';
    if (!shelves.has(k)) shelves.set(k, []);
    shelves.get(k).push(`    <li><a href="${s}/">\n      <div class="swatch" style="background:${esc(c.swatch || '#a9d5e8')}">${esc(c.tag || '')}</div>\n      <h2>${esc(c.title)}</h2>\n      <p>${esc(c.blurb || '')}</p></a></li>`); }
  const order = [...shelves.keys()].sort((a, b) => (a ? 1 : 0) - (b ? 1 : 0));
  const html = order.map(k => (k ? `  <h2 class="series">${esc(k)}</h2>\n` : '') + `  <ul>\n${shelves.get(k).join('\n')}\n  </ul>`).join('\n');
  write(path.join(dest, 'index.html'), fill(read(path.join(ENG, 'site/index.html')), { SHELVES: html }));
  if (root) write(path.join(dest, '.nojekyll'), '');
  console.log(label + 'index.html');
}

// A contact sheet: every page of a book drawn in a grid at one tap count, for looking at the whole book at once.
// Open it with ?style= and ?cast= to see the book in another style or cast.
function contact(args) {
  const opt = k => { const i = args.indexOf('--' + k); return i >= 0 ? args[i + 1] : null; };
  const slug = args.find((a, i) => !a.startsWith('--') && !(i && args[i - 1].startsWith('--')));
  if (!slug) die('usage: picture-book contact <slug> [--taps N]');
  const taps = +(opt('taps') ?? 9);
  const out = path.join(SITE, slug, `contact-${taps}.html`);
  write(out, contactHtml(slug, taps));
  console.log(path.relative(ROOT, out) + '   (add ?style=ink&cast=toys to compare)');
}
function contactHtml(slug, taps = 9) {
  const b = loadBook(slug);
  const grid = `<script>
document.querySelector('.desk').hidden=true;
const g=document.createElement('div');g.className='contact';
SC.forEach((sc,i)=>{S={n:${taps}};dress(sc);const d=document.createElement('figure');
  d.innerHTML='<svg viewBox="0 0 800 500"><rect width="800" height="500" fill="'+sc.bg+'"/><g class="sty-'+STYLE+'">'+sc.draw.call(sc,S)+'</g></svg>';
  const c=document.createElement('figcaption');c.textContent=i+' '+sc.name+': '+sc.cap;d.appendChild(c);g.appendChild(d)});
document.body.appendChild(g);
</script><style>.contact{display:grid;grid-template-columns:repeat(auto-fill,minmax(420px,1fr));gap:12px;padding:12px}
.contact figure{margin:0;background:var(--paper);color:var(--ink)}.contact svg{display:block;width:100%}.contact figcaption{padding:4px 8px;font-size:13px}</style>`;
  return fill(SKELETON, { BODY: bookBody(b) }).replace('</body>', grid + '</body>');
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

function newPage(args) {
  const [slug, page] = args.filter(a => !a.startsWith('--')), sheet = args.includes('--sheet');
  if (!slug || !page) die('usage: picture-book new <slug> <page> [--sheet]');
  const dir = path.join(BOOKS, slug, 'pages', page);
  if (!fs.existsSync(path.join(BOOKS, slug))) die(`no book at books/${slug}`);
  if (fs.existsSync(dir)) die(`books/${slug}/pages/${page} already exists`);
  copyDir(path.join(ENG, sheet ? 'template/sheet' : 'template/page'), dir, {});
  console.log(`books/${slug}/pages/${page}/ created. Add '${page}' to books/${slug}/cut.js where it belongs in the story.`);
}

module.exports = { contactHtml, ROOT, BOOKS, FORMS, PBError, loadBook, bookBody, checkReport, init, newPage, shelf, fill, SKELETON, evalFile };

if (require.main === module) {
  const [cmd, ...args] = process.argv.slice(2);
  try {
    if (cmd === 'build') build(args);
    else if (cmd === 'check') slugs(args).forEach(check);
    else if (cmd === 'init') init(args);
    else if (cmd === 'contact') contact(args);
    else if (cmd === 'edit') require('../editor/server.js').serve(args);
    else if (cmd === 'new') newPage(args);
    else { console.log('usage: picture-book <init <slug> "<Title>" | new <slug> <page> [--sheet] | build [slug...|--all] [--artifact|--pages] | check [slug...|--all] | contact <slug> [--taps N]>'); process.exit(cmd ? 1 : 0); }
  } catch (e) {
    console.error('error: ' + (e instanceof PBError ? e.message : (e.stack || e)));
    process.exit(1);
  }
}
