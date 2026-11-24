({
  bg: P.kraft,
 draw(S){const n=Math.min(S.n,4);return hot('Carry the sentence',chain(n,[130,130,130,130,130]))+dev(90,478,1.15,DEVS[0],{m:'happy',look:1,up:n===4})+agent(710,478,1.15,C.teal,{look:-1,up:n===4})+(n===4?check(400,385,50,C.green,'pop'):'')},
})
