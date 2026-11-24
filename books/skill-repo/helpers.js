/* ---------- skill-repo helpers ---------- */
/* The tower: one block per line of the story so far, bottom up. The newest block drops in. */
const LINKS=['repo','folder','skill','description','Claude','/recap','commit','push','teammate'];
const LCOL=[C.kraft,C.yellow,C.white,C.pink,C.orange,C.lime,C.sky,C.lilac,C.teal];
function tower(k,popNew=true){let s='';for(let i=0;i<k;i++){const y=452-i*40,c=LCOL[i];
  s+=box(22+(i%2)*6,y,150,36,c,i===k-1&&popNew?'pop':'')+txt(97+(i%2)*6,y+25,LINKS[i],18,c===C.orange||c===C.teal?C.white:C.ink,'middle',i===k-1&&popNew?'pop':'')}
  return s}
/* The terminal, top right. n = how many lines are showing. */
const SH=(lines)=>36+lines.length*23.2+16;
const tm=(lines,n,o={})=>term(o.x??360,o.y??28,420,SH(lines),lines,{upto:n,size:16,title:o.title||'my-site'});
const tmHot=(lines,n,o={})=>hot(o.label||'Type the command',tm(lines,n,o));
/* SKILL.md as a sheet of paper. hl underlines the description. */
const SKILL=['---','name: recap','description: Summarizes uncommitted','  changes and flags anything risky.','  Use when the user asks what changed.','---','Summarize the changes in two or three','bullet points, then list any risks.'];
function skillCard(x,y,o={}){let s=box(x,y,400,250,C.white)+box(x+14,y-14,130,30,C.yellow)+txt(x+79,y+8,'SKILL.md',17,C.ink);
  SKILL.forEach((l,i)=>s+=`<text class="mono" x="${x+16}" y="${f(y+40+i*26)}" font-size="15" fill="${C.ink}">${xe(l)}</text>`);
  if(o.hl)[98,124,150].forEach(d=>s+=strip(x+16,y+d,x+380,y+d,3,'#c4161c','draw'));
  return `<g class="${o.cls||''}">${s}</g>`}
