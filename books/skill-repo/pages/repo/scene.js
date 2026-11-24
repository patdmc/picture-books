({
  bg: C.sky,
  draw(S){const n=Math.min(S.n,1);return tower(1)+dev(260,470,1.4,DEVS[0],{m:'happy',look:1})+repo(470,470,1.5,{awake:n>0,look:-1})+tmHot(['$ cd my-site'],n)},
})
