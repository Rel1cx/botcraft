import{M as J,j as c,__tla as ft}from"./index-301df08f.js";import{c as R,I as T,k as gt,l as vt,__tla as pt}from"./BotArea-307383f2.js";import{a as l}from"./react-f96d03bb.js";import"https://cdn.jsdelivr.net/npm/rsup-progress@3.1.1/dist/esm/index.js";import"https://cdn.jsdelivr.net/npm/web-vitals@3.3.2/+esm";let H,yt=Promise.all([(()=>{try{return ft}catch{}})(),(()=>{try{return pt}catch{}})()]).then(async()=>{const z=R("Star",[["polygon",{points:"12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2",key:"8f66p6"}]]),B=R("Trash",[["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6",key:"4alrt4"}],["path",{d:"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2",key:"v07s0e"}]]);var Q=(e,t)=>e==e?e===t:t!=t,{clear:N,delete:M,set:E}=Map.prototype,X=class extends Map{constructor(e){if(super(),e instanceof X&&!e.inverse)this.inverse=e;else if(this.inverse=new new.target(this),e!=null)for(const{0:t,1:n}of e)this.set(t,n)}clear(){N.call(this),N.call(this.inverse)}delete(e){const t=this.get(e);return M.call(this,e)&&M.call(this.inverse,t)}set(e,t){if(this.has(e)){const n=this.get(e);if(Q(n,t))return this;M.call(this.inverse,n)}if(this.inverse.has(t)){const n=this.inverse.get(t);M.call(this,n)}return E.call(this,e,t),E.call(this.inverse,t,e),this}};function j(e){"@babel/helpers - typeof";return j=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},j(e)}function g(e,t){if(t.length<e)throw new TypeError(e+" argument"+(e>1?"s":"")+" required, but only "+t.length+" present")}function m(e){g(1,arguments);var t=Object.prototype.toString.call(e);return e instanceof Date||j(e)==="object"&&t==="[object Date]"?new Date(e.getTime()):typeof e=="number"||t==="[object Number]"?new Date(e):((typeof e=="string"||t==="[object String]")&&typeof console<"u"&&(console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#string-arguments"),console.warn(new Error().stack)),new Date(NaN))}var U={};function G(){return U}function A(e){var t=new Date(Date.UTC(e.getFullYear(),e.getMonth(),e.getDate(),e.getHours(),e.getMinutes(),e.getSeconds(),e.getMilliseconds()));return t.setUTCFullYear(e.getFullYear()),e.getTime()-t.getTime()}function x(e,t){g(2,arguments);var n=m(e),a=m(t),i=n.getTime()-a.getTime();return i<0?-1:i>0?1:i}function Z(e,t){g(2,arguments);var n=m(e),a=m(t),i=n.getFullYear()-a.getFullYear(),o=n.getMonth()-a.getMonth();return i*12+o}function K(e,t){return g(2,arguments),m(e).getTime()-m(t).getTime()}var F={ceil:Math.ceil,round:Math.round,floor:Math.floor,trunc:function(e){return e<0?Math.ceil(e):Math.floor(e)}},L="trunc";function $(e){return e?F[e]:F[L]}function ee(e){g(1,arguments);var t=m(e);return t.setHours(23,59,59,999),t}function te(e){g(1,arguments);var t=m(e),n=t.getMonth();return t.setFullYear(t.getFullYear(),n+1,0),t.setHours(23,59,59,999),t}function ne(e){g(1,arguments);var t=m(e);return ee(t).getTime()===te(t).getTime()}function ae(e,t){g(2,arguments);var n=m(e),a=m(t),i=x(n,a),o=Math.abs(Z(n,a)),r;if(o<1)r=0;else{n.getMonth()===1&&n.getDate()>27&&n.setDate(30),n.setMonth(n.getMonth()-i*o);var d=x(n,a)===-i;ne(m(e))&&o===1&&x(e,a)===1&&(d=!1),r=i*(o-Number(d))}return r===0?0:r}function re(e,t,n){g(2,arguments);var a=K(e,t)/1e3;return $(n?.roundingMethod)(a)}var ie={lessThanXSeconds:{one:"less than a second",other:"less than {{count}} seconds"},xSeconds:{one:"1 second",other:"{{count}} seconds"},halfAMinute:"half a minute",lessThanXMinutes:{one:"less than a minute",other:"less than {{count}} minutes"},xMinutes:{one:"1 minute",other:"{{count}} minutes"},aboutXHours:{one:"about 1 hour",other:"about {{count}} hours"},xHours:{one:"1 hour",other:"{{count}} hours"},xDays:{one:"1 day",other:"{{count}} days"},aboutXWeeks:{one:"about 1 week",other:"about {{count}} weeks"},xWeeks:{one:"1 week",other:"{{count}} weeks"},aboutXMonths:{one:"about 1 month",other:"about {{count}} months"},xMonths:{one:"1 month",other:"{{count}} months"},aboutXYears:{one:"about 1 year",other:"about {{count}} years"},xYears:{one:"1 year",other:"{{count}} years"},overXYears:{one:"over 1 year",other:"over {{count}} years"},almostXYears:{one:"almost 1 year",other:"almost {{count}} years"}},oe=function(e,t,n){var a,i=ie[e];return typeof i=="string"?a=i:t===1?a=i.one:a=i.other.replace("{{count}}",t.toString()),n!=null&&n.addSuffix?n.comparison&&n.comparison>0?"in "+a:a+" ago":a};const se=oe;function D(e){return function(){var t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},n=t.width?String(t.width):e.defaultWidth,a=e.formats[n]||e.formats[e.defaultWidth];return a}}var ue={full:"EEEE, MMMM do, y",long:"MMMM do, y",medium:"MMM d, y",short:"MM/dd/yyyy"},le={full:"h:mm:ss a zzzz",long:"h:mm:ss a z",medium:"h:mm:ss a",short:"h:mm a"},ce={full:"{{date}} 'at' {{time}}",long:"{{date}} 'at' {{time}}",medium:"{{date}}, {{time}}",short:"{{date}}, {{time}}"},de={date:D({formats:ue,defaultWidth:"full"}),time:D({formats:le,defaultWidth:"full"}),dateTime:D({formats:ce,defaultWidth:"full"})};const me=de;var he={lastWeek:"'last' eeee 'at' p",yesterday:"'yesterday at' p",today:"'today at' p",tomorrow:"'tomorrow at' p",nextWeek:"eeee 'at' p",other:"P"},fe=function(e,t,n,a){return he[e]};const ge=fe;function b(e){return function(t,n){var a=n!=null&&n.context?String(n.context):"standalone",i;if(a==="formatting"&&e.formattingValues){var o=e.defaultFormattingWidth||e.defaultWidth,r=n!=null&&n.width?String(n.width):o;i=e.formattingValues[r]||e.formattingValues[o]}else{var d=e.defaultWidth,s=n!=null&&n.width?String(n.width):e.defaultWidth;i=e.values[s]||e.values[d]}var h=e.argumentCallback?e.argumentCallback(t):t;return i[h]}}var ve={narrow:["B","A"],abbreviated:["BC","AD"],wide:["Before Christ","Anno Domini"]},pe={narrow:["1","2","3","4"],abbreviated:["Q1","Q2","Q3","Q4"],wide:["1st quarter","2nd quarter","3rd quarter","4th quarter"]},ye={narrow:["J","F","M","A","M","J","J","A","S","O","N","D"],abbreviated:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],wide:["January","February","March","April","May","June","July","August","September","October","November","December"]},be={narrow:["S","M","T","W","T","F","S"],short:["Su","Mo","Tu","We","Th","Fr","Sa"],abbreviated:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],wide:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]},we={narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"}},Me={narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"}},xe=function(e,t){var n=Number(e),a=n%100;if(a>20||a<10)switch(a%10){case 1:return n+"st";case 2:return n+"nd";case 3:return n+"rd"}return n+"th"},Se={ordinalNumber:xe,era:b({values:ve,defaultWidth:"wide"}),quarter:b({values:pe,defaultWidth:"wide",argumentCallback:function(e){return e-1}}),month:b({values:ye,defaultWidth:"wide"}),day:b({values:be,defaultWidth:"wide"}),dayPeriod:b({values:we,defaultWidth:"wide",formattingValues:Me,defaultFormattingWidth:"wide"})};const je=Se;function w(e){return function(t){var n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},a=n.width,i=a&&e.matchPatterns[a]||e.matchPatterns[e.defaultMatchWidth],o=t.match(i);if(!o)return null;var r=o[0],d=a&&e.parsePatterns[a]||e.parsePatterns[e.defaultParseWidth],s=Array.isArray(d)?ke(d,function(f){return f.test(r)}):De(d,function(f){return f.test(r)}),h;h=e.valueCallback?e.valueCallback(s):s,h=n.valueCallback?n.valueCallback(h):h;var p=t.slice(r.length);return{value:h,rest:p}}}function De(e,t){for(var n in e)if(e.hasOwnProperty(n)&&t(e[n]))return n}function ke(e,t){for(var n=0;n<e.length;n++)if(t(e[n]))return n}function Ce(e){return function(t){var n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},a=t.match(e.matchPattern);if(!a)return null;var i=a[0],o=t.match(e.parsePattern);if(!o)return null;var r=e.valueCallback?e.valueCallback(o[0]):o[0];r=n.valueCallback?n.valueCallback(r):r;var d=t.slice(i.length);return{value:r,rest:d}}}var We=/^(\d+)(th|st|nd|rd)?/i,Pe=/\d+/i,Te={narrow:/^(b|a)/i,abbreviated:/^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,wide:/^(before christ|before common era|anno domini|common era)/i},Ne={any:[/^b/i,/^(a|c)/i]},Ee={narrow:/^[1234]/i,abbreviated:/^q[1234]/i,wide:/^[1234](th|st|nd|rd)? quarter/i},Xe={any:[/1/i,/2/i,/3/i,/4/i]},Ae={narrow:/^[jfmasond]/i,abbreviated:/^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,wide:/^(january|february|march|april|may|june|july|august|september|october|november|december)/i},Fe={narrow:[/^j/i,/^f/i,/^m/i,/^a/i,/^m/i,/^j/i,/^j/i,/^a/i,/^s/i,/^o/i,/^n/i,/^d/i],any:[/^ja/i,/^f/i,/^mar/i,/^ap/i,/^may/i,/^jun/i,/^jul/i,/^au/i,/^s/i,/^o/i,/^n/i,/^d/i]},Ie={narrow:/^[smtwf]/i,short:/^(su|mo|tu|we|th|fr|sa)/i,abbreviated:/^(sun|mon|tue|wed|thu|fri|sat)/i,wide:/^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i},Ye={narrow:[/^s/i,/^m/i,/^t/i,/^w/i,/^t/i,/^f/i,/^s/i],any:[/^su/i,/^m/i,/^tu/i,/^w/i,/^th/i,/^f/i,/^sa/i]},_e={narrow:/^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,any:/^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i},Oe={any:{am:/^a/i,pm:/^p/i,midnight:/^mi/i,noon:/^no/i,morning:/morning/i,afternoon:/afternoon/i,evening:/evening/i,night:/night/i}},qe={ordinalNumber:Ce({matchPattern:We,parsePattern:Pe,valueCallback:function(e){return parseInt(e,10)}}),era:w({matchPatterns:Te,defaultMatchWidth:"wide",parsePatterns:Ne,defaultParseWidth:"any"}),quarter:w({matchPatterns:Ee,defaultMatchWidth:"wide",parsePatterns:Xe,defaultParseWidth:"any",valueCallback:function(e){return e+1}}),month:w({matchPatterns:Ae,defaultMatchWidth:"wide",parsePatterns:Fe,defaultParseWidth:"any"}),day:w({matchPatterns:Ie,defaultMatchWidth:"wide",parsePatterns:Ye,defaultParseWidth:"any"}),dayPeriod:w({matchPatterns:_e,defaultMatchWidth:"any",parsePatterns:Oe,defaultParseWidth:"any"})},Ve={code:"en-US",formatDistance:se,formatLong:me,formatRelative:ge,localize:je,match:qe,options:{weekStartsOn:0,firstWeekContainsDate:1}};const Je=Ve;function I(e,t){if(e==null)throw new TypeError("assign requires that input parameter not be null or undefined");for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e}function Re(e){return I({},e)}var Y=1440,He=2520,k=43200,ze=86400;function Be(e,t,n){var a,i;g(2,arguments);var o=G(),r=(a=(i=n?.locale)!==null&&i!==void 0?i:o.locale)!==null&&a!==void 0?a:Je;if(!r.formatDistance)throw new RangeError("locale must contain formatDistance property");var d=x(e,t);if(isNaN(d))throw new RangeError("Invalid time value");var s=I(Re(n),{addSuffix:!!n?.addSuffix,comparison:d}),h,p;d>0?(h=m(t),p=m(e)):(h=m(e),p=m(t));var f=re(p,h),W=(A(p)-A(h))/1e3,u=Math.round((f-W)/60),v;if(u<2)return n!=null&&n.includeSeconds?f<5?r.formatDistance("lessThanXSeconds",5,s):f<10?r.formatDistance("lessThanXSeconds",10,s):f<20?r.formatDistance("lessThanXSeconds",20,s):f<40?r.formatDistance("halfAMinute",0,s):f<60?r.formatDistance("lessThanXMinutes",1,s):r.formatDistance("xMinutes",1,s):u===0?r.formatDistance("lessThanXMinutes",1,s):r.formatDistance("xMinutes",u,s);if(u<45)return r.formatDistance("xMinutes",u,s);if(u<90)return r.formatDistance("aboutXHours",1,s);if(u<Y){var y=Math.round(u/60);return r.formatDistance("aboutXHours",y,s)}else{if(u<He)return r.formatDistance("xDays",1,s);if(u<k){var S=Math.round(u/Y);return r.formatDistance("xDays",S,s)}else if(u<ze)return v=Math.round(u/k),r.formatDistance("aboutXMonths",v,s)}if(v=ae(p,h),v<12){var ht=Math.round(u/k);return r.formatDistance("xMonths",ht,s)}else{var V=v%12,P=Math.floor(v/12);return V<3?r.formatDistance("aboutXYears",P,s):V<9?r.formatDistance("overXYears",P,s):r.formatDistance("almostXYears",P+1,s)}}function Qe(e,t){return g(1,arguments),Be(e,Date.now(),t)}function Ue(e,t){typeof e=="function"?e(t):e!=null&&(e.current=t)}function Ge(...e){return t=>e.forEach(n=>Ue(n,t))}const _=l.forwardRef((e,t)=>{const{children:n,...a}=e,i=l.Children.toArray(n),o=i.find(Ke);if(o){const r=o.props.children,d=i.map(s=>s===o?l.Children.count(r)>1?l.Children.only(null):l.isValidElement(r)?r.props.children:null:s);return l.createElement(C,J({},a,{ref:t}),l.isValidElement(r)?l.cloneElement(r,void 0,d):null)}return l.createElement(C,J({},a,{ref:t}),n)});_.displayName="Slot";const C=l.forwardRef((e,t)=>{const{children:n,...a}=e;return l.isValidElement(n)?l.cloneElement(n,{...Le(a,n.props),ref:t?Ge(t,n.ref):n.ref}):l.Children.count(n)>1?l.Children.only(null):null});C.displayName="SlotClone";const Ze=({children:e})=>l.createElement(l.Fragment,null,e);function Ke(e){return l.isValidElement(e)&&e.type===Ze}function Le(e,t){const n={...t};for(const a in t){const i=e[a],o=t[a];/^on[A-Z]/.test(a)?i&&o?n[a]=(...r)=>{o(...r),i(...r)}:i&&(n[a]=i):a==="style"?n[a]={...i,...o}:a==="className"&&(n[a]=[i,o].filter(Boolean).join(" "))}return{...e,...n}}var $e="o70hwv0",et="o70hwv1",tt="o70hwv3",nt="o70hwv2";const at=[],rt=l.memo(l.forwardRef(({asChild:e,...t},n)=>{const a=e?_:"div";return c.jsx(a,{className:tt,ref:n,...t})})),it=l.memo(l.forwardRef(({data:e=at,gap:t=0,renderItem:n,selectedID:a,...i},o)=>{const r=l.useRef(null);return c.jsx("div",{ref:o,className:$e,...i,children:c.jsx("div",{className:et,ref:r,children:c.jsx("div",{className:nt,style:{gap:t},children:e.map((d,s)=>c.jsx("div",{children:n?.(d,d.id===a,s)},d.id))})})})}));var ot="x20x0a4",st="x20x0a0",ut="x20x0a1",lt="x20x0a3",ct="x20x0a2",dt="x20x0a5",mt="x20x0a6";let O,q;O=({title:e})=>c.jsx("span",{className:mt,children:e}),q=({disabled:e=!1,onClick:t,title:n})=>c.jsxs(gt,{as:"button",className:dt,clickOnEnter:!0,clickOnSpace:!0,disabled:e,onClick:t,children:[c.jsx(T,{as:vt}),c.jsx("span",{children:n})]}),H=l.memo(({disableMutation:e=!1,items:t,newItemName:n="New item",onItemAdd:a,onItemClick:i,onItemPin:o,onItemRemove:r,onItemUnpin:d,renderItemIcon:s,selected:h})=>{const p=l.useMemo(()=>{const u=new X;for(const[v,y]of t.entries()){const S=Qe(y.updatedAt,{addSuffix:!0});u.has(S)||u.inverse.set(v,S)}return u},[t]),f=l.useCallback(()=>a?.(),[a]),W=l.useCallback(u=>r?.(u),[r]);return c.jsxs("div",{className:st,children:[c.jsx("div",{className:ot,children:c.jsx(q,{title:n,disabled:e,onClick:f})}),c.jsx(it,{gap:12,data:t,selectedID:h,renderItem:(u,v,y)=>c.jsxs(c.Fragment,{children:[!!p.inverse.has(y)&&c.jsx(O,{title:p.inverse.get(y)??""}),c.jsx(rt,{asChild:!0,"data-id":u.id,"data-selected":v,children:c.jsxs("div",{className:ut,onClick:()=>i?.(u.id),children:[s?.(u.id),c.jsx("span",{className:ct,children:u.title}),!!v&&c.jsxs("div",{className:lt,children:[c.jsx(T,{color:"#fff",cursor:"pointer",as:z}),c.jsx(T,{color:"#fff",cursor:"pointer",as:B,onClick:()=>W(u.id)})]})]})})]})})]})})});export{yt as __tla,H as default};
