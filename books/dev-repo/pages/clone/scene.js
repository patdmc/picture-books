({
  bg: P.pink,
  draw(S){const L=["$ git clone <your repo URL>"],U=[0,1],n=Math.min(S.n,U.length-1),done=n===U.length-1;
    return cloud(180,120)+repo(180,100,.45,{awake:true})+dev(110,470,1.4,DEVS[0],{m:'happy',look:1})+dev(690,470,1.4,DEVS[1],{m:done?'wow':'flat',look:-1,up:done})+(done?repo(530,470,.9,{awake:true,look:1,cls:'pop'})+say(470,210,'Got my own copy!',{tx:668,ty:318,cls:'pop'}):'')+tmHot(L,U[n])},
})
