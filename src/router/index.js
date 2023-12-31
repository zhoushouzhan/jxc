/*
 * @Author: 一品网络技术有限公司
 * @Date: 2022-06-22 10:40:08
 * @LastEditTime: 2022-10-06 15:15:54
 * @FilePath: \ypcmsvue3\src\router\index.js
 * @Description:
 * 联系QQ:58055648
 * Copyright (c) 2022 by 东海县一品网络技术有限公司, All Rights Reserved.
 */
import store from "./../store";
import { createRouter, createWebHashHistory } from "vue-router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import ModelIndex from "./../pages/model/index.vue";
const modules = import.meta.glob("./../pages/**/*.vue");

/*进度条*/
NProgress.configure({
  showSpinner: true,
});
const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/pages/home"),
    redirect: "/welcome",
    meta: {
      title: "控制台",
      icon: "ri-spectrum-fill",
    },
    children: [
      {
        path: "/welcome",
        component: () => import("../pages/welcome.vue"),
        meta: {
          title: "欢迎页面",
          icon: "",
        },
      },
      {
        path: "/my",
        component: () => import("../pages/permissions/admin/my.vue"),
        meta: {
          title: "个人中心",
        },
      },
      {
        path: "/model/:modname",
        name: "ModCon",
        component: ModelIndex,
        meta: {
          title: "数据模型",
          icon: "",
        },
      }
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/pages/login"),
    hidden: true,
    meta: {
      title: "登录",
      icon: "ri-login-circle-line",
    },
  },
  {
    path: "/loginOut",
    name: "loginOut",
    component: () => import("@/pages/login.vue"),
    meta: {
      title: "安全退出",
      icon: "ri-login-circle-line",
    },
  },
];
const router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
});
//增加动态路由
let addluyou;
const ypAddRoute = (route) => {
  let component = modules[`../pages${route.path}/index.vue`] || null;
  let children = [];
  if (route.children && route.children.length) {
    route.children.forEach((item) => {
      if (item.path.indexOf("Listinfo") >= 0) {
        return;
      }
      if (item.path.indexOf("model") >= 0) {
        return;
      }
      children.push(ypAddRoute(item));
    });
  }

  addluyou = {
    path: route.path,
    name: route.name,
    meta: route.meta,
    component: component,
    children: children,
  };
  return addluyou;
};
const loadAsyncRoutes = () => {
  let token = sessionStorage.getItem("token") || "";
  if (token) {
    var loadRoute = JSON.parse(sessionStorage.getItem("route"));
    //加载动态路由
    loadRoute.forEach((item) => {
      addluyou = ypAddRoute(item);
      router.addRoute("Home", addluyou);
    });
  }
};
loadAsyncRoutes();
router.beforeEach(async (to, from, next) => {
  NProgress.start();
  let token = store.state.User.token;
  if (token) {
    //加载系统参数
    const sysInfo = await store.dispatch("Sys/getSys");
    if(sysInfo.admin){
      store.dispatch("User/GET_USER_INFO", sysInfo.admin);
    }
  }
  if (token == "" && to.name != "Login") {
    next({ name: "Login" });
  } else if (to.name == "Login" && token != "") {
    next({ name: "Home" });
  } else {
    if (to.params.modname) {
      await store.dispatch("Model/getMod", to.params.modname);
      to.matched.forEach((v, k) => {
        if (v.name == "ModCon") {
          to.matched[k].meta.title = store.state.Model.modInfo.alias;
          to.matched[k].meta.icon = store.state.Model.modInfo.icon;
        }
      });
    }
    store.dispatch("Sys/LOAD_MENU", to);
    next();
  }
});
router.afterEach(() => {
  NProgress.done();
});

export { router, routes, loadAsyncRoutes };
