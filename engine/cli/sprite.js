// Sprites: turn a photo of a character on a green screen into a trimmed, transparent PNG for an image cast.
//   node engine/cli/picture-book.js sprite <cast> <name> <image> [--height 560]
// Writes engine/runtime/casts/<cast>/<name>.png and records its size in engine/runtime/casts/<cast>/sprites.json.
// Plain Node: PNG is decoded and encoded here; any other format is converted to PNG first with macOS `sips`.
'use strict';
const fs = require('fs'), path = require('path'), zlib = require('zlib'), os = require('os'), { execFileSync } = require('child_process');

/* ---------- PNG in and out (8-bit RGB or RGBA, not interlaced) ---------- */
function decodePNG(buf) {
  if (buf.readUInt32BE(0) !== 0x89504e47) throw new Error('not a PNG');
  let p = 8, w, h, depth, type, inter, idat = [];
  while (p < buf.length) {
    const len = buf.readUInt32BE(p), kind = buf.toString('ascii', p + 4, p + 8), data = buf.subarray(p + 8, p + 8 + len);
    if (kind === 'IHDR') { w = data.readUInt32BE(0); h = data.readUInt32BE(4); depth = data[8]; type = data[9]; inter = data[12]; }
    else if (kind === 'IDAT') idat.push(data);
    else if (kind === 'IEND') break;
    p += 12 + len;
  }
  if (depth !== 8 || (type !== 2 && type !== 6) || inter) throw new Error(`unsupported PNG (depth ${depth}, colour type ${type}, interlace ${inter}); save it as 8-bit RGB or RGBA`);
  const bpp = type === 6 ? 4 : 3, raw = zlib.inflateSync(Buffer.concat(idat)), stride = w * bpp, out = Buffer.alloc(w * h * 4);
  let prev = Buffer.alloc(stride), q = 0;
  for (let y = 0; y < h; y++) {
    const f = raw[q++], line = Buffer.from(raw.subarray(q, q + stride)); q += stride;
    for (let i = 0; i < stride; i++) {
      const a = i >= bpp ? line[i - bpp] : 0, b = prev[i], c = i >= bpp ? prev[i - bpp] : 0;
      const pr = f === 0 ? 0 : f === 1 ? a : f === 2 ? b : f === 3 ? (a + b) >> 1 : (() => { const pp = a + b - c, pa = Math.abs(pp - a), pb = Math.abs(pp - b), pc = Math.abs(pp - c); return pa <= pb && pa <= pc ? a : pb <= pc ? b : c; })();
      line[i] = (line[i] + pr) & 255;
    }
    for (let x = 0; x < w; x++) { const o = (y * w + x) * 4, s = x * bpp; out[o] = line[s]; out[o + 1] = line[s + 1]; out[o + 2] = line[s + 2]; out[o + 3] = bpp === 4 ? line[s + 3] : 255; }
    prev = line;
  }
  return { w, h, px: out };
}
const CRC = (() => { const t = []; for (let n = 0; n < 256; n++) { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1; t[n] = c >>> 0; } return t; })();
const crc32 = b => { let c = 0xffffffff; for (const x of b) c = CRC[(c ^ x) & 255] ^ (c >>> 8); return (c ^ 0xffffffff) >>> 0; };
function chunk(kind, data) { const l = Buffer.alloc(4), k = Buffer.from(kind, 'ascii'), c = Buffer.alloc(4); l.writeUInt32BE(data.length); c.writeUInt32BE(crc32(Buffer.concat([k, data]))); return Buffer.concat([l, k, data, c]); }
function encodePNG({ w, h, px }) {
  const ihdr = Buffer.alloc(13); ihdr.writeUInt32BE(w, 0); ihdr.writeUInt32BE(h, 4); ihdr[8] = 8; ihdr[9] = 6;
  const raw = Buffer.alloc((w * 4 + 1) * h);
  for (let y = 0; y < h; y++) { raw[y * (w * 4 + 1)] = 0; px.copy(raw, y * (w * 4 + 1) + 1, y * w * 4, (y + 1) * w * 4); }
  return Buffer.concat([Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]), chunk('IHDR', ihdr), chunk('IDAT', zlib.deflateSync(raw, { level: 9 })), chunk('IEND', Buffer.alloc(0))]);
}

/* ---------- green screen out ---------- */
// How green a pixel is: green minus the larger of red and blue. The backdrop (and its shadows) score high;
// yarn, eyes and cream muzzles score near zero or below. Between the two thresholds the edge fades.
function keyGreen(img) {
  const { w, h, px } = img, gd = i => px[i + 1] - Math.max(px[i], px[i + 2]);
  const border = [];
  for (let x = 0; x < w; x += 4) { border.push(gd(x * 4), gd(((h - 1) * w + x) * 4)); }
  for (let y = 0; y < h; y += 4) { border.push(gd(y * w * 4), gd((y * w + w - 1) * 4)); }
  border.sort((a, b) => a - b);
  const bg = border[border.length >> 1];
  if (bg < 40) throw new Error(`the border is not green enough to key (greenness ${bg}); shoot on a pure green background`);
  // the backdrop colour itself: the average of border pixels that are clearly backdrop
  let br = 0, bgg = 0, bb = 0, bn = 0;
  for (let x = 0; x < w; x += 2) for (const y of [0, 1, h - 2, h - 1]) { const i = (y * w + x) * 4; if (gd(i) > bg * .7) { br += px[i]; bgg += px[i + 1]; bb += px[i + 2]; bn++; } }
  const BG = [br / bn, bgg / bn, bb / bn];
  const hi = bg * .38, lo = bg * .12, AL = new Float32Array(w * h);
  for (let k = 0; k < w * h; k++) { const g = gd(k * 4); AL[k] = g >= hi ? 0 : g <= lo ? 1 : (hi - g) / (hi - lo); }
  // Only backdrop connected to the edge of the photo is removed: flood in from the border through
  // anything not fully opaque. Green light bouncing onto the doll (a cream muzzle, say) is left alone.
  const seen = new Uint8Array(w * h), stack = [];
  for (let x = 0; x < w; x++) stack.push(x, (h - 1) * w + x);
  for (let y = 0; y < h; y++) stack.push(y * w, y * w + w - 1);
  while (stack.length) { const k = stack.pop(); if (seen[k] || AL[k] >= .995) continue; seen[k] = 1;
    const x = k % w; if (x > 0) stack.push(k - 1); if (x < w - 1) stack.push(k + 1); if (k >= w) stack.push(k - w); if (k < w * (h - 1)) stack.push(k + w); }
  for (let k = 0; k < w * h; k++) if (!seen[k]) AL[k] = 1;
  for (let i = 0; i < px.length; i += 4) {
    const a = AL[i >> 2];
    if (a > 0 && a < 1) for (let c = 0; c < 3; c++) px[i + c] = Math.max(0, Math.min(255, (px[i + c] - (1 - a) * BG[c]) / a));   // unmix the backdrop from edge pixels
    px[i + 3] = Math.round(px[i + 3] * a * a);                                     // a squared: the edge pulls in a little
    const g2 = px[i + 1] - Math.max(px[i], px[i + 2]);
    if (g2 > 4) px[i + 1] = Math.max(px[i], px[i + 2]) + 4;                         // despill what is left
  }
  // drop specks: any opaque pixel with fewer than 3 opaque neighbours
  const A = Uint8Array.from({ length: w * h }, (_, k) => px[k * 4 + 3]);
  for (let y = 1; y < h - 1; y++) for (let x = 1; x < w - 1; x++) {
    const k = y * w + x; if (!A[k]) continue;
    let n = 0; for (const d of [-1, 1, -w, w, -w - 1, -w + 1, w - 1, w + 1]) if (A[k + d] > 127) n++;
    if (n < 3) px[k * 4 + 3] = 0;
  }
  return img;
}
function trim(img, pad = 4) {
  const { w, h, px } = img; let x0 = w, y0 = h, x1 = -1, y1 = -1;
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) if (px[(y * w + x) * 4 + 3] > 24) { if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y; }
  if (x1 < 0) throw new Error('nothing left after removing the green');
  x0 = Math.max(0, x0 - pad); y0 = Math.max(0, y0 - pad); x1 = Math.min(w - 1, x1 + pad); y1 = Math.min(h - 1, y1 + pad);
  const W = x1 - x0 + 1, H = y1 - y0 + 1, out = Buffer.alloc(W * H * 4);
  for (let y = 0; y < H; y++) px.copy(out, y * W * 4, ((y + y0) * w + x0) * 4, ((y + y0) * w + x0 + W) * 4);
  return { w: W, h: H, px: out };
}
// Area-average downscale with premultiplied alpha, so edges do not pick up dark halos.
function scaleTo(img, H) {
  if (img.h <= H) return img;
  const k = img.h / H, W = Math.max(1, Math.round(img.w / k)), out = Buffer.alloc(W * H * 4);
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    const sx0 = x * k, sx1 = (x + 1) * k, sy0 = y * k, sy1 = (y + 1) * k; let r = 0, g = 0, b = 0, a = 0, n = 0;
    for (let sy = Math.floor(sy0); sy < Math.min(img.h, Math.ceil(sy1)); sy++) for (let sx = Math.floor(sx0); sx < Math.min(img.w, Math.ceil(sx1)); sx++) {
      const i = (sy * img.w + sx) * 4, al = img.px[i + 3] / 255; r += img.px[i] * al; g += img.px[i + 1] * al; b += img.px[i + 2] * al; a += al; n++;
    }
    const o = (y * W + x) * 4; out[o] = a ? r / a : 0; out[o + 1] = a ? g / a : 0; out[o + 2] = a ? b / a : 0; out[o + 3] = Math.round(a / n * 255);
  }
  return { w: W, h: H, px: out };
}

function sprite(args, CASTS_DIR) {
  const opt = k => { const i = args.indexOf('--' + k); return i >= 0 ? args[i + 1] : null; };
  const [cast, name, src] = args.filter((a, i) => !a.startsWith('--') && !(i && args[i - 1].startsWith('--')));
  if (!cast || !name || !src) throw new Error('usage: picture-book sprite <cast> <name> <image> [--height 560]');
  if (!/^[a-z0-9-]+$/.test(cast) || !/^[a-z0-9-]+$/.test(name)) throw new Error('cast and sprite names are lowercase words joined by dashes');
  let png = src;
  if (!/\.png$/i.test(src)) {
    png = path.join(fs.mkdtempSync(path.join(os.tmpdir(), 'pb-sprite-')), 'in.png');
    execFileSync('sips', ['-s', 'format', 'png', src, '--out', png], { stdio: 'ignore' });
  }
  const img = scaleTo(trim(keyGreen(decodePNG(fs.readFileSync(png)))), +(opt('height') || 560));
  const dir = path.join(CASTS_DIR, cast), file = path.join(dir, name + '.png'), man = path.join(dir, 'sprites.json');
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(file, encodePNG(img));
  const m = fs.existsSync(man) ? JSON.parse(fs.readFileSync(man, 'utf8')) : {};
  m[name] = { w: img.w, h: img.h };
  fs.writeFileSync(man, JSON.stringify(Object.fromEntries(Object.entries(m).sort()), null, 2) + '\n');
  return `${path.relative(process.cwd(), file)}  ${img.w}×${img.h}`;
}
module.exports = { sprite, decodePNG, encodePNG };
