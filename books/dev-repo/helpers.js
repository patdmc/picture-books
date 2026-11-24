/* ---------- dev-repo helpers ---------- */
/* The book's terminal, top right. n = how many lines are showing. */
const SH=(lines)=>36+lines.length*23.2+16;
const tm=(lines,n,o={})=>term(o.x??360,o.y??28,420,SH(lines),lines,{upto:n,size:16,title:'my-site'});
const tmHot=(lines,n,o={})=>hot('Type the command',tm(lines,n,o));
/* Main, as a string of saves, with an optional branch hanging off it. */
const SAVE=[C.sky,C.pink,C.lime,C.orange];
function tracks(o={}){const y=o.y??300,k=o.saves??3;let s=strip(300,y,790,y,5,C.ink);
  for(let i=0;i<k;i++)s+=photo(320+i*105,y-12,62,SAVE[i],i===k-1&&o.popLast?'pop':'');
  s+=mk(300,y+108,'main',26,-4);
  if(o.branch){s+=strip(610,y+4,770,y+120,6,C.green)+mk(640,y+178,'new-idea',24,-4);
    if(o.branchSave)s+=photo(700,y+58,58,C.orange,o.branchPop?'pop':'')}
  return s}
