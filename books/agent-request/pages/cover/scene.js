({
  bg: P.mint,
  tap: ()=>go(1,1),
 draw(){return txt(400,92,'If You Give an Agent',60,C.ink)+txt(400,166,'a Request…',66,C.red)+agent(250,462,2.3,C.teal,{up:true,look:1})+arm(320)+hot('Give the agent a request',req(505,235,70))},
})
