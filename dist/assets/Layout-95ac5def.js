import{a as n}from"./react-540a2e7d.js";import{F as u,G as B,H as y,I as C,J as H,K as L,L as b,M as F,N as G,O as I,P as J,S as K,T as P,j as o,__tla as A}from"./index-04eb2eef.js";import{u as c,a as r,__tla as O}from"./BotArea-b7151dcd.js";let l,i,h,_,g,S=Promise.all([(()=>{try{return A}catch{}})(),(()=>{try{return O}catch{}})()]).then(async()=>{_=()=>{const a=c(u),t=r(B),s=r(y),e=r(C),d=n.useMemo(()=>({addBot:t,removeBot:s,updateBot:e}),[t,s,e]);return[a,d]},i=a=>{const t=c(u),s=r(H),e=r(L),d=r(b),m=n.useMemo(()=>t.find(f=>f.name===a),[t,a]);F(m,`Bot ${a} not found`);const N=n.useMemo(()=>({addChat:s,updateChat:e,removeChat:d}),[s,d,e]);return[m,N]},h=a=>{const t=c(G.item(a)),s=r(I),e=r(J),d=r(K),m=n.useMemo(()=>({updateMessage:s,addMessage:e,removeMessage:d}),[e,d,s]);return[t,m]},g=a=>c(P.item(a));var M="gd12u82",p="gd12u84 gd12u83",j="gd12u80",v="gd12u83",x="gd12u81";l=({aside:a,asideHeader:t,children:s,header:e})=>o.jsxs("div",{className:j,children:[o.jsxs("aside",{className:M,children:[o.jsx("div",{className:p,children:t}),a]}),o.jsxs("main",{className:x,children:[o.jsx("header",{className:v,children:e}),s]})]})});export{l as L,S as __tla,i as a,h as b,_ as c,g as u};
