({
  bg: P.pink,
  draw(S){const n=Math.min(S.n,1);return tower(2)+dev(260,470,1.4,DEVS[0],{m:n?'wow':'happy',look:1})+repo(470,470,1.5,{awake:true,look:-1,folder:n>0})
    +(n?mk(420,160,'.claude/skills/recap',24,-4,'pop'):'')+tmHot(['$ mkdir -p .claude/skills/recap'],n)},
})
