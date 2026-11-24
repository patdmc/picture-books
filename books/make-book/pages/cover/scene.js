({
  bg: P.mint,
  tap: ()=>go(1,1),
  draw(){const S5=['paper','ink','felt','embroidery'];
    return txt(400,86,'How to Make',58,C.ink)+txt(400,156,'a Picture Book',62,C.red)+players(i=>S5[i],()=>'paper',150,170)+hot('Start the recipe',bigButton(740,230,false))},
})
