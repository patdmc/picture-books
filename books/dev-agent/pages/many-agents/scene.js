({
  bg: P.pink,
 draw(S){const k=Math.min(1+S.n,12),X=[110,300,490,680];let a='';
  for(let d=0;d<Math.min(k,4);d++)a+=dev(X[d],262,1.2,DEVS[d],{m:'happy',up:k>4+d,tuft:d%2===1,cls:d===k-1&&S.n?'pop':''});
  for(let j=0;j<k;j++)a+=agent(X[j%4]+[0,-58,58][Math.floor(j/4)],468,.88,AC[(j*3)%10],{cls:j===k-1&&S.n?'pop':'',up:j%2===0});
  return hot('Hand out another agent',a)},
})
