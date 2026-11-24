({
  bg: P.mint,
 draw(S){const n=Math.min(S.n,4);let s=box(50,160,160,90,C.orange)+txt(130,215,'app code',24,C.white)+check(200,160,30,C.green);
  ['tests','secrets','deploys'].forEach((t,i)=>s+=box(570,80+i*130,180,92,C.navy)+txt(660,136+i*130,t,26,C.white));
  for(let i=0;i<=n;i++){const y=30+i*96;s+=`<g class="${i===n&&n?'pop':''}">`+(i?strip(481,y-30,481,y+14,10,C.red):'')+box(470,y,22,72,C.grey)+'</g>'}
  s+=hot('Add a rail',box(230,30,180,58,C.ink)+txt(320,69,'ADD RAIL',26,C.white));
  return s+agent(330,465,1.6,C.purple,{up:n<4,look:1,m:n<4?'':'flat'})},
})
