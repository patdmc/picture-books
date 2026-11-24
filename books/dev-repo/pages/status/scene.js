({
  bg: C.lilac,
  draw(S){const L=["$ git status","Untracked files:","  index.html"],U=[0,1,3],n=Math.min(S.n,U.length-1),done=n===U.length-1;
    return dev(120,470,1.5,DEVS[0],{m:'happy',look:1})+repo(310,470,1.3,{awake:true,page:true,look:-1,m:done?'wow':''})+(done?say(330,240,'This page is new!',{tx:320,ty:318,shout:true,col:C.yellow,cls:'pop'}):'')+tmHot(L,U[n])},
})
