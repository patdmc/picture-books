({
  bg: C.sky,
 draw(S){const n=Math.min(S.n,4),N=['runs','changed','shows','merges'];let s=box(-10,402,820,26,C.ink);
  for(let i=0;i<4;i++){const x=180+i*130;s+=box(x,200,18,202,C.purple)+box(x+88,200,18,202,C.purple)+box(x-8,160,122,46,C.purple)+txt(x+53,192,N[i],22,C.white)+circ(x+53,232,11,i<n?C.lime:C.dgrey)}
  if(n===4)s+=check(745,300,50,C.green,'pop');
  return s+hot('Run the next check',pr(n?180+(n-1)*130+22:60,n?318:300,n?62:80,n?'pop':''))},
})
