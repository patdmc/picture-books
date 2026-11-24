({
  bg: C.sky,
 draw(S){const D=[[130,120],[660,115],[125,370],[670,375]];let s='';D.forEach(([x,y])=>s+=strip(400,230,x,y,7,C.white));
  let sv='';for(let i=0;i<3;i++)sv+=box(325,150+i*56,150,50,C.ink)+circ(350,175+i*56,7,C.lime)+circ(372,175+i*56,7,S.n?C.lime:C.yellow)+strip(400,175+i*56,455,175+i*56,6,C.dgrey);
  s+=hot('Ship a server change',sv);
  s+=box(102,62,56,104,C.ink)+box(108,72,44,78,C.white);
  s+=box(606,70,108,70,C.ink)+box(613,77,94,56,C.white)+box(590,140,140,12,C.grey);
  s+=box(70,330,110,80,C.ink)+box(78,338,94,64,C.white);
  s+=strip(670,320,670,430,22,C.brown)+box(646,350,48,50,C.ink)+box(652,356,36,38,C.white);
  D.forEach(([x,y],i)=>{const bx=x+(i%2?-66:60),by=y-40;s+=S.n?`<g class="pop" style="animation-delay:${i*130}ms">`+circ(bx,by,22,C.green)+check(bx-2,by-2,20,C.white)+'</g>':circ(bx,by,22,C.grey)+txt(bx,by+11,'?',30,C.white)});
  return s+dev(400,492,1.15,DEVS[0],{m:S.n?'happy':'flat',up:S.n>0})},
})
