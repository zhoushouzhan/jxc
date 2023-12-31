<!--
 * @Author: 一品网络技术有限公司
 * @Date: 2022-07-11 17:46:23
 * @LastEditTime: 2022-10-24 11:22:21
 * @FilePath: \vue3\src\pages\mod\modcols.vue
 * @Description:
 * 联系QQ:58055648
 * Copyright (c) 2022 by 东海县一品网络技术有限公司, All Rights Reserved.
-->
<template>

  <div class="m-3 text-sm select-none h-full relative" @dragstart="dragstart" @dragover.prevent="dragover">
    <div class="bg-white flex flex-wrap divide-x">
      <div class="w-40">
        <div class="p-2 bg-gray-700 text-white font-bold">字段列表</div>
        <div class="list divide-y h-[550px] overflow-y-auto" id="col" @drop="coldrop" @dragend="coldropend">
          <div draggable="true" class="p-2" :id="item.id" :index="index+1" :col="item.alias" v-for="(item,index) in dataList" :key="index">{{item.alias}}</div>
        </div>
      </div>
      <div class="relative">
        <div class="flex justify-between divide-x">
          <div v-for="(item,index) in colGroup" :key="index" class="w-52">
            <div class="font-bold bg-amber-900 text-white p-2">{{item}}</div>
            <div class="column h-[550px] overflow-y-auto text-red-900 font-bold divide-y" :index="index" @drop="drop" @dragenter="dragenter" @mouseenter="modcolclick">
              <template v-for="(item,key) in modcolumn" :key="key">
                <div draggable="true" class="p-2 flex justify-between" :id="item.id" :index="key+1" :col="item.alias" v-if="item.groupindex==index">
                  <div>
                    {{item.alias}}
                  </div>
                  <div class="text-gray-400 font-thin font-mono">
                    {{item.name}}
                  </div>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
      <div class="flex-1 w-[500px]">
        <div class="p-2 bg-gray-400 text-white font-bold text-center">表单预览</div>
        <div class="p-2">
          <div class="p-1">
            <ypform :formData="paramsData" :group="colGroup" :mod="mod" :isPreview="1" v-if="isLoadForm" />
          </div>
        </div>
      </div>
    </div>
    <div class="py-2 text-center">
      <button type="button" class="yp-button rounded" @click="submit">提交</button>
    </div>

    <div class="top-0 left-0 absolute bg-black w-full h-full z-10 bg-opacity-50" v-if="editCol">
      <Editcol :col="editItem.data" @complete="editCol=0"></Editcol>
    </div>
  </div>
</template>
<script setup>
import { alter, postData,getData } from '@/api/data'
import {
  ref,
  reactive,
  onMounted,
  onUnmounted,
  watch,
} from 'vue'
import Editcol from './editcol.vue'
import {
  dataList,
  dragstart,
  dragover,
  coldrop,
  coldropend,
  drop,
  dragenter,
  modcolclick,
  editCol,
  modcolumn
} from './dropcol.js'
const props = defineProps({ modName: null })
const emit = defineEmits(['jumpCom'])
//提交数据
const paramsData = reactive({})
//加载表单
const isLoadForm = ref(0)
const mod = reactive({})
const colGroup = ref('')
const editItem = reactive({ data: [] })
watch(editCol, (newVal, oldVal) => {
  if (newVal) {
    Object.keys(modcolumn).map((key) => {
      if (modcolumn[key].id == newVal) editItem.data = modcolumn[key]
    })
  }
  modcolumn.sort((a, b) => {
    return a.sort - b.sort
  })
})
//提交
const submit = async () => {
  //检测重复字段
  let temArr = []
  let isRepeat = 0
  modcolumn.map((vo) => {
    if (temArr.indexOf(vo.name) >= 0) {
      alter({ type: 'alter-error', text: '有重复字段' + vo.name })
      isRepeat = 1
    }
    temArr.push(vo.name)
  })
  if (!isRepeat) {
    isLoadForm.value = 0
    const res = await postData('/mod/updateCol', {
      id: mod.id,
      modcolumn: modcolumn
    })
    if (res.code) {
      alter({ type: 'alter-success', text: res.msg })
      isLoadForm.value = 1
    } else {
      alter({ type: 'alter-error', text: res.msg })
    }
  }
}

onMounted(async () => {
  const modData = await getData('/mod/getmod',{ name: props.modName })
  Object.keys(modData.data).map((key) => {
    mod[key] = modData.data[key]
  })
  colGroup.value = modData.data.colgroup
  //载入模型字段
  if (modData.data.modcolumn) {
    modData.data.modcolumn.map((item) => {
      modcolumn.push(item)
    })
    modcolumn.sort((a, b) => {
      return a.sort - b.sort
    })
  }

  isLoadForm.value = 1
})

onUnmounted(() => {
  modcolumn.length = 0
})
</script>