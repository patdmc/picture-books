# picture-books

Interactive cut-paper picture books about how software gets built. Each one is a chain: every page's result causes the next page, and the last page turns back to the first.

Read them at https://patdmc.github.io/picture-books/

## Layout

```
engine/
  runtime/     the page shell, page turns, cut-paper shapes and the cast
  cli/         picture-book.js: init, new, build, check
  template/    what a new book and a new page start from
  site/        the landing page template
  docs/        STORY.md, CAST.md, DESIGN.md
docs/          the built site that GitHub Pages serves (generated; do not edit)
skills/        Claude Code skills: picture-book (script a book), picture-book-revise
books/
  shelf.js     the books on the landing page, in order
  <slug>/
    book.config.js       title and shelf card
    cut.js               the pages, in story order
    helpers.js           shapes only this book uses
    pages/<name>/lines.js    the caption and the hint
    pages/<name>/scene.js    the picture and what a tap does
```

## Commands

Needs Node 18 or later. No dependencies.

```sh
node engine/cli/picture-book.js init my-book "If You Give a Dev a Thing"
node engine/cli/picture-book.js new my-book thresholds    # then add 'thresholds' to books/my-book/cut.js
node engine/cli/picture-book.js check --all               # draws every page at several tap counts
node engine/cli/picture-book.js build --all               # writes site/ for a local look
node engine/cli/picture-book.js contact my-book           # every page on one sheet; add ?style=ink
node engine/cli/picture-book.js edit                      # the local editor at http://localhost:4800
open site/index.html
```

`build <slug> --artifact` writes `out/<slug>.html`, a page body for publishing as a Claude Artifact.

## The editor

`node engine/cli/picture-book.js edit` serves an editor on `http://localhost:4800` (this machine only):

- **Script:** every page's caption and hint, edited in place; drag a page (or use its arrows) to reorder `cut.js`; add or remove pages.
- **Preview:** the selected page, live, in any style and cast.
- **Source:** the page's `lines.js` and `scene.js`; save with Cmd+S and the check runs.
- **New book:** give a title and the whole idea (and, if you like, the form and style). Claude writes every page from it, and the book opens in the editor for you to revise.
- **Ask Claude:** say what to change in your own words. It runs the Claude Code CLI (`claude -p`) in this repo with edit access to the book and permission to run the check, streams what it does, and reloads the preview. Needs Claude Code installed and logged in.

## Deploying

The built pages are committed in `docs/` (the shelf at `docs/index.html`, one folder per book), and GitHub Pages serves `main:/docs`. After changing a book or the engine:

```sh
node engine/cli/picture-book.js build --all --pages
```

Commit the result with the change. The workflow checks every book and fails a push whose committed pages are stale; it does not deploy.

## Using the skills

Link them into Claude Code:

```sh
ln -s "$PWD/skills/picture-book" ~/.claude/skills/picture-book
ln -s "$PWD/skills/picture-book-revise" ~/.claude/skills/picture-book-revise
```

## Licence

MIT. See `LICENSE`.
