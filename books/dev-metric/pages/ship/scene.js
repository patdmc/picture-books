({
  bg: P.teal,
 draw(S){const v=[...Array(8)].map((_,i)=>Lv(i+S.n)),g=graph(300,50,430,270,v,C.red);let s=dev(140,462,1.6,DEVS[0],{m:'happy',look:1})+g.s;
  s+=hot('Ship code',box(310,372,180,84,C.red)+txt(400,430,'SHIP',44,C.white));
  for(let i=0;i<Math.min(S.n,8);i++){const x=530+(i%4)*56,y=418-Math.floor(i/4)*50;s+=`<g class="${i===Math.min(S.n,8)-1?'pop':''}">`+box(x,y,48,42,C.kraft)+strip(x+24,y,x+24,y+42,7,C.brown)+'</g>'}
  return s},
})
