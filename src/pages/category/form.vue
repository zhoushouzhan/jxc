<!--
 * @Author: 一品网络技术有限公司
 * @Date: 2022-08-02 08:05:43
 * @LastEditTime: 2022-10-28 10:33:59
 * @FilePath: \vue3\src\pages\category\form.vue
 * @Description:
 * 联系QQ:58055648
 * Copyright (c) 2022 by 东海县一品网络技术有限公司, All Rights Reserved.
-->
<template>
  <ypform :formData="formData" :group="mod.colgroup" @save="save" :mod="mod" v-if="isload==1"></ypform>
</template>
<script setup>
import { getData,postData,alter } from '@/api/data'
import { ref, reactive, onMounted,inject } from 'vue'
//获取路由信息
const props = defineProps({ mod: Object, id: 0 })
const emits=defineEmits(['close','getList'])
const formData = reactive({})
const isload = ref(0)

const formEvent = inject('category')

const save=async (postParams)=>{
    const res = await postData('/category/save',postParams)
    if(res.code == 1) {
      alter({ type: 'alter-success', text: res.msg })

      formEvent.saveEvent()
    }
  }


onMounted(async () => {
  props.mod.modcolumn.forEach((v) => {
    if (v.formitem != 'none') {
      formData[v.name] = ''
    }
  })

  if (props.id) {
    const resp = await getData('/category/getDetails', { id: props.id })
    if (resp.code == 1) {
      formData['id'] = resp.data.id
      props.mod.modcolumn.forEach((item) => {
        formData[item.name] = resp.data[item.name]
      })
    }
  }
  isload.value = 1
})
</script>
