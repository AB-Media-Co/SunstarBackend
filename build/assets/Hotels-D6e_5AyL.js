import{b as le,r as i,j as e,A as ce,m as D,l as Ae,n as de,o as me}from"./index-DOWuuZR1.js";import{C as xe,R as pe,A as fe,F as ge,B as ue}from"./BottomRoomSticky-C2TNEGsU.js";import{I as R}from"./Icons-nn-YnwZX.js";import{C as he,d as Ne}from"./Calendar-C2IRKv2h.js";import{T as be}from"./TestimonialSection-UgotlTVD.js";import{B as je}from"./BannerSection-CSgIHvgK.js";import{I as ye}from"./ImageGallery-DZQ8ru1L.js";import{C as _}from"./CloseOutlined-BgMVx61X.js";import"./Remove-4B6O5Lsb.js";import"./CommonSlider-DZv_3LWJ.js";/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const we=le("ExternalLink",[["path",{d:"M15 3h6v6",key:"1q9fwt"}],["path",{d:"M10 14 21 3",key:"gplh6r"}],["path",{d:"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6",key:"a6xqqp"}]]);function ve({businessPlatformFeatures:t}){const[n,k]=i.useState(null),[r,w]=i.useState(null),[A,b]=i.useState(!1),[S,g]=i.useState(null),[x,I]=i.useState(!1),[M,y]=i.useState(!1),[d,J]=i.useState(0);i.useEffect(()=>{const m=localStorage.getItem("checkInDate"),c=localStorage.getItem("checkOutDate");m&&c&&(k(m),w(c))},[]);const P=()=>{!n||!r?b(!0):window.location.href="#rooms"},U=[{iconName:"roundedbed",label:"Rooms",link:"#rooms"},{iconName:"lamp",label:"Amenities",link:"#amenities"},{iconName:"message",label:"Reviews",link:"#reviews"},{iconName:"location",label:"Location",link:"#location"},{iconName:"faqs",label:"FAQs",link:"#faqs"}];i.useEffect(()=>(A?document.body.style.overflow="hidden":document.body.style.overflow="auto",()=>{document.body.style.overflow="auto"}),[A]),i.useEffect(()=>{const m=()=>{const c=window.scrollY;I(c>600),x&&(d>c?y(!1):y(!0)),J(c)};return window.addEventListener("scroll",m),()=>{window.removeEventListener("scroll",m)}},[d,x]);const B=()=>n&&r?e.jsxs("div",{children:[Ne(new Date(r),new Date(n))," Nights"]}):0;return e.jsxs("div",{children:[e.jsx(xe,{features:t,height:"h-[600px]",buttonColor:"#FDC114",iconSize:"h-6 w-6",NavClass:"md:left-1/2"}),e.jsx("div",{className:`bg-primary-white py-8 px-4 transition-all duration-500 ease-in-out 
          ${x?"fixed md:left-[8%] top-0 z-50 translate-y-2":"relative translate-y-[-10px]"}
          sm:px-8 lg:px-12 content rounded-md shadow-lg mx-auto -mt-6 
          z-10 flex flex-col items-center gap-6 border border-gray-200
           ${M?"wipe-animation-hidden":"wipe-animation"}
        ${M?"hidden":""}
         `,children:e.jsxs("div",{className:"w-full flex flex-col items-center",children:[e.jsx("div",{className:"flex gap-2 justify-center md:px-4 md:space-x-6 lg:justify-between items-center w-full md:space-y-0 space-x-0",children:e.jsxs("div",{className:"flex gap-8 justify-between w-full md:flex-row flex-col",children:[e.jsx("div",{className:"flex gap-4",children:e.jsxs("div",{onClick:()=>b(!0),className:"flex px-[10px] py-[4px] items-center border  border-primary-dark-green text-primary-dark-green rounded-full hover:shadow-lg ease-in-out transition-all cursor-pointer space-x-2 shadow-sm",children:[e.jsx(R,{name:"calendar",className:"h-6 w-6 text-primary-dark-green"}),e.jsxs("span",{className:"text-mobile/body/2 md:text-desktop/body/1 text-primary-dark-green font-semibold",children:[n||"Check In"," ",e.jsx("span",{className:"text-yellow-500",children:"→"})," ",r||"Check Out"]}),n&&r&&e.jsxs("span",{className:"text-gray-400 text-xs sm:text-sm flex",children:["(",B(),")"]})]})}),e.jsx("button",{onClick:P,className:"bg-primary-green text-primary-white lg:w-[180px] text-mobile/button md:text-desktop/h4 rounded-full py-2 md:py-0 text-xl shadow-md px-6 md:px-6 md:py-3",children:"Select"})]})}),e.jsx("div",{className:`flex flex-wrap px-4 justify-between items-center mt-6 gap-2 w-full  ${x?"hidden":""}`,children:U.map((m,c)=>e.jsxs("a",{href:m.link,onClick:()=>g(c),className:`flex flex-col sm:flex-row gap-2 items-center cursor-pointer ${S===c?"text-[#FDC114]":"text-primary-green"} `,children:[e.jsx(R,{name:m.iconName,className:`h-6 w-6 md:h-8 md:w-8 ${S===c?"text-[#FDC114]":"text-primary-green"} `}),e.jsx("span",{className:`text-mobile/body/2 md:text-desktop/body/1 font-semibold ${S===c?"text-[#FDC114]":"text-gray-500"} `,children:m.label})]},c))})]})}),A&&e.jsx("div",{className:"fixed inset-0 flex justify-center items-center z-50",children:e.jsx(he,{setCheckInDate:k,setCheckOutDate:w,setOpenCalender:b})})]})}function ke({hotelData:t}){return e.jsxs("div",{className:" bg-white  content",children:[(t==null?void 0:t.image)&&e.jsxs("div",{className:"relative",children:[e.jsx("img",{src:t.image,alt:`${t==null?void 0:t.name} image`,className:"w-full h-48 object-cover"}),(t==null?void 0:t.price)&&(t==null?void 0:t.discountedPrice)&&e.jsxs("div",{className:"absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold",children:[Math.round((t.price-t.discountedPrice)/t.price*100),"% OFF"]})]}),e.jsxs("div",{className:"p-6",children:[e.jsxs("div",{className:"flex flex-col sm:flex-row justify-between items-start md:items-center ",children:[e.jsxs("div",{className:"flex flex-col sm:flex-row items-start md:items-center sm:space-x-5",children:[e.jsxs("div",{children:[e.jsx("h2",{className:"  text-3xl md:text-3xl font-bold text-gray-800",children:t==null?void 0:t.name}),e.jsx("div",{className:"text-sm text-teal-500",children:e.jsx("a",{href:"#",className:"hover:underline",children:"Book Direct for Lowest Prices!"})})]}),e.jsxs("div",{className:"mt-3 sm:mt-0 flex flex-col items-center",children:[e.jsxs("div",{className:"flex gap-4 items-center",children:[(t==null?void 0:t.price)&&e.jsxs("span",{className:"text-sm md:text-base text-red-500 font-bold line-through",children:["₹ ",t==null?void 0:t.price]}),e.jsxs("span",{className:"text-teal-500 text-2xl font-bold",children:["₹ ",t==null?void 0:t.discountedPrice," ",e.jsx("span",{className:"font-normal text-base text-gray-600",children:"/ night"})]})]}),e.jsx("p",{className:"text-xs text-gray-500",children:"Incl. taxes"})]})]}),e.jsxs("div",{className:"mt-4 sm:mt-0 text-[14px]  bg-teal-100 text-[#058FA2] font-medium rounded-full py-2 px-4 flex items-center shadow-sm",children:[e.jsxs("span",{children:["Check-In"," ",e.jsx("span",{className:"font-bold text-teal-800",children:t==null?void 0:t.checkIn})]}),e.jsx("span",{className:"mx-2",children:"|"}),e.jsxs("span",{children:["Check-Out"," ",e.jsx("span",{className:"font-bold text-teal-800",children:t==null?void 0:t.checkOut})]})]})]}),(t==null?void 0:t.description)&&e.jsx("div",{className:"mt-4 text-gray-600 text-sm line-clamp-3",children:e.jsx("p",{children:t.description})}),e.jsx("hr",{className:"mt-4 border-gray-300"})]})]})}const Me={title:"What Our Clients Are Saying About Us?",testimonials:[{title:"The best booking system",description:"I've been using the hotel booking system for several years now, and it's become my go-to platform for planning my trips. The interface is user-friendly, and I appreciate the detailed information and real-time availability of hotels.",name:"Sara Mohamed",location:"Jakarta",rating:5,image:"data:image/jpeg;base64,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"},{title:"The best booking system",description:"I've been using the hotel booking system for several years now, and it's become my go-to platform for planning my trips. The interface is user-friendly, and I appreciate the detailed information and real-time availability of hotels.",name:"Attend John",location:"California",rating:5,image:"data:image/jpeg;base64,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"},{title:"The best booking system",description:"I've been using the hotel booking system for several years now, and it's become my go-to platform for planning my trips. The interface is user-friendly, and I appreciate the detailed information and real-time availability of hotels.",name:"Sara Mohamed",location:"Jakarta",rating:5,image:"data:image/jpeg;base64,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"},{title:"The best booking system",description:"I've been using the hotel booking system for several years now, and it's become my go-to platform for planning my trips. The interface is user-friendly, and I appreciate the detailed information and real-time availability of hotels.",name:"John Doe",location:"New York",rating:5,image:"data:image/jpeg;base64,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"}],backgroundImage:"/images/HotelsSectionImg/Clients.png"},$={items:[{id:2,type:"div",content:"2,16,130+ customers",bg:"bg-yellow-400",height:"229",width:"306"},{id:1,type:"image",src:"/images/HomepageImages/massonaryCards/1.png"},{id:4,type:"div",content:"4,38,264+ room nights serving",bg:"bg-[#4DD0E2]",height:"182",width:"306"},{id:8,type:"image",src:"/images/HomepageImages/massonaryCards/7.png"},{id:3,type:"image",src:"/images/HomepageImages/massonaryCards/2.png"},{id:9,type:"div",content:"",bg:"bg-[#CFC8B5]",height:"182",width:"165"},{id:6,type:"image",src:"/images/HomepageImages/massonaryCards/4.png"},{id:3,type:"image",src:"/images/HomepageImages/massonaryCards/2.png"},{id:10,type:"image",src:"/images/HomepageImages/massonaryCards/5.png"},{id:11,type:"image",src:"/images/HomepageImages/massonaryCards/6.png"},{id:7,type:"div",content:"43 countries across",bg:"bg-teal-400",height:"182",width:"165"},{id:5,type:"image",src:"/images/HomepageImages/massonaryCards/3.png"}],breakpointColumnsObj:{default:4,1100:3,700:2,500:2}},Ce=({data:t})=>{const n=(t==null?void 0:t.carouselImages)||[],k=(t==null?void 0:t.sections)||[],[r,w]=i.useState(0),[A,b]=i.useState(null),[S,g]=i.useState("next"),[x,I]=i.useState(null),[M,y]=i.useState(null),[d,J]=i.useState(!1),P=500,U=()=>{g("next"),b(r),w(a=>(a+1)%n.length)},B=()=>{g("prev"),b(r),w(a=>(a-1+n.length)%n.length)};i.useEffect(()=>{if(A!==null){const a=setTimeout(()=>{b(null)},P);return()=>clearTimeout(a)}},[A]);const m=S==="next"?"-translate-x-full":"translate-x-full",c=a=>{I(a.touches[0].clientX)},O=a=>{y(a.touches[0].clientX)},z=()=>{if(x===null||M===null)return;const a=50,p=x-M;p>a?U():p<-a&&B(),I(null),y(null)};return i.useEffect(()=>(document.body.style.overflow=d?"hidden":"auto",()=>{document.body.style.overflow="auto"}),[d]),e.jsxs("div",{className:"relative w-full mx-auto",children:[e.jsx("div",{className:"overflow-hidden relative h-[80vh]",onTouchStart:c,onTouchMove:O,onTouchEnd:z,children:n.length>0&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"absolute inset-0",children:e.jsx("img",{src:n[r],alt:`Slide ${r}`,className:"w-full h-full object-cover"})},r),A!==null&&e.jsx("div",{className:`absolute inset-0 transition-transform duration-500 ease-in-out transform ${m}`,style:{zIndex:10},children:e.jsx("img",{src:n[A],alt:`Slide ${A}`,className:"w-full h-full object-cover"})},A)]})}),e.jsx("button",{className:"hidden md:block absolute top-1/2 left-0 transform -translate-y-1/2 text-primary-white p-2 rounded-full",onClick:B,children:e.jsx(R,{name:"leftIcon"})}),e.jsx("button",{className:"hidden md:block absolute top-1/2 right-0 transform -translate-y-1/2 text-primary-white p-2 rounded-full",onClick:U,children:e.jsx(R,{name:"rightIcon"})}),e.jsx("div",{className:"absolute bottom-0 left-0 z-10 right-0 px-4 flex justify-center mb-8",children:n.map((a,p)=>e.jsx("div",{className:`w-28 rounded-full transition-all duration-500 ease-in-out h-[5px] mx-1 cursor-pointer ${p===r?"bg-[#FDC114] w-44":"bg-primary-white"}`,onClick:()=>{p!==r&&(g(p>r?"next":"prev"),b(r),w(p))}},p))}),e.jsx("div",{className:"absolute bottom-0 right-4 md:right-[16%] text-center mb-10",children:e.jsx("button",{className:"text-primary-white p-2 rounded underline transition-all duration-500 ease-in-out hover:text-[#FDC114]",onClick:()=>J(!0),children:"View All Images"})}),e.jsxs("div",{className:`fixed inset-0 bg-[#6EC4C2] flex justify-center items-start z-50 transition-transform duration-500 transform ${d?"translate-y-0":"translate-y-full pointer-events-none"}`,children:[e.jsx("button",{className:"absolute top-4 right-4 text-primary-white p-2 rounded",onClick:()=>J(!1),children:e.jsx(_,{style:{height:"40px",width:"40px"}})}),e.jsx("div",{className:"bg-primary-white hotelSelection overflow-y-auto py-10 pb-20 w-full md:w-[1300px] h-full mt-16 rounded-t-[40px] px-8",children:k.length>0?k.map((a,p)=>e.jsxs("div",{className:"mb-10",children:[e.jsx("h2",{className:"text-5xl font-bold mb-4",children:a.heading}),e.jsx("div",{className:"grid grid-cols-2 md:grid-cols-3 gap-4",children:a.images.map((q,u)=>e.jsx("img",{src:q,alt:`Section ${a.heading} - image ${u}`,className:"w-full h-[250px] object-cover rounded-xl"},u))})]},p)):e.jsx("p",{className:"text-gray-600 italic",children:"No section images available."})})]})]})},Se=({address:t})=>{const{hotelAddress:n,metro:k,airport:r,railwayStation:w,attractions:A,restaurants:b,activities:S,nightlife:g}=t||{},x=20,I=i.useRef(null),M=i.useRef(null),y=i.useRef({}),[d,J]=i.useState({}),[P,U]=i.useState(null),[B,m]=i.useState(!1),c=["Airport","Railway Station","Metro Station"],O=["Attractions","Restaurants","Nightlife","Activities"],z={Attractions:"/images/MapIcons/Attraction.svg",Restaurants:"/images/MapIcons/Restaurents.svg",Nightlife:"/images/MapIcons/NightLife.svg",Activities:"/images/MapIcons/Activities.svg"},a={Airport:"/images/MapIcons/Airport.svg","Railway Station":"/images/MapIcons/Railway.svg","Metro Station":"/images/MapIcons/Metro.svg"},[p,q]=i.useState(!1),[u,ee]=i.useState("Attractions"),[F,Q]=i.useState(null),L=i.useRef(null),[V,se]=i.useState(null),X=i.useRef(null);i.useEffect(()=>{Q(null)},[u]),i.useEffect(()=>{if(!window.google){console.error("Google Maps JavaScript API not loaded.");return}if(!n){console.error("Hotel address is missing.");return}const s=new window.google.maps.Geocoder;s.geocode({address:n},(o,l)=>{if(l==="OK"&&o[0]){const f=o[0].geometry.location;U(f);const h=new window.google.maps.Map(I.current,{center:f,zoom:x});M.current=h,new window.google.maps.Marker({position:f,map:h,title:n}),Object.entries({"Metro Station":k,Airport:r,"Railway Station":w,Attractions:A,Restaurants:b,Activities:S,Nightlife:g}).forEach(([v,H])=>{H&&H.length>0?Promise.all(H.map(N=>new Promise(E=>{s.geocode({address:`${N.name}, New Delhi, India`},(j,K)=>{if(K==="OK"&&j[0]){const W=j[0].geometry.location,Y=window.google.maps.geometry.spherical.computeDistanceBetween(f,W),re=Math.round(Y/80),ae={...N,location:W,distance:Y,travelTime:re,place_id:N.place_id||N.name};E(ae)}else console.error(`Geocode failed for ${N.name}: ${K}`),E({...N,location:null})})}))).then(N=>{const E=N.filter(j=>j.location);E.sort((j,K)=>j.distance-K.distance),J(j=>({...j,[v]:E})),E.forEach(j=>te(j,h))}):J(N=>({...N,[v]:[]}))})}else console.error("Geocode was not successful for: "+l)})},[n,t,x]),i.useEffect(()=>{if(p&&window.google&&L.current&&!V){const s=new window.google.maps.Map(L.current,{center:P||{lat:28.6139,lng:77.209},zoom:x});se(s)}},[p,P,V]);const te=(s,o)=>{const l=new window.google.maps.Marker({position:s.location,map:o,title:s.name}),f=new window.google.maps.InfoWindow({content:`<div>
                  <strong>${s.name}</strong><br/>
                  Distance: ${(s.distance/1e3).toFixed(2)} km<br/>
                  ${s.vicinity||""}
                </div>`});l.addListener("click",()=>{f.open(o,l)}),y.current[s.place_id]={marker:l,infoWindow:f}},T=(s,o)=>{let l=s.getCenter(),f=o.lat(),h=o.lng(),C=l.lat(),v=l.lng();const H=30;let N=0;const E=(f-C)/H,j=(h-v)/H,K=setInterval(()=>{C+=E,v+=j,s.setCenter(new window.google.maps.LatLng(C,v)),N++,N>=H&&(clearInterval(K),s.setCenter(o))},20)},ne=s=>{m(!0);const{location:o,place_id:l,name:f}=s,h=M.current;if(h&&o)if(T(h,o),setTimeout(()=>{h.setZoom(x)},600),y.current[l])y.current[l].infoWindow.open(h,y.current[l].marker);else{const C=new window.google.maps.Marker({position:o,map:h,title:f}),v=new window.google.maps.InfoWindow({content:`<div>
                      <strong>${f}</strong><br/>
                      Distance: ${(s.distance/1e3).toFixed(2)} km<br/>
                      ${s.vicinity||""}<br/>
                      Travel Time: ${s.travelTime} min
                    </div>`});C.addListener("click",()=>{v.open(h,C)}),y.current[l]={marker:C,infoWindow:v},v.open(h,C)}},ie=s=>{V&&s&&s.location&&(T(V,s.location),setTimeout(()=>{V.setZoom(x)},600),X.current?X.current.setPosition(s.location):X.current=new window.google.maps.Marker({position:s.location,map:V,title:s.name}))},oe=()=>{m(!0);const s=M.current;s&&P&&(T(s,P),setTimeout(()=>{s.setZoom(x)},600))},G=s=>Math.round(s/80),Z={hidden:{y:"100%",opacity:0},visible:{y:0,opacity:1,transition:{type:"spring",stiffness:100,damping:15}},exit:{y:"100%",opacity:0,transition:{type:"spring",stiffness:100,damping:15}}};return e.jsxs("div",{className:"content my-5",children:[e.jsxs("div",{className:"w-full mb-5 flex flex-col gap-1",children:[e.jsx("h2",{className:"text-desktop/h3 font-bold mb-1",children:"Location"}),e.jsx("p",{className:"text-primary-gray text-desktop/h6/medium",children:n}),e.jsxs("a",{onClick:oe,className:"my-2 underline items-center text-primary-green font-bold text-lg cursor-pointer flex gap-2",children:["View Hotel Location ",e.jsx(we,{style:{height:"16px"}})]})]}),e.jsxs("div",{className:"flex justify-between flex-col-reverse md:flex-row gap-14",children:[e.jsxs("div",{style:{overflowY:"auto"},className:"md:w-[50%] flex flex-col-reverse md:flex-col gap-6 md:gap-0",children:[e.jsx("div",{className:"flex gap-4 flex-wrap md:flex-nowrap justify-between items-center",children:c.map(s=>e.jsx("div",{style:{marginBottom:"20px"},className:"flex flex-col w-full md:w-auto p-4 gap-2 border rounded-lg shadow-md justify-center items-center",children:d[s]&&d[s].length>0?d[s].map(o=>{const l=G(o.distance);return e.jsxs("div",{className:"flex flex-col gap-2 p-6 justify-center items-center",children:[e.jsx("img",{src:a[s],alt:s,className:"w-16 h-16"}),e.jsx("h4",{className:"text-sm font-semibold text-gray-700",children:s}),e.jsxs("span",{className:"text-xs text-gray-500",children:[l," Min away"]}),e.jsx("button",{onClick:()=>ne(o),className:"text-primary-green font-medium text-lg hover:underline",children:"View on Map"})]},o.place_id)}):e.jsxs("p",{className:"text-sm text-gray-500",children:["No ",s," found."]})},s))}),e.jsx("div",{className:"grid grid-cols-2 gap-4",children:O.map(s=>e.jsxs("div",{className:"bg-white rounded-lg border p-4 shadow-md flex items-center justify-between",children:[e.jsxs("div",{className:"flex flex-col gap-2",children:[e.jsx("h4",{className:"text-sm font-semibold text-gray-700",children:s}),e.jsxs("span",{className:"text-xs text-gray-500",children:[d[s]&&d[s].length||0," Nearby"]}),e.jsx("button",{onClick:()=>q(!0),className:"text-primary-green font-medium text-lg hover:underline mt-2",children:"View More"})]}),e.jsx("img",{src:z[s],alt:s,className:"w-14 h-14"})]},s))})]}),e.jsxs("div",{style:{position:"relative",height:"500px"},className:"md:w-[50%]",children:[e.jsx("div",{ref:I,style:{height:"100%",width:"100%",filter:B?"none":"blur(8px)",transition:"filter 0.3s ease"},className:"rounded-2xl shadow-lg"}),!B&&e.jsx("div",{onClick:()=>m(!0),style:{position:"absolute",top:0,left:0,right:0,bottom:0,display:"flex",alignItems:"center",justifyContent:"center",backgroundColor:"rgba(255, 255, 255, 0.6)",cursor:"pointer",zIndex:2,fontSize:"1.2rem",fontWeight:"bold",color:"#333"},children:e.jsx("p",{className:"bg-primary-green px-4 py-2 rounded-3xl text-white font-medium",children:"Click here to view on map"})})]})]}),p&&e.jsx(ce,{children:e.jsxs(D.div,{variants:Z,className:"fixed inset-0 bg-primary-green flex justify-center items-start z-50 transition-transform duration-500 transform",children:[e.jsx("button",{className:"absolute top-4 right-4 text-primary-white p-2 rounded",onClick:()=>q(!1),children:e.jsx(_,{style:{height:"40px",width:"40px"}})}),e.jsxs(D.div,{variants:Z,className:"bg-white hotelSelection overflow-y-auto pb-20 w-full md:w-[1300px] h-full mt-16 rounded-t-[40px] shadow-lg",children:[e.jsx("div",{className:"sticky top-0 z-50 bg-white px-8 pt-4 border-b-2 border-gray-200",children:e.jsx("div",{className:"flex justify-between max-w-4xl mx-auto",children:O.map(s=>e.jsxs("button",{onClick:()=>ee(s),className:`flex flex-col items-center px-4 py-2 transition-all duration-200 ${u===s?"border-b-2 border-primary-green text-primary-green font-medium":"text-gray-600"}`,children:[e.jsx("img",{src:z[s],alt:s,className:`w-12 h-12 transition-transform duration-200 ${u===s?"scale-110":""}`}),e.jsx("span",{className:"mt-1 text-sm",children:s})]},s))})}),e.jsx("div",{className:"px-8 mt-8",children:e.jsxs("div",{className:"flex flex-col lg:flex-row gap-8",children:[e.jsxs("div",{className:"w-full lg:w-[60%]",children:[e.jsxs("h2",{className:"text-2xl font-bold mb-4 text-gray-800",children:["Nearby ",u]}),d[u]&&d[u].length>0?e.jsx("div",{className:"space-y-4 pr-4",children:d[u].map((s,o)=>e.jsxs("div",{className:"bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden",children:[e.jsxs("div",{className:"flex flex-col sm:flex-row justify-between p-4 cursor-pointer",onClick:()=>Q(F===o?null:o),children:[e.jsxs("div",{className:"flex items-center space-x-3",children:[e.jsx("div",{className:"bg-green-100 p-2 rounded-full",children:e.jsx("img",{src:z[u],alt:u,className:"w-6 h-6 text-green-600"})}),e.jsxs("div",{children:[e.jsx("h3",{className:"font-semibold text-gray-800",children:s.name}),s.rating&&e.jsx("div",{className:"flex items-center mt-1",children:e.jsxs("div",{className:"flex text-yellow-400",children:[Array(Math.floor(s.rating)).fill().map((l,f)=>e.jsx("svg",{className:"w-4 h-4",fill:"currentColor",viewBox:"0 0 20 20",children:e.jsx("path",{d:"M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"})},f)),s.rating%1!==0&&e.jsx("svg",{className:"w-4 h-4",fill:"currentColor",viewBox:"0 0 20 20",children:e.jsx("path",{d:"M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"})}),e.jsx("span",{className:"ml-1 text-xs text-gray-600",children:s.rating})]})})]})]}),e.jsxs("div",{className:"flex flex-col sm:items-end mt-2 sm:mt-0",children:[e.jsxs("div",{className:"flex items-center space-x-3",children:[e.jsxs("div",{className:"flex items-center text-gray-600",children:[e.jsxs("svg",{className:"w-4 h-4 mr-1",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:[e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"}),e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M15 11a3 3 0 11-6 0 3 3 0 016 0z"})]}),e.jsxs("span",{className:"text-sm",children:[(s.distance/1e3).toFixed(2)," km"]})]}),e.jsxs("div",{className:"flex items-center text-gray-600",children:[e.jsx("svg",{className:"w-4 h-4 mr-1",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"})}),e.jsxs("span",{className:"text-sm",children:[G(s.distance)," min"]})]})]}),e.jsxs("button",{onClick:l=>{l.stopPropagation(),ie(s)},className:"mt-2 px-3 py-1 text-sm bg-primary-green text-white rounded-md transition-colors duration-200 flex items-center",children:[e.jsx("svg",{className:"w-4 h-4 mr-1",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"})}),"View on Map"]})]})]}),F===o&&e.jsxs("div",{className:"bg-gray-50 p-4 border-t border-gray-100",children:[e.jsx("p",{className:"text-gray-600",children:s.vicinity||"No address available"}),s.opening_hours&&e.jsx("p",{className:"mt-2 text-sm",children:s.opening_hours.open_now?e.jsx("span",{className:"text-green-600",children:"Open Now"}):e.jsx("span",{className:"text-red-600",children:"Closed"})})]})]},s.place_id))}):e.jsxs("div",{className:"flex flex-col items-center justify-center bg-gray-50 rounded-lg p-8",children:[e.jsx("svg",{className:"w-16 h-16 text-gray-400",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:1,d:"M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"})}),e.jsxs("p",{className:"mt-4 text-gray-600",children:["No ",u," found in this area."]}),e.jsx("button",{className:"mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors",children:"Expand Search Area"})]})]}),e.jsx("div",{className:"w-full lg:w-[40%] mt-6 lg:mt-0",children:e.jsxs("div",{className:"sticky top-24",children:[e.jsx("h2",{className:"text-2xl font-bold mb-4 text-gray-800",children:"Map View"}),e.jsx("div",{ref:L,className:"w-full h-[450px] rounded-lg overflow-hidden shadow-lg border border-gray-200"})]})})]})})]})]})})]})},Oe=()=>{const{hotelCode:t}=Ae(),[n,k]=i.useState(null),[r,w]=i.useState(!0),[A,b]=i.useState(null);return i.useEffect(()=>{t&&(async()=>{try{const g=await me(t);k(g==null?void 0:g.hotel)}catch(g){b(g)}finally{w(!1)}})()},[t]),r?e.jsx("div",{children:e.jsx(de,{})}):A?e.jsxs("div",{children:["Error: ",A.message]}):e.jsxs("div",{children:[e.jsx(ve,{businessPlatformFeatures:n==null?void 0:n.images}),e.jsx(ke,{hotelData:n}),e.jsx(pe,{rooms:n==null?void 0:n.rooms}),e.jsx(fe,{amenities:n==null?void 0:n.amenities}),e.jsx(be,{Testimonials:n==null?void 0:n.testimonials,backgroundImage:Me.backgroundImage}),e.jsx(Se,{address:n==null?void 0:n.location}),e.jsx(Ce,{data:n==null?void 0:n.imageSections}),e.jsx(je,{data:n==null?void 0:n.aboutUs,text:"text-[26px] md:text-desktop/h2",imgClass:"rounded-[20px] h-[350px]",textC:"black",ptext:" text-[14px] md:text-[18px]",lineh:"[60px]",bg:"bg-primary-white",paddTop:"0 items-start gap-10"}),e.jsx("div",{className:"relative z-10 content",children:e.jsx(ye,{breakpointColumnsObj:$.breakpointColumnsObj,items:$.items})}),e.jsx(ge,{faqs:n==null?void 0:n.faqs}),e.jsx("img",{src:"/images/HotelsSectionImg/Img.png",alt:"",className:"h-[130px] w-full"}),e.jsx(ue,{})]})};export{Oe as default};
