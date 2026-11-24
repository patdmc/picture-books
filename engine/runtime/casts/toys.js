/* ---------- the toy cast: toys acting out the roles ----------
   Same arguments, feet point and height as the paper cast, so any scene can be played by toys.
   Generic toy types only: peg dolls, a tin wind-up robot, a toy chest, a bouncy ball. */
const WOOD='#e9c793',WOOD2='#b98a5a',TIN='#c9ced3';
const shadowAt=(x,y,rx)=>circ(x,y,rx,'#000',rx*.22,'shadow');
const gloss=(x,y,r,ry)=>circ(x,y,r,'#fff',ry??r,'gloss');
/* A painted wooden head: the character's colour is the painted hair cap. */
function toyFace(x,y,r,col,m='happy',lk=0){let g=ROLES.face(x,y,r,WOOD,m,lk);const p=[];
  for(let i=0;i<=12;i++){const a=Math.PI*(1.06+i/12*.88);p.push([x+Math.cos(a)*r*1.04,y+Math.sin(a)*r*1.04])}
  p.push([x+r*.7,y-r*.5],[x+r*.25,y-r*.62],[x-r*.2,y-r*.5],[x-r*.7,y-r*.56]);
  return g+poly(p,col)+gloss(x-r*.42,y-r*.62,r*.2,r*.13)}
CASTS.toys={
  face:toyFace,
  /* The Dev: a wooden peg doll on a round stand, with dowel arms. */
  dev(x,y,s,c,o={}){const [hd,bd]=c;let g=shadowAt(0,0,30)+circ(0,-5,25,WOOD2,7);
    const arm=(sx,up)=>up?strip(sx*15,-80,sx*36,-114,8,WOOD)+circ(sx*37,-117,6,WOOD):strip(sx*15,-80,sx*31,-50,8,WOOD)+circ(sx*32,-47,6,WOOD);
    g+=arm(-1,o.up2)+arm(1,o.up);
    g+=poly([[-27,-9],[27,-9],[21,-58],[14,-86],[-14,-86],[-21,-58]],bd)+strip(-24,-26,24,-26,6,'#fff','gloss')+gloss(-10,-66,4,14);
    g+=box(-9,-93,18,9,WOOD)+toyFace(0,-114,23,hd,o.m,o.look||0);
    return `<g transform="translate(${x},${y}) scale(${s})" ${o.cls?`class="${o.cls}"`:''}>${g}</g>`},
  /* The Agent: a tin wind-up robot on wheels, key in its back. */
  agent(x,y,s,col,o={}){let g=shadowAt(0,0,30)+circ(-13,-7,8,C.dgrey)+circ(13,-7,8,C.dgrey)+circ(-13,-7,3,TIN)+circ(13,-7,3,TIN);
    g+=strip(-24,-42,-38,-42,5,C.dgrey)+poly([[-38,-42],[-48,-52],[-48,-32]],C.dgrey)+poly([[-38,-42],[-28,-55],[-28,-29]].map(([a,b])=>[a-20,b]),C.dgrey);
    g+=strip(-22,-52,-36,-28,8,TIN)+(o.up?strip(22,-52,40,-80,8,TIN)+circ(41,-83,6,C.dgrey):strip(22,-52,36,-28,8,TIN)+circ(37,-25,6,C.dgrey));
    g+=box(-24,-64,48,52,col);[[-18,-58],[18,-58],[-18,-18],[18,-18]].forEach(([a,b])=>g+=circ(a,b,2.6,TIN));
    g+=circ(0,-38,9,C.white)+strip(0,-38,5,-44,2,C.red)+strip(-16,-60,-16,-22,4,'#fff','gloss');
    g+=strip(0,-96,0,-108,3,C.dgrey)+circ(0,-111,5,C.red)+box(-19,-96,38,32,TIN);
    const lk=(o.look||0)*2;g+=circ(-8+lk,-84,5,C.ink)+circ(8+lk,-84,5,C.ink)+gloss(-6.5+lk,-85.5,1.6)+gloss(9.5+lk,-85.5,1.6);
    g+=o.m==='flat'?strip(-7,-72,7,-72,3,C.ink):[-6,0,6].map(d=>strip(d,-75,d,-69,2,C.ink)).join('');
    return `<g transform="translate(${x},${y}) scale(${s})" ${o.cls?`class="${o.cls}"`:''}>${g}</g>`},
  /* The Metric: a bouncy ball with a stripe and a face. */
  metric(x,y,r,col=C.yellow,cls=''){return `<g class="${cls}">`+shadowAt(x,y+r*1.05,r*.8)+circ(x,y,r,col)+strip(x-r*.95,y+r*.35,x+r*.95,y+r*.35,r*.22,'#fff')
    +circ(x-r*.33,y-r*.12,r*.11,C.ink)+circ(x+r*.33,y-r*.12,r*.11,C.ink)+line(`M${f(x-r*.22)},${f(y+r*.08)} q${f(r*.22)},${f(r*.18)} ${f(r*.44)},0`)+gloss(x-r*.45,y-r*.5,r*.2,r*.13)+'</g>'},
  /* The Repo: a painted toy chest with its lid open. */
  repo(x,y,s,o={}){let g=shadowAt(0,0,58)+poly([[-52,-80],[52,-80],[62,-116],[-42,-116]],'#a8322c')+strip(-46,-104,56,-104,5,WOOD);
    if(o.page)g+=box(-22,-128,44,56,C.white)+strip(-14,-114,14,-114,3,C.grey)+strip(-14,-102,10,-102,3,C.grey);
    if(o.folder)g+=box(-34,-126,24,12,C.yellow)+box(-34,-118,68,48,C.yellow);
    g+=box(-52,-80,104,80,C.red)+box(-52,-80,104,10,WOOD)+box(-52,-10,104,10,WOOD);
    [[-52,-80],[44,-80],[-52,-8],[44,-8]].forEach(([a,b])=>g+=box(a,b,8,8,TIN));
    g+=strip(-40,-64,-40,-20,4,'#fff','gloss');
    const lk=(o.look||0)*3;
    if(o.awake)g+=circ(-20,-44,9,C.white)+circ(-20+lk,-44,4,C.ink)+circ(20,-44,9,C.white)+circ(20+lk,-44,4,C.ink)+(o.m==='wow'?circ(0,-24,5,C.ink):line('M-9,-26 q9,7 18,0'));
    else g+=strip(-27,-44,-13,-44,3,C.ink)+strip(13,-44,27,-44,3,C.ink);
    return `<g transform="translate(${x},${y}) scale(${s})" ${o.cls?`class="${o.cls}"`:''}>${g}</g>`},
  /* The remote: a cotton-wool cloud on a stick, with a wooden sign. */
  cloud(x,y,cls=''){let g=strip(x,y+40,x,y+150,6,WOOD2)+'<g class="solid">';
    [[-56,8,26],[-30,-14,30],[4,-26,34],[38,-12,30],[60,10,24],[-20,14,30],[22,14,30]].forEach(([a,b,r])=>g+=circ(x+a,y+b,r,C.white));
    return `<g class="${cls}">`+g+'</g>'+box(x-50,y+28,100,32,WOOD)+txt(x,y+51,'origin',22,C.ink)+'</g>'},
};
