<!--
 * @Author: 一品网络技术有限公司
 * @Date: 2022-07-01 08:36:59
 * @LastEditTime: 2022-09-26 22:48:57
 * @FilePath: \ypcmsvue3\src\pages\permissions\admin\form.vue
 * @Description:
 * 联系QQ:58055648
 * Copyright (c) 2022 by 东海县一品网络技术有限公司, All Rights Reserved.
-->

<template>
  <div class="text-sm text-gray-800">
    <div class="bg-white select-none p-2 space-y-3">

      <div class="flex items-center">
        <div class="w-24 text-right pr-5">账号</div>
        <div class="flex-1">
          <ypinput v-model="formData.username" placeholder="5-15位字母+数字"></ypinput>
        </div>
      </div>
      <div class="flex items-center">
        <div class="w-24 text-right pr-5">密码</div>
        <div class="flex-1">
          <ypinput v-model="formData.password" type="password" :placeholder="passplaceholder"></ypinput>
        </div>
      </div>
      <div class="flex items-center">
        <div class="w-24 text-right pr-5">重复密码</div>
        <div class="flex-1">
          <ypinput v-model="formData.confirm_password" type="password" :placeholder="passplaceholder"></ypinput>
        </div>
      </div>
      <div class="flex items-center">
        <div class="w-24 text-right pr-5">姓名</div>
        <div class="flex-1">
          <ypinput v-model="formData.truename" placeholder="最多32位字符"></ypinput>
        </div>
      </div>
      <div class="flex items-center">
        <div class="w-24 text-right pr-5">手机</div>
        <div class="flex-1">
          <ypinput v-model="formData.mobile" type="tel" placeholder="最多32位字符"></ypinput>
        </div>
      </div>
      <div class="flex items-center">
        <div class="w-24 text-right pr-5">状态</div>
        <div class="flex-1 flex items-center">
          <ypswitch v-model="formData.status"></ypswitch>
          <div class="px-2 text-red-500 font-bold">
            {{ formData.lockedmsg }}
          </div>
        </div>
      </div>
      <div class="flex items-center">
        <div class="w-24 text-right pr-5">角色</div>
        <div class="flex-1 flex items-center">
          <template v-for="(item,index) in rolesList" :key="index">
            <ypcheckbox :title="item.title" :value="item.id" v-model="formData.roles_id" v-if="item.id>=store.state.Sys.sysinfo.admin.maxroles"></ypcheckbox>
          </template>
          

        </div>
      </div>
    </div>
    <div class="flex justify-center py-3 space-x-2">
      <button class="yp-button yp-button-orange rounded" type="button" @click="save">
        <i class="ri-save-line ri-lg pr-1"></i>
        保存
      </button>
      <button class="yp-button yp-button-gray rounded" type="button" @click="reset">
        <i class="ri-format-clear ri-lg pr-1"></i>
        重置
      </button>
    </div>
  </div>

</template>
    <script setup>
    import store from '@/store'
import {getData,postData,alter } from '@/api/data'
import { ref, reactive, onMounted } from 'vue'
const props = defineProps({ adminId: Number })
const emits = defineEmits(['update'])
const formData = reactive({
  username: '',
  password: '',
  confirm_password: '',
  truename: '',
  mobile: '',
  status: '',
  roles_id: [],
  lockedmsg:''
})
const passplaceholder = ref('6-18位英文字符')
const rolesList = ref('')
const save = async () => {
  const resp = await postData('/admin/save',formData)
  if (resp.code) {
    alter({ type: 'alter-success', text: resp.msg })
    if (!props.adminId) {
      setTimeout(reset(), 1000)
    }
    emits('update')
  }
}
const reset = () => {
  for (let key in formData) {
    formData[key] = ''
  }
}

onMounted(async () => {
  const resp = await getData('/roles/index')
  rolesList.value = resp.data
  if (props.adminId) {
    formData['id'] = props.adminId
    const resp = await getData('/admin/getadmin',{ id: props.adminId })
    if (resp.code == 1) {
      passplaceholder.value = '不改不填写,6-18位英文字符'
      Object.keys(formData).map((key) => {
        if (key == 'roles_id') {
          resp.data['roles'].map((item) => {
            formData[key].push(item.id)
          })
        } else {
          formData[key] = resp.data[key]
        }
      })
    }
  }
})
</script>
