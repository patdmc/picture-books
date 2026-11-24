({
  bg: C.teal,
  dark: true,
 draw(S){const k=Math.min(3+S.n*4,27);let s=dev(140,465,1.6,DEVS[0],{m:['happy','flat','worry','wow'][Math.min(S.n,3)],look:1});
  for(let i=0;i<k;i++)s+=pr(215+h(i,1,1)*45+(i%2)*20,395-i*12,105,i>=k-4&&S.n?'pop':'');
  let a='';[540,640,740].forEach((x,i)=>a+=agent(x,465,1.15,AC[i+1],{up:true,look:-1}));
  if(k>=27)s+=txt(78,232,'!',62,C.yellow,'middle','pop')+txt(118,208,'!',82,C.yellow,'middle','pop')+txt(158,232,'!',62,C.yellow,'middle','pop');
  return s+hot('Send more pull requests',a)},
})
