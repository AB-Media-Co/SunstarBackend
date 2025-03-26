import{b as j,r as c,j as e,a as b,g as N,i as w,n as k,p as v,l as C}from"./index-CCfNtSFT.js";import{C as S,A as R,R as I,F as O,B as A}from"./BottomRoomSticky-ByfZ07kB.js";/* empty css                         */import{A as B,C as E}from"./Calendar-J-1-vXYs.js";import{I as H}from"./Icons-AO5tWQc7.js";import{d as L}from"./format-C4BekRQj.js";import{H as z}from"./Helmet-BmhR2RtK.js";import"./index-fPj_7P1M.js";import"./Remove-CDJ0AFXw.js";const q=({roomData:s})=>{const{guestDetails:l}=j(),t=(l==null?void 0:l.rooms)||1,[a,o]=c.useState(!1);return e.jsxs("div",{className:"content mx-auto bg-primary-white p-6 relative",children:[a&&e.jsxs("div",{className:"absolute top-20 right-4 bg-white border border-gray-300 p-4 rounded-md shadow-md z-50 max-w-xs text-sm text-gray-700",children:[e.jsxs("p",{className:"mt-2",children:["You cannot select more than ",t," rooms in a single booking."]}),e.jsxs("div",{className:"flex items-center justify-end mt-4 gap-2",children:[e.jsx("button",{onClick:()=>{alert("Book more clicked!")},className:"px-3 py-1 bg-primary-green text-white rounded-full hover:bg-primary-green/90",children:"Book More"}),e.jsx("button",{onClick:()=>o(!1),className:"px-3 py-1 border border-gray-300 rounded-full hover:bg-gray-100",children:"Dismiss"})]})]}),e.jsx("div",{className:"flex flex-col md:flex-row justify-between items-start gap-6",children:e.jsxs("div",{className:"flex flex-col gap-4 text-[#058FA2]",children:[e.jsx("h1",{className:"text-2xl md:text-4xl font-bold",children:s==null?void 0:s.RoomName}),e.jsx("p",{className:"text-base md:text-lg",children:"Book Direct for Lowest Prices!"}),e.jsxs("div",{className:"flex items-center gap-4",children:[(s==null?void 0:s.defaultRate)&&e.jsxs("span",{className:"text-sm md:text-base text-red-500 font-bold line-through",children:["₹ ",s==null?void 0:s.defaultRate]}),e.jsxs("p",{className:"text-xl md:text-2xl font-bold",children:["₹ ",s==null?void 0:s.discountRate," ",e.jsx("span",{className:"text-sm md:text-base text-gray-500 font-normal",children:"/ night Incl. taxes"})]})]})]})})]})};function Q({businessPlatformFeatures:s,hotelDetail:l}){const[t,a]=c.useState(null),[o,d]=c.useState(null),[h,x]=c.useState(!1),[n,p]=c.useState(!1),r=b(),{fetchRoomHotelDetails:f,sethotelData:m}=j();c.useEffect(()=>{const g=localStorage.getItem("checkInDate"),u=localStorage.getItem("checkOutDate");g&&u&&(a(g),d(u))},[]);const i=async()=>{if(!t||!o){p(!0);return}else p(!1),console.log(l),await f(s==null?void 0:s._id,l==null?void 0:l.hotelCode),r("/room/details"),localStorage.setItem("hotelData",JSON.stringify(l)),m(l)},y=()=>{if(t&&o){const g=L(new Date(o),new Date(t));return e.jsxs("div",{children:[g," Nights"]})}return 0};return e.jsxs("div",{className:"lg:p-2",children:[e.jsx(S,{features:s==null?void 0:s.RoomImage,height:"h-[600px] rounded-lg",buttonColor:"#FDC114",iconSize:"h-6 w-6",NavClass:"bottom-[16rem] md:bottom-[10rem]"}),e.jsxs("div",{className:`bg-primary-white bg-opacity-50 backdrop-blur-sm py-8 px-4 lg:left-[10%] transition-all duration-500 ease-in-out 
          content absolute top-[64%] md:top-[55%]
          md:px-8 lg:px-12 rounded-md shadow-lg lg:mx-auto  
          z-10 flex flex-col items-center gap-6 mx-2
        `,children:[e.jsxs("div",{className:"flex justify-center flex-col md:flex-row items-center w-full space-y-4 md:space-y-0 space-x-0 md:space-x-4",children:[e.jsxs("div",{onClick:()=>x(!0),className:"flex flex-row cursor-pointer items-center justify-evenly border max-w-full w-full   px-4 py-3 md:px-8 md:py-4 rounded-full gap-3 shadow-md",children:[e.jsx(H,{name:"calendar",className:"w-5 h-5 md:w-6 md:h-6 text-primary-green"}),e.jsx("div",{className:"flex flex-col text-gray-700",children:e.jsxs("span",{className:"font-semibold text-[12px]  md:text-base",children:[t||"Check In"," "]})}),e.jsx(B,{className:"text-yellow-500"}),e.jsx("div",{className:"flex flex-col  text-gray-700",children:e.jsx("span",{className:"font-semibold text-[12px] md:text-base",children:o||"Check Out"})}),t&&o&&e.jsx("span",{className:"flex items-center justify-center text-[8px] md:text-base text-black rounded-full border border-gray-300 px-3 md:py-1",children:y()})]}),e.jsx("div",{className:"flex items-center justify-end gap-4 w-full",children:e.jsx("button",{onClick:i,className:"bg-[#006167] w-full md:w-auto text-primary-white text-sm sm:text-base lg:text-lg sm:w-auto rounded-full shadow-md px-6 py-3",children:"Book Room"})})]}),n&&e.jsx("p",{className:"text-red-500 text-sm",children:"Please select Check-In and Check-Out dates."})]}),h&&e.jsx("div",{className:"fixed inset-0 flex justify-center items-center z-50",children:e.jsx(E,{setCheckInDate:a,setCheckOutDate:d,setOpenCalender:x})})]})}const G=({roomData:s})=>{var l,t;return e.jsx("div",{className:"w-full bg-primary-white py-4 md:py-12 px-4 md:px-8 lg:px-16",children:e.jsxs("div",{className:"content gap-5 flex md:items-center flex-col lg:flex-row justify-between",children:[e.jsxs("div",{className:"lg:w-1/2 md:text-center lg:text-left flex flex-col gap-4",children:[e.jsx("h1",{className:"text-mobile/h2 md:text-desktop/h2 text-reveal-animation font-bold",children:"Description"}),e.jsx("p",{className:"text-mobile/body/2 md:text-desktop/body/1 animation-on-scroll leading-relaxed",children:(l=s==null?void 0:s.AboutRoom)==null?void 0:l.description})]}),e.jsx("img",{src:(t=s==null?void 0:s.AboutRoom)==null?void 0:t.img,alt:"Corporate Booking Banner",className:"w-[500px] h-[250px] rounded-xl animation-on-scroll bg-cover"})]})})},Z=()=>{var f;const{data:s}=N(),l=w(),[t,a]=c.useState(null),[o,d]=c.useState(!0),[h,x]=c.useState(null),[n,p]=c.useState(null);if(c.useEffect(()=>{l&&(async()=>{try{const i=await v(l==null?void 0:l.id);a(i)}catch(i){x(i)}finally{d(!1)}})()},[l]),c.useEffect(()=>{t&&(async()=>{try{const i=await C(t==null?void 0:t.HotelCode);p(i==null?void 0:i.hotel)}catch(i){x(i)}finally{d(!1)}})()},[n==null?void 0:n.HotelCode,t]),o)return e.jsx("div",{children:e.jsx(k,{})});if(h)return e.jsxs("div",{children:["Error: ",h.message]});const r=s==null?void 0:s.find(m=>m.page==="rooms");return e.jsxs("div",{children:[e.jsxs(z,{children:[e.jsx("title",{children:(r==null?void 0:r.metaTitle)||"Rooms & Suites - Sunstar Hotels"}),e.jsx("meta",{name:"description",content:(r==null?void 0:r.metaDescription)||""}),e.jsx("meta",{name:"keywords",content:((f=r==null?void 0:r.metaKeywords)==null?void 0:f.join(", "))||""})]}),e.jsx(Q,{businessPlatformFeatures:t,hotelDetail:n}),e.jsx(q,{roomData:t}),e.jsx("hr",{className:"content h-[2px] bg-gray-400"}),e.jsx(G,{roomData:t}),e.jsx(R,{amenities:t==null?void 0:t.Amenities}),e.jsx("hr",{className:"mb-10 content h-[2px] bg-gray-400"}),e.jsx(I,{rooms:n==null?void 0:n.rooms,title:"Other Room"}),e.jsx("hr",{className:"mt-10 content h-[2px] bg-gray-400"}),e.jsx(O,{faqs:n==null?void 0:n.faqs}),e.jsx(A,{})]})};export{Z as default};
