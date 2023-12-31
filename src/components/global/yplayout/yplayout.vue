<!--
 * @Author: 一品网络技术有限公司
 * @Date: 2022-09-17 11:10:08
 * @LastEditTime: 2022-09-17 12:45:48
 * @FilePath: \ypcmsvue3\src\components\global\yplayout\yplayout.vue
 * @Description:
 * 联系QQ:58055648
 * Copyright (c) 2022 by 东海县一品网络技术有限公司, All Rights Reserved.
-->
<template>
  <div class="modbox">
    <div class="flex my-2 items-center pb-2">
      <slot name="header" :meta="meta">
      </slot>
    </div>
    <div class="space-y-3">
      <slot name="list" :data="meta">
      </slot>
    </div>
  </div>
</template>
<script setup>
import { useRoute } from 'vue-router'
import { ref } from 'vue'
//获取路由信息
const route = useRoute()
const meta = ref(route.meta)
</script>
