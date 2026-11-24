({
  bg: C.sky,
 draw(S){const n=Math.min(S.n,6),dx=n*22,L=4+n*2;let s=circ(150,80,60,C.white,26)+circ(210,95,44,C.white,20)+circ(640,60,54,C.white,22);
  for(let i=0;i<L;i++){const y=250+h(i,7,1)*150,x=30+Math.abs(h(i,2,9))*120;s+=strip(x,y,x+70+n*18+Math.abs(h(i,4,4))*50,y,7,C.white,i>=L-2&&n?'pop':'')}
  let r=poly([[262+dx,318],[262+dx-70-n*14,335],[262+dx,352]],C.red)+poly([[262+dx,324],[262+dx-36-n*8,335],[262+dx,346]],C.orange);
  r+=dev(400+dx,306,1.5,DEVS[0],{m:n>2?'wow':'happy',look:1,up:true,up2:n>3})+box(260+dx,300,290,66,C.ink)+poly([[550+dx,300],[600+dx,333],[550+dx,366]],C.ink);
  for(let i=0;i<16;i++)r+=box(272+dx+(i%8)*34,310+Math.floor(i/8)*25,26,18,i===11?C.red:C.white);
  return s+hot('Go faster',r)},
})
