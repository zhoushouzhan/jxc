<!--
 * @Author: 一品网络技术有限公司
 * @Date: 2022-08-06 08:31:02
 * @LastEditTime: 2022-10-26 21:07:47
 * @FilePath: \vue3\src\pages\files\index.vue
 * @Description:
 * 联系QQ:58055648
 * Copyright (c) 2022 by 东海县一品网络技术有限公司, All Rights Reserved.
-->
<template>
  <div class="bg-white m-2" v-if="isLoad">
    <div class="flex space-x-2 p-2 border-b items-center">
      <div>
        <ypupload ref="uploader">
          <button class="rounded-sm bg-gray-600 flex items-center py-1.5 px-3 text-white text-xs hover:bg-red-700" id="ypupload">
            <i class="ri-upload-cloud-line ri-lg pr-1"></i>选择上传
          </button>
        </ypupload>
      </div>

      <div class="flex-1 md:flex-none">
        <button class="rounded-sm bg-gray-600 flex items-center py-1.5 px-3 text-white text-xs hover:bg-red-700" @click="destory">
          <i class="ri-delete-bin-6-line ri-lg pr-1"></i>删除
        </button>
      </div>
      <div class="hidden md:block">
        <ypinput v-model="keywords" placeholder="关键词"></ypinput>
      </div>
      <div>
        <button class="rounded-sm bg-gray-600 flex items-center py-2 px-2 text-white text-xs hover:bg-red-700" @click="search">
          <i class="ri-search-line ri-lg"></i>
        </button>
      </div>
      <div class="flex-1"></div>
      <div>
        <button class="rounded-sm bg-red-600 flex items-center py-1.5 px-3 text-white text-xs hover:bg-red-700" @click="clearfiles">
          删除无效附件
        </button>
      </div>
      <div class="flex items-center text-sm">
        <div class="bg-gray-500 border border-gray-500  py-1 px-2 text-white">总量</div>
        <div class="border border-gray-500 py-1 px-3">{{pageData.totalRecords}}</div>
      </div>
    </div>
    <div class="flex flex-row">
      <div class="w-20 md:w-40 min-h-[500px] border-r text-center text-xs md:text-sm  transition duration-150 hidden">
        <div class="py-1 border-b bg-gray-600 text-white">文件</div>
        <div class="py-1 border-b">图片</div>
        <div class="py-1 border-b">文本</div>
        <div class="py-1 border-b">其他</div>
      </div>
      <div class="flex-1 p-2">
        <div class="grid grid-cols-10 gap-1 mb-3" v-if="readyList.length">
          <template v-for="(item,index) in readyList" :key="index">
            <div class="w-32 h-32 overflow-hidden border relative group flex items-center" :class="item.status==1?'border-gray-500':'border-red-500'">
              <img :src="item.src" :title="item.name" v-if="item.type.indexOf('image')>=0">
              <div class="absolute top-0 left-1/2 -translate-x-1/2 text-pink-800" v-else-if="item.type.indexOf('zip')>=0">
                <i class="ri-folder-zip-line ri-2x"></i>
              </div>
              <div class="absolute top-0 left-1/2 -translate-x-1/2 text-blue-700" v-else-if="item.type.indexOf('word')>=0">
                <i class="ri-file-word-2-line ri-2x"></i>
              </div>
              <div class="absolute top-0 left-1/2 -translate-x-1/2 text-green-700" v-else-if="item.type.indexOf('sheet')>=0">
                <i class="ri-file-excel-2-line ri-2x"></i>
              </div>
              <div class="absolute top-0 left-1/2 -translate-x-1/2 text-gray-600" v-else-if="item.type.indexOf('text/plain')>=0">
                <i class="ri-article-line ri-2x"></i>
              </div>
              <div class="absolute top-0 left-1/2 -translate-x-1/2 text-red-600" v-else-if="item.type.indexOf('pdf')>=0">
                <i class="ri-file-pdf-line ri-2x"></i>
              </div>
              <div class="absolute top-0 left-1/2 -translate-x-1/2 text-purple-600" v-else-if="item.type.indexOf('audio')>=0">
                <i class="ri-music-2-line ri-2x"></i>
              </div>
              <div class="absolute top-0 left-1/2 -translate-x-1/2 text-indigo-700" v-else-if="item.type.indexOf('video')>=0">
                <i class="ri-video-line ri-2x"></i>
              </div>
              <div class="absolute top-0 left-1/2 -translate-x-1/2 text-pink-500" v-else>
                <i class="ri-file-line ri-2x"></i>
              </div>

              <div class="transition transform duration-300 text-xs truncate w-32 absolute bottom-0 text-center bg-white bg-opacity-80 py-1">
                {{item.name}}
              </div>
              <div class="w-5 h-5 absolute right-1 top-1 text-red-500 rounded-full bg-white flex justify-center items-center z-10" @click="uploader.removeFile(item.id)" v-if="item.status==0">
                <i class="ri-close-circle-fill ri-lg"></i>
              </div>
              <div class="w-1/3 h-1/3 bg-black text-white flex items-center justify-center rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" v-if="item.status<2">
                {{item.progress}}%</div>

            </div>
          </template>

        </div>
        <div class="mb-3" v-if="readyList.length">
          <button class="yp-button yp-button-red rounded-sm" @click="onUpload">开始上传</button>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-10 gap-1">
          <div class="w-28 md:w-32 h-28 md:h-32 flex items-center justify-center hover:bg-blue-500 hover:text-white transition duration-150 relative overflow-hidden" v-for="(item,index) in dataList"
            :key="index" :class="selectIds.indexOf(item.id)>=0?'file_selected':'border'" @click="toggle(item.id)">

            <img :src="item.filepath">
            <div class="-right-[36px] -bottom-[5px] absolute bg-blue-600 text-white w-[100px] h-[40px] flex items-center justify-center -rotate-45 z-40" v-show="selectIds.indexOf(item.id)>=0">
              <i class="ri-check-line ri-lg rotate-45"></i>
            </div>
          </div>
        </div>
        <div class="mt-6" v-show="pageData.pageCount>1">
          <yppage @topage="topage" :pageData="pageData" />
        </div>
        <div class="mb-3 text-center py-2 border-t mt-2" v-if="selectIds.length&&selnum">
          <button class="yp-button rounded-sm" @click="useFiles">确定</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { getData, postData, alter, confirms } from '@/api/data'
import { ref, provide, reactive, onMounted } from 'vue'

const props = defineProps({
  selnum: {
    default: 0
  },
  sids:{
    default:[]
  },
  isopen: {
    default: 0
  }
})
const emits = defineEmits(['useFiles'])
const isLoad=ref(false)
//分页
const  pageData=reactive({
  totalRecords:0,//总记录数
  pageCount:0,//总页数
  currentPage:1//当前页
 });
 const topage = (page) => {
  pageData.currentPage=page
  getDataList()
}

//选中
const keywords = ref('')
const selectIds = reactive([])
const useFiles = () => {
  let arr = dataList.filter((vol, key) => {
    if (selectIds.indexOf(vol.id) >= 0) {
      return true
    }
  })
  emits('useFiles', arr)
}
const toggle = (i) => {
  if (selectIds.indexOf(i) >= 0) {
    selectIds.splice(selectIds.indexOf(i), 1)
  } else {
    if (props.selnum == 0 || selectIds.length < props.selnum) {
      selectIds.push(i)
    } else {
      alter({ type: 'alter-error', text: '超出大最值' })
    }
  }
}
const uploader = ref()
const onUpload = () => {
  uploader.value.onupload()
  
}

const readyList = reactive([])
provide('uploadHandle', {
  readyList: readyList,
  addFile: (obj) => {
    readyList.push(obj)
  },
  removeFile: (id) => {
    readyList.filter((val, index) => {
      if (val.id == id) {
        readyList.splice(index, 1)
      }
    })
  },
  reload: () => {
    getDataList()
  }
})
const dataList = reactive([])

const search = () => {
  if (keywords.value == '') {
    alter({ type: 'alter-error', text: '关键词不能为空!' })
  } else {
    getDataList()
  }
}

const getDataList = async () => {
  readyList.length = 0
  dataList.length = 0
  const res = await getData('/files', {
    page: pageData.currentPage,
    keyword: keywords.value
  })
  if (res.code == 1) {
    pageData.totalRecords = res.data.total
    pageData.pageCount = res.data.last_page

    res.data.data.map((item, index) => {
      dataList.push(item)
    })
  }
}
//删除
const destory = async () => {
  confirms({ text: '确认删除吗？' })
    .then(async () => {
      const res = await postData('/files/delete', { ids: selectIds })
      if (res.code) {
        alter({ type: 'alter-success', text: res.msg })
        getDataList()
      } else {
        alter({ type: 'alter-error', text: res.msg })
      }
    })
    .catch((e) => {})
}
//清理垃圾
const clearfiles=()=>{
  confirms({ text: '确认要清理吗？' })
    .then(async () => {
      const res = await postData('/files/clearfiles')
      if (res.code) {
        alter({ type: 'alter-success', text: res.msg })
        getDataList()
      } else {
        alter({ type: 'alter-error', text: res.msg })
      }
    })
    .catch((e) => {})
}
onMounted(async() => {
  await getDataList()
  if(props.sids){
    Object.keys(props.sids).map((k)=>{
      selectIds.push(props.sids[k])
    })
  }
  isLoad.value=true
})
</script>