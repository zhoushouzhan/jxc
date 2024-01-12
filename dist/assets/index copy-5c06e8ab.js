import{a as x,r as c,w as R,p as te,g as O,o as se,b as g,c as oe,d as o,e as l,i as e,f as _,h as le,k as v,F as V,q as U,n as j,t as B,l as u,m as D,I as M,v as ie,S as ae,y as w,E as T,L as ne,z as de}from"./index-ddd32adc.js";import re from"./infos-364b1271.js";const ce={key:0,class:"bg-white m-2 p-2"},ue={class:"flex space-x-2 p-2 border-b items-center"},pe=e("button",{class:"rounded-sm bg-gray-600 flex items-center py-1.5 px-3 text-white text-xs hover:bg-red-700",id:"ypupload"},[e("i",{class:"ri-upload-2-line ri-lg pr-1"}),v("本地上传 ")],-1),_e=e("i",{class:"ri-download-cloud-line ri-lg pr-1"},null,-1),fe=e("i",{class:"ri-delete-bin-6-line ri-lg pr-1"},null,-1),he=e("div",{class:"flex-1"},null,-1),ye={class:"hidden md:block"},xe=e("i",{class:"ri-search-line ri-lg"},null,-1),ge=[xe],ve={key:0,class:"p-2"},me={class:"grid grid-cols-10 gap-1 mb-3"},be=["src","title"],we={key:1,class:"absolute top-0 left-1/2 -translate-x-1/2 text-pink-800"},ke=e("i",{class:"ri-folder-zip-line ri-2x"},null,-1),Ce=[ke],Oe={key:2,class:"absolute top-0 left-1/2 -translate-x-1/2 text-blue-700"},Ve=e("i",{class:"ri-file-word-2-line ri-2x"},null,-1),De=[Ve],Le={key:3,class:"absolute top-0 left-1/2 -translate-x-1/2 text-green-700"},Fe=e("i",{class:"ri-file-excel-2-line ri-2x"},null,-1),ze=[Fe],Re={key:4,class:"absolute top-0 left-1/2 -translate-x-1/2 text-gray-600"},Ue=e("i",{class:"ri-article-line ri-2x"},null,-1),je=[Ue],Be={key:5,class:"absolute top-0 left-1/2 -translate-x-1/2 text-red-600"},Me=e("i",{class:"ri-file-pdf-line ri-2x"},null,-1),Te=[Me],$e={key:6,class:"absolute top-0 left-1/2 -translate-x-1/2 text-purple-600"},He=e("i",{class:"ri-music-2-line ri-2x"},null,-1),Ne=[He],Pe={key:7,class:"absolute top-0 left-1/2 -translate-x-1/2 text-indigo-700"},Se=e("i",{class:"ri-video-line ri-2x"},null,-1),Ae=[Se],Ee={key:8,class:"absolute top-0 left-1/2 -translate-x-1/2 text-pink-500"},Ie=e("i",{class:"ri-file-line ri-2x"},null,-1),Ze=[Ie],qe={class:"transition transform duration-300 text-xs truncate w-32 absolute bottom-0 text-center bg-white bg-opacity-80 py-1"},Ge=["onClick"],Je=e("i",{class:"ri-close-circle-fill ri-lg"},null,-1),Ke=[Je],Qe={key:10,class:"w-1/3 h-1/3 bg-black text-white flex items-center justify-center rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"},We={class:"flex flex-row mt-5 bg-gray-50 p-5"},Xe={class:"flex-1"},Ye={class:"grid grid-cols-10 gap-2"},et={class:"overflow-hidden flex flex-col items-center border border-dashed"},tt=["onClick"],st=["src"],ot={key:1,xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",class:"w-full fill-slate-500"},lt=e("path",{fill:"none",d:"M0 0h24v24H0z"},null,-1),it=e("path",{d:"M2 3.9934C2 3.44476 2.45531 3 2.9918 3H21.0082C21.556 3 22 3.44495 22 3.9934V20.0066C22 20.5552 21.5447 21 21.0082 21H2.9918C2.44405 21 2 20.5551 2 20.0066V3.9934ZM10.6219 8.41459C10.5562 8.37078 10.479 8.34741 10.4 8.34741C10.1791 8.34741 10 8.52649 10 8.74741V15.2526C10 15.3316 10.0234 15.4088 10.0672 15.4745C10.1897 15.6583 10.4381 15.708 10.6219 15.5854L15.5008 12.3328C15.5447 12.3035 15.5824 12.2658 15.6117 12.2219C15.7343 12.0381 15.6846 11.7897 15.5008 11.6672L10.6219 8.41459Z"},null,-1),at=[lt,it],nt={class:"-right-[36px] -bottom-[5px] absolute bg-blue-600 text-white w-[100px] h-[40px] flex items-center justify-center -rotate-45 z-40"},dt=e("i",{class:"ri-check-line ri-lg rotate-45"},null,-1),rt=[dt],ct={class:"absolute left-0 bottom-0 w-10 h-10"},ut={class:"mt-4"},pt={key:0,class:"mb-3 text-center py-2 border-t mt-2"},_t={class:"absolute top-0 left-0 w-full h-full bg-black bg-opacity-80 z-40"},ft={class:"absolute bg-white left-1/2 -translate-x-1/2 top-32 w-[750px] h-36 rounded p-3"},ht={class:"flex justify-center py-2 space-x-2 mt-5"},yt=e("i",{class:"ri-save-line ri-lg pr-1"},null,-1),xt=e("i",{class:"ri-format-clear ri-lg pr-1"},null,-1),mt={__name:"index copy",props:{selnum:{default:0},sids:{default:[]},isopen:{default:0},ftype:"image",params:{default:[]}},emits:["useFiles"],setup(L,{emit:$}){const a=L,H=$,F=x(!1);c(a.params);const m=x(!1),f=x(""),N=async()=>{if(f.value==""){w({type:"alter-error",text:"请输入远程URL"});return}(await T("files/downloadFile",{str:f.value,category_id:a.category_id,ypcms_type:a.ypcms_type})).code==1&&(r(),f.value="",m.value=!1)},P=x([]),S=c([{id:"image",title:"图片"},{id:"video",title:"视频"}]),d=c({category_id:a.params.category_id||0,ypcms_id:a.params.ypcms_id||0,page:0,ftype:a.ftype,keywords:""});R(()=>d.mod_id,(t,i)=>{r()}),R(()=>d.category_id,(t,i)=>{r()});const h=c({totalRecords:0,pageCount:0,currentPage:1}),A=t=>{h.currentPage=t,d.page=t,r()},z=c([]),E=async()=>{let t=await O("mod/index");t.code==1&&(z.length=0,Object.keys(t.data).map(i=>{z.push({id:t.data[i].id,title:t.data[i].alias})}))},n=c([]),I=()=>{let t=b.filter((i,y)=>{if(n.indexOf(i.id)>=0)return!0});H("useFiles",t)},Z=t=>{n.indexOf(t)>=0?n.splice(n.indexOf(t),1):a.selnum==0||n.length<a.selnum?n.push(t):w({type:"alter-error",text:"超出大最值"})},k=x(),q=()=>{ne.dispatch("GET_UPLOAD_PARAMS",a.params),k.value.onupload()},p=c([]);te("uploadHandle",{readyList:p,addFile:t=>{p.push(t)},removeFile:t=>{p.filter((i,y)=>{i.id==t&&p.splice(y,1)})},reload:()=>{r()}});const b=c([]),G=()=>{r()},r=async()=>{p.length=0,b.length=0;const t=await O("/files",d);t.code==1&&(h.totalRecords=t.data.total,h.pageCount=t.data.last_page,t.data.data.map((i,y)=>{b.push(i)}))},J=async()=>{de({text:"确认删除吗？"}).then(async()=>{const t=await T("/files/delete",{ids:n});t.code?(w({type:"alter-success",text:t.msg}),r()):w({type:"alter-error",text:t.msg})}).catch(t=>{})};return se(async()=>{if(a.category_id){const t=await O("category/getDetails",{id:a.category_id});t.code==1&&(P.value=t.data)}await r(),a.sids&&Object.keys(a.sids).map(t=>{n.push(a.sids[t])}),await E(),F.value=!0}),(t,i)=>{const y=g("ypupload"),K=g("ypselect"),Q=g("ypinput"),W=g("yppage"),X=g("yptextarea"),Y=oe("tooltip");return o(),l(V,null,[F.value?(o(),l("div",ce,[e("div",ue,[e("div",null,[_(y,{ref_key:"uploader",ref:k},{default:le(()=>[pe]),_:1},512)]),e("div",null,[e("button",{class:"rounded-sm bg-gray-600 flex items-center py-1.5 px-3 text-white text-xs hover:bg-red-700",onClick:i[0]||(i[0]=s=>m.value=!0)},[_e,v("远程保存 ")])]),e("div",{class:"flex-1 md:flex-none"},[e("button",{class:"rounded-sm bg-gray-600 flex items-center py-1.5 px-3 text-white text-xs hover:bg-red-700",onClick:J},[fe,v("删除选中 ")])]),he,e("div",null,[_(K,{modelValue:d.ftype,"onUpdate:modelValue":i[1]||(i[1]=s=>d.ftype=s),itemList:S,defaultTitle:"--请选择类型--"},null,8,["modelValue","itemList"])]),e("div",ye,[_(Q,{modelValue:d.keywords,"onUpdate:modelValue":i[2]||(i[2]=s=>d.keywords=s),placeholder:"关键词"},null,8,["modelValue"])]),e("div",null,[e("button",{class:"rounded-sm bg-gray-600 flex items-center py-2 px-2 text-white text-xs hover:bg-red-700",onClick:G},ge)])]),p.length?(o(),l("div",ve,[e("div",me,[(o(!0),l(V,null,U(p,(s,C)=>(o(),l("div",{key:C,class:j(["w-32 h-32 overflow-hidden border relative group flex items-center",s.status==1?"border-gray-500":"border-red-500"])},[s.type.indexOf("image")>=0?(o(),l("img",{key:0,src:s.src,title:s.name},null,8,be)):s.type.indexOf("zip")>=0?(o(),l("div",we,Ce)):s.type.indexOf("word")>=0?(o(),l("div",Oe,De)):s.type.indexOf("sheet")>=0?(o(),l("div",Le,ze)):s.type.indexOf("text/plain")>=0?(o(),l("div",Re,je)):s.type.indexOf("pdf")>=0?(o(),l("div",Be,Te)):s.type.indexOf("audio")>=0?(o(),l("div",$e,Ne)):s.type.indexOf("video")>=0?(o(),l("div",Pe,Ae)):(o(),l("div",Ee,Ze)),e("div",qe,B(s.name),1),s.status==0?(o(),l("div",{key:9,class:"w-5 h-5 absolute right-1 top-1 text-red-500 rounded-full bg-white flex justify-center items-center z-10",onClick:ee=>k.value.removeFile(s.id)},Ke,8,Ge)):u("",!0),s.status<2?(o(),l("div",Qe,B(s.progress)+"%",1)):u("",!0)],2))),128))]),e("div",{class:"mb-3"},[e("button",{class:"yp-button yp-button-red rounded-sm",onClick:q},"开始上传")])])):u("",!0),e("div",We,[e("div",Xe,[e("div",Ye,[(o(!0),l(V,null,U(b,(s,C)=>(o(),l("div",et,[(o(),l("div",{class:j(["flex hover:text-white transition duration-150 relative overflow-hidden",n.indexOf(s.id)>=0?"file_selected":"border"]),key:C,onClick:ee=>Z(s.id)},[s.ftype.indexOf("image")>=0?(o(),l("img",{key:0,src:s.filepath,class:"hover:scale-125 duration-300"},null,8,st)):u("",!0),s.ftype.indexOf("video")>=0?(o(),l("svg",ot,at)):u("",!0),D(e("div",nt,rt,512),[[M,n.indexOf(s.id)>=0]]),D(e("div",ct,null,512),[[Y,s.name,void 0,{bottom:!0}]])],10,tt)),_(re,{item:s},null,8,["item"])]))),256))]),D(e("div",ut,[_(W,{onTopage:A,pageData:h},null,8,["pageData"])],512),[[M,h.pageCount>1]]),n.length&&L.selnum?(o(),l("div",pt,[e("button",{class:"yp-button rounded-sm",onClick:I},"确定")])):u("",!0)])])])):u("",!0),m.value?(o(),ie(ae,{key:1,to:"body"},[e("div",_t,[e("div",ft,[e("div",null,[_(X,{modelValue:f.value,"onUpdate:modelValue":i[3]||(i[3]=s=>f.value=s),placeholder:"请输入远程URL"},null,8,["modelValue"])]),e("div",ht,[e("button",{class:"btn btn-lan",type:"button",onClick:N},[yt,v(" 提交 ")]),e("button",{class:"btn btn-hong",type:"button",onClick:i[4]||(i[4]=s=>m.value=!1)},[xt,v(" 取消 ")])])])])])):u("",!0)],64)}}};export{mt as default};
