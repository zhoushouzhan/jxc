import{a as d,r as T,p as R,z as C,E,y as N,M as h,o as O,b as x,d as n,e as u,f as y,h as p,i as e,n as I,k as L,F as m,q as M,v,j as g,l as V,g as B}from"./index-ffc5c309.js";import D from"./form-2aeae6fe.js";import U from"./ruleChild-28ffc537.js";import $ from"./ruleItem-6234cb49.js";const z={class:"flex items-center"},F=["innerHTML"],H=e("div",{class:"text-gray-400"},null,-1),J=e("div",{class:"flex-1"},null,-1),j=e("i",{class:"ri-add-line ri-lg pr-1"},null,-1),q=e("div",{class:"flex border-b bg-gray-100 leading-8 font-bold"},[e("div",{class:"text-center md:w-20 border-r w-8"},"ID"),e("div",{class:"md:w-48 pl-2 flex-1 md:flex-initial"},"菜单名称"),e("div",{class:"md:w-32 pl-2 hidden md:block"},"类型"),e("div",{class:"md:w-32 pl-2 hidden md:block text-center"},"图标"),e("div",{class:"md:w-32 pl-2 hidden md:block text-center"},"排序"),e("div",{class:"md:w-32 pl-2 hidden md:block text-center"},"状态"),e("div",{class:"w-40 text-center px-1"},"操作")],-1),X={__name:"index",setup(A){const i=d(""),_=d("增加菜单"),o=d(!1),c=d(0),s=T({path:[]}),b=async()=>{c.value=0,o.value=!0},k=t=>{c.value=t,_.value="编辑菜单",o.value=!0},r=async()=>{const t=await B("/rule/index");i.value=t.data};return R("setcom",{item:{},openedRules:s,edit:t=>{k(t)},destory:t=>{C({text:"确认删除吗？"}).then(async()=>{const l=await E("/rule/delete",{id:t});l.code==1&&(N({type:"alter-success",text:l.msg}),r(),h.commit("User/SET_ROUTE",i.value))}).catch(l=>{})},update:async()=>{await r(),h.commit("User/SET_ROUTE",i.value)},clickSubMenu:t=>{s.path.includes(t)?(s.path.splice(s.path.indexOf(t),1),s.path=s.path.filter(l=>l.indexOf(t+"/")!==0)):s.path.push(t),sessionStorage.setItem("openRules",JSON.stringify(s.path))}}),O(async()=>{sessionStorage.getItem("openRules")&&(s.path=JSON.parse(sessionStorage.getItem("openRules"))),r()}),(t,l)=>{const w=x("yplayout"),S=x("ypdialog");return n(),u(m,null,[y(w,null,{header:p(a=>[e("div",z,[e("i",{class:I(["ri-2x text-gray-500 ml-2",a.meta.icon||"ri-information-line"])},null,2),e("div",{class:"text-xl px-2",innerHTML:a.meta.title},null,8,F),H]),J,e("button",{class:"yp-button yp-button-orange rounded",type:"button",onClick:b},[j,L(" 增加菜单 ")])]),list:p(()=>[e("div",null,[q,(n(!0),u(m,null,M(i.value,(a,f)=>(n(),u(m,null,[a.children&&a.children.length>0?(n(),v(g(U),{item:a,key:f,basePath:a.id,leave:0},null,8,["item","basePath"])):(n(),v(g($),{item:a,key:f+1,leave:0},null,8,["item"]))],64))),256))])]),_:1}),o.value?(n(),v(S,{key:0,width:"800",title:_.value,mask:1,onClose:l[0]||(l[0]=a=>o.value=!1)},{default:p(()=>[y(D,{id:c.value},null,8,["id"])]),_:1},8,["title"])):V("",!0)],64)}}};export{X as default};
