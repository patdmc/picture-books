({
  bg: P.pink,
 draw(S){const red=S.n%2===1,al=Math.min(Math.ceil(S.n/2),4);let l=box(75,90,90,240,C.ink);[140,210,280].forEach((y,i)=>l+=circ(120,y,28,(red?i===2:i===0)?LIGHT[i]:C.dgrey));
  let s=hot('Change the light',l)+box(300,50,200,400,C.ink)+box(316,80,168,330,C.white);
  s+=`<g transform="translate(400,128)"><g class="${red?'shake':''}">`+poly([[-24,20],[24,20],[15,-4],[11,-22],[0,-30],[-11,-22],[-15,-4]],C.yellow)+circ(0,26,6,C.orange)+'</g></g>';
  for(let i=0;i<al;i++)s+=`<g class="${red&&i===al-1?'pop':''}">`+box(328,180+i*54,144,44,C.red)+txt(400,211+i*54,'RED!',24,C.white)+'</g>';
  return s+dev(650,468,1.65,DEVS[0],{m:red?'worry':'happy',look:-1})},
})
