<!--
 * @Author: 一品网络技术有限公司
 * @Date: 2022-07-06 15:26:37
 * @LastEditTime: 2022-09-30 10:31:50
 * @FilePath: \ypcmsvue3\src\pages\mod\View.vue
 * @Description:
 * 联系QQ:58055648
 * Copyright (c) 2022 by 东海县一品网络技术有限公司, All Rights Reserved.
-->
<template>
  <div class="m-3 text-sm">
    <div class="bg-white p-2 rounded">
      模型数据待开发...
    </div>
  </div>
</template>
<script setup name="modAdd">
import {
  ref,
  reactive,
  getCurrentInstance,
  watch,
  onMounted,
  provide
} from 'vue'

const { proxy } = getCurrentInstance()
const props = defineProps({ modName: null })
const emit = defineEmits(['close'])

onMounted(() => {})
</script>
