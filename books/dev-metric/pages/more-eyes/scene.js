({
  bg: C.lilac,
 draw(S){const n=Math.min(S.n,6),L=Math.min(3+S.n,8);let b=box(150,170,205,270,C.white)+box(358,170,205,270,C.white)+strip(356,165,356,445,8,C.red);
  for(let i=0;i<L;i++){const y=205+i*28;b+=strip(172,y,330-h(i,1,1)*20,y,4,C.grey)+strip(380,y,540-h(i,2,2)*20,y,4,C.grey)}
  let s=hot('Add more eyes',b);
  for(let i=0;i<n;i++){const x=120+i*92+(i%2)*10,y=95-(i%2)*38;s+=`<g class="${i===n-1?'pop':''}">`+circ(x,y,18,C.white)+circ(x+40,y,18,C.white)+circ(x+3,y+6,8,C.ink)+circ(x+43,y+6,8,C.ink)+'</g>'}
  if(n>=2)s+=`<g class="${n===2?'pop':''}">`+strip(210,430,260,340,12,C.yellow)+poly([[204,440],[204,426],[216,432]],C.ink)+'</g>';
  if(n>=4)s+=`<g class="${n===4?'pop':''}">`+strip(520,430,470,345,12,C.teal)+poly([[526,440],[526,426],[514,432]],C.ink)+'</g>';
  const hc=n>=4?C.green:n>=2?C.lime:C.orange;
  return s+heart(680,270,4.2,hc)+txt(680,385,n>=4?'healthy!':'healthy?',28,C.ink)},
})
