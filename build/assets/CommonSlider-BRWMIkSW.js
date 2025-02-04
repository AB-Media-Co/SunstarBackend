import{r as P,j as H}from"./index-Bli-Bc4h.js";import{g as q,a as _,e as R,b as X,c as Y,d as J,m as T,f as Q,h as G,S as Z,i as ee}from"./pagination-Cuw1rrrP.js";import{I as U}from"./Icons-6KUuzrGT.js";function te(x){let{swiper:e,extendParams:A,on:p,emit:c}=x;const d=q(),w=_();e.keyboard={enabled:!1},A({keyboard:{enabled:!1,onlyInViewport:!0,pageUpDown:!0}});function C(L){if(!e.enabled)return;const{rtlTranslate:S}=e;let f=L;f.originalEvent&&(f=f.originalEvent);const v=f.keyCode||f.charCode,s=e.params.keyboard.pageUpDown,n=s&&v===33,o=s&&v===34,l=v===37,t=v===39,a=v===38,i=v===40;if(!e.allowSlideNext&&(e.isHorizontal()&&t||e.isVertical()&&i||o)||!e.allowSlidePrev&&(e.isHorizontal()&&l||e.isVertical()&&a||n))return!1;if(!(f.shiftKey||f.altKey||f.ctrlKey||f.metaKey)&&!(d.activeElement&&d.activeElement.nodeName&&(d.activeElement.nodeName.toLowerCase()==="input"||d.activeElement.nodeName.toLowerCase()==="textarea"))){if(e.params.keyboard.onlyInViewport&&(n||o||l||t||a||i)){let r=!1;if(R(e.el,`.${e.params.slideClass}, swiper-slide`).length>0&&R(e.el,`.${e.params.slideActiveClass}`).length===0)return;const E=e.el,B=E.clientWidth,M=E.clientHeight,m=w.innerWidth,k=w.innerHeight,y=X(E);S&&(y.left-=E.scrollLeft);const I=[[y.left,y.top],[y.left+B,y.top],[y.left,y.top+M],[y.left+B,y.top+M]];for(let h=0;h<I.length;h+=1){const b=I[h];if(b[0]>=0&&b[0]<=m&&b[1]>=0&&b[1]<=k){if(b[0]===0&&b[1]===0)continue;r=!0}}if(!r)return}e.isHorizontal()?((n||o||l||t)&&(f.preventDefault?f.preventDefault():f.returnValue=!1),((o||t)&&!S||(n||l)&&S)&&e.slideNext(),((n||l)&&!S||(o||t)&&S)&&e.slidePrev()):((n||o||a||i)&&(f.preventDefault?f.preventDefault():f.returnValue=!1),(o||i)&&e.slideNext(),(n||a)&&e.slidePrev()),c("keyPress",v)}}function u(){e.keyboard.enabled||(d.addEventListener("keydown",C),e.keyboard.enabled=!0)}function D(){e.keyboard.enabled&&(d.removeEventListener("keydown",C),e.keyboard.enabled=!1)}p("init",()=>{e.params.keyboard.enabled&&u()}),p("destroy",()=>{e.keyboard.enabled&&D()}),Object.assign(e.keyboard,{enable:u,disable:D})}function W(x,e,A,p){return x.params.createElements&&Object.keys(p).forEach(c=>{if(!A[c]&&A.auto===!0){let d=Y(x.el,`.${p[c]}`)[0];d||(d=J("div",p[c]),d.className=p[c],x.el.append(d)),A[c]=d,e[c]=d}}),A}function ae(x){let{swiper:e,extendParams:A,on:p,emit:c}=x;A({navigation:{nextEl:null,prevEl:null,hideOnClick:!1,disabledClass:"swiper-button-disabled",hiddenClass:"swiper-button-hidden",lockClass:"swiper-button-lock",navigationDisabledClass:"swiper-navigation-disabled"}}),e.navigation={nextEl:null,prevEl:null};function d(s){let n;return s&&typeof s=="string"&&e.isElement&&(n=e.el.querySelector(s)||e.hostEl.querySelector(s),n)?n:(s&&(typeof s=="string"&&(n=[...document.querySelectorAll(s)]),e.params.uniqueNavElements&&typeof s=="string"&&n&&n.length>1&&e.el.querySelectorAll(s).length===1?n=e.el.querySelector(s):n&&n.length===1&&(n=n[0])),s&&!n?s:n)}function w(s,n){const o=e.params.navigation;s=T(s),s.forEach(l=>{l&&(l.classList[n?"add":"remove"](...o.disabledClass.split(" ")),l.tagName==="BUTTON"&&(l.disabled=n),e.params.watchOverflow&&e.enabled&&l.classList[e.isLocked?"add":"remove"](o.lockClass))})}function C(){const{nextEl:s,prevEl:n}=e.navigation;if(e.params.loop){w(n,!1),w(s,!1);return}w(n,e.isBeginning&&!e.params.rewind),w(s,e.isEnd&&!e.params.rewind)}function u(s){s.preventDefault(),!(e.isBeginning&&!e.params.loop&&!e.params.rewind)&&(e.slidePrev(),c("navigationPrev"))}function D(s){s.preventDefault(),!(e.isEnd&&!e.params.loop&&!e.params.rewind)&&(e.slideNext(),c("navigationNext"))}function L(){const s=e.params.navigation;if(e.params.navigation=W(e,e.originalParams.navigation,e.params.navigation,{nextEl:"swiper-button-next",prevEl:"swiper-button-prev"}),!(s.nextEl||s.prevEl))return;let n=d(s.nextEl),o=d(s.prevEl);Object.assign(e.navigation,{nextEl:n,prevEl:o}),n=T(n),o=T(o);const l=(t,a)=>{t&&t.addEventListener("click",a==="next"?D:u),!e.enabled&&t&&t.classList.add(...s.lockClass.split(" "))};n.forEach(t=>l(t,"next")),o.forEach(t=>l(t,"prev"))}function S(){let{nextEl:s,prevEl:n}=e.navigation;s=T(s),n=T(n);const o=(l,t)=>{l.removeEventListener("click",t==="next"?D:u),l.classList.remove(...e.params.navigation.disabledClass.split(" "))};s.forEach(l=>o(l,"next")),n.forEach(l=>o(l,"prev"))}p("init",()=>{e.params.navigation.enabled===!1?v():(L(),C())}),p("toEdge fromEdge lock unlock",()=>{C()}),p("destroy",()=>{S()}),p("enable disable",()=>{let{nextEl:s,prevEl:n}=e.navigation;if(s=T(s),n=T(n),e.enabled){C();return}[...s,...n].filter(o=>!!o).forEach(o=>o.classList.add(e.params.navigation.lockClass))}),p("click",(s,n)=>{let{nextEl:o,prevEl:l}=e.navigation;o=T(o),l=T(l);const t=n.target;let a=l.includes(t)||o.includes(t);if(e.isElement&&!a){const i=n.path||n.composedPath&&n.composedPath();i&&(a=i.find(r=>o.includes(r)||l.includes(r)))}if(e.params.navigation.hideOnClick&&!a){if(e.pagination&&e.params.pagination&&e.params.pagination.clickable&&(e.pagination.el===t||e.pagination.el.contains(t)))return;let i;o.length?i=o[0].classList.contains(e.params.navigation.hiddenClass):l.length&&(i=l[0].classList.contains(e.params.navigation.hiddenClass)),c(i===!0?"navigationShow":"navigationHide"),[...o,...l].filter(r=>!!r).forEach(r=>r.classList.toggle(e.params.navigation.hiddenClass))}});const f=()=>{e.el.classList.remove(...e.params.navigation.navigationDisabledClass.split(" ")),L(),C()},v=()=>{e.el.classList.add(...e.params.navigation.navigationDisabledClass.split(" ")),S()};Object.assign(e.navigation,{enable:f,disable:v,update:C,init:L,destroy:S})}function j(x){return x===void 0&&(x=""),`.${x.trim().replace(/([\.:!+\/])/g,"\\$1").replace(/ /g,".")}`}function ie(x){let{swiper:e,extendParams:A,on:p,emit:c}=x;const d="swiper-pagination";A({pagination:{el:null,bulletElement:"span",clickable:!1,hideOnClick:!1,renderBullet:null,renderProgressbar:null,renderFraction:null,renderCustom:null,progressbarOpposite:!1,type:"bullets",dynamicBullets:!1,dynamicMainBullets:1,formatFractionCurrent:t=>t,formatFractionTotal:t=>t,bulletClass:`${d}-bullet`,bulletActiveClass:`${d}-bullet-active`,modifierClass:`${d}-`,currentClass:`${d}-current`,totalClass:`${d}-total`,hiddenClass:`${d}-hidden`,progressbarFillClass:`${d}-progressbar-fill`,progressbarOppositeClass:`${d}-progressbar-opposite`,clickableClass:`${d}-clickable`,lockClass:`${d}-lock`,horizontalClass:`${d}-horizontal`,verticalClass:`${d}-vertical`,paginationDisabledClass:`${d}-disabled`}}),e.pagination={el:null,bullets:[]};let w,C=0;function u(){return!e.params.pagination.el||!e.pagination.el||Array.isArray(e.pagination.el)&&e.pagination.el.length===0}function D(t,a){const{bulletActiveClass:i}=e.params.pagination;t&&(t=t[`${a==="prev"?"previous":"next"}ElementSibling`],t&&(t.classList.add(`${i}-${a}`),t=t[`${a==="prev"?"previous":"next"}ElementSibling`],t&&t.classList.add(`${i}-${a}-${a}`)))}function L(t,a,i){if(t=t%i,a=a%i,a===t+1)return"next";if(a===t-1)return"previous"}function S(t){const a=t.target.closest(j(e.params.pagination.bulletClass));if(!a)return;t.preventDefault();const i=G(a)*e.params.slidesPerGroup;if(e.params.loop){if(e.realIndex===i)return;const r=L(e.realIndex,i,e.slides.length);r==="next"?e.slideNext():r==="previous"?e.slidePrev():e.slideToLoop(i)}else e.slideTo(i)}function f(){const t=e.rtl,a=e.params.pagination;if(u())return;let i=e.pagination.el;i=T(i);let r,E;const B=e.virtual&&e.params.virtual.enabled?e.virtual.slides.length:e.slides.length,M=e.params.loop?Math.ceil(B/e.params.slidesPerGroup):e.snapGrid.length;if(e.params.loop?(E=e.previousRealIndex||0,r=e.params.slidesPerGroup>1?Math.floor(e.realIndex/e.params.slidesPerGroup):e.realIndex):typeof e.snapIndex<"u"?(r=e.snapIndex,E=e.previousSnapIndex):(E=e.previousIndex||0,r=e.activeIndex||0),a.type==="bullets"&&e.pagination.bullets&&e.pagination.bullets.length>0){const m=e.pagination.bullets;let k,y,I;if(a.dynamicBullets&&(w=Q(m[0],e.isHorizontal()?"width":"height"),i.forEach(h=>{h.style[e.isHorizontal()?"width":"height"]=`${w*(a.dynamicMainBullets+4)}px`}),a.dynamicMainBullets>1&&E!==void 0&&(C+=r-(E||0),C>a.dynamicMainBullets-1?C=a.dynamicMainBullets-1:C<0&&(C=0)),k=Math.max(r-C,0),y=k+(Math.min(m.length,a.dynamicMainBullets)-1),I=(y+k)/2),m.forEach(h=>{const b=[...["","-next","-next-next","-prev","-prev-prev","-main"].map($=>`${a.bulletActiveClass}${$}`)].map($=>typeof $=="string"&&$.includes(" ")?$.split(" "):$).flat();h.classList.remove(...b)}),i.length>1)m.forEach(h=>{const b=G(h);b===r?h.classList.add(...a.bulletActiveClass.split(" ")):e.isElement&&h.setAttribute("part","bullet"),a.dynamicBullets&&(b>=k&&b<=y&&h.classList.add(...`${a.bulletActiveClass}-main`.split(" ")),b===k&&D(h,"prev"),b===y&&D(h,"next"))});else{const h=m[r];if(h&&h.classList.add(...a.bulletActiveClass.split(" ")),e.isElement&&m.forEach((b,$)=>{b.setAttribute("part",$===r?"bullet-active":"bullet")}),a.dynamicBullets){const b=m[k],$=m[y];for(let z=k;z<=y;z+=1)m[z]&&m[z].classList.add(...`${a.bulletActiveClass}-main`.split(" "));D(b,"prev"),D($,"next")}}if(a.dynamicBullets){const h=Math.min(m.length,a.dynamicMainBullets+4),b=(w*h-w)/2-I*w,$=t?"right":"left";m.forEach(z=>{z.style[e.isHorizontal()?$:"top"]=`${b}px`})}}i.forEach((m,k)=>{if(a.type==="fraction"&&(m.querySelectorAll(j(a.currentClass)).forEach(y=>{y.textContent=a.formatFractionCurrent(r+1)}),m.querySelectorAll(j(a.totalClass)).forEach(y=>{y.textContent=a.formatFractionTotal(M)})),a.type==="progressbar"){let y;a.progressbarOpposite?y=e.isHorizontal()?"vertical":"horizontal":y=e.isHorizontal()?"horizontal":"vertical";const I=(r+1)/M;let h=1,b=1;y==="horizontal"?h=I:b=I,m.querySelectorAll(j(a.progressbarFillClass)).forEach($=>{$.style.transform=`translate3d(0,0,0) scaleX(${h}) scaleY(${b})`,$.style.transitionDuration=`${e.params.speed}ms`})}a.type==="custom"&&a.renderCustom?(m.innerHTML=a.renderCustom(e,r+1,M),k===0&&c("paginationRender",m)):(k===0&&c("paginationRender",m),c("paginationUpdate",m)),e.params.watchOverflow&&e.enabled&&m.classList[e.isLocked?"add":"remove"](a.lockClass)})}function v(){const t=e.params.pagination;if(u())return;const a=e.virtual&&e.params.virtual.enabled?e.virtual.slides.length:e.grid&&e.params.grid.rows>1?e.slides.length/Math.ceil(e.params.grid.rows):e.slides.length;let i=e.pagination.el;i=T(i);let r="";if(t.type==="bullets"){let E=e.params.loop?Math.ceil(a/e.params.slidesPerGroup):e.snapGrid.length;e.params.freeMode&&e.params.freeMode.enabled&&E>a&&(E=a);for(let B=0;B<E;B+=1)t.renderBullet?r+=t.renderBullet.call(e,B,t.bulletClass):r+=`<${t.bulletElement} ${e.isElement?'part="bullet"':""} class="${t.bulletClass}"></${t.bulletElement}>`}t.type==="fraction"&&(t.renderFraction?r=t.renderFraction.call(e,t.currentClass,t.totalClass):r=`<span class="${t.currentClass}"></span> / <span class="${t.totalClass}"></span>`),t.type==="progressbar"&&(t.renderProgressbar?r=t.renderProgressbar.call(e,t.progressbarFillClass):r=`<span class="${t.progressbarFillClass}"></span>`),e.pagination.bullets=[],i.forEach(E=>{t.type!=="custom"&&(E.innerHTML=r||""),t.type==="bullets"&&e.pagination.bullets.push(...E.querySelectorAll(j(t.bulletClass)))}),t.type!=="custom"&&c("paginationRender",i[0])}function s(){e.params.pagination=W(e,e.originalParams.pagination,e.params.pagination,{el:"swiper-pagination"});const t=e.params.pagination;if(!t.el)return;let a;typeof t.el=="string"&&e.isElement&&(a=e.el.querySelector(t.el)),!a&&typeof t.el=="string"&&(a=[...document.querySelectorAll(t.el)]),a||(a=t.el),!(!a||a.length===0)&&(e.params.uniqueNavElements&&typeof t.el=="string"&&Array.isArray(a)&&a.length>1&&(a=[...e.el.querySelectorAll(t.el)],a.length>1&&(a=a.find(i=>R(i,".swiper")[0]===e.el))),Array.isArray(a)&&a.length===1&&(a=a[0]),Object.assign(e.pagination,{el:a}),a=T(a),a.forEach(i=>{t.type==="bullets"&&t.clickable&&i.classList.add(...(t.clickableClass||"").split(" ")),i.classList.add(t.modifierClass+t.type),i.classList.add(e.isHorizontal()?t.horizontalClass:t.verticalClass),t.type==="bullets"&&t.dynamicBullets&&(i.classList.add(`${t.modifierClass}${t.type}-dynamic`),C=0,t.dynamicMainBullets<1&&(t.dynamicMainBullets=1)),t.type==="progressbar"&&t.progressbarOpposite&&i.classList.add(t.progressbarOppositeClass),t.clickable&&i.addEventListener("click",S),e.enabled||i.classList.add(t.lockClass)}))}function n(){const t=e.params.pagination;if(u())return;let a=e.pagination.el;a&&(a=T(a),a.forEach(i=>{i.classList.remove(t.hiddenClass),i.classList.remove(t.modifierClass+t.type),i.classList.remove(e.isHorizontal()?t.horizontalClass:t.verticalClass),t.clickable&&(i.classList.remove(...(t.clickableClass||"").split(" ")),i.removeEventListener("click",S))})),e.pagination.bullets&&e.pagination.bullets.forEach(i=>i.classList.remove(...t.bulletActiveClass.split(" ")))}p("changeDirection",()=>{if(!e.pagination||!e.pagination.el)return;const t=e.params.pagination;let{el:a}=e.pagination;a=T(a),a.forEach(i=>{i.classList.remove(t.horizontalClass,t.verticalClass),i.classList.add(e.isHorizontal()?t.horizontalClass:t.verticalClass)})}),p("init",()=>{e.params.pagination.enabled===!1?l():(s(),v(),f())}),p("activeIndexChange",()=>{typeof e.snapIndex>"u"&&f()}),p("snapIndexChange",()=>{f()}),p("snapGridLengthChange",()=>{v(),f()}),p("destroy",()=>{n()}),p("enable disable",()=>{let{el:t}=e.pagination;t&&(t=T(t),t.forEach(a=>a.classList[e.enabled?"remove":"add"](e.params.pagination.lockClass)))}),p("lock unlock",()=>{f()}),p("click",(t,a)=>{const i=a.target,r=T(e.pagination.el);if(e.params.pagination.el&&e.params.pagination.hideOnClick&&r&&r.length>0&&!i.classList.contains(e.params.pagination.bulletClass)){if(e.navigation&&(e.navigation.nextEl&&i===e.navigation.nextEl||e.navigation.prevEl&&i===e.navigation.prevEl))return;const E=r[0].classList.contains(e.params.pagination.hiddenClass);c(E===!0?"paginationShow":"paginationHide"),r.forEach(B=>B.classList.toggle(e.params.pagination.hiddenClass))}});const o=()=>{e.el.classList.remove(e.params.pagination.paginationDisabledClass);let{el:t}=e.pagination;t&&(t=T(t),t.forEach(a=>a.classList.remove(e.params.pagination.paginationDisabledClass))),s(),v(),f()},l=()=>{e.el.classList.add(e.params.pagination.paginationDisabledClass);let{el:t}=e.pagination;t&&(t=T(t),t.forEach(a=>a.classList.add(e.params.pagination.paginationDisabledClass))),n()};Object.assign(e.pagination,{enable:o,disable:l,render:v,update:f,init:s,destroy:n})}function ne(x){let{swiper:e,extendParams:A,on:p,emit:c,params:d}=x;e.autoplay={running:!1,paused:!1,timeLeft:0},A({autoplay:{enabled:!1,delay:3e3,waitForTransition:!0,disableOnInteraction:!1,stopOnLastSlide:!1,reverseDirection:!1,pauseOnMouseEnter:!1}});let w,C,u=d&&d.autoplay?d.autoplay.delay:3e3,D=d&&d.autoplay?d.autoplay.delay:3e3,L,S=new Date().getTime(),f,v,s,n,o,l,t;function a(g){!e||e.destroyed||!e.wrapperEl||g.target===e.wrapperEl&&(e.wrapperEl.removeEventListener("transitionend",a),!(t||g.detail&&g.detail.bySwiperTouchMove)&&k())}const i=()=>{if(e.destroyed||!e.autoplay.running)return;e.autoplay.paused?f=!0:f&&(D=L,f=!1);const g=e.autoplay.paused?L:S+D-new Date().getTime();e.autoplay.timeLeft=g,c("autoplayTimeLeft",g,g/u),C=requestAnimationFrame(()=>{i()})},r=()=>{let g;return e.virtual&&e.params.virtual.enabled?g=e.slides.find(O=>O.classList.contains("swiper-slide-active")):g=e.slides[e.activeIndex],g?parseInt(g.getAttribute("data-swiper-autoplay"),10):void 0},E=g=>{if(e.destroyed||!e.autoplay.running)return;cancelAnimationFrame(C),i();let N=typeof g>"u"?e.params.autoplay.delay:g;u=e.params.autoplay.delay,D=e.params.autoplay.delay;const O=r();!Number.isNaN(O)&&O>0&&typeof g>"u"&&(N=O,u=O,D=O),L=N;const F=e.params.speed,V=()=>{!e||e.destroyed||(e.params.autoplay.reverseDirection?!e.isBeginning||e.params.loop||e.params.rewind?(e.slidePrev(F,!0,!0),c("autoplay")):e.params.autoplay.stopOnLastSlide||(e.slideTo(e.slides.length-1,F,!0,!0),c("autoplay")):!e.isEnd||e.params.loop||e.params.rewind?(e.slideNext(F,!0,!0),c("autoplay")):e.params.autoplay.stopOnLastSlide||(e.slideTo(0,F,!0,!0),c("autoplay")),e.params.cssMode&&(S=new Date().getTime(),requestAnimationFrame(()=>{E()})))};return N>0?(clearTimeout(w),w=setTimeout(()=>{V()},N)):requestAnimationFrame(()=>{V()}),N},B=()=>{S=new Date().getTime(),e.autoplay.running=!0,E(),c("autoplayStart")},M=()=>{e.autoplay.running=!1,clearTimeout(w),cancelAnimationFrame(C),c("autoplayStop")},m=(g,N)=>{if(e.destroyed||!e.autoplay.running)return;clearTimeout(w),g||(l=!0);const O=()=>{c("autoplayPause"),e.params.autoplay.waitForTransition?e.wrapperEl.addEventListener("transitionend",a):k()};if(e.autoplay.paused=!0,N){o&&(L=e.params.autoplay.delay),o=!1,O();return}L=(L||e.params.autoplay.delay)-(new Date().getTime()-S),!(e.isEnd&&L<0&&!e.params.loop)&&(L<0&&(L=0),O())},k=()=>{e.isEnd&&L<0&&!e.params.loop||e.destroyed||!e.autoplay.running||(S=new Date().getTime(),l?(l=!1,E(L)):E(),e.autoplay.paused=!1,c("autoplayResume"))},y=()=>{if(e.destroyed||!e.autoplay.running)return;const g=q();g.visibilityState==="hidden"&&(l=!0,m(!0)),g.visibilityState==="visible"&&k()},I=g=>{g.pointerType==="mouse"&&(l=!0,t=!0,!(e.animating||e.autoplay.paused)&&m(!0))},h=g=>{g.pointerType==="mouse"&&(t=!1,e.autoplay.paused&&k())},b=()=>{e.params.autoplay.pauseOnMouseEnter&&(e.el.addEventListener("pointerenter",I),e.el.addEventListener("pointerleave",h))},$=()=>{e.el&&typeof e.el!="string"&&(e.el.removeEventListener("pointerenter",I),e.el.removeEventListener("pointerleave",h))},z=()=>{q().addEventListener("visibilitychange",y)},K=()=>{q().removeEventListener("visibilitychange",y)};p("init",()=>{e.params.autoplay.enabled&&(b(),z(),B())}),p("destroy",()=>{$(),K(),e.autoplay.running&&M()}),p("_freeModeStaticRelease",()=>{(s||l)&&k()}),p("_freeModeNoMomentumRelease",()=>{e.params.autoplay.disableOnInteraction?M():m(!0,!0)}),p("beforeTransitionStart",(g,N,O)=>{e.destroyed||!e.autoplay.running||(O||!e.params.autoplay.disableOnInteraction?m(!0,!0):M())}),p("sliderFirstMove",()=>{if(!(e.destroyed||!e.autoplay.running)){if(e.params.autoplay.disableOnInteraction){M();return}v=!0,s=!1,l=!1,n=setTimeout(()=>{l=!0,s=!0,m(!0)},200)}}),p("touchEnd",()=>{if(!(e.destroyed||!e.autoplay.running||!v)){if(clearTimeout(n),clearTimeout(w),e.params.autoplay.disableOnInteraction){s=!1,v=!1;return}s&&e.params.cssMode&&k(),s=!1,v=!1}}),p("slideChange",()=>{e.destroyed||!e.autoplay.running||(o=!0)}),Object.assign(e.autoplay,{start:B,stop:M,pause:m,resume:k})}const oe=({items:x,renderItem:e,spaceBetween:A=30,loop:p=!0,className:c="",slidesPerViewDesktop:d=3})=>{const w=P.useRef(null),C=P.useRef(null),u=P.useRef(null),[D,L]=P.useState(!1),[S,f]=P.useState(!1),[v,s]=P.useState(window.innerWidth<=768),[n,o]=P.useState(!1);P.useEffect(()=>{const a=()=>{s(window.innerWidth<=768)};return window.addEventListener("resize",a),()=>window.removeEventListener("resize",a)},[]),P.useEffect(()=>{u.current&&(u.current.params.navigation.prevEl=w.current,u.current.params.navigation.nextEl=C.current,u.current.navigation.init(),u.current.navigation.update())},[]);const l=a=>{L(a.isBeginning),f(a.isEnd)},t=a=>{n||(o(!0),u.current&&(a==="prev"?D?u.current.slideToLoop(x.length-1):u.current.slidePrev():a==="next"&&(S?u.current.slideToLoop(0):u.current.slideNext())))};return P.useEffect(()=>{if(u.current){const a=u.current,i=()=>o(!0),r=()=>o(!1);return a.on("transitionStart",i),a.on("transitionEnd",r),()=>{a.off("transitionStart",i),a.off("transitionEnd",r)}}},[]),P.useEffect(()=>{u.current&&(u.current.autoplay.stop(),v&&(u.current.params.autoplay={delay:3e3,disableOnInteraction:!1},u.current.autoplay.start()))},[v]),H.jsxs("div",{className:`swiper-container ${c}`,children:[H.jsx(Z,{cssMode:!1,navigation:{prevEl:w.current,nextEl:C.current},speed:500,autoplay:{delay:3e3,disableOnInteraction:!1},mousewheel:!0,keyboard:!0,pagination:v?{clickable:!0}:!1,modules:[ae,ie,te,ne],slidesPerView:v?1:d,spaceBetween:A,loop:p,className:"mySwiper",onSwiper:a=>{u.current=a},onSlideChange:l,children:x==null?void 0:x.map((a,i)=>H.jsx(ee,{children:e(a,i)},i))}),H.jsxs("div",{className:"hidden justify-end gap-8 px-10 pt-8 lg:flex",children:[H.jsx("button",{ref:w,className:`p-4 rounded-full custom-prev-button flex ${D?"bg-gray-300 disabled cursor-not-allowed":"bg-[#FDC114]"}`,onClick:()=>t("prev"),disabled:D||n,children:H.jsx(U,{name:"leftIcon",className:"h-6 w-6"})}),H.jsx("button",{ref:C,className:"p-4 rounded-full custom-next-button flex bg-[#FDC114]",onClick:()=>t("next"),disabled:n,children:H.jsx(U,{name:"rightIcon",className:"h-6 w-6"})})]})]})};export{oe as C};
