import{U as D,O as b,d as i,e as o,i as t,n as w,l as _,F as g,q as C,t as k,m as v,I as M,K as R,B as U,b as O,f as m,h as L,v as j,G as B,J as F,T as E,V as $,M as p,p as G,o as N,H as W,u as q,r as T,w as V,a as x,j as y,g as J,y as H,z as K,c as Q,k as X}from"./index-ffc5c309.js";import{_ as Y}from"./logo-c4b87c8b.js";const Z={class:"icon"},ee={class:"flex-1"},te=t("i",{class:"ri-arrow-down-s-line"},null,-1),se=[te],z={__name:"menuitem",props:{item:{type:Object},openList:{type:Object},currentPage:{default:[]},deep:{type:Number,default:0}},emits:["changeMenu"],setup(n,{emit:h}){const a=D(),c=n,u=h,s=b(()=>c.currentPage.indexOf(c.item.id)<0?"yp-menu-title":c.item.children?"yp-menu-title-parent-current":"yp-menu-title-current"),e=f=>{f.type==2&&f.path==a.currentRoute.value.path?window.location.reload():u("changeMenu",f)};return(f,l)=>(i(),o("div",{class:w(s.value),onClick:l[0]||(l[0]=R(r=>e(n.item),["stop"]))},[t("div",Z,[n.deep==0&&n.item.meta.icon?(i(),o("i",{key:0,class:w([n.item.meta.icon,"px-1"])},null,2)):_("",!0)]),(i(!0),o(g,null,C(n.deep,r=>(i(),o("div",{class:"w-5",key:r}))),128)),t("div",ee,k(n.item.title),1),v(t("div",null,[t("div",{class:w(["yp-menu-title-arrow",n.openList.indexOf(n.item.id)<0?" rotate-0":"rotate-180"])},se,2)],512),[[M,n.item.children&&n.item.children.length>0]])],2))}},ne={class:"menubox"},ie={__name:"children",props:{listItem:{type:Object,default:[]},openList:{type:Object,default:[]},currentPage:{default:[]},deep:{type:Number,default:0}},setup(n){const h=U("menuType"),a=s=>{h.changeMenu(s)},c={onEnter(s){s.style.height="auto";const e=window.getComputedStyle(s).height;s.style.height="0px",s.offsetHeight,s.style.height=e},onAfterEnter(s){s.style.height=null},onLeave(s){s.style.height=window.getComputedStyle(s).height,s.offsetHeight,s.style.height="0px"},onAfterLeave(s){s.style.height=null}},u=s=>{s.type==1&&s.children&&s.children.length>0&&a(s.id),s.type==2&&$.push(s.path)};return(s,e)=>{const f=O("Children",!0);return i(),o("div",null,[(i(!0),o(g,null,C(n.listItem,(l,r)=>(i(),o(g,{key:r},[m(z,{item:l,openList:n.openList,onChangeMenu:d=>u(l),currentPage:n.currentPage,deep:n.deep},null,8,["item","openList","onChangeMenu","currentPage","deep"]),m(E,B(F(c)),{default:L(()=>[v(t("div",ne,[l.children&&l.children.length>0?(i(),j(f,{key:0,listItem:l.children,currentPage:n.currentPage,openList:n.openList,deep:n.deep+1},null,8,["listItem","currentPage","openList","deep"])):_("",!0)],512),[[M,n.openList.indexOf(l.id)>=0]])]),_:2},1040)],64))),128))])}}},le={class:"yp-menu-box"},oe={class:"menubox"},re={__name:"index",props:{dataList:{type:Object,default:[]}},setup(n){const h=b(()=>p.getters.openMenuId),a=b(()=>p.getters.currentMenu);G("menuType",{changeMenu:e=>{p.commit("Sys/setMenuId",e)}});const c=e=>{p.commit("Sys/setMenuId",e)},u=e=>{e.type==1&&e.children&&e.children.length>0&&c(e.id),e.type==2&&$.push(e.path)},s={onEnter(e){e.style.height="auto";const f=window.getComputedStyle(e).height;e.style.height="0px",e.offsetHeight,e.style.height=f},onAfterEnter(e){e.style.height=null},onLeave(e){e.style.height=window.getComputedStyle(e).height,e.offsetHeight,e.style.height="0px"},onAfterLeave(e){e.style.height=null}};return N(()=>{}),(e,f)=>(i(),o("div",le,[(i(!0),o(g,null,C(n.dataList,(l,r)=>(i(),o(g,{key:r},[m(z,{item:l,openList:h.value,currentPage:a.value,onChangeMenu:d=>u(l)},null,8,["item","openList","currentPage","onChangeMenu"]),l.children&&l.children.length>0?(i(),j(E,B(W({key:0},s)),{default:L(()=>[v(t("div",oe,[m(ie,{listItem:l.children,openList:h.value,currentPage:a.value,deep:1},null,8,["listItem","openList","currentPage"])],512),[[M,h.value.indexOf(l.id)>=0]])]),_:2},1040)):_("",!0)],64))),128))]))}},ae={class:"relative flex flex-wrap items-center justify-between text-gray-600 text-sm"},ce={class:"container-fluid w-full flex flex-wrap items-center justify-between pl-2"},ue={class:"bg-grey-light rounded-md w-full","aria-label":"breadcrumb"},de={class:"list-reset flex"},he={key:0},fe=t("span",{class:"text-gray-600 mx-2"},"/",-1),me=[fe],pe={__name:"BreadCrumb",setup(n){const h=q(),a=T({list:[]});return a.list=h.matched,V(()=>h.matched,(c,u)=>{a.list=c}),(c,u)=>(i(),o("nav",ae,[t("div",ce,[t("nav",ue,[t("ol",de,[(i(!0),o(g,null,C(a.list,(s,e)=>(i(),o(g,{key:e},[t("li",{class:w({"text-lime-600 font-bold":e==a.list.length-1})},k(s.meta.title),3),e<a.list.length-1?(i(),o("li",he,me)):_("",!0)],64))),128))])])])]))}},ge={class:"flex overflow-hidden h-full"},ve={class:"w-56 bg-hui-900 flex flex-col flex-shrink-0",id:"sysmenu"},ye=t("div",null,[t("img",{src:Y,class:"w-8"})],-1),_e=t("div",{class:"pl-2 delay-700"},"泽玛珠宝管理平台",-1),xe={class:"ver"},we=t("div",{class:"hover:text-lime-500 duration-300"}," By V1.0 ",-1),be=t("i",{class:"ri-eye-off-fill"},null,-1),ke=[be],Le={class:"h-16 bg-gray-100 flex items-center pl-4 flex-shrink-0 space-x-2"},$e={key:0,class:"w-6 h-6 rounded-full bg-red-600 flex items-center justify-center text-white"},Ce=t("div",null,[t("i",{class:"ri-home-2-line text-gray-500 text-xl"})],-1),Me={class:"flex-1 flex justify-end items-center space-x-2 text-sm mr-5"},Pe={class:"flex items-center space-x-5"},Oe={class:"flex items-center"},je=t("div",null,"当前用户：",-1),Ie={class:"font-bold text-blue-500"},Se={class:"flex items-center"},He=t("div",null,"部门：",-1),Be=t("i",{class:"ri-brush-2-fill text-xl"},null,-1),Ee=[Be],Ne=t("i",{class:"ri-login-circle-fill text-xl"},null,-1),Te=[Ne],Ae={__name:"home",setup(n){T([{title:"个人中心",type:"personHome",icon:"ri-user-line"},{title:"修改密码",type:"editpass",icon:"ri-lock-line"},{title:"退出",type:"loginOut",icon:"ri-logout-box-r-line"}]);const h=$.path,a=x(null);x(null);const c=x(null),u=x(!1),s=async()=>{const r=await J("/index/clearCache");r.code&&H({type:"alter-success",text:r.msg})},e=b(()=>p.getters.routes),f=r=>{switch(r){case"personHome":break;case"editpass":break;case"loginOut":K({text:"确定要退出吗？"}).then(()=>{p.commit("User/LOGIN_OUT"),H({type:"alter-success",text:"您已成功退出"}),$.push("/login")});break}};V(u,r=>{l()});const l=()=>{let r=document.body.offsetWidth,d=0;u.value||(d=224),c.value.offsetWidth,c.value.style.width=r-d+"px"};return N(()=>{l(),window.addEventListener("resize",()=>{l()})}),(r,d)=>{const I=O("router-link"),A=O("router-view"),S=Q("tooltip");return i(),o("div",ge,[v(t("div",ve,[m(I,{class:"flex flex-wrap items-center text-gray-100 py-5 px-3",to:"/"},{default:L(()=>[ye,_e]),_:1}),m(y(re),{dataList:e.value},null,8,["dataList"]),t("div",xe,[we,t("div",{class:"hover:text-lime-500 duration-300 cursor-pointer",onClick:d[0]||(d[0]=P=>u.value=!0)},ke)])],512),[[M,!u.value]]),t("div",{class:"flex-1 flex flex-col",ref_key:"main",ref:a},[t("div",Le,[u.value?(i(),o("div",$e,[t("i",{class:"ri-menu-fold-fill ri-md",onClick:d[1]||(d[1]=P=>u.value=!1)})])):_("",!0),Ce,t("div",null,[m(y(pe))]),t("div",Me,[t("div",Pe,[t("div",Oe,[je,t("div",Ie,[m(I,{to:"/my"},{default:L(()=>[X(k(y(p).state.Sys.sysinfo.admin.truename),1)]),_:1})])]),t("div",Se,[He,t("div",null,k(y(p).state.Sys.sysinfo.admin.roles[0].title),1)])]),v((i(),o("div",{class:"text-white bg-stone-900 hover:bg-lime-600 cursor-pointer w-7 h-7 rounded-full border flex items-center justify-center",onClick:d[2]||(d[2]=P=>s())},Ee)),[[S,"清理缓存",void 0,{bottom:!0}]]),v((i(),o("div",{class:"text-white bg-stone-900 hover:bg-lime-600 cursor-pointer w-7 h-7 rounded-full border flex items-center justify-center",onClick:d[3]||(d[3]=P=>f("loginOut"))},Te)),[[S,"安全退出",void 0,{bottom:!0}]])])]),t("div",{class:"border-t overflow-auto flex-1",ref_key:"modpage",ref:c},[(i(),j(A,{key:y(h)}))],512)],512)])}}};export{Ae as default};
