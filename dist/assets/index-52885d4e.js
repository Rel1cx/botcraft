import{s as c,t as r,b as p,L as l,i as m,c as o,f as g,k as u,a as h,__tla as R}from"./index-e2afe4f2.js";import{__tla as k}from"./index-444efe33.js";import"https://cdn.jsdelivr.net/npm/rsup-progress@3.1.1/dist/esm/index.js";import"./react-7029a116.js";import"./react-error-boundary.esm-2ee53b63.js";import{__tla as f}from"./react-hotkeys-hook.esm-11f52b08.js";let n,t,Q,b=Promise.all([(()=>{try{return R}catch{}})(),(()=>{try{return k}catch{}})(),(()=>{try{return f}catch{}})()]).then(async()=>{let s,P;s=c({String:r.string,Number:r.number,"True False":r.bool,PropertyName:r.propertyName,Null:r.null,",":r.separator,"[ ]":r.squareBracket,"{ }":r.brace}),P=p.deserialize({version:14,states:"$bOVQPOOOOQO'#Cb'#CbOnQPO'#CeOvQPO'#CjOOQO'#Cp'#CpQOQPOOOOQO'#Cg'#CgO}QPO'#CfO!SQPO'#CrOOQO,59P,59PO![QPO,59PO!aQPO'#CuOOQO,59U,59UO!iQPO,59UOVQPO,59QOqQPO'#CkO!nQPO,59^OOQO1G.k1G.kOVQPO'#ClO!vQPO,59aOOQO1G.p1G.pOOQO1G.l1G.lOOQO,59V,59VOOQO-E6i-E6iOOQO,59W,59WOOQO-E6j-E6j",stateData:"#O~OcOS~OQSORSOSSOTSOWQO]ROePO~OVXOeUO~O[[O~PVOg^O~Oh_OVfX~OVaO~OhbO[iX~O[dO~Oh_OVfa~OhbO[ia~O",goto:"!kjPPPPPPkPPkqwPPk{!RPPP!XP!ePP!hXSOR^bQWQRf_TVQ_Q`WRg`QcZRicQTOQZRQe^RhbRYQR]R",nodeNames:"\u26A0 JsonText True False Null Number String } { Object Property PropertyName ] [ Array",maxTerm:25,nodeProps:[["openedBy",7,"{",12,"["],["closedBy",8,"}",13,"]"]],propSources:[s],skippedNodes:[0],repeatNodeCount:2,tokenData:"(p~RaXY!WYZ!W]^!Wpq!Wrs!]|}$i}!O$n!Q!R$w!R![&V![!]&h!}#O&m#P#Q&r#Y#Z&w#b#c'f#h#i'}#o#p(f#q#r(k~!]Oc~~!`Upq!]qr!]rs!rs#O!]#O#P!w#P~!]~!wOe~~!zXrs!]!P!Q!]#O#P!]#U#V!]#Y#Z!]#b#c!]#f#g!]#h#i!]#i#j#g~#jR!Q![#s!c!i#s#T#Z#s~#vR!Q![$P!c!i$P#T#Z$P~$SR!Q![$]!c!i$]#T#Z$]~$`R!Q![!]!c!i!]#T#Z!]~$nOh~~$qQ!Q!R$w!R![&V~$|RT~!O!P%V!g!h%k#X#Y%k~%YP!Q![%]~%bRT~!Q![%]!g!h%k#X#Y%k~%nR{|%w}!O%w!Q![%}~%zP!Q![%}~&SPT~!Q![%}~&[ST~!O!P%V!Q![&V!g!h%k#X#Y%k~&mOg~~&rO]~~&wO[~~&zP#T#U&}~'QP#`#a'T~'WP#g#h'Z~'^P#X#Y'a~'fOR~~'iP#i#j'l~'oP#`#a'r~'uP#`#a'x~'}OS~~(QP#f#g(T~(WP#i#j(Z~(^P#X#Y(a~(fOQ~~(kOW~~(pOV~",tokenizers:[0],topRules:{JsonText:[0,1]},tokenPrec:0}),Q=()=>a=>{try{JSON.parse(a.state.doc.toString())}catch(O){if(!(O instanceof SyntaxError))throw O;const e=i(O,a.state.doc);return[{from:e,message:O.message,severity:"error",to:e}]}return[]};function i(a,O){let e;return(e=a.message.match(/at position (\d+)/))?Math.min(+e[1],O.length):(e=a.message.match(/at line (\d+) column (\d+)/))?Math.min(O.line(+e[1]).from+ +e[2]-1,O.length):0}t=l.define({name:"json",parser:P.configure({props:[m.add({Object:o({except:/^\s*\}/}),Array:o({except:/^\s*\]/})}),g.add({"Object Array":u})]}),languageData:{closeBrackets:{brackets:["[","{",'"']},indentOnInput:/^\s*[\}\]]$/}}),n=function(){return new h(t)}});export{b as __tla,n as json,t as jsonLanguage,Q as jsonParseLinter};