({
  bg: C.sky,
  draw(S){const L=["$ git remote add origin <your repo URL>"],U=[0,1],n=Math.min(S.n,U.length-1),done=n===U.length-1;
    return dev(110,470,1.4,DEVS[0],{m:'happy',look:1})+repo(300,470,1.1,{awake:true,look:-1,m:done?'wow':''})+(done?cloud(180,120,'pop'):'')+tmHot(L,U[n])},
})
