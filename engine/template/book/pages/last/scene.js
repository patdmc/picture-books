({
  bg: P.teal,
  tap: () => go(1, 1),                                // the last page turns back to page 1
  draw() {
    return dev(190, 468, 1.8, DEVS[0], { m: 'wow', look: 1, up: true })
      + arm(250) + hot('Give the Dev another one', metric(535, 235, 36));
  },
})
