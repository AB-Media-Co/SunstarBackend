import{d as p,a as h,j as e,r as n}from"./index-BC6My4R6.js";import{C as u}from"./CommonSlider-lpJohV0-.js";const b=({src:s,className:a})=>{const t=n.useRef(),[o,l]=n.useState(!1);return n.useEffect(()=>{const r=new IntersectionObserver(([d])=>{d.isIntersecting&&(l(!0),r.disconnect())});return t.current&&r.observe(t.current),()=>r.disconnect()},[]),e.jsx("div",{ref:t,className:a,style:{backgroundImage:o?`url(${s})`:"none"},role:"img","aria-label":"Feature image"})},c=(s,a)=>{if(!s)return"";const t=s.split(" ");return t.length>a?t.slice(0,a).join(" ")+"...":s},y=()=>{const{shineSection:s}=p(),{heading:a,description:t,features:o}=s||{},l=h(),r=(d,x)=>{var i;return e.jsxs("div",{className:"max-w-full sm:max-w-lg relative cursor-pointer","data-aos":"fade-up","data-aos-delay":x*100,onClick:()=>{l("/why-sunstar#what-make-us-shine"),setTimeout(()=>{var m;(m=document.getElementById("what-make-us-shine"))==null||m.scrollIntoView({behavior:"smooth"})},100)},children:[e.jsx(b,{src:(i=d.image)==null?void 0:i.replace("/upload/","/upload/f_auto,q_auto,w_800/"),className:"h-[300px] md:h-[280px] bg-cover rounded-lg bg-center"}),e.jsxs("div",{className:"py-4 w-full gap-2 h-[150px] md:h-[180px] text-left flex flex-col",children:[e.jsx("h3",{className:"text-mobile/h4 md:text-desktop/h4 md:font-semibold mb-2",children:d.title}),e.jsx("p",{className:"text-mobile/body/2 md:text-desktop/body/1",children:c(d.description,15)})]})]})};return!o||o.length===0?e.jsxs("div",{className:"px-4 sm:px-6 text-primary-white pb-5",children:[e.jsx("h2",{className:"text-mobile/h3 md:text-desktop/h3 font-bold text-left mb-4",children:a||"No Heading Available"}),e.jsx("p",{className:"text-mobile/body/2 md:text-desktop/body/1 text-left mb-4 md:mb-8",children:c(t,15)}),e.jsx("p",{className:"text-mobile/body/2 md:text-desktop/body/2",children:"No features to display."})]}):e.jsxs("div",{className:"px-4 sm:px-6 text-primary-white pb-5",children:[e.jsx("h2",{className:"text-mobile/h3 md:text-desktop/h3 font-bold text-left mb-4",children:a}),e.jsx("p",{className:"text-mobile/body/2 md:text-desktop/body/1 text-left mb-4 md:mb-8",children:t}),e.jsx(u,{items:o,renderItem:r,slidesPerView:{default:1,768:2.5,1024:4},spaceBetween:16,loop:!1,className:"mySwiper",arrow:"hidden"})]})};export{y as S};
