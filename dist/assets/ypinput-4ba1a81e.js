import{w as y,r as V,a as S,d as u,e as r,i as s,a3 as g,m as b,a4 as k,K as w,l as m,n as B,t as h}from"./index-ddd32adc.js";const C=["type","placeholder"],D={key:0,class:"text-hui-100 text-xs"},F=s("span",null,"/",-1),$={key:0,class:"absolute right-0"},I={key:0,class:"text-xs py-1 text-hong-300 h-5"},N={__name:"ypinput",props:{modelValue:{default:""},placeholder:{type:String},type:{type:String,default:"text"},maxlength:{default:0},errormsg:{default:""},max:{default:null},min:{default:null}},emits:["update:modelValue"],setup(e,{emit:p}){const o=e,i=p;y(()=>o.modelValue,(n,l)=>t.value=n);const d=V({status:0}),t=S(o.modelValue),v=n=>{const l=n.target.value,a=o.maxlength;if(a&&l.length>a)return t.value=t.value.toString().slice(0,a),!1;i("update:modelValue",t.value)},x=n=>{d.status=0;const l=n.target.value,a=parseFloat(o.max),c=parseFloat(o.min);a&&a<l&&(t.value=a.toString().replace(/,/g,"")),c&&c>l&&(t.value=c.toString().replace(/,/g,"")),i("update:modelValue",t.value)},f=()=>{i("update:modelValue",null)};return(n,l)=>(u(),r("div",null,[s("div",{class:B(["flex items-center bg-white rounded px-2 border text-sm duration-200 space-x-1 relative",{"border-lan-200":d.status==1,"border-hong-300":e.errormsg}])},[g(n.$slots,"prefix"),b(s("input",{type:e.type,class:"h-8 outline-none text-hui-300 placeholder:text-hui-100 placeholder:font-light flex-1","onUpdate:modelValue":l[0]||(l[0]=a=>t.value=a),onInput:v,onBlur:x,placeholder:e.placeholder,onFocus:l[1]||(l[1]=a=>d.status=1)},null,40,C),[[k,t.value]]),g(n.$slots,"suffix",{},()=>[e.maxlength&&e.type!="number"?(u(),r("div",D,[s("span",null,h(t.value.length),1),F,s("span",null,h(e.maxlength),1)])):m("",!0)]),e.modelValue&&!e.maxlength?(u(),r("div",$,[s("i",{class:"ri-close-circle-fill duration-300 mr-2 hover:text-hong-300",onClick:w(f,["stop"])})])):m("",!0)],2),e.errormsg?(u(),r("div",I,h(e.errormsg),1)):m("",!0)]))}};export{N as default};
