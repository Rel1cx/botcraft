import{U as hn,j as h,__tla as yn}from"./index-8e297aa2.js";import{a as d,r as ce}from"./react-aeb67c7a.js";import{h as bn,i as P,_ as j,j as y,k as gn,l as ct,m as xn,n as lt,o as Ct,p as En,q as H,s as Sn,t as le,v as wn,w as jn,x as B,y as V,z as q,A as X,C as dt,D as tt,E as ft,F as kt,G as Cn,H as kn,J as N,K as D,L as _n,M as On,N as Pn,O as An,Q as Fn,R as _t,S as Ln,U,V as Mn,W as de,X as et,Y as Ot,Z as fe,$ as Rn,a0 as $n,a1 as Nn,a2 as pe,a3 as Tn,a4 as Pt,a5 as Vn,a6 as nt,a7 as qn,a8 as In,a9 as me,aa as Bn,ab as Dn,__tla as Yn}from"./BotArea-c5b023df.js";import{c as ve}from"./clsx.m-1229b3e0.js";import"https://cdn.jsdelivr.net/npm/rsup-progress@3.1.1/dist/esm/index.js";import"https://cdn.jsdelivr.net/npm/web-vitals@3.3.2/+esm";import{__tla as Hn}from"./Text-a6de795f.js";let he,Wn=Promise.all([(()=>{try{return yn}catch{}})(),(()=>{try{return Yn}catch{}})(),(()=>{try{return Hn}catch{}})()]).then(async()=>{var ye=()=>()=>{};function be(t,e=gn){const n=()=>{if(!t)return;const r=t.getState(),o=typeof e=="function"?e:null,i=typeof e=="string"?e:null;if(o)return o(r);if(i&&ct(r,i))return r[i]};return hn.useSyncExternalStore(t?.subscribe||ye,n,n)}function At(t,e,n,r){const o=ct(e,n)?e[n]:void 0,i=xn({value:o,setValue:r?e[r]:void 0});P(()=>t.sync((s,a)=>{const{value:u,setValue:v}=i.current;v&&s[n]!==a[n]&&s[n]!==u&&v(s[n])},[n]),[t,n]),P(()=>t.sync(()=>{o!==void 0&&t.setState(n,o)},[n]),[t,n,o])}function Ft(t){const e=bn(t);P(()=>e.init(),[e]);const n=d.useCallback(r=>be(e,r),[e]);return d.useMemo(()=>j(y({},e),{useState:n}),[e,n])}function rt(t,...e){let n=t,r=n,o=Symbol(),i=!1;const s=new Set,a=new Set,u=new Set,v=new Set,l=new WeakMap,b=new WeakMap,M=f=>(a.add(f),()=>a.delete(f)),R=()=>{if(i)return Ct;if(!e.length)return Ct;i=!0;const f=En(n).map(x=>H(...e.map(E=>{var z,_;const $=(z=E?.getState)==null?void 0:z.call(E);if($&&ct($,x))return(_=E?.sync)==null?void 0:_.call(E,Y=>S(x,Y[x]),[x])}))),g=[];a.forEach(x=>g.push(x()));const C=e.map(x=>{var E;return(E=x?.init)==null?void 0:E.call(x)});return H(...f,...g,...C,()=>{i=!1})},A=(f,g,C=!1)=>{const x=C?v:u;return x.add(f),b.set(f,g),()=>{var E;(E=l.get(f))==null||E(),l.delete(f),b.delete(f),x.delete(f)}},F=(f,g)=>A(f,g),c=(f,g)=>(l.set(f,f(n,n)),A(f,g)),m=(f,g)=>(l.set(f,f(n,r)),A(f,g,!0)),k=()=>n,S=(f,g)=>{if(!ct(n,f))return;const C=Sn(g,n[f]);if(C===n[f])return;e.forEach(_=>{var $;($=_?.setState)==null||$.call(_,f,C)});const x=n;n=le(lt({},n),{[f]:C});const E=Symbol();o=E,s.add(f);const z=(_,$,Y)=>{var J;const Q=b.get(_),at=it=>Y?Y.has(it):it===f;(!Q||Q.some(at))&&((J=l.get(_))==null||J(),l.set(_,_(n,$)))};u.forEach(_=>z(_,x)),queueMicrotask(()=>{if(o!==E)return;const _=n;v.forEach($=>{z($,r,s)}),r=_,s.clear()})},I={setup:M,init:R,subscribe:F,sync:c,syncBatch:m,getState:k,setState:S,pick:(...f)=>rt(wn(n,f),I),omit:(...f)=>rt(jn(n,f),I)};return I}function ge(...t){const e=t.reduce((n,r)=>{var o;const i=(o=r?.getState)==null?void 0:o.call(r);return i?lt(lt({},n),i):n},{});return rt(e,...t)}var Lt=B(t=>(t=j(y({},t),{style:y({border:0,clip:"rect(0 0 0 0)",height:"1px",margin:"-1px",overflow:"hidden",padding:0,position:"absolute",whiteSpace:"nowrap",width:"1px"},t.style)}),t));V(t=>{const e=Lt(t);return q("span",e)});var xe=B(t=>(t=j(y({"data-focus-trap":"",tabIndex:0,"aria-hidden":!0},t),{style:y({position:"fixed",top:0,left:0},t.style)}),t=Lt(t),t)),ot=V(t=>{const e=xe(t);return q("span",e)});function Mt(t,e){const n=setTimeout(e,t);return()=>clearTimeout(n)}function Ee(t){let e=requestAnimationFrame(()=>{e=requestAnimationFrame(t)});return()=>cancelAnimationFrame(e)}function Rt(...t){return t.join(", ").split(", ").reduce((e,n)=>{const r=parseFloat(n||"0s")*1e3;return r>e?r:e},0)}function $t(t,e,n){return!n&&e!==!1&&(!t||!!e)}var pt=B(t=>{var e=t,{store:n,alwaysVisible:r}=e,o=X(e,["store","alwaysVisible"]);const i=dt(o.id),[s,a]=d.useState(null),u=n.useState("open"),v=n.useState("mounted"),l=n.useState("animated"),b=n.useState("contentElement");P(()=>{if(l){if(!b?.isConnected){a(null);return}return Ee(()=>{a(u?"enter":"leave")})}},[l,b,u]),P(()=>{if(!l||!b||!s||s==="enter"&&!u||s==="leave"&&u)return;if(typeof l=="number")return Mt(l,n.stopAnimation);const{transitionDuration:A,animationDuration:F,transitionDelay:c,animationDelay:m}=getComputedStyle(b),k=Rt(c,m),S=Rt(A,F),I=k+S;if(I)return Mt(I,n.stopAnimation)},[l,b,u,s]);const M=$t(v,o.hidden,r),R=M?j(y({},o.style),{display:"none"}):o.style;return o=j(y({id:i,"data-enter":s==="enter"?"":void 0,"data-leave":s==="leave"?"":void 0,hidden:M},o),{ref:tt(i?n.setContentElement:null,o.ref),style:R}),o});V(t=>{const e=pt(t);return q("div",e)});function Nt(t={}){var e;const n=ge(t.store,(e=t.disclosure)==null?void 0:e.omit("contentElement","disclosureElement")),r=n?.getState(),o=ft(t.open,r?.open,t.defaultOpen,!1),i=ft(t.animated,r?.animated,!1),s={open:o,animated:i,animating:!!i&&o,mounted:o,contentElement:ft(r?.contentElement,null),disclosureElement:ft(r?.disclosureElement,null)},a=rt(s,n);return a.setup(()=>a.sync(u=>{u.animated||a.setState("animating",!1)},["animated","animating"])),a.setup(()=>a.sync((u,v)=>{if(!u.animated)return;const l=u===v?u.open:u.open!==v.open;a.setState("animating",l)},["open","animated"])),a.setup(()=>a.sync(u=>{a.setState("mounted",u.open||u.animating)},["open","animating"])),le(lt({},a),{setOpen:u=>a.setState("open",u),show:()=>a.setState("open",!0),hide:()=>a.setState("open",!1),toggle:()=>a.setState("open",u=>!u),stopAnimation:()=>a.setState("animating",!1),setContentElement:u=>a.setState("contentElement",u),setDisclosureElement:u=>a.setState("disclosureElement",u)})}function Tt(t){return{}}function Vt(t,e){return At(t,e,"open","setOpen"),At(t,e,"animated"),t}function Se(t={}){const e=Tt(),n=Ft(()=>Nt(y(y({},t),e)));return Vt(n,t)}var qt=d.createContext(void 0),It=d.createContext(void 0),Bt=d.createContext(void 0),we=B(t=>{var e=t,n=X(e,["store"]);const r=d.useContext(Bt),o=dt(n.id);return P(()=>(r?.(o),()=>r?.(void 0)),[r,o]),n=y({id:o},n),n}),je=V(t=>{const e=we(t);return q("p",e)}),Ce=B(t=>{var e=t,{store:n}=e,r=X(e,["store"]);const o=d.useContext(qt);n=n||o;const i=r.onClick,s=kt(u=>{i?.(u),!u.defaultPrevented&&n?.hide()}),a=d.useMemo(()=>h.jsxs("svg",{"aria-label":"Dismiss popup",display:"block",fill:"none",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5pt",viewBox:"0 0 16 16",height:"1em",width:"1em",children:[h.jsx("line",{x1:"4",y1:"4",x2:"12",y2:"12"}),h.jsx("line",{x1:"4",y1:"12",x2:"12",y2:"4"})]}),[]);return r=j(y({"data-dialog-dismiss":"",children:a},r),{onClick:s}),r=Cn(r),r}),Dt=V(t=>{const e=Ce(t);return q("button",e)}),mt=d.createContext(0),Yt=B(t=>{const e=d.useRef(null),n=d.useContext(mt)||1,r=`h${n}`,o=kn(e,t.as||r),i=d.useMemo(()=>!!o&&/^h\d$/.test(o),[o]);return t=j(y({as:r,role:i?void 0:"heading","aria-level":i?void 0:n},t),{ref:tt(e,t.ref)}),t});V(t=>{const e=Yt(t);return q("h1",e)});var ke=B(t=>{var e=t,n=X(e,["store"]);const r=d.useContext(It),o=dt(n.id);return P(()=>(r?.(o),()=>r?.(void 0)),[r,o]),n=y({id:o},n),n=Yt(n),n}),_e=V(t=>{const e=ke(t);return q("h1",e)});function vt(t,...e){if(!t)return!1;const n=t.getAttribute("data-backdrop");return n==null?!1:n===""||n==="true"||!e.length?!0:e.some(r=>n===r)}var ht=new WeakMap;function st(t,e,n){ht.has(t)||ht.set(t,new Map);const r=ht.get(t),o=r.get(e);if(!o)return r.set(e,n()),()=>{var a;(a=r.get(e))==null||a(),r.delete(e)};const i=n(),s=()=>{i(),o(),r.delete(e)};return r.set(e,s),()=>{r.get(e)===s&&(i(),r.set(e,o))}}function Ht(t,e,n){return st(t,e,()=>{const r=t.getAttribute(e);return t.setAttribute(e,n),()=>{r==null?t.removeAttribute(e):t.setAttribute(e,r)}})}function Z(t,e,n){return st(t,e,()=>{const r=e in t,o=t[e];return t[e]=n,()=>{r?t[e]=o:delete t[e]}})}function yt(t,e){return t?st(t,"style",()=>{const n=t.style.cssText;return Object.assign(t.style,e),()=>{t.style.cssText=n}}):()=>{}}function Oe(t,e,n){return t?st(t,e,()=>{const r=t.style.getPropertyValue(e);return t.style.setProperty(e,n),()=>{r?t.style.setProperty(e,r):t.style.removeProperty(e)}}):()=>{}}var Pe=["SCRIPT","STYLE"];function Ae(t,e){return Pe.includes(t.tagName)?!1:!e.some(n=>n&&D(t,n))}function bt(t,e,n){for(let r of t){if(!r?.isConnected)continue;const o=t.some(s=>!s||s===r?!1:s.contains(r)),i=N(r);for(;r.parentElement&&r!==i.body;){if(n?.(r.parentElement),!o)for(const s of r.parentElement.children)Ae(s,t)&&e(s);r=r.parentElement}}}function G(t="",e=!1){return`__ariakit-dialog-${e?"ancestor":"outside"}${t?`-${t}`:""}`}function Fe(t,e=""){return H(Z(t,G(),!0),Z(t,G(e),!0))}function Wt(t,e=""){return H(Z(t,G("",!0),!0),Z(t,G(e,!0),!0))}function gt(t,e){const n=G(e,!0);if(t[n])return!0;const r=G(e);do{if(t[r])return!0;if(!t.parentElement)return!1;t=t.parentElement}while(!0)}function xt(t,...e){const n=[],r=e.map(o=>o?.id);return bt(e,o=>{vt(o,...r)||n.unshift(Fe(o,t))},o=>n.unshift(Wt(o,t))),()=>{n.forEach(o=>o())}}var zt=V(t=>q("div",t));function Le({store:t,backdrop:e,backdropProps:n,alwaysVisible:r,hidden:o}){const i=d.useRef(null),s=Se({disclosure:t}),a=t.useState("contentElement");P(()=>{const l=i.current,b=a;l&&b&&(l.style.zIndex=getComputedStyle(b).zIndex)},[a]),P(()=>{const l=a?.id;if(!l)return;const b=i.current;if(b)return Wt(b,l)},[a]),o!=null&&(n=j(y({},n),{hidden:o}));const u=pt(j(y({store:s,role:"presentation","data-backdrop":a?.id||"",alwaysVisible:r},n),{ref:tt(n?.ref,i),style:y({position:"fixed",top:0,right:0,bottom:0,left:0},n?.style)}));if(!e)return null;if(d.isValidElement(e))return h.jsx(zt,j(y({},u),{render:e}));const v=typeof e!="boolean"?e:"div";return h.jsx(zt,j(y({},u),{render:h.jsx(v,{})}))}function Xt(t){return Ht(t,"aria-hidden","true")}function Me(...t){const e=[],n=t.map(r=>r?.id);return bt(t,r=>{vt(r,...n)||e.unshift(Xt(r))}),()=>{e.forEach(r=>r())}}function Gt(){return"inert"in HTMLElement.prototype}function Re(t){return"style"in t?Gt()?Z(t,"inert",!0):H(Xt(t),yt(t,{pointerEvents:"none",userSelect:"none",cursor:"default"})):Ct}function $e(...t){const e=[],n=t.map(r=>r?.id);return Gt()||_n().forEach(r=>{t.some(o=>o&&D(o,r))||e.unshift(Ht(r,"tabindex","-1"))}),bt(t,r=>{vt(r,...n)||e.unshift(Re(r))}),()=>{e.forEach(r=>r())}}function Ne({attribute:t,contentId:e,contentElement:n,enabled:r}){const[o,i]=On(),s=d.useCallback(()=>{if(!r||!n)return!1;const{body:a}=N(n),u=a.getAttribute(t);return!u||u===e},[o,r,n,t,e]);return d.useEffect(()=>{if(!r||!e||!n)return;const{body:a}=N(n);if(s())return a.setAttribute(t,e),()=>a.removeAttribute(t);const u=new MutationObserver(()=>ce.flushSync(i));return u.observe(a,{attributeFilter:[t]}),()=>u.disconnect()},[o,r,e,n,s,t]),s}function Te(t){const e=t.getBoundingClientRect().left;return Math.round(e)+t.scrollLeft?"paddingLeft":"paddingRight"}function Ve(t,e,n){const r=Ne({attribute:"data-dialog-prevent-body-scroll",contentElement:t,contentId:e,enabled:n});d.useEffect(()=>{if(!r()||!t)return;const o=N(t),i=Pn(t),{documentElement:s,body:a}=o,u=s.style.getPropertyValue("--scrollbar-width"),v=u?parseInt(u):i.innerWidth-s.clientWidth,l=()=>Oe(s,"--scrollbar-width",`${v}px`),b=Te(s),M=()=>yt(a,{overflow:"hidden",[b]:`${v}px`}),R=()=>{var F,c;const{scrollX:m,scrollY:k,visualViewport:S}=i,I=(F=S?.offsetLeft)!=null?F:0,f=(c=S?.offsetTop)!=null?c:0,g=yt(a,{position:"fixed",overflow:"hidden",top:`${-(k-Math.floor(f))}px`,left:`${-(m-Math.floor(I))}px`,right:"0",[b]:`${v}px`});return()=>{g(),i.scrollTo(m,k)}},A=An()&&!Fn();return H(l(),A?R():M())},[r,t])}var Kt=d.createContext({});function qe(t){const e=d.useContext(Kt),[n,r]=d.useState([]),o=d.useCallback(s=>{var a;return r(u=>[...u,s]),H((a=e.add)==null?void 0:a.call(e,s),()=>{r(u=>u.filter(v=>v!==s))})},[e]);P(()=>t.sync(s=>{var a;if(s.open&&s.contentElement)return(a=e.add)==null?void 0:a.call(e,t)},["open","contentElement"]),[t,e]),P(()=>{var s;return(s=e.store)==null?void 0:s.sync(a=>{a.open||t.hide()},["open"])},[e,t]);const i=d.useMemo(()=>({store:t,add:o}),[t,o]);return{wrapElement:d.useCallback(s=>h.jsx(Kt.Provider,{value:i,children:s}),[i]),nestedDialogs:n}}function Ie(t){const e=d.useRef();return d.useEffect(()=>{if(!t){e.current=null;return}return _t("mousedown",n=>{e.current=n.target},!0)},[t]),e}function Be(t){return t.tagName==="HTML"?!0:D(N(t).body,t)}function De(t,e){if(!t)return!1;if(D(t,e))return!0;const n=e.getAttribute("aria-activedescendant");if(n){const r=N(t).getElementById(n);if(r)return D(t,r)}return!1}function Ye(t,e){if(!("clientY"in t))return!1;const n=e.getBoundingClientRect();return n.width===0||n.height===0?!1:n.top<=t.clientY&&t.clientY<=n.top+n.height&&n.left<=t.clientX&&t.clientX<=n.left+n.width}function Et({store:t,type:e,listener:n,capture:r}){const o=kt(n),i=t.useState("open");d.useEffect(()=>i?_t(e,s=>{const{contentElement:a,disclosureElement:u}=t.getState(),v=s.target;a&&v&&Be(v)&&(D(a,v)||De(u,v)||v.hasAttribute("data-focus-trap")||Ye(s,a)||gt(v,a.id)&&o(s))},r):void 0,[i,r])}function St(t,e){return typeof t=="function"?t(e):!!t}function He(t,e){const n=t.useState("open"),r=Ie(n),o={store:t,capture:!0};Et(j(y({},o),{type:"click",listener:i=>{const{contentElement:s}=t.getState(),a=r.current;a&&Ln(a)&&gt(a,s?.id)&&St(e,i)&&t.hide()}})),Et(j(y({},o),{type:"focusin",listener:i=>{const{contentElement:s}=t.getState();s&&i.target!==N(s)&&St(e,i)&&t.hide()}})),Et(j(y({},o),{type:"contextmenu",listener:i=>{St(e,i)&&t.hide()}}))}function We(t,e){const n=N(t).createElement("button");return n.type="button",n.tabIndex=-1,n.textContent="Dismiss popup",Object.assign(n.style,{border:"0px",clip:"rect(0 0 0 0)",height:"1px",margin:"-1px",overflow:"hidden",padding:"0px",position:"absolute",whiteSpace:"nowrap",width:"1px"}),n.addEventListener("click",e),t.prepend(n),()=>{n.removeEventListener("click",e),n.remove()}}var Ut=B(t=>{var e=t,{autoFocusOnShow:n=!0}=e,r=X(e,["autoFocusOnShow"]);return r=U(r,o=>h.jsx(Mn.Provider,{value:n,children:o}),[n]),r});V(t=>{const e=Ut(t);return q("div",e)});function ze({level:t,children:e}){const n=d.useContext(mt),r=Math.max(Math.min(t||n+1,6),1);return h.jsx(mt.Provider,{value:r,children:e})}var Zt=d.createContext(null);function Xe(t){return N(t).body}function Ge(t,e){return e?typeof e=="function"?e(t):e:N(t).createElement("div")}function Ke(t="id"){return`${t?`${t}-`:""}${Math.random().toString(36).substr(2,6)}`}function W(t){queueMicrotask(()=>{t?.focus()})}var Jt=B(t=>{var e=t,{preserveTabOrder:n,portalElement:r,portalRef:o,portal:i=!0}=e,s=X(e,["preserveTabOrder","portalElement","portalRef","portal"]);const a=d.useRef(null),u=tt(a,s.ref),v=d.useContext(Zt),[l,b]=d.useState(null),M=d.useRef(null),R=d.useRef(null),A=d.useRef(null),F=d.useRef(null);return P(()=>{const c=a.current;if(!c||!i){b(null);return}const m=Ge(c,r);if(!m){b(null);return}const k=m.isConnected;if(k||(v||Xe(c)).appendChild(m),m.id||(m.id=c.id?`portal/${c.id}`:Ke()),b(m),de(o,m),!k)return()=>{m.remove(),de(o,null)}},[i,r,v,o]),d.useEffect(()=>{if(!l||!n)return;let c=0;const m=k=>{if(et(k)){if(k.type==="focusin")return Rn(l);cancelAnimationFrame(c),c=requestAnimationFrame(()=>{$n(l,!0)})}};return l.addEventListener("focusin",m,!0),l.addEventListener("focusout",m,!0),()=>{l.removeEventListener("focusin",m,!0),l.removeEventListener("focusout",m,!0)}},[l,n]),s=U(s,c=>(c=h.jsx(Zt.Provider,{value:l||v,children:c}),i?l?(c=h.jsxs(h.Fragment,{children:[n&&l&&h.jsx(ot,{ref:R,className:"__focus-trap-inner-before",onFocus:m=>{et(m,l)?W(Ot()):W(M.current)}}),c,n&&l&&h.jsx(ot,{ref:A,className:"__focus-trap-inner-after",onFocus:m=>{et(m,l)?W(fe()):W(F.current)}})]}),l&&(c=ce.createPortal(c,l)),c=h.jsxs(h.Fragment,{children:[n&&l&&h.jsx(ot,{ref:M,className:"__focus-trap-outer-before",onFocus:m=>{m.relatedTarget!==F.current&&et(m,l)?W(R.current):W(fe())}}),n&&h.jsx("span",{"aria-owns":l?.id,style:{position:"fixed"}}),c,n&&l&&h.jsx(ot,{ref:F,className:"__focus-trap-outer-after",onFocus:m=>{if(et(m,l))W(A.current);else{const k=Ot();if(k===R.current){requestAnimationFrame(()=>{var S;return(S=Ot())==null?void 0:S.focus()});return}W(k)}}})]}),c):h.jsx("span",{ref:u,id:s.id,style:{position:"fixed"},hidden:!0}):c),[l,v,i,s.id,n]),s=j(y({},s),{ref:u}),s});V(t=>{const e=Jt(t);return q("div",e)});var Ue=me();function Ze(t){const e=pe();return!e||t&&D(t,e)?!1:!!nt(e)}function Qt(t,e=!1){if(!t)return null;const n="current"in t?t.current:t;return n?e?nt(n)?n:null:n:null}var Je=B(t=>{var e=t,{store:n,focusable:r=!0,modal:o=!0,portal:i=!!o,backdrop:s=!!o,backdropProps:a,hideOnEscape:u=!0,hideOnInteractOutside:v=!0,getPersistentElements:l,preventBodyScroll:b=!!o,autoFocusOnShow:M=!0,autoFocusOnHide:R=!0,initialFocus:A,finalFocus:F}=e,c=X(e,["store","focusable","modal","portal","backdrop","backdropProps","hideOnEscape","hideOnInteractOutside","getPersistentElements","preventBodyScroll","autoFocusOnShow","autoFocusOnHide","initialFocus","finalFocus"]);const m=d.useRef(null),{portalRef:k,domReady:S}=Nn(i,c.portalRef),I=c.preserveTabOrder,f=n.useState(p=>I&&!o&&p.mounted),g=dt(c.id),C=n.useState("open"),x=n.useState("mounted"),E=n.useState("contentElement"),z=$t(x,c.hidden,c.alwaysVisible);Ve(E,g,b&&!z),He(n,v);const{wrapElement:_,nestedDialogs:$}=qe(n);c=U(c,_,[_]),P(()=>{if(!C)return;const p=m.current,w=pe(p,!0);w&&w.tagName!=="BODY"&&(p&&D(p,w)||n.setDisclosureElement(w))},[C]),Ue&&d.useEffect(()=>{if(!x)return;const{disclosureElement:p}=n.getState();if(!p||!Tn(p))return;const w=()=>{let T=!1;const L=()=>{T=!0},O={capture:!0,once:!0};p.addEventListener("focusin",L,O),Bn(p,"mouseup",()=>{p.removeEventListener("focusin",L,!0),!T&&Dn(p)})};return p.addEventListener("mousedown",w),()=>{p.removeEventListener("mousedown",w)}},[x]);const Y=o||i&&f&&me();d.useEffect(()=>{if(!x||!S)return;const p=m.current;if(!(!p||!Y||p.querySelector("[data-dialog-dismiss]")))return We(p,n.hide)},[x,S,Y]);const J=kt(l);P(()=>{if(!S||!g||!C)return;const{disclosureElement:p}=n.getState(),w=m.current,T=J()||[],L=[w,...T,...$.map(O=>O.getState().contentElement)];return Y?o?H(xt(g,...L),$e(...L)):H(xt(g,p,...L),Me(...L)):xt(g,p,...L)},[S,g,C,n,J,$,Y,o]);const Q=!!M,at=Pt(M),[it,dn]=d.useState(!1);d.useEffect(()=>{if(!C||!Q||!S||!E?.isConnected)return;const p=Qt(A,!0)||E.querySelector("[data-autofocus=true],[autofocus]")||Vn(E,!0,i&&f)||E,w=nt(p);at(w?p:null)&&(dn(!0),queueMicrotask(()=>p.focus()))},[C,Q,S,E,A,i,f,at]);const ee=!!R,ne=Pt(R),[re,oe]=d.useState(!1);d.useEffect(()=>{if(C)return oe(!0),()=>oe(!1)},[C]),P(()=>{if(!re||!ee)return;const p=m.current,w=(T=!0)=>{if(Ze(p))return;const{disclosureElement:L}=n.getState();let O=Qt(F)||L;if(O?.id){const K=N(O),jt=`[aria-activedescendant="${O.id}"]`,ut=K.querySelector(jt);ut&&(O=ut)}if(O&&!nt(O)){const K=qn(O,"[data-dialog]");if(K&&K.id){const jt=N(K),ut=`[aria-controls~="${K.id}"]`,ue=jt.querySelector(ut);ue&&(O=ue)}}const wt=O&&nt(O);if(!wt&&T){requestAnimationFrame(()=>w(!1));return}ne(wt?O:null)&&wt&&O?.focus()};return C?w:w()},[re,C,ee,F,ne]);const se=Pt(u);d.useEffect(()=>!S||!x?void 0:_t("keydown",p=>{if(p.key!=="Escape"||p.defaultPrevented)return;const w=m.current;if(!w||gt(w))return;const T=p.target;if(!T)return;const{disclosureElement:L}=n.getState();(()=>T.tagName==="BODY"||D(w,T)?!0:L?!!D(L,T):!1)()&&se(p)&&n.hide()}),[x,S,se]),c=U(c,p=>h.jsx(ze,{level:o?1:void 0,children:p}),[o]);const ae=c.hidden,ie=c.alwaysVisible;c=U(c,p=>s?h.jsxs(h.Fragment,{children:[h.jsx(Le,{store:n,backdrop:s,backdropProps:a,hidden:ae,alwaysVisible:ie}),p]}):p,[n,s,a,ae,ie]);const[fn,pn]=d.useState(),[mn,vn]=d.useState();return c=U(c,p=>h.jsx(qt.Provider,{value:n,children:h.jsx(It.Provider,{value:pn,children:h.jsx(Bt.Provider,{value:vn,children:p})})}),[n]),c=j(y({id:g,"data-dialog":"",role:"dialog",tabIndex:r?-1:void 0,"aria-labelledby":fn,"aria-describedby":mn},c),{ref:tt(m,c.ref)}),c=Ut(j(y({},c),{autoFocusOnShow:it})),c=pt(y({store:n},c)),c=In(j(y({},c),{focusable:r})),c=Jt(j(y({portal:i},c),{portalRef:k,preserveTabOrder:f})),c}),Qe=V(t=>{const e=Je(t);return q("div",e)});function tn(t={}){return Nt(t)}function en(t){return Tt()}function nn(t,e){return Vt(t,e)}function rn(t={}){const e=en(),n=Ft(()=>tn(y(y({},t),e)));return nn(n,t)}var on="_11nlp4h3",te="_11nlp4h0",sn="_11nlp4h7",an="_11nlp4h2",un="_11nlp4h4",cn="_11nlp4h5",ln="_11nlp4h1";he=d.memo(({cancelLabel:t="Cancel",confirmLabel:e="OK",danger:n,description:r="Are you sure?",onCancel:o,onClose:i,onConfirm:s,open:a=!1,title:u="Confirm"})=>{const v=rn({open:a,setOpen(l){l||i?.()}});return h.jsxs(Qe,{store:v,backdrop:h.jsx("div",{className:on}),className:un,children:[u&&h.jsx(_e,{className:cn,children:u}),!!r&&h.jsx(je,{children:r}),h.jsxs("div",{className:sn,children:[!!e&&h.jsx(Dt,{className:ve(te,n&&an),onClick:s,children:e}),!!t&&h.jsx(Dt,{className:ve(te,ln),onClick:o,children:t})]})]})})});export{Wn as __tla,he as default};
