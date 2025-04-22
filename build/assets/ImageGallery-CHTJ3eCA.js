import{a5 as K,$ as Q,f as V,j as l}from"./index-DcyV_sC9.js";var b={},L;function Y(){if(L)return b;L=1;function m(s){if(typeof window>"u")return;const n=document.createElement("style");return n.setAttribute("type","text/css"),n.innerHTML=s,document.head.appendChild(n),s}Object.defineProperty(b,"__esModule",{value:!0});var e=K();function j(s){return s&&typeof s=="object"&&"default"in s?s:{default:s}}var o=j(e);m(`.rfm-marquee-container {
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
}`);const S=e.forwardRef(function({style:n={},className:i="",autoFill:a=!1,play:c=!0,pauseOnHover:q=!1,pauseOnClick:E=!1,direction:t="left",speed:g=50,delay:C=0,loop:N=0,gradient:B=!1,gradientColor:$="white",gradientWidth:y=200,onFinish:P,onCycleComplete:X,onMount:A,children:p},G){const[M,H]=e.useState(0),[w,O]=e.useState(0),[x,I]=e.useState(1),[R,T]=e.useState(!1),U=e.useRef(null),u=G||U,h=e.useRef(null),v=e.useCallback(()=>{if(h.current&&u.current){const r=u.current.getBoundingClientRect(),k=h.current.getBoundingClientRect();let d=r.width,f=k.width;(t==="up"||t==="down")&&(d=r.height,f=k.height),I(a&&d&&f&&f<d?Math.ceil(d/f):1),H(d),O(f)}},[a,u,t]);e.useEffect(()=>{if(R&&(v(),h.current&&u.current)){const r=new ResizeObserver(()=>v());return r.observe(u.current),r.observe(h.current),()=>{r&&r.disconnect()}}},[v,u,R]),e.useEffect(()=>{v()},[v,p]),e.useEffect(()=>{T(!0)},[]),e.useEffect(()=>{typeof A=="function"&&A()},[]);const z=e.useMemo(()=>a?w*x/g:w<M?M/g:w/g,[a,M,w,x,g]),Z=e.useMemo(()=>Object.assign(Object.assign({},n),{"--pause-on-hover":!c||q?"paused":"running","--pause-on-click":!c||q&&!E||E?"paused":"running","--width":t==="up"||t==="down"?"100vh":"100%","--transform":t==="up"?"rotate(-90deg)":t==="down"?"rotate(90deg)":"none"}),[n,c,q,E,t]),J=e.useMemo(()=>({"--gradient-color":$,"--gradient-width":typeof y=="number"?`${y}px`:y}),[$,y]),D=e.useMemo(()=>({"--play":c?"running":"paused","--direction":t==="left"?"normal":"reverse","--duration":`${z}s`,"--delay":`${C}s`,"--iteration-count":N?`${N}`:"infinite","--min-width":a?"auto":"100%"}),[c,t,z,C,N,a]),_=e.useMemo(()=>({"--transform":t==="up"?"rotate(90deg)":t==="down"?"rotate(-90deg)":"none"}),[t]),W=e.useCallback(r=>[...Array(Number.isFinite(r)&&r>=0?r:0)].map((k,d)=>o.default.createElement(e.Fragment,{key:d},e.Children.map(p,f=>o.default.createElement("div",{style:_,className:"rfm-child"},f)))),[_,p]);return R?o.default.createElement("div",{ref:u,style:Z,className:"rfm-marquee-container "+i},B&&o.default.createElement("div",{style:J,className:"rfm-overlay"}),o.default.createElement("div",{className:"rfm-marquee",style:D,onAnimationIteration:X,onAnimationEnd:P},o.default.createElement("div",{className:"rfm-initial-child-container",ref:h},e.Children.map(p,r=>o.default.createElement("div",{style:_,className:"rfm-child"},r))),W(x-1)),o.default.createElement("div",{className:"rfm-marquee",style:D},W(x))):null});return b.default=S,b}var F=Y();const ee=Q(F),te=()=>{const{galleryImages:m}=V();if(!m||!m.images||!m.content)return l.jsx("div",{className:"flex items-center justify-center h-48 text-gray-500",children:"Loading or no data available..."});const{images:e,content:j}=m,o=[...e.map(n=>({type:"image",src:n})),...j],s=(n=>{const i=[...n];for(let a=i.length-1;a>0;a--){const c=Math.floor(Math.random()*(a+1));[i[a],i[c]]=[i[c],i[a]]}return i})(o);return l.jsx("div",{className:"relative z-10 w-full md:h-[40rem] h-[600px] overflow-hidden",children:l.jsx(ee,{gradient:!1,speed:50,children:l.jsx("div",{className:"ps-2 sm:ps-4 w-full",children:l.jsx("div",{className:"columns-2 sm:columns-2 md:columns-3 lg:columns-4 gap-4",children:s.map((n,i)=>n.type==="image"?l.jsx("div",{className:"break-inside-avoid mb-4 overflow-hidden",children:l.jsx("img",{src:n.src,className:"w-full rounded-2xl scale-[0.99] h-full object-cover bg-white"})},`image-${i}`):n.type==="div"?l.jsx("div",{className:"break-inside-avoid mb-4",children:l.jsx("div",{className:`${n.bg} p-4 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 text-primary-white font-bold flex items-center justify-center`,style:{backgroundColor:n.bg,minHeight:i%2===0?"16rem":"20rem"},children:l.jsx("div",{className:"text-center w-full text-xl",children:n.content})})},n._id):null)})})})})};export{te as I};
