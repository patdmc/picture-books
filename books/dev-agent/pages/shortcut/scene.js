({
  bg: P.kraft,
 draw(S){const del=S.n%2===1;let s=box(470,170,26,232,C.purple)+box(604,170,26,232,C.purple)+box(456,134,190,48,C.purple)+txt(551,168,'tests',24,C.white)+circ(551,215,15,del?C.lime:C.red)+box(430,402,240,22,C.ink);
  const sheet=(x,y,c)=>`<g class="${c}">`+box(x,y,84,104,C.white)+txt(x+42,y+40,'test',24,C.ink)+strip(x+14,y+62,x+70,y+62,5,C.grey)+strip(x+14,y+80,x+56,y+80,5,C.grey)+'</g>';
  s+=del?sheet(98,318,'pop'):sheet(205,285,'');
  s+=poly([[80,380],[200,380],[188,470],[92,470]],C.dgrey)+box(72,366,136,18,C.dgrey);
  s+=hot(del?'Put the test back':'Take the shortcut',agent(350,465,1.5,C.red,{look:del?-1:1,up:del}));
  return s+dev(730,468,1.4,DEVS[0],{m:del?'wow':'flat',look:-1})+(del?mk(300,90,'all green!',36,-4,'pop'):'')},
})
