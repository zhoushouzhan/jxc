import{a as d,d as n,e as a,i as o,a2 as f,f as g,h as y,G as m,J as x,T as w,m as k,I as C,F as _,q as S,n as u,l as b,t as B}from"./index-169137c2.js";const L={class:"w-full overflow-hidden duration-300 flex flex-col text-gray-800 rounded-sm bg-white shadow border"},H=["onClick"],$={key:0,class:"px-1"},N={__name:"ypdropdown",props:{dataList:{type:Object,default:[]},pos:{type:String,default:"left-0"}},emits:["dropevent"],setup(l,{emit:h}){const c=h,i=d(0),r=d(null),p={onEnter(e){e.style.height="auto";const t=window.getComputedStyle(e).height;e.style.height="0px",e.offsetHeight,e.style.height=t,e.style["padding-top"]=r.value.clientHeight+5+"px"},onAfterEnter(e){e.style.height=null},onLeave(e){e.style.height=window.getComputedStyle(e).height,e.offsetHeight,e.style.height="0px"},onAfterLeave(e){e.style.height=null}};return(e,t)=>(n(),a("div",{class:"relative w-20 text-center",onMouseenter:t[0]||(t[0]=s=>i.value=1),onMouseleave:t[1]||(t[1]=s=>i.value=0)},[o("div",{ref_key:"titleBox",ref:r},[f(e.$slots,"default")],512),g(w,m(x(p)),{default:y(()=>[k(o("div",{class:u(["absolute text-left z-50",l.pos])},[o("div",L,[(n(!0),a(_,null,S(l.dataList,(s,v)=>(n(),a("div",{key:v,class:"hover:bg-gray-200 py-2 px-2 text-sm flex items-center",onClick:z=>c("dropevent",s.type)},[s.icon?(n(),a("div",$,[o("i",{class:u(s.icon)},null,2)])):b("",!0),o("div",null,B(s.title),1)],8,H))),128))])],2),[[C,i.value]])]),_:1},16)],32))}};export{N as default};