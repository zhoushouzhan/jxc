import{r as x,a as _,d as e,e as o,i,F as l,q as m,y as w,b as C,n as V,t as B,m as D,I as O,v as j,l as N}from"./index-ffc5c309.js";const P={class:"bg-white m-1 text-sm"},S={class:"flex border-b rounded-t-md"},q=["onClick"],F={class:"text-center"},U={__name:"ypform",props:{group:{type:Array},mod:Object,formData:{type:Object,required:!0},isPreview:{default:0}},emits:["save"],setup(n,{emit:y}){const p=n,b=y,a=x(p.formData),u=_(0),f=v=>{try{let s=JSON.parse(v),d=s.display;return a[d]==s.value}catch{return!0}},h=async()=>{if(p.isPreview){w({type:"alter-error",text:"预览不可以真实提交数据"});return}b("save",a)};return(v,s)=>{const d=C("cols");return e(),o("div",P,[i("div",S,[(e(!0),o(l,null,m(n.group,(c,t)=>(e(),o("div",{key:t,class:V(["px-3 py-2 hover:border-b border-gray-700 cursor-pointer hover:text-red-500",{"border-b border-gray-700 text-blue-600":t==u.value}]),onClick:r=>u.value=t},B(c),11,q))),128))]),(e(!0),o(l,null,m(n.group,(c,t)=>D((e(),o("div",{key:t,class:"py-4"},[(e(!0),o(l,null,m(n.mod.modcolumn,(r,k)=>(e(),o(l,{key:k},[r.groupindex==t&&["none","hidden"].indexOf(r.formitem)<0&&f(r.extends)?(e(),j(d,{key:0,col:r,modelValue:a[r.name],"onUpdate:modelValue":g=>a[r.name]=g,row:a},null,8,["col","modelValue","onUpdate:modelValue","row"])):N("",!0)],64))),128))],512)),[[O,u.value==t]])),128)),i("div",F,[i("button",{class:"yp-button yp-button-red rounded",onClick:s[0]||(s[0]=c=>h())},"提交")])])}}};export{U as default};
