import{s as L,a,o as V,b as x,d as n,e as i,f as B,h as y,i as t,n as N,k as T,F as b,q as M,t as _,v as f,x as z,l as E,z as F,E as H,y as q,g as R}from"./index-ffc5c309.js";import h from"./form-7ed835f3.js";import S from"./auth-8f64bc05.js";import"./rule-021c4508.js";import"./ruleItem-4a76c489.js";import"./ckbox-2872aa9d.js";const U={class:"flex items-center"},W=["innerHTML"],j=t("div",{class:"text-gray-400"},null,-1),A=t("div",{class:"flex-1"},null,-1),G=t("i",{class:"ri-add-line ri-lg pr-1"},null,-1),J={class:"yp-table-datalist"},K=t("thead",null,[t("tr",null,[t("th",{class:"w-10"},"ID"),t("th",{class:"w-40"},"角色名称"),t("th",{class:"w-40 text-center"},"成员"),t("th",null,"描述"),t("th",{class:"w-40 text-center"},"操作")])],-1),O={key:0},P={class:"text-center"},Q={class:"space-x-2"},X=["onClick"],Y=["onClick"],Z=["onClick"],tt={key:1},et=t("tr",null,[t("td",{colspan:"4"},[t("div",{class:"p-5 text-center text-gray-400"}," 暂无数据 ")])],-1),st=[et],ut={__name:"index",setup(ot){const c=L(h),l=a(!1),p=a(""),d=a(""),u=a(0),r=a(0),g=()=>{d.value="增加角色",c.value=h,l.value=!0,u.value=0,r.value=700},k=s=>{d.value="编辑角色",c.value=h,l.value=!0,u.value=s,r.value=700},C=s=>{d.value="角色授权",l.value=!0,c.value=S,u.value=s,r.value=1e3},w=s=>{F({text:"确认删除吗？"}).then(async()=>{const o=await H("/roles/delete",{id:s});o.code==1&&(q({type:"alter-success",text:o.msg}),v())}).catch(o=>{})},v=async()=>{const s=await R("/roles/index");p.value=s.data};return V(()=>{v()}),(s,o)=>{const D=x("yplayout"),$=x("ypdialog");return n(),i(b,null,[B(D,null,{header:y(e=>[t("div",U,[t("i",{class:N(["ri-2x text-gray-500 ml-2",e.meta.icon||"ri-information-line"])},null,2),t("div",{class:"text-xl px-2",innerHTML:e.meta.title},null,8,W),j]),A,t("button",{class:"yp-button yp-button-orange rounded",type:"button",onClick:g},[G,T(" 增加 ")])]),list:y(()=>[t("table",J,[K,p.value.length?(n(),i("tbody",O,[(n(!0),i(b,null,M(p.value,(e,I)=>(n(),i("tr",{key:I},[t("td",null,_(e.id),1),t("td",null,_(e.title),1),t("td",P,_(e.admin.length),1),t("td",null,_(e.intro),1),t("td",Q,[t("button",{class:"yp-button yp-button-sm yp-button-orange rounded",onClick:m=>C(e.id)},"授权",8,X),t("button",{class:"yp-button yp-button-sm rounded",onClick:m=>k(e.id)},"编辑",8,Y),t("button",{class:"yp-button yp-button-sm yp-button-red rounded",onClick:m=>w(e.id)},"删除",8,Z)])]))),128))])):(n(),i("tbody",tt,st))])]),_:1}),l.value?(n(),f($,{key:0,width:r.value,title:d.value,mask:1,onClose:o[1]||(o[1]=e=>l.value=!1)},{default:y(()=>[(n(),f(z(c.value),{rolesId:u.value,onUpdate:v,onClose:o[0]||(o[0]=e=>l.value=!1)},null,40,["rolesId"]))]),_:1},8,["width","title"])):E("",!0)],64)}}};export{ut as default};