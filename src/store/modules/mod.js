/*
 * @Author: 一品网络技术有限公司
 * @Date: 2022-09-06 21:37:12
 * @LastEditTime: 2022-09-19 13:49:19
 * @FilePath: \ypcmsvue3\src\store\modules\mod.js
 * @Description:
 * 联系QQ:58055648
 * Copyright (c) 2022 by 东海县一品网络技术有限公司, All Rights Reserved.
 */
// mod.js
import axios from "@/axios";
export default {
  namespaced: true,
  state: {
    details: JSON.parse(sessionStorage.getItem("modDetails")) || {},
    dataList: JSON.parse(sessionStorage.getItem("modDataList")) || {},
  },
  mutations: {
    setDetails: (state, value) => {
      state.details = value;
      sessionStorage.setItem("modDetails", JSON.stringify(value));
    },
    setModDataList: (state, value) => {
      state.modDataList = value;
      sessionStorage.setItem("modDataList", JSON.stringify(value));
    },
  },
  actions: {
    getMod: (ctx, value) => {
      axios.get("/mod/getMod", { name: value }).then((res) => {
        if (res.code == 1) {
          ctx.commit("setModInfo", res.data);
        }
      });
    },
    getList: () => {},
  },
  getters: {},
};
