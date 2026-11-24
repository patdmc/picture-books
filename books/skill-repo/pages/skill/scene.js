({
  bg: C.lilac,
  draw(S){const n=Math.min(S.n,1);return tower(3)+repo(290,470,1.1,{awake:true,look:1,folder:true})
    +(n?skillCard(370,70,{cls:'pop'}):hot('Open the folder',box(400,210,70,28,C.yellow)+box(400,226,200,140,C.yellow)))},
})
