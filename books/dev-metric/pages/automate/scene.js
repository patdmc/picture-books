({
  bg: P.teal,
 draw(S){const on=S.n%2===1;let s=box(-10,362,820,36,C.ink);for(let x=50;x<800;x+=140)s+=circ(x,414,17,C.dgrey);
  const bx=x=>box(x,310,62,52,C.kraft)+strip(x+31,310,x+31,362,8,C.brown);
  const bad=x=>box(x,310,62,52,C.kraft)+strip(x+13,320,x+49,352,8,C.red)+strip(x+49,320,x+13,352,8,C.red);
  if(on){let b='';for(let i=-4;i<4;i++)b+=i%4?bx(i*180-40):`<g class="${i?'':'rej'}">${bad(i*180-40)}</g>`;s+=`<g class="belt">${b}</g>`;s+=strip(250,40,250,170,16,C.grey)+strip(250,170,310,240,16,C.grey)+circ(250,170,14,C.dgrey)+poly([[296,236],[322,236],[330,268],[288,268]],C.dgrey)}
  else s+=bx(200);
  s+=box(430,150,26,212,C.purple)+box(566,150,26,212,C.purple)+box(416,118,190,46,C.purple)+txt(511,150,'health check',22,C.white)+circ(511,190,13,on?C.lime:C.dgrey)+(on?circ(511,190,13,C.red,13,'rejl'):'');
  s+=hot(on?'Turn automation off':'Automate releases',box(690,340,70,26,C.dgrey)+(on?strip(725,345,690,270,11,C.grey)+circ(688,266,17,C.lime):strip(725,345,760,270,11,C.grey)+circ(762,266,17,C.red)));
  return s+dev(on?90:150,486,1.3,DEVS[0],{m:on?'happy':'flat',look:1,up:!on})},
})
