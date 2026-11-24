({
  bg: P.teal,
  tap: ()=>go(1,1),
 draw(){let s=dev(180,465,1.8,DEVS[0],{m:'wow',look:1,up:true});[[330,472],[402,476],[474,470],[366,402],[440,400]].forEach(([x,y],i)=>s+=agent(x,y,.8,AC[i+1]));
  return s+arm(270)+hot('Give the Dev another agent',agent(545,248,1.05,C.orange,{up:true}))},
})
