({
  bg: C.lilac,
 draw(S){const k=S.n%3,g=graph(40,110,230,170,V1,C.red,{lw:6});let s=`<g opacity=".75">${g.s}</g>`+strip(60,130,250,260,9,C.ink)+strip(250,130,60,260,9,C.ink);
  let l=box(388,395,24,80,C.dgrey)+box(335,50,130,350,C.ink);[115,225,335].forEach((y,i)=>l+=circ(400,y,44,i===k?LIGHT[i]:C.dgrey));
  return s+hot('Change the light',l)+dev(630,468,1.75,DEVS[0],{m:['happy','flat','worry'][k],look:-1})},
})
