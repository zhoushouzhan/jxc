import{a as T,r as i,w as j,o as E,b as y,c as I,d,v as M,h as v,i as t,m as b,f as p,e as u,F as U,q as $,t as x,k as F,l as H,g as R,y as k,z as q,E as z}from"./index-ffc5c309.js";const A=t("i",{class:"ri-2x ri-building-3-fill text-gray-500 ml-2"},null,-1),S=["innerHTML"],G=t("div",{class:"flex-1 flex flex-row-reverse space-x-reverse space-x-2"},null,-1),J={class:"table-auto w-full text-sm"},K={class:"bg-gray-100"},O={class:"px-2 py-2 border w-10 font-thin"},Q=t("th",{class:"px-2 py-2 border w-10 text-center"},"ID",-1),W=t("th",{class:"px-2 py-2 border text-left"},"名称",-1),X=t("th",{class:"px-2 py-2 border w-44"},"联系电话",-1),Y=t("th",{class:"px-2 py-2 border w-32 text-center"},"操作",-1),Z={class:"border px-2"},tt={class:"border px-2 text-center"},et={class:"border px-2"},ot={class:"border px-2 text-center"},st={class:"border px-2 py-2 text-center"},at=["onClick"],lt=["onClick"],nt={class:"border p-2"},rt={class:"border p-2",colspan:"6"},dt={key:0,class:"mt-3"},pt={__name:"list",emits:["jumpCom"],setup(ct,{emit:C}){const g=C,V=T(!1),w=()=>{g("jumpCom",{to:"add"})},a=i({totalRecords:0,pageCount:0,currentPage:1}),D=e=>{a.currentPage=e,_()},c=i([]),l=i([]),n=i([]);j(n,(e,o)=>{l.length=0,e.length>0?c.forEach(r=>{l.push(r.id)}):l.length=0});const L=e=>{g("jumpCom",{to:"edit",id:e})},_=async()=>{let e=await R("factory/index",{page:a.currentPage});if(e.code==1){a.currentPage=e.data.current_page,a.pageCount=e.data.last_page,a.totalRecords=e.data.total,c.length=0;for(let o in e.data.data)c[o]=e.data.data[o]}V.value=!0},f=e=>{if(e==0&&(e=l.length?l:0),!e){k({type:"alter-error",text:"请选择项目"});return}q({text:"确认删除吗？"}).then(async()=>{const o=await z("factory/delete",{ids:e});o.code&&(k({type:"alter-success",text:o.msg}),_())}).catch(o=>{})};return E(()=>{_()}),(e,o)=>{const r=y("ypcheckbox"),B=y("yppage"),N=y("yplayout"),m=I("tooltip");return d(),M(N,null,{header:v(s=>[A,t("div",{class:"text-xl px-3",innerHTML:s.meta.title},null,8,S),G,t("button",{class:"yp-button yp-button-sm yp-button-purple rounded-sm",onClick:w},"增加")]),list:v(()=>[t("table",J,[t("thead",K,[t("tr",null,[t("th",O,[b(p(r,{value:"all",modelValue:n,"onUpdate:modelValue":o[0]||(o[0]=s=>n=s)},null,8,["modelValue"]),[[m,"全选",void 0,{top:!0}]])]),Q,W,X,Y])]),t("tbody",null,[(d(!0),u(U,null,$(c,(s,P)=>(d(),u("tr",{class:"hover:bg-gray-100",key:P},[t("td",Z,[p(r,{value:s.id,modelValue:l,"onUpdate:modelValue":o[1]||(o[1]=h=>l=h)},null,8,["value","modelValue"])]),t("td",tt,x(s.id),1),t("td",et,x(s.title),1),t("td",ot,x(s.mobile),1),t("td",st,[t("button",{class:"yp-button yp-button-sm rounded-sm mr-2",onClick:h=>L(s.id)},"编辑",8,at),t("button",{class:"yp-button yp-button-red yp-button-sm rounded-sm",onClick:h=>f(s.id)},"删除",8,lt)])]))),128))]),t("tfoot",null,[t("tr",null,[t("td",nt,[b(p(r,{value:"all",modelValue:n,"onUpdate:modelValue":o[2]||(o[2]=s=>n=s)},null,8,["modelValue"]),[[m,"全选",void 0,{right:!0}]])]),t("td",rt,[b((d(),u("button",{class:"yp-button yp-button-red yp-button-sm rounded-sm",onClick:o[3]||(o[3]=s=>f(0))},[F("批量删除")])),[[m,"批量删除",void 0,{bottom:!0}]])])])])]),a.pageCount>1?(d(),u("div",dt,[p(B,{onTopage:D,pageData:a},null,8,["pageData"])])):H("",!0)]),_:1})}}};export{pt as default};
