({
  bg: P.mint,
  tap: ()=>go(1,1),
  draw(){return txt(400,100,'This Is the Repo',64,C.ink)+dev(230,468,2,DEVS[0],{m:'happy',look:1})+hot('Open the repo',repo(520,450,1.8,{awake:true,look:-1}))},
})
