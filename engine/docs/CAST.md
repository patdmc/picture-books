# Cast, shapes and the page API

Stage: SVG `viewBox 0 0 800 500`. Origin top left. Figures are placed by their feet: `(x, y)` is the ground point, `s` is scale. Every helper returns an SVG string; a scene concatenates strings back to front.

## A page

A page is a folder in `books/<slug>/pages/`. It holds two files, each one JavaScript expression.

`lines.js`, the words:

```js
({
  cap: 'Story line.',
  hint: 'Tap the agent.',
})
```

`scene.js`, the picture and what a tap does:

```js
({
  bg: P.pink,
  draw(S) { const n = Math.min(S.n, 4); let s = '...'; return s + hot('Label for screen readers', piece); },
  tap(S, key) { S.n++; },        // optional; the default is S.n++
  drag(S, x, y) { S.t = ...; },  // optional; needs an element with data-drag
  dark: true,                    // optional; allows a dark background
})
```

- `S` resets to `{n:0}` on every page turn. Store anything else on `S` (`S.t`, `S.v`).
- `cut.js` lists the page folders in story order. The first is the cover. Next from the last page goes to page 1.
- Cover and last page: `tap: () => go(1, 1)`.
- `helpers.js` in the book folder holds shapes and data only that book uses.

## Interaction

| Helper | Use |
|---|---|
| `hot(label, inner, key='a')` | Makes `inner` tappable and keyboard focusable. Bobs until the first tap. |
| `data-drag` + `data-tap` on a `<g class="hot">` | Draggable; see `books/dev-metric/pages/thresholds`. |
| class `pop` | Drop-in animation for the newest piece. |
| class `draw` | Left to right reveal (graph lines, marker lines). |
| class `shake` | Wiggle; put it on an inner `<g>` with no transform attribute. |
| class `belt` | Conveyor loop, 720px per 8.8s. |

## Shapes

| Helper | Draws |
|---|---|
| `box(x,y,w,h,fill,cls,extra)` | Hand-cut rectangle |
| `circ(cx,cy,r,fill,ry,cls)` | Hand-cut circle or ellipse |
| `poly(pts,fill,cls)` | Any polygon |
| `strip(x1,y1,x2,y2,w,fill,cls)` | A line as a paper strip |
| `ribbon(pts,w,fill,cls)` | A polyline as a paper strip (graph lines) |
| `txt(x,y,s,size,fill,anchor,cls)` | Cut-paper lettering (Fredoka) |
| `mk(x,y,s,size,rot,cls)` | Red marker handwriting |
| `wavy(x,y,cls)` | Red marker line across the page from x |
| `check(x,y,s,col,cls)` | Check mark |
| `line(d)` | Thin ink stroke (mouths); no shadow |

## Cast

| Helper | Notes |
|---|---|
| `dev(x,y,s,[head,body],{m,look,up,up2,tuft,cls})` | `m`: happy, flat, worry, wow, sleep. `look`: -1 left, 1 right. About 135 tall at s=1. `DEVS[0]` is the Dev. |
| `face(x,y,r,col,m,look)` | Head only (the sleeping Dev in bed) |
| `agent(x,y,s,col,{up,look,m,cls})` | Paper robot, about 116 tall at s=1. Colours in `AC`. |
| `metric(x,y,r,col,cls)` | The Metric: a dot with a face. Colours in `MC`. |
| `graph(x,y,w,h,vals,col,{noline,cls,lw})` | Chart card. Returns `{s,pts,X,Y,px0,px1,py0,py1}`. |
| `pr(x,y,w,cls,mark)` | Pull request or diff sheet |
| `book(x,y,w,cls)` | Runbook |
| `bubble(cx,cy,rx,ry,tx,ty)` | Thought bubble with a tail toward (tx,ty) |
| `dragon(x,y,fire)` | Sits on a line, faces left |
| `heart(x,y,s,col,cls)`, `rocket(x,y,cls)`, `sun(x,y)` | Props |
| `arm(y)` | Purple arm reaching in from the right edge; hand at about (578, y) |
| `repo(x,y,s,{awake,look,m,page,folder,cls})` | The Repo: a cardboard box with a face, about 100 tall at s=1. `page` or `folder` sticks out of the top. |
| `photo(x,y,w,col,cls,label)` | A commit, drawn as an instant photo; `label` in red marker. |
| `cloud(x,y,cls)` | The remote: a paper cloud labelled origin. |
| `say(x,y,text,{tx,ty,w,size,shout,col,cls})` | Speech bubble centred on `(x,y)`, tail to `(tx,ty)`. Wraps at `w` (200). Size 22. `shout` for a jagged edge. |
| `term(x,y,w,h,lines,{upto,title,size,cursor,cls})` | Terminal card. `'$ cmd'` lines are commands (lime, recorded for the cheat-sheet check); other lines are output. `upto` shows the first N. Size 18, about 26 per line. |

## Cheat sheet

`node engine/cli/picture-book.js new <slug> cheat-sheet --sheet` makes the last page of a how-to book. Its `lines.js` holds `commands: [{cmd, note}]`; the runtime renders them under the caption with copy buttons, and `this.commands` is available inside the scene's `draw()`.

Book-specific helpers (a request sheet, a row of stage cards) go in the book's `helpers.js`. Promote one into `engine/runtime/cast.js` once a second book needs it.

## Colour

- `C`: full-strength paper colours for subjects.
- `P`: pale backgrounds (`teal`, `mint`, `pink`, `kraft`). `C.sky` and `C.lilac` are pale enough.
- Before choosing a background, list the colours of the pieces on that spread and pick a paper none of them use.

## Recurring sets

- Night: `bg:C.navy, dark:true`, moon, stars, "3:00 AM" in lime, bed with `face(...,'sleep')`.
- Gates: two purple posts and a lintel with a label and a light; pieces pass underneath on an ink belt.
- The line: `wavy()` with `mk('application')` above and `mk('platform')` below.
- The offer: `arm(y)` plus the object, on the cover and the last page.

## Styles and casts

Two settings in `book.config.js`, both overridable on the URL for comparing (`?style=ink`):

| setting | swaps | values |
|---|---|---|
| `style` | how every shape is drawn: outlines, texture, shadows, lettering. CSS and SVG filters in `book.css` and `shell.html`. | `paper` (cut paper), `ink` (coloured pen and ink with a wash), `felt` (thick cut felt standing off the page: side wall, soft shadow, matted fibres), `embroidery` (satin-stitch fills at three angles, backstitched outlines, linen ground) |
| `cast` | who plays each role. A file in `engine/runtime/casts/` that registers replacements in `CASTS`. | `paper` (paper people). The only cast for now; the mechanism is kept for the next one. |

- A page can set its own `style:` and `cast:` in `scene.js`; the URL still wins.
- `as(style, cast, () => ...)` draws part of a scene in another style and cast, so one page can mix them (each piece carries its style as an `st-*` class).
- A cast replaces role helpers (`dev`, `face`, `agent`, `metric`, `repo`, `cloud`, `photo`, `rocket`, `book`) with the **same arguments, feet point and height**. Scenes never check which cast is playing.
- A new role helper that a cast might replace → add it to `ROLES` and `useCast()` at the end of `cast.js`.
- Pieces that should read as one shape in `ink` (a bubble and its tail, a cloud) go inside `<g class="solid">`, which gets one outline round the whole group.
- `embroidery` is the one style with JS: `poly()` adds satin stitch (`#satin0`-`#satin2`, chosen from the piece's position) to every piece 20 units or larger.
- `check` draws every page in every style with every cast. `contact <slug>` writes `site/<slug>/contact-9.html`, every page in a grid; add `?style=` and `?cast=` to see the book another way.
- Small pieces (under 10 across: pupils, specks) get the class `tiny`, and textured styles leave them crisp.
