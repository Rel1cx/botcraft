import{a as n}from"./react-aeb67c7a.js";import{J as l,G as C,q as k,K as _,l as E,B as i,w as L,L as y,M as H,N as T,O as f,C as q,j as c,__tla as A}from"./index-2db840d0.js";let j,m,h,x,g,N,B=Promise.all([(()=>{try{return A}catch{}})()]).then(async()=>{g=function(e,a){const s=l(a);return n.useEffect(()=>s.sub(e,()=>{}),[s,e]),[n.useCallback(()=>s.get(e),[s,e]),n.useCallback((...t)=>{if((r=>!!r.write)(e))return s.set(e,...t);throw new Error("not writable atom")},[s,e])]},m=()=>{const e=l();return C(k,{store:e})},h=e=>{const a=l(),s=n.useMemo(()=>_(d=>d(q).get(e)),[e]),t=E(s,{store:a}),r=i(L,{store:a}),o=i(y,{store:a}),u=i(H,{store:a});return[t,{addChat:r,updateChat:o,removeChat:u}]},N=e=>{const a=l(),s=n.useMemo(()=>_(u=>u(f).get(e)),[e]),[t,r]=C(s,{store:a}),o=i(T,{store:a});return[t,{setMessage:r,addMessage:o}]},x=e=>{const[a]=m(),[s]=h(e),[t]=g(f);return n.useMemo(()=>{const r=s?.messages.reduce((o,u)=>{const d=t().get(u);return d&&o.push(d),o},[])??[];return a.estimateTokenCount(r)},[a,s?.messages,t])};var b="gd12u82",p="gd12u84 gd12u83",w="gd12u80",M="gd12u83",v="gd12u81";j=({aside:e,asideHeader:a,children:s,header:t})=>c.jsxs("div",{className:w,children:[c.jsxs("aside",{className:b,children:[c.jsx("div",{className:p,children:a}),e]}),c.jsxs("main",{className:v,children:[c.jsx("header",{className:M,children:t}),s]})]})});export{j as L,B as __tla,m as a,h as b,x as c,g as e,N as u};