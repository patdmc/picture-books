({
  bg: C.sky,
 draw(S){const on=S.n>0;let b=bubble(570,185,185,125,330,310);
  if(on)for(let i=0;i<7;i++){const a=3.5+i*.4;b+=poly([[570+Math.cos(a-.09)*64,160+Math.sin(a-.09)*64],[570+Math.cos(a)*92,160+Math.sin(a)*92],[570+Math.cos(a+.09)*64,160+Math.sin(a+.09)*64]],C.orange,'pop')}
  b+=box(548,206,44,32,C.dgrey)+circ(570,160,52,on?C.yellow:C.grey);
  return sun(110,90)+dev(230,465,1.9,DEVS[0],{m:on?'wow':'happy',look:1,up:on,up2:true})+hot('Have an idea',b)},
})
