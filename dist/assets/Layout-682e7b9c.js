import{a as n}from"./react-aeb67c7a.js";import{L as l,H as f,f as k,M as b,b as y,C as i,h as E,N as H,O as L,P as D,S as j,T as P,D as S,j as u,__tla as A}from"./index-8e297aa2.js";let x,m,h,C,g,M,B=Promise.all([(()=>{try{return A}catch{}})()]).then(async()=>{g=function(e,a){const s=l(a);return n.useEffect(()=>s.sub(e,()=>{}),[s,e]),[n.useCallback(()=>s.get(e),[s,e]),n.useCallback((...t)=>{if((r=>!!r.write)(e))return s.set(e,...t);throw new Error("not writable atom")},[s,e])]},m=()=>{const e=l();return f(k,{store:e})},h=e=>{const a=l(),s=n.useMemo(()=>b(d=>d(S).get(e)),[e]),t=y(s,{store:a}),r=i(E,{store:a}),o=i(H,{store:a}),c=i(L,{store:a});return[t,{addChat:r,updateChat:o,removeChat:c}]},M=e=>{const a=l(),s=n.useMemo(()=>b(c=>c(j).get(e)),[e]),[t,r]=f(s,{store:a}),o=i(D,{store:a});return[t,{setMessage:r,addMessage:o}]},C=e=>{const[a]=m(),[s]=h(e),[t]=g(j);return n.useMemo(()=>{const r=s?.messages.reduce((o,c)=>{const d=t().get(c);return d&&o.push(d),o},[])??[];return P(r)(a)},[a,s?.messages,t])};var N="gd12u82",_="gd12u84 gd12u83",p="gd12u80",v="gd12u83",w="gd12u81";x=({aside:e,asideHeader:a,children:s,header:t})=>u.jsxs("div",{className:p,children:[u.jsxs("aside",{className:N,children:[u.jsx("div",{className:_,children:a}),e]}),u.jsxs("main",{className:w,children:[u.jsx("header",{className:v,children:t}),s]})]})});export{x as L,B as __tla,m as a,h as b,C as c,g as e,M as u};