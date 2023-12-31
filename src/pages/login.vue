<template>
    <div class="w-full h-full flex justify-center text-hui-300 select-none">
        <div class="lg:w-80 max-lg:w-full px-2 lg:translate-y-52 max-lg:translate-y-20 space-y-2">
            <div class="flex justify-center">
                <img src="@/assets/logo.png" class="h-16 object-cover">
            </div>
            <div class="text-center font-bold">泽玛珠宝</div>
            <div class="py-2"></div>
            <div>
                <input type="text" maxlength="18" placeholder="请输入账号" class="yp-input" v-model="login.username">
                <div :class="errors.username.classname">{{errors.username.message}}</div>
            </div>
            <div>
                <input type="password" maxlength="18" placeholder="请输入密码" class="yp-input" v-model="login.password" autocomplete>
                <div :class="errors.password.classname">{{errors.password.message}}</div>
            </div>
            <div class="flex justify-center">
                <button type="button" class="yp-button rounded w-full text-center" @click="submit">登录</button>
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
