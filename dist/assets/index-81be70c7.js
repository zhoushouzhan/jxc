import m from"./list-dff0d57d.js";import r from"./out-affae785.js";import p from"./view-0441e773.js";import n from"./checkorder-183c3b82.js";import{a as l,s,d as v,v as c,x as f}from"./index-ddd32adc.js";import"./index-f6c21a2b.js";import"./list-c0660b5b.js";import"./add-bc9bc560.js";const I={__name:"index",setup(_){const a=l(0),i=l(0),o=l(0),t=s(m),u=e=>{e.to=="out"&&(t.value=r,a.value=e.id,i.value=e.page,o.value=e.t),e.to=="edit"&&(a.value=e.id,i.value=e.page,t.value=Form),e.to=="view"&&(a.value=e.id,i.value=e.page,t.value=p),e.to=="checkorder"&&(a.value=e.id,i.value=e.page,t.value=n),e.to=="list"&&(a.value=0,t.value=m)};return(e,d)=>(v(),c(f(t.value),{id:a.value,page:i.value,t:o.value,onJumpCom:u},null,40,["id","page","t"]))}};export{I as default};
