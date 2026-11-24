({
  bg: C.sky,
 draw(S){const g=graph(380,80,360,280,V1,C.red,{noline:!S.n,cls:'draw'});
  return dev(190,460,1.7,DEVS[0],{m:S.n?'happy':'wow',look:1})+g.s+(S.n?metric(g.pts[7][0],g.pts[7][1],22,C.yellow,'pop'):hot('Graph the metric',metric(320,300,32)))},
})
