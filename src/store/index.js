/*
 * @Author: 一品网络技术有限公司
 * @Date: 2022-07-05 09:23:25
 * @LastEditTime: 2022-09-24 11:28:58
 * @FilePath: \ypcmsvue3\src\store\index.js
 * @Description:
 * 联系QQ:58055648
 * Copyright (c) 2022 by 东海县一品网络技术有限公司, All Rights Reserved.
 */
import axios from "@/axios";
import { createStore } from "vuex";
import Mod from "./modules/mod";
import Model from "./modules/model";
import Sys from "./modules/sys";
import User from "./modules/user";
import Category from "./modules/category";
import getters from "./getters";
export default createStore({
  state: {
    isLoading: false,
    logining: false,
    route: JSON.parse(sessionStorage.getItem("route")) || [],
    breadcrumb: [],
    token: localStorage.getItem("token") || "",
  },
  mutations: {
    SET_LOGINING: (logining) => {
      state.logining = logining;
    },
    setLoading: (state, value) => {
      state.isLoading = value;
    },
    setBreadcrumb: (state, res) => {
      state.breadcrumb = res;
    },
    SET_TOKEN: (state, token) => {
      state.token = token;
      localStorage.setItem("token", token);
    },
    SET_ROUTE: (state, route) => {
      state.route = route;
      sessionStorage.setItem("route", JSON.stringify(route));
    },
  },
  actions: {
    GET_ROUTE: async (ctx, value) => {
      await axios.get("/rule/index").then((res) => {
        if (res.code == 1) {
          ctx.commit("SET_ROUTE", res.data);
        }
      });
    },
  },
  getters,
  modules: { Mod, Model, Sys, User, Category },
});
