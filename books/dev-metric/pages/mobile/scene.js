({
  bg: C.lilac,
 draw(S){const n=Math.min(S.n,4);let s=dev(130,468,1.5,DEVS[0],{m:'happy',look:1})+dev(345,468,1.5,DEVS[1],{m:n?'happy':'wow',look:n?1:-1,tuft:1})+box(392,360,30,52,C.ink)+box(396,366,22,36,C.sky);
  s+=hot('Build the platform',bubble(570,120,130,85,400,280)+metric(520,120,30)+box(600,80,46,80,C.ink)+box(606,90,34,56,C.white)+circ(623,118,9,C.teal));
  const B=[[500,424,270,44,C.purple],[522,376,226,46,C.blue],[546,330,178,44,C.teal],[570,288,130,40,C.orange]];
  for(let i=0;i<n;i++){const[x,y,w,hh,c]=B[i];s+=`<g class="${i===n-1?'pop':''}">`+box(x,y,w,hh,c)+(i===0?txt(635,455,'METRICS PLATFORM',20,C.white):'')+'</g>'}
  if(n===4)s+=`<g class="pop">`+metric(605,268,20,C.yellow)+metric(665,268,20,C.teal)+'</g>';
  return s},
})
