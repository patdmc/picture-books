({
  bg: C.sky,
 draw(S){const n=Math.min(S.n,4);let b=box(210,40,330,420,C.white)+txt(375,95,'BRIEF',36,C.red)+txt(240,150,'can touch',24,C.ink,'start')+txt(240,300,'done looks like',24,C.ink,'start');
  for(let i=0;i<Math.min(n,2);i++)b+=`<g class="${i===n-1?'pop':''}">`+box(250,170+i*48,34,34,BL[i])+strip(300,187+i*48,480-i*40,187+i*48,6,C.grey)+'</g>';
  if(n>=3)b+=`<g class="${n===3?'pop':''}">`+box(250,397,40,36,BL[0])+box(250,358,40,36,BL[1])+box(250,320,40,35,BL[2])+'</g>';
  if(n>=4)b+=check(360,385,44,C.green,'pop');
  return dev(100,474,1.3,DEVS[0],{m:'happy',look:1,up:true})+hot('Write the brief',b)+agent(660,474,1.7,C.teal,{look:-1})},
})
