<!--
 * @Author: 一品网络技术有限公司
 * @Date: 2022-08-21 10:31:07
 * @LastEditTime: 2022-10-25 08:29:16
 * @FilePath: \vue3\src\pages\mod\editcol.vue
 * @Description:
 * 联系QQ:58055648
 * Copyright (c) 2022 by 东海县一品网络技术有限公司, All Rights Reserved.
-->
<template>
  <div class="bg-white m-3 p-3 rounded" v-if="isload">
    <div class="flex items-center">
      <div class="flex items-center">
        <i class="ri-information-line ri-2x text-gray-500"></i>
        <div class="text-xl px-2">编辑字段</div>
        <div class="text-orange-700">修改即时生效</div>
      </div>
    </div>
    <div class="space-y-3 p-2">
      <div class="flex">
        <div class="w-24 text-right pr-5 pt-2">名称</div>
        <div class="flex-1">
          <input type="text" class="yp-input" v-model="col.alias" placeholder="请输入名称,字段标识">
        </div>
      </div>
      <div class="flex">
        <div class="w-24 text-right pr-5 pt-2">字段名</div>
        <div class="flex-1">
          <input type="text" class="yp-input" v-model="col.name" placeholder="用于建表,只能英文">
        </div>
      </div>
      <div class="flex items-center">
        <div class="w-24 text-right pr-5">提示</div>
        <div class="flex-1">
          <ypinput v-model="col.tips" placeholder="提示信息"></ypinput>
        </div>
      </div>
      <div class="flex">
        <div class="w-24 text-right pr-5 pt-2">字段类型</div>
        <div class="flex-1">
          <ypselect v-model="col.type" :itemList="typeOptions"></ypselect>
        </div>
      </div>
      <div class="flex">
        <div class="w-24 text-right pr-5 pt-2">字段长度</div>
        <div class="flex-1">
          <input type="text" class="yp-input" v-model="col.length">
        </div>
      </div>
      <div class="flex">
        <div class="w-24 text-right pr-5 pt-2">默认值</div>
        <div class="flex-1">
          <input type="text" class="yp-input" v-model="col.defvalue">
        </div>
      </div>
      <div class="flex">
        <div class="w-24 text-right pr-5 pt-2">表单元素</div>
        <div class="flex-1 flex">
          <ypselect :itemList="formItem" v-model="col.formitem"></ypselect>
        </div>
      </div>
      <div class="flex items-center">
        <div class="w-24 text-right pr-5">字段参数</div>
        <div class="flex-1">
          <ypinput v-model="col.extends" placeholder="功能型字段需要填写参数"></ypinput>
        </div>
      </div>
      <div class="flex">
        <div class="w-24 text-right pr-5 pt-2">列宽</div>
        <div class="flex-1">
          <input type="number" class="yp-input" v-model="col.colwidth">
        </div>
      </div>
      <div class="flex">
        <div class="w-24 text-right pr-5 pt-2">前缀</div>
        <div class="flex-1">
          <input type="text" class="yp-input" v-model="col.prefix">
        </div>
      </div>
      <div class="flex">
        <div class="w-24 text-right pr-5 pt-2">后缀</div>
        <div class="flex-1">
          <input type="text" class="yp-input" v-model="col.suffix">
        </div>
      </div>
      <div class="flex">
        <div class="w-24 text-right pr-5 pt-2">排序</div>
        <div class="flex-1">
          <input type="text" class="yp-input" v-model="col.sort">
        </div>
      </div>
    </div>
    <div class="flex justify-center py-3 space-x-2">
      <button class="yp-button yp-button-orange rounded" type="button" @click="emit('complete')">
        <i class="ri-arrow-go-back-line ri-lg pr-1"></i>
        返回
      </button>
    </div>
  </div>

</template>
<script setup>
import store from '@/store'
import { ref,onMounted, reactive } from 'vue'
const isload=ref(false)
const props = defineProps({
  col: {
    type: Object
  }
})
const formItem = reactive([])
const emit = defineEmits(['complete'])
const typeOptions = store.getters.colType

onMounted(() => {
  formItem.length = 0
  store.getters.formItem.forEach((item) => {
    formItem.push({ value: item.value, title: item.name })
  })
  isload.value=true
})
</script>
