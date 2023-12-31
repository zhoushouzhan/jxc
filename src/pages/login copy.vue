<!--
 * @Author: 一品网络技术有限公司
 * @Date: 2022-06-21 16:12:37
 * @LastEditTime: 2022-10-05 21:39:40
 * @FilePath: \ypcmsvue3\src\pages\login.vue
 * @Description:
 * 联系QQ:58055648
 * Copyright (c) 2022 by 东海县一品网络技术有限公司, All Rights Reserved.
-->
<template>
  <div class="w-screen h-screen bg-gray-700 flex md:items-center flex-col md:flex-row">
    <div class="w-full md:w-1/2 h-[300px] md:h-screen bg-white flex justify-center items-center">
      <img src="@/assets/logo.png" class="w-auto select-none rounded-full animate-pulse">
    </div>
    <div class="flex-1 md:h-screen flex md:items-center md:justify-center items-center flex-col">
      <div class="w-3/4 mt-20 md:mt-0">
        <form @submit.prevent="submit">
          <div class="grid grid-cols-12">
            <div class="col-span-12">
              <input type="text" maxlength="18" placeholder="请输入账号" class="yp-input" v-model="login.username">
              <div :class="errors.username.classname">{{errors.username.message}}</div>
            </div>
            <div class="col-span-12">
              <input type="password" maxlength="18" placeholder="请输入密码" class="yp-input" v-model="login.password" autocomplete>
              <div :class="errors.password.classname">{{errors.password.message}}</div>
            </div>
            <div class="col-span-12 text-center md:text-start">
              <button type="submit" class="yp-button rounded">登录</button>
            </div>
          </div>
        </form>
      </div>
      <div class="absolute bottom-0 py-1.5 text-gray-500 text-xs hover:text-white duration-300">
        &copy 2023 东海县一品网络技术有限公司 All rights reserved.
      </div>
    </div>
  </div>
</template>
<script setup>
import {getData,postData,alter} from '@/api/data.js'
import store from '@/store'
import { reactive, watch } from 'vue'
import { router, loadAsyncRoutes } from '@/router'
const login = reactive({
  username: '',
  password: ''
})
const errors = reactive({
  username: {
    classname: 'form-success',
    message: ''
  },
  password: {
    classname: 'form-success',
    message: ''
  }
})
watch(
  () => login.username,
  (newVal, oldVal) => {
    if (newVal == '') {
      errors.username.classname = 'form-error'
      errors.username.message = '请输入账号'
    } else {
      errors.username.classname = 'form-success'
      errors.username.message = ''
    }
  }
)
watch(
  () => login.password,
  (newVal, oldVal) => {
    if (newVal == '') {
      errors.password.classname = 'form-error'
      errors.password.message = '请输入密码'
    } else {
      errors.password.classname = 'form-success'
      errors.password.message = ''
    }
  }
)

const submit = async (e) => {
  if (login.username == '') {
    errors.username.classname = 'form-error'
    errors.username.message = '请输入账号'
    return false
  }
  if (login.password == '') {
    errors.password.classname = 'form-error'
    errors.password.message = '请输入密码'
    return false
  }
  //请求登录
  const resp = await postData('admin/login', login)
  if (resp.code == 1) {
    store.commit('User/SET_TOKEN', resp.data.token)
    //请求系统基本数据
    const sysinfo = await getData('index/getsite')
    if (sysinfo.code == 1) {
      alter({ type: 'alter-success', text: resp.msg })
      store.dispatch('User/GET_USER_INFO', sysinfo.data.admin)
      //登录成功后请求一次路由
      loadAsyncRoutes()
      router.push('/')
    }
  }
}
</script>
