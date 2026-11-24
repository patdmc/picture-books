({
  bg: C.lilac,
 draw(S){const n=Math.min(S.n,6);let s='';for(let i=0;i<6-n;i++)s+=pr(80,330-i*16,110);
  for(let i=0;i<n;i++)s+=pr(600,330-i*16,110,i===n-1?'pop':'',check(655,395-i*16,34,C.green));
  s+=hot('Review a pull request',agent(400,465,2,C.orange,{up:true,look:n<6?-1:1})+circ(486,300,26,C.white)+circ(486,300,18,C.sky)+strip(470,322,454,348,8,C.ink));
  return s+dev(745,482,.95,DEVS[0],{m:'flat',look:-1})},
})
