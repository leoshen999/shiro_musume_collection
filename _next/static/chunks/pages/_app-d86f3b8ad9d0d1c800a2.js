(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[888],{1476:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return f}});var r=n(2809),o=n(7294),c=(n(213),n(4882),n(7803)),u=n(5893);function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){(0,r.Z)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(){navigator.serviceWorker&&navigator.serviceWorker.register("/shiro_musume_collection/sw.js")}function f(e){var t=e.Component,n=e.pageProps;return(0,o.useEffect)((function(){var e=document.querySelector("#jss-server-side");e&&e.parentElement&&e.parentElement.removeChild(e),"interactive"===document.readyState||"complete"===document.readyState?s():document.addEventListener("DOMContentLoaded",s,!0)}),[]),(0,u.jsx)(c.nS,{children:(0,u.jsx)(t,a({},n))})}},7803:function(e,t,n){"use strict";function r(e,t,n,r,o,c,u){try{var i=e[c](u),a=i.value}catch(s){return void n(s)}i.done?t(a):Promise.resolve(a).then(r,o)}function o(e){return function(){var t=this,n=arguments;return new Promise((function(o,c){var u=e.apply(t,n);function i(e){r(u,o,c,i,a,"next",e)}function a(e){r(u,o,c,i,a,"throw",e)}i(void 0)}))}}n.d(t,{nS:function(){return p},ZP:function(){return f}});var c=n(809),u=n.n(c),i=n(7294),a=n(5893),s=i.createContext({owns:[],onChangeOwn:function(){}}),f=s;function p(e){var t=e.children,n=(0,i.useState)([]),r=n[0],c=n[1];function f(){return(f=o(u().mark((function e(t,n){var o,i,a;return u().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return");case 2:return o=r.filter((function(e){return e!==t})),n&&o.push(t),c(o),(i=new FormData).set("id",t.toString()),i.set("own",n?"1":"0"),e.prev=8,e.next=11,fetch("".concat("/shiro_musume_collection/backend/","set_own.php"),{method:"POST",body:i});case 11:(a=e.sent).ok||alert("Failed to fetch set_own.php for id ".concat(t," (").concat(a.status,")")),e.next=18;break;case 15:e.prev=15,e.t0=e.catch(8),alert("Failed to fetch set_own.php for id ".concat(t," (").concat(e.t0,")"));case 18:case"end":return e.stop()}}),e,null,[[8,15]])})))).apply(this,arguments)}return(0,i.useEffect)((function(){o(u().mark((function e(){return u().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:e.next=6;break;case 4:e.t1=e.sent,(0,e.t0)(e.t1);case 6:case"end":return e.stop()}}),e)})))()}),[]),(0,a.jsx)(s.Provider,{value:{owns:r,onChangeOwn:function(e,t){return f.apply(this,arguments)}},children:t})}},213:function(){window.location.pathname.startsWith("/shiro_musume_collection/")||(window.location.pathname="/shiro_musume_collection/")},6363:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/_app",function(){return n(1476)}])},4882:function(){},2809:function(e,t,n){"use strict";function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}n.d(t,{Z:function(){return r}})}},function(e){var t=function(t){return e(e.s=t)};e.O(0,[774,179],(function(){return t(6363),t(4651)}));var n=e.O();_N_E=n}]);