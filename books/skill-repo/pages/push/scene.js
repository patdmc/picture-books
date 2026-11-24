({
  bg: C.sky,
  draw(S){const n=Math.min(S.n,1);
    return tower(8)+dev(250,470,1.4,DEVS[0],{m:n?'wow':'happy',look:1,up:n>0})+cloud(560,240)
      +(n?repo(560,226,.5,{awake:true,folder:true,cls:'pop'})+rocket(470,400,'pop'):repo(430,470,1.2,{awake:true,look:1,folder:true}))+tmHot(['$ git push'],n)},
})
