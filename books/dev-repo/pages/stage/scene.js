({
  bg: P.teal,
  draw(S){const L=["$ git add index.html"],U=[0,1],n=Math.min(S.n,U.length-1),done=n===U.length-1;
    return dev(120,470,1.5,DEVS[0],{m:'happy',look:1})+repo(290,470,1.1,{awake:true,page:!done,look:1})
    +box(430,400,280,70,C.brown)+box(420,180,26,220,C.red)+box(694,180,26,220,C.red)+box(420,170,300,22,C.red)+txt(570,450,'staged',26,C.white)
    +(done?book(545,300,58,'pop'):'')+tmHot(L,U[n])},
})
