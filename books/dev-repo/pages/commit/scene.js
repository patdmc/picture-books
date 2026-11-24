({
  bg: P.mint,
  draw(S){const L=["$ git commit -m \"Add the first page\"","1 file changed"],U=[0,1,2],n=Math.min(S.n,U.length-1),done=n===U.length-1;
    return dev(120,470,1.5,DEVS[0],{m:done?'wow':'happy',look:1})+box(430,400,280,70,C.brown)+(done?poly([[540,190],[560,240],[610,250],[565,270],[575,320],[540,290],[505,320],[515,270],[470,250],[520,240]],C.yellow,'pop')+photo(500,215,90,C.sky,'pop'):book(545,300,58))+tmHot(L,U[n])},
})
