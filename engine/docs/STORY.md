# Story rules

Every book picks one **form**, named in `book.config.js` as `form:`. The voice rules below apply to every form; the shape changes.

## Forms

Each form ends on a page that offers a way back to page 1 (a hand, a door, a button). In a how-to book that page is the cheat sheet.

| form | shape | each page hands off by | ends |
|---|---|---|---|
| `chain` | "If You Give a Mouse a Cookie". See **Chain** below. | the next line picks up the object the last one ended on | the first object again, "And then…" |
| `recipe` | Numbered steps. "First, …" "Next, …" One step per page. | finishing a step reveals what the next one needs | the finished dish; the cheat sheet is the recipe card |
| `journey` | There and back. Each page is a stop on the way. | arriving somewhere shows the road to the next stop | back home, carrying what they found |
| `cumulative` | "This is the repo. This is the skill that lives in the repo…" | each page adds one new line and one new piece to the picture; earlier lines repeat | the whole chain read once in full |
| `call-response` | A question to one character, their answer in a bubble, a pointer to the next. | the answer names the next character to ask | the first character is asked again |
| `fortunately` | Alternating pages: "Fortunately, …" / "Unfortunately, …" | each turn's fix causes the next problem, or vice versa | a fortunate page that resolves the first problem |
| `countdown` | "Five steps to live." Counting down, one step per page. | the number drops | zero: the thing is live |

12 to 20 pages for every form, cover and cheat sheet included.

## How-to books

- Commands in the art are exact and runnable. A command a reader could copy must work as shown.
- Commands appear in a `term()` as `$ ` lines. At most one new command per page.
- Every command typed in the art is on the cheat sheet (`new <slug> cheat-sheet --sheet`), in story order. `check` warns when one is missing.
- The cheat sheet's `note` for each command is a short plain sentence: what it does, not how.
- Bubbles carry what a character says or asks. The caption carries the story. A command can be said in a bubble only if it is also on the terminal.
- Claude Code commands, paths and flags are confirmed against current docs before they go on a page. Never from memory.

## Chain

- Title: "If You Give a/an [character] a/an [thing]…" The title is the first half of line 1.
- Line 1 completes the title: "They're gonna want to graph it."
- 15 to 20 lines. One idea per line. One or two sentences.
- Each line picks up the object the previous line ended on.
- The argument sits in the middle third. State the main point as plainly as any other line.
- Last line returns to the first line's object and ends "And then…"

## Voice (the author's choices, 2026-11-23)

- "gonna" throughout. The mouse book itself says "going to" and "he'll"; the author chose "gonna" anyway.
- Chain words: Once, When, Then, So, After, If, With. No opening "And" or "But" except the last line, which opens with "And".
- "they" for every character. "you" only in the title and the last line.
- Capitalise the characters (the Dev, the Metric). Lowercase everything else (the light, green, productive).
- Every caption ends with a period or "!".
- No em dashes. Colon for a list or a specification; comma for an aside.

## Tightening patterns seen in these books

- Says it twice: "threshold limits" → "thresholds"; "join in and contribute" → "join in"; "ship faster and release more updates" → "ship more often".
- Long noun phrase with a short name: "standard operating procedures" → "runbooks"; "rotate coverage of being on call" → "take turns on call"; "co-locate" → "in one place".
- Repeated tail: cut a closing clause that restates the opening ("when they look at their graph").
- Positive form: "doesn't harm production" → "is safe".
- One name per thing: a term introduced on one page keeps that name on later pages.
- Order check: a line may only refer to things an earlier line introduced. Swap pages when it does not.

## Retelling an existing piece

- Problem pages first (what goes wrong), then the fix as a chain of wants, then the loop.
- Keep the source's own terms for its key ideas; define each by showing it once in the art.
- Numbers, repo names and citations stay in the source. A picture book carries the shape of the argument.
- Two sources → say in the plan what each contributes and the rough split of pages.
