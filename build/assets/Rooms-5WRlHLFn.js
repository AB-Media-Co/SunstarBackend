import{b as y,r as c,a as N,j as e,N as w,f as R,t as O,x as A,g as B,Q as E,w as L}from"./index-DR6mlSVL.js";import{F as G,C as z,A as H,R as q,B as U}from"./BottomRoomSticky-DMXXGNDM.js";/* empty css                         */import{A as X}from"./ArrowBackIos-CzD52vg9.js";import{A as T}from"./ArrowForwardIos-IfBKWtOk.js";import"./Warning-Bwko-j3H.js";const Y=({roomData:t,hotelDetail:r})=>{const{guestDetails:a,selectedRooms:h,fetchRoomHotelDetails:p,sethotelData:f}=y();console.log(t);const m=(a==null?void 0:a.rooms)||1,[x,g]=c.useState(!1),n=N(),d=async()=>{(h==null?void 0:h.length)>0?n("/room/details"):(await p(t==null?void 0:t._id,r==null?void 0:r.hotelCode),n("/room/details"),localStorage.setItem("hotelData",JSON.stringify(r)),f(r))};return e.jsxs("div",{className:"content mx-auto bg-white pt-6 md:pt-8    relative ",children:[x&&e.jsxs("div",{className:"absolute top-16 right-4 bg-white border border-yellow-400 p-4 rounded-lg shadow-lg z-50 max-w-xs text-sm text-gray-700 animate-fadeIn",children:[e.jsx("p",{className:"font-semibold text-yellow-600",children:"Booking Limit Reached"}),e.jsxs("p",{className:"mt-1",children:["You cannot select more than ",e.jsx("strong",{children:m})," rooms in a single booking."]}),e.jsxs("div",{className:"flex items-center justify-end mt-4 gap-2",children:[e.jsx("button",{onClick:()=>alert("Book more clicked!"),className:"px-3 py-1.5 text-sm bg-primary-green text-white rounded-full hover:bg-primary-green/90 transition",children:"Book More"}),e.jsx("button",{onClick:()=>g(!1),className:"px-3 py-1.5 text-sm border border-gray-300 rounded-full hover:bg-gray-100 transition",children:"Dismiss"})]})]}),e.jsxs("div",{className:"flex flex-col md:flex-row justify-between md:items-end items-start gap-4",children:[e.jsxs("div",{className:"flex flex-col gap-2",children:[e.jsxs("div",{className:"flex gap-2 items-end",children:[e.jsx("h1",{className:"text-lg md:text-4xl font-bold text-gray-600",children:t==null?void 0:t.RoomName}),e.jsxs("div",{className:"flex flex-wrap gap-2 text-sm font-medium text-gray-500",children:[(t==null?void 0:t.squareFeet)&&e.jsxs("span",{children:[t.squareFeet," sq.ft area"]}),(t==null?void 0:t.maxGuests)&&e.jsxs("span",{children:[t.maxGuests," Guests Max"]})]})]}),e.jsxs("p",{className:"text-xl md:text-3xl flex gap-2 items-end font-bold text-primary-green",children:["₹ ",t==null?void 0:t.discountRate,e.jsx("span",{className:"text-sm font-medium text-gray-500",children:" / night"}),e.jsx("span",{className:"text-sm text-gray-500",children:"Incl. taxes"})]})]}),e.jsx("div",{className:"flex flex-col md:items-end mt-2 md:mt-0",children:(t==null?void 0:t.Availability)===0?e.jsxs("div",{className:"flex gap-4 w-full items-center",children:[e.jsxs("p",{className:"text-primary-green md:w-[280px] w-full text-sm  font-medium italic",children:[e.jsx(G,{className:" rotate-[20deg] font-extralight"}),"Book directly for the lowest price"]}),e.jsx("div",{className:"flex items-center w-[250px] md:w-auto justify-end gap-4 ",children:e.jsx("button",{className:"bg-gray-500  px-4 py-2 rounded-md text-white font-semibold text-lg",children:"Sold Out"})})]}):e.jsx(e.Fragment,{children:e.jsx("div",{className:"flex items-center justify-end gap-4 ",children:e.jsx("button",{onClick:d,className:"bg-primary-green px-4 py-2 rounded-md text-white font-semibold text-lg",children:"Book Room"})})})})]})]})};function Q({businessPlatformFeatures:t,hotelDetail:r}){var v,b;const[a,h]=c.useState(null),[p,f]=c.useState(null),[m,x]=c.useState(!1),[g,n]=c.useState(null),[d,i]=c.useState(0);y();const j=N();y(),c.useEffect(()=>{const o=localStorage.getItem("checkInDate"),l=localStorage.getItem("checkOutDate");o&&l&&(h(o),f(l))},[]),c.useEffect(()=>(m||g!==null?document.body.style.overflow="hidden":document.body.style.overflow="auto",()=>{document.body.style.overflow="auto"}),[m,g]);const u=((v=t==null?void 0:t.RoomImage)==null?void 0:v.slice(0,5))||[],s=(t==null?void 0:t.RoomImage)||[],k=(o,l)=>{n(o),i(l),x(!1)},I=()=>{const o=document.querySelector(".image-slider-container");if(o)o.classList.add("sliding-prev"),setTimeout(()=>{const l=(d-1+s.length)%s.length;n(s[l]),i(l),o.classList.remove("sliding-prev")},150);else{const l=(d-1+s.length)%s.length;n(s[l]),i(l)}},S=()=>{const o=document.querySelector(".image-slider-container");if(o)o.classList.add("sliding-next"),setTimeout(()=>{const l=(d+1)%s.length;n(s[l]),i(l),o.classList.remove("sliding-next")},150);else{const l=(d+1)%s.length;n(s[l]),i(l)}},C=()=>{n(null)};return e.jsxs("div",{className:"relative",children:[e.jsx(z,{features:u,height:"h-[600px] rounded-lg",buttonColor:"#FDC114",iconSize:"h-6 w-6 ",NavClass:"bottom-[3rem] md:bottom-8",viewAll:!0,setShowImageGallery:x}),e.jsx("div",{className:"absolute top-8 right-2 md:right-20 z-50",children:e.jsx("button",{onClick:()=>j(-1),className:"bg-black/50 rounded-full p-2 shadow-md transition","aria-label":"Go back",children:e.jsx(w,{className:"text-white"})})}),m&&e.jsx("div",{className:"fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center",children:e.jsx("div",{className:"bg-white w-full max-h-full overflow-hidden animate-slideUp",style:{animation:"slideUp 0.5s ease-out forwards"},children:e.jsxs("div",{className:"content",children:[e.jsxs("div",{className:"p-4 flex justify-between items-center border-b",children:[e.jsx("h3",{className:"text-4xl font-bold text-gray-800",children:"Room Images"}),e.jsx("button",{onClick:()=>x(!1),className:"p-2 rounded-full hover:bg-gray-100 transition-colors",children:e.jsx(w,{className:"text-gray-700"})})]}),e.jsx("div",{className:"p-4 overflow-y-auto max-h-[90vh]",children:e.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",children:(b=t==null?void 0:t.RoomImage)==null?void 0:b.map((o,l)=>e.jsx("div",{className:"aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-md cursor-pointer",onClick:()=>k(o,l),children:e.jsx("img",{src:o,alt:`Room image ${l+1}`,className:"w-full h-full object-cover hover:scale-105 transition-transform duration-300"})},l))})})]})})}),g&&e.jsx("div",{className:"fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center",children:e.jsxs("div",{className:"relative w-full h-full flex flex-col justify-center items-center",children:[e.jsx("button",{onClick:C,className:"absolute top-4 right-4 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all z-20",children:e.jsx(w,{})}),e.jsxs("div",{className:"relative max-w-4xl max-h-[80vh] w-full mx-4 overflow-hidden",children:[e.jsx("div",{className:"image-slider-container relative w-full h-full",children:e.jsx("img",{src:g,alt:"Room preview",className:"w-full h-full object-contain image-fade-in"},d)}),e.jsxs("div",{className:"absolute inset-x-0 top-1/2 transform -translate-y-1/2 flex justify-between px-4",children:[e.jsx("button",{onClick:I,className:"bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all hover:scale-110",children:e.jsx(X,{})}),e.jsx("button",{onClick:S,className:"bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all hover:scale-110",children:e.jsx(T,{})})]}),e.jsxs("div",{className:"absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-4 py-2 rounded-full",children:[d+1," / ",s.length]})]})]})}),e.jsx("style",{jsx:!0,children:`
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
      `})]})}const Z=()=>{var j;const{data:t}=R(),r=O(),[a,h]=c.useState(null),[p,f]=c.useState(!0),[m,x]=c.useState(null),{setEditAddPricing:g}=y(),[n,d]=c.useState(null);if(c.useEffect(()=>{r&&(async()=>{try{const s=await E(r==null?void 0:r.id);h(s),g(!0)}catch(s){x(s)}finally{f(!1)}})()},[r]),c.useEffect(()=>{a&&(async()=>{try{const s=await L(a==null?void 0:a.HotelCode);d(s==null?void 0:s.hotel)}catch(s){x(s)}finally{f(!1)}})()},[n==null?void 0:n.HotelCode,a]),p)return e.jsx("div",{children:e.jsx(A,{})});if(m)return e.jsxs("div",{children:["Error: ",m.message]});const i=Array.isArray(t)?t.find(u=>u.page==="rooms"):null;return e.jsxs("div",{className:"bg-gray-100",children:[e.jsxs(B,{children:[e.jsx("title",{children:(i==null?void 0:i.metaTitle)||"Rooms & Suites - Sunstar Hotels"}),e.jsx("meta",{name:"description",content:(i==null?void 0:i.metaDescription)||""}),e.jsx("meta",{name:"keywords",content:((j=i==null?void 0:i.metaKeywords)==null?void 0:j.join(", "))||""})]}),e.jsx(Q,{businessPlatformFeatures:a,hotelDetail:n}),e.jsxs("div",{className:"flex flex-col gap-4  -mt-6 rounded-t-lg relative bg-white max-w-7xl  mx-auto",children:[e.jsx(Y,{roomData:a,hotelDetail:n}),e.jsx(H,{amenities:a==null?void 0:a.Amenities}),e.jsx("hr",{className:"mb-10 content h-[2px] bg-gray-400"}),e.jsx(q,{rooms:n==null?void 0:n.rooms,title:"Other Room"}),e.jsx("hr",{className:"mt-10 content h-[2px] bg-gray-400"})]}),e.jsx(U,{})]})};export{Z as default};
