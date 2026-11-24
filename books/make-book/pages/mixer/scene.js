({
  bg: P.teal,
  draw(S){const L=STYLES.length,n=Math.min(S.n,L-1),done=n===L-1;   // every player lands on the same style on press L-1
    const s=i=>STYLES[(i+n*(i+1))%L],c=()=>'paper';
    let o=players(s,c,110,150);for(let i=0;i<4;i++)o+=mk(62+i*150,150,s(i),17,-3);
    return o+hot('Mix the styles',bigButton(700,250,S.n%2===1))+(done?say(430,62,'All lined up!',{tx:470,ty:118,shout:true,col:C.yellow,cls:'pop'}):'')},
})
