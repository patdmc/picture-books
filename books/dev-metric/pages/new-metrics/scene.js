({
  bg: P.teal,
  tap: ()=>go(1,1),
 draw(){let s=dev(190,468,1.8,DEVS[0],{m:'wow',look:1,up:true})+txt(330,150,'?',90,C.ink)+txt(400,110,'?',60,C.red);
  [[330,455],[385,460],[440,452],[360,412],[415,410],[470,470],[390,368]].forEach(([x,y],i)=>s+=metric(x,y,28,MC[i]));
  return s+arm(250)+hot('Give the Dev a new metric',metric(535,235,36,C.yellow))},
})
