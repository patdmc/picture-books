({
  bg: C.sky,          // paler than the pieces on it; dark: true only for night scenes
  draw(S) {           // S.n counts taps on this page; it resets on every page turn
    const n = Math.min(S.n, 4);
    return dev(200, 460, 1.7, DEVS[0], { m: n ? 'happy' : 'flat', look: 1 })
      + hot('What the tap does', box(480, 220, 160, 120, C.orange));
  },
})
