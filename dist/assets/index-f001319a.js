import m from"./list-7a97958e.js";import n from"./in-a557d117.js";import o from"./out-02e0f462.js";import r from"./view-8d6f9a1b.js";import s from"./checkorder-6382894a.js";import{a as u,s as p,d as c,v as f,x as _}from"./index-ffc5c309.js";const B={__name:"index",setup(d){const a=u(0),l=u(0),i=u(0),t=p(m),v=e=>{e.to=="in"&&(t.value=n,a.value=e.id,l.value=e.page,i.value=e.t),e.to=="out"&&(t.value=o,a.value=e.id,l.value=e.page,i.value=e.t),e.to=="edit"&&(a.value=e.id,l.value=e.page,t.value=Form),e.to=="view"&&(a.value=e.id,l.value=e.page,t.value=r),e.to=="checkorder"&&(a.value=e.id,l.value=e.page,t.value=s),e.to=="list"&&(a.value=0,t.value=m)};return(e,g)=>(c(),f(_(t.value),{id:a.value,page:l.value,t:i.value,onJumpCom:v},null,40,["id","page","t"]))}};export{B as default};