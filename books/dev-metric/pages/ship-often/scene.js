({
  bg: C.sky,
 draw(S){const n=Math.min(1+S.n,6),c=i=>i===n-1&&S.n?'pop':'';let s=circ(110,90,62,C.white,25)+circ(170,106,44,C.white,19)+circ(640,70,58,C.white,23)+circ(700,88,42,C.white,18)+circ(150,400,50,C.white,20)+box(290,30,220,440,C.ink)+box(306,60,188,372,C.white);
  const parts=[()=>box(316,70,168,44,C.blue),()=>circ(360,165,34,C.pink),()=>box(410,132,70,66,C.lime),()=>box(320,215,160,34,C.yellow),()=>poly([[330,330],[365,265],[400,330]],C.purple),()=>heart(440,300,1.9,C.red)];
  for(let i=0;i<n;i++)s+=`<g class="${c(i)}">${parts[i]()}</g>`;
  s+=txt(400,415,'v1.'+S.n,26,C.ink);
  s+=hot('Release an update',box(55,200,185,84,C.green)+txt(147,257,'UPDATE',36,C.white));
  for(let i=0;i<Math.min(S.n,6);i++)s+=rocket(580+(i%3)*76,430-Math.floor(i/3)*150-(i%3)*40,i===Math.min(S.n,6)-1?'pop':'');
  return s},
})
