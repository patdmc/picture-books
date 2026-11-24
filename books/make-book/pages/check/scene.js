({
  bg: C.sky,
  cast: 'toys',
  draw(S){const n=Math.min(S.n,2);
    return wide(['$ node engine/cli/picture-book.js check my-book','ok: 14 spreads (cover + 13 pages)'],[0,1,2][n])
      +players(()=> 'paper',()=> 'toys',180,150)+(n>1?check(700,240,60,C.green,'pop'):'')},
})
