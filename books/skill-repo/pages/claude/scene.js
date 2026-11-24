({
  bg: P.mint,
  draw(S){const n=Math.min(S.n,1);return tower(5)+dev(250,470,1.4,DEVS[0],{m:'happy',look:1})
    +(n?agent(560,470,1.6,C.orange,{look:-1,up:true,cls:'pop'})+say(430,240,'I see a recap skill.',{tx:540,ty:300,cls:'pop'}):'')+tmHot(['$ claude'],n)},
})
