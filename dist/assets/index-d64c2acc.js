import{a as p,r as o,w as y,p as O,g as h,o as B,b as v,d as f,e as _,i as t,f as w,M,F as I,q as K,t as N,m as P,I as R,y as S}from"./index-ddd32adc.js";const q={class:"bg-white w-full h-full rounded flex space-x-2 text-sm"},E=t("div",{class:"w-36 border-r border-hui-50"},[t("div",{class:"text-center border-b p-3"},"素材分类")],-1),H={class:"flex-1 space-y-5"},T={class:"flex items-center justify-between"},U=t("div",{class:"p-2 space-x-2"},[t("button",{class:"btn btn-lan"},"上传素材"),t("button",{class:"btn btn-hong"},"删除素材")],-1),$={class:"flex flex-wrap"},z={class:"w-52 h-52 overflow-hidden flex flex-col justify-center items-center"},A=["onClick"],G=["src"],J={class:"text-center py-2 w-32 whitespace-nowrap overflow-hidden text-ellipsis"},Q={class:"mt-4"},Z={__name:"index",props:{selnum:{default:0},sids:{default:[]},isopen:{default:0},ftype:"image",params:{default:[]}},emits:["useFiles"],setup(x,{emit:W}){const s=x,b=p(!1);o(s.params),p(!1),p("");const k=p([]);o([{id:"image",title:"图片"},{id:"video",title:"视频"}]);const i=o({category_id:s.params.category_id||0,ypcms_id:s.params.ypcms_id||0,page:0,ftype:s.ftype,keyword:""});y(()=>i.mod_id,(e,a)=>{n()}),y(()=>i.category_id,(e,a)=>{n()});const d=o({totalRecords:0,pageCount:0,currentPage:1}),D=e=>{d.currentPage=e,i.page=e,n()},m=o([]),C=async()=>{let e=await h("mod/index");e.code==1&&(m.length=0,Object.keys(e.data).map(a=>{m.push({id:e.data[a].id,title:e.data[a].alias})}))},l=o([]),L=e=>{l.indexOf(e)>=0?l.splice(l.indexOf(e),1):s.selnum==0||l.length<s.selnum?l.push(e):S({type:"alter-error",text:"超出大最值"})};p();const c=o([]);O("uploadHandle",{readyList:c,addFile:e=>{c.push(e)},removeFile:e=>{c.filter((a,u)=>{a.id==e&&c.splice(u,1)})},reload:()=>{n()}});const g=o([]),j=()=>{n()},n=async()=>{c.length=0,g.length=0;const e=await h("/files",i);e.code==1&&(d.totalRecords=e.data.total,d.pageCount=e.data.last_page,e.data.data.map((a,u)=>{g.push(a)}))};return B(async()=>{if(s.category_id){const e=await h("category/getDetails",{id:s.category_id});e.code==1&&(k.value=e.data)}await n(),s.sids&&Object.keys(s.sids).map(e=>{l.push(s.sids[e])}),await C(),b.value=!0}),(e,a)=>{const u=v("ypinput"),F=v("yppage");return f(),_("div",q,[E,t("div",H,[t("div",T,[U,t("div",null,[t("div",null,[w(u,{modelValue:i.keyword,"onUpdate:modelValue":a[0]||(a[0]=r=>i.keyword=r),placeholder:"关键词",onKeyup:M(j,["enter"])},null,8,["modelValue"])])])]),t("div",null,[t("div",$,[(f(!0),_(I,null,K(g,(r,V)=>(f(),_("div",z,[(f(),_("div",{class:"w-32 h-32 overflow-hidden",key:V,onClick:X=>L(r.id)},[t("img",{src:r.filepath,class:"hover:scale-125 duration-300 w-full h-full object-cover"},null,8,G)],8,A)),t("div",J,N(r.name),1)]))),256))])]),P(t("div",Q,[w(F,{onTopage:D,pageData:d},null,8,["pageData"])],512),[[R,d.pageCount>1]])])])}}};export{Z as default};
