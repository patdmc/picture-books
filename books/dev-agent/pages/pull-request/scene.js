({
  bg: P.kraft,
 draw(S){const n=Math.min(S.n,4);let s=dev(120,465,1.5,DEVS[0],{m:'happy',look:1});
  for(let i=0;i<n;i++)s+=pr(580+i*16,270-i*22,110,i===n-1?'pop':'');
  s+=box(540,392,230,56,C.brown)+txt(655,428,'pull requests',22,C.white);
  return s+hot('Open a pull request',agent(350,465,1.7,AC[0],{up:true,look:1})+pr(398,235,80))},
})
