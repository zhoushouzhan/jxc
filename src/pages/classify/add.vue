<!--
 * @Author: 一品网络技术有限公司
 * @Date: 2022-07-01 08:36:59
 * @LastEditTime: 2022-09-17 12:46:30
 * @FilePath: \ypcmsvue3\src\pages\classify\add.vue
 * @Description:
 * 联系QQ:58055648
 * Copyright (c) 2022 by 东海县一品网络技术有限公司, All Rights Reserved.
-->
<template>
  <div class="text-sm">
    <div class="p-9">
      <div class="flex pb-2 items-center">
        <div class="w-36 text-right pr-5">所属分类：</div>
        <div class="flex-1 leading-8 text-blue-600 font-bold">
          {{parent}}
        </div>
      </div>
      <div class="flex items-center">
        <div class="w-36 text-right pr-5">分类名称：</div>
        <div class="flex-1" id="title">
          <yptextarea v-model="formData.title" placeholder="一行一个"></yptextarea>
        </div>
      </div>
    </div>
    <div class="flex justify-center py-3 space-x-2">
      <button class="btn btn-hong" type="button" @click="emits('save',formData)">
        <i class="ri-save-line ri-lg pr-1"></i>
        提交
      </button>
      <button class="btn" type="button" @click="emits('close')">
        <i class="ri-arrow-go-back-fill mr-1"></i>
        取消
      </button>
    </div>
  </div>
</template>
<script setup>
  import { ref, reactive, onMounted } from 'vue'
  const emits = defineEmits(['close','save'])
  const props=defineProps(['preitem'])
  const parent = ref('顶级')
  const formData = reactive({
    title: '',
    pid: 0
  })
  onMounted(()=>{
    if(typeof(props.preitem)!='undefined'){
      parent.value=props.preitem.title
      formData.pid=props.preitem.id
      console.log(props.preitem)
    }
  })
</script>
