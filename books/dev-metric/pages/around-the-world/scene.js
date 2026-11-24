({
  bg: C.sky,
 draw(S){const k=S.n%2,dx=k?400:0,nx=k?0:400,o=k?18:0;
  let s=`<rect x="${dx}" width="400" height="500" fill="${C.sky}"/><rect x="${nx}" width="400" height="500" fill="${C.navy}"/>`;
  const sx=dx+90,mx=nx+310;for(let i=0;i<8;i++){const a=i*.785;s+=poly([[sx+Math.cos(a-.2)*50,70+Math.sin(a-.2)*50],[sx+Math.cos(a)*72,70+Math.sin(a)*72],[sx+Math.cos(a+.2)*50,70+Math.sin(a+.2)*50]],C.orange)}
  s+=circ(sx,70,42,C.yellow)+circ(mx,70,36,C.white)+circ(mx+14,60,30,C.navy);
  s+=hot('Spin the globe',circ(400,250,135,C.blue)+circ(352+o,205,48,C.green,32)+circ(455-o,305,36,C.green,52)+circ(425-o,170,20,C.green)+circ(335+o,315,22,C.green,14));
  [[115,0],[685,1]].forEach(([x,i])=>{const awake=(i===1)===(k===1);s+=dev(x,470,1.45,DEVS[i],{m:awake?'happy':'sleep',look:i?-1:1,tuft:i===1});
   s+=awake?book(x+(i?-92:52),330,40,S.n?'pop':''):txt(x+(i?-55:55),250,'z z z',26,C.white)});
  return s},
})
