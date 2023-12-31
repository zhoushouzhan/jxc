import{a as p,r as _,o as C,b as r,d as D,v as L,h as m,i as t,t as v,f as a,k as h,l as N,g as U,E as j,y as B}from"./index-ffc5c309.js";const T=t("div",{class:"flex items-center"},[t("i",{class:"ri-2x text-gray-500 ml-2 ri-product-hunt-line"}),t("div",{class:"text-xl px-2"},"编辑仓库商品"),t("div",{class:"text-gray-400"})],-1),E=t("div",{class:"flex-1"},null,-1),F={class:"bg-white text-sm space-y-3 h-screen"},M={class:"flex items-center"},S=t("div",{class:"w-24 text-right pr-5"},"商品名称",-1),q={class:"flex-1 font-bold"},z={class:"flex items-center"},A=t("div",{class:"w-24 text-right pr-5"},"商品条码",-1),G={class:"flex-1"},H={class:"flex items-center"},I=t("div",{class:"w-24 text-right pr-5"},"商品图片",-1),J={class:"flex-1"},K=["src"],O={class:"flex items-center"},P=t("div",{class:"w-24 text-right pr-5"},"成本价",-1),Q={class:"flex-1"},R={class:"flex items-center"},W=t("div",{class:"w-24 text-right pr-5"},"零售价",-1),X={class:"flex-1"},Y={class:"flex items-center"},Z=t("div",{class:"w-24 text-right pr-5"},"状态",-1),$={class:"flex-1"},tt={class:"flex items-center"},st=t("div",{class:"w-24 text-right pr-5"},"备注",-1),et={class:"flex-1"},ot=t("div",{class:"w-24"},null,-1),it=t("i",{class:"ri-save-line ri-lg pr-1"},null,-1),lt=t("i",{class:"ri-format-clear ri-lg pr-1"},null,-1),dt={__name:"form",props:{id:{default:0}},emits:["jumpTo"],setup(x,{emit:f}){const d=x,g=f,u=p(!1),l=p(null),y=_([{value:0,title:"全部"},{value:1,title:"正常"},{value:2,title:"异常"},{value:3,title:"出售中"},{value:4,title:"己售"}]),e=_({id:0,goods_id:0,status:0}),b=async i=>{const s=await U("goodsitem/read",{id:i});s.code==1&&(l.value=s.data,e.inprice=s.data.inprice,e.storeprice=s.data.goods.storeprice,e.intro=s.data.intro,e.goods_id=s.data.goods_id,e.status=s.data.status)},n=()=>{g("jumpTo",{to:"list"})},V=async()=>{const i=await j("goodsitem/save",e);i.code==1&&(B({type:"alter-success",text:i.msg}),n())};return C(async()=>{d.id&&(e.id=d.id,await b(d.id)),u.value=!0}),(i,s)=>{const c=r("ypinput"),w=r("ypselect"),k=r("yplayout");return u.value?(D(),L(k,{key:0},{header:m(o=>[T,E,t("div",null,[t("button",{class:"yp-button yp-button-sm yp-button-orange rounded-sm",onClick:n},"返回")])]),list:m(()=>[t("div",F,[t("div",M,[S,t("div",q,v(l.value.goods.title),1)]),t("div",z,[A,t("div",G,v(l.value.goods.code),1)]),t("div",H,[I,t("div",J,[t("img",{src:l.value.goods.thumbFile,class:"w-32 object-cover"},null,8,K)])]),t("div",O,[P,t("div",Q,[a(c,{modelValue:e.inprice,"onUpdate:modelValue":s[0]||(s[0]=o=>e.inprice=o),placeholder:""},null,8,["modelValue"])])]),t("div",R,[W,t("div",X,[a(c,{modelValue:e.storeprice,"onUpdate:modelValue":s[1]||(s[1]=o=>e.storeprice=o),placeholder:""},null,8,["modelValue"])])]),t("div",Y,[Z,t("div",$,[a(w,{modelValue:e.status,"onUpdate:modelValue":s[2]||(s[2]=o=>e.status=o),itemList:y},null,8,["modelValue","itemList"])])]),t("div",tt,[st,t("div",et,[a(c,{modelValue:e.intro,"onUpdate:modelValue":s[3]||(s[3]=o=>e.intro=o),placeholder:""},null,8,["modelValue"])])]),t("div",{class:"flex py-2 space-x-2 mt-5"},[ot,t("button",{class:"yp-button yp-button-orange rounded",type:"button",onClick:V},[it,h(" 提交 ")]),t("button",{class:"yp-button yp-button-gray rounded",type:"button",onClick:n},[lt,h(" 返回 ")])])])]),_:1})):N("",!0)}}};export{dt as default};
