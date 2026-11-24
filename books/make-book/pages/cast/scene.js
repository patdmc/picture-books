({
  bg: P.pink,
  draw(S){const c=S.n%2?'toys':'paper';
    return hot('Swap the cast',players(()=> 'paper',()=>c,150,170))+mk(330,140,c==='toys'?'toys':'paper people',42,-4,'pop')},
})
