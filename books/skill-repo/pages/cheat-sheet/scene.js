({
  bg: P.pink,
  tap: ()=>go(1,1),
  draw(){return tower(9,false)+dev(300,468,1.6,DEVS[0],{m:'happy',look:1})+arm(330)+hot('Start the story again',repo(560,372,.9,{look:-1,folder:true}))},
})
