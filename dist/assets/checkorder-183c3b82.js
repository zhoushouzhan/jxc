import{a as V,r as b,o as E,b as C,c as L,d as o,v as $,h as U,i as t,e as a,F as v,q as w,n as q,t as s,f as y,m as I,k as M,l as j,g as x,z as S,E as T,y as A}from"./index-ddd32adc.js";const G=t("i",{class:"ri-2x text-gray-500 ml-2 ri-checkbox-multiple-fill"},null,-1),H=t("div",{class:"text-xl px-3"},"审批中心",-1),J=t("div",{class:"flex-1 flex flex-row-reverse space-x-reverse space-x-2"},null,-1),K={class:"flex space-x-1"},P={class:"overflow-y-auto h-[900px]"},Q={class:"yp-table"},R=t("thead",null,[t("tr",null,[t("th",{class:"text-center"},"序号"),t("th",{class:"text-center"},"图片"),t("th",null,"名称"),t("th",{class:"w-24"},"成本"),t("th",{class:"w-28"},"售价"),t("th",{class:"w-20"},"数量"),t("th",null,"备注")])],-1),W=["onClick"],X={class:"text-center"},Y=["src","onClick"],Z={class:"text-red-600 font-bold"},tt={class:"flex-1"},et={class:"overflow-y-auto max-h-[440px]"},st={class:"yp-table"},ot=t("thead",null,[t("tr",null,[t("th",{class:"text-center w-20"},"序号"),t("th",null,"名称"),t("th",{class:"w-24"},"编码"),t("th",{class:"w-24"},"标签"),t("th",{class:"w-24"},"成本"),t("th",{class:"w-24"},"零售价"),t("th",{class:"w-28"},"日期")])],-1),lt={key:0},at={class:"hover:bg-gray-100"},nt={class:"text-center"},ct={class:"whitespace-nowrap"},dt={class:"whitespace-nowrap"},rt={key:1},it=t("tr",null,[t("td",{colspan:"3"},[t("div",{class:"text-center py-2 text-gray-400"},"暂无数据")])],-1),ut=[it],_t={class:"overflow-y-auto max-h-[440px]"},ht={class:"yp-table"},pt=t("thead",null,[t("tr",null,[t("th",{class:"text-center w-20"},"图片"),t("th",null,"名称"),t("th",{class:"w-24"},"编码"),t("th",{class:"w-24"},"标签"),t("th",{class:"w-24"},"成本"),t("th",{class:"w-24"},"零售价"),t("th",{class:"w-28"},"日期")])],-1),yt={key:0},gt={class:"hover:bg-gray-100"},bt=["src"],vt={class:"whitespace-nowrap"},wt={class:"whitespace-nowrap"},xt={key:1},mt=t("tr",null,[t("td",{colspan:"3"},[t("div",{class:"text-center py-2 text-gray-400"},"暂无数据")])],-1),ft=[mt],kt={class:"flex py-2 space-x-2 mt-3"},Vt=t("i",{class:"ri-save-line ri-lg pr-1"},null,-1),Ut={__name:"checkorder",props:{id:{default:0}},emits:["jumpCom"],setup(D,{emit:F}){const m=D,f=F,k=V(!1),g=V(0),c=b({godown_id:0,type:1,bill:[]}),h=b([]),u=b([]),B=()=>{f("jumpCom",{to:"list"})},N=async l=>{const d=await x("kucundan/read",{id:l});d.code==1&&(c.id=l,c.enabled=1,c.godown_id=d.data.godown_id,c.type=d.data.type,c.bill=d.data.bill)},O=async l=>{if(g.value==l.goods_id)return;g.value=l.goods_id;let d=l.goods_id;const r=await x("goodsitem/near",{goods_id:d});r.code==1&&(h.length=0,Object.keys(r.data).map(i=>{h[i]=r.data[i]}));const _=await x("goodsitem/label",{goods_id:d});_.code==1&&(u.length=0,Object.keys(_.data).map(i=>{u[i]=_.data[i]})),console.log(u)},z=async()=>{S({text:"确定入库吗？"}).then(async()=>{const l=await T("kucundan/save",c);l.code==1&&(A({type:"alter-success",text:l.msg}),f("jumpCom",{to:"list"}))}).catch(()=>{console.log("cancel")})};return E(async()=>{m.id&&await N(m.id),k.value=!0}),(l,d)=>{const r=C("ypinput"),_=C("yplayout"),i=L("viewer");return k.value?(o(),$(_,{key:0},{header:U(()=>[G,H,J,t("button",{class:"yp-button yp-button-sm yp-button-orange rounded-sm",onClick:B},"返回")]),list:U(()=>[t("div",K,[t("div",P,[t("table",Q,[R,t("tbody",null,[(o(!0),a(v,null,w(c.bill,(e,p)=>(o(),a("tr",{class:q(["hover:bg-gray-100",{"bg-gray-200":g.value==e.goods_id}]),onClick:n=>O(e)},[t("td",X,s(p+1),1),t("td",null,[t("img",{src:e.thumbFile,class:"w-20 h-20 object-cover",onClick:n=>l.openimg(e.thumbFile)},null,8,Y)]),t("td",null,[t("div",null,s(e.title),1),t("div",Z,s(e.code),1)]),t("td",null,[y(r,{modelValue:e.inprice,"onUpdate:modelValue":n=>e.inprice=n,placeholder:"请输入价格"},null,8,["modelValue","onUpdate:modelValue"])]),t("td",null,[y(r,{modelValue:e.storeprice,"onUpdate:modelValue":n=>e.storeprice=n,placeholder:"销售价格"},null,8,["modelValue","onUpdate:modelValue"])]),t("td",null,[y(r,{modelValue:e.numbers,"onUpdate:modelValue":n=>e.numbers=n,placeholder:"请输入数量"},null,8,["modelValue","onUpdate:modelValue"])]),t("td",null,[y(r,{modelValue:e.intro,"onUpdate:modelValue":n=>e.intro=n,placeholder:"请输入备注"},null,8,["modelValue","onUpdate:modelValue"])])],10,W))),256))])])]),t("div",tt,[t("div",et,[t("table",st,[ot,h.length?(o(),a("tbody",lt,[(o(!0),a(v,null,w(h,(e,p)=>(o(),a("tr",at,[t("td",nt,s(p+1),1),t("td",ct,s(e.title),1),t("td",null,s(e.code),1),t("td",null,s(e.goods.label),1),t("td",null,s(e.inprice),1),t("td",null,s(e.goods.storeprice),1),t("td",dt,s(e.create_time.substring(0,e.create_time.indexOf(" "))),1)]))),256))])):(o(),a("tbody",rt,ut))])]),t("div",_t,[t("table",ht,[pt,u.length?(o(),a("tbody",yt,[(o(!0),a(v,null,w(u,(e,p)=>(o(),a("tr",gt,[t("td",null,[I(t("img",{src:e.goods.thumbFile,class:"w-28 h-28 object-cover"},null,8,bt),[[i]])]),t("td",vt,s(e.title),1),t("td",null,s(e.goods.code),1),t("td",null,s(e.goods.label),1),t("td",null,s(e.inprice),1),t("td",null,s(e.goods.storeprice),1),t("td",wt,s(e.create_time.substring(0,e.create_time.indexOf(" "))),1)]))),256))])):(o(),a("tbody",xt,ft))])])])]),t("div",kt,[c.bill.length?(o(),a("button",{key:0,class:"yp-button rounded",type:"button",onClick:z},[Vt,M(" 提交 ")])):j("",!0)])]),_:1})):j("",!0)}}};export{Ut as default};
