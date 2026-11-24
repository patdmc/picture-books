({
  bg: C.sky,
  draw(S){const L=["$ git push -u origin main","* [new branch]  main -> main"],U=[0,1,2],n=Math.min(S.n,U.length-1),done=n===U.length-1;
    return dev(110,470,1.4,DEVS[0],{m:done?'wow':'happy',look:1,up:done})+cloud(180,120)+(done?rocket(300,330,'pop')+repo(180,100,.45,{awake:true,cls:'pop'}):repo(300,470,1.1,{awake:true,look:-1}))+tmHot(L,U[n])},
})
