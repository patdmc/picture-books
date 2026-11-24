({
  bg: P.teal,
  draw(S){const n=Math.min(S.n,4),done=n===4,L=STYLES.length;
    const s=i=>STYLES[(i+n*(i+1))%L],c=i=>done?'toys':(n+i)%2?'toys':'paper';
    let o=players(s,c,110,150);for(let i=0;i<4;i++)o+=mk(62+i*150,150,s(i),17,-3);
    return o+hot('Mix the styles and casts',bigButton(700,250,S.n%2===1))+(done?say(430,62,'All lined up!',{tx:470,ty:118,shout:true,col:C.yellow,cls:'pop'}):'')},
})
