({
  bg: P.teal,
  draw(S){const done=S.n>0;
    return dev(190,468,1.8,DEVS[1],{m:'wow',look:1,up:true})+(done?repo(320,468,1.1,{awake:true,look:-1,cls:'pop'})+say(400,140,'A repo of my own!',{tx:240,ty:220,cls:'pop'}):arm(300)+hot('Give the friend a repo',repo(560,340,.9,{look:-1})))},
})
