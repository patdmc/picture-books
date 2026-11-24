({
  bg: C.lilac,
  draw(S){const L=["$ git merge new-idea","Fast-forward"],U=[0,1,2],n=Math.min(S.n,U.length-1),done=n===U.length-1;
    return dev(110,470,1.4,DEVS[0],{m:done?'wow':'happy',look:1,up:done,up2:done})+tracks({y:220,saves:done?4:3,popLast:true,branch:!done,branchSave:!done})+(done?check(640,330,50,C.green,'pop'):'')+tmHot(L,U[n])},
})
