({
  bg: P.pink,
 draw(S){const k=S.n%5,b=agent(400,262,1.7,AC[k],{cls:S.n?'pop':'',up:true})+poly([[240,200],[560,200],[592,158],[208,158]],C.brown)+box(240,200,320,230,C.kraft)+txt(400,332,'HARNESS',40,C.brown)+box(240,290,16,60,C.ink)+box(544,290,16,60,C.ink);
  let s=box(60,270,100,120,C.white)+txt(110,318,'brief',24,C.ink)+strip(76,345,144,345,5,C.grey)+strip(76,365,130,365,5,C.grey)+poly([[178,310],[218,330],[178,350]],C.orange)+poly([[580,310],[620,330],[580,350]],C.orange);
  if(S.n)s+=pr(640,262,100,'pop')+txt(690,420,'diff',26,C.ink);
  return s+hot('Swap the agent',b)},
})
