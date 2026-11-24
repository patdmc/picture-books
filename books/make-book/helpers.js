/* ---------- make-book helpers ---------- */
/* A wide terminal across the top. n = how many lines are showing. */
const wide=(lines,n,o={})=>hot(o.label||'Type the command',term(30,24,740,36+lines.length*21.8+18,lines,{upto:n,size:15,title:o.title||'picture-books'}));
/* The four players, side by side; s(i) and c(i) pick each one's style and cast. */
const PLAY=[(x)=>dev(x,470,1.25,DEVS[0],{m:'happy',look:1}),(x)=>agent(x,470,1.3,C.orange,{look:-1}),(x)=>repo(x,470,.95,{awake:true}),(x)=>metric(x,420,40,C.yellow)];
function players(s,c,x0=150,dx=170,o={}){return PLAY.map((p,i)=>as(s(i),c(i),()=>p(x0+i*dx))).join('')}
/* A recipe card with handwritten lines. */
function card(x,y,w,hh,lines,k=lines.length){let s=box(x,y,w,hh,C.white)+strip(x+14,y+40,x+w-14,y+40,3,C.pink);
  lines.slice(0,k).forEach((l,i)=>s+=mk(x+20,y+76+i*38,l,24,-2,i===k-1?'pop':''));return s}
/* The big round button. */
const bigButton=(x,y,down)=>circ(x,y+18,58,C.dgrey,24)+circ(x,y+(down?10:0),50,C.red,22)+txt(x,y+(down?18:8),'MIX',26,C.white);
