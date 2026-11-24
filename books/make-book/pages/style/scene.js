({
  bg: P.mint,
  draw(S){const st=STYLES[S.n%STYLES.length];
    return hot('Try the next style',players(()=>st,()=> 'paper',150,170))+mk(330,140,st,46,-4,'pop')},
})
