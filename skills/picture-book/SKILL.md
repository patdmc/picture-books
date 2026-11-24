---
name: picture-book
description: Turn an idea, essay or artifact into an interactive cut-paper picture book in the circular "If You Give a Mouse a Cookie" style. Use when asked for a picture book, a "markov chain" or "if you give a..." retelling, or to "picture-book" an existing doc or artifact. To change a finished book, use picture-book-revise.
allowed-tools: Bash Read Write Edit Artifact Skill
---

# Picture Book: script a new book

A book is a folder in `books/`. Each page is a folder with its words (`lines.js`) and its picture (`scene.js`). `cut.js` orders the pages. The engine in `engine/` is shared.

**Repo root:** this skill is a symlink into the picture-books repo. Resolve its real path; the root is two levels up. Run every command from the root.

Read before writing: `engine/docs/STORY.md`, `engine/docs/CAST.md`, `engine/docs/DESIGN.md`, and one finished book in `books/`.

## Workflow

1. **Source.** Pasted text → use it. Artifact link → `Artifact` action `read`; extract the argument in order. Someone else's source → say so in the plan.
2. **Plan + draft chain, then stop.** Show: title, the numbered lines, how it could look (cast, recurring props), decisions for the author. Wait for approval.
3. **Words pass.** Any edit to the author's own lines → run the `writing` skill, suggest, apply only what they pick.
4. **Create.** `node engine/cli/picture-book.js init <slug> "<Title>"`, then `new <slug> <page>` per line. Name pages by what happens (`thresholds`, `pile-up`), never by number.
5. **Write.** `lines.js` and `scene.js` per page; the order in `cut.js`; book-only shapes in `helpers.js`.
6. **Check.** `node engine/cli/picture-book.js check <slug>` → must print `ok`. Fix errors; read every WARN.
7. **Publish a draft.** `build <slug> --artifact` → publish `out/<slug>.html` with the `Artifact` tool. Private until the author shares it.
8. **Report.** Link, what each page does, every word in the art that is not in the story, and that the render is unverified unless someone looked.
9. **Shelve.** Author happy → add the slug to `books/shelf.js`, fill `tag`, `swatch`, `blurb` in `book.config.js`, commit. Ask before pushing; a push to `main` deploys the public site.

## Out of scope

Sound, narration, recreating any existing book's characters or art.
