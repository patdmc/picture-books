/* ---------- the amigurumi cast: photographs of crocheted dolls ----------
   An image cast. The pictures live in engine/runtime/casts/amigurumi/, made from green-screen photos with
     node engine/cli/picture-book.js sprite amigurumi <name> <photo>
   and named <who>-<mood>[-up]: dev-0-happy, dev-0-wow-up, agent-worry, repo-happy, metric-happy.
   who: dev-<n> for DEVS[n], agent, repo, metric. mood: happy, flat, worry, wow, sleep. -up: an arm raised.
   Anything without a picture yet falls back: another mood, then arms down, then the Dev's picture, then paper. */
function amiNames(who,m='happy',up=false){const ms=[m||'happy','happy'],ws=who==='dev-0'?[who]:[who,'dev-0'],out=[];
  for(const w of ws)for(const mm of ms){if(up)out.push(`${w}-${mm}-up`);out.push(`${w}-${mm}`)}return out}
CASTS.amigurumi={
  dev(x,y,s,c,o={}){const k=Math.max(0,DEVS.indexOf(c));
    return sprite('amigurumi',amiNames('dev-'+k,o.m,o.up||o.up2),x,y,150*s,{cls:o.cls,flip:false})||ROLES.dev(x,y,s,c,o)},
  agent(x,y,s,col,o={}){return sprite('amigurumi',amiNames('agent',o.m,o.up).filter(n=>n.startsWith('agent')),x,y,125*s,{cls:o.cls})||ROLES.agent(x,y,s,col,o)},
  repo(x,y,s,o={}){return sprite('amigurumi',[`repo-${o.folder?'folder':o.page?'page':'happy'}`,'repo-happy'],x,y,110*s,{cls:o.cls})||ROLES.repo(x,y,s,o)},
  metric(x,y,r,col,cls=''){return sprite('amigurumi',['metric-happy'],x,y+r,r*2.2,{cls})||ROLES.metric(x,y,r,col,cls)},
};
