import{a as L,r as _,o as M,b as d,d as i,v as y,h as b,e as u,i as t,f as a,j as z,F as x,q as w,l as k,k as U,g as f,E as G,y as H}from"./index-ffc5c309.js";import I from"./linkage-60c1aaad.js";import J from"./sclass-e51f07f4.js";const K=t("div",{class:"flex items-center"},[t("i",{class:"ri-2x text-gray-500 ml-2 ri-product-hunt-line"}),t("div",{class:"text-xl px-2"},"录入商品"),t("div",{class:"text-gray-400"})],-1),P=t("div",{class:"flex-1"},null,-1),Q={key:0,class:"bg-white text-sm"},R={class:"space-y-7 p-2"},S={class:"flex items-center"},W=t("div",{class:"w-24 text-right pr-5"},"选择栏目",-1),X={class:"flex-1"},Y={class:"flex items-center"},Z=t("div",{class:"w-24 text-right pr-5"},"厂商",-1),tt={class:"flex-1"},et={class:"flex items-center"},st=t("div",{class:"w-24 text-right pr-5"},"商品名称",-1),ot={class:"flex-1"},lt={class:"flex items-center"},at=t("div",{class:"w-24 text-right pr-5"},"贵重金属",-1),it={class:"grid grid-cols-10 gap-5"},dt={class:"flex"},nt=t("div",{class:"w-24 text-right pr-5"},"镶嵌宝石",-1),ct={class:"grid grid-cols-10 gap-5"},rt={class:"flex items-center"},ut=t("div",{class:"w-24 text-right pr-5"},"商品图片",-1),pt={class:"flex-1"},mt={class:"flex items-center"},_t=t("div",{class:"w-24 text-right pr-5"},"零售价格",-1),yt={class:"flex-1"},xt={class:"flex items-center"},ft=t("div",{class:"w-24 text-right pr-5"},"商品编码",-1),vt={class:"flex-1"},gt={class:"flex items-center"},ht=t("div",{class:"w-24 text-right pr-5"},"商品标签",-1),Vt={class:"flex-1"},bt={class:"flex items-center"},wt=t("div",{class:"w-24 text-right pr-5"},"备注",-1),kt={class:"flex-1"},Ut=t("div",{class:"w-24"},null,-1),jt=t("i",{class:"ri-save-line ri-lg pr-1"},null,-1),Bt=t("i",{class:"ri-format-clear ri-lg pr-1"},null,-1),Ot={__name:"form",props:{id:{default:0}},emits:["jumpTo"],setup(j,{emit:B}){const p=j,C=B,v=L(!1),g=_([]),h=_([]),n=new Audio,s=_({id:0,title:"",category_id:0,metal:[],stone:[],thumb:0,storeprice:0,code:"",label:"",intro:"",category:""}),N=()=>{C("jumpTo",{to:"list"})},D=async()=>{const l=await f("/classify/index",{pid:3427});l.code==1&&Object.keys(l.data).map(e=>{g[e]=l.data[e]})},O=async()=>{const l=await f("/classify/index",{pid:3428});l.code==1&&Object.keys(l.data).map(e=>{h[e]=l.data[e]})},T=async()=>{if(s.category_id==0){n.src="/error.mp3",await n.play(),alert("必须选择栏目22");return}const l=await G("goods/save",s);if(l.code==1){n.src="/success.mp3",await n.play(),H({type:"alter-success",text:l.msg});for(let e in s)delete s[e]}},E=async l=>{if(!l)return;let e=await f("goods/details",{id:l});e.code==1&&Object.keys(e.data).map(c=>{s[c]=e.data[c]})};return M(async()=>{D(),O(),s.id=p.id,p.id&&await E(p.id),v.value=!0}),(l,e)=>{const c=d("yplist"),r=d("ypinput"),V=d("ypcheckbox"),F=d("ypthumb"),$=d("yptextarea"),q=d("yplayout");return i(),y(q,null,{header:b(o=>[K,P]),list:b(()=>[v.value?(i(),u("div",Q,[t("div",null,[t("div",R,[t("div",S,[W,t("div",X,[a(z(I),{modelValue:s.category_id,"onUpdate:modelValue":e[0]||(e[0]=o=>s.category_id=o),category:s.category},null,8,["modelValue","category"])])]),s.category_id?(i(),u(x,{key:0},[t("div",Y,[Z,t("div",tt,[a(c,{controller:"factory",modelValue:s.factory_id,"onUpdate:modelValue":e[1]||(e[1]=o=>s.factory_id=o),colkey:"title"},null,8,["modelValue"])])]),a(J,{cid:s.category_id,modelValue:s.sclass,"onUpdate:modelValue":e[2]||(e[2]=o=>s.sclass=o)},null,8,["cid","modelValue"]),t("div",et,[st,t("div",ot,[a(r,{modelValue:s.title,"onUpdate:modelValue":e[3]||(e[3]=o=>s.title=o),placeholder:"请输入产品信息"},null,8,["modelValue"])])]),t("div",lt,[at,t("div",it,[(i(!0),u(x,null,w(g,(o,A)=>(i(),y(V,{title:o.title,value:o.id,modelValue:s.metal,"onUpdate:modelValue":e[4]||(e[4]=m=>s.metal=m)},null,8,["title","value","modelValue"]))),256))])]),t("div",dt,[nt,t("div",ct,[(i(!0),u(x,null,w(h,(o,A)=>(i(),y(V,{title:o.title,value:o.id,modelValue:s.stone,"onUpdate:modelValue":e[5]||(e[5]=m=>s.stone=m)},null,8,["title","value","modelValue"]))),256))])]),t("div",rt,[ut,t("div",pt,[a(F,{modelValue:s.thumb,"onUpdate:modelValue":e[6]||(e[6]=o=>s.thumb=o)},null,8,["modelValue"])])]),t("div",mt,[_t,t("div",yt,[a(r,{modelValue:s.storeprice,"onUpdate:modelValue":e[7]||(e[7]=o=>s.storeprice=o)},null,8,["modelValue"])])]),t("div",xt,[ft,t("div",vt,[a(r,{modelValue:s.code,"onUpdate:modelValue":e[8]||(e[8]=o=>s.code=o)},null,8,["modelValue"])])]),t("div",gt,[ht,t("div",Vt,[a(r,{modelValue:s.label,"onUpdate:modelValue":e[9]||(e[9]=o=>s.label=o)},null,8,["modelValue"])])]),t("div",bt,[wt,t("div",kt,[a($,{modelValue:s.intro,"onUpdate:modelValue":e[10]||(e[10]=o=>s.intro=o),placeholder:"备注信息"},null,8,["modelValue"])])])],64)):k("",!0)])]),t("div",{class:"flex py-2 space-x-2 mt-5"},[Ut,t("button",{class:"yp-button yp-button-orange rounded",type:"button",onClick:T},[jt,U(" 提交 ")]),t("button",{class:"yp-button yp-button-gray rounded",type:"button",onClick:N},[Bt,U(" 返回 ")])])])):k("",!0)]),_:1})}}};export{Ot as default};
