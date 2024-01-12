<!--
 * @Author: 一品网络技术有限公司
 * @Date: 2022-07-01 08:36:59
 * @LastEditTime: 2022-09-17 11:38:22
 * @FilePath: \ypcmsvue3\src\pages\classify\index.vue
 * @Description:
 * 联系QQ:58055648
 * Copyright (c) 2022 by 东海县一品网络技术有限公司, All Rights Reserved.
-->
<template>
  <yplayout v-if="isload">
    <template #header="head">
      <div class="flex items-center">
        <i class="ri-2x text-gray-500 ml-2" :class="head.meta.icon||'ri-information-line'"></i>
        <div class="text-xl px-3" v-html="head.meta.title"></div>
        <div class="text-gray-400">用于菜单，联动，等</div>
      </div>
      <div class="flex-1"></div>
    </template>
    <template #list>
      <div class="overflow-auto">
        <div class="flex items-center space-x-2 p-2">
          <div>路径：</div>
          <div class="flex">
            <div class="text-gray-500 hover:text-blue-500 hover:cursor-pointer" @click="getson({id:0,havesid:1}),pathinfo.length=0">顶级</div>
            <div v-for="(item,index) in pathinfo" class="text-gray-500 hover:text-blue-500 hover:cursor-pointer" @click="getson(item)"><span class="px-2 text-gray-300">></span>{{ item.title }}</div>
          </div>
          <div class="flex-1"></div>
          <div>
            <button class="btn btn-lan" type="button" @click="add()">
              增加
            </button>
          </div>
        </div>
        <table class="yp-table-datalist text-hui-300">
          <thead class="bg-gray-100 font-thin">
            <tr>
              <th class="p-2">ID</th>
              <th>名称</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr class="hover:bg-gray-100" v-for="(item,index) in dataList">
              <td>{{ item.id }}</td>
              <td v-if="item.havesid" @click="getson(item)">
                <div class="flex space-x-2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-5 fill-[#FFD96F]"><path d="M4 5V19H20V7H11.5858L9.58579 5H4ZM12.4142 5H21C21.5523 5 22 5.44772 22 6V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3H10.4142L12.4142 5Z"></path></svg>
                  <div>
                    {{ item.title }}
                  </div>
                </div>
              </td>
              <td v-else @click="getson(item)">
                <div class="flex space-x-2">
                  <div>
                    {{ item.title }}
                  </div>
                </div>
              </td>
              <td>
                <div class="flex space-x-2">
                  <button class="btn btn-small" @click="edit(item)">编辑</button>
                  <button class="btn btn-chen btn-small" @click="add(item)">增加子级</button>
                  <button class="btn btn-hong btn-small" @click="destory(item.id)">删除</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </template>
  </yplayout>
  <ypdialog width="1200" :title="dialog.title" :mask="1" v-if="dialog.open" @close="dialog.open=false">
    <component :is='dialog.componentId' :preitem="dialog.preitem" @close="dialog.open=false" @getList="getList" @save="save" @update="update"></component>
  </ypdialog>
</template>

<script setup>
import { getData,postData,alter,confirms } from '@/api/data'
import { ref,reactive, onMounted, watch, shallowRef } from 'vue'
import Add from './add'
import Edit from './edit'
const isload=ref(false)
//弹窗
const dialog=reactive({
  open:false,
  title:'未命名',
  mask:1,
  componentId:'',
  preitem:[],
})
//获取数据参数
const paramData=reactive({
  pid:0
})
//获取子类
const getson=(item)=>{
  if(item.havesid&&item.id!=paramData.pid){
    changepathinfo(item)
    paramData.pid=item.id
  }
}
//监听节点
watch(()=>paramData.pid,(newVal)=>{
  getList()
})
//面包屑
const pathinfo=reactive([])
//面包屑变化
const changepathinfo=(item)=>{
  console.log(item)
  let pos=-1
  for(let index in pathinfo){
    if(pathinfo[index].id==item.id){
      pos=parseInt(index)
    }
  }
  if(pos<0){
    pathinfo.push(item)
  }else{
    console.log(pathinfo,pos+1)
    pathinfo.splice(pos+1)
  }
}
//数据
const dataList = reactive([])
//获取数据
const getList= async ()=>{
  const resp= await getData("/classify/index",paramData)
  if (resp.code) {
    dataList.length = 0
    resp.data.forEach((item) => {
      dataList.push(item)
    })
  }
}
//增加分类
const add=(item)=>{
  dialog.title='增加分类'
  dialog.preitem=item
  dialog.componentId=shallowRef(Add)
  dialog.open=true
}
//编辑分类
const edit=(item)=>{
  dialog.title='编辑分类'
  dialog.preitem=item
  dialog.componentId=shallowRef(Edit)
  dialog.open=true
}
//删除分类
const destory= (id)=>{
  confirms({ text: '确认删除吗？' }).then(async ()=>{
    const resp= await postData("/classify/delete",{ids:id})
    if(resp.code==1){
      alter({ type: 'alter-success', text: resp.msg })
      getList()
    }
  })

}
//增加分类
const save=async (paramData)=>{
  const resp= await postData("/classify/save",paramData)
  if(resp.code==1){
    alter({ type: 'alter-success', text: resp.msg })
    getList()
  }
}

//更新分类
const update=async (paramData)=>{
  const resp= await postData("/classify/update",paramData)
  if(resp.code==1){
    alter({ type: 'alter-success', text: resp.msg })
    getList()
  }
}

//页面加载完
onMounted(()=>{
  getList()
  isload.value=true
})
</script>
