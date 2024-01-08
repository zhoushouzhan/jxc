<!--
 * @Author: 一品技术 5166651888@163.com
 * @Date: 2023-12-31 19:38:15
 * @LastEditors: 一品技术 5166651888@163.com
 * @LastEditTime: 2024-01-02 13:53:34
 * @FilePath: /jxcui/src/pages/login.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div class="w-full h-full flex justify-center select-none" @keyup.enter="submit">
        <div class="lg:w-[500px] max-lg:w-full space-y-4 absolute left-1/2 -translate-x-1/2 top-20 bg-white p-10 bg-opacity-65 rounded-lg">
            <div class="flex justify-center">
                <img src="@/assets/logo.png" class="h-16 object-cover">
            </div>
            <div class="text-center font-bold text-hui-300">泽玛珠宝</div>
            <div class="py-2"></div>
            <ypinput v-model="formData.username" :errormsg="formVerify.username" maxlength="22" placeholder="输入账号">
              <template v-slot:prefix>
                <div class="text-hui-100 pr-1">
                  <i class="ri-user-fill ri-lg"></i>
                </div>
              </template>
            </ypinput>
            <ypinput type="password" v-model="formData.password" :errormsg="formVerify.password" maxlength="22" placeholder="输入密码">
              <template v-slot:prefix>
                <div class="text-hui-100 pr-1">
                  <i class="ri-lock-fill ri-lg"></i>
                </div>
              </template>
            </ypinput>
            <div class="flex justify-center">
                <button type="button" class="btn btn-lan w-full" @click="submit">登录</button>
            </div>
        </div>
        <div class="absolute left-0 bottom-0 w-full text-center py-2 text-sm">
          Copyright © 2022 东海县一品网络技术有限公司
        </div>
    </div>
</template>
<script setup>
    import {getData,postData,alter} from '@/api/data.js'
    import store from '@/store'
    import { reactive, watch } from 'vue'
    import { router, loadAsyncRoutes } from '@/router'
    const formData = reactive({
        username: '',
        password: ''
    })
    const formVerify = reactive({
        username: '',
        password: ''
    })
    watch(
    () => formData.username,
    (newVal, oldVal) => {
        if (newVal == '') {
            formVerify.username = '请输入账号'
        } else {
            formVerify.username=''
        }
    }
    )
    watch(
    () => formData.password,
    (newVal, oldVal) => {
        if (newVal == '') {
            formVerify.password = '请输入密码'
        } else {
            formVerify.password=''
        }
    }
    )

    const submit = async (e) => {
    let validationFailed=0
    if (formData.username == '') {
            formVerify.username = '请输入账号'
            validationFailed++
    }
    if (formData.password == '') {
            formVerify.password = '请输入密码'
            validationFailed++
    }
    if(validationFailed>0){
            return false
    }
    //请求登录
    const resp = await postData('admin/login', formData)
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
