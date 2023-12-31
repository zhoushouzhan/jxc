<!--
 * @Author: 一品网络技术有限公司
 * @Date: 2022-07-01 08:36:59
 * @LastEditTime: 2022-09-26 22:47:20
 * @FilePath: \ypcmsvue3\src\pages\permissions\roles\form.vue
 * @Description:
 * 联系QQ:58055648
 * Copyright (c) 2022 by 东海县一品网络技术有限公司, All Rights Reserved.
-->

<template>
  <div class="text-sm text-gray-800">
    <div class="bg-white select-none p-2 space-y-3">

      <div class="flex items-center">
        <div class="w-24 text-right pr-5">名称</div>
        <div class="flex-1">
          <ypinput v-model="formData.title" placeholder="最多32个字符"></ypinput>
        </div>
      </div>
      <div class="flex items-center">
        <div class="w-24 text-right pr-5">描述</div>
        <div class="flex-1">
          <yptextarea v-model="formData.intro" placeholder="最多300个字符"></yptextarea>
        </div>
      </div>

      <div class="flex items-center">
        <div class="w-24 text-right pr-5">序号</div>
        <div class="flex-1">
          <ypinput v-model="formData.sort" type="number" placeholder=""></ypinput>
        </div>
      </div>
      <div class="flex items-center">
        <div class="w-24 text-right pr-5">状态</div>
        <div class="flex-1 flex items-center">
          <ypswitch v-model="formData.enabled"></ypswitch>
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
import { getData,postData,alter } from '@/api/data'
import { ref, reactive, onMounted } from 'vue'
const props = defineProps({ rolesId: Number })
const emits = defineEmits(['update'])
const formData = reactive({
  title: '',
  sort: '',
  intro: '',
  enabled: ''
})
const isreset = ref(0)
const save = async () => {
  const resp = await postData('/roles/save',formData)
  if (resp.code) {
    alter({ type: 'alter-success', text: resp.msg })
    if (!props.rolesId) {
      setTimeout(reset(), 1000)
    }
    emits('update')
  }
}
const reset = () => {
  isreset.value = 1
  for (let key in formData) {
    formData[key] = ''
  }
}

onMounted(async () => {
  if (props.rolesId) {
    formData['id'] = props.rolesId
    const resp = await getData('/roles/getroles',{ id: props.rolesId })
    if (resp.code == 1) {
      Object.keys(formData).map((key) => {
        formData[key] = resp.data[key]
      })
    }
  }
})
</script>
