({
  bg: C.sky,
  draw(S){const L=["$ git switch -c new-idea","Switched to a new branch 'new-idea'"],U=[0,1,2],n=Math.min(S.n,U.length-1),done=n===U.length-1;
    return dev(110,470,1.4,DEVS[0],{m:'happy',look:1,up:done})+tracks({y:220,branch:done})+tmHot(L,U[n])},
})
