(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{211:function(e,t,a){},495:function(e,t,a){"use strict";a.r(t);var c=a(0),s=a.n(c),i=a(8),n=a(65);a(211);var r=({articles:e})=>{const t=e.map(({title:e,tags:t,date:a,route:c})=>s.a.createElement(i.b,{key:e,to:`/articles/${c}`,className:"articleList_item"},s.a.createElement("h2",{className:"articleList_title"},e),s.a.createElement("div",{className:"articleList_meta"},s.a.createElement("span",{className:"articleList_tags"},t.join(",")),s.a.createElement("span",{className:"articleList_date"},Object(n.format)(a,"YYYY-MM-DD")))));return s.a.createElement("section",{className:"articleList"},t)},l=a(9);t.default=function({preLoadData:e}){const[t=[],a]=Object(c.useState)(e);return Object(c.useEffect)(()=>{e||Object(l.b)().then(e=>a(e))},[]),s.a.createElement(r,{articles:t})}}}]);