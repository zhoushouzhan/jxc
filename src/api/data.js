/*
 * @Author: 一品网络技术有限公司
 * @Date: 2022-09-23 11:38:08
 * @LastEditTime: 2022-10-25 12:11:19
 * @FilePath: \vue3\src\api\data.js
 * @Description:
 * 联系QQ:58055648
 * Copyright (c) 2022 by 东海县一品网络技术有限公司, All Rights Reserved.
 */
import axios from "@/axios";
import store from "@/store";
import Confirms from "@/components/Confirm.js";
import Alter from "@/components/alter.js";


//GET
export const getData = (url, data) => {
  return axios.get(url, data);
};
//POST
export const postData = (url, data) => {
  return axios.post(url, data);
};


//确认对话框{ text: '询问内容' }
export const confirms = (obj) => {
  return Confirms(obj);
};
//消息提示{ type: 'alter-error|alter-success', text:'消息内容' }
export const alter = (obj) => {
  return Alter(obj);
};
//下载数据
export const Download = (url, obj) => {
  return axios.download(url, obj);
};
//列表字段Col
export const ParseCol = (modcolumn, data) => {
  let value = "";
  let extdata = modcolumn.extends?JSON.parse(modcolumn.extends):[];

  if(extdata.coltype&&extdata.coltype==3){
    let col=extdata.col
    let mod=extdata.mod
    let newobj=data[mod]
    if(newobj){
      return newobj[col]
    }else{
      return 'null'
    }
  }
  switch (modcolumn.formitem) {
    case "linkage":
      let coldata=data[extdata.funname]
      if(coldata){
        let pid=extdata.pid
        let path=(coldata.path.slice(coldata.path.indexOf(pid+',')).replace(pid+',','')+data[modcolumn.name]).split(',')
        path=path.map(item=>parseInt(item))
        let titlegroup=[]
        coldata.pathinfo.map((item)=>{
          if(path.indexOf(item.id)>=0){
            titlegroup.push(item.title)
          }
        })


        value = titlegroup.join(',');
      }else{
        value='/'
      }
    break;
    case "mselect":
      extdata.data.forEach((item) => {
        if(item.value==data[modcolumn.name]){
          value=item.title
        }
      })
    break;
    case "radio":
      extdata.data.forEach((item) => {
        if(item.value==data[modcolumn.name]){
          value=item.title
        }
      })
    break;
    default:
      value = data[modcolumn.name];
  }
  return value;
};
//表单字段FormCol
export const FormCol = (modcolumn, data) => {
  let value = "";
  let extdata = modcolumn.extends?JSON.parse(modcolumn.extends):[];

  if(extdata.coltype&&extdata.coltype==3){
    let col=extdata.col
    let mod=extdata.mod
    let newobj=data[mod]
    if(newobj){
      return newobj[col]
    }else{
      return 'null'
    }
  }
  switch (modcolumn.formitem) {
    case "mselect":
      extdata.data.forEach((item) => {
        if(item.value==data[modcolumn.name]){
          value=item.title
        }
      })
    break;
    case "radio":
      extdata.data.forEach((item) => {
        if(item.value==data[modcolumn.name]){
          value=item.title
        }
      })
    break;
    default:
      value = data[modcolumn.name];
  }
  return value;
};

//authbtn
export const authbtn = (modname) => {
  if (!modname) {
    return [];
  }
  const roles = store.getters.roles;
  if (!roles.length) {
    return;
  }
  const btn = [];
  roles.forEach((item) => {
    if (item.modbtn && item.modbtn[modname]) {
      for (let vo of item.modbtn[modname]) {
        btn.push(vo);
      }
    }
  });
  return btn;
};
//JSON字符串验证
export const isJSON=(str)=> {
  if (typeof str == 'string') {
      try {
          var obj=JSON.parse(str);
          if(typeof obj == 'object' && obj ){
              return true;
          }else{
              return false;
          }

      } catch(e) {
          return false;
      }
  }
}
