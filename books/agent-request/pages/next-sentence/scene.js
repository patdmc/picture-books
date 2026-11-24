({
  bg: C.sky,
 draw(S){const n=Math.min(S.n,2),seg=[C.red,C.orange,C.green];let sh=box(450,70,310,370,C.white)+txt(605,120,'the sentence',26,C.ink);
  for(let i=0;i<=n;i++){const y=160+i*88;let v=txt(475,y+30,'v'+(i+1),24,C.ink,'start');for(let j=0;j<=i;j++)v+=box(530+j*72,y,68,40,seg[j]);sh+=`<g class="${i===n&&n?'pop':''}" ${i<n?'opacity=".4"':''}>${v}</g>`}
  return dev(140,474,1.7,DEVS[2],{m:'wow',look:1,up:true,tuft:1})+sh+hot('Say what you want now',bubble(300,130,120,62,190,255)+circ(262,130,10,C.ink)+circ(300,130,10,C.ink)+circ(338,130,10,C.ink))},
})
