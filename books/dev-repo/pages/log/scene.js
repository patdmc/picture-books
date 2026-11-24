({
  bg: P.pink,
  draw(S){const L=["$ git log --oneline","c41f2a9 Add a footer","8b03e1d Fix a typo","937b9f8 Add the first page"],U=[0,1,4],n=Math.min(S.n,U.length-1),done=n===U.length-1;
    return dev(110,470,1.4,DEVS[0],{m:done?'wow':'happy',look:1})+tracks({y:290})+tmHot(L,U[n])},
})
