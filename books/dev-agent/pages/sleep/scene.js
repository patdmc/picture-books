({
  bg: C.navy,
  dark: true,
 draw(S){let s=circ(700,80,44,C.yellow)+circ(714,68,9,C.orange)+txt(30,72,'3:00 AM',42,C.lime,'start');
  [[250,40],[330,270],[560,200],[40,200],[770,230],[470,90],[590,30]].forEach(([x,y])=>s+=circ(x,y,4,C.white));
  s+=box(50,372,400,58,C.brown)+box(65,330,370,50,C.white)+box(76,300,96,38,C.sky)+face(130,288,27,C.orange,'sleep')+box(185,312,250,74,C.purple);
  s+=txt(190,240,'z z z'+' z'.repeat(Math.min(S.n,4)),30,C.white,'start');
  s+=poly([[650,300],[765,300],[765,388],[707,448],[650,388]],C.blue)+txt(707,356,'prod',28,C.white);
  if(S.n)s+=`<g class="pop">`+circ(640,292,32,C.red)+txt(640,303,'NO',28,C.white)+'</g>';
  return s+hot('Try something at 3am',agent(555,465,1.3,C.red,{up:true,look:1}))},
})
