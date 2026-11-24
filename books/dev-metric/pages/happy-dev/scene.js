({
  bg: P.pink,
 draw(S){const k=Math.min(S.n*7,49),L=Math.min(3+S.n*2,10);let s='';
  for(let i=0;i<k;i++){const x=400+h(i,1,2)*370,y=235+h(i,3,4)*215,c=MC[i%7],cl=i>=k-7&&S.n<=7?'pop':'';s+=i%2?box(x,y,13,13,c,cl):poly([[x,y],[x+16,y+4],[x+5,y+17]],c,cl)}
  let d=dev(400,408,2.2,DEVS[0],{m:'happy',up:S.n>0,up2:S.n>0})+box(262,218,276,186,C.ink);
  for(let i=0;i<L;i++){const x=282+(i%3)*14,y=238+i*16;d+=strip(x,y,x+70+Math.abs(h(i,5,6))*120,y,6,[C.lime,C.sky,C.yellow,C.pink][i%4])}
  d+=box(236,402,328,22,C.grey);s+=hot('Celebrate',d);
  if(S.n)s+=heart(560,120,1.5,C.red,'pop')+heart(238,140,1.1,C.red,'pop');
  return s},
})
