import{r,u as j,t as g,j as e,g as b}from"./index-as_46C3q.js";import{G as v,C as N,d as w}from"./Calendar-DvXBw2EA.js";import{I as y}from"./Icons-BgkC4e0G.js";import{H as C,R as n}from"./RoatinfImg-D7dGeWdO.js";import{S as k,a as I}from"./Section5-CPcbX3Lo.js";import{I as S}from"./ImageGallery-z6k-T_k3.js";import"./CommonSlider-DOHRRFfF.js";const V=()=>{var m,x;const[t,i]=r.useState(null),[a,o]=r.useState(null),[h,d]=r.useState(!1),{state:c}=j(),f=c==null?void 0:c.id,{data:s}=g(f);r.useEffect(()=>{const l=localStorage.getItem("checkInDate"),p=localStorage.getItem("checkOutDate");l&&p&&(i(l),o(p))},[]);const u=()=>{if(t&&a){const l=w(new Date(a),new Date(t));return e.jsxs("div",{children:[l," Nights"]})}return 0};return e.jsx("div",{className:"",children:s?e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"relative overflow-hidden bg-cover bg-center h-96",style:{backgroundImage:`url(${s==null?void 0:s.image}) `},children:[e.jsx("div",{className:"absolute inset-0 bg-primary-green z-0 bg-opacity-50"}),e.jsx("div",{className:"absolute inset-0 flex flex-col z-20 justify-end md:pb-20 content text-primary-white",children:e.jsx("h1",{className:"text-6xl font-bold",children:s==null?void 0:s.name})})]}),e.jsx("div",{className:`bg-primary-white py-8 px-4 lg:left-[8%] transition-all duration-500 ease-in-out 
        content absolute top-[46%] md:top-[45%]
        md:px-8 lg:px-12 rounded-md shadow-lg lg:mx-auto  
        z-10 flex flex-col items-center gap-6 mx-2`,children:e.jsxs("div",{className:"flex justify-center flex-col md:flex-row items-center w-full space-y-4 md:space-y-0 space-x-0 md:space-x-4",children:[e.jsxs("div",{onClick:()=>d(!0),className:"flex flex-wrap w-full justify-center items-center border rounded-full px-6 py-3 hover:shadow-lg ease-in-out transition-all cursor-pointer space-x-2 shadow-sm",children:[e.jsx(y,{name:"calendar",className:"h-6 w-6 text-[#006167]"}),e.jsxs("span",{className:"text-[#006167] font-semibold text-base sm:text-lg md:text-[24px]",children:[t||"Check In"," ",e.jsx("span",{className:"text-yellow-500",children:"→"})," ",a||"Check Out"]}),t&&a&&e.jsxs("span",{className:"text-[#006167] text-xs sm:text-sm flex",children:["(",u(),")"]})]}),e.jsxs("div",{className:"flex items-center justify-between gap-4 w-full",children:[e.jsx(v,{classBg:"bg-transparant"}),e.jsxs("a",{href:"#hotels",className:"bg-[#006167] flex gap-2 items-center cursor-pointer text-primary-white text-sm sm:text-base lg:text-lg sm:w-auto rounded-full shadow-md px-6 py-3",children:[e.jsx("img",{src:"/images/Logo/ViewHotels.svg",alt:"",className:"h-8 w-8"}),e.jsx("span",{children:"View Hotels"})]})]})]})}),h&&e.jsx("div",{className:"fixed inset-0 flex justify-center items-center z-50",children:e.jsx(N,{setCheckInDate:i,setCheckOutDate:o,setOpenCalender:d})}),e.jsxs("div",{className:"mt-24",id:"hotels",children:[e.jsxs("section",{className:"content mx-auto",children:[e.jsx("h2",{className:"text-3xl font-bold mb-4",children:"Hotels in Ahmedabad"}),e.jsx(C,{data:s})]}),e.jsxs("div",{"data-aos":"fade-up",className:"relative content flex flex-col items-center lg:items-start my-8 lg:my-20 w-full",children:[e.jsx(n,{position:"md:left-0 top-[-8rem] md:top-0 left-[-6rem] z-0 lg:w-[18rem]"}),e.jsxs("div",{className:"relative text-black px-4",children:[e.jsx("h1",{className:"text-mobile/h2 lg:text-desktop/h2 font-bold text-reveal-animation",children:(m=s==null?void 0:s.aboutus)==null?void 0:m.heading}),e.jsx("p",{className:"text-mobile/body/2 lg:text-desktop/body/large mt-4 animation-on-scroll",children:(x=s==null?void 0:s.aboutus)==null?void 0:x.paragraph})]})]}),e.jsxs("div",{className:"relative bg-[#78C9C8] px-4 overflow-hidden",children:[e.jsx("div",{className:"md:block hidden",children:e.jsx(n,{position:"right-0",src:"/images/HomepageImages/section3pattern.png"})}),e.jsx("div",{className:"content pt-5 md:pt-[50px] z-10 relative",children:e.jsx(k,{})})]}),e.jsxs("div",{className:"relative flex flex-col justify-between content items-center mt-10 py-10 z-0",children:[e.jsx("div",{className:"absolute top-0 left-0 z-0 w-full h-full",children:e.jsx(n,{position:"md:left-0 top-[-60px] md:top-0 left-[-60px]"})}),e.jsx(S,{})]}),e.jsx(I,{})]})]}):e.jsx(b,{})})};export{V as default};
