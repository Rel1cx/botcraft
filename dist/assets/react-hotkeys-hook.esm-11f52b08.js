import{a as i}from"./react-7029a116.js";import{__tla as Y}from"./index-444efe33.js";let D,Z=Promise.all([(()=>{try{return Y}catch{}})()]).then(async()=>{function C(){return C=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e},C.apply(this,arguments)}var S=["shift","alt","meta","mod","ctrl"],I={esc:"escape",return:"enter",".":"period",",":"comma","-":"slash"," ":"space","`":"backquote","#":"backslash","+":"bracketright",ShiftLeft:"shift",ShiftRight:"shift",AltLeft:"alt",AltRight:"alt",MetaLeft:"meta",MetaRight:"meta",OSLeft:"meta",OSRight:"meta",ControlLeft:"ctrl",ControlRight:"ctrl"};function l(e){return(I[e]||e).trim().toLowerCase().replace(/key|digit|numpad|arrow/,"")}function W(e){return S.includes(e)}function A(e,t){return t===void 0&&(t=","),e.split(t)}function O(e,t,n){t===void 0&&(t="+");var o=e.toLocaleLowerCase().split(t).map(function(f){return l(f)}),u={alt:o.includes("alt"),ctrl:o.includes("ctrl")||o.includes("control"),shift:o.includes("shift"),meta:o.includes("meta"),mod:o.includes("mod")},y=o.filter(function(f){return!S.includes(f)});return C({},u,{keys:y,description:n})}(function(){typeof document<"u"&&(document.addEventListener("keydown",function(e){e.key!==void 0&&j([l(e.key),l(e.code)])}),document.addEventListener("keyup",function(e){e.key!==void 0&&R([l(e.key),l(e.code)])})),typeof window<"u"&&window.addEventListener("blur",function(){d.clear()})})();var d=new Set;function q(e,t){t===void 0&&(t=",");var n=Array.isArray(e)?e:e.split(t);return n.every(function(o){return d.has(o.trim().toLowerCase())})}function j(e){var t=Array.isArray(e)?e:[e];d.has("meta")&&d.forEach(function(n){return!W(n)&&d.delete(n.toLowerCase())}),t.forEach(function(n){return d.add(n.toLowerCase())})}function R(e){var t=Array.isArray(e)?e:[e];e==="meta"?d.clear():t.forEach(function(n){return d.delete(n.toLowerCase())})}function F(e,t,n){(typeof n=="function"&&n(e,t)||n===!0)&&e.preventDefault()}function N(e,t,n){return typeof n=="function"?n(e,t):n===!0||n===void 0}function T(e){return K(e,["input","textarea","select"])}function K(e,t){var n=e.target;t===void 0&&(t=!1);var o=n&&n.tagName;return t instanceof Array?!!(o&&t&&t.some(function(u){return u.toLowerCase()===o.toLowerCase()})):!!(o&&t&&t===!0)}function z(e,t){return e.length===0&&t?(console.warn('A hotkey has the "scopes" option set, however no active scopes were found. If you want to use the global scopes feature, you need to wrap your app in a <HotkeysProvider>'),!0):t?e.some(function(n){return t.includes(n)})||e.includes("*"):!0}var B=function(e,t,n){n===void 0&&(n=!1);var o=t.alt,u=t.meta,y=t.mod,f=t.shift,v=t.ctrl,c=t.keys,k=e.key,m=e.code,r=e.ctrlKey,g=e.metaKey,w=e.shiftKey,p=e.altKey,b=l(m),s=k.toLowerCase();if(!n){if(o===!p&&s!=="alt"||f===!w&&s!=="shift")return!1;if(y){if(!g&&!r)return!1}else if(u===!g&&s!=="meta"&&s!=="os"||v===!r&&s!=="ctrl"&&s!=="control")return!1}return c&&c.length===1&&(c.includes(s)||c.includes(b))?!0:c?q(c):!c},G=i.createContext(void 0),J=function(){return i.useContext(G)};function _(e,t){return e&&t&&typeof e=="object"&&typeof t=="object"?Object.keys(e).length===Object.keys(t).length&&Object.keys(e).reduce(function(n,o){return n&&_(e[o],t[o])},!0):e===t}var Q=i.createContext({hotkeys:[],enabledScopes:[],toggleScope:function(){},enableScope:function(){},disableScope:function(){}}),U=function(){return i.useContext(Q)};function V(e){var t=i.useRef(void 0);return _(t.current,e)||(t.current=e),t.current}var x=function(e){e.stopPropagation(),e.preventDefault(),e.stopImmediatePropagation()},X=typeof window<"u"?i.useLayoutEffect:i.useEffect;D=function(e,t,n,o){var u=i.useRef(null),y=i.useRef(!1),f=n instanceof Array?o instanceof Array?void 0:o:n,v=e instanceof Array?e.join(f?.splitKey):e,c=n instanceof Array?n:o instanceof Array?o:void 0,k=i.useCallback(t,c??[]),m=i.useRef(k);c?m.current=k:m.current=t;var r=V(f),g=U(),w=g.enabledScopes,p=J();return X(function(){if(!(r?.enabled===!1||!z(w,r?.scopes))){var b=function(a,L){var H;if(L===void 0&&(L=!1),!(T(a)&&!K(a,r?.enableOnFormTags))&&!(r!=null&&r.ignoreEventWhen!=null&&r.ignoreEventWhen(a))){if(u.current!==null&&document.activeElement!==u.current&&!u.current.contains(document.activeElement)){x(a);return}(H=a.target)!=null&&H.isContentEditable&&!(r!=null&&r.enableOnContentEditable)||A(v,r?.splitKey).forEach(function($){var M,h=O($,r?.combinationKey);if(B(a,h,r?.ignoreModifiers)||(M=h.keys)!=null&&M.includes("*")){if(L&&y.current)return;if(F(a,h,r?.preventDefault),!N(a,h,r?.enabled)){x(a);return}m.current(a,h),L||(y.current=!0)}})}},s=function(a){a.key!==void 0&&(j(l(a.code)),(r?.keydown===void 0&&r?.keyup!==!0||r!=null&&r.keydown)&&b(a))},P=function(a){a.key!==void 0&&(R(l(a.code)),y.current=!1,r!=null&&r.keyup&&b(a,!0))},E=u.current||f?.document||document;return E.addEventListener("keyup",P),E.addEventListener("keydown",s),p&&A(v,r?.splitKey).forEach(function(a){return p.addHotkey(O(a,r?.combinationKey,r?.description))}),function(){E.removeEventListener("keyup",P),E.removeEventListener("keydown",s),p&&A(v,r?.splitKey).forEach(function(a){return p.removeHotkey(O(a,r?.combinationKey,r?.description))})}}},[v,r,w]),u}});export{Z as __tla,D as u};