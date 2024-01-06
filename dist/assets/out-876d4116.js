import{a as v,r as f,o as E,b as w,d as a,v as K,h as k,i as e,e as n,F as V,q as C,t as c,l as r,f as p,N as Z,k as h,g as m,E as $,y as q}from"./index-0f467f6d.js";const z=e("i",{class:"ri-2x text-gray-500 ml-2 ri-indent-decrease"},null,-1),H=e("div",{class:"text-xl px-3"},"出库单",-1),T=e("div",{class:"flex-1 flex flex-row-reverse space-x-reverse space-x-2"},null,-1),A={class:"bg-white text-sm"},G={key:0},I=e("div",{class:"text-lg text-center"}," 选择出库仓库 ",-1),J={class:"flex items-center justify-center space-x-5 py-5"},O=["onClick"],P={key:1},Q={key:2},R={class:"yp-table"},W=e("thead",null,[e("tr",null,[e("th",{class:"text-center"},"序号"),e("th",null,"名称"),e("th",null,"零售价"),e("th",null,"数量"),e("th",null,"库存"),e("th",null,"备注"),e("th",{class:"text-center"},"操作")])],-1),X={class:"text-center"},Y={class:"text-center"},ee=["onClick"],te=e("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",class:"w-5 h-5 fill-gray-600 hover:fill-red-500"},[e("path",{fill:"none",d:"M0 0h24v24H0z"}),e("path",{d:"M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 10.5858L9.17157 7.75736L7.75736 9.17157L10.5858 12L7.75736 14.8284L9.17157 16.2426L12 13.4142L14.8284 16.2426L16.2426 14.8284L13.4142 12L16.2426 9.17157L14.8284 7.75736L12 10.5858Z"})],-1),le=[te],oe={class:"flex justify-center py-2 space-x-2 mt-3"},se=e("i",{class:"ri-save-line ri-lg pr-1"},null,-1),ae=e("i",{class:"ri-arrow-go-back-fill ri-lg pr-1"},null,-1),de={__name:"out",props:{id:{default:0},t:{default:0}},emits:["jumpCom"],setup(L,{emit:U}){const g=L,j=U,i=v(""),y=f([]),b=v(!1),l=f({godown_id:0,enabled:1,type:2,bill:[]}),x=()=>{j("jumpCom",{to:"list"})},B=async()=>{if(i.value=="")return;const t=await m("goods/details",{code:i.value});if(t.code==1){let s={goods_id:t.data.id,title:t.data.title,godown_id:l.godown_id,category_id:t.data.category.id,thumbFile:t.data.thumbFile,storeprice:t.data.storeprice.toString().replace(/,/g,""),labelprice:t.data.labelprice.toString().replace(/,/g,""),stock:t.data.stock,intro:"",status:0,sellprice:t.data.labelprice.toString().replace(/,/g,""),numbers:1,code:t.data.code};l.bill.unshift(s),i.value=""}},N=t=>{l.splice(t,1)},D=async()=>{const t=await m("/godown/index");if(t.code==1)for(let s in t.data.data)y.push(t.data.data[s])},F=async()=>{const t=await $("kucundan/save",l);t.code==1&&(l.bill.splice(0),q({type:"alter-success",text:t.msg}))},M=async t=>{const s=await m("kucundan/read",{id:t});s.code==1&&(l.id=t,l.godown_id=s.data.godown_id,l.type=s.data.type,l.bill=s.data.bill)};return E(async()=>{g.id?await M(g.id):await D(),b.value=!0}),(t,s)=>{const u=w("ypinput"),S=w("yplayout");return b.value?(a(),K(S,{key:0},{header:k(()=>[z,H,T,e("button",{class:"yp-button yp-button-sm yp-button-orange rounded-sm",onClick:x},"返回")]),list:k(()=>[e("div",A,[l.godown_id==0?(a(),n("div",G,[I,e("div",J,[(a(!0),n(V,null,C(y,(o,_)=>(a(),n("div",{class:"px-3 py-1.5 cursor-pointer bg-red-500 hover:bg-red-600 text-white rounded",onClick:d=>l.godown_id=o.id},c(o.title),9,O))),256))])])):r("",!0),l.godown_id?(a(),n("div",P,[p(u,{modelValue:i.value,"onUpdate:modelValue":s[0]||(s[0]=o=>i.value=o),placeholder:"录入条码",onKeyup:Z(B,["enter"]),maxlength:"15"},null,8,["modelValue"])])):r("",!0),l.bill.length?(a(),n("div",Q,[e("table",R,[W,e("tbody",null,[(a(!0),n(V,null,C(l.bill,(o,_)=>(a(),n("tr",null,[e("td",X,c(_+1),1),e("td",null,c(o.title),1),e("td",null,[p(u,{modelValue:o.sellprice,"onUpdate:modelValue":d=>o.sellprice=d,placeholder:"请输入零售价",min:o.storeprice,max:o.labelprice},null,8,["modelValue","onUpdate:modelValue","min","max"])]),e("td",null,[p(u,{type:"number",modelValue:o.numbers,"onUpdate:modelValue":d=>o.numbers=d,placeholder:"请输入数量",max:o.stock,maxlength:"9"},null,8,["modelValue","onUpdate:modelValue","max"])]),e("td",Y,c(o.stock),1),e("td",null,[p(u,{modelValue:o.intro,"onUpdate:modelValue":d=>o.intro=d,placeholder:"请输入备注",maxlength:"30"},null,8,["modelValue","onUpdate:modelValue"])]),e("td",null,[e("div",{class:"flex items-center justify-center",onClick:d=>N(_)},le,8,ee)])]))),256))])])])):r("",!0),h(" "+c(l.bill)+" ",1),e("div",oe,[l.bill.length?(a(),n("button",{key:0,class:"btn btn-hong",type:"button",onClick:F},[se,h(" 提交 ")])):r("",!0),e("button",{class:"btn",type:"button",onClick:x},[ae,h(" 返回 ")])])])]),_:1})):r("",!0)}}};export{de as default};