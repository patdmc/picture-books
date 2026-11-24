({
  bg: C.sky,
  tap: () => go(1, 1),
  draw() {
    return txt(400, 92, 'If You Give a Dev', 62, C.ink) + txt(400, 166, 'a Thing…', 66, C.red)
      + dev(240, 462, 1.9, DEVS[0], { m: 'wow', look: 1, up: true })
      + arm(300) + hot('Give the Dev the thing', metric(535, 285, 36));
  },
})
