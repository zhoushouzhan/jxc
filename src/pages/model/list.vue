<!--
 * @Author: 一品网络技术有限公司
 * @Date: 2022-08-02 08:05:39
 * @LastEditTime: 2022-09-19 12:59:14
 * @FilePath: \ypcmsvue3\src\pages\model\list.vue
 * @Description:
 * 联系QQ:58055648
 * Copyright (c) 2022 by 东海县一品网络技术有限公司, All Rights Reserved.
-->
<template>

  <div>

    <div class="flex items-center">
      <div class="flex items-center">
        <i class="ri-2x text-gray-500" :class="mod.icon"></i>
        <div class="text-xl px-2"> {{mod.alias}}管理</div>
      </div>
      <div class="flex-1"></div>
    </div>

    <div class="flex space-x-2 mt-2">
      <div>
        <button class="yp-button yp-button-sm rounded-sm" @click="add">增加</button>
      </div>
      <div>
        <ypimport url="/admin.php/upload" ref="uploader" :mod="mod">
          <button class="yp-button yp-button-red yp-button-sm rounded-sm" id="ypimport">导入</button>
        </ypimport>
      </div>
      <div>
        <button class="yp-button yp-button-orange yp-button-sm rounded-sm" @click="ypexport">导出</button>
      </div>
      <div class="flex-1">
        <button class="yp-button yp-button-gray yp-button-sm rounded-sm relative" @click="modData.isremove=!modData.isremove">
          {{modData.isremove?'返回列表':'回收站'}}
          <div class="absolute text-xs -top-1.5 -right-1.5 px-1 min-w-4 h-4 rounded-full bg-red-600 flex items-center justify-center">
            {{modData.removenum}}
          </div>
        </button>
      </div>
      <div class="flex">
        <input type="text" class="yp-input h-8" v-model="keyword" placeholder="请输入关键词">
        <button class="yp-button yp-button-gray text-nowrap rounded-sm h-8 ml-1" @click="searchfun"><i class="ri-search-line ri-lg"></i></button>
      </div>
    </div>
    <table class="table-auto w-full text-sm mt-3">
      <thead>
        <tr class="text-left">
          <th class="px-2 py-2 border w-10 font-thin">

          </th>
          <th class="px-2 py-2 border">ID</th>
          <template v-for="(item,index) in mod.modcolumn" :key="index">
            <th class="px-2 py-2 border" v-if="item.colwidth">
              {{item.alias}}
            </th>
          </template>

          <th class="px-2 py-2 border w-32 text-center">操作</th>
        </tr>
      </thead>
      <tbody>
        <tr class="hover:bg-gray-100" v-for="(vo,key) in modData.list" :key="key">
          <td class="border px-2">
            <ypcheckbox :value="vo.id" v-model="selectIds"></ypcheckbox>
          </td>
          <td class="border px-2">{{vo.id}}</td>
          <template v-for="(item,index) in mod.modcolumn" :key="index">
            <td class="px-2 py-2 border" v-if="item.colwidth">
              {{vo[item.name]}}
            </td>
          </template>
          <td class="border px-2 text-right">
            <button class="yp-button yp-button-sm yp-button-green rounded-sm mr-2" @click="restore(vo.id)" v-if="modData.isremove">还原</button>
            <button class="yp-button yp-button-sm rounded-sm mr-2" @click="edit(vo)" v-else>编辑</button>
            <button class="yp-button yp-button-red yp-button-sm rounded-sm" @click="removeItem(vo.id)" v-if="modData.isremove">删除</button>
            <button class="yp-button yp-button-orange yp-button-sm rounded-sm" @click="destory(vo.id)" v-else>回收站</button>
          </td>
        </tr>

      </tbody>
      <tfoot>
        <tr>
          <td class="border p-2">

          </td>
          <td class="border p-2" :colspan="mod.modcolumn.length-1">
            <div class="space-x-2" v-if="modData.isremove">
              <button class="yp-button yp-button-sm yp-button-green rounded-sm" @click="restore(0)" v-tooltip.bottom="'批量还原'">还原</button>
              <button class="yp-button yp-button-red yp-button-sm rounded-sm" @click="removeItem(0)" v-tooltip.bottom="'批量删除'">删除</button>
            </div>
            <div class="space-x-2" v-else>
              <button class="yp-button yp-button-sm yp-button-orange rounded-sm" @click="destory(0)" v-tooltip.bottom="'批量移入回收站'">回收站</button>
            </div>
          </td>
        </tr>
      </tfoot>
    </table>
    <div class="mt-3">
      <yppage @topage="modData.topage" :curpage="modData.curpage" :totalPage="modData.totalPage" />
    </div>
  </div>
</template>
<script setup name="NmodelList">
import {
  onMounted,
  reactive,
  getCurrentInstance,
  provide,
  watch,
  ref
} from 'vue'
import Add from './add.vue'
import Edit from './edit.vue'
const { proxy } = getCurrentInstance()
const prop = defineProps({
  mod: {
    type: Object
  }
})
const emits = defineEmits(['jumpCom'])
//数据对象
const modData = reactive({
  isremove: false, //回收站切换
  removenum: 0, //回收站数量
  list: [], //数据
  curpage: 0, //当前页
  totalPage: 0, //总页
  total: 0, //信息总数
  limit: 0, //每页数量
  topage: (page) => {
    modData.curpage = page
    getList()
  }
})
//回收站切换
watch(
  () => modData.isremove,
  (newVal, oldVal) => {
    getList()
  }
)
//搜索
const keyword = ref('')
watch(keyword, (newVal, oldVal) => {
  if (newVal == '') {
    getList()
  }
})
const searchfun = () => {
  if (keyword.value) {
    modData.curpage = 0
    getList()
  }
}
//复选框
const selectIds = reactive([])
//增加信息
const add = () => {
  emits('jumpCom', { to: Add })
}
//编辑信息
const edit = (item) => {
  emits('jumpCom', { to: Edit, item: item })
}
//回收站
const destory = (id = 0) => {
  if (id == 0) {
    id = selectIds
  }

  if (!id) {
    proxy.$Alter({ type: 'alter-error', text: '请选择项目' })
    return
  }

  proxy.$http
    .get('/listInfo/delete', { modid: prop.mod.id, ids: id })
    .then((res) => {
      if (res.code) {
        proxy.$Alter({ type: 'alter-success', text: res.msg })
        selectIds.length = 0
        getList()
      } else {
        proxy.$Alter({ type: 'alter-error', text: res.msg })
      }
    })
}
//回收站还原
const restore = (id) => {
  if (id == 0) {
    id = selectIds
  }

  if (!id) {
    proxy.$Alter({ type: 'alter-error', text: '请选择项目' })
    return
  }

  proxy.$http
    .get('/listInfo/restore', { modid: prop.mod.id, ids: id })
    .then((res) => {
      if (res.code) {
        proxy.$Alter({ type: 'alter-success', text: res.msg })
        getList()
      }
    })
}
//回收站删除
const removeItem = (id) => {
  if (id == 0) {
    id = selectIds
  }
  if (!id) {
    proxy.$Alter({ type: 'alter-error', text: '请选择项目' })
    return
  }

  proxy
    .$Confirms({ text: '确认删除吗？' })
    .then(() => {
      proxy.$http
        .get('/listInfo/delete', { modid: prop.mod.id, ids: id })
        .then((res) => {
          if (res.code) {
            proxy.$Alter({ type: 'alter-success', text: res.msg })
            getList()
          }
        })
    })
    .catch((e) => {})
}
//导出选中项目
const ypexport = () => {
  if (selectIds.length == 0) {
    proxy.$Alter({ type: 'alter-error', text: '请选择项目' })
    return
  }
  proxy
    .$Confirms({ text: '确定导出吗？' })
    .then(() => {
      proxy.$http
        .download('/listInfo/export', {
          modid: prop.mod.id,
          ids: selectIds
        })
        .then((res) => {
          let blob = new Blob([res.data])
          let contentDisposition = res.headers['content-disposition']
          let patt = new RegExp('filename=([^;]+\\.[^\\.;]+);*')
          let result = patt.exec(contentDisposition)
          let thename = decodeURI(result[1]) //使用decodeURI对名字进行解码
          let downloadElement = document.createElement('a')
          let href = window.URL.createObjectURL(blob) //创建下载的链接
          downloadElement.style.display = 'none'
          downloadElement.href = href
          downloadElement.download = thename //下载后文件名
          document.body.appendChild(downloadElement)
          downloadElement.click() //点击下载
          document.body.removeChild(downloadElement) //下载完成移除元素
          window.URL.revokeObjectURL(href) //释放掉blob对象
        })
    })
    .catch((e) => {})
}
//获取数据
const getList = () => {
  modData.list.length = 0
  proxy.$http
    .get('/listInfo/getList', {
      modid: prop.mod.id,
      isremove: modData.isremove ? 1 : 0,
      page: modData.curpage,
      keyword: keyword.value
    })
    .then((res) => {
      if (res.code == 1) {
        modData.removenum = res.data.removeNum
        modData.curpage = res.data.list.current_page
        modData.totalPage = res.data.list.last_page
        modData.limit = res.data.list.per_page
        res.data.list.data.map((item) => {
          modData.list.push(item)
        })
      }
    })
}
//页面加载后
onMounted(async () => {
  getList()
})
</script>
