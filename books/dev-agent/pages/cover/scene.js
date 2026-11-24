({
  bg: C.lilac,
  tap: ()=>go(1,1),
 draw(){return txt(400,92,'If You Give a Dev',62,C.ink)+txt(400,166,'an Agent…',66,C.red)+dev(240,462,1.9,DEVS[0],{m:'wow',look:1,up:true})+arm(320)+hot('Give the Dev an agent',agent(545,298,1.05,C.teal,{up:true}))},
})
