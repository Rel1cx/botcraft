import{p as m,t as It,_ as Yn,z as Kn,__tla as Vn}from"./index-d6484737.js";import{a as s,R as Un}from"./react-a2ee8b59.js";import{A as Hn,m as zn,u as Bn,I as Jn,P as $n,__tla as Qn}from"./index-3f584489.js";import"https://cdn.jsdelivr.net/npm/rsup-progress@3.1.1/dist/esm/index.js";import"https://cdn.jsdelivr.net/npm/web-vitals@3.3.2/+esm";let Rt,Gn=Promise.all([(()=>{try{return Vn}catch{}})(),(()=>{try{return Qn}catch{}})()]).then(async()=>{var Xt=Object.defineProperty,_t=Object.defineProperties,qt=Object.getOwnPropertyDescriptors,X=Object.getOwnPropertySymbols,ft=Object.prototype.hasOwnProperty,dt=Object.prototype.propertyIsEnumerable,mt=(t,e,n)=>e in t?Xt(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,M=(t,e)=>{for(var n in e||(e={}))ft.call(e,n)&&mt(t,n,e[n]);if(X)for(var n of X(e))dt.call(e,n)&&mt(t,n,e[n]);return t},A=(t,e)=>_t(t,qt(e)),C=(t,e)=>{var n={};for(var r in t)ft.call(t,r)&&e.indexOf(r)<0&&(n[r]=t[r]);if(t!=null&&X)for(var r of X(t))e.indexOf(r)<0&&dt.call(t,r)&&(n[r]=t[r]);return n};function ht(t,e){return Object.prototype.hasOwnProperty.call(t,e)}function Lt(t,e){typeof t=="function"?t(e):t&&(t.current=e)}function Yt(t){return!(!t||!s.isValidElement(t)||!("ref"in t))}function Kt(t){return Yt(t)?t.ref:null}function Vt(t,e){const n=M({},t);for(const r in e){if(!ht(e,r))continue;if(r==="className"){const i="className";n[i]=t[i]?`${t[i]} ${e[i]}`:e[i];continue}if(r==="style"){const i="style";n[i]=t[i]?M(M({},t[i]),e[i]):e[i];continue}const a=e[r];if(typeof a=="function"&&r.startsWith("on")){const i=t[r];if(typeof i=="function"){n[r]=(...o)=>{a(...o),i(...o)};continue}}n[r]=a}return n}var _=Ut();function Ut(){var t;return typeof window<"u"&&!!((t=window.document)!=null&&t.createElement)}function gt(t){return t?t.ownerDocument||t:document}function H(t,e=!1){const{activeElement:n}=gt(t);if(!n?.nodeName)return null;if(Ht(n)&&n.contentDocument)return H(n.contentDocument.body,e);if(e){const r=n.getAttribute("aria-activedescendant");if(r){const a=gt(n).getElementById(r);if(a)return a}}return n}function z(t,e){return t===e||t.contains(e)}function Ht(t){return t.tagName==="IFRAME"}function P(t){const e=t.tagName.toLowerCase();return e==="button"?!0:e==="input"&&t.type?zt.indexOf(t.type)!==-1:!1}var zt=["button","color","file","image","reset","submit"];function vt(t,e){return"matches"in t?t.matches(e):"msMatchesSelector"in t?t.msMatchesSelector(e):t.webkitMatchesSelector(e)}function Bt(t){const e=t;return e.offsetWidth>0||e.offsetHeight>0||t.getClientRects().length>0}function Jt(t,e){if("closest"in t)return t.closest(e);do{if(vt(t,e))return t;t=t.parentElement||t.parentNode}while(t!==null&&t.nodeType===1);return null}function $t(t){try{const e=t instanceof HTMLInputElement&&t.selectionStart!==null,n=t.tagName==="TEXTAREA";return e||n||!1}catch{return!1}}function Qt(){return _?/mac|iphone|ipad|ipod/i.test(navigator.platform):!1}function Gt(){return _&&Qt()&&/apple/i.test(navigator.vendor)}function Zt(){return _&&/firefox\//i.test(navigator.userAgent)}function te(t){return!!(t.currentTarget&&!z(t.currentTarget,t.target))}function B(t){return t.target===t.currentTarget}function pt(t,e){const n=new MouseEvent("click",e);return t.dispatchEvent(n)}function ee(t,e){const n=e||t.currentTarget,r=t.relatedTarget;return!r||!z(n,r)}function J(t,e,n){const r=requestAnimationFrame(()=>{t.removeEventListener(e,a,!0),n()}),a=()=>{cancelAnimationFrame(r),n()};return t.addEventListener(e,a,{once:!0,capture:!0}),r}function $(t,e,n,r=window){var a;try{r.document.addEventListener(t,e,n)}catch{}const i=[];for(let o=0;o<((a=r.frames)==null?void 0:a.length);o+=1){const l=r.frames[o];l&&i.push($(t,e,n,l))}return()=>{try{r.document.removeEventListener(t,e,n)}catch{}i.forEach(o=>o())}}var Q=M({},Un);Q.useId,Q.useDeferredValue;var yt=Q.useInsertionEffect,ne=_?s.useLayoutEffect:s.useEffect;function S(t){const e=s.useRef(()=>{throw new Error("Cannot call an event handler while rendering.")});return yt?yt(()=>{e.current=t}):e.current=t,s.useCallback((...n)=>{var r;return(r=e.current)==null?void 0:r.call(e,...n)},[])}function q(...t){return s.useMemo(()=>{if(t.some(Boolean))return e=>{t.forEach(n=>Lt(n,e))}},t)}function G(t,e){const n=i=>{if(typeof i=="string")return i},[r,a]=s.useState(()=>n(e));return ne(()=>{const i=t&&"current"in t?t.current:t;a(i?.tagName.toLowerCase()||n(e))},[t,e]),r}function re(t){return typeof t=="function"}function Z(t){const e=(n,r)=>t(M({ref:r},n));return s.forwardRef(e)}function tt(t,e){const n=e,{as:r,wrapElement:a,render:i}=n,o=C(n,["as","wrapElement","render"]);let l;const c=q(e.ref,Kt(i));if(r&&typeof r!="string")l=m.jsx(r,A(M({},o),{render:i}));else if(s.isValidElement(i)){const f=A(M({},i.props),{ref:c});l=s.cloneElement(i,Vt(o,f))}else if(i)l=i(o);else if(re(e.children)){const f=o,v=C(f,["children"]);l=e.children(v)}else r?l=m.jsx(r,M({},o)):l=m.jsx(t,M({},o));return a?a(l):l}function et(t){return(e={})=>{const n=t(e),r={};for(const a in n)ht(n,a)&&n[a]!==void 0&&(r[a]=n[a]);return r}}var ae=s.createContext(!0),oe="input:not([type='hidden']):not([disabled]), select:not([disabled]), textarea:not([disabled]), a[href], button:not([disabled]), [tabindex], iframe, object, embed, area[href], audio[controls], video[controls], [contenteditable]:not([contenteditable='false'])";function nt(t){return!(!vt(t,oe)||!Bt(t)||Jt(t,"[inert]"))}function bt(t){const e=H(t);if(!e)return!1;if(e===t)return!0;const n=e.getAttribute("aria-activedescendant");return n?n===t.id:!1}function ie(t){const e=H(t);if(!e)return!1;if(z(t,e))return!0;const n=e.getAttribute("aria-activedescendant");return!n||!("id"in t)?!1:n===t.id?!0:!!t.querySelector(`#${CSS.escape(n)}`)}function se(t){!ie(t)&&nt(t)&&t.focus()}var wt=Gt(),ue=["text","search","url","tel","email","password","number","date","month","week","time","datetime","datetime-local"];function ce(t){const{tagName:e,readOnly:n,type:r}=t;return e==="TEXTAREA"&&!n||e==="SELECT"&&!n?!0:e==="INPUT"&&!n?ue.includes(r):!!t.isContentEditable}function le(t){return t.getAttribute("role")!=="combobox"?!1:!!t.dataset.name}function fe(t){return"labels"in t?t.labels:null}function Mt(t){return t.tagName.toLowerCase()==="input"&&t.type?t.type==="radio"||t.type==="checkbox":!1}function de(t){return t?t==="button"||t==="input"||t==="select"||t==="textarea"||t==="a":!0}function me(t){return t?t==="button"||t==="input"||t==="select"||t==="textarea":!0}function he(t,e,n,r,a){return t?e?n&&!r?-1:void 0:n?a:a||0:a}function rt(t,e){return S(n=>{t?.(n),!n.defaultPrevented&&e&&(n.stopPropagation(),n.preventDefault())})}var at=!0;function ge(t){const e=t.target;e&&"hasAttribute"in e&&(e.hasAttribute("data-focus-visible")||(at=!1))}function ve(t){t.metaKey||t.ctrlKey||t.altKey||(at=!0)}var Et=et(t=>{var e=t,{focusable:n=!0,accessibleWhenDisabled:r,autoFocus:a,onFocusVisible:i}=e,o=C(e,["focusable","accessibleWhenDisabled","autoFocus","onFocusVisible"]);const l=s.useRef(null);s.useEffect(()=>{n&&($("mousedown",ge,!0),$("keydown",ve,!0))},[n]),wt&&s.useEffect(()=>{if(!n)return;const u=l.current;if(!u||!Mt(u))return;const p=fe(u);if(!p)return;const D=()=>queueMicrotask(()=>u.focus());return p.forEach(W=>W.addEventListener("mouseup",D)),()=>{p.forEach(W=>W.removeEventListener("mouseup",D))}},[n]);const c=n&&o.disabled,f=!!c&&!r,[v,g]=s.useState(!1);s.useEffect(()=>{n&&f&&v&&g(!1)},[n,f,v]),s.useEffect(()=>{if(!n||!v)return;const u=l.current;if(!u||typeof IntersectionObserver>"u")return;const p=new IntersectionObserver(()=>{nt(u)||g(!1)});return p.observe(u),()=>p.disconnect()},[n,v]);const y=rt(o.onKeyPressCapture,c),h=rt(o.onMouseDownCapture,c),w=rt(o.onClickCapture,c),k=o.onMouseDown,I=S(u=>{if(k?.(u),u.defaultPrevented||!n)return;const p=u.currentTarget;if(!wt||te(u)||!P(p)&&!Mt(p))return;let D=!1;const W=()=>{D=!0},Ln={capture:!0,once:!0};p.addEventListener("focusin",W,Ln),J(p,"mouseup",()=>{p.removeEventListener("focusin",W,!0),!D&&se(p)})}),T=(u,p)=>{if(p&&(u.currentTarget=p),i?.(u),u.defaultPrevented||!n)return;const D=u.currentTarget;D&&bt(D)&&g(!0)},d=o.onKeyDownCapture,E=S(u=>{if(d?.(u),u.defaultPrevented||!n||v||u.metaKey||u.altKey||u.ctrlKey||!B(u))return;const p=u.currentTarget;queueMicrotask(()=>T(u,p))}),j=o.onFocusCapture,N=S(u=>{if(j?.(u),u.defaultPrevented||!n)return;if(!B(u)){g(!1);return}const p=u.currentTarget,D=()=>T(u,p);at||ce(u.target)?queueMicrotask(D):le(u.target)?J(u.target,"focusout",D):g(!1)}),R=o.onBlur,ct=S(u=>{R?.(u),n&&ee(u)&&g(!1)}),K=s.useContext(ae),lt=S(u=>{n&&a&&u&&K&&queueMicrotask(()=>{bt(u)||nt(u)&&u.focus()})}),V=G(l,o.as),U=n&&de(V),Ft=n&&me(V),qn=f?M({pointerEvents:"none"},o.style):o.style;return o=A(M({"data-focus-visible":n&&v?"":void 0,"data-autofocus":a?!0:void 0,"aria-disabled":c?!0:void 0},o),{ref:q(l,lt,o.ref),style:qn,tabIndex:he(n,f,U,Ft,o.tabIndex),disabled:Ft&&f?!0:void 0,contentEditable:c?void 0:o.contentEditable,onKeyPressCapture:y,onClickCapture:w,onMouseDownCapture:h,onMouseDown:I,onKeyDownCapture:E,onFocusCapture:N,onBlur:ct}),o});Z(t=>(t=Et(t),tt("div",t)));function xt(t){if(!t.isTrusted)return!1;const e=t.currentTarget;return t.key==="Enter"?P(e)||e.tagName==="SUMMARY"||e.tagName==="A":t.key===" "?P(e)||e.tagName==="SUMMARY"||e.tagName==="INPUT"||e.tagName==="SELECT":!1}var Dt=et(t=>{var e=t,{clickOnEnter:n=!0,clickOnSpace:r=!0}=e,a=C(e,["clickOnEnter","clickOnSpace"]);const i=s.useRef(null),o=G(i,a.as),l=a.type,[c,f]=s.useState(()=>!!o&&P({tagName:o,type:l}));s.useEffect(()=>{i.current&&f(P(i.current))},[]);const[v,g]=s.useState(!1),y=s.useRef(!1),h="data-command"in a,w=a.onKeyDown,k=S(d=>{w?.(d);const E=d.currentTarget;if(d.defaultPrevented||h||a.disabled||!B(d)||$t(E)||E.isContentEditable)return;const j=n&&d.key==="Enter",N=r&&d.key===" ",R=d.key==="Enter"&&!n,ct=d.key===" "&&!r;if(R||ct){d.preventDefault();return}if(j||N){const K=xt(d);if(j){if(!K){d.preventDefault();const lt=d,V=C(lt,["view"]),U=()=>pt(E,V);Zt()?J(E,"keyup",U):queueMicrotask(U)}}else N&&(y.current=!0,K||(d.preventDefault(),g(!0)))}}),I=a.onKeyUp,T=S(d=>{if(I?.(d),d.defaultPrevented||h||a.disabled||d.metaKey)return;const E=r&&d.key===" ";if(y.current&&E&&(y.current=!1,!xt(d))){g(!1);const j=d.currentTarget,N=d,R=C(N,["view"]);queueMicrotask(()=>pt(j,R))}});return a=A(M({"data-command":"","data-active":v?"":void 0,type:c?"button":void 0},a),{ref:q(i,a.ref),onKeyDown:k,onKeyUp:T}),a=Et(a),a});Z(t=>(t=Dt(t),tt("button",t)));var pe=et(t=>{const e=s.useRef(null),n=G(e,t.as||"button"),[r,a]=s.useState(()=>!!n&&P({tagName:n,type:t.type}));return s.useEffect(()=>{e.current&&a(P(e.current))},[]),t=A(M({role:!r&&n!=="a"?"button":void 0},t),{ref:q(e,t.ref)}),t=Dt(t),t}),ye=Z(t=>{const e=pe(t);return tt("button",e)}),be=(t,e)=>t==t?t===e:e!=e,{clear:St,delete:L,set:kt}=Map.prototype,Pt=class extends Map{constructor(t){if(super(),t instanceof Pt&&!t.inverse)this.inverse=t;else if(this.inverse=new new.target(this),t!=null)for(const{0:e,1:n}of t)this.set(e,n)}clear(){St.call(this),St.call(this.inverse)}delete(t){const e=this.get(t);return L.call(this,t)&&L.call(this.inverse,e)}set(t,e){if(this.has(t)){const n=this.get(t);if(be(n,e))return this;L.call(this.inverse,n)}if(this.inverse.has(e)){const n=this.inverse.get(e);L.call(this,n)}return kt.call(this,t,e),kt.call(this.inverse,e,t),this}};function ot(t){"@babel/helpers - typeof";return ot=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},ot(t)}function x(t,e){if(e.length<t)throw new TypeError(t+" argument"+(t>1?"s":"")+" required, but only "+e.length+" present")}function b(t){x(1,arguments);var e=Object.prototype.toString.call(t);return t instanceof Date||ot(t)==="object"&&e==="[object Date]"?new Date(t.getTime()):typeof t=="number"||e==="[object Number]"?new Date(t):((typeof t=="string"||e==="[object String]")&&typeof console<"u"&&(console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#string-arguments"),console.warn(new Error().stack)),new Date(NaN))}var we={};function Me(){return we}function Ct(t){var e=new Date(Date.UTC(t.getFullYear(),t.getMonth(),t.getDate(),t.getHours(),t.getMinutes(),t.getSeconds(),t.getMilliseconds()));return e.setUTCFullYear(t.getFullYear()),t.getTime()-e.getTime()}function Y(t,e){x(2,arguments);var n=b(t),r=b(e),a=n.getTime()-r.getTime();return a<0?-1:a>0?1:a}function Ee(t,e){x(2,arguments);var n=b(t),r=b(e),a=n.getFullYear()-r.getFullYear(),i=n.getMonth()-r.getMonth();return a*12+i}function xe(t,e){return x(2,arguments),b(t).getTime()-b(e).getTime()}var Tt={ceil:Math.ceil,round:Math.round,floor:Math.floor,trunc:function(t){return t<0?Math.ceil(t):Math.floor(t)}},De="trunc";function Se(t){return t?Tt[t]:Tt[De]}function ke(t){x(1,arguments);var e=b(t);return e.setHours(23,59,59,999),e}function Pe(t){x(1,arguments);var e=b(t),n=e.getMonth();return e.setFullYear(e.getFullYear(),n+1,0),e.setHours(23,59,59,999),e}function Ce(t){x(1,arguments);var e=b(t);return ke(e).getTime()===Pe(e).getTime()}function Te(t,e){x(2,arguments);var n=b(t),r=b(e),a=Y(n,r),i=Math.abs(Ee(n,r)),o;if(i<1)o=0;else{n.getMonth()===1&&n.getDate()>27&&n.setDate(30),n.setMonth(n.getMonth()-a*i);var l=Y(n,r)===-a;Ce(b(t))&&i===1&&Y(t,r)===1&&(l=!1),o=a*(i-Number(l))}return o===0?0:o}function je(t,e,n){x(2,arguments);var r=xe(t,e)/1e3;return Se(n?.roundingMethod)(r)}var Ne={lessThanXSeconds:{one:"less than a second",other:"less than {{count}} seconds"},xSeconds:{one:"1 second",other:"{{count}} seconds"},halfAMinute:"half a minute",lessThanXMinutes:{one:"less than a minute",other:"less than {{count}} minutes"},xMinutes:{one:"1 minute",other:"{{count}} minutes"},aboutXHours:{one:"about 1 hour",other:"about {{count}} hours"},xHours:{one:"1 hour",other:"{{count}} hours"},xDays:{one:"1 day",other:"{{count}} days"},aboutXWeeks:{one:"about 1 week",other:"about {{count}} weeks"},xWeeks:{one:"1 week",other:"{{count}} weeks"},aboutXMonths:{one:"about 1 month",other:"about {{count}} months"},xMonths:{one:"1 month",other:"{{count}} months"},aboutXYears:{one:"about 1 year",other:"about {{count}} years"},xYears:{one:"1 year",other:"{{count}} years"},overXYears:{one:"over 1 year",other:"over {{count}} years"},almostXYears:{one:"almost 1 year",other:"almost {{count}} years"}},We=function(t,e,n){var r,a=Ne[t];return typeof a=="string"?r=a:e===1?r=a.one:r=a.other.replace("{{count}}",e.toString()),n!=null&&n.addSuffix?n.comparison&&n.comparison>0?"in "+r:r+" ago":r};const Ae=We;function it(t){return function(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},n=e.width?String(e.width):t.defaultWidth,r=t.formats[n]||t.formats[t.defaultWidth];return r}}var Oe={full:"EEEE, MMMM do, y",long:"MMMM do, y",medium:"MMM d, y",short:"MM/dd/yyyy"},Fe={full:"h:mm:ss a zzzz",long:"h:mm:ss a z",medium:"h:mm:ss a",short:"h:mm a"},Ie={full:"{{date}} 'at' {{time}}",long:"{{date}} 'at' {{time}}",medium:"{{date}}, {{time}}",short:"{{date}}, {{time}}"},Re={date:it({formats:Oe,defaultWidth:"full"}),time:it({formats:Fe,defaultWidth:"full"}),dateTime:it({formats:Ie,defaultWidth:"full"})};const Xe=Re;var _e={lastWeek:"'last' eeee 'at' p",yesterday:"'yesterday at' p",today:"'today at' p",tomorrow:"'tomorrow at' p",nextWeek:"eeee 'at' p",other:"P"},qe=function(t,e,n,r){return _e[t]};const Le=qe;function O(t){return function(e,n){var r=n!=null&&n.context?String(n.context):"standalone",a;if(r==="formatting"&&t.formattingValues){var i=t.defaultFormattingWidth||t.defaultWidth,o=n!=null&&n.width?String(n.width):i;a=t.formattingValues[o]||t.formattingValues[i]}else{var l=t.defaultWidth,c=n!=null&&n.width?String(n.width):t.defaultWidth;a=t.values[c]||t.values[l]}var f=t.argumentCallback?t.argumentCallback(e):e;return a[f]}}var Ye={narrow:["B","A"],abbreviated:["BC","AD"],wide:["Before Christ","Anno Domini"]},Ke={narrow:["1","2","3","4"],abbreviated:["Q1","Q2","Q3","Q4"],wide:["1st quarter","2nd quarter","3rd quarter","4th quarter"]},Ve={narrow:["J","F","M","A","M","J","J","A","S","O","N","D"],abbreviated:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],wide:["January","February","March","April","May","June","July","August","September","October","November","December"]},Ue={narrow:["S","M","T","W","T","F","S"],short:["Su","Mo","Tu","We","Th","Fr","Sa"],abbreviated:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],wide:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]},He={narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"}},ze={narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"}},Be=function(t,e){var n=Number(t),r=n%100;if(r>20||r<10)switch(r%10){case 1:return n+"st";case 2:return n+"nd";case 3:return n+"rd"}return n+"th"},Je={ordinalNumber:Be,era:O({values:Ye,defaultWidth:"wide"}),quarter:O({values:Ke,defaultWidth:"wide",argumentCallback:function(t){return t-1}}),month:O({values:Ve,defaultWidth:"wide"}),day:O({values:Ue,defaultWidth:"wide"}),dayPeriod:O({values:He,defaultWidth:"wide",formattingValues:ze,defaultFormattingWidth:"wide"})};const $e=Je;function F(t){return function(e){var n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},r=n.width,a=r&&t.matchPatterns[r]||t.matchPatterns[t.defaultMatchWidth],i=e.match(a);if(!i)return null;var o=i[0],l=r&&t.parsePatterns[r]||t.parsePatterns[t.defaultParseWidth],c=Array.isArray(l)?Ge(l,function(g){return g.test(o)}):Qe(l,function(g){return g.test(o)}),f;f=t.valueCallback?t.valueCallback(c):c,f=n.valueCallback?n.valueCallback(f):f;var v=e.slice(o.length);return{value:f,rest:v}}}function Qe(t,e){for(var n in t)if(t.hasOwnProperty(n)&&e(t[n]))return n}function Ge(t,e){for(var n=0;n<t.length;n++)if(e(t[n]))return n}function Ze(t){return function(e){var n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},r=e.match(t.matchPattern);if(!r)return null;var a=r[0],i=e.match(t.parsePattern);if(!i)return null;var o=t.valueCallback?t.valueCallback(i[0]):i[0];o=n.valueCallback?n.valueCallback(o):o;var l=e.slice(a.length);return{value:o,rest:l}}}var tn=/^(\d+)(th|st|nd|rd)?/i,en=/\d+/i,nn={narrow:/^(b|a)/i,abbreviated:/^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,wide:/^(before christ|before common era|anno domini|common era)/i},rn={any:[/^b/i,/^(a|c)/i]},an={narrow:/^[1234]/i,abbreviated:/^q[1234]/i,wide:/^[1234](th|st|nd|rd)? quarter/i},on={any:[/1/i,/2/i,/3/i,/4/i]},sn={narrow:/^[jfmasond]/i,abbreviated:/^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,wide:/^(january|february|march|april|may|june|july|august|september|october|november|december)/i},un={narrow:[/^j/i,/^f/i,/^m/i,/^a/i,/^m/i,/^j/i,/^j/i,/^a/i,/^s/i,/^o/i,/^n/i,/^d/i],any:[/^ja/i,/^f/i,/^mar/i,/^ap/i,/^may/i,/^jun/i,/^jul/i,/^au/i,/^s/i,/^o/i,/^n/i,/^d/i]},cn={narrow:/^[smtwf]/i,short:/^(su|mo|tu|we|th|fr|sa)/i,abbreviated:/^(sun|mon|tue|wed|thu|fri|sat)/i,wide:/^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i},ln={narrow:[/^s/i,/^m/i,/^t/i,/^w/i,/^t/i,/^f/i,/^s/i],any:[/^su/i,/^m/i,/^tu/i,/^w/i,/^th/i,/^f/i,/^sa/i]},fn={narrow:/^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,any:/^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i},dn={any:{am:/^a/i,pm:/^p/i,midnight:/^mi/i,noon:/^no/i,morning:/morning/i,afternoon:/afternoon/i,evening:/evening/i,night:/night/i}},mn={ordinalNumber:Ze({matchPattern:tn,parsePattern:en,valueCallback:function(t){return parseInt(t,10)}}),era:F({matchPatterns:nn,defaultMatchWidth:"wide",parsePatterns:rn,defaultParseWidth:"any"}),quarter:F({matchPatterns:an,defaultMatchWidth:"wide",parsePatterns:on,defaultParseWidth:"any",valueCallback:function(t){return t+1}}),month:F({matchPatterns:sn,defaultMatchWidth:"wide",parsePatterns:un,defaultParseWidth:"any"}),day:F({matchPatterns:cn,defaultMatchWidth:"wide",parsePatterns:ln,defaultParseWidth:"any"}),dayPeriod:F({matchPatterns:fn,defaultMatchWidth:"any",parsePatterns:dn,defaultParseWidth:"any"})},hn={code:"en-US",formatDistance:Ae,formatLong:Xe,formatRelative:Le,localize:$e,match:mn,options:{weekStartsOn:0,firstWeekContainsDate:1}};const gn=hn;function jt(t,e){if(t==null)throw new TypeError("assign requires that input parameter not be null or undefined");for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t}function vn(t){return jt({},t)}var Nt=1440,pn=2520,st=43200,yn=86400;function bn(t,e,n){var r,a;x(2,arguments);var i=Me(),o=(r=(a=n?.locale)!==null&&a!==void 0?a:i.locale)!==null&&r!==void 0?r:gn;if(!o.formatDistance)throw new RangeError("locale must contain formatDistance property");var l=Y(t,e);if(isNaN(l))throw new RangeError("Invalid time value");var c=jt(vn(n),{addSuffix:!!n?.addSuffix,comparison:l}),f,v;l>0?(f=b(e),v=b(t)):(f=b(t),v=b(e));var g=je(v,f),y=(Ct(v)-Ct(f))/1e3,h=Math.round((g-y)/60),w;if(h<2)return n!=null&&n.includeSeconds?g<5?o.formatDistance("lessThanXSeconds",5,c):g<10?o.formatDistance("lessThanXSeconds",10,c):g<20?o.formatDistance("lessThanXSeconds",20,c):g<40?o.formatDistance("halfAMinute",0,c):g<60?o.formatDistance("lessThanXMinutes",1,c):o.formatDistance("xMinutes",1,c):h===0?o.formatDistance("lessThanXMinutes",1,c):o.formatDistance("xMinutes",h,c);if(h<45)return o.formatDistance("xMinutes",h,c);if(h<90)return o.formatDistance("aboutXHours",1,c);if(h<Nt){var k=Math.round(h/60);return o.formatDistance("aboutXHours",k,c)}else{if(h<pn)return o.formatDistance("xDays",1,c);if(h<st){var I=Math.round(h/Nt);return o.formatDistance("xDays",I,c)}else if(h<yn)return w=Math.round(h/st),o.formatDistance("aboutXMonths",w,c)}if(w=Te(v,f),w<12){var T=Math.round(h/st);return o.formatDistance("xMonths",T,c)}else{var d=w%12,E=Math.floor(w/12);return d<3?o.formatDistance("aboutXYears",E,c):d<9?o.formatDistance("overXYears",E,c):o.formatDistance("almostXYears",E+1,c)}}function wn(t,e){return x(1,arguments),bn(t,Date.now(),e)}function Mn(t,e){typeof t=="function"?t(e):t!=null&&(t.current=e)}function En(...t){return e=>t.forEach(n=>Mn(n,e))}const Wt=s.forwardRef((t,e)=>{const{children:n,...r}=t,a=s.Children.toArray(n),i=a.find(Dn);if(i){const o=i.props.children,l=a.map(c=>c===i?s.Children.count(o)>1?s.Children.only(null):s.isValidElement(o)?o.props.children:null:c);return s.createElement(ut,It({},r,{ref:e}),s.isValidElement(o)?s.cloneElement(o,void 0,l):null)}return s.createElement(ut,It({},r,{ref:e}),n)});Wt.displayName="Slot";const ut=s.forwardRef((t,e)=>{const{children:n,...r}=t;return s.isValidElement(n)?s.cloneElement(n,{...Sn(r,n.props),ref:e?En(e,n.ref):n.ref}):s.Children.count(n)>1?s.Children.only(null):null});ut.displayName="SlotClone";const xn=({children:t})=>s.createElement(s.Fragment,null,t);function Dn(t){return s.isValidElement(t)&&t.type===xn}function Sn(t,e){const n={...e};for(const r in e){const a=t[r],i=e[r];/^on[A-Z]/.test(r)?a&&i?n[r]=(...o)=>{i(...o),a(...o)}:a&&(n[r]=a):r==="style"?n[r]={...a,...i}:r==="className"&&(n[r]=[a,i].filter(Boolean).join(" "))}return{...t,...n}}var kn="o70hwv0",Pn="o70hwv1",Cn="o70hwv3",Tn="o70hwv2";const jn=s.lazy(()=>Yn(()=>import("./index-73781d03.js").then(async t=>(await t.__tla,t)),["assets/index-73781d03.js","assets/index-d6484737.js","assets/react-a2ee8b59.js","assets/index-da3b2329.css","assets/index-3f584489.js","assets/index-b0211204.css"])),Nn=[],Wn=s.memo(s.forwardRef(({asChild:t,...e},n)=>{const r=t?Wt:"div";return m.jsx(r,{className:Cn,ref:n,...e})})),An=s.memo(s.forwardRef(({data:t=Nn,gap:e=0,renderItem:n,selectedID:r,...a},i)=>{const o=s.useRef(null);return m.jsx("div",{ref:i,className:kn,...a,children:m.jsx("div",{className:Pn,ref:o,children:m.jsx("div",{className:Tn,style:{gap:e},children:m.jsx(jn,{children:m.jsx(Hn,{children:t.map((l,c)=>m.jsx(zn.div,{initial:{opacity:.95},animate:{opacity:1},children:n?.(l,l.id===r,c)},l.id))})})})})})}));var On="x20x0a3",Fn="x20x0a0",In="x20x0a1",Rn="x20x0a2",Xn="x20x0a4",_n="x20x0a5";let At,Ot;At=({title:t})=>m.jsx("span",{className:_n,children:t}),Ot=({disabled:t=!1,onClick:e,title:n})=>m.jsxs(ye,{as:"button",className:Xn,clickOnEnter:!0,clickOnSpace:!0,disabled:t,onClick:e,children:[m.jsx(Jn,{as:$n}),m.jsx("span",{children:n})]}),Rt=s.memo(({disableMutation:t=!1,itemIcon:e,items:n,newItemName:r="New item",onItemAdd:a,onItemPin:i,onItemRemove:o,onItemUnpin:l,selected:c})=>{const f=s.useMemo(()=>{const y=new Pt;for(const[h,w]of n.entries()){const k=wn(w.updatedAt,{addSuffix:!0});y.has(k)||y.inverse.set(h,k)}return y},[n]),v=s.useCallback(()=>a?.(),[a]),g=s.useCallback(y=>o?.(y),[o]);return Bn("Delete",()=>{c&&g(c)}),m.jsxs("div",{className:Fn,children:[m.jsx("div",{className:On,children:m.jsx(Ot,{title:r,disabled:t,onClick:v})}),m.jsx(An,{gap:12,data:n,selectedID:c,renderItem:(y,h,w)=>m.jsxs(m.Fragment,{children:[!!f.inverse.has(w)&&m.jsx(At,{title:f.inverse.get(w)??""}),m.jsx(Wn,{asChild:!0,"data-id":y.id,"data-selected":h,children:m.jsxs(Kn,{className:In,to:`/bots/ChatGPT/${y.id}`,children:[e?.(y.id),m.jsx("span",{className:Rn,children:y.title})]})})]})})]})})});export{Gn as __tla,Rt as default};
