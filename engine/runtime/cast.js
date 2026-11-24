/* The cast and props shared by every book. */
function face(x,y,r,col,m='happy',lk=0){let g=circ(x,y,r,col);const ey=y-r*.12;
  if(m==='sleep'){g+=strip(x-r*.6,ey,x-r*.2,ey,3,C.ink)+strip(x+r*.2,ey,x+r*.6,ey,3,C.ink)+line(`M${f(x-r*.15)},${f(y+r*.45)} h${f(r*.3)}`)}
  else{for(const s of[-1,1])g+=circ(x+s*r*.4,ey,r*.27,C.white)+circ(x+s*r*.4+lk*r*.1,ey,r*.12,C.ink);
    if(m==='happy')g+=line(`M${f(x-r*.35)},${f(y+r*.35)} q${f(r*.35)},${f(r*.35)} ${f(r*.7)},0`);
    else if(m==='flat')g+=line(`M${f(x-r*.3)},${f(y+r*.45)} h${f(r*.6)}`);
    else if(m==='worry')g+=line(`M${f(x-r*.35)},${f(y+r*.55)} q${f(r*.35)},${f(-r*.3)} ${f(r*.7)},0`);
    else g+=circ(x,y+r*.5,r*.18,C.ink)}
  return g}
/* ink: comic-strip hair. Each Dev has their own style, in a natural hair colour, drawn as smooth curves:
   a back layer behind the head and a front layer over it, with pen strokes for the flow of the hair.
   Coordinates are the Dev's own: head centred on (0,-112), radius 23, top of the head at -135. */
const HAIR_COL=['#5a3622','#231d1b','#a4472a','#c9973c','#2c2733','#7a4b2a','#3a2a22'];
const hp=(d,fill)=>`<path class="pc${stc()}" d="${d}" fill="${fill}"/>`;
const hl=d=>`<path d="${d}" fill="none" stroke="${C.ink}" stroke-width="1.4" stroke-linecap="round" opacity=".75"/>`;
const HAIR=[
  /* 0 the Dev: a tousled swoop, parted on the left, falling right */
  {front:c=>hp('M-25,-106 C-30,-128 -18,-146 2,-146 C22,-146 31,-130 26,-106 C23,-118 18,-125 10,-128 C6,-122 -2,-120 -8,-124 C-12,-119 -18,-116 -21,-110 Z',c)
     +hp('M-8,-124 C-4,-132 6,-135 14,-131 C10,-128 6,-123 4,-116 C0,-120 -4,-122 -8,-124 Z',c),
   lines:hl('M-16,-138 C-10,-136 -6,-131 -5,-125')+hl('M-2,-143 C6,-140 11,-134 12,-127')+hl('M12,-140 C19,-135 23,-126 23,-117')+hl('M-22,-126 C-21,-120 -21,-114 -20,-110')},
  /* 1: a cloud of curls */
  {back:c=>[[-24,-120,11],[-20,-136,12],[-6,-146,13],[10,-145,13],[22,-134,12],[26,-118,11],[-27,-104,9],[28,-103,9]].map(([x,y,r])=>`<circle class="pc${stc()}" cx="${x}" cy="${y}" r="${r}" fill="${c}"/>`).join(''),
   front:c=>[[-14,-131,9],[0,-135,10],[14,-131,9]].map(([x,y,r])=>`<circle class="pc${stc()}" cx="${x}" cy="${y}" r="${r}" fill="${c}"/>`).join(''),
   lines:[[-20,-136],[-6,-146],[10,-145],[22,-134],[-24,-120],[26,-118],[0,-135]].map(([x,y])=>hl(`M${x-4},${y+2} c1,-5 7,-5 7,0`)).join('')},
  /* 2: a bob with a straight fringe */
  {back:c=>hp('M-27,-94 C-33,-124 -20,-148 0,-148 C20,-148 33,-124 27,-94 C22,-92 18,-94 16,-97 L-16,-97 C-18,-94 -22,-92 -27,-94 Z',c),
   front:c=>hp('M-22,-118 C-22,-136 -12,-144 0,-144 C12,-144 22,-136 22,-118 L15,-121 L9,-118 L3,-121 L-3,-118 L-9,-121 L-15,-118 Z',c),
   lines:hl('M-9,-140 L-9,-122')+hl('M3,-142 L3,-122')+hl('M-24,-118 C-25,-108 -25,-100 -24,-95')+hl('M24,-118 C25,-108 25,-100 24,-95')},
  /* 3: a high ponytail */
  {back:c=>hp('M16,-136 C34,-150 48,-132 42,-108 C40,-96 34,-90 30,-86 C34,-100 34,-114 24,-124 Z',c),
   front:c=>hp('M-24,-110 C-28,-132 -14,-146 2,-146 C18,-146 28,-134 25,-112 C20,-124 10,-130 0,-130 C-10,-130 -18,-122 -24,-110 Z',c)+`<rect class="pc${stc()}" x="14" y="-142" width="10" height="9" rx="3" fill="${C.red}" transform="rotate(-30 19 -137)"/>`,
   lines:hl('M-14,-140 C-8,-136 -2,-134 6,-134')+hl('M36,-130 C40,-118 38,-104 32,-92')+hl('M-20,-128 C-22,-122 -23,-116 -23,-111')},
  /* 4: a top bun */
  {back:c=>`<circle class="pc${stc()}" cx="2" cy="-150" r="12" fill="${c}"/>`,
   front:c=>hp('M-24,-110 C-27,-131 -14,-142 1,-142 C16,-142 28,-131 24,-110 C20,-122 12,-128 1,-128 C-10,-128 -19,-121 -24,-110 Z',c),
   lines:hl('M-6,-152 c3,-6 12,-6 14,1')+hl('M-16,-134 C-8,-138 8,-138 16,-134')+hl('M-21,-122 C-22,-118 -23,-114 -23,-110')},
  /* 5: short and spiky, swept up */
  {front:c=>hp('M-24,-108 C-27,-122 -24,-132 -20,-136 L-22,-148 L-12,-140 L-8,-154 L0,-142 L8,-155 L11,-141 L22,-150 L21,-136 C26,-130 27,-120 24,-108 C20,-120 10,-126 0,-126 C-10,-126 -20,-120 -24,-108 Z',c),
   lines:hl('M-10,-130 L-11,-142')+hl('M2,-130 L4,-146')+hl('M14,-128 L18,-142')},
  /* 6: long and wavy, past the shoulders */
  {back:c=>hp('M-26,-120 C-36,-96 -24,-82 -32,-64 C-20,-70 -16,-80 -18,-92 L18,-92 C16,-80 20,-70 32,-64 C24,-82 36,-96 26,-120 Z',c),
   front:c=>hp('M-25,-108 C-28,-132 -14,-146 0,-146 C14,-146 28,-132 25,-108 C18,-124 10,-130 0,-131 C-8,-125 -18,-120 -25,-108 Z',c),
   lines:hl('M-28,-96 C-24,-86 -30,-76 -26,-68')+hl('M28,-96 C24,-86 30,-76 26,-68')+hl('M0,-140 C-6,-134 -14,-128 -20,-118')},
];
function inkHair(k,part){const H=HAIR[k%HAIR.length],c=HAIR_COL[k%HAIR_COL.length];
  return part==='back'?(H.back?H.back(c):''):(H.front?H.front(c):'')+H.lines}
function dev(x,y,s,c,o={}){const [hd,bd]=c;let g='';
  g+=strip(-9,-42,-11,-4,10,C.ink)+strip(9,-42,11,-4,10,C.ink)+box(-21,-7,17,9,C.ink)+box(4,-7,17,9,C.ink);
  g+=o.up2?strip(-17,-82,-40,-114,9,hd):strip(-17,-82,-36,-54,9,hd);
  g+=o.up?strip(17,-82,40,-114,9,hd):strip(17,-82,36,-54,9,hd);
  g+=poly([[-23,-40],[24,-41],[18,-92],[-17,-91]],bd);
  if(o.tuft)g+=poly([[-10,-130],[2,-150],[4,-132],[14,-146],[12,-128]],bd);
  const ink=typeof STYLE!=='undefined'&&STYLE==='ink',k=Math.max(0,DEVS.indexOf(c));
  if(ink)g+=inkHair(k,'back');
  g+=face(0,-112,23,hd,o.m,o.look||0);
  if(ink)g+=inkHair(k,'front');
  return `<g transform="translate(${x},${y}) scale(${s})" ${o.cls?`class="${o.cls}"`:''}>${g}</g>`}
function metric(x,y,r,col=C.yellow,cls=''){return `<g class="${cls}">`+circ(x,y,r,col)+circ(x-r*.33,y-r*.12,r*.11,C.ink)+circ(x+r*.33,y-r*.12,r*.11,C.ink)+line(`M${f(x-r*.3)},${f(y+r*.25)} q${f(r*.3)},${f(r*.3)} ${f(r*.6)},0`)+'</g>'}
function graph(x,y,w,hh,vals,col,o={}){const px0=x+44,px1=x+w-26,py0=y+hh-36,py1=y+26;
  const X=i=>px0+(px1-px0)*i/(vals.length-1),Y=v=>py0-(py0-py1)*v,pts=vals.map((v,i)=>[X(i),Y(v)]);
  let s=box(x,y,w,hh,C.white)+strip(x+30,y+16,x+30,py0+8,5,C.ink)+strip(x+26,py0+6,x+w-14,py0+6,5,C.ink);
  if(!o.noline)s+=ribbon(pts,o.lw||8,col,o.cls||'');
  return {s,pts,X,Y,px0,px1,py0,py1}}
function dragon(x,y,fire){let g=poly([[30,-10],[78,-34],[42,-30]],C.green)+box(-8,-10,11,11,C.green)+box(18,-10,11,11,C.green)+circ(10,-30,31,C.green,24)
  +poly([[4,-46],[46,-90],[36,-40]],C.purple)+poly([[-6,-52],[2,-68],[8,-52]],C.lime)+poly([[10,-54],[19,-70],[25,-52]],C.lime)
  +circ(-28,-54,17,C.green)+box(-54,-58,24,14,C.green)+circ(-30,-60,5.5,C.white)+circ(-31.5,-60,2.4,C.ink)+poly([[-34,-70],[-28,-84],[-22,-69]],C.lime);
  if(fire)g+=poly([[-56,-54],[-100,-66],[-84,-51],[-108,-40],[-56,-45]],C.orange,'pop')+poly([[-56,-52],[-82,-55],[-74,-49],[-56,-47]],C.yellow,'pop');
  return `<g transform="translate(${x},${y})">${g}</g>`}
function bubble(cx,cy,rx,ry,tx,ty){return `<g class="solid${stc()}">`+circ(cx,cy,rx,C.white,ry)+'</g>'+circ(cx+(tx-cx)*.72,cy+(ty-cy)*.72,15,C.white)+circ(cx+(tx-cx)*.9,cy+(ty-cy)*.9,8,C.white)}
function heart(x,y,s,col,cls=''){const p=[];for(let i=0;i<26;i++){const t=i/26*6.2832;p.push([x+s*16*Math.sin(t)**3,y-s*(13*Math.cos(t)-5*Math.cos(2*t)-2*Math.cos(3*t)-Math.cos(4*t))])}return poly(p,col,cls)}
function arm(y){return strip(830,y+12,585,y,36,C.purple)+circ(578,y,26,C.purple)}
function rocket(x,y,cls=''){return `<g class="${cls}">`+poly([[x-12,y+4],[x,y+34],[x+12,y+4]],C.yellow)+poly([[x-13,y-18],[x-28,y+6],[x-13,y+2]],C.red)+poly([[x+13,y-18],[x+28,y+6],[x+13,y+2]],C.red)+box(x-13,y-50,26,54,C.white)+poly([[x-14,y-48],[x,y-78],[x+14,y-48]],C.red)+circ(x,y-28,6,C.blue)+'</g>'}
function book(x,y,w,cls=''){return `<g class="${cls}">`+box(x,y,w,w*1.25,C.white)+strip(x+w*.2,y+w*.3,x+w*.8,y+w*.3,3,C.grey)+strip(x+w*.2,y+w*.55,x+w*.8,y+w*.55,3,C.grey)+strip(x+w*.2,y+w*.8,x+w*.6,y+w*.8,3,C.grey)+'</g>'}


/* ---------- book two cast ---------- */
const AC=[C.teal,C.purple,C.red,C.blue,C.orange,C.lime,C.yellow,C.green,C.navy,C.brown];
function agent(x,y,s,col,o={}){let g=box(-15,-18,10,18,C.dgrey)+box(5,-18,10,18,C.dgrey)+strip(-22,-52,-37,-30,7,C.dgrey)+(o.up?strip(22,-52,40,-78,7,C.dgrey):strip(22,-52,37,-30,7,C.dgrey))
  +box(-23,-60,46,44,col)+box(-11,-50,22,13,C.white)+strip(0,-94,0,-108,3,C.dgrey)+circ(0,-111,5,C.red)+box(-19,-94,38,32,C.white);
  const lk=(o.look||0)*2;g+=circ(-8+lk,-80,4.5,C.ink)+circ(8+lk,-80,4.5,C.ink)+(o.m==='flat'?strip(-6,-69,6,-69,2.5,C.ink):line('M-6,-71 q6,5 12,0'));
  return `<g transform="translate(${x},${y}) scale(${s})" ${o.cls?`class="${o.cls}"`:''}>${g}</g>`}
function pr(x,y,w,cls='',mark=''){let s=box(x,y,w,w*1.2,C.white);for(let i=0;i<4;i++){const yy=y+w*.25+i*w*.22;s+=strip(x+w*.15,yy,x+w*(.55+.3*Math.abs(h(i,3,3))),yy,w*.07,i%3===2?C.red:C.green)}
  return `<g class="${cls}">${s}${mark}</g>`}
const mk=(x,y,s,size,rot=-3,cls='')=>`<text class="${cls}" x="${x}" y="${y}" font-size="${size}" fill="#c4161c" transform="rotate(${rot} ${x} ${y})" style="font-family:'Permanent Marker','Marker Felt','Comic Sans MS',cursive;pointer-events:none">${s}</text>`;
const wavy=(x,y,cls='')=>`<path class="${cls}" d="M${x},${y} q150,-12 ${(790-x)/2},0 t${(790-x)/2},-4" fill="none" stroke="#c4161c" stroke-width="8" stroke-linecap="round"/>`;
function sun(sx,sy){let s='';for(let i=0;i<8;i++){const a=i*.785;s+=poly([[sx+Math.cos(a-.2)*50,sy+Math.sin(a-.2)*50],[sx+Math.cos(a)*72,sy+Math.sin(a)*72],[sx+Math.cos(a+.2)*50,sy+Math.sin(a+.2)*50]],C.orange)}return s+circ(sx,sy,42,C.yellow)}


/* ---------- words in the art: speech bubbles and terminals ---------- */
const xe=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
const pbWarn=m=>{if(typeof __warn==='function')__warn(m)};        /* check collects these; the browser ignores them */
const textW=(s,size,mono)=>String(s).length*size*(mono?.6:.54);   /* an estimate: check has no fonts */
function wrapWords(s,w,size){const out=[];let cur='';
  for(const wd of String(s).split(/\s+/).filter(Boolean)){const t=cur?cur+' '+wd:wd;if(cur&&textW(t,size)>w){out.push(cur);cur=wd}else cur=t}
  if(cur)out.push(cur);return out}
/* Speech bubble centred on (x,y); the tail points at the speaker's mouth (o.tx,o.ty). */
function say(x,y,text,o={}){const size=o.size||22,lh=size*1.18,L=wrapWords(text,o.w||200,size);
  const words=String(text).split(/\s+/).filter(Boolean).length;
  if(words>10)pbWarn(`bubble has ${words} words (max 10): "${text}"`);
  if(L.length>3)pbWarn(`bubble wraps to ${L.length} lines (max 3): "${text}"`);
  const tw=Math.max(...L.map(l=>textW(l,size))),rx=tw/2/.82+18,ry=L.length*lh/2/.74+20;
  const tx=o.tx??x-rx*.4,ty=o.ty??y+ry+50,a=Math.atan2((ty-y)/ry,(tx-x)/rx);
  let g=`<g class="solid${stc()}">`+poly([[x+Math.cos(a-.28)*rx*.8,y+Math.sin(a-.28)*ry*.8],[tx,ty],[x+Math.cos(a+.28)*rx*.8,y+Math.sin(a+.28)*ry*.8]],o.col||C.white);
  if(o.shout){const p=[],n=22;for(let i=0;i<n;i++){const t=i/n*6.2832,k=i%2?1.18:.96;p.push([x+Math.cos(t)*rx*k,y+Math.sin(t)*ry*k])}g+=poly(p,o.col||C.white)}
  else g+=circ(x,y,rx,o.col||C.white,ry);
  g+='</g>';
  const y0=y-(L.length-1)*lh/2+size*.36;
  g+=`<text class="t${stc()}" x="${f(x)}" y="${f(y0)}" font-size="${size}" fill="${C.ink}" text-anchor="middle">`+L.map((l,i)=>`<tspan x="${f(x)}" dy="${i?f(lh):0}">${xe(l)}</tspan>`).join('')+'</text>';
  return `<g class="${o.cls||''}">${g}</g>`}
/* Terminal card. Lines starting with "$ " are commands (lime); the rest are output (white).
   o.upto shows only the first N lines, so each tap can type the next one. */
function term(x,y,w,hh,lines,o={}){const size=o.size||18,lh=size*1.45,n=clamp(o.upto??lines.length,0,lines.length);
  let s=box(x,y,w,hh,C.ink)+box(x,y,w,26,C.dgrey);[0,1,2].forEach(i=>s+=circ(x+18+i*20,y+13,5.5,[C.red,C.yellow,C.lime][i]));
  if(o.title)s+=`<text class="mono" x="${x+w/2}" y="${y+18}" font-size="13" fill="${C.white}" text-anchor="middle">${xe(o.title)}</text>`;
  if(lines.length*lh+36>hh)pbWarn(`terminal holds ${lines.length} lines but is only ${hh} tall`);
  lines.forEach((l,i)=>{const cmd=l.startsWith('$ ');if(cmd&&typeof __cmd==='function')__cmd(l.slice(2));
    if(textW(l,size,1)>w-28)pbWarn(`terminal line too wide for ${w}px at size ${size}: "${l}"`);
    if(i<n)s+=`<text class="mono${i===n-1&&o.upto!=null?' pop':''}" x="${x+14}" y="${f(y+34+size+i*lh)}" font-size="${size}" fill="${cmd?C.lime:C.white}">${xe(l)}</text>`});
  if(o.cursor!==false){const r=Math.max(n-1,0),cy=y+34+size+r*lh,cx=x+14+(n?textW(lines[n-1],size,1)+4:0);s+=box(cx,cy-size*.8,size*.55,size,C.lime,'blink')}
  return `<g class="${o.cls||''}">${s}</g>`}


/* ---------- Getting Started cast ---------- */
/* The Repo: a cardboard box with a face. Feet at (x,y), about 100 wide and 100 tall at s=1.
   o.awake opens its eyes; o.page shows a page sticking out of the top; o.folder a yellow folder. */
function repo(x,y,s,o={}){let g=poly([[-50,-80],[-74,-104],[-24,-98],[0,-80]],C.brown)+poly([[50,-80],[74,-104],[24,-98],[0,-80]],C.brown);
  if(o.page)g+=box(-22,-128,44,56,C.white)+strip(-14,-114,14,-114,3,C.grey)+strip(-14,-102,10,-102,3,C.grey);
  if(o.folder)g+=box(-34,-126,24,12,C.yellow)+box(-34,-118,68,48,C.yellow);
  g+=box(-50,-80,100,80,C.kraft)+box(-6,-80,12,26,C.yellow);
  const lk=(o.look||0)*3;
  if(o.awake)g+=circ(-20,-40,8,C.white)+circ(-20+lk,-40,3.6,C.ink)+circ(20,-40,8,C.white)+circ(20+lk,-40,3.6,C.ink)+(o.m==='wow'?circ(0,-20,5,C.ink):line('M-9,-22 q9,7 18,0'));
  else g+=strip(-27,-40,-13,-40,3,C.ink)+strip(13,-40,27,-40,3,C.ink);
  return `<g transform="translate(${x},${y}) scale(${s})" ${o.cls?`class="${o.cls}"`:''}>${g}</g>`}
/* A save (commit), drawn as an instant photo. */
function photo(x,y,w,col=C.sky,cls='',label=''){return `<g class="${cls}">`+box(x,y,w,w*1.18,C.white)+box(x+w*.1,y+w*.1,w*.8,w*.72,col)+box(x+w*.36,y+w*.26,w*.28,w*.38,C.white)+(label?mk(x+w*.1,y+w*1.07,label,w*.13,-2):'')+'</g>'}
/* The remote: a paper cloud labelled origin, centred on (x,y). */
function cloud(x,y,cls=''){return `<g class="${cls}"><g class="solid${stc()}">`+circ(x-48,y+6,38,C.white)+circ(x,y-16,50,C.white)+circ(x+52,y+4,40,C.white)+box(x-80,y+4,164,40,C.white)+'</g>'+txt(x,y+30,'origin',24,C.ink)+'</g>'}


/* ---------- casts: who plays each role ----------
   A cast is a set of replacements for the role helpers below, with the same arguments, the same
   feet point and about the same height, so every scene works with every cast. Cast files live in
   engine/runtime/casts/ and register themselves in CASTS. Styles (paper, ink, felt) are CSS only. */
/* Image casts: a picture of a character, chosen by name, feet on (x,y), h units tall. Returns '' when the cast has no such picture. */
function sprite(cast,names,x,y,hgt,o={}){const set=(typeof SPRITES!=='undefined'&&SPRITES[cast])||{},name=names.find(n=>set[n]);if(!name)return '';
  const {w,h}=set[name],W=hgt*w/h,href=(SPRITE_DATA&&SPRITE_DATA[cast+'/'+name])||SPRITE_BASE+cast+'/'+name+'.png';
  const img=`<image class="pc sprite" href="${href}" x="${f(-W/2)}" y="${f(-hgt)}" width="${f(W)}" height="${f(hgt)}"${o.flip?' transform="scale(-1,1)"':''}/>`;
  return `<g transform="translate(${f(x)},${f(y)})" class="${o.cls||''}"><ellipse cx="0" cy="-1" rx="${f(W*.38)}" ry="${f(W*.07)}" fill="#000" opacity=".22"/>${img}</g>`}
const ROLES={dev,face,agent,metric,repo,cloud,photo,rocket,book};
const CASTS={paper:{}};
const STYLES=['paper','ink','felt','embroidery'];
let CAST='paper',STYLE='paper';
/* Draw part of a scene in another style (and cast): as('ink',null,()=>dev(...)). */
function as(style,cast,fn){const s0=STYLE,c0=CAST;STYLE=STYLES.includes(style)?style:s0;useCast(cast||c0);let out;
  try{out=fn()}finally{const st=STYLE;STYLE=s0;useCast(c0);out=`<g class="sty-${st}">${out}</g>`}return out}
function useCast(name){CAST=CASTS[name]?name:'paper';const k={...ROLES,...CASTS[CAST]};
  dev=k.dev;face=k.face;agent=k.agent;metric=k.metric;repo=k.repo;cloud=k.cloud;photo=k.photo;rocket=k.rocket;book=k.book}
