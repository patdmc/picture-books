({
  bg: P.teal,
  cast: 'toys',
  draw(S){const n=Math.min(S.n,2);
    return wide(['$ mkdir -p ~/.claude/skills','$ ln -s "$PWD/skills/picture-book" ~/.claude/skills/picture-book'],n)
      +dev(180,470,1.5,DEVS[0],{m:'happy',look:1})+agent(560,470,1.6,C.orange,{look:-1,up:n>1})+(n>1?book(410,250,70,'pop')+say(600,180,'I know how now!',{tx:570,ty:280,cls:'pop'}):'')},
})
