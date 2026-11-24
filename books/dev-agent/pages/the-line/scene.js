({
  bg: C.sky,
 draw(S){const on=S.n>0,B=[[C.orange,1],[C.blue,0],[C.pink,1],[C.navy,0],[C.yellow,1],[C.purple,0],[C.red,1],[C.teal,0]];let s='';
  B.forEach(([c,app],i)=>{const x=on?240+Math.floor(i/2)*135:230+(i%4)*135+h(i,3,3)*20,y=on?(app?120:320):70+Math.floor(i/4)*170+h(i,8,2)*40+(i%2)*60;s+=box(x,y,110,80,c,on?'pop':'')});
  if(on)s+=wavy(200,262,'draw')+mk(240,98,'application',30)+mk(240,452,'platform',30);
  return s+hot('Draw the line',dev(100,465,1.35,DEVS[0],{m:on?'happy':'worry',look:1,up:true})+strip(150,318,166,286,9,C.red))},
})
