/* ---------- book three helpers ---------- */
const req=(x,y,w,cls='')=>`<g class="${cls}">`+box(x,y,w,w*1.2,C.white)+box(x+w*.14,y+w*.22,w*.72,w*.2,C.red)+strip(x+w*.14,y+w*.62,x+w*.8,y+w*.62,w*.06,C.grey)+strip(x+w*.14,y+w*.82,x+w*.6,y+w*.82,w*.06,C.grey)+'</g>';
const ST=['request','ticket','design','code','PR'];
function chain(n,W){let s=strip(70,195,730,195,4,C.ink);ST.forEach((t,i)=>{const x=22+i*154;s+=box(x,150,138,90,C.white)+txt(x+69,205,t,24,C.ink);if(i<=n)s+=box(x+4,262,W[i],26,C.red,i===n&&n?'pop':'')});return s}
const BL=[C.orange,C.purple,C.lime];
