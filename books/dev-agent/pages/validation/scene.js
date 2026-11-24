({
  bg: C.sky,
 draw(S){const n=Math.min(S.n,4),N=['tests','lint','types','proof'];let s=box(-10,402,720,26,C.ink);
  for(let i=0;i<n;i++){const x=190+i*125;s+=`<g class="${i===n-1?'pop':''}">`+box(x,200,18,202,C.purple)+box(x+82,200,18,202,C.purple)+box(x-8,160,116,46,C.purple)+txt(x+50,192,N[i],22,C.white)+circ(x+50,232,11,C.lime)+'</g>'}
  s+=hot('Add a check',pr(60,284,95));
  return s+dev(740,470,1.25,DEVS[0],{m:['worry','worry','flat','happy','happy'][n],look:-1})+(n?'':txt(640,150,'?',90,C.white))},
})
