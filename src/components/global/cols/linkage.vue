<!--
 * @Author: 一品网络技术有限公司
 * @Date: 2022-08-31 21:54:42
 * @LastEditTime: 2022-10-28 10:37:40
 * @FilePath: \vue3\src\components\global\yplinkage\yplinkage.vue
 * @Description:
 * 联系QQ:58055648
 * Copyright (c) 2022 by 东海县一品网络技术有限公司, All Rights Reserved.
-->
<template>
    <div class="flex space-x-1">
      <ypselect :itemList="item" v-model="path[index]" v-for="(item,index) in group" :key="index" @click.capture="change(index)"></ypselect>
    </div>
</template>
<script setup>
  import { getData } from '@/api/data'
  import { ref, onMounted, reactive, watch } from 'vue'
  const props = defineProps({
    modelValue: {
      default: []
    },
    col: {
      type: Object
    }
  })
  //获取联动URL及参数
  let info = JSON.parse(props.col.extends)
  //保存父级ID
  const pid = ref(info.pid)
  const path = reactive(props.modelValue||[])
  const pos = ref(0)
  const group = reactive([])
  //菜单更新
  watch(path, (newVal) => {
    pid.value = newVal[pos.value]
    getList()
    emit('update:modelValue', newVal[newVal.length-1])
  })
  //获取数据
  const getList = async () => {
    if(typeof pid.value=='undefined'){
      return
    }
    const res = await getData(info.url, { pid: pid.value, ids: path })
    if (res.code == 1) {
      if(group.length){
        group.length = pos.value + 1
        path.length = pos.value+1
      }
      res.data.forEach((item) => {
        let options = []
        Object.keys(item).forEach((key) => {
          options.push({
            title: item[key].title,
            value: item[key].id
          })
        })
        group.push(options)
      })
    }
  }
  const emit = defineEmits(['update:modelValue'])
  const change = (index) => {
    pos.value = index
  }
  onMounted(() => {
    console.log(props.modelValue)
    getList()
  })
  </script>