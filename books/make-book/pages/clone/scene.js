({
  bg: C.sky,
  style: 'ink',
  draw(S){const n=Math.min(S.n,2);
    return wide(['$ git clone https://github.com/patdmc/picture-books.git','$ cd picture-books'],n)+dev(200,470,1.5,DEVS[0],{m:n?'happy':'flat',look:1})+(n?repo(420,470,1.2,{awake:true,look:-1,cls:'pop'}):'')},
})
