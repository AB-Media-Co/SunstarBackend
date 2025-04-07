import{f as v,c as d,j as e,r as n,a as j,p as g,d as w}from"./index-BC6My4R6.js";import{R as y}from"./RoatinfImg-W5ON6Jgc.js";import{C as N}from"./CommonSlider-lpJohV0-.js";import"./Calendar-M1CO2Qgm.js";import"./Icons-BmFb4KGO.js";import"./format-C4BekRQj.js";/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const k=v("Cctv",[["path",{d:"M16.75 12h3.632a1 1 0 0 1 .894 1.447l-2.034 4.069a1 1 0 0 1-1.708.134l-2.124-2.97",key:"ir91b5"}],["path",{d:"M17.106 9.053a1 1 0 0 1 .447 1.341l-3.106 6.211a1 1 0 0 1-1.342.447L3.61 12.3a2.92 2.92 0 0 1-1.3-3.91L3.69 5.6a2.92 2.92 0 0 1 3.92-1.3z",key:"jlp8i1"}],["path",{d:"M2 19h3.76a2 2 0 0 0 1.8-1.1L9 15",key:"19bib8"}],["path",{d:"M2 21v-4",key:"l40lih"}],["path",{d:"M7 9h.01",key:"19b3jx"}]]),C=d(e.jsx("path",{d:"M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7m0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5"}),"LocationOnSharp"),S=d(e.jsx("path",{d:"M11 9H9V2H7v7H5V2H3v7c0 2.12 1.66 3.84 3.75 3.97V22h2.5v-9.03C11.34 12.84 13 11.12 13 9V2h-2zm5-3v8h2.5v8H21V2c-2.76 0-5 2.24-5 4"}),"Restaurant"),z=d(e.jsx("path",{d:"M20.5 13H22v3h-1.5zm-6-4.35h1.53c1.05 0 1.97.74 1.97 2.05V12h1.5v-1.64c0-1.81-1.6-3.16-3.47-3.16H14.5c-1.02 0-1.85-.98-1.85-2s.83-1.75 1.85-1.75v-1.5c-1.85 0-3.35 1.5-3.35 3.35s1.5 3.35 3.35 3.35M17 13h-2.34L17 15.34zm1.85-8.27c.62-.61 1-1.45 1-2.38h-1.5c0 1.02-.83 1.85-1.85 1.85v1.5c2.24 0 4 1.83 4 4.07V12H22V9.76c0-2.22-1.28-4.14-3.15-5.03M18 13h1.5v3H18zM3.41 4.59 2 6l7 7H2v3h10l7 7 1.41-1.41z"}),"SmokeFreeSharp"),M=d(e.jsx("path",{d:"m1 9 2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9m8 8 3 3 3-3c-1.65-1.66-4.34-1.66-6 0m-4-4 2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13"}),"Wifi"),H=({src:a,className:p,hovered:r})=>{const o=n.useRef(),[c,m]=n.useState(!1);return n.useEffect(()=>{const s=new IntersectionObserver(([x])=>{x.isIntersecting&&(m(!0),s.disconnect())});return o.current&&s.observe(o.current),()=>s.disconnect()},[]),e.jsx("div",{ref:o,className:p,style:{backgroundImage:c?`url(${a})`:"none",transform:r?"scale(1.1)":"scale(1)"}})};function L(){const[a,p]=n.useState(window.innerWidth<=768),[r,o]=n.useState(null);n.useEffect(()=>{const t=()=>{p(window.innerWidth<=768),setTimeout(()=>{window.dispatchEvent(new Event("resize"))},100)};return window.addEventListener("resize",t),()=>window.removeEventListener("resize",t)},[]);const c=[{label:"Wifi",icon:M},{label:"No Smoking",icon:z},{label:"CCTV",icon:k},{label:"Restaurant",icon:S}],m=j(),{data:s}=g(),x=(t,l)=>{var i,u,f;return e.jsx(e.Fragment,{children:(t==null?void 0:t.active)&&e.jsxs("div",{className:"relative w-full md:px-4","data-aos":"fade-up","data-aos-delay":l*100,children:[e.jsxs("div",{className:"relative h-60 overflow-hidden rounded-t-lg z-10",onMouseEnter:()=>o(l),onMouseLeave:()=>o(null),onClick:()=>m(`hotels/${t==null?void 0:t.hotelCode}`),children:[e.jsx(H,{src:(i=t.images[0])==null?void 0:i.replace("/upload/","/upload/f_auto,q_auto,w_800/"),hovered:r===l,className:"absolute inset-0 bg-center bg-cover bg-no-repeat transition-all duration-700 ease-in-out"}),e.jsx("div",{className:`cursor-pointer absolute inset-0 bg-black transition-opacity duration-700 ease-in-out ${r===l?"opacity-20":"opacity-0"}`})]}),e.jsxs("div",{className:"absolute top-[100%] w-full shadow-lg p-4 pt-8 h-[150px] bg-primary-white border rounded-b-lg flex flex-col gap-2",children:[e.jsx("h2",{onClick:()=>m(`hotels/${t==null?void 0:t.hotelCode}`),className:"text-mobile/h5 cursor-pointer hover:text-primary-green md:text-desktop/h5 font-bold text-start transition-colors duration-300",children:t.name}),e.jsxs("div",{className:"flex items-end gap-1 text-mobile/body/2 text-[#707070] font-semibold",children:[e.jsx(C,{className:"text-[#4DB8B6]",style:{fontSize:"18px"}}),e.jsx("span",{className:"truncate max-w-[200px]",children:(u=t.location)==null?void 0:u.hotelAddress})]}),e.jsxs("div",{className:`flex items-center ${((f=s==null?void 0:s.hotels)==null?void 0:f.length)===3?"justify-between":"justify-end"} gap-3 mt-2 text-[#707070] font-semibold`,children:[e.jsx("span",{className:"text-mobile/body/2",children:"Starting From"}),e.jsxs("p",{className:"text-desktop/body/1 font-bold text-[#4DB8B6]",children:["₹",t.price]})]})]}),e.jsx("div",{className:"absolute left-[77%] md:left-[86%] top-[3rem] z-40 flex flex-col items-center gap-[2px] w-[80px] p-4 bg-[#4DB8B6] rounded-xl shadow-lg",children:c.map((h,b)=>e.jsxs("div",{className:"flex flex-col items-center",children:[h.icon&&e.jsx(h.icon,{className:"text-primary-white"}),e.jsx("span",{className:"text-mobile/body/2 text-primary-white",children:h.label}),b!==c.length-1&&e.jsx("hr",{className:"w-full h-[1px] bg-primary-white my-2"})]},b))})]})})};return e.jsx("div",{className:"swiper-container sec2Swiper pb-5",children:e.jsx(N,{items:s==null?void 0:s.hotels,renderItem:x,slidesPerViewDesktop:a?1:3.5,spaceBetween:30,loop:!1,className:"mySwiper hotelCardsHome",cssMode:!0,onInit:t=>{var i;const l=t.wrapperEl;((i=s==null?void 0:s.hotels)==null?void 0:i.length)===3&&l.setAttribute("data-cards","3")}})})}const $=()=>{const{homePageDescription:a}=w();return e.jsxs("div",{className:"flex flex-col mt-[2rem] sm:mt-[3rem] md:mt-0 md:gap-14 justify-between items-center lg:items-start px-2 sm:px-4 lg:px-8 lg:pr-0 z-0",children:[e.jsxs("div",{"data-aos":"fade-up",className:"relative flex flex-col items-center lg:items-start mb-6 sm:mb-8 lg:mb-0 w-full",children:[e.jsx(y,{position:"md:left-0 top-[-6rem] sm:top-[-7rem] md:top-0 left-[-4rem] sm:left-[-6rem] z-0"}),e.jsxs("div",{className:"relative content text-black mt-[-1rem] sm:mt-[-1.5rem] lg:mt-10 px-2 sm:px-4",children:[e.jsx("h1",{className:"text-mobile/h2 sm:text-[1.8rem] md:text-[2rem] lg:text-desktop/h2 font-bold text-reveal-animation",children:a==null?void 0:a.heading}),e.jsx("p",{className:"text-mobile/body/2 sm:text-[1rem] lg:text-desktop/body/1 mt-3 sm:mt-4 animation-on-scroll text-justify",children:a==null?void 0:a.description})]})]}),e.jsx("div",{className:"w-full content overflow-hidden mt-4 sm:mt-6 md:mt-0",children:e.jsx(L,{})})]})};export{$ as default};
