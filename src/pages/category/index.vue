<!--
 * @Author: 一品网络技术有限公司
 * @Date: 2022-08-01 07:42:07
 * @LastEditTime: 2022-10-28 09:25:01
 * @FilePath: \vue3\src\pages\category\index.vue
 * @Description:
 * 联系QQ:58055648
 * Copyright (c) 2022 by 东海县一品网络技术有限公司, All Rights Reserved.
-->
<template>
  <yplayout>
    <template #header>
      <i class="ri-2x text-gray-500 ml-2" :class="meta.icon||'ri-information-line'"></i>
      <div class="text-xl px-3" v-html="meta.title"></div>
      <div class="flex-1"></div>
      <div class="hidden md:block">
        <button class="yp-button yp-button-orange rounded" type="button" @click="add" v-if="isbtn('add')">
          <i class="ri-add-line ri-lg pr-1"></i>
          增加
        </button>
      </div>
    </template>
    <template #list>
      <div class="border-t border-l border-r">
        <div class="flex items-center font-bold space-x-3 border-b bg-gray-50">
          <div class="p-2 w-52">栏目名称</div>
          <div class="p-2 w-36">栏目ID</div>
          <div class="flex-1"></div>
          <div class="p-2 w-36 text-center">操作</div>
        </div>

        <template v-for="(item,index) in dataList" :key="index">
          <CategoryItem :item="item" @changeMenu="menuEvent(item)"></CategoryItem>
            <template v-if="item.children&&item.children.length>0">
                <transition v-bind="hanimation">
                    <div v-show="openList.indexOf(item.id)>=0" class="menubox">
                        <Children :listItem="item.children" :openList="openList" :deep="1"></Children>
                    </div>
                </transition>
            </template>
        </template>

      </div>
    </template>
  </yplayout>
  <ypdialog width="1200" :title="dialogTitle" :mask="1" v-if="VisibleDialog" @close="VisibleDialog=false">
    <component :is='componentId' :id="categoryId" :mod="mod" @close="VisibleDialog=false" @getList="getList"></component>
  </ypdialog>
</template>
<script setup>
import { getData, postData, alter,authbtn } from '@/api/data'
import { useRoute } from 'vue-router'
import { ref, shallowRef, reactive, onMounted, provide, watch } from 'vue'
import CategoryItem from './categoryitem.vue'
import Children from './children.vue'
import Form from './form.vue'
//获取路由信息
const route = useRoute()
const meta = route.meta
const mod = meta.mod
//对话框录入表单
const componentId = shallowRef(Form)
const VisibleDialog = ref(false)
const dialogTitle = ref('')
const categoryId = ref(0)

//数据集
const dataList = reactive([])
//获取数据
const getList = async () => {
  dataList.length = 0
  const res = await getData('/category/getList')
  if (res.code == 1) {
    res.data.map((item) => {
      dataList.push(item)
    })
  }
}
//增加栏目
const add = () => {
  categoryId.value = 0
  dialogTitle.value = '增加栏目'
  VisibleDialog.value = true
}



const openList = reactive([])
const menuEvent=(item)=>{
    if(item.children&&item.children.length>0){
        changeMenu(item.id)
    }
}


const changeMenu=(id)=>{
  let idpos=openList.indexOf(id)
  if(idpos>=0){
    openList.splice(idpos,1)
  }else{
    openList.push(id)
  }
}
//权限按钮
const isbtn = (btn) => {
    const modname = meta.mod.name
    let arr = authbtn(modname)
    if (arr.indexOf(btn) >= 0) {
        return true
    } else {
        return false
    }
}

//远程方法
provide('menuType',{
    changeMenu:(id)=>{
        changeMenu(id)
    }
})

provide('category', {
  editbtn:isbtn('edit'),
  deletebtn:isbtn('delete'),
  //编辑栏目
  editItem: (id) => {
    categoryId.value = id
    dialogTitle.value = '编辑栏目'
    VisibleDialog.value = true
  },
  //删除栏目
  removeItem: async (id) => {
    const resp = await postData('category/delete', { ids: id })
    if (resp.code == 1) {
      alter({ type: 'alter-success', text: resp.msg })
      getList()
    }
  },
  //更新栏目
  update: async (e) => {
    await postData('category/save', e)
  },
  saveEvent: () => {
    getList()
  }
})
const hanimation={
    onEnter(el){
        el.style.height='auto'
        const endH=window.getComputedStyle(el).height
        el.style.height='0px'
        el.offsetHeight
        el.style.height=endH
    },
    onAfterEnter(el){
        el.style.height = null
    },
    onLeave(el){
        el.style.height = window.getComputedStyle(el).height
        el.offsetHeight
        el.style.height = '0px'
    },
    onAfterLeave(el){
        el.style.height = null
    }
}
onMounted(() => {
  getList()
})
</script>