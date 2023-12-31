<!--
 * @Author: 一品网络技术有限公司
 * @Date: 2022-09-13 21:02:40
 * @LastEditTime: 2022-09-16 10:40:44
 * @FilePath: \ypcmsvue3\src\components\global\ypmenu\ypmenu.vue
 * @Description:
 * 联系QQ:58055648
 * Copyright (c) 2022 by 东海县一品网络技术有限公司, All Rights Reserved.
-->
<template>
  <div class="ypmenu" ref="ypmenudom">
    <menu-item v-for="(item,index) in dataList" :list="item" :key="index" :leave="0"></menu-item>
  </div>
</template>
<script setup>
  import { alter } from '@/api/data'
  import { reactive, provide, ref, onMounted, watch } from 'vue'
  import menuItem from './menuItem.vue'
  const props = defineProps({
    dataList: { default: {} },
    modelValue: {
      default: ''
    },
    value: { default: '' }
  })
  const emit = defineEmits(['update:modelValue'])
  //选中的项目
  const chitem = ref('')
  const ypmenudom=ref(null)
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
    toggle: (id) => {
      if (openitem.indexOf(id) >= 0) {
        //关闭菜单
        closeMenu(id, props.dataList)
      } else {
        //展开菜单
        openitem.push(id)
      }
    },
    selected: (obj) => {
      chitem.value = obj
      console.log(ypmenudom.value.scrollWidth,'w',obj)
      emit('update:modelValue', obj)
    },
    noselect: (msg) => {
      alter({ type: 'alter-error', text: msg })
    }
  })
  //己选择
  const getSelect = (id, obj) => {
    if (id && obj) {
      obj.forEach((item) => {
        let isfind = true
        if (item.id == id) {
          chitem.value = item
          emit('update:modelValue', item)
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
    getSelect(newProps.value, newProps.dataList)
  })
  onMounted(() => {
    getSelect(props.value, props.dataList)
  })
</script>