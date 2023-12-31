/*
 * @Author: 一品网络技术有限公司
 * @Date: 2022-09-06 21:37:12
 * @LastEditTime: 2022-10-05 21:16:04
 * @FilePath: \ypcmsvue3\src\store\modules\user.js
 * @Description:
 * 联系QQ:58055648
 * Copyright (c) 2022 by 东海县一品网络技术有限公司, All Rights Reserved.
 */
// user.js
export default {
  namespaced: true,
  state: {
    token: sessionStorage.getItem("token") || "",
    id: "",
    username: "",
    truename: "",
    last_ip: "",
    roles: "",
    route: JSON.parse(sessionStorage.getItem("route")) || [],
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
      sessionStorage.setItem("token", token);
    },
    SET_USERID: (state, id) => {
      state.id = id;
    },
    SET_USERNAME: (state, username) => {
      state.username = username;
    },
    SET_TRUENAME: (state, truename) => {
      state.truename = truename;
    },
    SET_LAST_IP: (state, lastip) => {
      state.last_ip = lastip;
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles;
    },
    SET_ROUTE: (state, route) => {
      state.route = route;
      sessionStorage.setItem("route", JSON.stringify(route));
    },
    LOGIN_OUT: (state) => {
      state.token = "";
      sessionStorage.removeItem("token");
      state.route = [];
      sessionStorage.removeItem("route");
    },
  },
  actions: {
    GET_USER_INFO({ commit }, userInfo) {
      commit("SET_USERID", userInfo.id);
      commit("SET_USERNAME", userInfo.username);
      commit("SET_TRUENAME", userInfo.truename);
      commit("SET_LAST_IP", userInfo.last_ip);
      commit("SET_ROUTE", userInfo.routes);
    },
  },
};
