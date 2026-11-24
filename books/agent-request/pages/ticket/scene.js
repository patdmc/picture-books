({
  bg: C.sky,
 draw(S){const n=Math.min(S.n,3);let s=box(50,80,190,250,C.white)+txt(145,125,'ticket',28,C.ink);
  for(let i=0;i<3;i++)s+=box(115,265-i*42,60,38,BL[i]);
  for(let i=0;i<n;i++)s+=box(560,390-i*96,130,90,BL[i],i===n-1?'pop':'');
  if(n===3)s+=check(725,150,44,C.green,'pop');
  return s+box(520,480,220,14,C.ink)+hot('Build it',agent(380,468,1.8,C.teal,{up:true,look:1}))},
})
