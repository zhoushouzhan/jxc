<!--
 * @Author: 一品网络技术有限公司
 * @Date: 2022-07-01 08:36:59
 * @LastEditTime: 2022-09-17 16:57:50
 * @FilePath: \ypcmsvue3\src\pages\icon\list.vue
 * @Description:
 * 联系QQ:58055648
 * Copyright (c) 2022 by 东海县一品网络技术有限公司, All Rights Reserved.
-->
<template>
  <yplayout>
    <template #header="props">
      <div class="flex items-center">
        <i class="ri-2x text-gray-500 ml-2" :class="props.meta.icon||'ri-information-line'"></i>
        <div class="text-xl px-2" v-html="props.meta.title"></div>
        <div class="text-gray-400">收集常用图标,点击可复制,右击可删除</div>
      </div>
      <div class="flex-1"></div>
      <div class="hidden md:block">
        <div class="flex">
          <ypinput v-model="keyword" placeholder="名称"></ypinput>
          <button class="yp-button yp-button-gray h-[33px] rounded-r" type="button" @click="getDataList">
            <i class="ri-search-line ri-lg pr-1"></i>
            查询
          </button>
          <button class="yp-button rounded h-[33px] ml-4" type="button" @click="add">
            <i class="ri-add-line ri-lg pr-1"></i>
            增加图标
          </button>
        </div>
      </div>
    </template>
    <template #list>
      <div class="bg-white flex flex-wrap w-full">
        <div class="w-6 h-6 md:w-9 md:h-9 flex items-center duration-300 justify-center border m-1 active:text-red-500 active:bg-yellow-500 rounded hover:bg-black hover:text-white"
          v-for="(item,index) in dataList.list" :key="index" v-tooltip.bottom="item.title" @dblclick.stop="edit(item)" @click="copy(item.name)" @contextmenu.prevent.stop="destory(item.id)">
          <i :class=" item.name" class="md:text-2xl"></i>
        </div>
      </div>
    </template>
  </yplayout>
</template>
<script setup>
import {getData,postData,alter,confirms} from "@/api/data"
import useClipboard from 'vue-clipboard3'
import { ref, reactive, watch } from 'vue'
import Add from './add'
import Edit from './edit'
const { toClipboard } = useClipboard()
const dataList = reactive({ list: [] })
const keyword = ref('')

const props = defineProps({
  mod: {
    default: 0
  },
  meta: { default: '' }
})

const emit = defineEmits(['jumpCom', 'choice'])

const add = () => {
  emit('jumpCom', { to: Add, item: {} })
}
const edit = (item) => {
  emit('jumpCom', { to: Edit, item: item })
}
const copy = async (str) => {
  if (props.mod == 1) {
    emit('choice', str)
    return
  }

  try {
    await toClipboard(str)
    alter({ type: 'alter-success', text: '复制成功' })
  } catch (e) {
    alter({ type: 'alter-error', text: '复制失败' })
  }
}

const destory = (id) => {
    confirms({ text: '确认删除吗？' })
    .then(async () => {
      const res= await postData('/icon/delete', { id: id })
      if (res.code) {
        alter({ type: 'alter-success', text: res.msg })
        getDataList()
      } else {
        alter({ type: 'alter-error', text: res.msg })
      }
    })
    .catch((e) => {})
}
watch(keyword, (newVal, oldVal) => {
  if (!newVal) {
    getDataList()
  }
})
const getDataList = async () => {
  const res= await getData('/icon', { keyword: keyword.value })
  dataList.list = res.data
}
getDataList()
</script>
