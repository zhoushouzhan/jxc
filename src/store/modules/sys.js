/*
 * @Author: 一品网络技术有限公司
 * @Date: 2022-09-06 21:37:12
 * @LastEditTime: 2022-10-05 21:33:57
 * @FilePath: \ypcmsvue3\src\store\modules\sys.js
 * @Description:
 * 联系QQ:58055648
 * Copyright (c) 2022 by 东海县一品网络技术有限公司, All Rights Reserved.
 */
// sys.js
import axios from "@/axios";
export default {
  namespaced: true,
  state: {
    sysinfo: JSON.parse(sessionStorage.getItem("sysinfo")) || {},
    openMenuId:[],
    currentMenu:[]
  },
  mutations: {
    setSys(state, val) {
      state.sysinfo = val;
      sessionStorage.setItem("sysinfo", JSON.stringify(val));
    },
    setMenuId(state,val){
      let idpos=state.openMenuId.indexOf(val)
      if(idpos>=0){
        state.openMenuId.splice(idpos,1)
      }else{
        state.openMenuId.push(val)
      }
    },
    routeSetMenuId(state,val){
      let idpos=state.openMenuId.indexOf(val)
      if(idpos<0){
        state.openMenuId.push(val)
      }

    },
    setCurrentMenu(state,val){
      state.currentMenu.push(val)
    },
    clearCurrentMenu(state){
      state.currentMenu.length=0
    }
  },
  actions: {
    async getSys(ctx, value) {
      let data;
      const resp = await axios.get("/index/getsite", { name: value });
      data = resp.data;
      if (resp.code == 1) {
        ctx.commit("setSys", resp.data);
      }
      return data;
    },
    LOAD_MENU(ctx,obj){
      let route=ctx.rootState.User.route
      const getMenuPid=(obj,path)=>{

        obj.forEach((item)=>{
          if(item.path==path){
            ctx.commit("routeSetMenuId",item.meta.pid)
            ctx.commit("setCurrentMenu",item.meta.id)
            ctx.commit("setCurrentMenu",item.meta.pid)
            getMenuPid(obj,item.meta.pid)
          }
          if(item.children&&item.children.length>0){
            getMenuPid(item.children,path)
          }
        })
      }

      ctx.commit("clearCurrentMenu")
      getMenuPid(route,obj.path)
    }
  },
};
