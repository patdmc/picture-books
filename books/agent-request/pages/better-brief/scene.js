({
  bg: C.sky,
 draw(S){const n=Math.min(S.n,4);let s=`<g opacity=".7">`+box(60,130,200,260,C.white)+txt(160,180,'brief',26,C.ink)+strip(85,230,235,230,6,C.grey)+strip(85,265,200,265,6,C.grey)+'</g>'+poly([[290,230],[350,260],[290,290]],C.orange);
  let b=box(400,50,330,400,C.white)+txt(565,105,'next brief',30,C.red);
  for(let i=0;i<6;i++){const y=160+i*46,w=270-(i%3)*40;if(i<n)b+=box(425,y-15,w+10,30,C.yellow,i===n-1?'pop':'');b+=strip(430,y,430+w,y,6,i<n?C.ink:C.grey)}
  if(n===4)b+=check(690,412,44,C.green,'pop');
  return s+hot('Add what was remembered',b)},
})
