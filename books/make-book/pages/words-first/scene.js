({
  bg: C.lilac,
  style: 'macrame',
  draw(S){const n=Math.min(S.n,1);
    return card(380,40,360,300,['1. If you give a cat…','2. they’re gonna…','3. so they’ll want…','4. And then…'])+(n?check(700,80,60,C.green,'pop'):'')
      +agent(300,470,1.4,C.orange,{look:1})+hot('Say yes to the words',dev(140,470,1.5,DEVS[0],{m:n?'wow':'happy',look:1,up:n>0}))
      +(n?say(160,120,'Yes! Go!',{tx:150,ty:260,cls:'pop'}):'')},
})
