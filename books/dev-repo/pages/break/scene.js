({
  bg: P.teal,
  draw(S){const L=["$ git commit -am \"Try a new idea\""],U=[0,1],n=Math.min(S.n,U.length-1),done=n===U.length-1;
    return dev(110,470,1.4,DEVS[0],{m:done?'wow':'happy',look:1})+tracks({y:220,branch:true,branchSave:done,branchPop:true})+(done?check(540,140,44,C.green,'pop'):'')+tmHot(L,U[n])},
})
