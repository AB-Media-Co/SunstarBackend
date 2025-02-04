import{e as te,f as ne,R as O,j as h}from"./index-Bli-Bc4h.js";var N={},F;function re(){if(F)return N;F=1;function a(r){if(typeof window>"u")return;const i=document.createElement("style");return i.setAttribute("type","text/css"),i.innerHTML=r,document.head.appendChild(i),r}Object.defineProperty(N,"__esModule",{value:!0});var e=te();function t(r){return r&&typeof r=="object"&&"default"in r?r:{default:r}}var n=t(e);a(`.rfm-marquee-container {
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
}`);const o=e.forwardRef(function({style:i={},className:m="",autoFill:u=!1,play:c=!0,pauseOnHover:q=!1,pauseOnClick:k=!1,direction:s="left",speed:w=50,delay:I=0,loop:M=0,gradient:X=!1,gradientColor:S="white",gradientWidth:b=200,onFinish:G,onCycleComplete:K,onMount:W,children:v},Z){const[R,H]=e.useState(0),[x,J]=e.useState(0),[j,$]=e.useState(1),[_,Q]=e.useState(!1),V=e.useRef(null),f=Z||V,y=e.useRef(null),C=e.useCallback(()=>{if(y.current&&f.current){const l=f.current.getBoundingClientRect(),A=y.current.getBoundingClientRect();let d=l.width,p=A.width;(s==="up"||s==="down")&&(d=l.height,p=A.height),$(u&&d&&p&&p<d?Math.ceil(d/p):1),H(d),J(p)}},[u,f,s]);e.useEffect(()=>{if(_&&(C(),y.current&&f.current)){const l=new ResizeObserver(()=>C());return l.observe(f.current),l.observe(y.current),()=>{l&&l.disconnect()}}},[C,f,_]),e.useEffect(()=>{C()},[C,v]),e.useEffect(()=>{Q(!0)},[]),e.useEffect(()=>{typeof W=="function"&&W()},[]);const z=e.useMemo(()=>u?x*j/w:x<R?R/w:x/w,[u,R,x,j,w]),Y=e.useMemo(()=>Object.assign(Object.assign({},i),{"--pause-on-hover":!c||q?"paused":"running","--pause-on-click":!c||q&&!k||k?"paused":"running","--width":s==="up"||s==="down"?"100vh":"100%","--transform":s==="up"?"rotate(-90deg)":s==="down"?"rotate(90deg)":"none"}),[i,c,q,k,s]),ee=e.useMemo(()=>({"--gradient-color":S,"--gradient-width":typeof b=="number"?`${b}px`:b}),[S,b]),L=e.useMemo(()=>({"--play":c?"running":"paused","--direction":s==="left"?"normal":"reverse","--duration":`${z}s`,"--delay":`${I}s`,"--iteration-count":M?`${M}`:"infinite","--min-width":u?"auto":"100%"}),[c,s,z,I,M,u]),D=e.useMemo(()=>({"--transform":s==="up"?"rotate(90deg)":s==="down"?"rotate(-90deg)":"none"}),[s]),B=e.useCallback(l=>[...Array(Number.isFinite(l)&&l>=0?l:0)].map((A,d)=>n.default.createElement(e.Fragment,{key:d},e.Children.map(v,p=>n.default.createElement("div",{style:D,className:"rfm-child"},p)))),[D,v]);return _?n.default.createElement("div",{ref:f,style:Y,className:"rfm-marquee-container "+m},X&&n.default.createElement("div",{style:ee,className:"rfm-overlay"}),n.default.createElement("div",{className:"rfm-marquee",style:L,onAnimationIteration:K,onAnimationEnd:G},n.default.createElement("div",{className:"rfm-initial-child-container",ref:y},e.Children.map(v,l=>n.default.createElement("div",{style:D,className:"rfm-child"},l))),B(j-1)),n.default.createElement("div",{className:"rfm-marquee",style:L},B(j))):null});return N.default=o,N}var ae=re();const oe=ne(ae);function ie(a,e){if(a==null)return{};var t=se(a,e),n,o;if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(a);for(o=0;o<r.length;o++)n=r[o],!(e.indexOf(n)>=0)&&Object.prototype.propertyIsEnumerable.call(a,n)&&(t[n]=a[n])}return t}function se(a,e){if(a==null)return{};var t={},n=Object.keys(a),o,r;for(r=0;r<n.length;r++)o=n[r],!(e.indexOf(o)>=0)&&(t[o]=a[o]);return t}function E(){return E=Object.assign||function(a){for(var e=1;e<arguments.length;e++){var t=arguments[e];for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(a[n]=t[n])}return a},E.apply(this,arguments)}function U(a,e){var t=Object.keys(a);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(a);e&&(n=n.filter(function(o){return Object.getOwnPropertyDescriptor(a,o).enumerable})),t.push.apply(t,n)}return t}function g(a){for(var e=1;e<arguments.length;e++){var t=arguments[e]!=null?arguments[e]:{};e%2?U(Object(t),!0).forEach(function(n){le(a,n,t[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(a,Object.getOwnPropertyDescriptors(t)):U(Object(t)).forEach(function(n){Object.defineProperty(a,n,Object.getOwnPropertyDescriptor(t,n))})}return a}function le(a,e,t){return e in a?Object.defineProperty(a,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):a[e]=t,a}const ue={breakpointCols:void 0,className:void 0,columnClassName:void 0,children:void 0,columnAttrs:void 0,column:void 0},P=2;class T extends O.Component{constructor(e){super(e),this.reCalculateColumnCount=this.reCalculateColumnCount.bind(this),this.reCalculateColumnCountDebounce=this.reCalculateColumnCountDebounce.bind(this);let t;this.props.breakpointCols&&this.props.breakpointCols.default?t=this.props.breakpointCols.default:t=parseInt(this.props.breakpointCols)||P,this.state={columnCount:t}}componentDidMount(){this.reCalculateColumnCount(),window&&window.addEventListener("resize",this.reCalculateColumnCountDebounce)}componentDidUpdate(){this.reCalculateColumnCount()}componentWillUnmount(){window&&window.removeEventListener("resize",this.reCalculateColumnCountDebounce)}reCalculateColumnCountDebounce(){if(!window||!window.requestAnimationFrame){this.reCalculateColumnCount();return}window.cancelAnimationFrame&&window.cancelAnimationFrame(this._lastRecalculateAnimationFrame),this._lastRecalculateAnimationFrame=window.requestAnimationFrame(()=>{this.reCalculateColumnCount()})}reCalculateColumnCount(){const e=window&&window.innerWidth||1/0;let t=this.props.breakpointCols;typeof t!="object"&&(t={default:parseInt(t)||P});let n=1/0,o=t.default||P;for(let r in t){const i=parseInt(r);i>0&&e<=i&&i<n&&(n=i,o=t[r])}o=Math.max(1,parseInt(o)||1),this.state.columnCount!==o&&this.setState({columnCount:o})}itemsInColumns(){const e=this.state.columnCount,t=new Array(e),n=O.Children.toArray(this.props.children);for(let o=0;o<n.length;o++){const r=o%e;t[r]||(t[r]=[]),t[r].push(n[o])}return t}renderColumns(){const{column:e,columnAttrs:t={},columnClassName:n}=this.props,o=this.itemsInColumns(),r=`${100/o.length}%`;let i=n;i&&typeof i!="string"&&(this.logDeprecated('The property "columnClassName" requires a string'),typeof i>"u"&&(i="my-masonry-grid_column"));const m=g(g(g({},e),t),{},{style:g(g({},t.style),{},{width:r}),className:i});return o.map((u,c)=>O.createElement("div",E({},m,{key:c}),u))}logDeprecated(e){console.error("[Masonry]",e)}render(){const e=this.props,{children:t,breakpointCols:n,columnClassName:o,columnAttrs:r,column:i,className:m}=e,u=ie(e,["children","breakpointCols","columnClassName","columnAttrs","column","className"]);let c=m;return typeof m!="string"&&(this.logDeprecated('The property "className" requires a string'),typeof m>"u"&&(c="my-masonry-grid")),O.createElement("div",E({},u,{className:c}),this.renderColumns())}}T.defaultProps=ue;const me=({breakpointColumnsObj:a,items:e,rowCountMobile:t})=>{const o=window.innerWidth<=500?t:e.length;return h.jsx(oe,{children:h.jsx("div",{className:"w-full flex overflow-hidden px-4",children:h.jsx(T,{breakpointCols:a,className:"my-masonry-grid gap-4",columnClassName:"my-masonry-grid_column",children:e.slice(0,o).map((r,i)=>r.type==="image"?h.jsx("img",{src:r.src,alt:`Item ${i}`,className:"rounded-lg shadow-md transition-transform transform hover:shadow-lg mb-4 object-cover",style:{width:"100%",height:"auto",maxHeight:`${r.height}px`,objectFit:"cover"},loading:"lazy"},i):h.jsx("div",{style:{height:`${r.height}px`,backgroundColor:r.bg||"#ccc"},className:`flex items-center justify-center rounded-lg shadow-md mb-4 text-center transition-transform transform hover:shadow-lg ${r.bg}`,children:h.jsx("span",{className:"text-white text-xl font-semibold px-4",style:{fontSize:"clamp(1rem, 2.5vw, 1.5rem)"},children:r.content||"Content Unavailable"})},i))})})})};export{me as I};
