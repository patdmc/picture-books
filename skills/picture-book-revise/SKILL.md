---
name: picture-book-revise
description: Change a finished picture book in the picture-books repo, for example reword a page, recolour a background, add or change an interaction, reorder or cut pages. Use when asked to fix, tweak or edit a page of an existing picture book.
allowed-tools: Bash Read Write Edit Artifact Skill
---

# Picture Book: revise

**Repo root:** this skill is a symlink into the picture-books repo. Resolve its real path; the root is two levels up. Run every command from the root.

## Find the page

"Page 4 of the agent book" → `books/dev-agent/cut.js`, entry 4 (the cover is 0) → `books/dev-agent/pages/<name>/`. Two books could match → ask which.

## Change

| Ask | Touch |
|---|---|
| Words | `pages/<name>/lines.js`. Author's own lines → `writing` skill first; suggest, apply what they pick. |
| Picture, colours, interaction | `pages/<name>/scene.js`. Rules: `engine/docs/DESIGN.md`. API: `engine/docs/CAST.md`. |
| Order, add, remove | `cut.js`. New page → `node engine/cli/picture-book.js new <slug> <page>`. |
| A rule for every page ("all backgrounds paler") | Every `scene.js` it applies to, in every book, then add the rule to `engine/docs/DESIGN.md`. |
| A shape several books use | `engine/runtime/cast.js`, then check every book. |

A reword that changes what a later page refers to → fix that page too, and say so.

## After every change

1. `node engine/cli/picture-book.js check <slug>` → `ok`. An engine change → `check --all`.
2. `build <slug> --artifact` → republish `out/<slug>.html` to the same Artifact so the author can look.
3. Report what changed, any side effect (a recoloured piece, a second caption), and that the render is unverified.
4. Author approves → `build --all --root`, commit sources and built pages together. Ask before pushing; a push to `main` deploys the public site.

One ask, one change. Other problems noticed on the way → mention them, leave them.
