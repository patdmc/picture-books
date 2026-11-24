({
  bg: C.sky,
 draw(S){const k=S.n,no=k>0&&k%3===0,yes=k>0&&!no;
  let s=box(600,74,150,18,C.brown)+strip(625,92,620,134,8,C.brown)+strip(725,92,730,134,8,C.brown)+circ(612,52,15,C.grey)+circ(675,48,15,C.grey)+circ(738,52,15,C.grey)+strip(590,30,760,142,10,C.red)+strip(760,30,590,142,10,C.red);
  s+=box(300,130,210,300,C.navy)+txt(405,178,'platform',26,C.white)+circ(355,238,30,yes?C.lime:C.dgrey)+circ(455,238,30,no?C.red:C.dgrey)+txt(355,304,'yes',26,C.white)+txt(455,304,'no',26,C.white)+box(340,345,130,16,C.ink);
  if(yes)s+=pr(590,250,100,'pop',check(640,310,34,C.green));
  if(no)s+=pr(160,160,90,'pop',strip(182,192,228,240,9,C.red)+strip(228,192,182,240,9,C.red));
  return s+hot('Send a request',agent(150,465,1.5,C.teal,{up:true,look:1})+(no?'':pr(200,292,66)))},
})
