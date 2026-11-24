({
  bg: C.lilac,
  draw(S){const done=S.n>0;
    return dev(140,470,1.6,DEVS[0],{m:'happy',look:1})+(done?say(250,110,'Added the first page, so the site says hello.',{tx:170,ty:200,w:230,cls:'pop'}):'')
      +hot('Write the message',photo(440,150,200,C.sky,'',done?'Add the first page':''))},
})
