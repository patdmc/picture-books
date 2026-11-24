({
  bg: P.mint,
 draw(S){const n=Math.min(2+S.n,6);let s=box(85,35,620,410,C.ink);
  for(let i=0;i<6;i++){const x=107+(i%3)*194,y=57+Math.floor(i/3)*188,c=i===n-1&&S.n?'pop':'';
   if(i<n){let t=box(x,y,178,170,C.white);
    if(i<2)t+=ribbon([.3,.5,.4,.7,.6,.85].map((v,j)=>[x+20+j*27,y+150-(i?1-v+.15:v)*120]),7,i?C.teal:C.red);
    if(i===2)[.4,.7,.5,.9].forEach((v,j)=>t+=box(x+22+j*36,y+152-v*120,26,v*120,[C.blue,C.orange,C.purple,C.teal][j]));
    if(i===3)t+=box(x+64,y+18,50,134,C.ink)+circ(x+89,y+42,15,C.lime)+circ(x+89,y+85,15,C.dgrey)+circ(x+89,y+128,15,C.dgrey);
    if(i===4)t+=txt(x+89,y+100,'99.9',52,C.green)+txt(x+89,y+135,'percent up',18,C.ink);
    if(i===5)t+=circ(x+89,y+85,58,C.blue)+poly([[x+89,y+85],[x+89,y+27],[x+132,y+46],[x+147,y+85]],C.yellow);
    s+=`<g class="${c}">${t}</g>`}
   else if(i===n)s+=hot('Add a panel',box(x,y,178,170,C.dgrey)+txt(x+89,y+118,'+',100,C.white))}
  return s+dev(752,486,.9,DEVS[0],{m:'happy',look:-1})},
})
