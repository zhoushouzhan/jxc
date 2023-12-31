import{a as z,r as u,w as S,g as Z,o as q,b as D,c as G,d as i,e as l,v as y,h as f,i as t,n as R,k as H,F as m,q as L,t as h,m as b,l as V,x as U,s as I,z as j,E as g,y as k}from"./index-ffc5c309.js";import A from"./add-bf23024b.js";import J from"./edit-be220463.js";const K={class:"flex items-center"},O=["innerHTML"],P=t("div",{class:"text-gray-400"},"用于菜单，联动，等",-1),Q=t("div",{class:"flex-1"},null,-1),W=t("i",{class:"ri-add-line ri-lg pr-1"},null,-1),X={class:"overflow-auto"},Y={class:"flex space-x-2 p-2"},tt=t("div",null,"路径：",-1),et={class:"flex"},st=["onClick"],ot=t("span",{class:"px-2 text-gray-300"},">",-1),nt={class:"table-auto w-full text-sm min-w-[800px]"},it=t("thead",{class:"bg-gray-100 font-thin"},[t("tr",null,[t("th",{class:"p-2 border w-10"},"ID"),t("th",{class:"p-2 border text-left"},"名称"),t("th",{class:"px-2 py-2 border w-32 text-center"},"操作")])],-1),lt={class:"hover:bg-gray-100"},at={class:"border p-2 text-center"},ct=["onClick"],dt={class:"flex space-x-2"},rt=t("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",class:"w-4 fill-[#FFD96F]"},[t("path",{d:"M4 5V19H20V7H11.5858L9.58579 5H4ZM12.4142 5H21C21.5523 5 22 5.44772 22 6V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3H10.4142L12.4142 5Z"})],-1),pt=["onClick"],_t={class:"flex space-x-2"},ut={class:"border p-2"},ht={class:"flex space-x-2"},vt=["onClick"],xt=t("i",{class:"ri-edit-box-line"},null,-1),yt=[xt],ft=["onClick"],mt=t("i",{class:"ri-add-line"},null,-1),bt=[mt],gt=["onClick"],kt=t("i",{class:"ri-delete-bin-4-line"},null,-1),Ct=[kt],Lt={__name:"index",setup(wt){const C=z(!1),n=u({open:!1,title:"未命名",mask:1,componentId:"",preitem:[]}),r=u({pid:0}),p=s=>{s.havesid&&s.id!=r.pid&&(B(s),r.pid=s.id)};S(()=>r.pid,s=>{c()});const a=u([]),B=s=>{console.log(s);let e=-1;for(let _ in a)a[_].id==s.id&&(e=parseInt(_));e<0?a.push(s):(console.log(a,e+1),a.splice(e+1))},v=u([]),c=async()=>{const s=await Z("/classify/index",r);s.code&&(v.length=0,s.data.forEach(e=>{v.push(e)}))},w=s=>{n.title="增加分类",n.preitem=s,n.componentId=I(A),n.open=!0},F=s=>{n.title="编辑分类",n.preitem=s,n.componentId=I(J),n.open=!0},M=s=>{j({text:"确认删除吗？"}).then(async()=>{const e=await g("/classify/delete",{ids:s});e.code==1&&(k({type:"alter-success",text:e.msg}),c())})},E=async s=>{const e=await g("/classify/save",s);e.code==1&&(k({type:"alter-success",text:e.msg}),c())},N=async s=>{const e=await g("/classify/update",s);e.code==1&&(k({type:"alter-success",text:e.msg}),c())};return q(()=>{c(),C.value=!0}),(s,e)=>{const _=D("yplayout"),T=D("ypdialog"),x=G("tooltip");return i(),l(m,null,[C.value?(i(),y(_,{key:0},{header:f(o=>[t("div",K,[t("i",{class:R(["ri-2x text-gray-500 ml-2",o.meta.icon||"ri-information-line"])},null,2),t("div",{class:"text-xl px-3",innerHTML:o.meta.title},null,8,O),P]),Q,t("button",{class:"yp-button yp-button-darkgreen h-[33px]",type:"button",onClick:e[0]||(e[0]=$=>w())},[W,H(" 增加 ")])]),list:f(()=>[t("div",X,[t("div",Y,[tt,t("div",et,[t("div",{class:"text-gray-500 hover:text-blue-500 hover:cursor-pointer",onClick:e[1]||(e[1]=o=>(p({id:0,havesid:1}),a.length=0))},"顶级"),(i(!0),l(m,null,L(a,(o,$)=>(i(),l("div",{class:"text-gray-500 hover:text-blue-500 hover:cursor-pointer",onClick:d=>p(o)},[ot,H(h(o.title),1)],8,st))),256))])]),t("table",nt,[it,t("tbody",null,[(i(!0),l(m,null,L(v,(o,$)=>(i(),l("tr",lt,[t("td",at,h(o.id),1),o.havesid?(i(),l("td",{key:0,class:"border p-2 cursor-pointer",onClick:d=>p(o)},[t("div",dt,[rt,t("div",null,h(o.title),1)])],8,ct)):(i(),l("td",{key:1,class:"border p-2",onClick:d=>p(o)},[t("div",_t,[t("div",null,h(o.title),1)])],8,pt)),t("td",ut,[t("div",ht,[b((i(),l("button",{class:"yp-button yp-button-sm rounded",onClick:d=>F(o)},yt,8,vt)),[[x,"编辑",void 0,{left:!0}]]),b((i(),l("button",{class:"yp-button yp-button-sm yp-button-orange rounded",onClick:d=>w(o)},bt,8,ft)),[[x,"增加子级",void 0,{top:!0}]]),b((i(),l("button",{class:"yp-button yp-button-sm yp-button-red rounded",onClick:d=>M(o.id)},Ct,8,gt)),[[x,"删除",void 0,{top:!0}]])])])]))),256))])])])]),_:1})):V("",!0),n.open?(i(),y(T,{key:1,width:"1200",title:n.title,mask:1,onClose:e[3]||(e[3]=o=>n.open=!1)},{default:f(()=>[(i(),y(U(n.componentId),{preitem:n.preitem,onClose:e[2]||(e[2]=o=>n.open=!1),onGetList:c,onSave:E,onUpdate:N},null,40,["preitem"]))]),_:1},8,["title"])):V("",!0)],64)}}};export{Lt as default};
