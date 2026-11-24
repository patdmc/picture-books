({
  bg: P.mint,
  draw(S){const n=Math.min(S.n,1);
    return players(i=>STYLES[i+1],i=>i%2?'paper':'toys',130,170)+circ(560,150,120,C.white,34)
      +hot('Open the book',box(500,70,120,90,C.red)+box(508,78,104,74,C.white)+txt(560,124,n?'The End':'my book',20,C.ink))+(n?heart(470,90,1.4,C.pink,'pop')+heart(650,90,1.4,C.pink,'pop'):'')},
})
