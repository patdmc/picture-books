({
  bg: P.mint,
 draw(S){const n=Math.min(S.n,6),P=[[170,310],[630,310],[110,478],[690,478],[275,486],[525,486]];let s='';
  const one=i=>{const[x,y]=P[i];return `<g class="${i===n-1?'pop':''}">`+dev(x,y,1.2,DEVS[i+1],{m:'happy',look:x<400?1:-1,tuft:i%2===0})+book(x+(x<400?34:-62),y-95,28)+'</g>'};
  for(let i=0;i<Math.min(n,2);i++)s+=one(i);
  s+=hot('Invite another dev',dev(400,350,1.55,DEVS[0],{m:'happy',up:n>0,up2:n>2})+book(376,235,48));
  for(let i=2;i<n;i++)s+=one(i);return s},
})
