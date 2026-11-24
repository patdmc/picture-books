({
  bg: P.pink,
  draw(S){const U=[0,1,3],n=Math.min(S.n,2);
    return tower(6)+dev(250,470,1.4,DEVS[0],{m:n>1?'wow':'happy',look:1})+agent(560,470,1.6,C.orange,{look:-1,up:n>1})
      +tmHot(['> /recap','• index.html: added a footer','• No risks found'],U[n],{title:'claude'})},
})
