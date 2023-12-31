<!--
 * @Author: 一品网络技术有限公司
 * @Date: 2022-09-13 21:02:40
 * @LastEditTime: 2022-10-05 11:50:23
 * @FilePath: \ypcmsvue3\src\pages\permissions\roles\rule.vue
 * @Description:
 * 联系QQ:58055648
 * Copyright (c) 2022 by 东海县一品网络技术有限公司, All Rights Reserved.
-->
<template>
  <div class="authrule">
    <rule-item v-for="(item,index) in dataList" :list="item" :key="index" :leave="0">
    </rule-item>
  </div>
</template>
  <script setup>
import authTree from './authtree'
import { reactive, provide, ref, onMounted, watch } from 'vue'
import ruleItem from './ruleItem.vue'
const props = defineProps({
  dataList: { default: [] },
  value: Array
})
const emits = defineEmits(['change'])
//选中的项目
const chitem = reactive(props.value)
const auth_btn = reactive([])
//记录展开的菜单
const openitem = reactive([])
//关掉所有子菜单
const closeChildMenu = (obj) => {
  obj.forEach((item) => {
    if (openitem.indexOf(item.id) >= 0) {
      openitem.splice(openitem.indexOf(item.id), 1)
    }
    if (item.children && item.children.length > 0) {
      closeChildMenu(item.children)
    }
  })
}
//关掉指定菜单
const closeMenu = (id, obj) => {
  obj.forEach((item) => {
    if (id == item.id) {
      openitem.splice(openitem.indexOf(id), 1)
      if (item.children && item.children.length > 0) {
        closeChildMenu(item.children)
      }
    } else if (item.children && item.children.length > 0) {
      closeMenu(id, item.children)
    }
  })
}
provide('menu-switch', {
  opens: openitem,
  chitem: chitem,
  auth_btn: auth_btn,
  toggle: (id) => {
    if (openitem.indexOf(id) >= 0) {
      //关闭菜单
      closeMenu(id, props.dataList)
    } else {
      //展开菜单
      openitem.push(id)
    }
  },
  //选择菜单
  checked: (id) => {
    let arr = authTree.update(id)
    chitem.length = 0
    arr.forEach((id) => {
      chitem.push(id)
    })
  }
})
//己选择
const getSelect = (id, obj) => {
  if (id && obj) {
    obj.forEach((item) => {
      let isfind = true
      if (item.id == id) {
        chitem.value = item
        if (item.pid) {
          getPid(item.pid, props.dataList)
        }
        isfind = false
      }
      if (item.children && isfind) {
        getSelect(id, item.children)
      }
    })
  }
}
const getPid = (id, obj) => {
  if (id) {
    obj.forEach((item) => {
      let isfind = true
      if (item.id == id) {
        openitem.push(id)
        getPid(item.pid, props.dataList)
        isfind = false
      }
      if (item.children && isfind) {
        getPid(id, item.children)
      }
    })
  }
}
watch(props, (newProps) => {
  authTree.dataList = newProps.dataList
  authTree.checkedIds = JSON.parse(JSON.stringify(newProps.value))
  getSelect(newProps.value, newProps.dataList)
})
watch(chitem, (newVal) => {
  emits('change', newVal)
})
onMounted(() => {
  getSelect(props.value, props.dataList)
  authTree.dataList = props.dataList
  authTree.checkedIds = JSON.parse(JSON.stringify(props.value))
})
</script>