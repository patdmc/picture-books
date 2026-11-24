({
  bg: P.kraft,
 draw(S){const n=Math.min(S.n,4),N=['deploys','secrets','health checks','metrics'],Cc=[C.blue,C.purple,C.navy,C.teal];
  let s=agent(150,172,1.1,C.orange,{up:true})+agent(340,172,1.1,C.red,{})+agent(530,172,1.1,C.green,{up:true})+box(215,108,70,60,C.pink)+box(405,98,80,70,C.orange)+box(615,104,90,65,C.yellow);
  s+=wavy(10,196)+mk(590,58,'application',26)+mk(30,246,'platform',26);
  let b='';for(let i=0;i<4;i++){const x=28+i*190,lit=i<n,c=i===n-1?'pop':'';b+=box(x,265,172,195,lit?Cc[i]:C.dgrey)+txt(x+86,442,N[i],i===2?20:22,C.white);
   if(lit){if(i===0)b+=rocket(x+86,378,c);if(i===1)b+=`<g class="${c}">`+circ(x+58,340,24,C.yellow)+circ(x+58,340,9,Cc[1])+strip(x+78,340,x+132,340,10,C.yellow)+box(x+114,343,10,16,C.yellow)+'</g>';if(i===2)b+=heart(x+86,345,2.6,C.red,c);if(i===3)b+=metric(x+86,345,36,C.yellow,c)}}
  return s+hot('Light up the platform',b)},
})
