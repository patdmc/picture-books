({
  bg: P.teal,
  tap: ()=>go(1,1),
 draw(){let s='';[[80,474],[185,478],[290,472]].forEach(([x,y],i)=>s+=dev(x,y,1.1,DEVS[i+1],{m:'happy',up:true,look:1,tuft:i%2===0})+req(x+30,y-172,34));
  return s+agent(420,474,1.5,C.orange,{look:1,m:'flat'})+arm(250)+hot('Give the agent another request',req(505,165,70))},
})
