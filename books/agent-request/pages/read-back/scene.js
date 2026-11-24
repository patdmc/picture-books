({
  bg: C.lilac,
 draw(S){const on=S.n>0;let s=dev(160,474,1.6,DEVS[0],{m:on?'happy':'flat',look:1})+bubble(240,130,160,62,180,270)+box(130,112,220,36,C.red);
  const a=agent(620,474,1.7,C.teal,{look:-1,up:on})+bubble(560,130,160,62,610,270)+(on?box(450,112,220,36,C.red,'pop'):txt(560,152,'?',60,C.grey));
  return s+hot('Read it back',a)+(on?check(400,235,46,C.green,'pop'):'')},
})
