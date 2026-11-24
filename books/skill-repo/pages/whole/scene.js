({
  bg: P.mint,
  draw(S){const n=Math.min(S.n,1);
    return tower(9,false)+repo(330,470,1.1,{awake:true,look:1,folder:true})+agent(470,470,1.4,C.orange,{look:1,up:n>0})
      +hot('Ask for a recap',dev(650,470,1.5,DEVS[1],{m:'happy',look:-1}))
      +(n?say(560,110,'/recap',{tx:640,ty:250,size:30,cls:'pop'})+say(330,150,'Here’s what changed!',{tx:460,ty:330,cls:'pop'}):'')},
})
