import{j as t,m as c}from"./index-CUfdQMO-.js";import{C as a}from"./CommonSlider-Dz1PDagf.js";const n=({backgroundImage:o,Testimonials:e})=>{console.log(e);const d=r=>t.jsxs(c.div,{id:"reviews",className:"bg-primary-white rounded-[32px] p-6 shadow-xl md:text-left flex flex-col  hover:shadow-2xl transition-shadow duration-300 h-[250px]",initial:{opacity:0,y:50},whileInView:{opacity:1,y:0},transition:{duration:.5,ease:"easeOut"},viewport:{once:!0,amount:.5},children:[t.jsxs("div",{className:"flex flex-col flex-grow",children:[t.jsx("h3",{className:"text-mobile/h5 md:text-desktop/h5 font-bold text-gray-800 mb-4",children:(r==null?void 0:r.heading)||(r==null?void 0:r.name)}),t.jsx("p",{className:"text-mobile/body/2 md:text-desktop/body/1 text-gray-600 flex-grow",children:r.description})]}),t.jsx("div",{className:"flex items-center justify-between mt-4",children:t.jsx("div",{className:"flex items-center",children:t.jsxs("div",{className:"text-left",children:[t.jsx("p",{className:"text-mobile/body/2 md:text-desktop/body/2 font-semibold text-gray-800",children:r.name}),t.jsx("p",{className:"text-mobile/caption md:text-desktop/caption text-gray-500",children:r.location})]})})})]});return t.jsx("div",{className:"w-full py-4",style:{backgroundImage:o?`url(${o})`:"none",backgroundPosition:"top",backgroundRepeat:"no-repeat",backgroundSize:"cover"},children:t.jsxs("div",{className:"content flex flex-col gap-6 relative overflow-hidden container mx-auto",children:[t.jsx("h2",{className:"text-mobile/h4 md:text-desktop/h2 md:text-[40px] text-gray-900 mb-8 text-center",children:e!=null&&e.clientHeading?e==null?void 0:e.clientHeading:"Testimonials"}),t.jsx(a,{items:e!=null&&e.clients?e==null?void 0:e.clients:e,renderItem:d,spaceBetween:30,loop:!1,className:"relative z-10 testiM mySwiper",slidesPerViewDesktop:3,arrow:"pt-6"})]})})};export{n as T};
