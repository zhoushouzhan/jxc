/*
 * @Author: 一品网络技术有限公司
 * @Date: 2022-05-12 08:51:05
 * @LastEditTime: 2022-09-25 22:55:30
 * @FilePath: \ypcmsvue3\src\axios\index.js
 * @Description:
 * 联系QQ:58055648
 * Copyright (c) 2022 by 东海县一品网络技术有限公司, All Rights Reserved.
 */

import axios from "axios";
import { router } from "../router";
import store from "@/store";
import Alter from "@/components/alter.js";
axios.defaults.baseURL = import.meta.env.VITE_BASEURL

// post请求头
axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded;charset=UTF-8"


// 设置超时
axios.defaults.timeout = 50000

//请求
axios.interceptors.request.use(
  (config) => {
    if(store.state.User.token){
      config.headers.Authorization = store.state.User.token
    }
    store.state.isLoading = true
    return config;
  },
  (error) => {
    return Promise.reject(error)
  }
);
//接收
 axios.interceptors.response.use(
  async (response) => {
    if (response.status === 200) {
      if (response.data.url) {
        store.commit("User/LOGIN_OUT");
        router.push("/");
        store.state.isLoading = false;
        return Promise.resolve(response);
      }
      //通用错误提示
      if (response.data.code == 0) {
        Alter({ type: "alter-error", text: response.data.msg });
      }
      //设置TOKEN
      if (response.data.token != undefined) {
        store.commit("User/SET_TOKEN", response.data.token);
      }
      store.state.isLoading = false;
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  },
  (error) => {
    Alter({
      type: "alter-error",
      text: `异常请求：${JSON.stringify(error.message)}`,
    });
  }
);
export default {
  //提交数据
  post(url, data) {
    return new Promise((resolve, reject) => {
      axios({
        method: "post",
        url,
        data: data,
      })
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  //获取数据
  get(url, data) {
    return new Promise((resolve, reject) => {
      axios({
        method: "get",
        url,
        params: data,
      })
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  //下载
  download(url, data) {
    return new Promise((resolve, reject) => {
      axios({
        method: "post",
        url,
        data: data,
        responseType: "blob",
      })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};
