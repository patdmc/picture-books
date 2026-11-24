({
  bg: P.kraft,
  tap: () => go(1, 1),                                // like any last page, the hand turns back to page 1
  draw() {                                            // this.commands is the list from lines.js
    const L = this.commands.slice(0, 6).map(c => '$ ' + c.cmd);
    return dev(130, 468, 1.6, DEVS[0], { m: 'happy', look: 1 })
      + term(220, 50, 400, 60 + L.length * 26, L, { cursor: false })
      + arm(330) + hot('Start the story again', box(500, 300, 70, 56, C.orange));
  },
})
