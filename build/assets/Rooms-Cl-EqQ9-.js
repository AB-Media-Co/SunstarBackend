import{o as p,r as c,j as e,a as N,k as w,l as k,p as v,n as C}from"./index-UuEEqnFC.js";import{C as R,A as S,R as I,F as A,B as O}from"./BottomRoomSticky-D3OYf5S2.js";import{I as g}from"./Icons-SMd1dA6z.js";import{A as B,C as E,d as H}from"./Calendar-DZhwFGk0.js";import{H as L}from"./Helmet-Da1tJTlQ.js";import"./Remove-CXkUTEq2.js";import"./index-CDEJFJzP.js";const q=({roomData:s})=>{const{guestDetails:t}=p(),l=(t==null?void 0:t.rooms)||1,[r,a]=c.useState(!1);return e.jsxs("div",{className:"content mx-auto bg-primary-white p-6 relative",children:[r&&e.jsxs("div",{className:"absolute top-20 right-4 bg-white border border-gray-300 p-4 rounded-md shadow-md z-50 max-w-xs text-sm text-gray-700",children:[e.jsxs("p",{className:"mt-2",children:["You cannot select more than ",l," rooms in a single booking."]}),e.jsxs("div",{className:"flex items-center justify-end mt-4 gap-2",children:[e.jsx("button",{onClick:()=>{alert("Book more clicked!")},className:"px-3 py-1 bg-primary-green text-white rounded-full hover:bg-primary-green/90",children:"Book More"}),e.jsx("button",{onClick:()=>a(!1),className:"px-3 py-1 border border-gray-300 rounded-full hover:bg-gray-100",children:"Dismiss"})]})]}),e.jsx("div",{className:"flex flex-col md:flex-row justify-between items-start gap-6",children:e.jsxs("div",{className:"flex flex-col gap-4 text-[#058FA2]",children:[e.jsx("h1",{className:"text-2xl md:text-4xl font-bold",children:s==null?void 0:s.RoomName}),e.jsx("p",{className:"text-base md:text-lg",children:"Book Direct for Lowest Prices!"}),e.jsxs("div",{className:"flex items-center gap-4",children:[(s==null?void 0:s.defaultRate)&&e.jsxs("span",{className:"text-sm md:text-base text-red-500 font-bold line-through",children:["₹ ",s==null?void 0:s.defaultRate]}),e.jsxs("p",{className:"text-xl md:text-2xl font-bold",children:["₹ ",s==null?void 0:s.discountRate," ",e.jsx("span",{className:"text-sm md:text-base text-gray-500 font-normal",children:"/ night Incl. taxes"})]})]})]})}),e.jsx("hr",{className:"my-6 border-gray-200"}),e.jsx("div",{className:"flex flex-wrap justify-center md:justify-between gap-6",children:[{id:"rooms",iconName:"roundedbed",label:"Rooms",link:"#rooms"},{id:"amenities",iconName:"lamp",label:"Amenities",link:"#amenities"},{id:"reviews",iconName:"message",label:"Reviews",link:"#reviews"},{id:"location",iconName:"location",label:"Location",link:"#location"},{id:"faqs",iconName:"faqs",label:"FAQs",link:"#faqs"}].map(o=>e.jsxs("button",{className:"flex flex-col sm:flex-row items-center gap-2 px-4 py-2 rounded-lg transition duration-200 focus:outline-none",children:[e.jsx(g,{name:o.iconName,className:"h-6 w-6 md:h-8 md:w-8"}),e.jsx("span",{className:"font-semibold text-sm md:text-base",children:o.label})]},o.id))})]})};function z({businessPlatformFeatures:s,hotelDetail:t}){const[l,r]=c.useState(null),[a,o]=c.useState(null),[d,n]=c.useState(!1),[h,x]=c.useState(!1),i=N(),{fetchRoomHotelDetails:u,sethotelData:j}=p();c.useEffect(()=>{const m=localStorage.getItem("checkInDate"),f=localStorage.getItem("checkOutDate");m&&f&&(r(m),o(f))},[]);const y=async()=>{if(!l||!a){x(!0);return}else x(!1),console.log(t),await u(s==null?void 0:s._id,t==null?void 0:t.hotelCode),i("/room/details"),localStorage.setItem("hotelData",JSON.stringify(t)),j(t)},b=()=>{if(l&&a){const m=H(new Date(a),new Date(l));return e.jsxs("div",{children:[m," Nights"]})}return 0};return e.jsxs("div",{className:"lg:p-2",children:[e.jsx(R,{features:s==null?void 0:s.RoomImage,height:"h-[600px] rounded-lg",buttonColor:"#FDC114",iconSize:"h-6 w-6",NavClass:"bottom-[16rem] md:bottom-[10rem]"}),e.jsxs("div",{className:`bg-primary-white bg-opacity-50 backdrop-blur-sm py-8 px-4 lg:left-[10%] transition-all duration-500 ease-in-out 
          content absolute top-[64%] md:top-[55%]
          md:px-8 lg:px-12 rounded-md shadow-lg lg:mx-auto  
          z-10 flex flex-col items-center gap-6 mx-2
        `,children:[e.jsxs("div",{className:"flex justify-center flex-col md:flex-row items-center w-full space-y-4 md:space-y-0 space-x-0 md:space-x-4",children:[e.jsxs("div",{onClick:()=>n(!0),className:"flex flex-row cursor-pointer items-center justify-evenly border max-w-full w-full   px-4 py-3 md:px-8 md:py-4 rounded-full gap-3 shadow-md",children:[e.jsx(g,{name:"calendar",className:"w-5 h-5 md:w-6 md:h-6 text-primary-green"}),e.jsx("div",{className:"flex flex-col text-gray-700",children:e.jsxs("span",{className:"font-semibold text-[12px]  md:text-base",children:[l||"Check In"," "]})}),e.jsx(B,{className:"text-yellow-500"}),e.jsx("div",{className:"flex flex-col  text-gray-700",children:e.jsx("span",{className:"font-semibold text-[12px] md:text-base",children:a||"Check Out"})}),l&&a&&e.jsx("span",{className:"flex items-center justify-center text-[8px] md:text-base text-black rounded-full border border-gray-300 px-3 md:py-1",children:b()})]}),e.jsx("div",{className:"flex items-center justify-end gap-4 w-full",children:e.jsx("button",{onClick:y,className:"bg-[#006167] w-full md:w-auto text-primary-white text-sm sm:text-base lg:text-lg sm:w-auto rounded-full shadow-md px-6 py-3",children:"Book Room"})})]}),h&&e.jsx("p",{className:"text-red-500 text-sm",children:"Please select Check-In and Check-Out dates."})]}),d&&e.jsx("div",{className:"fixed inset-0 flex justify-center items-center z-50",children:e.jsx(E,{setCheckInDate:r,setCheckOutDate:o,setOpenCalender:n})})]})}const Q=({roomData:s})=>{var t,l;return e.jsx("div",{className:"w-full bg-primary-white py-4 md:py-12 px-4 md:px-8 lg:px-16",children:e.jsxs("div",{className:"content gap-5 flex md:items-center flex-col lg:flex-row justify-between",children:[e.jsxs("div",{className:"lg:w-1/2 md:text-center lg:text-left flex flex-col gap-4",children:[e.jsx("h1",{className:"text-mobile/h2 md:text-desktop/h2 text-reveal-animation font-bold",children:"Description"}),e.jsx("p",{className:"text-mobile/body/2 md:text-desktop/body/1 animation-on-scroll leading-relaxed",children:(t=s==null?void 0:s.AboutRoom)==null?void 0:t.description})]}),e.jsx("img",{src:(l=s==null?void 0:s.AboutRoom)==null?void 0:l.img,alt:"Corporate Booking Banner",className:"w-[500px] h-[250px] rounded-xl animation-on-scroll bg-cover"})]})})},T=()=>{const s=w(),[t,l]=c.useState(null),[r,a]=c.useState(!0),[o,d]=c.useState(null),[n,h]=c.useState(null);return c.useEffect(()=>{s&&(async()=>{try{const i=await v(s==null?void 0:s.id);l(i)}catch(i){d(i)}finally{a(!1)}})()},[s]),c.useEffect(()=>{t&&(async()=>{try{const i=await C(t==null?void 0:t.HotelCode);h(i==null?void 0:i.hotel)}catch(i){d(i)}finally{a(!1)}})()},[n==null?void 0:n.HotelCode,t]),r?e.jsx("div",{children:e.jsx(k,{})}):o?e.jsxs("div",{children:["Error: ",o.message]}):e.jsxs("div",{children:[e.jsxs(L,{children:[e.jsx("title",{children:"Rooms"}),e.jsx("meta",{name:"",content:""}),e.jsx("meta",{name:"",content:""})]}),e.jsx(z,{businessPlatformFeatures:t,hotelDetail:n}),e.jsx(q,{roomData:t}),e.jsx("hr",{className:"content h-[2px] bg-gray-400"}),e.jsx(Q,{roomData:t}),e.jsx(S,{amenities:t==null?void 0:t.Amenities}),e.jsx("hr",{className:"mb-10 content h-[2px] bg-gray-400"}),e.jsx(I,{rooms:n==null?void 0:n.rooms,title:"Other Room"}),e.jsx("hr",{className:"mt-10 content h-[2px] bg-gray-400"}),e.jsx(A,{faqs:n==null?void 0:n.faqs}),e.jsx(O,{})]})};export{T as default};
