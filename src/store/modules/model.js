/*
 * @Author: 一品网络技术有限公司
 * @Date: 2022-09-06 21:37:12
 * @LastEditTime: 2022-10-06 10:16:04
 * @FilePath: \ypcmsvue3\src\store\modules\model.js
 * @Description:
 * 联系QQ:58055648
 * Copyright (c) 2022 by 东海县一品网络技术有限公司, All Rights Reserved.
 */
// mod.js
import axios from "@/axios";
export default {
  namespaced: true,
  state: {
    modInfo: JSON.parse(sessionStorage.getItem("modInfo")) || {},
    modParams: JSON.parse(sessionStorage.getItem("modParams")) || {},
    modDataList: JSON.parse(sessionStorage.getItem("modDataList")) || {},
  },
  mutations: {
    setModInfo: (state, value) => {
      state.modInfo = value;
      sessionStorage.setItem("modInfo", JSON.stringify(value));
    },
    setModParams: (state, value) => {
      state.modParams = value;
      sessionStorage.setItem("modParams", JSON.stringify(value));
    },
    setModDataList: (state, value) => {
      state.modDataList = value;
      sessionStorage.setItem("modDataList", JSON.stringify(value));
    },
  },
  actions: {
    async getMod(ctx, value) {
      await axios.get("/mod/getMod", { name: value }).then((res) => {
        if (res.code == 1) {
          ctx.commit("setModInfo", res.data);
        }
      });
      await axios
        .get("/listInfo/getList", { modid: ctx.state.modInfo.id })
        .then((res) => {
          if (res.code == 1) {
            ctx.commit("setModDataList", res.data);
          }
        });
    },
  },
  getters: {},
};
