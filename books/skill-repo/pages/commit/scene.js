({
  bg: C.sky,
  draw(S){const U=[0,1,2],n=Math.min(S.n,2);
    return tower(7)+dev(250,470,1.4,DEVS[0],{m:'happy',look:1})+repo(430,470,1.2,{awake:true,look:1,folder:true})
      +(n>1?photo(560,250,110,C.yellow,'pop','recap skill'):'')+tmHot(['$ git add .claude','$ git commit -m "Add the recap skill"'],U[n])},
})
