# Design rules

## The look

One sheet of paper on a green cutting mat. Every shape is a flat polygon with slightly off corners and a soft shadow, as if cut with scissors and laid down by hand. Paper grain covers the whole sheet.

## Rules

- **Backgrounds paler than the subjects.** Use `C.sky`, `C.lilac`, `P.teal`, `P.mint`, `P.pink`, `P.kraft`. Dark only for night scenes or where white paper pieces must stand out; set `dark: true`.
- **No subject in the background's colour.** Yellow dot on yellow paper, lime head on green paper → recolour one. Before choosing a background, list the colours of the pieces on the page.
- **White details need a dark neighbour.** White text or strips on pale paper vanish → use ink, navy or red.
- **Handwriting = red marker.** Notes scrawled on the art use `mk()`, tilted. Cut-paper labels use `txt()`.
- **Art words are extra words.** Keep labels to one or two words. Report each one to the author.
- **One interaction per page**, named in the hint. Payoff within 1 to 6 taps. Add a reaction at the maximum: exclamation points, a check, a changed face.
- **Some taps fail.** One in three or four (a rejected release, a "no") is funnier and truer.
- **Characters are paper coloured**, never skin toned. "They" for everyone.
- **Callbacks.** Reuse a prop from an earlier book when the story touches it: the Metric, the 3am bed, the health check gate.
- **Last page.** A hand offers the first page's object; tapping it runs `go(1, 1)`.

## Engine gotchas

- Animate with the CSS `translate` property and `opacity` only. `scale` or `rotate` on a `<g>` that has a `transform` attribute moves it. Need rotation → nest an inner `<g class="shake">` with no attribute.
- `pop` marks the newest piece only. Compare the index to the current count.
- A shape's wobble comes from its own coordinates, so it is stable across redraws. Moving a piece changes its wobble.
- A looping belt needs identical pieces one period apart. A piece removed mid-loop must also be absent at the loop's end position.
- `hot()` bobs until the first tap. Two tap targets on one page → pass distinct keys and a `tap(S, key)` handler.
- `check` draws every page without a browser. It cannot see overlap, clipping or contrast. Say the render is unverified until someone has looked.
