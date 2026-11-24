({
  bg: P.teal,
  draw(S){const n=Math.min(S.n,1);
    return tower(9)+cloud(330,240)+repo(330,226,.5,{awake:true,folder:true})+dev(660,470,1.4,DEVS[1],{m:n?'wow':'flat',look:-1,up:n>0})
      +(n?repo(510,470,1.1,{awake:true,look:1,folder:true,cls:'pop'}):'')+tmHot(['$ git pull'],n)},
})
