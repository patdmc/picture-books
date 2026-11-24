({
  bg: P.teal,
  draw(S){const n=Math.min(S.n,1);return tower(4)+hot('Underline the description',skillCard(370,70,{hl:n>0}))
    +(n?mk(400,400,'when to use it',30,-4,'pop'):'')},
})
