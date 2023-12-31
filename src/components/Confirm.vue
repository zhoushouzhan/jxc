<!--
 * @Author: 一品网络技术有限公司
 * @Date: 2022-07-01 09:10:56
 * @LastEditTime: 2022-07-01 12:49:08
 * @FilePath: \ypcms2.0\vite-project\src\components\Confirm.vue
 * @Description:
 * 联系QQ:58055648
 * Copyright (c) 2022 by 东海县一品网络技术有限公司, All Rights Reserved.
-->
<template>
  <div class="w-[330px] bg-white rounded-md flex flex-col justify-between shadow-md overflow-hidden">
    <div class="bg-gray-700 py-2 px-3 text-white">{{title}}</div>
    <div class="p-5 text-md text-center text-lg">{{text}}</div>
    <div class="text-right pb-4 pr-4 space-x-3">
      <button type="button"
        class="inline-block px-2 py-1.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
        @click.stop="submitCallback">确定</button>
      <button type="button"
        class="inline-block px-2 py-1.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out"
        @click.stop="cancelCallback">取消</button>

    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  title: {
    type: String,
    default: '系统提示'
  },
  text: {
    type: String,
    default: '这家伙什么也没有写'
  },
  submitCallback: {
    type: Function
  },
  cancelCallback: {
    type: Function
  }
})
</script>
