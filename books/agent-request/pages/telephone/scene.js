({
  bg: P.kraft,
 draw(S){const n=Math.min(S.n,4);return hot('Pass it on',chain(n,[130,98,66,38,16]))+dev(90,478,1.15,DEVS[0],{m:['happy','flat','flat','worry','worry'][n],look:1})+agent(710,478,1.15,C.teal,{look:-1,m:n===4?'flat':''})+(n===4?txt(630,345,'?',70,C.ink,'middle','pop'):'')},
})
