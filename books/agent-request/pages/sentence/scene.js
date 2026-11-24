({
  bg: C.sky,
 draw(S){const n=Math.min(S.n,4);let b=box(300,80,440,300,C.white)+txt(520,140,'what I want to be true',26,C.ink)+strip(330,330,700,330,4,C.grey);
  for(let i=0;i<n;i++)b+=box(326+i*96,200,90,46,C.red,i===n-1?'pop':'');
  if(n===4)b+=circ(720,238,8,C.red,8,'pop');
  return dev(160,474,1.8,DEVS[0],{m:n===4?'happy':'flat',look:1,up:true})+strip(232,270,262,236,9,C.yellow)+hot('Write the sentence',b)},
})
