/* The cast and props shared by every book. */
function face(x,y,r,col,m='happy',lk=0){let g=circ(x,y,r,col);const ey=y-r*.12;
  if(m==='sleep'){g+=strip(x-r*.6,ey,x-r*.2,ey,3,C.ink)+strip(x+r*.2,ey,x+r*.6,ey,3,C.ink)+line(`M${f(x-r*.15)},${f(y+r*.45)} h${f(r*.3)}`)}
  else{for(const s of[-1,1])g+=circ(x+s*r*.4,ey,r*.27,C.white)+circ(x+s*r*.4+lk*r*.1,ey,r*.12,C.ink);
    if(m==='happy')g+=line(`M${f(x-r*.35)},${f(y+r*.35)} q${f(r*.35)},${f(r*.35)} ${f(r*.7)},0`);
    else if(m==='flat')g+=line(`M${f(x-r*.3)},${f(y+r*.45)} h${f(r*.6)}`);
    else if(m==='worry')g+=line(`M${f(x-r*.35)},${f(y+r*.55)} q${f(r*.35)},${f(-r*.3)} ${f(r*.7)},0`);
    else g+=circ(x,y+r*.5,r*.18,C.ink)}
  return g}
function dev(x,y,s,c,o={}){const [hd,bd]=c;let g='';
  g+=strip(-9,-42,-11,-4,10,C.ink)+strip(9,-42,11,-4,10,C.ink)+box(-21,-7,17,9,C.ink)+box(4,-7,17,9,C.ink);
  g+=o.up2?strip(-17,-82,-40,-114,9,hd):strip(-17,-82,-36,-54,9,hd);
  g+=o.up?strip(17,-82,40,-114,9,hd):strip(17,-82,36,-54,9,hd);
  g+=poly([[-23,-40],[24,-41],[18,-92],[-17,-91]],bd);
  if(o.tuft)g+=poly([[-10,-130],[2,-150],[4,-132],[14,-146],[12,-128]],bd);
  g+=face(0,-112,23,hd,o.m,o.look||0);
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
function bubble(cx,cy,rx,ry,tx,ty){return circ(cx,cy,rx,C.white,ry)+circ(cx+(tx-cx)*.72,cy+(ty-cy)*.72,15,C.white)+circ(cx+(tx-cx)*.9,cy+(ty-cy)*.9,8,C.white)}
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
  let g=poly([[x+Math.cos(a-.28)*rx*.8,y+Math.sin(a-.28)*ry*.8],[tx,ty],[x+Math.cos(a+.28)*rx*.8,y+Math.sin(a+.28)*ry*.8]],o.col||C.white);
  if(o.shout){const p=[],n=22;for(let i=0;i<n;i++){const t=i/n*6.2832,k=i%2?1.18:.96;p.push([x+Math.cos(t)*rx*k,y+Math.sin(t)*ry*k])}g+=poly(p,o.col||C.white)}
  else g+=circ(x,y,rx,o.col||C.white,ry);
  const y0=y-(L.length-1)*lh/2+size*.36;
  g+=`<text class="t" x="${f(x)}" y="${f(y0)}" font-size="${size}" fill="${C.ink}" text-anchor="middle">`+L.map((l,i)=>`<tspan x="${f(x)}" dy="${i?f(lh):0}">${xe(l)}</tspan>`).join('')+'</text>';
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
