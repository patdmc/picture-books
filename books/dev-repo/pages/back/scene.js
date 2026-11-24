({
  bg: P.mint,
  draw(S){const L=["$ git switch main","Switched to branch 'main'"],U=[0,1,2],n=Math.min(S.n,U.length-1),done=n===U.length-1;
    return tracks({y:220,branch:true,branchSave:true})+(done?dev(650,216,.45,DEVS[0],{m:'happy',look:-1,cls:'pop'}):dev(774,346,.45,DEVS[0],{m:'flat',look:-1}))+dev(110,470,1.4,DEVS[0],{m:'happy',look:1})+tmHot(L,U[n])},
})
