import{a as h,r as y,M as p,o as V,b as r,d as g,e as _,i as t,m as o,R as i,f as d,j as w,k as U,l as b,S as k}from"./index-ffc5c309.js";const N={key:0,class:"bg-white m-3 p-3 rounded"},L=k('<div class="flex items-center"><div class="flex items-center"><i class="ri-information-line ri-2x text-gray-500"></i><div class="text-xl px-2">编辑字段</div><div class="text-orange-700">修改即时生效</div></div></div>',1),j={class:"space-y-3 p-2"},B={class:"flex"},C=t("div",{class:"w-24 text-right pr-5 pt-2"},"名称",-1),M={class:"flex-1"},T={class:"flex"},E=t("div",{class:"w-24 text-right pr-5 pt-2"},"字段名",-1),I={class:"flex-1"},O={class:"flex items-center"},S=t("div",{class:"w-24 text-right pr-5"},"提示",-1),D={class:"flex-1"},R={class:"flex"},$=t("div",{class:"w-24 text-right pr-5 pt-2"},"字段类型",-1),q={class:"flex-1"},z={class:"flex"},A=t("div",{class:"w-24 text-right pr-5 pt-2"},"字段长度",-1),F={class:"flex-1"},G={class:"flex"},H=t("div",{class:"w-24 text-right pr-5 pt-2"},"默认值",-1),J={class:"flex-1"},K={class:"flex"},P=t("div",{class:"w-24 text-right pr-5 pt-2"},"表单元素",-1),Q={class:"flex-1 flex"},W={class:"flex items-center"},X=t("div",{class:"w-24 text-right pr-5"},"字段参数",-1),Y={class:"flex-1"},Z={class:"flex"},tt=t("div",{class:"w-24 text-right pr-5 pt-2"},"列宽",-1),et={class:"flex-1"},st={class:"flex"},lt=t("div",{class:"w-24 text-right pr-5 pt-2"},"前缀",-1),ot={class:"flex-1"},it={class:"flex"},dt=t("div",{class:"w-24 text-right pr-5 pt-2"},"后缀",-1),nt={class:"flex-1"},at={class:"flex"},ct=t("div",{class:"w-24 text-right pr-5 pt-2"},"排序",-1),ut={class:"flex-1"},xt={class:"flex justify-center py-3 space-x-2"},pt=t("i",{class:"ri-arrow-go-back-line ri-lg pr-1"},null,-1),vt={__name:"editcol",props:{col:{type:Object}},emits:["complete"],setup(s,{emit:v}){const c=h(!1),n=y([]),m=v,f=p.getters.colType;return V(()=>{n.length=0,p.getters.formItem.forEach(a=>{n.push({value:a.value,title:a.name})}),c.value=!0}),(a,e)=>{const u=r("ypinput"),x=r("ypselect");return c.value?(g(),_("div",N,[L,t("div",j,[t("div",B,[C,t("div",M,[o(t("input",{type:"text",class:"yp-input","onUpdate:modelValue":e[0]||(e[0]=l=>s.col.alias=l),placeholder:"请输入名称,字段标识"},null,512),[[i,s.col.alias]])])]),t("div",T,[E,t("div",I,[o(t("input",{type:"text",class:"yp-input","onUpdate:modelValue":e[1]||(e[1]=l=>s.col.name=l),placeholder:"用于建表,只能英文"},null,512),[[i,s.col.name]])])]),t("div",O,[S,t("div",D,[d(u,{modelValue:s.col.tips,"onUpdate:modelValue":e[2]||(e[2]=l=>s.col.tips=l),placeholder:"提示信息"},null,8,["modelValue"])])]),t("div",R,[$,t("div",q,[d(x,{modelValue:s.col.type,"onUpdate:modelValue":e[3]||(e[3]=l=>s.col.type=l),itemList:w(f)},null,8,["modelValue","itemList"])])]),t("div",z,[A,t("div",F,[o(t("input",{type:"text",class:"yp-input","onUpdate:modelValue":e[4]||(e[4]=l=>s.col.length=l)},null,512),[[i,s.col.length]])])]),t("div",G,[H,t("div",J,[o(t("input",{type:"text",class:"yp-input","onUpdate:modelValue":e[5]||(e[5]=l=>s.col.defvalue=l)},null,512),[[i,s.col.defvalue]])])]),t("div",K,[P,t("div",Q,[d(x,{itemList:n,modelValue:s.col.formitem,"onUpdate:modelValue":e[6]||(e[6]=l=>s.col.formitem=l)},null,8,["itemList","modelValue"])])]),t("div",W,[X,t("div",Y,[d(u,{modelValue:s.col.extends,"onUpdate:modelValue":e[7]||(e[7]=l=>s.col.extends=l),placeholder:"功能型字段需要填写参数"},null,8,["modelValue"])])]),t("div",Z,[tt,t("div",et,[o(t("input",{type:"number",class:"yp-input","onUpdate:modelValue":e[8]||(e[8]=l=>s.col.colwidth=l)},null,512),[[i,s.col.colwidth]])])]),t("div",st,[lt,t("div",ot,[o(t("input",{type:"text",class:"yp-input","onUpdate:modelValue":e[9]||(e[9]=l=>s.col.prefix=l)},null,512),[[i,s.col.prefix]])])]),t("div",it,[dt,t("div",nt,[o(t("input",{type:"text",class:"yp-input","onUpdate:modelValue":e[10]||(e[10]=l=>s.col.suffix=l)},null,512),[[i,s.col.suffix]])])]),t("div",at,[ct,t("div",ut,[o(t("input",{type:"text",class:"yp-input","onUpdate:modelValue":e[11]||(e[11]=l=>s.col.sort=l)},null,512),[[i,s.col.sort]])])])]),t("div",xt,[t("button",{class:"yp-button yp-button-orange rounded",type:"button",onClick:e[12]||(e[12]=l=>m("complete"))},[pt,U(" 返回 ")])])])):b("",!0)}}};export{vt as default};
