import{j as _,__tla as x}from"./index-fe6ad045.js";import{a as t}from"./react-f96d03bb.js";import b,{__tla as w}from"./TextEditor-068a79a1.js";import{u as N,__tla as S}from"./ChatDetail-015aec00.js";import"https://cdn.jsdelivr.net/npm/rsup-progress@3.1.1/dist/esm/index.js";import"https://cdn.jsdelivr.net/npm/web-vitals@3.3.2/+esm";import"./clsx.m-1229b3e0.js";import"./react-error-boundary.esm-3e5feee4.js";import{__tla as R}from"./BotArea-aa5179d0.js";import{__tla as M}from"./EUD77B6Z-392c3052.js";import{__tla as O}from"./Layout-941847a1.js";let p,P=Promise.all([(()=>{try{return x}catch{}})(),(()=>{try{return w}catch{}})(),(()=>{try{return S}catch{}})(),(()=>{try{return R}catch{}})(),(()=>{try{return M}catch{}})(),(()=>{try{return O}catch{}})()]).then(async()=>{function f(e){const c=N(e);t.useEffect(()=>()=>{c.current()},[])}function h(e,c,n,a=0){const r=t.useRef(),o=t.useRef(),s=t.useRef(),i=()=>{r.current&&(clearTimeout(r.current),r.current=void 0),o.current&&(clearTimeout(o.current),o.current=void 0)};return f(i),t.useMemo(()=>{const d=()=>{if(!s.current)return;const u=s.current;s.current=void 0,e.apply(u.this,u.args),i()},l=function(...u){r.current&&clearTimeout(r.current),s.current={args:u,this:this},r.current=setTimeout(d,n),a>0&&!o.current&&(o.current=setTimeout(d,a))};return Object.defineProperties(l,{length:{value:e.length},name:{value:`${e.name||"anonymous"}__debounced__${n}`}}),l},[n,a,...c])}function j(e,c,n=0){const[a,r]=t.useState(e);return[a,h(r,[],c,n)]}const y=()=>{};var v="stj6jw0",g="stj6jw1",C="stj6jw3",T="stj6jw2";p=t.memo(({defaultContent:e="",id:c,onComplete:n=y,shouldSend:a=!1})=>{const[r,o]=t.useState(!1),[s,i]=t.useState(e),[d,l]=j(s,500),u=t.useCallback(m=>{t.startTransition(()=>{i(m),l(m)})},[l]);return _.jsxs("div",{className:v,children:[_.jsx("div",{className:T,style:{opacity:r?1:0},children:_.jsxs("span",{className:C,children:["Words: ",s.length]})}),t.useMemo(()=>_.jsx(b,{className:g,defaultValue:e,onFocus:()=>o(!0),onBlur:()=>o(!1),onChange:u,onComplete:n,shouldComplete:m=>m.trim()!==""&&a}),[e,n,u,a])]})})});export{P as __tla,p as default};
