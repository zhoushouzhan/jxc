import{a as y,r as u,o as w,c as g,d as i,e as c,i as t,t as e,F as k,q as j,m as D,k as _,l as C,g as B}from"./index-ddd32adc.js";const F={key:0,class:"p-5"},N=t("div",{class:"text-center"},[t("div",{class:"text-xl px-2"},"调拔单查看")],-1),V={class:"flex justify-between px-3"},q={class:"flex items-center space-x-2"},z=t("div",null,"操作员：",-1),E={class:"flex items-center space-x-2"},L=t("div",null,"录入时间：",-1),M=t("div",{class:"pl-5"},"单号：",-1),S={class:"yp-table-p-2"},T=t("thead",null,[t("tr",null,[t("th",{class:"text-center w-20"},"序号"),t("th",{class:"w-32"},"图片"),t("th",null,"名称"),t("th",null,"数量"),t("th",null,"备注")])],-1),A={class:"text-center"},G=["src"],H={class:"space-y-2"},I=t("i",{class:"ri-arrow-go-back-fill ri-lg pr-1"},null,-1),J=t("button",{class:"btn btn-zi"},[t("i",{class:"ri-barcode-line ri-lg pr-1"}),_(" 打印 ")],-1),O={__name:"moveview",props:{type:{default:1},id:{default:0}},emits:["jumpCom"],setup(p,{emit:v}){const o=p,h=v,d=y(!1),l=u({}),m=u([]),b=async r=>{const a=await B("kucundan/read",{id:r});if(a.code==1){for(let s in a.data)l[s]=a.data[s];l.bill.map((s,n)=>{m.push({id:s.goods_id,numbers:s.numbers})})}},x=()=>{h("jumpCom",{to:"list"})};return w(async()=>{o.id&&await b(o.id),d.value=!0}),(r,a)=>{const s=g("viewer");return d.value?(i(),c("div",F,[N,t("div",null,[t("div",V,[t("div",q,[z,t("div",null,e(l.admin.truename),1)]),t("div",E,[L,t("div",null,e(l.create_time),1),M,t("div",null,e(l.sn),1)])]),t("div",null,[t("table",S,[T,t("tbody",null,[(i(!0),c(k,null,j(l.bill,(n,f)=>(i(),c("tr",null,[t("td",A,e(f+1),1),t("td",null,[D(t("img",{src:n.thumbFile,class:"w-28 h-28 object-cover"},null,8,G),[[s]])]),t("td",H,[t("div",null,e(n.title),1),t("div",null,e(n.code),1)]),t("td",null,e(n.numbers),1),t("td",null,e(n.intro||"无"),1)]))),256))])])])]),t("div",{class:"flex justify-center py-2 space-x-2 mt-3"},[t("button",{class:"btn",type:"button",onClick:x},[I,_(" 返回 ")]),J])])):C("",!0)}}};export{O as default};
