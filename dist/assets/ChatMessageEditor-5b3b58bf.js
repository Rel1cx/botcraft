import{j as _,__tla as T}from"./index-db5165a0.js";import{a as t}from"./react-f96d03bb.js";import{n as x}from"./helper-1bad6ac0.js";import b,{__tla as w}from"./TextEditor-3490417b.js";import{u as N,__tla as S}from"./ChatDetail-0d35a2f5.js";import"https://cdn.jsdelivr.net/npm/rsup-progress@3.1.1/dist/esm/index.js";import"https://cdn.jsdelivr.net/npm/web-vitals@3.3.2/+esm";import"./clsx.m-1229b3e0.js";import"./react-error-boundary.esm-3e5feee4.js";import{__tla as P}from"./BotArea-bd2157c5.js";import{__tla as R}from"./EUD77B6Z-8805e906.js";import{__tla as M}from"./Layout-e991c84b.js";let d,$=Promise.all([(()=>{try{return T}catch{}})(),(()=>{try{return w}catch{}})(),(()=>{try{return S}catch{}})(),(()=>{try{return P}catch{}})(),(()=>{try{return R}catch{}})(),(()=>{try{return M}catch{}})()]).then(async()=>{function f(e){const c=N(e);t.useEffect(()=>()=>{c.current()},[])}function h(e,c,n,a=0){const r=t.useRef(),o=t.useRef(),s=t.useRef(),i=()=>{r.current&&(clearTimeout(r.current),r.current=void 0),o.current&&(clearTimeout(o.current),o.current=void 0)};return f(i),t.useMemo(()=>{const p=()=>{if(!s.current)return;const u=s.current;s.current=void 0,e.apply(u.this,u.args),i()},l=function(...u){r.current&&clearTimeout(r.current),s.current={args:u,this:this},r.current=setTimeout(p,n),a>0&&!o.current&&(o.current=setTimeout(p,a))};return Object.defineProperties(l,{length:{value:e.length},name:{value:`${e.name||"anonymous"}__debounced__${n}`}}),l},[n,a,...c])}function j(e,c,n=0){const[a,r]=t.useState(e);return[a,h(r,[],c,n)]}var y="stj6jw1",v="stj6jw3",g="stj6jw0",C="stj6jw2";d=t.memo(({defaultContent:e="",id:c,onComplete:n=x,shouldSend:a=!1})=>{const[r,o]=t.useState(!1),[s,i]=t.useState(e),[p,l]=j(s,500),u=t.useCallback(m=>{t.startTransition(()=>{i(m),l(m)})},[l]);return _.jsxs("div",{className:g,children:[_.jsx("div",{className:C,style:{opacity:r?1:0},children:_.jsxs("span",{className:v,children:["Words: ",s.length]})}),t.useMemo(()=>_.jsx(b,{className:y,defaultValue:e,onFocus:()=>o(!0),onBlur:()=>o(!1),onChange:u,onComplete:n,shouldComplete:m=>m.trim()!==""&&a}),[e,n,u,a])]})})});export{$ as __tla,d as default};
