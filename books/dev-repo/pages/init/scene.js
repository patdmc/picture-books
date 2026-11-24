({
  bg: C.sky,
  draw(S){const L=["$ git init -b main","Initialized empty Git repository"],U=[0,1,2],n=Math.min(S.n,U.length-1),done=n===U.length-1;
    return dev(120,470,1.5,DEVS[0],{m:done?'happy':'flat',look:1})+repo(310,470,1.3,{awake:done,look:-1})+(done?say(330,250,'Hi! I’m a repo.',{tx:320,ty:330,cls:'pop'}):'')+tmHot(L,U[n])},
})
