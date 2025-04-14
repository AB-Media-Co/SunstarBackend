import{U as J,K as Q,d as V,j as s}from"./index-tlITutK8.js";var b={},L;function Y(){if(L)return b;L=1;function f(i){if(typeof window>"u")return;const n=document.createElement("style");return n.setAttribute("type","text/css"),n.innerHTML=i,document.head.appendChild(n),i}Object.defineProperty(b,"__esModule",{value:!0});var e=J();function j(i){return i&&typeof i=="object"&&"default"in i?i:{default:i}}var l=j(e);f(`.rfm-marquee-container {
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
}`);const S=e.forwardRef(function({style:n={},className:o="",autoFill:a=!1,play:c=!0,pauseOnHover:q=!1,pauseOnClick:N=!1,direction:t="left",speed:g=50,delay:C=0,loop:E=0,gradient:B=!1,gradientColor:A="white",gradientWidth:y=200,onFinish:P,onCycleComplete:U,onMount:I,children:p},X){const[M,G]=e.useState(0),[x,H]=e.useState(0),[w,$]=e.useState(1),[R,K]=e.useState(!1),O=e.useRef(null),u=X||O,h=e.useRef(null),v=e.useCallback(()=>{if(h.current&&u.current){const r=u.current.getBoundingClientRect(),_=h.current.getBoundingClientRect();let d=r.width,m=_.width;(t==="up"||t==="down")&&(d=r.height,m=_.height),$(a&&d&&m&&m<d?Math.ceil(d/m):1),G(d),H(m)}},[a,u,t]);e.useEffect(()=>{if(R&&(v(),h.current&&u.current)){const r=new ResizeObserver(()=>v());return r.observe(u.current),r.observe(h.current),()=>{r&&r.disconnect()}}},[v,u,R]),e.useEffect(()=>{v()},[v,p]),e.useEffect(()=>{K(!0)},[]),e.useEffect(()=>{typeof I=="function"&&I()},[]);const z=e.useMemo(()=>a?x*w/g:x<M?M/g:x/g,[a,M,x,w,g]),T=e.useMemo(()=>Object.assign(Object.assign({},n),{"--pause-on-hover":!c||q?"paused":"running","--pause-on-click":!c||q&&!N||N?"paused":"running","--width":t==="up"||t==="down"?"100vh":"100%","--transform":t==="up"?"rotate(-90deg)":t==="down"?"rotate(90deg)":"none"}),[n,c,q,N,t]),Z=e.useMemo(()=>({"--gradient-color":A,"--gradient-width":typeof y=="number"?`${y}px`:y}),[A,y]),D=e.useMemo(()=>({"--play":c?"running":"paused","--direction":t==="left"?"normal":"reverse","--duration":`${z}s`,"--delay":`${C}s`,"--iteration-count":E?`${E}`:"infinite","--min-width":a?"auto":"100%"}),[c,t,z,C,E,a]),k=e.useMemo(()=>({"--transform":t==="up"?"rotate(90deg)":t==="down"?"rotate(-90deg)":"none"}),[t]),W=e.useCallback(r=>[...Array(Number.isFinite(r)&&r>=0?r:0)].map((_,d)=>l.default.createElement(e.Fragment,{key:d},e.Children.map(p,m=>l.default.createElement("div",{style:k,className:"rfm-child"},m)))),[k,p]);return R?l.default.createElement("div",{ref:u,style:T,className:"rfm-marquee-container "+o},B&&l.default.createElement("div",{style:Z,className:"rfm-overlay"}),l.default.createElement("div",{className:"rfm-marquee",style:D,onAnimationIteration:U,onAnimationEnd:P},l.default.createElement("div",{className:"rfm-initial-child-container",ref:h},e.Children.map(p,r=>l.default.createElement("div",{style:k,className:"rfm-child"},r))),W(w-1)),l.default.createElement("div",{className:"rfm-marquee",style:D},W(w))):null});return b.default=S,b}var F=Y();const ee=Q(F),te=()=>{const{galleryImages:f}=V();if(!f||!f.images||!f.content)return s.jsx("div",{className:"flex items-center justify-center h-48 text-gray-500",children:"Loading or no data available..."});const{images:e,content:j}=f,l=[...e.map(n=>({type:"image",src:n})),...j],i=(n=>{const o=[...n];for(let a=o.length-1;a>0;a--){const c=Math.floor(Math.random()*(a+1));[o[a],o[c]]=[o[c],o[a]]}return o})(l);return s.jsx("div",{className:"relative z-10 w-full md:h-[40rem] h-[600px] overflow-hidden",children:s.jsx(ee,{gradient:!1,speed:50,children:s.jsx("div",{className:"ps-2 sm:ps-4 w-full",children:s.jsx("div",{className:"columns-2 sm:columns-2 md:columns-3 lg:columns-4 gap-4",children:i.map((n,o)=>n.type==="image"?s.jsx("div",{className:"break-inside-avoid mb-4",children:s.jsxs("div",{className:"relative group",children:[s.jsx("img",{src:n.src,alt:"",className:"w-full rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300"}),s.jsx("div",{className:"absolute inset-0 bg-black bg-opacity-0 transition-opacity duration-300 rounded-xl"})]})},`image-${o}`):n.type==="div"?s.jsx("div",{className:"break-inside-avoid mb-4",children:s.jsx("div",{className:`${n.bg} p-4 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 text-primary-white font-bold flex items-center justify-center`,style:{backgroundColor:n.bg,minHeight:o%2===0?"16rem":"20rem"},children:s.jsx("div",{className:"text-center w-full text-xl",children:n.content})})},n._id):null)})})})})};export{te as I};
