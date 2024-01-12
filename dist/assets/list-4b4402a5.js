import{u as E,a as H,r as u,o as K,b as _,c as q,d as n,v as A,h as w,i as t,n as O,f as p,M as S,e as a,l as i,F as G,q as I,t as d,m as J,g as b,z as Q,E as W,y as X,A as Y}from"./index-ddd32adc.js";const Z={class:"flex items-center"},tt=["innerHTML"],et=t("div",{class:"text-gray-400"},"仓库所有商品明细、状态查询",-1),st={class:"flex space-x-1"},ot={class:"yp-table-datalist"},lt=t("th",null,null,-1),nt=t("th",null,"序号",-1),at=t("th",null,"图片",-1),dt=t("th",null,"名称",-1),it=t("th",null,"类目",-1),ct=t("th",null,"仓库",-1),rt=t("th",null,"厂商",-1),ut={class:"flex items-center space-x-1"},_t=t("div",null,"成本价",-1),pt={key:0,class:"ri-menu-line text-gray-500"},ht={key:1,class:"ri-sort-desc text-gray-500"},yt={key:2,class:"ri-sort-asc text-gray-500"},gt=t("th",null,"销售价",-1),mt=t("th",null,"利润",-1),xt=t("th",null,"条码",-1),vt=t("th",null,"状态",-1),kt=t("th",null,"入库时间",-1),ft=t("th",null,"备注",-1),wt=t("th",null,"操作",-1),bt=t("td",null,null,-1),Vt=["src"],Ct={key:0,class:"bg-green-600 text-white px-2 py-1 rounded"},Lt={key:1,class:"bg-yellow-600 text-white px-2 py-1 rounded"},Dt={key:2,class:"bg-black text-white px-2 py-1 rounded"},Tt={key:3,class:"bg-black text-white px-2 py-1 rounded"},Bt={key:0,class:"space-x-2"},Mt=["onClick"],Pt=["onClick"],Rt={key:0},Ut={key:1},$t={__name:"list",emits:["jumpTo"],setup(jt,{emit:V}){const C=V,L=E().meta,m=H(!1),x=u([]),c=u({pagelimit:0,totalRecords:0,pageCount:0,currentPage:0}),D=s=>{l.page=s,c.currentPage=s,r()},T=u([{id:1,title:"正常"},{id:2,title:"异常"},{id:3,title:"出售中"},{id:4,title:"己售"}]),l=u({keyword:"",status:null,orderby:"",ordersort:"",page:0}),B=s=>{l.page=0,l.orderby=s,l.ordersort=l.ordersort=="desc"?"asc":"desc",r()},h=u([]),r=async()=>{const s=await b("goodsitem/index",l);s.code==1&&(h.length=0,c.currentPage=s.data.current_page,c.pageCount=s.data.last_page,c.totalRecords=s.data.total,c.pagelimit=s.data.per_page,s.data.data.map((o,y)=>{h.push(o)}))},v=async()=>{await r()},M=s=>{C("jumpTo",{to:"edit",id:s,page:l.page})},P=async s=>{Q({text:"确认删除吗？"}).then(async()=>{const o=await W("goodsitem/delete",{id:s});o.code==1&&(X({type:"alter-success",text:o.msg}),r())}).catch(o=>{})},R=async()=>{const s=await b("godown/index");if(s.code==1)for(let o in s.data.data)x.push(s.data.data[o])},k=s=>{const o=L.mod.name;return Y(o).indexOf(s)>=0};return K(async()=>{await r(),await R(),m.value=!0}),(s,o)=>{const y=_("ypinput"),U=_("yplist"),f=_("ypselect"),j=_("yppage"),F=_("yplayout"),N=q("viewer");return m.value?(n(),A(F,{key:0},{header:w(g=>[t("div",Z,[t("i",{class:O(["ri-2x text-gray-500 ml-2",g.meta.icon||"ri-information-line"])},null,2),t("div",{class:"text-xl px-2",innerHTML:g.meta.title},null,8,tt),et])]),list:w(g=>[t("div",st,[t("div",null,[p(y,{modelValue:l.keyword,"onUpdate:modelValue":o[0]||(o[0]=e=>l.keyword=e),placeholder:"关键词|条码",onKeyup:S(v,["enter"])},null,8,["modelValue"])]),t("div",null,[p(U,{controller:"factory",modelValue:l.factory_id,"onUpdate:modelValue":o[1]||(o[1]=e=>l.factory_id=e),colkey:"title",defaultTitle:"--选择厂商--"},null,8,["modelValue"])]),t("div",null,[p(f,{modelValue:l.status,"onUpdate:modelValue":o[2]||(o[2]=e=>l.status=e),itemList:T,defaultTitle:"--所有状态--"},null,8,["modelValue","itemList"])]),t("div",null,[p(f,{modelValue:l.godown_id,"onUpdate:modelValue":o[3]||(o[3]=e=>l.godown_id=e),itemList:x,defaultTitle:"--所有仓库--"},null,8,["modelValue","itemList"])]),t("div",null,[t("button",{class:"btn btn-chen",onClick:v},"查询")])]),t("table",ot,[t("thead",null,[t("tr",null,[lt,nt,at,dt,it,ct,rt,t("th",null,[t("div",ut,[_t,t("div",{class:"cursor-pointer",onClick:o[4]||(o[4]=e=>B("inprice"))},[l.ordersort==""?(n(),a("i",pt)):i("",!0),l.ordersort=="desc"?(n(),a("i",ht)):i("",!0),l.ordersort=="asc"?(n(),a("i",yt)):i("",!0)])])]),gt,mt,xt,vt,kt,ft,wt])]),(n(!0),a(G,null,I(h,(e,$)=>(n(),a("tbody",null,[t("tr",null,[bt,t("td",null,d($+1),1),t("td",null,[J(t("img",{src:e.goods.thumbFile,class:"w-28 h-28 object-cover"},null,8,Vt),[[N]])]),t("td",null,d(e.title),1),t("td",null,d(e.category.title),1),t("td",null,d(e.godown.title),1),t("td",null,d(e.goods.factory.title),1),t("td",null,"￥"+d(e.inprice),1),t("td",null,"￥"+d(e.sellprice),1),t("td",null,"￥"+d(e.profit),1),t("td",null,d(e.code),1),t("td",null,[e.status==1?(n(),a("span",Ct,"正常")):i("",!0),e.status==2?(n(),a("span",Lt,"异常")):i("",!0),e.status==3?(n(),a("span",Dt,"出售中")):i("",!0),e.status==4?(n(),a("span",Tt,"己售")):i("",!0)]),t("td",null,d(e.create_time),1),t("td",null,d(e.intro),1),t("td",null,[e.status!=4?(n(),a("div",Bt,[k("edit")?(n(),a("button",{key:0,class:"btn btn-lan",onClick:z=>M(e.id)},"编辑",8,Mt)):i("",!0),k("delete")?(n(),a("button",{key:1,class:"btn btn-hong",onClick:z=>P(e.id)},"删除",8,Pt)):i("",!0)])):i("",!0)])])]))),256))]),c.pageCount>1?(n(),a("div",Rt,[p(j,{onTopage:D,pageData:c},null,8,["pageData"])])):(n(),a("div",Ut," 总数："+d(c.totalRecords),1))]),_:1})):i("",!0)}}};export{$t as default};
