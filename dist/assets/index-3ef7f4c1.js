import{c as Mt,u as rt,s as Tt,i as Bt,g as Vt,a as st,b as kt,f as Dt,d as Be,e as H,r as B,k as Lt,h as Ft,j as Ut,l as ot,m as at,n as Wt,o as S,p as d,q as P,t as i,v as le,w as it,z as Gt,_ as Oe,x as lt,y as ut,A as ct,B as Kt,C as Ht,D as Yt,E as Zt,U as K,R as ue,F as pt,G as Jt,K as Xt,H as Qt}from"./index-f6597d30.js";import{a as p,b as A}from"./react-c99c05cb.js";function ds(e){return e}function ft(e){var t,n,r="";if(typeof e=="string"||typeof e=="number")r+=e;else if(typeof e=="object")if(Array.isArray(e))for(t=0;t<e.length;t++)e[t]&&(n=ft(e[t]))&&(r&&(r+=" "),r+=n);else for(t in e)e[t]&&(r&&(r+=" "),r+=t);return r}function en(){for(var e=0,t,n,r="";e<arguments.length;)(t=arguments[e++])&&(n=ft(t))&&(r&&(r+=" "),r+=n);return r}const tn={app:100,modal:200,popover:300,overlay:400,max:9999};function nn(e){return tn[e]}function rn(e,t){const n=p.useRef();return(!n.current||t.length!==n.current.prevDeps.length||n.current.prevDeps.map((r,s)=>r===t[s]).indexOf(!1)>=0)&&(n.current={v:e(),prevDeps:[...t]}),n.current.v}const sn=Mt({key:"mantine",prepend:!0});function on(){return rt()||sn}var an=Object.defineProperty,Ve=Object.getOwnPropertySymbols,ln=Object.prototype.hasOwnProperty,un=Object.prototype.propertyIsEnumerable,ke=(e,t,n)=>t in e?an(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,cn=(e,t)=>{for(var n in t||(t={}))ln.call(t,n)&&ke(e,n,t[n]);if(Ve)for(var n of Ve(t))un.call(t,n)&&ke(e,n,t[n]);return e};const be="ref";function pn(e){let t;if(e.length!==1)return{args:e,ref:t};const[n]=e;if(!(n instanceof Object))return{args:e,ref:t};if(!(be in n))return{args:e,ref:t};t=n[be];const r=cn({},n);return delete r[be],{args:[r],ref:t}}const{cssFactory:fn}=(()=>{function e(n,r,s){const o=[],a=Vt(n,o,s);return o.length<2?s:a+r(o)}function t(n){const{cache:r}=n,s=(...a)=>{const{ref:l,args:c}=pn(a),u=Tt(c,r.registered);return Bt(r,u,!1),`${r.key}-${u.name}${l===void 0?"":` ${l}`}`};return{css:s,cx:(...a)=>e(r.registered,s,en(a))}}return{cssFactory:t}})();function dt(){const e=on();return rn(()=>fn({cache:e}),[e])}function dn({cx:e,classes:t,context:n,classNames:r,name:s,cache:o}){const a=n.reduce((l,c)=>(Object.keys(c.classNames).forEach(u=>{typeof l[u]!="string"?l[u]=`${c.classNames[u]}`:l[u]=`${l[u]} ${c.classNames[u]}`}),l),{});return Object.keys(t).reduce((l,c)=>(l[c]=e(t[c],a[c],r!=null&&r[c],Array.isArray(s)?s.filter(Boolean).map(u=>`${(o==null?void 0:o.key)||"mantine"}-${u}-${c}`).join(" "):s?`${(o==null?void 0:o.key)||"mantine"}-${s}-${c}`:null),l),{})}var _n=Object.defineProperty,De=Object.getOwnPropertySymbols,mn=Object.prototype.hasOwnProperty,yn=Object.prototype.propertyIsEnumerable,Le=(e,t,n)=>t in e?_n(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,we=(e,t)=>{for(var n in t||(t={}))mn.call(t,n)&&Le(e,n,t[n]);if(De)for(var n of De(t))yn.call(t,n)&&Le(e,n,t[n]);return e};function xe(e,t){return t&&Object.keys(t).forEach(n=>{e[n]?e[n]=we(we({},e[n]),t[n]):e[n]=we({},t[n])}),e}function Fe(e,t,n,r){const s=o=>typeof o=="function"?o(t,n||{},r):o||{};return Array.isArray(e)?e.map(o=>s(o.styles)).reduce((o,a)=>xe(o,a),{}):s(e)}function vn({ctx:e,theme:t,params:n,variant:r,size:s}){return e.reduce((o,a)=>(a.variants&&r in a.variants&&xe(o,a.variants[r](t,n,{variant:r,size:s})),a.sizes&&s in a.sizes&&xe(o,a.sizes[s](t,n,{variant:r,size:s})),o),{})}function gn(e){const t=typeof e=="function"?e:()=>e;function n(r,s){const o=st(),a=kt(s==null?void 0:s.name),l=rt(),c={variant:s==null?void 0:s.variant,size:s==null?void 0:s.size},{css:u,cx:f}=dt(),m=t(o,r,c),y=Fe(s==null?void 0:s.styles,o,r,c),h=Fe(a,o,r,c),v=vn({ctx:a,theme:o,params:r,variant:s==null?void 0:s.variant,size:s==null?void 0:s.size}),b=Object.fromEntries(Object.keys(m).map(g=>{const w=f({[u(m[g])]:!(s!=null&&s.unstyled)},u(v[g]),u(h[g]),u(y[g]));return[g,w]}));return{classes:dn({cx:f,classes:b,context:a,classNames:s==null?void 0:s.classNames,name:s==null?void 0:s.name,cache:l}),cx:f,theme:o}}return n}var Ue=Object.getOwnPropertySymbols,hn=Object.prototype.hasOwnProperty,bn=Object.prototype.propertyIsEnumerable,wn=(e,t)=>{var n={};for(var r in e)hn.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(e!=null&&Ue)for(var r of Ue(e))t.indexOf(r)<0&&bn.call(e,r)&&(n[r]=e[r]);return n};function xn(e){const t=e,{m:n,mx:r,my:s,mt:o,mb:a,ml:l,mr:c,p:u,px:f,py:m,pt:y,pb:h,pl:v,pr:b,bg:g,c:w,opacity:x,ff:j,fz:C,fw:O,lts:$,ta:R,lh:z,fs:V,tt:q,td:Z,w:k,miw:J,maw:fe,h:X,mih:de,mah:Q,bgsz:_e,bgp:ee,bgr:N,bga:M,pos:D,top:L,left:te,bottom:ne,right:re,inset:F,display:me}=t,se=wn(t,["m","mx","my","mt","mb","ml","mr","p","px","py","pt","pb","pl","pr","bg","c","opacity","ff","fz","fw","lts","ta","lh","fs","tt","td","w","miw","maw","h","mih","mah","bgsz","bgp","bgr","bga","pos","top","left","bottom","right","inset","display"]);return{systemStyles:Dt({m:n,mx:r,my:s,mt:o,mb:a,ml:l,mr:c,p:u,px:f,py:m,pt:y,pb:h,pl:v,pr:b,bg:g,c:w,opacity:x,ff:j,fz:C,fw:O,lts:$,ta:R,lh:z,fs:V,tt:q,td:Z,w:k,miw:J,maw:fe,h:X,mih:de,mah:Q,bgsz:_e,bgp:ee,bgr:N,bga:M,pos:D,top:L,left:te,bottom:ne,right:re,inset:F,display:me}),rest:se}}function jn(e,t){const n=Object.keys(e).filter(r=>r!=="base").sort((r,s)=>Be(H({size:r,sizes:t.breakpoints}))-Be(H({size:s,sizes:t.breakpoints})));return"base"in e?["base",...n]:n}function On({value:e,theme:t,getValue:n,property:r}){if(e==null)return;if(typeof e=="object")return jn(e,t).reduce((a,l)=>{if(l==="base"&&e.base!==void 0){const u=n(e.base,t);return Array.isArray(r)?(r.forEach(f=>{a[f]=u}),a):(a[r]=u,a)}const c=n(e[l],t);return Array.isArray(r)?(a[t.fn.largerThan(l)]={},r.forEach(u=>{a[t.fn.largerThan(l)][u]=c}),a):(a[t.fn.largerThan(l)]={[r]:c},a)},{});const s=n(e,t);return Array.isArray(r)?r.reduce((o,a)=>(o[a]=s,o),{}):{[r]:s}}function Cn(e,t){return e==="dimmed"?t.colorScheme==="dark"?t.colors.dark[2]:t.colors.gray[6]:t.fn.variant({variant:"filled",color:e,primaryFallback:!1}).background}function $n(e){return B(e)}function Sn(e){return e}function qn(e,t){return H({size:e,sizes:t.fontSizes})}const En=["-xs","-sm","-md","-lg","-xl"];function An(e,t){return En.includes(e)?`calc(${H({size:e.replace("-",""),sizes:t.spacing})} * -1)`:H({size:e,sizes:t.spacing})}const Pn={identity:Sn,color:Cn,size:$n,fontSize:qn,spacing:An},Rn={m:{type:"spacing",property:"margin"},mt:{type:"spacing",property:"marginTop"},mb:{type:"spacing",property:"marginBottom"},ml:{type:"spacing",property:"marginLeft"},mr:{type:"spacing",property:"marginRight"},mx:{type:"spacing",property:["marginRight","marginLeft"]},my:{type:"spacing",property:["marginTop","marginBottom"]},p:{type:"spacing",property:"padding"},pt:{type:"spacing",property:"paddingTop"},pb:{type:"spacing",property:"paddingBottom"},pl:{type:"spacing",property:"paddingLeft"},pr:{type:"spacing",property:"paddingRight"},px:{type:"spacing",property:["paddingRight","paddingLeft"]},py:{type:"spacing",property:["paddingTop","paddingBottom"]},bg:{type:"color",property:"background"},c:{type:"color",property:"color"},opacity:{type:"identity",property:"opacity"},ff:{type:"identity",property:"fontFamily"},fz:{type:"fontSize",property:"fontSize"},fw:{type:"identity",property:"fontWeight"},lts:{type:"size",property:"letterSpacing"},ta:{type:"identity",property:"textAlign"},lh:{type:"identity",property:"lineHeight"},fs:{type:"identity",property:"fontStyle"},tt:{type:"identity",property:"textTransform"},td:{type:"identity",property:"textDecoration"},w:{type:"spacing",property:"width"},miw:{type:"spacing",property:"minWidth"},maw:{type:"spacing",property:"maxWidth"},h:{type:"spacing",property:"height"},mih:{type:"spacing",property:"minHeight"},mah:{type:"spacing",property:"maxHeight"},bgsz:{type:"size",property:"backgroundSize"},bgp:{type:"identity",property:"backgroundPosition"},bgr:{type:"identity",property:"backgroundRepeat"},bga:{type:"identity",property:"backgroundAttachment"},pos:{type:"identity",property:"position"},top:{type:"identity",property:"top"},left:{type:"size",property:"left"},bottom:{type:"size",property:"bottom"},right:{type:"size",property:"right"},inset:{type:"size",property:"inset"},display:{type:"identity",property:"display"}};var zn=Object.defineProperty,We=Object.getOwnPropertySymbols,In=Object.prototype.hasOwnProperty,Nn=Object.prototype.propertyIsEnumerable,Ge=(e,t,n)=>t in e?zn(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,Ke=(e,t)=>{for(var n in t||(t={}))In.call(t,n)&&Ge(e,n,t[n]);if(We)for(var n of We(t))Nn.call(t,n)&&Ge(e,n,t[n]);return e};function He(e,t,n=Rn){return Object.keys(n).reduce((s,o)=>(o in e&&e[o]!==void 0&&s.push(On({value:e[o],getValue:Pn[n[o].type],property:n[o].property,theme:t})),s),[]).reduce((s,o)=>(Object.keys(o).forEach(a=>{typeof o[a]=="object"&&o[a]!==null&&a in s?s[a]=Ke(Ke({},s[a]),o[a]):s[a]=o[a]}),s),{})}function Ye(e,t){return typeof e=="function"?e(t):e}function Mn(e,t,n){const r=st(),{css:s,cx:o}=dt();return Array.isArray(e)?o(n,s(He(t,r)),e.map(a=>s(Ye(a,r)))):o(n,s(Ye(e,r)),s(He(t,r)))}var Tn=Object.defineProperty,ce=Object.getOwnPropertySymbols,_t=Object.prototype.hasOwnProperty,mt=Object.prototype.propertyIsEnumerable,Ze=(e,t,n)=>t in e?Tn(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,Bn=(e,t)=>{for(var n in t||(t={}))_t.call(t,n)&&Ze(e,n,t[n]);if(ce)for(var n of ce(t))mt.call(t,n)&&Ze(e,n,t[n]);return e},Vn=(e,t)=>{var n={};for(var r in e)_t.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(e!=null&&ce)for(var r of ce(e))t.indexOf(r)<0&&mt.call(e,r)&&(n[r]=e[r]);return n};const yt=p.forwardRef((e,t)=>{var n=e,{className:r,component:s,style:o,sx:a}=n,l=Vn(n,["className","component","style","sx"]);const{systemStyles:c,rest:u}=xn(l),f=s||"div";return A.createElement(f,Bn({ref:t,className:Mn(a,c,r),style:o},u))});yt.displayName="@mantine/core/Box";const kn=yt;var Dn=Object.defineProperty,Ln=Object.defineProperties,Fn=Object.getOwnPropertyDescriptors,Je=Object.getOwnPropertySymbols,Un=Object.prototype.hasOwnProperty,Wn=Object.prototype.propertyIsEnumerable,Xe=(e,t,n)=>t in e?Dn(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,Qe=(e,t)=>{for(var n in t||(t={}))Un.call(t,n)&&Xe(e,n,t[n]);if(Je)for(var n of Je(t))Wn.call(t,n)&&Xe(e,n,t[n]);return e},et=(e,t)=>Ln(e,Fn(t));const Gn=e=>Lt({from:{boxShadow:`0 0 ${B(.5)} 0 ${e}`,opacity:.6},to:{boxShadow:`0 0 ${B(.5)} ${B(4.4)} ${e}`,opacity:0}});function tt(e,t=0){const n={},[r,s]=e.split("-");let o="",a="";return r==="top"&&(n.top=t,a="-50%"),r==="middle"&&(n.top="50%",a="-50%"),r==="bottom"&&(n.bottom=t,a="50%"),s==="start"&&(n.left=t,o="-50%"),s==="center"&&(n.left="50%",o="-50%"),s==="end"&&(n.right=t,o="50%"),n.transform=`translate(${o}, ${a})`,n}var Kn=gn((e,{radius:t,color:n,position:r,offset:s,inline:o,withBorder:a,withLabel:l,zIndex:c},{size:u})=>{const{background:f}=e.fn.variant({variant:"filled",primaryFallback:!1,color:n||e.primaryColor}),m=B(u);return{root:{position:"relative",display:o?"inline-block":"block"},indicator:et(Qe({},tt(r,s)),{zIndex:c,position:"absolute",[l?"minWidth":"width"]:m,height:m,display:"flex",justifyContent:"center",alignItems:"center",fontSize:e.fontSizes.xs,paddingLeft:l?`calc(${e.spacing.xs} / 2)`:0,paddingRight:l?`calc(${e.spacing.xs} / 2)`:0,borderRadius:e.fn.radius(t),backgroundColor:e.fn.variant({variant:"filled",primaryFallback:!1,color:n||e.primaryColor}).background,border:a?`${B(2)} solid ${e.colorScheme==="dark"?e.colors.dark[7]:e.white}`:void 0,color:e.white,whiteSpace:"nowrap"}),processing:{animation:`${Gn(f)} 1000ms linear infinite`},common:et(Qe({},tt(r,s)),{position:"absolute",[l?"minWidth":"width"]:m,height:m,borderRadius:e.fn.radius(t)})}});const Hn=Kn;var Yn=Object.defineProperty,pe=Object.getOwnPropertySymbols,vt=Object.prototype.hasOwnProperty,gt=Object.prototype.propertyIsEnumerable,nt=(e,t,n)=>t in e?Yn(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,Zn=(e,t)=>{for(var n in t||(t={}))vt.call(t,n)&&nt(e,n,t[n]);if(pe)for(var n of pe(t))gt.call(t,n)&&nt(e,n,t[n]);return e},Jn=(e,t)=>{var n={};for(var r in e)vt.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(e!=null&&pe)for(var r of pe(e))t.indexOf(r)<0&&gt.call(e,r)&&(n[r]=e[r]);return n};const Xn={position:"top-end",offset:0,inline:!1,withBorder:!1,disabled:!1,processing:!1,size:10,radius:1e3,zIndex:nn("app")},ht=p.forwardRef((e,t)=>{const n=Ft("Indicator",Xn,e),{children:r,position:s,offset:o,size:a,radius:l,inline:c,withBorder:u,className:f,color:m,styles:y,label:h,classNames:v,disabled:b,zIndex:g,unstyled:w,processing:x,variant:j}=n,C=Jn(n,["children","position","offset","size","radius","inline","withBorder","className","color","styles","label","classNames","disabled","zIndex","unstyled","processing","variant"]),{classes:O,cx:$}=Hn({position:s,offset:o,radius:l,inline:c,color:m,withBorder:u,zIndex:g,withLabel:!!h},{name:"Indicator",classNames:v,styles:y,unstyled:w,variant:j,size:a});return A.createElement(kn,Zn({ref:t,className:$(O.root,f)},C),!b&&A.createElement(A.Fragment,null,A.createElement("div",{className:$(O.indicator,O.common)},h),x&&A.createElement("div",{className:$(O.processing,O.common)})),r)});ht.displayName="@mantine/core/Indicator";const Qn=p.createContext(void 0),Ce=e=>{const t=p.useContext(Qn);return(e==null?void 0:e.store)||t||Ut()},er=e=>e instanceof Promise,tr=A.use||(e=>{if(e.status==="pending")throw e;if(e.status==="fulfilled")return e.value;throw e.status==="rejected"?e.reason:(e.status="pending",e.then(t=>{e.status="fulfilled",e.value=t},t=>{e.status="rejected",e.reason=t}),e)});function Y(e,t){const n=Ce(t),[[r,s,o],a]=p.useReducer(u=>{const f=n.get(e);return Object.is(u[0],f)&&u[1]===n&&u[2]===e?u:[f,n,e]},void 0,()=>[n.get(e),n,e]);let l=r;(s!==n||o!==e)&&(a(),l=n.get(e));const c=t==null?void 0:t.delay;return p.useEffect(()=>{const u=n.sub(e,()=>{if(typeof c=="number"){setTimeout(a,c);return}a()});return a(),u},[n,e,c]),p.useDebugValue(l),er(l)?tr(l):l}function I(e,t){const n=Ce(t);return p.useCallback((...s)=>{if(({VITE_OPENAI_API_KEY:"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",BASE_URL:"/",MODE:"production",DEV:!1,PROD:!0,SSR:!1}&&"production")!=="production"&&!("write"in e))throw new Error("not writable atom");return n.set(e,...s)},[n,e])}function $e(e,t){return[Y(e,t),I(e,t)]}const nr={model:"gpt-3.5-turbo",temperature:.5,max_tokens:4096,top_p:1,presence_penalty:0,frequency_penalty:0},bt=`I am a researcher with expertise in multiple fields, capable of assisting users in solving problems.

Additional rule:

1. Answer should be written in markdown format.`,rr=e=>$e(p.useMemo(()=>ot(t=>t(at)[e]),[e])),sr=e=>$e(p.useMemo(()=>ot(t=>t(Wt)[e]),[e]));function or(e){const t=p.useRef(e);return t.current=e,p.useMemo(()=>Object.freeze({get current(){return t.current}}),[])}const ar=typeof window<"u"&&typeof navigator<"u"&&typeof document<"u";function ir(e){p.useEffect(()=>{e()},[])}let ae;function lr(){if(!ar)return;if(ae)return ae;const e=new Map,t=new ResizeObserver(n=>{n.forEach(r=>{var s;return(s=e.get(r.target))==null?void 0:s.forEach(o=>setTimeout(()=>o(r),0))})});return ae={observer:t,subscribe:(n,r)=>{let s=e.get(n);s||(s=new Set,e.set(n,s),t.observe(n)),s.add(r)},unsubscribe:(n,r)=>{const s=e.get(n);s&&(s.delete(r),s.size||(e.delete(n),t.unobserve(n)))}},ae}function ur(e,t,n=!0){const r=n&&lr(),s=or(t),o=e&&"current"in e?e.current:e;p.useEffect(()=>{const a=e&&"current"in e?e.current:e;if(!r||!a)return;let l=!0;const c=(...u)=>{l&&s.current(...u)};return r.subscribe(a,c),()=>{l=!1,r.unsubscribe(a,c)}},[o,r])}var cr={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};const pr=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),fr=(e,t)=>{const n=p.forwardRef(({color:r="currentColor",size:s=24,strokeWidth:o=2,absoluteStrokeWidth:a,children:l,...c},u)=>p.createElement("svg",{ref:u,...cr,width:s,height:s,stroke:r,strokeWidth:a?Number(o)*24/Number(s):o,className:`lucide lucide-${pr(e)}`,...c},[...t.map(([f,m])=>p.createElement(f,m)),...(Array.isArray(l)?l:[l])||[]]));return n.displayName=`${e}`,n},dr=fr("Plus",[["line",{x1:"12",x2:"12",y1:"5",y2:"19",key:"pwfkuu"}],["line",{x1:"5",x2:"19",y1:"12",y2:"12",key:"13b5wn"}]]),_r="/assets/chatgpt-a52b0da1.webp";var mr="_1o7wafv0";const yr=S(p.memo,e=>d.jsx("div",{className:e[0],style:e[1],children:e[2]})),vr=({bg:e,children:t,radius:n="0.5rem",size:r=44})=>{let s=P(p.useRef,13),o=0 in s?s[0]:s[0]=mr,a;if(i(s,1,e)?s[1]:s[1]=e){let O=le(s,2,2),$=i(O,0,e),R=$?O[0]:O[0]=e;a=$?O[1]:O[1]=`url("${R}")`}else a="none";let l=i(s,3,n),c=l?s[3]:s[3]=n,u=i(s,4,r),f=u?s[4]:s[4]=r,m=u?s[5]:s[5]=`${f}px`,y=u?s[6]:s[6]=`${f}px`,h=l&&u?s[7]:s[7]={backgroundImage:a,borderRadius:c,height:m,width:y},v=i(s,8,h),b=v?s[8]:s[8]=h,g=i(s,9,t),w=g?s[9]:s[9]=t,x=v&&g?s[10]:s[10]=[o,b,w],j=i(s,11,x),C=j?s[11]:s[11]=x;return j?s[12]:s[12]=d.jsx(yr,{v:C})},gr=S(p.memo,e=>{const t=e[0];return d.jsx(t,{...e[1],size:e[2],color:e[3],strokeWidth:e[4]})}),hr=p.memo(({as:e,color:t=it.colors.text,size:n=18,strokeWidth:r=1.5,...s})=>{let o=P(p.useRef,8),a=i(o,0,e),l=a?o[0]:o[0]=e,c=i(o,1,s),u=c?o[1]:o[1]=s,f=i(o,2,n),m=f?o[2]:o[2]=n,y=i(o,3,t),h=y?o[3]:o[3]=t,v=i(o,4,r),b=v?o[4]:o[4]=r,g=a&&c&&f&&y&&v?o[5]:o[5]=[l,u,m,h,b],w=i(o,6,g),x=w?o[6]:o[6]=g;return w?o[7]:o[7]=d.jsx(gr,{v:x})});var br="_1jvxuvy0",wr="_1jvxuvy1";const xr=S(p.memo,e=>{const t=e[1],n=e[2],r=e[4],s=e[7];return d.jsxs("div",{className:e[0],children:[d.jsx(t,{to:"/bots/ChatGPT",children:d.jsx(n,{bg:e[3]})}),d.jsx(r,{inline:!0,label:"WIP",size:e[5],children:d.jsx("div",{className:e[6],children:d.jsx(s,{as:e[8],size:e[9],color:e[10]})})})]})}),jr=({selected:e})=>{let t=P(p.useRef,1);return 0 in t?t[0]:t[0]=d.jsx(xr,{v:[br,Gt,vr,_r,ht,14,wr,hr,dr,24,it.colors.overlay]})};function Or(e,t){const n=Ce(t);return p.useEffect(()=>n.sub(e,()=>{}),[n,e]),[p.useCallback(()=>n.get(e),[n,e]),p.useCallback((...r)=>{if((s=>!!s.write)(e))return n.set(e,...r);throw new Error("not writable atom")},[n,e])]}const Cr=typeof window<"u"?A.useInsertionEffect||A.useLayoutEffect:()=>{};function ie(e){const t=A.useRef($r);Cr(()=>{t.current=e},[e]);const n=A.useRef(null);return n.current||(n.current=function(){return t.current.apply(this,arguments)}),n.current}function $r(){throw new Error("INVALID_USEEVENT_INVOCATION: the callback from useEvent cannot be invoked before the component has mounted.")}var Sr="ppg23g0",qr="ppg23g1";const Er=S(p.memo,e=>d.jsx("div",{id:e[0],className:e[1],children:d.jsx("input",{className:e[2],type:"text",placeholder:e[3],autoComplete:"off",value:e[4],onChange:e[5],...e[6]})})),Ar=p.memo(({id:e,onChange:t,placeholder:n="Untitled",value:r,...s})=>{let o=P(p.useRef,11),a=p.useDeferredValue(i(o,0,r)?o[0]:o[0]=r),l=i(o,1,e),c=l?o[1]:o[1]=e,u=2 in o?o[2]:o[2]=Sr,f=3 in o?o[3]:o[3]=qr,m=i(o,4,n),y=m?o[4]:o[4]=n,h=i(o,5,a),v=h?o[5]:o[5]=a,b=i(o,6,t),g=b?o[6]:o[6]=t,w=i(o,7,s),x=w?o[7]:o[7]=s,j=l&&m&&h&&b&&w?o[8]:o[8]=[c,u,f,y,v,g,x],C=i(o,9,j),O=C?o[9]:o[9]=j;return C?o[10]:o[10]=d.jsx(Er,{v:O})});var Pr="gd12u82",Rr="gd12u84 gd12u83",zr="gd12u80",Ir="gd12u83",Nr="gd12u81";const Mr=S(p.memo,e=>d.jsxs("div",{className:e[0],children:[d.jsxs("aside",{className:e[1],children:[d.jsx("div",{className:e[2],children:e[3]}),e[4]]}),d.jsxs("main",{className:e[5],children:[d.jsx("header",{className:e[6],children:e[7]}),e[8]]})]})),je=({aside:e,asideHeader:t,children:n,header:r})=>{let s=P(p.useRef,12),o=0 in s?s[0]:s[0]=zr,a=1 in s?s[1]:s[1]=Pr,l=2 in s?s[2]:s[2]=Rr,c=i(s,3,t),u=c?s[3]:s[3]=t,f=i(s,4,e),m=f?s[4]:s[4]=e,y=5 in s?s[5]:s[5]=Nr,h=6 in s?s[6]:s[6]=Ir,v=i(s,7,r),b=v?s[7]:s[7]=r,g=i(s,8,n),w=g?s[8]:s[8]=n,x=c&&f&&v&&g?s[9]:s[9]=[o,a,l,u,m,y,h,b,w],j=i(s,10,x),C=j?s[10]:s[10]=x;return j?s[11]:s[11]=d.jsx(Mr,{v:C})};var Tr="_1ogrem70",Br="_1ogrem71";const Vr=S(p.memo,e=>{const t=e[0];return d.jsx(t,{children:e[1]})}),kr=S(p.memo,e=>{const t=e[0];return d.jsx(t,{data:e[1]})}),Dr=S(p.memo,e=>d.jsx("div",{className:e[0],children:d.jsx("div",{className:e[1],ref:e[2],children:e[3]})})),Lr=S(p.memo,e=>{const t=e[0];return d.jsx(t,{id:e[1]})}),Fr=p.lazy(()=>Oe(()=>import("./index-9614d9a0.js"),["assets/index-9614d9a0.js","assets/index-f6597d30.js","assets/react-c99c05cb.js","assets/index-de832b6e.css","assets/react-error-boundary.esm-922dfc05.js","assets/index-83796f5a.css"])),Ur=({id:e})=>{let t=P(p.useRef,8);const[n]=sr(i(t,0,e)?t[0]:t[0]=e);let r=1 in t?t[1]:t[1]=p.Suspense,s;if(i(t,2,n)?t[2]:t[2]=n){let f=le(t,3,5),m=0 in f?f[0]:f[0]=Fr,y=i(f,1,n),h=y?f[1]:f[1]=n,v=y?f[2]:f[2]=[m,h],b=i(f,3,v),g=b?f[3]:f[3]=v;s=b?f[4]:f[4]=d.jsx(kr,{v:g})}else s=null;let o=i(t,4,s),a=o?t[4]:t[4]=s,l=o?t[5]:t[5]=[r,a],c=i(t,6,l),u=c?t[6]:t[6]=l;return c?t[7]:t[7]=d.jsx(Vr,{v:u})},Wr=({data:e,isGenerating:t,onHeightChange:n})=>{let r=P(p.useRef,16);const{id:s,messages:o}=i(r,0,e)?r[0]:r[0]=e,a=1 in r?r[1]:r[1]={current:null};let l=i(r,2,a),c=l?r[2]:r[2]=a,u=i(r,3,n);u?r[3]:r[3]=n;let f=u?r[4]:r[4]=$=>{n==null||n($.contentRect.height)};ur(c,i(r,5,f)?r[5]:r[5]=f,i(r,6,t)?r[6]:r[6]=t);let m=7 in r?r[7]:r[7]=Tr,y=8 in r?r[8]:r[8]=Br,h=i(r,9,o),v=h?r[9]:r[9]=o,b=10 in r?r[10]:r[10]=$=>d.jsx(Lr,{v:[Ur,$]},$),g=h?r[11]:r[11]=v.map(b),w=i(r,12,g),x=w?r[12]:r[12]=g,j=l&&w?r[13]:r[13]=[m,y,c,x],C=i(r,14,j),O=C?r[14]:r[14]=j;return C?r[15]:r[15]=d.jsx(Dr,{v:O})};var Gr="_1q3thl81",Kr="_1q3thl80";const Hr=S(p.memo,e=>{const t=e[0];return d.jsx(t,{items:e[1],newItemName:"New chat",selected:e[2],onItemAdd:e[3],onItemRemove:e[4]})}),Yr=S(p.memo,e=>{const t=e[0];return d.jsx(t,{asideHeader:e[1],aside:e[2]})}),Zr=S(p.memo,e=>{const t=e[0],n=e[3],r=e[8],s=e[13];return d.jsxs(t,{asideHeader:e[1],aside:e[2],header:d.jsx(n,{id:"chat-title",value:e[4],placeholder:"Untitled",onChange:e[5]}),children:[d.jsx("div",{ref:e[6],className:e[7],children:d.jsx(r,{data:e[9],isGenerating:e[10],onHeightChange:e[11]})}),d.jsx("div",{className:e[12],children:d.jsx(s,{onComplete:e[14],shouldComplete:e[15]})})]})}),Jr=p.lazy(()=>Oe(()=>import("./index-546aad40.js"),["assets/index-546aad40.js","assets/index-f6597d30.js","assets/react-c99c05cb.js","assets/index-de832b6e.css","assets/react-hotkeys-hook.esm-180eeafb.js","assets/index-aab3870a.css"])),Xr=p.lazy(()=>Oe(()=>import("./index-6e82031c.js").then(e=>e.w),["assets/index-6e82031c.js","assets/index-f6597d30.js","assets/react-c99c05cb.js","assets/index-de832b6e.css","assets/react-error-boundary.esm-922dfc05.js","assets/react-hotkeys-hook.esm-180eeafb.js","assets/index-401fc63e.css"])),Qr=({botName:e,chatID:t})=>{let n=P(p.useRef,56);const r=0 in n?n[0]:n[0]={current:null};let s=i(n,1,t),o=s?n[1]:n[1]=t;const[a]=rr(o),[l]=Or(2 in n?n[2]:n[2]=at),c=Y(3 in n?n[3]:n[3]=lt),u=I(4 in n?n[4]:n[4]=ut),f=I(5 in n?n[5]:n[5]=ct),m=I(6 in n?n[6]:n[6]=Kt),y=I(7 in n?n[7]:n[7]=Ht),h=I(8 in n?n[8]:n[8]=Yt),v=Y(9 in n?n[9]:n[9]=Zt);let b=i(n,10,v),g=b?n[10]:n[10]=v,w=b?n[11]:n[11]=g.isSome();if(w){let _=le(n,12,6),E=i(_,0,v),T=E?_[0]:_[0]=v,oe=E?_[1]:_[1]=T.unwrap(),U=i(_,2,oe),ge=U?_[2]:_[2]=oe,W=U?_[3]:_[3]=ge.type,G=i(_,4,W),he=G?_[4]:_[4]=W;w=G?_[5]:_[5]=he==="pending"}const x=w;let j=i(n,13,u);j?n[13]:n[13]=u;let C=i(n,14,f);C?n[14]:n[14]=f;let O=j&&C?n[15]:n[15]=()=>{const _={id:K(),role:"system",content:bt,updatedAt:Date.now()},E={id:K(),messages:[_.id],title:"",updatedAt:Date.now()};u(_),f(E)};const $=ie(i(n,16,O)?n[16]:n[16]=O);let R=i(n,17,l);R?n[17]:n[17]=l;let z=i(n,18,e),V=z?n[18]:n[18]=e,q=i(n,19,y);q?n[19]:n[19]=y;let Z=R&&z&&q&&s?n[20]:n[20]=()=>{const _=l();Object.keys(_).length!==1&&(ue.push("BotNewChat",{botName:e}),y(t))};const k=ie(i(n,21,Z)?n[21]:n[21]=Z);let J=i(n,22,$),fe=J?n[22]:n[22]=$,X=i(n,23,k),de=X?n[23]:n[23]=k,Q=i(n,24,c),_e=Q?n[24]:n[24]=c,ee=s&&J&&X&&Q;ee?n[25]:n[25]=[o,fe,de,_e];const N=ee?n[26]:n[26]=(()=>d.jsx(Hr,{v:[Jr,c,t,$,k]}))();let M=i(n,27,a),D=M?n[27]:n[27]=a;if(M?n[28]:n[28]=!D){let _=le(n,29,6),E=0 in _?_[0]:_[0]=je,T=i(_,1,e),oe=T?_[1]:_[1]=e,U=i(_,2,N),ge=U?_[2]:_[2]=N,W=T&&U?_[3]:_[3]=[E,oe,ge],G=i(_,4,W),he=G?_[4]:_[4]=W;return G?_[5]:_[5]=d.jsx(Yr,{v:he})}let L=i(n,30,m);L?n[30]:n[30]=m;let te=i(n,31,h);te?n[31]:n[31]=h;let ne=j&&L&&s&&te?n[32]:n[32]=async _=>{const E={id:K(),content:_,role:"user",updatedAt:Date.now()};u(E),m(t,T=>{T.messages.push(E.id)}),await h(t,nr)},re=ie(i(n,33,ne)?n[33]:n[33]=ne),F=i(n,34,x),me=F?n[34]:n[34]=x,se=F?n[35]:n[35]=_=>_.trim()!==""&&!x,ye=ie(i(n,36,se)?n[36]:n[36]=se),xt=37 in n?n[37]:n[37]=je,Se=i(n,38,N),jt=Se?n[38]:n[38]=N,Ot=39 in n?n[39]:n[39]=Ar,qe=M?n[40]:n[40]=D.title,Ee=i(n,41,qe),Ct=Ee?n[41]:n[41]=qe,Ae=L&&s?n[42]:n[42]=_=>{m(t,E=>{E.title=_.currentTarget.value})},Pe=i(n,43,Ae),$t=Pe?n[43]:n[43]=Ae,ve=i(n,44,r),St=ve?n[44]:n[44]=r,qt=45 in n?n[45]:n[45]=Kr,Et=46 in n?n[46]:n[46]=Wr,Re=ve?n[47]:n[47]=()=>{var _;(_=r.current)==null||_.scrollTo({top:r.current.scrollHeight})},ze=i(n,48,Re),At=ze?n[48]:n[48]=Re,Pt=49 in n?n[49]:n[49]=Gr,Rt=50 in n?n[50]:n[50]=Xr,Ie=i(n,51,re),zt=Ie?n[51]:n[51]=re,Ne=i(n,52,ye),It=Ne?n[52]:n[52]=ye,Me=z&&Se&&Ee&&Pe&&ve&&M&&F&&ze&&Ie&&Ne?n[53]:n[53]=[xt,V,jt,Ot,Ct,$t,St,qt,Et,D,me,At,Pt,Rt,zt,It],Te=i(n,54,Me),Nt=Te?n[54]:n[54]=Me;return Te?n[55]:n[55]=d.jsx(Zr,{v:Nt})};function wt(e){var t,n,r="";if(typeof e=="string"||typeof e=="number")r+=e;else if(typeof e=="object")if(Array.isArray(e))for(t=0;t<e.length;t++)e[t]&&(n=wt(e[t]))&&(r&&(r+=" "),r+=n);else for(t in e)e[t]&&(r&&(r+=" "),r+=t);return r}function es(){for(var e,t,n=0,r="";n<arguments.length;)(e=arguments[n++])&&(t=wt(e))&&(r&&(r+=" "),r+=t);return r}var ts="_17i0ume0";const ns=S(p.memo,e=>{const t=e[0];return d.jsx(t,{header:e[1],children:d.jsxs("div",{className:e[2],children:[d.jsx("h3",{children:"API Key"}),d.jsx("input",{type:"text",value:e[3],onChange:e[4]})]})})}),rs=({botName:e})=>{let t=P(p.useRef,13);const[n,r]=$e(0 in t?t[0]:t[0]=pt);let s=1 in t?t[1]:t[1]=je,o=i(t,2,e),a=o?t[2]:t[2]=e,l=o?t[3]:t[3]=`${a} Settings`,c=i(t,4,l),u=c?t[4]:t[4]=l,f=5 in t?t[5]:t[5]=es("prose-sm",ts),m=i(t,6,n),y=m?t[6]:t[6]=n,h=i(t,7,r);h?t[7]:t[7]=r;let v=h?t[8]:t[8]=C=>{r(C.target.value)},b=i(t,9,v),g=b?t[9]:t[9]=v,w=c&&m&&b?t[10]:t[10]=[s,u,f,y,g],x=i(t,11,w),j=x?t[11]:t[11]=w;return x?t[12]:t[12]=d.jsx(ns,{v:j})},ss=S(p.memo,e=>{const t=e[0],n=e[1],r=e[3];return d.jsx(t,{nav:d.jsx(n,{selected:e[2]}),children:d.jsx(r,{children:e[4]})})}),os=S(p.memo,e=>{const t=e[0];return d.jsx(t,{to:e[1]})}),as=S(p.memo,e=>{const t=e[0];return d.jsx(t,{botName:e[1]})}),is=S(p.memo,e=>{const t=e[0];return d.jsx(t,{botName:e[1]})}),ls=S(p.memo,e=>{const t=e[0];return d.jsx(t,{botName:e[1],chatID:e[2]})}),us=({botName:e})=>{let t=P(p.useRef,9);const n=I(0 in t?t[0]:t[0]=ut),r=I(1 in t?t[1]:t[1]=ct),s=Y(2 in t?t[2]:t[2]=lt);let o=i(t,3,s);o?t[3]:t[3]=s;let a=i(t,4,e);a?t[4]:t[4]=e;let l=i(t,5,n);l?t[5]:t[5]=n;let c=i(t,6,r);c?t[6]:t[6]=r;let u=o&&a&&l&&c?t[7]:t[7]=()=>{const f=s[0];if(f){ue.push("BotChat",{botName:e,chatID:f.id});return}const m={id:K(),role:"system",content:bt,updatedAt:Date.now()},y={id:K(),title:"",updatedAt:Date.now(),messages:[m.id]};n(m),r(y),ue.push("BotChat",{botName:e,chatID:y.id})};return ir(i(t,8,u)?t[8]:t[8]=u),null},cs=({botName:e})=>{let t=P(p.useRef,18);const n=ue.useRoute(0 in t?t[0]:t[0]=["BotRoot","BotChat","BotNewChat","BotSettings","BotChatArchive"]);let r=Y(1 in t?t[1]:t[1]=pt),s=i(t,2,r),o=s?t[2]:t[2]=r,a=s?t[3]:t[3]=!o,l=i(t,4,a),c=l?t[4]:t[4]=a;const u=l?t[5]:t[5]=!c;let f=6 in t?t[6]:t[6]=Jt,m=7 in t?t[7]:t[7]=jr,y=i(t,8,e),h=y?t[8]:t[8]=e,v=9 in t?t[9]:t[9]=p.Suspense,b=i(t,10,u),g=b?t[10]:t[10]=u,w=i(t,11,n),x=w?t[11]:t[11]=n,j=b&&w;j?t[12]:t[12]=[g,x];let C=j?t[13]:t[13]=(()=>Xt(n).with({name:"BotRoot"},({params:q})=>d.jsx(os,{v:[Qt,`/bots/${q.botName}/${u?"new":"settings"}`]})).with({name:"BotNewChat"},({params:q})=>d.jsx(as,{v:[us,q.botName]})).with({name:"BotSettings"},({params:q})=>d.jsx(is,{v:[rs,q.botName]})).with({name:"BotChat"},({params:q})=>d.jsx(ls,{v:[Qr,q.botName,q.chatID]})).otherwise(()=>null))(),O=i(t,14,C),$=O?t[14]:t[14]=C,R=y&&O?t[15]:t[15]=[f,m,h,v,$],z=i(t,16,R),V=z?t[16]:t[16]=R;return z?t[17]:t[17]=d.jsx(ss,{v:V})},_s=Object.freeze(Object.defineProperty({__proto__:null,default:cs},Symbol.toStringTag,{value:"Module"}));export{kn as B,hr as I,dr as P,es as a,ds as c,_s as i,ie as u};
