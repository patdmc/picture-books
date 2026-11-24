/* ---------- the book ---------- */
const $=id=>document.getElementById(id),stage=$('stage'),art=$('art'),sheet=$('sheet');
let idx=0,drag=null,moved=false,swipe=null,enterT=0;
function render(enter,focusKey){const sc=SC[idx];
  art.innerHTML=`<rect width="800" height="500" fill="${sc.bg}"/>`+sc.draw(S);
  if(enter){$('cap').textContent=sc.cap;$('hint').textContent=sc.hint;
    $('count').textContent=idx?`page ${idx} of ${SC.length-1}`:'cover';$('prev').disabled=!idx;
    $('next').setAttribute('aria-label',idx===SC.length-1?'Start the story again':'Next page');
    art.querySelectorAll('.pc').forEach((e,i)=>e.style.setProperty('--i',i));
    stage.classList.add('entering');clearTimeout(enterT);enterT=setTimeout(()=>stage.classList.remove('entering'),1600)}
  else stage.classList.remove('entering');
  if(focusKey){const e=art.querySelector(`[data-tap="${focusKey}"]`);if(e)e.focus()}}
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

const start=d=>{idx=clamp((d&&d.idx)|0,0,SC.length-1);S={n:0};render(true)};
try{window.claude?.hot?.snapshot?.(()=>({idx}))}catch(_){}
window.claude?.hot?.ready?window.claude.hot.ready(start):start(window.claude?.hot?.data??{});
