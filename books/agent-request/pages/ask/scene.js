({
  bg: C.lilac,
 tap(S,key){S.v=key;S.n++},
 draw(S){const v=S.v,col=v==='r'?[C.grey,C.grey,C.grey]:BL;let s=dev(130,474,1.7,DEVS[2],{m:v==='r'?'flat':'happy',look:1,tuft:1})+box(290,50,320,250,C.ink)+box(306,66,288,218,C.white)+box(430,300,40,30,C.dgrey);
  s+=box(330,90,240,40,col[0])+circ(380,200,44,col[1])+box(460,160,100,90,col[2]);
  const thumb=(x,y,up)=>box(x-16,y-8,32,26,C.white)+(up?strip(x-6,y-6,x-2,y-30,11,C.white):strip(x-6,y+16,x-2,y+40,11,C.white));
  s+=hot('Keep the change',circ(370,400,52,C.green)+thumb(370,400,true),'k')+hot('Send it back',circ(530,400,52,C.red)+thumb(530,392,false),'r');
  if(v)s+=txt(700,190,v==='k'?'kept':'sent back',v==='k'?40:30,v==='k'?C.green:C.red,'middle','pop');
  return s},
})
