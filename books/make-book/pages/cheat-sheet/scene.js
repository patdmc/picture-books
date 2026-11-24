({
  bg: P.pink,
  tap: ()=>go(1,1),
  draw(){return players(i=>STYLES[(i*2)%STYLES.length],i=>i%2?'toys':'paper',110,150)+hot('Start the recipe again',bigButton(700,250,false))},
})
