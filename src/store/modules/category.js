/*
 * @Author: 一品网络技术有限公司
 * @Date: 2022-09-06 21:37:12
 * @LastEditTime: 2022-09-09 21:33:36
 * @FilePath: \ypcmsvue3\src\store\modules\category.js
 * @Description:
 * 联系QQ:58055648
 * Copyright (c) 2022 by 东海县一品网络技术有限公司, All Rights Reserved.
 */
// category.js
export default {
  namespaced: true,
  state: {
    category: JSON.parse(sessionStorage.getItem("category")) || {},
    dataList: {},
  },
  mutations: {
    setCategory: (state, value) => {
      state.category = value;
      sessionStorage.setItem("category", JSON.stringify(value));
    },
  },
  actions: {
    getCategory: async (ctx, value) => {
      await axios.get("/mod/getMod", { name: value }).then((res) => {
        if (res.code == 1) {
          ctx.commit("setModInfo", res.data);
        }
      });
    },
  },
  getters: {},
};
