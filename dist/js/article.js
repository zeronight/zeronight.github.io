(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{474:function(e,t,a){},481:function(e,t,a){"use strict";a.r(t);var c=a(1),n=a.n(c),r=a(207),l=a.n(r),s=a(60),i=a(479),o=a(473),m=a.n(o);var u=({value:e,language:t})=>n.a.createElement(i.a,{language:t,style:m.a},e);a(474),a(475);const p=Object(c.lazy)(()=>Promise.all([a.e(8),a.e(3)]).then(a.bind(null,482)));var d=({article:e})=>n.a.createElement(c.Fragment,null,n.a.createElement("article",{className:"article"},n.a.createElement("h1",{className:"article_title"},e.title),n.a.createElement("div",{className:"article_meta"},n.a.createElement("span",{className:"article_date"},Object(s.format)(e.date,"YYYY-MM-DD")),n.a.createElement("span",{className:"article_tags"},e.tags.join(","))),n.a.createElement(l.a,{className:"markdown-body",source:e.content,renderers:{code:u}})),n.a.createElement(c.Suspense,{fallback:n.a.createElement("div",null)},n.a.createElement(p,{id:e.route}))),h=a(54);a.d(t,"preLoadData",function(){return w});let f=null;const E=e=>Object(h.a)(`/api/article/${e}`),w=async e=>{f=await E(e.params.article)};t.default=class extends c.PureComponent{constructor(e){super(e);const{match:{params:{article:t}}}=e,a=f&&f.route===t;this.state={article:a?f:null}}componentDidMount(){null===this.state.article&&this.fetchArticle()}componentDidUpdate(e){const{article:t}=this.props.match.params;t!==e.match.params.article&&this.fetchArticle()}render(){const{article:e}=this.state;return e?n.a.createElement(d,{article:e}):null}async fetchArticle(){const{match:{params:{article:e}}}=this.props,t=await E(e);this.setState({article:t})}}},54:function(e,t,a){"use strict";function c(e,t){return fetch(e,t).then(e=>e.json())}a.d(t,"a",function(){return c})}}]);