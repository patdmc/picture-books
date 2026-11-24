({
  bg: C.navy,
  dark: true,
 tap(S){S.n=S.n>=4?1:S.n+1},
 draw(S){const up=S.n>0&&S.n<4;let s=circ(700,90,46,C.yellow)+circ(715,78,9,C.orange)+txt(30,72,'3:00 AM',42,C.lime,'start');
  [[250,40],[330,300],[620,210],[60,200],[760,260],[200,250],[590,30]].forEach(([x,y])=>s+=circ(x,y,4,C.white));
  s+=box(70,372,440,58,C.brown)+box(85,330,410,50,C.white)+box(96,300,96,38,C.sky)+face(150,288,27,C.orange,up?'wow':'sleep',1)+box(205,312,290,74,C.purple);
  if(!up)s+=txt(215,240,'z z z',30,C.white);
  s+=box(540,350,100,90,C.brown);
  s+=hot('Ring the pager',`<g transform="translate(590,330)"><g class="${up?'shake':''}">`+box(-32,-22,64,44,up?C.red:C.ink)+box(-24,-14,48,18,C.lime)+'</g></g>');
  if(S.n){s+=`<g class="${S.n===1?'pop':''}">`+box(262,30,320,235,C.white)+txt(422,72,'RUNBOOK',28,C.red);
   ['Look at the dashboard','Restart the thing','Go back to bed'].forEach((t,i)=>{const y=122+i*46;s+=txt(284,y,(i+1)+'. '+t,20,C.ink,'start');if(S.n>i+1)s+=check(552,y-8,20,C.green,S.n===i+2?'pop':'')});s+='</g>'}
  return s},
})
