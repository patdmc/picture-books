({
  bg: P.pink,
  draw(S){const L=["$ echo \"hello\" > index.html"],U=[0,1],n=Math.min(S.n,U.length-1),done=n===U.length-1;
    return dev(120,470,1.5,DEVS[0],{m:'happy',look:1,up:done})+(done?repo(310,470,1.3,{awake:true,page:true,look:-1,cls:'pop'}):repo(310,470,1.3,{awake:true,look:-1}))+tmHot(L,U[n])},
})
