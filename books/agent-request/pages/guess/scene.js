({
  bg: P.pink,
 draw(S){const n=Math.min(S.n,3);let s=box(130,90,540,200,C.white)+txt(400,140,'what the Dev wanted',26,C.ink)+box(160,180,110,50,C.red);
  for(let i=0;i<3;i++)s+=i<n?box(278+i*122,180,114,50,C.grey,i===n-1&&S.n<=3?'pop':''):txt(335+i*122,222,'?',42,C.grey);
  if(S.n>3)s+=`<g class="pop">`+box(420,238,150,44,C.ink)+txt(495,270,'FACT',28,C.white)+'</g>';
  return s+hot('Fill the gap',agent(400,474,1.55,C.teal,{up:true}))+dev(700,476,1.25,DEVS[0],{m:S.n>3?'worry':'flat',look:-1})},
})
