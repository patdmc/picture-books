// The local editor: node engine/cli/picture-book.js edit [--port 4800]
// Serves engine/editor/index.html, live previews of every book, a small JSON API over the book files,
// and a bridge that runs the Claude Code CLI on a free-form direction. Listens on 127.0.0.1 only.
'use strict';
const http = require('http'), fs = require('fs'), path = require('path'), { spawn } = require('child_process');
const pb = require('../cli/picture-book.js');
const { ROOT, BOOKS, PBError } = pb;

const NAME = /^[a-z0-9][a-z0-9-]{0,62}$/;            // book and page folder names: nothing that can climb out of books/
const okName = n => typeof n === 'string' && NAME.test(n);
const pageDir = (b, p) => path.join(BOOKS, b, 'pages', p);
const CUT_HEAD = '// The pages, in story order. Reorder, add or drop a page here.\n';
const writeCut = (b, pages) => fs.writeFileSync(path.join(BOOKS, b, 'cut.js'), CUT_HEAD + '([\n' + pages.map(p => `  '${p}',\n`).join('') + '])\n');
const STR = q => `(${q === "'" ? "'(?:[^'\\\\\\n]|\\\\.)*'" : q === '"' ? '"(?:[^"\\\\\\n]|\\\\.)*"' : '`(?:[^`\\\\]|\\\\.)*`'})`;

function books() {
  return fs.readdirSync(BOOKS).filter(d => okName(d) && fs.existsSync(path.join(BOOKS, d, 'book.config.js'))).map(slug => {
    const b = pb.loadBook(slug);
    const pages = b.pages.map(p => {
      let cap = '', hint = '';
      try { const L = pb.evalFile(path.join(b.dir, 'pages', p.name, 'lines.js')); cap = L.cap || ''; hint = L.hint || ''; } catch (_) {}
      return { name: p.name, cap, hint };
    });
    const c = b.config;
    return { slug, title: c.title, form: c.form || '', style: c.style || 'paper', cast: c.cast || 'paper', series: c.series || '', pages, unused: b.unused };
  });
}

// Replace the string literal after `field:` in a lines.js file, keeping everything else as written.
function setField(file, field, value) {
  const src = fs.readFileSync(file, 'utf8');
  for (const q of ["'", '"', '`']) {
    const re = new RegExp(`(\\b${field}\\s*:\\s*)${STR(q)}`);
    if (re.test(src)) return fs.writeFileSync(file, src.replace(re, (m, pre) => pre + JSON.stringify(value)));
  }
  throw new PBError(`no ${field}: string found in ${path.relative(ROOT, file)}`);
}

function check(slug) { try { return { ok: true, report: pb.checkReport(slug) }; } catch (e) { return { ok: false, report: e.message }; } }

/* ---------- Claude ---------- */
let run = null;   // one run at a time
function claudePrompt({ book, page, direction }) {
  const where = page ? `The author is looking at the page '${page}' (books/${book}/pages/${page}/: lines.js holds the words, scene.js the picture).` : 'The direction is about the whole book.';
  return `You are editing the picture book in books/${book}/ of this repository, from the local picture-book editor.
${where}

The author's direction:
${direction}

Follow skills/picture-book-revise/SKILL.md for where things live and how to change them, and the rules in engine/docs/STORY.md, engine/docs/DESIGN.md and engine/docs/CAST.md. Page order is books/${book}/cut.js.
Change source files only. Then run \`node engine/cli/picture-book.js check ${book}\` and fix anything it reports.
Do not build, publish, commit or push: the editor reloads its preview itself.
Finish with two or three plain sentences on what you changed.`;
}
function startClaude(body, res) {
  if (run) { res.writeHead(409, { 'content-type': 'application/json' }); return res.end(JSON.stringify({ error: 'Claude is already working on something. Stop it first.' })); }
  const args = ['-p', claudePrompt(body), '--output-format', 'stream-json', '--verbose', '--permission-mode', 'acceptEdits',
    '--allowedTools', 'Read', 'Edit', 'Write', 'Glob', 'Grep', 'Bash(node engine/cli/picture-book.js:*)'];
  if (body.session && /^[0-9a-f-]{8,64}$/i.test(body.session)) args.push('--resume', body.session);
  res.writeHead(200, { 'content-type': 'application/x-ndjson', 'cache-control': 'no-store' });
  const send = o => res.write(JSON.stringify(o) + '\n');
  let child;
  try { child = spawn('claude', args, { cwd: ROOT, stdio: ['ignore', 'pipe', 'pipe'] }); }
  catch (e) { send({ kind: 'error', text: 'Could not start claude: ' + e.message }); return res.end(); }
  run = child;
  let buf = '';
  child.stdout.on('data', d => {
    buf += d; let i;
    while ((i = buf.indexOf('\n')) >= 0) {
      const line = buf.slice(0, i).trim(); buf = buf.slice(i + 1);
      if (!line) continue;
      let m; try { m = JSON.parse(line); } catch (_) { continue; }
      if (m.type === 'system' && m.subtype === 'init') send({ kind: 'session', session: m.session_id });
      else if (m.type === 'assistant') for (const c of m.message?.content || []) {
        if (c.type === 'text' && c.text.trim()) send({ kind: 'text', text: c.text });
        else if (c.type === 'tool_use') send({ kind: 'tool', name: c.name, detail: c.input?.file_path ? path.relative(ROOT, c.input.file_path) : (c.input?.command || c.input?.pattern || '') });
      }
      else if (m.type === 'result') send({ kind: 'done', text: m.result || '', error: !!m.is_error, session: m.session_id });
    }
  });
  child.stderr.on('data', d => send({ kind: 'log', text: String(d) }));
  child.on('error', e => send({ kind: 'error', text: e.code === 'ENOENT' ? 'The claude command is not on your PATH. Install Claude Code first.' : e.message }));
  child.on('close', code => { run = null; send({ kind: 'exit', code }); res.end(); });
}

/* ---------- HTTP ---------- */
const json = (res, code, o) => { res.writeHead(code, { 'content-type': 'application/json', 'cache-control': 'no-store' }); res.end(JSON.stringify(o)); };
const readBody = req => new Promise((ok, no) => { let s = ''; req.on('data', d => { s += d; if (s.length > 2e6) req.destroy(); }); req.on('end', () => { try { ok(s ? JSON.parse(s) : {}); } catch (e) { no(new PBError('bad JSON')); } }); });

function handler(port) {
  const hosts = new Set([`127.0.0.1:${port}`, `localhost:${port}`]);
  return async (req, res) => {
    // Only this machine, only this page: a web page elsewhere must not drive the editor (it can start Claude).
    if (!hosts.has(req.headers.host)) return json(res, 403, { error: 'wrong host' });
    if (req.method !== 'GET' && (req.headers.origin && !hosts.has(req.headers.origin.replace(/^https?:\/\//, '')) || !/application\/json/.test(req.headers['content-type'] || '')))
      return json(res, 403, { error: 'cross-site request refused' });
    const u = new URL(req.url, 'http://x'), q = Object.fromEntries(u.searchParams);
    try {
      if (req.method === 'GET' && (u.pathname === '/' || u.pathname === '/index.html')) {
        res.writeHead(200, { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store' });
        return res.end(fs.readFileSync(path.join(__dirname, 'index.html')));
      }
      const pv = /^\/(preview|contact)\/([^/]+)\/?$/.exec(u.pathname);
      if (req.method === 'GET' && pv) {
        if (!okName(pv[2])) return json(res, 400, { error: 'bad book' });
        let html;
        try { html = pv[1] === 'contact' ? pb.contactHtml(pv[2]) : pb.fill(pb.SKELETON, { BODY: pb.bookBody(pb.loadBook(pv[2])) }); }
        catch (e) { html = `<!doctype html><meta charset="utf-8"><pre style="white-space:pre-wrap;font:14px monospace;padding:16px;color:#a11">${String(e.message).replace(/</g, '&lt;')}</pre>`; }
        res.writeHead(200, { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store' });
        return res.end(html);
      }
      if (req.method === 'GET' && u.pathname === '/api/books') return json(res, 200, books());
      if (req.method === 'GET' && u.pathname === '/api/check') { if (!okName(q.book)) return json(res, 400, { error: 'bad book' }); return json(res, 200, check(q.book)); }
      if (req.method === 'GET' && u.pathname === '/api/page') {
        if (!okName(q.book) || !okName(q.page)) return json(res, 400, { error: 'bad name' });
        const d = pageDir(q.book, q.page);
        return json(res, 200, { lines: fs.readFileSync(path.join(d, 'lines.js'), 'utf8'), scene: fs.readFileSync(path.join(d, 'scene.js'), 'utf8') });
      }
      if (req.method === 'GET') return json(res, 404, { error: 'not found' });

      const body = await readBody(req);
      const B = body.book, P = body.page;
      if (B !== undefined && !okName(B)) return json(res, 400, { error: 'bad book' });
      if (P !== undefined && P !== null && !okName(P)) return json(res, 400, { error: 'bad page' });
      if (u.pathname === '/api/claude') {
        if (typeof body.direction !== 'string' || !body.direction.trim()) return json(res, 400, { error: 'say what to change' });
        return startClaude(body, res);
      }
      if (u.pathname === '/api/claude/stop') { if (run) run.kill('SIGINT'); return json(res, 200, { stopped: !!run }); }
      if (u.pathname === '/api/page') {          // save lines.js and/or scene.js as written
        const d = pageDir(B, P);
        if (!fs.existsSync(d)) return json(res, 404, { error: 'no such page' });
        for (const k of ['lines', 'scene']) if (typeof body[k] === 'string') fs.writeFileSync(path.join(d, k + '.js'), body[k].replace(/\s*$/, '\n'));
        return json(res, 200, check(B));
      }
      if (u.pathname === '/api/field') {         // caption or hint, edited in the script column
        if (!['cap', 'hint'].includes(body.field) || typeof body.value !== 'string') return json(res, 400, { error: 'bad field' });
        setField(path.join(pageDir(B, P), 'lines.js'), body.field, body.value);
        return json(res, 200, check(B));
      }
      if (u.pathname === '/api/order') {         // the page order, written to cut.js
        const have = new Set(pb.loadBook(B).cut);
        if (!Array.isArray(body.pages) || body.pages.length !== have.size || !body.pages.every(p => have.has(p))) return json(res, 400, { error: 'the new order must hold the same pages' });
        writeCut(B, body.pages);
        return json(res, 200, check(B));
      }
      if (u.pathname === '/api/new-page') {
        const name = body.name, at = +body.at;
        if (!okName(name)) return json(res, 400, { error: 'page names are lowercase words joined by dashes' });
        pb.newPage([B, name]);
        const cut = pb.loadBook(B).cut;
        cut.splice(Number.isInteger(at) ? clampN(at, 0, cut.length) : cut.length, 0, name);
        writeCut(B, cut);
        return json(res, 200, check(B));
      }
      if (u.pathname === '/api/remove-page') {   // drops it from cut.js only; the folder stays on disk
        const cut = pb.loadBook(B).cut.filter(p => p !== P);
        if (cut.length < 2) return json(res, 400, { error: 'a book needs a cover and at least one page' });
        writeCut(B, cut);
        return json(res, 200, check(B));
      }
      if (u.pathname === '/api/new-book') {
        if (typeof body.title !== 'string' || !body.title.trim()) return json(res, 400, { error: 'give it a title' });
        pb.init([B, body.title.trim()]);
        return json(res, 200, check(B));
      }
      return json(res, 404, { error: 'not found' });
    } catch (e) {
      return json(res, e instanceof PBError ? 400 : 500, { error: e.message });
    }
  };
}
const clampN = (v, a, b) => Math.max(a, Math.min(b, v));

function serve(args = []) {
  const i = args.indexOf('--port'), port = i >= 0 ? +args[i + 1] : 4800;
  http.createServer(handler(port)).listen(port, '127.0.0.1', () =>
    console.log(`Picture book editor: http://localhost:${port}/   (Ctrl+C to stop)`));
}
module.exports = { serve };
