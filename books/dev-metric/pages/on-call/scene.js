({
  bg: P.kraft,
 draw(S){const k=S.n%3,P=[[400,250],[185,465],[615,465]];let s='';
  s+=poly([[285,300],[250,350],[300,340]],C.brown)+poly([[380,440],[430,460],[385,478]],C.brown)+poly([[515,300],[550,350],[500,342]],C.brown);
  P.forEach(([x,y],i)=>{s+=dev(x,y,1.3,DEVS[i],{m:i===k?'flat':'sleep',tuft:i===1});
   if(i!==k)s+=txt(x+44,y-160,'z z',26,C.navy);
   else{s+=`<g class="pop">`+box(x-62,y-232,124,36,C.white)+txt(x,y-206,'ON CALL',22,C.red)+'</g>';
    s+=hot('Pass the pager',box(x+42,y-100,60,42,C.ink)+box(x+50,y-92,44,18,C.lime)+circ(x+60,y-68,4,C.red))}});
  return s},
})
