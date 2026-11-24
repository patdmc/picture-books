({
  bg: C.sky,
 draw(S){const L=Math.min(S.n*2,10);let s=dev(150,465,1.6,DEVS[0],{m:'happy',look:1,up:true})+box(500,120,260,220,C.ink)+box(610,340,40,50,C.dgrey)+box(560,385,140,16,C.dgrey);
  for(let i=0;i<L;i++){const x=522+(i%3)*14,y=146+i*19;s+=strip(x,y,x+70+Math.abs(h(i,5,6))*110,y,7,[C.lime,C.sky,C.yellow,C.pink][i%4],i>=L-2?'pop':'')}
  return s+hot('Ask the agent to write code',agent(370,465,1.7,AC[0],{up:S.n>0,look:1}))},
})
