(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{11:function(e,a,t){},19:function(e,a,t){"use strict";t.r(a);t(10),t(11);var n=t(8),c=t.n(n),o=t(1),l=t.n(o),r=t(21),i=t(23),s=t(22),p=t(24);const u=()=>Promise.all([t.e(0),t.e(3)]).then(t.bind(null,475)),m=()=>Promise.all([t.e(0),t.e(6),t.e(2)]).then(t.bind(null,476));var d=async function(e){const a=[{path:"/",exact:!0,importSource:u},{path:"/articles/:article",importSource:m}],t=(await async function(e,a){return Promise.all(e.map(async e=>{const t=Object(r.a)(a,e);let n;if(t){const{preLoadData:a,default:c}=await e.importSource();a&&await a(t),n=c}else n=Object(o.lazy)(e.importSource);return{...e,component:n}}))}(a,e)).map(e=>l.a.createElement(i.a,Object.assign({key:e.path},e)));return l.a.createElement(s.a,null,l.a.createElement(o.Suspense,{fallback:l.a.createElement("div",null,"...")},l.a.createElement(p.a,null,t)))};!async function(){const e=await d(location.pathname),a=document.getElementById("app");c.a.hydrate(e,a),document.dispatchEvent(new Event("app-ready"))}()}},[[19,4,5]]]);