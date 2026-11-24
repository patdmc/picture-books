({
  bg: P.mint,
 draw(S){const n=Math.min(S.n,5),dx=n*18;let s=box(-10,400,820,110,C.navy)+txt(400,464,'platform',30,C.white)+wavy(4,398);
  for(let i=0;i<2+n*2;i++)s+=box(580+(i%3)*70,338-Math.floor(i/3)*62,62,56,MC[i%7],i>=n*2&&n?'pop':'');
  for(let i=0;i<3+n*2;i++){const y=310+h(i,7,1)*80,x=14+Math.abs(h(i,2,9))*70;s+=strip(x,y,x+50+n*14,y,7,C.white)}
  let a='';[[150,AC[1]],[270,AC[2]],[390,AC[3]]].forEach(([x,c])=>a+=agent(x+dx,396,1.25,c,{up:true,look:1}));
  return s+hot('Go faster',a)},
})
