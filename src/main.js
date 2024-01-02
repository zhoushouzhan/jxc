/*
 * @Author: 一品网络技术有限公司
 * @Date: 2022-06-21 16:12:37
 * @LastEditTime: 2024-01-01 11:51:01
 * @FilePath: \vite-project\src\main.js
 * @Description:
 * 联系QQ:58055648
 * Copyright (c) 2022 by 东海县一品网络技术有限公司, All Rights Reserved.
 */
import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import { router } from "./router";

import "./assets/style.css";
import "animate.css";
import components from "@/components/autoload.js";
import "remixicon/fonts/remixicon.css";

import tooltip from "@/directive/tooltip/directive.js";
import drag from "@/directive/drag/directive.js";



const app = createApp(App);


app.config.silent = true;
app.use(store);
app.use(router);
app.use(components);

app.use(tooltip);
app.use(drag);
app.mount("#app");
