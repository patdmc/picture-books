({
  bg: P.mint,
 draw(S){const n=Math.min(S.n,5);let s=box(40,330,170,130,C.kraft)+poly([[40,330],[210,330],[226,305],[24,305]],C.brown)+txt(125,410,'HARNESS',22,C.brown)+box(450,50,300,400,C.white)+txt(600,105,'MEMORY',32,C.red);
  for(let i=0;i<n;i++){const y=160+i*58;s+=`<g class="${i===n-1?'pop':''}">`+circ(490,y,13,i%3===1?C.red:C.green)+strip(518,y-8,720-(i%2)*50,y-8,6,C.grey)+strip(518,y+10,650-(i%3)*30,y+10,6,C.grey)+'</g>'}
  return s+hot('Remember why',agent(340,474,1.6,C.purple,{up:true,look:1})+strip(404,350,430,318,8,C.yellow))},
})
