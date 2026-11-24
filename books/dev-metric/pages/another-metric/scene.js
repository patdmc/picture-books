({
  bg: C.sky,
 draw(S){const n=Math.min(S.n+1,6);let b=bubble(540,180,200,125,270,330);
  if(!S.n)b+=metric(470,180,34)+txt(610,215,'?',110,C.ink);
  else for(let i=0;i<n;i++)b+=metric(420+(i%3)*120,140+Math.floor(i/3)*85,32,MC[i],i===n-1?'pop':'');
  return dev(200,468,1.8,DEVS[0],{m:S.n?'happy':'worry',look:1})+hot('Add another metric',b)},
})
