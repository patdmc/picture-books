/* Cut-paper shapes, palette and tap targets. Every shape is a polygon with slightly off corners. */
const C={red:'#d5433c',orange:'#ee8130',yellow:'#f5c542',lime:'#a9cb4f',green:'#4c9a52',teal:'#2e9a93',sky:'#a9d5e8',blue:'#3d6fb5',navy:'#243152',purple:'#7c52a5',lilac:'#cdb8e3',pink:'#f0a3b5',kraft:'#d9b38a',brown:'#8b5a3c',ink:'#2b2a28',white:'#f8f4ea',grey:'#9ba1a6',dgrey:'#5a5f66'};
const P={teal:'#d6ece7',mint:'#cde6c1',pink:'#f8e1e5',kraft:'#eedfc8'}; /* page backgrounds: always paler than the subjects */
const MC=[C.yellow,C.teal,C.pink,C.orange,C.lime,C.purple,C.red];
const DEVS=[[C.orange,C.blue],[C.teal,C.navy],[C.purple,C.pink],[C.blue,C.orange],[C.pink,C.purple],[C.yellow,C.green],[C.red,C.navy]];

/* ---------- cut-paper helpers: every shape is a polygon with slightly off corners ---------- */
const h=(a,b,c)=>{const t=Math.sin(a*12.9898+b*78.233+c*37.719)*43758.5453;return (t-Math.floor(t))*2-1};
const f=n=>(+n).toFixed(1);
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
/* macrame: every piece also gets a layer of knotted cord over its own colour (see #knots in shell.html) */
/* the style a piece is drawn in rides on its own class (st-ink…), so one page can mix styles */
const stc=()=>typeof STYLE!=='undefined'&&STYLE!=='paper'?' st-'+STYLE:'';
/* macrame and embroidery lay a thread texture over each piece's own colour: knots, or satin stitch at one of three angles */
const knotted=cls=>typeof STYLE!=='undefined'&&(STYLE==='macrame'||STYLE==='embroidery')&&!/gloss|shadow/.test(cls);
const texture=pts=>STYLE==='macrame'?'knots':'satin'+(Math.abs(Math.round(pts[0][0]*7+pts[0][1]*3))%3);
const span=pts=>{const xs=pts.map(p=>p[0]),ys=pts.map(p=>p[1]);return Math.max(Math.max(...xs)-Math.min(...xs),Math.max(...ys)-Math.min(...ys))};
const poly=(pts,fill,cls='',extra='')=>{const P=pts.map(p=>f(p[0])+','+f(p[1])).join(' ');
  return `<polygon class="pc${stc()} ${cls}" points="${P}" fill="${fill}" ${extra}/>`+(knotted(cls)&&span(pts)>=20?`<polygon class="knot ${cls}" points="${P}" fill="url(#${texture(pts)})"/>`:'')};
function box0(x,y,w,hh,fill,cls='',extra=''){const J=Math.min(2.4,Math.min(w,hh)*.12);
  return poly([[x,y],[x+w,y],[x+w,y+hh],[x,y+hh]].map((p,i)=>[p[0]+h(x,y,i)*J,p[1]+h(y,w,i+4)*J]),fill,cls,extra)}
/* macrame: a big piece hangs a fringe of loose cords from its bottom edge */
function box(x,y,w,hh,fill,cls='',extra=''){let s=box0(x,y,w,hh,fill,cls,extra);
  if(knotted(cls)&&STYLE==='macrame'&&w>=80&&hh>=36&&fill!==C.ink)for(let fx=x+6;fx<x+w-4;fx+=10)s+=strip(fx,y+hh-2,fx+h(fx,y,9)*3,y+hh+12+Math.abs(h(fx,w,3))*6,3.6,fill,cls);
  return s}
function circ(cx,cy,r,fill,ry=r,cls='',extra=''){const n=clamp(Math.round(r/3)+8,9,20),p=[];
  for(let i=0;i<n;i++){const a=i/n*6.2832+h(cx,cy,i)*.1,k=1+h(cy,r,i)*.05;p.push([cx+Math.cos(a)*r*k,cy+Math.sin(a)*ry*k])}
  return poly(p,fill,cls,extra)}
function strip(x1,y1,x2,y2,w,fill,cls=''){const dx=x2-x1,dy=y2-y1,l=Math.hypot(dx,dy)||1,nx=-dy/l*w/2,ny=dx/l*w/2;
  return poly([[x1+nx,y1+ny],[x2+nx*.85,y2+ny*.85],[x2-nx,y2-ny],[x1-nx*.9,y1-ny*.9]],fill,cls)}
function ribbon(pts,w,fill,cls=''){const up=[],dn=[];pts.forEach((p,i)=>{const a=pts[Math.max(0,i-1)],b=pts[Math.min(pts.length-1,i+1)],dx=b[0]-a[0],dy=b[1]-a[1],l=Math.hypot(dx,dy)||1,nx=-dy/l*w/2,ny=dx/l*w/2;up.push([p[0]+nx,p[1]+ny]);dn.unshift([p[0]-nx,p[1]-ny])});
  return poly(up.concat(dn),fill,cls)}
const txt=(x,y,s,size,fill,anchor='middle',cls='')=>`<text class="pc t${stc()} ${cls}" x="${x}" y="${y}" font-size="${size}" fill="${fill}" text-anchor="${anchor}">${s}</text>`;
const line=(d)=>`<path d="${d}" fill="none" stroke="${C.ink}" stroke-width="3" stroke-linecap="round"/>`;
const check=(x,y,s,col,cls='')=>strip(x-s*.5,y,x-s*.1,y+s*.42,s*.24,col,cls)+strip(x-s*.12,y+s*.42,x+s*.6,y-s*.5,s*.24,col,cls);
let S={n:0};
const hot=(label,inner,key='a',extra='')=>`<g class="hot${S.n?'':' nudge'}" data-tap="${key}" tabindex="0" role="button" aria-label="${label}" ${extra}>${inner}</g>`;
