({
  bg: P.mint,
 draw(S){const m=S.n%2===1;let s=box(240,90,350,360,C.white)+strip(240,90,590,90,10,C.ink)+strip(240,90,240,450,10,C.ink)+strip(590,90,590,450,10,C.ink)+strip(240,450,590,450,10,C.ink);
  const T=[[470,385],[470,325],[470,265],[470,205]],M=[[430,386],[512,388],[478,312],[524,236]];
  (m?M:T).forEach(([x,y],i)=>s+=box(x,y,62,56,MC[i+1],m?'pop':''));
  if(m)s+=mk(290,160,'crash!',36,-6,'pop');
  s+=box(650,240,110,205,C.navy)+txt(705,350,'main',28,C.white)+(S.n?check(705,200,40,C.green,'pop'):'');
  return s+dev(110,474,1.3,DEVS[0],{m:'happy',look:1})+hot('Let it build',agent(340,444,1.5,C.teal,{up:true,look:1}))},
})
