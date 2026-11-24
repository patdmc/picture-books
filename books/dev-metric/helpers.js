/* Data for the graphs and the indicator light. */
const V1=[.2,.35,.3,.5,.45,.7,.6,.8], V2=[.25,.4,.33,.55,.48,.78,.6,.9,.7];
const Lv=i=>clamp(.5+.28*Math.sin(i*1.3)+.14*h(i,2,7),.08,.95);
const LIGHT=[C.lime,C.yellow,C.red];
