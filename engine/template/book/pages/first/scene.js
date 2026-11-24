({
  bg: P.mint,
  draw(S) {
    const n = Math.min(S.n, 5);                       // cap the payoff
    let s = dev(190, 460, 1.7, DEVS[0], { m: n ? 'happy' : 'flat', look: 1 });
    for (let i = 0; i < n; i++) s += metric(420 + i * 70, 300, 28, MC[i], i === n - 1 ? 'pop' : '');   // only the newest piece pops
    return s + hot('Add a metric', metric(330, 300, 32));
  },
})
