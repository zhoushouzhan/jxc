import{r as x,a as g,d as e,e as o,i as d,F as l,q as m,y as w,b as C,n as V,t as B,m as D,I as O,v as j,l as N}from"./index-ddd32adc.js";const P={class:"text-sm"},S={class:"flex border-b"},q=["onClick"],F={class:"text-center"},U={__name:"ypform",props:{group:{type:Array},mod:Object,formData:{type:Object,required:!0},isPreview:{default:0}},emits:["save"],setup(n,{emit:b}){const p=n,y=b,a=x(p.formData),u=g(0),f=v=>{try{let s=JSON.parse(v),c=s.display;return a[c]==s.value}catch{return!0}},h=async()=>{if(p.isPreview){w({type:"alter-error",text:"预览不可以真实提交数据"});return}y("save",a)};return(v,s)=>{const c=C("cols");return e(),o("div",P,[d("div",S,[(e(!0),o(l,null,m(n.group,(i,t)=>(e(),o("div",{key:t,class:V(["p-3 hover:border-b border-blue-600 cursor-pointer hover:text-blue-600",{"border-b border-blue-600 text-blue-600":t==u.value}]),onClick:r=>u.value=t},B(i),11,q))),128))]),(e(!0),o(l,null,m(n.group,(i,t)=>D((e(),o("div",{key:t,class:"py-4"},[(e(!0),o(l,null,m(n.mod.modcolumn,(r,k)=>(e(),o(l,{key:k},[r.groupindex==t&&["none","hidden"].indexOf(r.formitem)<0&&f(r.extends)?(e(),j(c,{key:0,col:r,modelValue:a[r.name],"onUpdate:modelValue":_=>a[r.name]=_,row:a},null,8,["col","modelValue","onUpdate:modelValue","row"])):N("",!0)],64))),128))],512)),[[O,u.value==t]])),128)),d("div",F,[d("button",{class:"btn btn-hong",onClick:s[0]||(s[0]=i=>h())},"提交")])])}}};export{U as default};
