({
  bg: P.mint,
  tap: ()=>go(1,1),
  draw(){return txt(400,92,'If You Give a Dev',58,C.ink)+txt(400,166,'a Repo…',66,C.red)
    +dev(240,468,2.1,DEVS[0],{up:true,look:1,m:'wow'})+arm(330)+hot('Give the Dev a repo',repo(560,372,.9,{look:-1}))},
})
