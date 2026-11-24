({
  bg: P.pink,
 draw(S){const k=S.n%3;let b=box(260,50,500,390,C.blue);for(let i=1;i<5;i++)b+=strip(260+i*100,56,260+i*100,434,2,C.sky);for(let i=1;i<4;i++)b+=strip(266,50+i*98,754,50+i*98,2,C.sky);
  [[300,90,120,80],[470,110,150,70],[640,80,90,120],[310,250,100,130],[460,300,130,90],[630,280,100,110]].forEach(([x,y,w,hh])=>b+=box(x,y,w,hh,C.white));
  b+=[strip(440,70,440,420,12,C.orange),strip(280,225,740,225,12,C.orange),strip(290,400,730,90,12,C.orange)][k];
  return dev(130,465,1.6,DEVS[0],{m:'flat',look:1,up:true})+txt(205,150,'?',90,C.ink)+txt(80,120,'?',56,C.red)+hot('Move the guardrail',b)},
})
