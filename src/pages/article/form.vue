<!--
 * @Author: 一品网络技术有限公司
 * @Date: 2022-08-02 08:05:43
 * @LastEditTime: 2022-09-02 12:08:36
 * @FilePath: \ypcmsvue3\src\pages\listinfo\add.vue
 * @Description:
 * 联系QQ:58055648
 * Copyright (c) 2022 by 东海县一品网络技术有限公司, All Rights Reserved.
-->
<template>
    <div>
      <ypform :formData="formData" :group="mod.colgroup" :mod="mod" :isPreview="0" @save="save" v-if="isload"></ypform>
      {{ formData }}
    </div>
  </template>
      <script setup>
  import { getData,postData,alter,FormCol } from '@/api/data'
  import { ref, reactive, onMounted,inject } from 'vue'
  const props = defineProps({
    mod: {
      type: Object
    },
    id: 0
  })
  const emits = defineEmits(['jumpCom'])
  const isload=ref(false)
  //表单事件
  const formEvent = inject('formEvent', '')

  const formData = reactive({})
  const save=async (postParams)=>{
    const res = await postData('/article/save',postParams)
    if(res.code == 1) {
      alter({ type: 'alter-success', text: res.msg })
      formEvent.saveEvent()
    }
  }


  onMounted(async () => {
    //初始化栏目
    props.mod.modcolumn.forEach((v) => {
      if (v.formitem != 'none') {
        formData[v.name] = ''
      }
    })
    //编辑信息
    if (props.id) {
      const res = await getData('/article/details', {
        id: props.id
      })
      if (res.code == 1) {
        formData['id']=props.id
        props.mod.modcolumn.forEach((v) => {
          if (v.formitem != 'none') {
            formData[v.name] = FormCol(v,res.data)
          }
        })
      }
    }
    //数据加载完显示表单
    isload.value = true
  })
  </script>
