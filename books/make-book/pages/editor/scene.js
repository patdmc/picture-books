({
  bg: C.lilac,
  style: 'ink',
  draw(S){const n=Math.min(S.n,2);
    const ed=box(250,150,520,230,C.white)+box(262,162,140,206,P.kraft)+box(414,162,220,140,C.sky)+box(414,312,220,56,C.ink)+box(646,162,112,206,P.pink)
      +[0,1,2,3].map(i=>box(270,172+i*48,124,38,i===1?C.yellow:C.white)).join('')+txt(330,145,'script',18,C.ink)+txt(524,145,'preview',18,C.ink)+txt(702,145,'Claude',18,C.ink);
    return wide(['$ node engine/cli/picture-book.js edit','Picture book editor: http://localhost:4800/'],[0,1,2][n])
      +(n>1?'<g class="pop">'+ed+'</g>'+say(150,195,'Make the robot worried.',{tx:122,ty:292,w:160,size:20,cls:'pop'}):'')+dev(120,470,1.4,DEVS[0],{m:'happy',look:1})},
})
