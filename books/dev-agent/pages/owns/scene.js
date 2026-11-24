({
  bg: C.lilac,
 draw(S){const ask=S.n%2===1;let s=box(-10,345,820,165,C.navy)+wavy(4,343)+box(90,255,130,86,C.orange)+txt(155,308,'mine',28,C.white)+box(560,372,160,84,C.white)+txt(640,422,'ask here',24,C.ink)+circ(745,414,13,ask?C.lime:C.dgrey);
  if(!ask)s+=check(212,256,34,C.green,S.n?'pop':'');
  return s+hot(ask?'Go back to your own work':'Ask the platform',ask?agent(520,341,1.5,C.teal,{up:true,look:1})+pr(588,175,70,'pop'):agent(300,341,1.5,C.teal,{look:-1}))},
})
