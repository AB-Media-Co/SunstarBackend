import{c as R,j as e,b as v,r as c,a as N,J as y,f as O,t as B,x as A,g as L,K as E,w as z}from"./index-lQ9gQ1UF.js";import{F as G,C as H,A as q,R as U,B as X}from"./BottomRoomSticky-BAzL8Xcm.js";/* empty css                         */import{A as T}from"./ArrowForwardIos-kIJ0AoNX.js";import"./Warning-Cy5oV0Gc.js";const Y=R(e.jsx("path",{d:"M11.67 3.87 9.9 2.1 0 12l9.9 9.9 1.77-1.77L3.54 12z"})),J=({roomData:s,hotelDetail:o})=>{const{guestDetails:n,selectedRooms:f,fetchRoomHotelDetails:j,sethotelData:u}=v();console.log(s);const x=(n==null?void 0:n.rooms)||1,[h,a]=c.useState(!1),r=N(),l=async()=>{(f==null?void 0:f.length)>0?r("/room/details"):(await j(s==null?void 0:s._id,o==null?void 0:o.hotelCode),r("/room/details"),localStorage.setItem("hotelData",JSON.stringify(o)),u(o))};return e.jsxs("div",{className:"content mx-auto bg-white pt-6 md:pt-8   relative ",children:[h&&e.jsxs("div",{className:"absolute top-16 right-4 bg-white border border-yellow-400 p-4 rounded-lg shadow-lg z-50 max-w-xs text-sm text-gray-700 animate-fadeIn",children:[e.jsx("p",{className:"font-semibold text-yellow-600",children:"Booking Limit Reached"}),e.jsxs("p",{className:"mt-1",children:["You cannot select more than ",e.jsx("strong",{children:x})," rooms in a single booking."]}),e.jsxs("div",{className:"flex items-center justify-end mt-4 gap-2",children:[e.jsx("button",{onClick:()=>alert("Book more clicked!"),className:"px-3 py-1.5 text-sm bg-primary-green text-white rounded-full hover:bg-primary-green/90 transition",children:"Book More"}),e.jsx("button",{onClick:()=>a(!1),className:"px-3 py-1.5 text-sm border border-gray-300 rounded-full hover:bg-gray-100 transition",children:"Dismiss"})]})]}),e.jsxs("div",{className:"flex flex-col md:flex-row justify-between md:items-end items-start gap-4",children:[e.jsxs("div",{className:"flex flex-col gap-2",children:[e.jsxs("div",{className:"flex gap-2 items-end",children:[e.jsx("h1",{className:"text-lg md:text-4xl font-bold text-gray-600",children:s==null?void 0:s.RoomName}),e.jsxs("div",{className:"flex flex-wrap gap-2 text-sm font-medium text-gray-500",children:[(s==null?void 0:s.squareFeet)&&e.jsxs("span",{children:[s.squareFeet," sq.ft area"]}),(s==null?void 0:s.maxGuests)&&e.jsxs("span",{children:[s.maxGuests," Guests Max"]})]})]}),e.jsxs("p",{className:"text-xl md:text-3xl flex gap-2 items-end font-bold text-primary-green",children:["₹ ",s==null?void 0:s.discountRate,e.jsx("span",{className:"text-sm font-medium text-gray-500",children:" / night"}),e.jsx("span",{className:"text-sm text-gray-500",children:"Incl. taxes"})]})]}),e.jsx("div",{className:"flex flex-col md:items-end mt-2 md:mt-0",children:(s==null?void 0:s.Availability)===0?e.jsxs("div",{className:"flex gap-4 w-full items-center",children:[e.jsxs("p",{className:"text-primary-green md:w-[280px] w-full font-medium italic",children:[e.jsx(G,{className:" rotate-[20deg] font-extralight"}),"Book directly for the lowest price"]}),e.jsx("div",{className:"flex items-center justify-end gap-4 ",children:e.jsx("button",{className:"bg-gray-500  px-4 py-2 rounded-md text-white font-semibold text-lg",children:"Sold Out"})})]}):e.jsx(e.Fragment,{children:e.jsx("div",{className:"flex items-center justify-end gap-4 ",children:e.jsx("button",{onClick:l,className:"bg-primary-green px-4 py-2 rounded-md text-white font-semibold text-lg",children:"Book Room"})})})})]})]})};function K({businessPlatformFeatures:s,hotelDetail:o}){var w,b;const[n,f]=c.useState(null),[j,u]=c.useState(null),[x,h]=c.useState(!1),[a,r]=c.useState(null),[l,g]=c.useState(0);v();const p=N();v(),c.useEffect(()=>{const i=localStorage.getItem("checkInDate"),t=localStorage.getItem("checkOutDate");i&&t&&(f(i),u(t))},[]),c.useEffect(()=>(x||a!==null?document.body.style.overflow="hidden":document.body.style.overflow="auto",()=>{document.body.style.overflow="auto"}),[x,a]);const d=((w=s==null?void 0:s.RoomImage)==null?void 0:w.slice(0,5))||[],m=(s==null?void 0:s.RoomImage)||[],k=(i,t)=>{r(i),g(t),h(!1)},I=()=>{const i=document.querySelector(".image-slider-container");if(i)i.classList.add("sliding-prev"),setTimeout(()=>{const t=(l-1+m.length)%m.length;r(m[t]),g(t),i.classList.remove("sliding-prev")},150);else{const t=(l-1+m.length)%m.length;r(m[t]),g(t)}},S=()=>{const i=document.querySelector(".image-slider-container");if(i)i.classList.add("sliding-next"),setTimeout(()=>{const t=(l+1)%m.length;r(m[t]),g(t),i.classList.remove("sliding-next")},150);else{const t=(l+1)%m.length;r(m[t]),g(t)}},C=()=>{r(null)};return e.jsxs("div",{className:"lg:p-2 relative",children:[e.jsx("div",{className:"relative",children:e.jsx(H,{features:d,height:"h-[600px] rounded-lg",buttonColor:"#FDC114",iconSize:"h-6 w-6",NavClass:"bottom-[1rem] md:bottom-6",viewAll:!0,setShowImageGallery:h})}),e.jsx("div",{className:"absolute top-8 right-2 md:right-20 z-50",children:e.jsx("button",{onClick:()=>p(-1),className:"bg-black/50 rounded-full p-2 shadow-md transition","aria-label":"Go back",children:e.jsx(y,{className:"text-white"})})}),x&&e.jsx("div",{className:"fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center",children:e.jsx("div",{className:"bg-white w-full max-h-full overflow-hidden animate-slideUp",style:{animation:"slideUp 0.5s ease-out forwards"},children:e.jsxs("div",{className:"content",children:[e.jsxs("div",{className:"p-4 flex justify-between items-center border-b",children:[e.jsx("h3",{className:"text-4xl font-bold text-gray-800",children:"Room Images"}),e.jsx("button",{onClick:()=>h(!1),className:"p-2 rounded-full hover:bg-gray-100 transition-colors",children:e.jsx(y,{className:"text-gray-700"})})]}),e.jsx("div",{className:"p-4 overflow-y-auto max-h-[90vh]",children:e.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",children:(b=s==null?void 0:s.RoomImage)==null?void 0:b.map((i,t)=>e.jsx("div",{className:"aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-md cursor-pointer",onClick:()=>k(i,t),children:e.jsx("img",{src:i,alt:`Room image ${t+1}`,className:"w-full h-full object-cover hover:scale-105 transition-transform duration-300"})},t))})})]})})}),a&&e.jsx("div",{className:"fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center",children:e.jsxs("div",{className:"relative w-full h-full flex flex-col justify-center items-center",children:[e.jsx("button",{onClick:C,className:"absolute top-4 right-4 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all z-20",children:e.jsx(y,{})}),e.jsxs("div",{className:"relative max-w-4xl max-h-[80vh] w-full mx-4 overflow-hidden",children:[e.jsx("div",{className:"image-slider-container relative w-full h-full",children:e.jsx("img",{src:a,alt:"Room preview",className:"w-full h-full object-contain image-fade-in"},l)}),e.jsxs("div",{className:"absolute inset-x-0 top-1/2 transform -translate-y-1/2 flex justify-between px-4",children:[e.jsx("button",{onClick:I,className:"bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all hover:scale-110",children:e.jsx(Y,{})}),e.jsx("button",{onClick:S,className:"bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all hover:scale-110",children:e.jsx(T,{})})]}),e.jsxs("div",{className:"absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-4 py-2 rounded-full",children:[l+1," / ",m.length]})]})]})}),e.jsx("style",{jsx:!0,children:`
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
      `})]})}const Z=()=>{var g;const{data:s}=O(),o=B(),[n,f]=c.useState(null),[j,u]=c.useState(!0),[x,h]=c.useState(null),[a,r]=c.useState(null);if(c.useEffect(()=>{o&&(async()=>{try{const d=await E(o==null?void 0:o.id);f(d)}catch(d){h(d)}finally{u(!1)}})()},[o]),c.useEffect(()=>{n&&(async()=>{try{const d=await z(n==null?void 0:n.HotelCode);r(d==null?void 0:d.hotel)}catch(d){h(d)}finally{u(!1)}})()},[a==null?void 0:a.HotelCode,n]),j)return e.jsx("div",{children:e.jsx(A,{})});if(x)return e.jsxs("div",{children:["Error: ",x.message]});const l=s==null?void 0:s.find(p=>p.page==="rooms");return e.jsxs("div",{children:[e.jsxs(L,{children:[e.jsx("title",{children:(l==null?void 0:l.metaTitle)||"Rooms & Suites - Sunstar Hotels"}),e.jsx("meta",{name:"description",content:(l==null?void 0:l.metaDescription)||""}),e.jsx("meta",{name:"keywords",content:((g=l==null?void 0:l.metaKeywords)==null?void 0:g.join(", "))||""})]}),e.jsx(K,{businessPlatformFeatures:n,hotelDetail:a}),e.jsx(J,{roomData:n,hotelDetail:a}),e.jsx(q,{amenities:n==null?void 0:n.Amenities}),e.jsx("hr",{className:"mb-10 content h-[2px] bg-gray-400"}),e.jsx(U,{rooms:a==null?void 0:a.rooms,title:"Other Room"}),e.jsx("hr",{className:"mt-10 content h-[2px] bg-gray-400"}),e.jsx(X,{})]})};export{Z as default};
