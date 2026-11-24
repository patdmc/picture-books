({
  bg: P.kraft,
  style: 'felt',
  cast: 'toys',
  draw(S){const n=Math.min(S.n,2);
    return wide(['$ node engine/cli/picture-book.js build --all --pages','$ git push'],n)
      +box(330,300,420,20,C.brown)+[0,1,2,3].map(i=>box(350+i*64,214,52,86,[C.sky,C.lilac,C.yellow,C.pink][i])).join('')+(n>1?box(606,214,52,86,C.red,'pop'):'')
      +dev(160,470,1.5,DEVS[0],{m:n>1?'wow':'happy',look:1,up:n>1})},
})
