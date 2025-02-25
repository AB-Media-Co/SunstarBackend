import{c as x,j as e,d as m,r as l,n as g,L as h}from"./index-CR1zObvR.js";import{I as c}from"./Icons-BrIZ2tOe.js";const p=x(e.jsx("path",{d:"M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3z"}),"OpenInNew"),u=[{icon:"marketing",title:"Reservations",email:"book@sunstar.com"},{icon:"Group",title:"Corporate Sales",email:"sales@sunstar.com"},{icon:"generalChat",title:"Travel Agent Sales",email:"b2b@sunstar.com"},{icon:"corporate",title:"Marketing",email:"marketing@sunstar.com"},{icon:"Group",title:"Careers",email:"careers@sunstar.com"},{icon:"builders",title:"Hotel Development",email:"hotels@sunstar.com"}],f=[{name:"Sunstar Grand",image:"/images/ContctUsImg/cardImg1.png"},{name:"Sunstar Heights",image:"/images/ContctUsImg/cardImg1.png"},{name:"Suncourt Yatri",image:"/images/ContctUsImg/cardImg1.png"},{name:"Sunstar Sunshine",image:"/images/ContctUsImg/cardImg1.png"},{name:"Sunstar Residency",image:"/images/ContctUsImg/cardImg1.png"},{name:"Sunstar Heritage",image:"/images/ContctUsImg/cardImg1.png"}],j=()=>{const{ContactUsDetail:s}=m();return e.jsxs("div",{className:"relative h-[370px] md:h-[400px]",children:[e.jsx("div",{className:"absolute inset-0 bg-cover bg-center",style:{backgroundImage:"url('/images/ContctUsImg/ContactUsBanner.jpg')"}}),e.jsxs("div",{className:"relative z-10 content h-full flex flex-col justify-end px-6 pb-6 md:px-12 ",children:[e.jsx("h1",{className:"text-primary-white text-3xl md:text-5xl font-bold drop-shadow-xl mb-4","data-aos":"fade-up",children:"Need to get in touch?"}),e.jsxs("div",{className:"flex flex-wrap gap-6 mt-2","data-aos":"fade-up",children:[e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx(c,{name:"rotatePhone",className:"w-8 h-8 md:w-10 md:h-10 transition-transform duration-300 hover:scale-110"}),e.jsx("a",{href:`tel:${s==null?void 0:s.phoneNumber}`,className:"text-primary-white text-base md:text-lg font-medium hover:underline",children:s==null?void 0:s.phoneNumber})]}),e.jsxs("div",{className:"flex items-center gap-3","data-aos":"fade-up",children:[e.jsx(c,{name:"email",className:"w-8 h-8 md:w-10 md:h-10 transition-transform duration-300 hover:scale-110"}),e.jsx("a",{href:s==null?void 0:s.emailId,className:"text-primary-white text-base md:text-lg font-medium hover:underline",children:s==null?void 0:s.emailId})]})]}),e.jsxs("p",{className:"text-primary-white text-sm md:text-base mt-6 drop-shadow","data-aos":"fade-up",children:["For assistance with bookings, cancellations, etc. mail us on",e.jsx("a",{href:s==null?void 0:s.emailId,className:"underline font-semibold ml-1",children:s==null?void 0:s.emailId})]}),e.jsx("div",{className:"mt-6","data-aos":"fade-up",children:e.jsx("a",{href:"#contact",className:"inline-flex items-center px-6 py-3 bg-primary-white text-[#6EC4C3] font-semibold rounded-full shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:scale-105",children:e.jsx("span",{children:"Contact Us"})})})]})]})},v=({hotels:s})=>e.jsx("div",{className:"bg-gradient-to-r from-blue-50 to-gray-50 py-12",children:e.jsxs("div",{className:"content mx-auto px-4",children:[e.jsxs("div",{className:"mb-10 text-center",children:[e.jsx("h2",{className:"text-mobile/h3 md:text-desktop/h2 font-bold text-gray-800 mb-2",children:"Contact A Hotel"}),e.jsx("p",{className:"text-mobile/body/2 md:text-desktop/body/1 text-gray-500 font-medium",children:"Have A Specific Question? Contact The Reception & Ask Away"})]}),e.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8",children:s.map((r,n)=>e.jsxs("div",{"data-aos":"fade-up","data-aos-delay":n*100,className:"group relative cursor-pointer animation-on-scroll rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:-translate-y-2",children:[e.jsx("div",{className:"overflow-hidden",children:e.jsx("img",{src:r.image,alt:r.name,className:"w-full h-56 md:h-64 object-cover transition-transform duration-300 group-hover:scale-110"})}),e.jsx("div",{className:"absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center",children:e.jsx("button",{className:"px-4 py-2 bg-primary-green text-primary-white rounded-full text-sm font-semibold hover:bg-primary-green transition-colors",children:"Contact Now"})}),e.jsx("div",{className:"p-4 bg-primary-white",children:e.jsxs("p",{className:"text-center text-mobile/body/2 md:text-desktop/body/1 font-bold text-gray-800 group-hover:text-primary-green  transition-colors",children:[r.name," ",e.jsx("span",{className:"text-gray-400",children:">"})]})})]},n))})]})}),b=()=>{const[s,r]=l.useState([]),[n,i]=l.useState(!0),[o,t]=l.useState(null);return l.useEffect(()=>{g.get("/api/instagram/posts").then(a=>{r(a.data||[]),i(!1)}).catch(a=>{console.error("There was an error fetching the posts:",a),t("Failed to fetch Instagram posts. Please try again later."),i(!1)})},[]),e.jsx("div",{className:"min-h-screen bg-gray-100 py-10",children:e.jsxs("div",{className:"content mx-auto",children:[e.jsxs("div",{className:"text-start mb-8",children:[e.jsx("h1",{className:"text-5xl font-bold text-gray-800 mb-4",children:"Instagram Feed"}),e.jsx("p",{className:"text-lg text-gray-600",children:"Latest posts from our Instagram account"})]}),o&&e.jsx("div",{className:"text-center text-red-500 mb-8",children:o}),n?e.jsx("div",{className:"flex justify-center items-center",children:e.jsx("div",{className:"animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600"})}):e.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8",children:s.length>0?s.map((a,d)=>e.jsxs("div",{className:"bg-primary-white shadow-lg rounded-lg overflow-hidden transform transition duration-300 hover:scale-105",children:[e.jsx("div",{className:"p-4 flex items-center justify-between",children:e.jsxs("div",{className:"flex items-center space-x-3",children:[e.jsx("img",{src:"/images/Logo/sunstarlogo.svg",alt:"Sunstar Hospitality Logo",className:"w-8 h-8"}),e.jsx("div",{className:"flex hover:underline",children:e.jsxs("a",{href:"https://www.instagram.com/hotel_sunstar_group",target:"_blank",rel:"noopener noreferrer",className:"text-sm font-semibold text-gray-800 leading-4",children:["Sunstar ",e.jsx("p",{children:"Hospitality"})]})})]})}),e.jsxs(h,{to:a.permalink,className:"relative group ",children:[e.jsx("img",{src:a==null?void 0:a.media_url,alt:"Hotel Sunstar",className:"w-full h-[28rem] object-cover",referrerPolicy:"no-referrer",crossOrigin:"anonymous"}),e.jsx("div",{className:"absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300",children:e.jsxs("a",{href:`${a.permalink}`,target:"_blank",rel:"noopener noreferrer",className:"px-4 py-2 bg-primary-green text-primary-white text-sm font-medium rounded hover:bg-primmary-green transition duration-300",children:["View Post ",e.jsx(p,{className:"ml-1",fontSize:"small"})]})})]})]},d)):e.jsx("p",{className:"text-center text-gray-500",children:"No posts available."})})]})})},N=()=>{const{ContactUsDetail:s}=m(),r=(s==null?void 0:s.OtherEnquieirs)||{},n={reservations:"marketing",corporateSales:"Group",traveAgentSales:"generalChat",marketing:"corporate",careers:"Group",hotelDevelopment:"builders"},i={reservations:"Reservations",corporateSales:"Corporate Sales",traveAgentSales:"Travel Agent Sales",marketing:"Marketing",careers:"Careers",hotelDevelopment:"Hotel Development"},o=Object.entries(r).map(([t,a])=>({key:t,email:a,icon:n[t]||"defaultIcon",title:i[t]||t}));return e.jsx("div",{className:"bg-gray-50 py-10",children:e.jsxs("div",{className:"content mx-auto px-4",children:[e.jsx("h2",{className:"text-2xl md:text-3xl font-bold text-gray-800 mb-8",children:"Other Enquiries"}),e.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6",children:o.map((t,a)=>e.jsxs("div",{className:"flex items-center space-x-4","data-aos":"fade-up","data-aos-delay":a*100,children:[e.jsx(c,{name:t.icon,className:"w-10 h-10"}),e.jsxs("div",{children:[e.jsx("p",{className:"text-md font-medium text-[#A4A4A4]",children:t.title}),e.jsx("a",{href:`mailto:${t.email}`,className:"underline text-[#848484] font-bold hover:underline text-xl",children:t.email})]})]},a))})]})})},I=()=>e.jsxs("div",{children:[e.jsx(j,{}),e.jsx(v,{hotels:f}),e.jsx("hr",{className:"content"}),e.jsx(N,{enquiries:u}),e.jsx(b,{})]});export{I as default};
