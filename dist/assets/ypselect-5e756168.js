import{a as l,w as b,o as g,d as r,e as m,i as c,t as L,K as B,n as p,f as C,a5 as N,b as T}from"./index-ddd32adc.js";const _={class:"flex-1 pl-2"},z={__name:"ypselect",props:{modelValue:"",itemList:Object,col:{default:[]},defaultTitle:{default:"--请选择--"}},emits:["update:modelValue"],setup(s,{emit:x}){const o=s,f=x,n=l(""),a=l(!1),i=l(o.defaultTitle),v=l(null),y=l(null),u=l(null),w=l(null),h=()=>{N(()=>{u.value.scrollWidth&&(v.value.style.width=u.value.scrollWidth+"px")})};b(n,(t,e)=>{i.value=t.title,f("update:modelValue",t.id+""),a.value=!1});const k=()=>{i.value=o.defaultTitle,f("update:modelValue",null)};return g(()=>{o.itemList&&o.itemList.forEach(t=>{t.id==o.modelValue&&(i.value=t.title)}),h()}),(t,e)=>{const V=T("ypmenu");return r(),m("div",{class:"group inline-block relative cursor-pointer w-full min-w-max",ref_key:"select",ref:y,onClick:e[1]||(e[1]=d=>a.value=!0),onMouseleave:e[2]||(e[2]=d=>a.value=!1)},[c("div",{class:"text-sm border flex items-center rounded h-8",style:{"white-space":"nowrap"},ref_key:"titleBox",ref:v},[c("div",_,L(i.value),1),s.modelValue?(r(),m("i",{key:0,class:"ri-close-circle-fill duration-300 mr-2 hover:text-hong-300",onClick:B(k,["stop"])})):(r(),m("i",{key:1,class:p(["ri-arrow-down-s-line duration-300 mr-2",{"-rotate-180":a.value}])},null,2))],512),c("div",{class:p(["overflow-hidden w-full max-h-0 duration-300 flex flex-col text-gray-800 bg-white rounded-sm absolute z-30 top-[31px]",{"max-h-[300px] overflow-y-auto":a.value}]),ref_key:"optionsNode",ref:u},[C(V,{modelValue:n.value,"onUpdate:modelValue":e[0]||(e[0]=d=>n.value=d),dataList:s.itemList,value:s.modelValue,ref_key:"ypmenu_dom",ref:w},null,8,["modelValue","dataList","value"])],2)],544)}}};export{z as default};
