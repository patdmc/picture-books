({
  bg: P.kraft,
 tap(S){S.t=(S.t??.62)-.18;if(S.t<.15)S.t=.92},
 drag(S,x,y){S.t=clamp((374-y)/(374-76),.12,.95)},
 draw(S){const t=S.t??.62,g=graph(110,50,580,360,V2,C.blue,{noline:1}),ty=g.Y(t);let s=g.s;
  s+=box(g.px0-6,g.py1-12,g.px1-g.px0+12,ty-g.py1+12,C.pink,'','opacity=".6"');
  {const zh=ty-g.py1+12,fs=clamp(zh*.42,15,40),sx=g.px0+14,sy=g.py1-12+zh/2+fs*.35;
   s+=`<text x="${f(sx)}" y="${f(sy)}" font-size="${f(fs)}" fill="#c4161c" opacity=".92" transform="rotate(-3 ${f(sx)} ${f(sy)})" style="font-family:'Permanent Marker','Marker Felt','Comic Sans MS',cursive;pointer-events:none">thar be dragons</text>`}
  s+=ribbon(g.pts,8,C.blue);const over=g.pts.filter((p,i)=>V2[i]>t);over.forEach(p=>s+=circ(p[0],p[1],10,C.red));
  s+=dragon(g.px1-52,ty-2,over.length>0);
  s+=`<g class="hot" data-drag="t" data-tap="t" tabindex="0" role="button" aria-label="Move the threshold line">`+strip(g.px0-14,ty,g.px1+14,ty,7,C.red)+box(g.px1+8,ty-17,62,34,C.red)+txt(g.px1+39,ty+6,'drag',17,C.white)+'</g>';
  return s+dev(58,478,.95,DEVS[0],{m:over.length?'worry':'happy',look:1})},
})
