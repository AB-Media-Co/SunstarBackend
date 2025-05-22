import{b as y,r as c,a as N,j as e,J as v,f as R,t as O,x as A,g as B,K as E,w as L}from"./index-Cdi22s2F.js";import{F as G,C as z,A as H,R as q,B as U}from"./BottomRoomSticky-BUL579O8.js";/* empty css                         */import{A as X}from"./ArrowBackIos-CVcp1_qy.js";import{A as T}from"./ArrowForwardIos-_5RaWXs-.js";import"./Warning-DrwyA6xm.js";const Y=({roomData:s,hotelDetail:r})=>{const{guestDetails:a,selectedRooms:g,fetchRoomHotelDetails:p,sethotelData:f}=y();console.log(s);const m=(a==null?void 0:a.rooms)||1,[x,h]=c.useState(!1),n=N(),d=async()=>{(g==null?void 0:g.length)>0?n("/room/details"):(await p(s==null?void 0:s._id,r==null?void 0:r.hotelCode),n("/room/details"),localStorage.setItem("hotelData",JSON.stringify(r)),f(r))};return e.jsxs("div",{className:"content mx-auto bg-white pt-6 md:pt-8   relative ",children:[x&&e.jsxs("div",{className:"absolute top-16 right-4 bg-white border border-yellow-400 p-4 rounded-lg shadow-lg z-50 max-w-xs text-sm text-gray-700 animate-fadeIn",children:[e.jsx("p",{className:"font-semibold text-yellow-600",children:"Booking Limit Reached"}),e.jsxs("p",{className:"mt-1",children:["You cannot select more than ",e.jsx("strong",{children:m})," rooms in a single booking."]}),e.jsxs("div",{className:"flex items-center justify-end mt-4 gap-2",children:[e.jsx("button",{onClick:()=>alert("Book more clicked!"),className:"px-3 py-1.5 text-sm bg-primary-green text-white rounded-full hover:bg-primary-green/90 transition",children:"Book More"}),e.jsx("button",{onClick:()=>h(!1),className:"px-3 py-1.5 text-sm border border-gray-300 rounded-full hover:bg-gray-100 transition",children:"Dismiss"})]})]}),e.jsxs("div",{className:"flex flex-col md:flex-row justify-between md:items-end items-start gap-4",children:[e.jsxs("div",{className:"flex flex-col gap-2",children:[e.jsxs("div",{className:"flex gap-2 items-end",children:[e.jsx("h1",{className:"text-lg md:text-4xl font-bold text-gray-600",children:s==null?void 0:s.RoomName}),e.jsxs("div",{className:"flex flex-wrap gap-2 text-sm font-medium text-gray-500",children:[(s==null?void 0:s.squareFeet)&&e.jsxs("span",{children:[s.squareFeet," sq.ft area"]}),(s==null?void 0:s.maxGuests)&&e.jsxs("span",{children:[s.maxGuests," Guests Max"]})]})]}),e.jsxs("p",{className:"text-xl md:text-3xl flex gap-2 items-end font-bold text-primary-green",children:["₹ ",s==null?void 0:s.discountRate,e.jsx("span",{className:"text-sm font-medium text-gray-500",children:" / night"}),e.jsx("span",{className:"text-sm text-gray-500",children:"Incl. taxes"})]})]}),e.jsx("div",{className:"flex flex-col md:items-end mt-2 md:mt-0",children:(s==null?void 0:s.Availability)===0?e.jsxs("div",{className:"flex gap-4 w-full items-center",children:[e.jsxs("p",{className:"text-primary-green md:w-[280px] w-full font-medium italic",children:[e.jsx(G,{className:" rotate-[20deg] font-extralight"}),"Book directly for the lowest price"]}),e.jsx("div",{className:"flex items-center justify-end gap-4 ",children:e.jsx("button",{className:"bg-gray-500  px-4 py-2 rounded-md text-white font-semibold text-lg",children:"Sold Out"})})]}):e.jsx(e.Fragment,{children:e.jsx("div",{className:"flex items-center justify-end gap-4 ",children:e.jsx("button",{onClick:d,className:"bg-primary-green px-4 py-2 rounded-md text-white font-semibold text-lg",children:"Book Room"})})})})]})]})};function J({businessPlatformFeatures:s,hotelDetail:r}){var w,b;const[a,g]=c.useState(null),[p,f]=c.useState(null),[m,x]=c.useState(!1),[h,n]=c.useState(null),[d,i]=c.useState(0);y();const j=N();y(),c.useEffect(()=>{const o=localStorage.getItem("checkInDate"),l=localStorage.getItem("checkOutDate");o&&l&&(g(o),f(l))},[]),c.useEffect(()=>(m||h!==null?document.body.style.overflow="hidden":document.body.style.overflow="auto",()=>{document.body.style.overflow="auto"}),[m,h]);const u=((w=s==null?void 0:s.RoomImage)==null?void 0:w.slice(0,5))||[],t=(s==null?void 0:s.RoomImage)||[],k=(o,l)=>{n(o),i(l),x(!1)},I=()=>{const o=document.querySelector(".image-slider-container");if(o)o.classList.add("sliding-prev"),setTimeout(()=>{const l=(d-1+t.length)%t.length;n(t[l]),i(l),o.classList.remove("sliding-prev")},150);else{const l=(d-1+t.length)%t.length;n(t[l]),i(l)}},S=()=>{const o=document.querySelector(".image-slider-container");if(o)o.classList.add("sliding-next"),setTimeout(()=>{const l=(d+1)%t.length;n(t[l]),i(l),o.classList.remove("sliding-next")},150);else{const l=(d+1)%t.length;n(t[l]),i(l)}},C=()=>{n(null)};return e.jsxs("div",{className:"lg:p-2 relative",children:[e.jsx("div",{className:"relative",children:e.jsx(z,{features:u,height:"h-[600px] rounded-lg",buttonColor:"#FDC114",iconSize:"h-6 w-6",NavClass:"bottom-[1rem] md:bottom-6",viewAll:!0,setShowImageGallery:x})}),e.jsx("div",{className:"absolute top-8 right-2 md:right-20 z-50",children:e.jsx("button",{onClick:()=>j(-1),className:"bg-black/50 rounded-full p-2 shadow-md transition","aria-label":"Go back",children:e.jsx(v,{className:"text-white"})})}),m&&e.jsx("div",{className:"fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center",children:e.jsx("div",{className:"bg-white w-full max-h-full overflow-hidden animate-slideUp",style:{animation:"slideUp 0.5s ease-out forwards"},children:e.jsxs("div",{className:"content",children:[e.jsxs("div",{className:"p-4 flex justify-between items-center border-b",children:[e.jsx("h3",{className:"text-4xl font-bold text-gray-800",children:"Room Images"}),e.jsx("button",{onClick:()=>x(!1),className:"p-2 rounded-full hover:bg-gray-100 transition-colors",children:e.jsx(v,{className:"text-gray-700"})})]}),e.jsx("div",{className:"p-4 overflow-y-auto max-h-[90vh]",children:e.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",children:(b=s==null?void 0:s.RoomImage)==null?void 0:b.map((o,l)=>e.jsx("div",{className:"aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-md cursor-pointer",onClick:()=>k(o,l),children:e.jsx("img",{src:o,alt:`Room image ${l+1}`,className:"w-full h-full object-cover hover:scale-105 transition-transform duration-300"})},l))})})]})})}),h&&e.jsx("div",{className:"fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center",children:e.jsxs("div",{className:"relative w-full h-full flex flex-col justify-center items-center",children:[e.jsx("button",{onClick:C,className:"absolute top-4 right-4 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all z-20",children:e.jsx(v,{})}),e.jsxs("div",{className:"relative max-w-4xl max-h-[80vh] w-full mx-4 overflow-hidden",children:[e.jsx("div",{className:"image-slider-container relative w-full h-full",children:e.jsx("img",{src:h,alt:"Room preview",className:"w-full h-full object-contain image-fade-in"},d)}),e.jsxs("div",{className:"absolute inset-x-0 top-1/2 transform -translate-y-1/2 flex justify-between px-4",children:[e.jsx("button",{onClick:I,className:"bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all hover:scale-110",children:e.jsx(X,{})}),e.jsx("button",{onClick:S,className:"bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all hover:scale-110",children:e.jsx(T,{})})]}),e.jsxs("div",{className:"absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-4 py-2 rounded-full",children:[d+1," / ",t.length]})]})]})}),e.jsx("style",{jsx:!0,children:`
        @keyframes slideUp {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }
        
        .animate-slideUp {
          animation: slideUp 0.5s ease-out forwards;
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .image-fade-in {
          animation: fadeIn 0.3s ease-out forwards;
        }
        
        @keyframes slideNextOut {
          from {
            opacity: 1;
            transform: translateX(0);
          }
          to {
            opacity: 0;
            transform: translateX(-30px);
          }
        }
        
        @keyframes slidePrevOut {
          from {
            opacity: 1;
            transform: translateX(0);
          }
          to {
            opacity: 0;
            transform: translateX(30px);
          }
        }
        
        .sliding-next img {
          animation: slideNextOut 0.15s ease-out forwards;
        }
        
        .sliding-prev img {
          animation: slidePrevOut 0.15s ease-out forwards;
        }
      `})]})}const Z=()=>{var j;const{data:s}=R(),r=O(),[a,g]=c.useState(null),[p,f]=c.useState(!0),[m,x]=c.useState(null),{setEditAddPricing:h}=y(),[n,d]=c.useState(null);if(c.useEffect(()=>{r&&(async()=>{try{const t=await E(r==null?void 0:r.id);g(t),h(!0)}catch(t){x(t)}finally{f(!1)}})()},[r]),c.useEffect(()=>{a&&(async()=>{try{const t=await L(a==null?void 0:a.HotelCode);d(t==null?void 0:t.hotel)}catch(t){x(t)}finally{f(!1)}})()},[n==null?void 0:n.HotelCode,a]),p)return e.jsx("div",{children:e.jsx(A,{})});if(m)return e.jsxs("div",{children:["Error: ",m.message]});const i=Array.isArray(s)?s.find(u=>u.page==="rooms"):null;return e.jsxs("div",{children:[e.jsxs(B,{children:[e.jsx("title",{children:(i==null?void 0:i.metaTitle)||"Rooms & Suites - Sunstar Hotels"}),e.jsx("meta",{name:"description",content:(i==null?void 0:i.metaDescription)||""}),e.jsx("meta",{name:"keywords",content:((j=i==null?void 0:i.metaKeywords)==null?void 0:j.join(", "))||""})]}),e.jsx(J,{businessPlatformFeatures:a,hotelDetail:n}),e.jsx(Y,{roomData:a,hotelDetail:n}),e.jsx(H,{amenities:a==null?void 0:a.Amenities}),e.jsx("hr",{className:"mb-10 content h-[2px] bg-gray-400"}),e.jsx(q,{rooms:n==null?void 0:n.rooms,title:"Other Room"}),e.jsx("hr",{className:"mt-10 content h-[2px] bg-gray-400"}),e.jsx(U,{})]})};export{Z as default};
