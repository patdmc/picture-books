/* ---------- the book ---------- */
const $=id=>document.getElementById(id),stage=$('stage'),art=$('art'),sheet=$('sheet');
let idx=0,drag=null,moved=false,swipe=null,enterT=0;
/* style and cast: ?style= and ?cast= win, then the page's own, then the book's, then paper */
let Q;try{Q=new URLSearchParams(location.search)}catch(_){Q=new URLSearchParams()}
function dress(sc){const st=Q.get('style')||sc.style||BOOK.style;STYLE=STYLES.includes(st)?st:'paper';useCast(Q.get('cast')||sc.cast||BOOK.cast);
  try{document.documentElement.dataset.style=STYLE;document.documentElement.dataset.cast=CAST}catch(_){}}
function render(enter,focusKey){const sc=SC[idx];dress(sc);
  art.innerHTML=`<rect width="800" height="500" fill="${sc.bg}"/>`+(STYLE==='embroidery'?'<rect width="800" height="500" fill="url(#linen)"/>':'')+sc.draw(S);
  if(enter){$('cap').textContent=sc.cap;$('hint').textContent=sc.hint;
    $('count').textContent=idx?`page ${idx} of ${SC.length-1}`:'cover';$('prev').disabled=!idx;
    $('next').setAttribute('aria-label',idx===SC.length-1?'Start the story again':'Next page');snips(sc.commands);
    art.querySelectorAll('.pc,.knot').forEach((e,i)=>e.style.setProperty('--i',i));
    stage.classList.add('entering');clearTimeout(enterT);enterT=setTimeout(()=>stage.classList.remove('entering'),1600)}
  else stage.classList.remove('entering');
  if(focusKey){const e=art.querySelector(`[data-tap="${focusKey}"]`);if(e)e.focus()}}
/* cheat sheet: a page whose lines.js has commands:[{cmd,note}] lists them under the caption, each with a copy button */
function copyText(s){if(navigator.clipboard&&window.isSecureContext)return navigator.clipboard.writeText(s).catch(()=>copyOld(s));return Promise.resolve(copyOld(s))}
function copyOld(s){const t=document.createElement('textarea');t.value=s;t.setAttribute('readonly','');t.style.cssText='position:fixed;opacity:0;top:0;left:0';
  document.body.appendChild(t);t.select();let ok=false;try{ok=document.execCommand('copy')}catch(_){}t.remove();if(!ok)throw new Error('copy blocked')}
function snips(list){const ul=$('snips');ul.textContent='';ul.hidden=!(list&&list.length);if(ul.hidden)return;
  for(const {cmd,note} of list){const li=document.createElement('li'),code=document.createElement('code'),b=document.createElement('button');
    if(note){const p=document.createElement('span');p.className='note';p.textContent=note;li.appendChild(p)}
    code.textContent=cmd;b.type='button';b.textContent='Copy';b.setAttribute('aria-label','Copy '+cmd);
    b.addEventListener('click',()=>{let t;copyText(cmd).then(()=>{b.textContent='Copied';b.classList.add('done')},()=>{b.textContent='Select it';const r=document.createRange();r.selectNodeContents(code);const sel=getSelection();sel.removeAllRanges();sel.addRange(r)})
      .finally(()=>{clearTimeout(t);t=setTimeout(()=>{b.textContent='Copy';b.classList.remove('done')},1500)})});
    li.append(code,b);ul.appendChild(li)}}
function go(i,dir){if(i<0)return;idx=i>=SC.length?1:i;S={n:0};
  sheet.classList.remove('turnN','turnP');void sheet.offsetWidth;sheet.classList.add(dir<0?'turnP':'turnN');render(true)}
function tap(key,kb){const sc=SC[idx];sc.tap?sc.tap(S,key):S.n++;if(SC[idx]===sc)render(false,kb&&key)}

stage.addEventListener('click',e=>{if(moved){moved=false;return}const t=e.target.closest('[data-tap]');if(t)tap(t.dataset.tap)});
stage.addEventListener('keydown',e=>{const t=e.target.closest('[data-tap]');if(t&&(e.key==='Enter'||e.key===' ')){e.preventDefault();e.stopPropagation();tap(t.dataset.tap,true)}});
stage.addEventListener('pointerdown',e=>{moved=false;if(e.target.closest('[data-drag]')){drag=true;try{stage.setPointerCapture(e.pointerId)}catch(_){}}else swipe={x:e.clientX,y:e.clientY}});
stage.addEventListener('pointermove',e=>{if(!drag)return;const r=stage.getBoundingClientRect();moved=true;S.n=1;
  SC[idx].drag(S,(e.clientX-r.left)/r.width*800,(e.clientY-r.top)/r.height*500);render(false)});
const end=e=>{if(swipe&&e.type==='pointerup'){const dx=e.clientX-swipe.x,dy=e.clientY-swipe.y;if(Math.abs(dx)>60&&Math.abs(dx)>Math.abs(dy)*1.5){moved=true;go(idx+(dx<0?1:-1),dx<0?1:-1);setTimeout(()=>moved=false,50)}}drag=null;swipe=null};
stage.addEventListener('pointerup',end);stage.addEventListener('pointercancel',end);
$('next').addEventListener('click',()=>go(idx+1,1));$('prev').addEventListener('click',()=>go(idx-1,-1));
document.addEventListener('keydown',e=>{if(e.key==='ArrowRight')go(idx+1,1);else if(e.key==='ArrowLeft')go(idx-1,-1)});

/* ?page=N opens that page (the editor's preview uses it) */
const start=d=>{idx=clamp((Q.has('page')?+Q.get('page'):(d&&d.idx))|0,0,SC.length-1);S={n:0};render(true)};
try{window.claude?.hot?.snapshot?.(()=>({idx}))}catch(_){}
window.claude?.hot?.ready?window.claude.hot.ready(start):start(window.claude?.hot?.data??{});
