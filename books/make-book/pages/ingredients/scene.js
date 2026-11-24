({
  bg: P.pink,
  draw(S){const n=Math.min(S.n,3);
    return dev(150,470,1.5,DEVS[0],{m:n===3?'wow':'happy',look:1})+hot('Add an ingredient',card(300,90,300,250,['You’ll need:','a repo','Claude Code','an idea'],n+1))
      +(n>0?repo(680,470,.9,{awake:true,look:-1,cls:'pop'}):'')+(n>1?agent(700,330,.9,C.orange,{look:-1,cls:'pop'}):'')+(n>2?circ(700,140,30,C.yellow,30,'pop')+box(690,168,20,16,C.grey,'pop'):'')},
})
