import{s as y,t as e,L as g,a as X,b as R,q as r,m as T,p as n,r as f,__tla as q}from"./MarkdownEditor-bf418232.js";import{__tla as w}from"./index-b04c3277.js";import"https://cdn.jsdelivr.net/npm/rsup-progress@3.1.1/dist/esm/index.js";import"https://cdn.jsdelivr.net/npm/web-vitals@3.3.2/+esm";import"./react-aeb67c7a.js";import"./clsx.m-1229b3e0.js";import"./react-error-boundary.esm-d3f489dd.js";let p,o,_=Promise.all([(()=>{try{return q}catch{}})(),(()=>{try{return w}catch{}})()]).then(async()=>{const u=R.deserialize({version:14,states:"%pOVOWOOObQPOOOpOSO'#C_OOOO'#Cp'#CpQVOWOOQxQPOOO!TQQOOQ!YQPOOOOOO,58y,58yO!_OSO,58yOOOO-E6n-E6nO!dQQO'#CqQ{QPOOO!iQPOOQ{QPOOO!qQPOOOOOO1G.e1G.eOOQO,59],59]OOQO-E6o-E6oO!yOpO'#CiO#RO`O'#CiQOQPOOO#ZO#tO'#CmO#fO!bO'#CmOOQO,59T,59TO#qOpO,59TO#vO`O,59TOOOO'#Cr'#CrO#{O#tO,59XOOQO,59X,59XOOOO'#Cs'#CsO$WO!bO,59XOOQO1G.o1G.oOOOO-E6p-E6pOOQO1G.s1G.sOOOO-E6q-E6q",stateData:"$g~OjOS~OQROUROkQO~OWTOXUOZUO`VO~OSXOTWO~OXUO[]OlZO~OY^O~O[_O~OT`O~OYaO~OmcOodO~OmfOogO~O^iOnhO~O_jOphO~ObkOqkOrmO~OcnOsnOtmO~OnpO~OppO~ObkOqkOrrO~OcnOsnOtrO~OWX`~",goto:"!^hPPPiPPPPPPPPPmPPPpPPsy!Q!WTROSRe]Re_QSORYSS[T^Rb[QlfRqlQogRso",nodeNames:"\u26A0 Content Text Interpolation InterpolationContent }} Entity Attribute VueAttributeName : Identifier @ Is ScriptAttributeValue AttributeScript AttributeScript AttributeName AttributeValue Entity Entity",maxTerm:36,skippedNodes:[0],repeatNodeCount:4,tokenData:"'y~RdXY!aYZ!a]^!apq!ars!rwx!w}!O!|!O!P#t!Q![#y![!]$s!_!`%g!b!c%l!c!}#y#R#S#y#T#j#y#j#k%q#k#o#y%W;'S#y;'S;:j$m<%lO#y~!fSj~XY!aYZ!a]^!apq!a~!wOm~~!|Oo~!b#RX`!b}!O!|!Q![!|![!]!|!c!}!|#R#S!|#T#o!|%W;'S!|;'S;:j#n<%lO!|!b#qP;=`<%l!|~#yOl~%W$QXY#t`!b}!O!|!Q![#y![!]!|!c!}#y#R#S#y#T#o#y%W;'S#y;'S;:j$m<%lO#y%W$pP;=`<%l#y~$zXX~`!b}!O!|!Q![!|![!]!|!c!}!|#R#S!|#T#o!|%W;'S!|;'S;:j#n<%lO!|~%lO[~~%qOZ~%W%xXY#t`!b}!O&e!Q![#y![!]!|!c!}#y#R#S#y#T#o#y%W;'S#y;'S;:j$m<%lO#y!b&jX`!b}!O!|!Q![!|![!]!|!c!}'V#R#S!|#T#o'V%W;'S!|;'S;:j#n<%lO!|!b'^XW!b`!b}!O!|!Q![!|![!]!|!c!}'V#R#S!|#T#o'V%W;'S!|;'S;:j#n<%lO!|",tokenizers:[6,7,new r("b~RP#q#rU~XP#q#r[~aOT~~",17,4),new r("!k~RQvwX#o#p!_~^TU~Opmq!]m!^;'Sm;'S;=`!X<%lOm~pUOpmq!]m!]!^!S!^;'Sm;'S;=`!X<%lOm~!XOU~~![P;=`<%lm~!bP#o#p!e~!jOk~~",72,2),new r("[~RPwxU~ZOp~~",11,15),new r("[~RPrsU~ZOn~~",11,14),new r("!e~RQvwXwx!_~^Tc~Opmq!]m!^;'Sm;'S;=`!X<%lOm~pUOpmq!]m!]!^!S!^;'Sm;'S;=`!X<%lOm~!XOc~~![P;=`<%lm~!dOt~~",66,35),new r("!e~RQrsXvw^~^Or~~cTb~Oprq!]r!^;'Sr;'S;=`!^<%lOr~uUOprq!]r!]!^!X!^;'Sr;'S;=`!^<%lOr~!^Ob~~!aP;=`<%lr~",66,33)],topRules:{Content:[0,1],Attribute:[1,7]},tokenPrec:157}),m=f.parser.configure({top:"SingleExpression"}),i=u.configure({props:[y({Text:e.content,Is:e.definitionOperator,AttributeName:e.attributeName,VueAttributeName:e.keyword,Identifier:e.variableName,"AttributeValue ScriptAttributeValue":e.attributeValue,Entity:e.character,"{{ }}":e.brace,"@ :":e.punctuation})]}),l={parser:m},S=i.configure({wrap:n((O,t)=>O.name=="InterpolationContent"?l:null)}),b=i.configure({wrap:n((O,t)=>O.name=="AttributeScript"?l:null),top:"Attribute"}),c={parser:S},Q={parser:b},a=T();function s(O){return O.configure({dialect:"selfClosing",wrap:n(P)},"vue")}o=s(a.language);function P(O,t){switch(O.name){case"Attribute":return/^(@|:|v-)/.test(t.read(O.from,O.from+2))?Q:null;case"Text":return c}return null}p=function(O={}){let t=a;if(O.base){if(O.base.language.name!="html"||!(O.base.language instanceof g))throw new RangeError("The base option must be the result of calling html(...)");t=O.base}return new X(t.language==a.language?o:s(t.language),[t.support,t.language.data.of({closeBrackets:{brackets:["{",'"']}})])}});export{_ as __tla,p as vue,o as vueLanguage};
