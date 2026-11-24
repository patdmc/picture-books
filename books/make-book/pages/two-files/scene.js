({
  bg: P.kraft,
  style: 'embroidery',
  tap(S,k){S.n++;S.k=k},
  draw(S){const k=S.k;
    const f=(x,name,lines,key)=>hot('Open '+name,box(x,90,280,230,C.white)+box(x+12,76,150,30,key==='w'?C.pink:C.sky)+txt(x+87,98,name,18,C.ink)
      +lines.map((l,i)=>'<text class="mono" x="'+(x+18)+'" y="'+(140+i*26)+'" font-size="14" fill="'+C.ink+'">'+xe(l)+'</text>').join('')+(k===key?check(x+240,300,40,C.green,'pop'):''),key);
    return f(90,'lines.js',['({','  cap: \'The words.\',','  hint: \'Tap the cat.\',','})'],'w')
      +f(430,'scene.js',['({','  bg: C.sky,','  draw(S) {','    return cat(…)','  },','})'],'p')
      +dev(400,490,1,DEVS[0],{m:k?'wow':'happy'})},
})
