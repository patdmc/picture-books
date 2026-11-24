({
  bg: P.mint,
  style: 'felt',
  draw(S){const n=Math.min(S.n,2);
    return wide(['> /picture-book a story about a cat who learns git','Here is the plan, before I make anything.'],[0,1,2][n],{title:'claude'})
      +dev(180,470,1.5,DEVS[0],{m:'happy',look:1})+agent(560,470,1.6,C.orange,{look:-1,up:n>1})+(n>1?metric(380,330,34,C.yellow,'pop'):'')},
})
