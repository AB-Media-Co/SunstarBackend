import{a5 as te,$ as ne,R as k,e as re,j as p}from"./index-DK1tTKYB.js";var q={},F;function ae(){if(F)return q;F=1;function r(o){if(typeof window>"u")return;const i=document.createElement("style");return i.setAttribute("type","text/css"),i.innerHTML=o,document.head.appendChild(i),o}Object.defineProperty(q,"__esModule",{value:!0});var e=te();function t(o){return o&&typeof o=="object"&&"default"in o?o:{default:o}}var n=t(e);r(`.rfm-marquee-container {
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
}`);const a=e.forwardRef(function({style:i={},className:f="",autoFill:m=!1,play:c=!0,pauseOnHover:C=!1,pauseOnClick:l=!1,direction:s="left",speed:d=50,delay:v=0,loop:I=0,gradient:G=!1,gradientColor:S="white",gradientWidth:j=200,onFinish:X,onCycleComplete:H,onMount:W,children:O},K){const[M,Z]=e.useState(0),[N,J]=e.useState(0),[E,$]=e.useState(1),[R,Q]=e.useState(!1),V=e.useRef(null),h=K||V,w=e.useRef(null),b=e.useCallback(()=>{if(w.current&&h.current){const u=h.current.getBoundingClientRect(),D=w.current.getBoundingClientRect();let y=u.width,g=D.width;(s==="up"||s==="down")&&(y=u.height,g=D.height),$(m&&y&&g&&g<y?Math.ceil(y/g):1),Z(y),J(g)}},[m,h,s]);e.useEffect(()=>{if(R&&(b(),w.current&&h.current)){const u=new ResizeObserver(()=>b());return u.observe(h.current),u.observe(w.current),()=>{u&&u.disconnect()}}},[b,h,R]),e.useEffect(()=>{b()},[b,O]),e.useEffect(()=>{Q(!0)},[]),e.useEffect(()=>{typeof W=="function"&&W()},[]);const z=e.useMemo(()=>m?N*E/d:N<M?M/d:N/d,[m,M,N,E,d]),Y=e.useMemo(()=>Object.assign(Object.assign({},i),{"--pause-on-hover":!c||C?"paused":"running","--pause-on-click":!c||C&&!l||l?"paused":"running","--width":s==="up"||s==="down"?"100vh":"100%","--transform":s==="up"?"rotate(-90deg)":s==="down"?"rotate(90deg)":"none"}),[i,c,C,l,s]),ee=e.useMemo(()=>({"--gradient-color":S,"--gradient-width":typeof j=="number"?`${j}px`:j}),[S,j]),B=e.useMemo(()=>({"--play":c?"running":"paused","--direction":s==="left"?"normal":"reverse","--duration":`${z}s`,"--delay":`${v}s`,"--iteration-count":I?`${I}`:"infinite","--min-width":m?"auto":"100%"}),[c,s,z,v,I,m]),_=e.useMemo(()=>({"--transform":s==="up"?"rotate(90deg)":s==="down"?"rotate(-90deg)":"none"}),[s]),L=e.useCallback(u=>[...Array(Number.isFinite(u)&&u>=0?u:0)].map((D,y)=>n.default.createElement(e.Fragment,{key:y},e.Children.map(O,g=>n.default.createElement("div",{style:_,className:"rfm-child"},g)))),[_,O]);return R?n.default.createElement("div",{ref:h,style:Y,className:"rfm-marquee-container "+f},G&&n.default.createElement("div",{style:ee,className:"rfm-overlay"}),n.default.createElement("div",{className:"rfm-marquee",style:B,onAnimationIteration:H,onAnimationEnd:X},n.default.createElement("div",{className:"rfm-initial-child-container",ref:w},e.Children.map(O,u=>n.default.createElement("div",{style:_,className:"rfm-child"},u))),L(E-1)),n.default.createElement("div",{className:"rfm-marquee",style:B},L(E))):null});return q.default=a,q}var oe=ae();const se=ne(oe);function ie(r,e){if(r==null)return{};var t=le(r,e),n,a;if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(r);for(a=0;a<o.length;a++)n=o[a],!(e.indexOf(n)>=0)&&Object.prototype.propertyIsEnumerable.call(r,n)&&(t[n]=r[n])}return t}function le(r,e){if(r==null)return{};var t={},n=Object.keys(r),a,o;for(o=0;o<n.length;o++)a=n[o],!(e.indexOf(a)>=0)&&(t[a]=r[a]);return t}function A(){return A=Object.assign||function(r){for(var e=1;e<arguments.length;e++){var t=arguments[e];for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(r[n]=t[n])}return r},A.apply(this,arguments)}function T(r,e){var t=Object.keys(r);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(r);e&&(n=n.filter(function(a){return Object.getOwnPropertyDescriptor(r,a).enumerable})),t.push.apply(t,n)}return t}function x(r){for(var e=1;e<arguments.length;e++){var t=arguments[e]!=null?arguments[e]:{};e%2?T(Object(t),!0).forEach(function(n){ue(r,n,t[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(r,Object.getOwnPropertyDescriptors(t)):T(Object(t)).forEach(function(n){Object.defineProperty(r,n,Object.getOwnPropertyDescriptor(t,n))})}return r}function ue(r,e,t){return e in r?Object.defineProperty(r,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):r[e]=t,r}const ce={breakpointCols:void 0,className:void 0,columnClassName:void 0,children:void 0,columnAttrs:void 0,column:void 0},P=2;class U extends k.Component{constructor(e){super(e),this.reCalculateColumnCount=this.reCalculateColumnCount.bind(this),this.reCalculateColumnCountDebounce=this.reCalculateColumnCountDebounce.bind(this);let t;this.props.breakpointCols&&this.props.breakpointCols.default?t=this.props.breakpointCols.default:t=parseInt(this.props.breakpointCols)||P,this.state={columnCount:t}}componentDidMount(){this.reCalculateColumnCount(),window&&window.addEventListener("resize",this.reCalculateColumnCountDebounce)}componentDidUpdate(){this.reCalculateColumnCount()}componentWillUnmount(){window&&window.removeEventListener("resize",this.reCalculateColumnCountDebounce)}reCalculateColumnCountDebounce(){if(!window||!window.requestAnimationFrame){this.reCalculateColumnCount();return}window.cancelAnimationFrame&&window.cancelAnimationFrame(this._lastRecalculateAnimationFrame),this._lastRecalculateAnimationFrame=window.requestAnimationFrame(()=>{this.reCalculateColumnCount()})}reCalculateColumnCount(){const e=window&&window.innerWidth||1/0;let t=this.props.breakpointCols;typeof t!="object"&&(t={default:parseInt(t)||P});let n=1/0,a=t.default||P;for(let o in t){const i=parseInt(o);i>0&&e<=i&&i<n&&(n=i,a=t[o])}a=Math.max(1,parseInt(a)||1),this.state.columnCount!==a&&this.setState({columnCount:a})}itemsInColumns(){const e=this.state.columnCount,t=new Array(e),n=k.Children.toArray(this.props.children);for(let a=0;a<n.length;a++){const o=a%e;t[o]||(t[o]=[]),t[o].push(n[a])}return t}renderColumns(){const{column:e,columnAttrs:t={},columnClassName:n}=this.props,a=this.itemsInColumns(),o=`${100/a.length}%`;let i=n;i&&typeof i!="string"&&(this.logDeprecated('The property "columnClassName" requires a string'),typeof i>"u"&&(i="my-masonry-grid_column"));const f=x(x(x({},e),t),{},{style:x(x({},t.style),{},{width:o}),className:i});return a.map((m,c)=>k.createElement("div",A({},f,{key:c}),m))}logDeprecated(e){console.error("[Masonry]",e)}render(){const e=this.props,{children:t,breakpointCols:n,columnClassName:a,columnAttrs:o,column:i,className:f}=e,m=ie(e,["children","breakpointCols","columnClassName","columnAttrs","column","className"]);let c=f;return typeof f!="string"&&(this.logDeprecated('The property "className" requires a string'),typeof f>"u"&&(c="my-masonry-grid")),k.createElement("div",A({},m,{className:c}),this.renderColumns())}}U.defaultProps=ce;const de=()=>{const{galleryImages:r}=re();if(!r||!r.images||!r.content)return p.jsx("div",{className:"flex items-center justify-center h-48 text-gray-500",children:"Loading or no data available..."});const{images:e,content:t}=r,n=[...t,...e.map(l=>({type:"image",src:l}))],o=(l=>{const s=[...l];for(let d=s.length-1;d>0;d--){const v=Math.floor(Math.random()*(d+1));[s[d],s[v]]=[s[v],s[d]]}return s})(n),i={default:4,1024:3,768:2,480:2},c=2*4,C=o.slice(0,c);return p.jsx("div",{className:"relative z-10 w-full ",children:p.jsx(se,{gradient:!1,speed:60,className:" ",children:p.jsx("div",{className:"ps-4 sm:ps-6 py-8 m",children:p.jsx(U,{breakpointCols:i,className:"my-masonry-grid",columnClassName:"my-masonry-grid_column ",children:C.map((l,s)=>l.type==="image"?p.jsx("div",{className:"rounded-2xl shadow-md bg-white",children:p.jsx("img",{src:l.src,alt:"Gallery item",className:"w-full object-cover rounded-2xl",loading:"lazy"})},`image-${s}`):l.type==="div"?p.jsx("div",{className:"rounded-2xl shadow-md",style:{backgroundColor:l.bg||"#FFEB3B",minHeight:s%2===0?"10rem":"14rem",display:"flex",alignItems:"center",justifyContent:"center",padding:"2rem"},children:p.jsx("div",{className:"text-center text-primary-black text-lg font-semibold leading-snug",children:l.content})},l._id):null)})})})})};export{de as I};
