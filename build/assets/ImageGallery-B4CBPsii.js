import{f as Q,h as U,j as m}from"./index-PpXb4kGv.js";var w={},I;function V(){if(I)return w;I=1;function x(a){if(typeof window>"u")return;const l=document.createElement("style");return l.setAttribute("type","text/css"),l.innerHTML=a,document.head.appendChild(l),a}Object.defineProperty(w,"__esModule",{value:!0});var e=Q();function b(a){return a&&typeof a=="object"&&"default"in a?a:{default:a}}var r=b(e);x(`.rfm-marquee-container {
  overflow-x: hidden;
  display: flex;
  flex-direction: row;
  position: relative;
  width: var(--width);
  transform: var(--transform);
}
.rfm-marquee-container:hover div {
  animation-play-state: var(--pause-on-hover);
}
.rfm-marquee-container:active div {
  animation-play-state: var(--pause-on-click);
}

.rfm-overlay {
  position: absolute;
  width: 100%;
  height: 100%;
}
.rfm-overlay::before, .rfm-overlay::after {
  background: linear-gradient(to right, var(--gradient-color), rgba(255, 255, 255, 0));
  content: "";
  height: 100%;
  position: absolute;
  width: var(--gradient-width);
  z-index: 2;
  pointer-events: none;
  touch-action: none;
}
.rfm-overlay::after {
  right: 0;
  top: 0;
  transform: rotateZ(180deg);
}
.rfm-overlay::before {
  left: 0;
  top: 0;
}

.rfm-marquee {
  flex: 0 0 auto;
  min-width: var(--min-width);
  z-index: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  animation: scroll var(--duration) linear var(--delay) var(--iteration-count);
  animation-play-state: var(--play);
  animation-delay: var(--delay);
  animation-direction: var(--direction);
}
@keyframes scroll {
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-100%);
  }
}

.rfm-initial-child-container {
  flex: 0 0 auto;
  display: flex;
  min-width: auto;
  flex-direction: row;
  align-items: center;
}

.rfm-child {
  transform: var(--transform);
}`);const W=e.forwardRef(function({style:l={},className:B="",autoFill:u=!1,play:c=!0,pauseOnHover:q=!1,pauseOnClick:E=!1,direction:n="left",speed:h=50,delay:_=0,loop:R=0,gradient:L=!1,gradientColor:C="white",gradientWidth:v=200,onFinish:X,onCycleComplete:G,onMount:$,children:y},O){const[M,P]=e.useState(0),[p,T]=e.useState(0),[g,k]=e.useState(1),[j,Z]=e.useState(!1),H=e.useRef(null),i=O||H,f=e.useRef(null),d=e.useCallback(()=>{if(f.current&&i.current){const t=i.current.getBoundingClientRect(),S=f.current.getBoundingClientRect();let s=t.width,o=S.width;(n==="up"||n==="down")&&(s=t.height,o=S.height),k(u&&s&&o&&o<s?Math.ceil(s/o):1),P(s),T(o)}},[u,i,n]);e.useEffect(()=>{if(j&&(d(),f.current&&i.current)){const t=new ResizeObserver(()=>d());return t.observe(i.current),t.observe(f.current),()=>{t&&t.disconnect()}}},[d,i,j]),e.useEffect(()=>{d()},[d,y]),e.useEffect(()=>{Z(!0)},[]),e.useEffect(()=>{typeof $=="function"&&$()},[]);const z=e.useMemo(()=>u?p*g/h:p<M?M/h:p/h,[u,M,p,g,h]),J=e.useMemo(()=>Object.assign(Object.assign({},l),{"--pause-on-hover":!c||q?"paused":"running","--pause-on-click":!c||q&&!E||E?"paused":"running","--width":n==="up"||n==="down"?"100vh":"100%","--transform":n==="up"?"rotate(-90deg)":n==="down"?"rotate(90deg)":"none"}),[l,c,q,E,n]),K=e.useMemo(()=>({"--gradient-color":C,"--gradient-width":typeof v=="number"?`${v}px`:v}),[C,v]),A=e.useMemo(()=>({"--play":c?"running":"paused","--direction":n==="left"?"normal":"reverse","--duration":`${z}s`,"--delay":`${_}s`,"--iteration-count":R?`${R}`:"infinite","--min-width":u?"auto":"100%"}),[c,n,z,_,R,u]),N=e.useMemo(()=>({"--transform":n==="up"?"rotate(90deg)":n==="down"?"rotate(-90deg)":"none"}),[n]),D=e.useCallback(t=>[...Array(Number.isFinite(t)&&t>=0?t:0)].map((S,s)=>r.default.createElement(e.Fragment,{key:s},e.Children.map(y,o=>r.default.createElement("div",{style:N,className:"rfm-child"},o)))),[N,y]);return j?r.default.createElement("div",{ref:i,style:J,className:"rfm-marquee-container "+B},L&&r.default.createElement("div",{style:K,className:"rfm-overlay"}),r.default.createElement("div",{className:"rfm-marquee",style:A,onAnimationIteration:G,onAnimationEnd:X},r.default.createElement("div",{className:"rfm-initial-child-container",ref:f},e.Children.map(y,t=>r.default.createElement("div",{style:N,className:"rfm-child"},t))),D(g-1)),r.default.createElement("div",{className:"rfm-marquee",style:A},D(g))):null});return w.default=W,w}var Y=V();const F=U(Y),ne=({items:x})=>m.jsx(F,{gradient:!1,speed:50,children:m.jsx("div",{className:"px-2 sm:px-4",children:m.jsx("div",{className:"columns-2 sm:columns-3 md:columns-4 gap-4",children:x.map((e,b)=>{const r=b%2===0?"h-64":"h-80";return e.type==="image"?m.jsx("img",{src:e.src,alt:"",className:"w-full rounded-xl shadow mb-4"},e.id):e.type==="div"?m.jsx("div",{className:`p-4 ${r} flex justify-center items-center text-white my-2 text-center font-bold rounded-xl shadow-lg  transition-all duration-300 ${e.bg}`,children:e.content},e.id):null})})})});export{ne as I};
