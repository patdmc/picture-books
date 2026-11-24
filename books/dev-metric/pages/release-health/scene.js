({
  bg: C.sky,
 draw(S){const bad=S.n%2===1,ok=S.n>0&&!bad,a=[.7,.73,.68,.72,.7],b=bad?[.32,.18,.24]:[.73,.69,.74],v=a.concat(b),g=graph(240,40,510,330,v,C.green,{noline:1});
  let s=g.s+ribbon(g.pts.slice(0,5),8,C.green);
  if(S.n){const p=g.pts[4];s+=strip(p[0],g.py1-4,p[0],g.py0,5,C.ink)+poly([[p[0],g.py1-6],[p[0]+34,g.py1+8],[p[0],g.py1+22]],C.orange)+ribbon(g.pts.slice(4),8,bad?C.red:C.green,'draw');
   s+=bad?txt(620,430,'that one hurt!',30,C.red,'middle','pop'):`<g class="pop">`+circ(620,420,30,C.green)+check(618,418,28,C.white)+'</g>'}
  s+=hot('Ship a release',box(270,392,190,74,C.kraft)+strip(365,392,365,466,9,C.brown)+txt(365,440,'RELEASE',28,C.ink));
  return s+dev(115,468,1.55,DEVS[0],{m:bad?'wow':ok?'happy':'flat',look:1,up:bad})},
})
