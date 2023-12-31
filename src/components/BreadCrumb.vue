<!--
 * @Author: 一品网络技术有限公司
 * @Date: 2022-07-05 09:17:02
 * @LastEditTime: 2022-07-06 17:30:37
 * @FilePath: \ypcms2.0\vite-project\src\components\BreadCrumb.vue
 * @Description:
 * 联系QQ:58055648
 * Copyright (c) 2022 by 东海县一品网络技术有限公司, All Rights Reserved.
-->
<template>
  <nav class="relative flex flex-wrap items-center justify-between text-gray-600 text-sm">
    <div class="container-fluid w-full flex flex-wrap items-center justify-between pl-2">
      <nav class="bg-grey-light rounded-md w-full" aria-label="breadcrumb">
        <ol class="list-reset flex">
          <template v-for="(item,index) in breadcrumbs.list" :key="index">
            <li :class="{'text-lime-600 font-bold':index==breadcrumbs.list.length-1}">
              {{item.meta.title}}
            </li>
            <li v-if="index < breadcrumbs.list.length-1"><span class="text-gray-600 mx-2">/</span></li>
          </template>
        </ol>
      </nav>
    </div>
  </nav>
</template>
<script setup>
import { useRoute } from 'vue-router'
import { reactive, watch } from 'vue'
const route = useRoute()
const breadcrumbs = reactive({ list: [] })
breadcrumbs.list = route.matched
watch(
  () => route.matched,
  (newVal, oldVal) => {
    breadcrumbs.list = newVal
  }
)
</script>