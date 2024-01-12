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
  <div class="bg-white m-2 p-2" v-if="isLoad">
    <div class="flex space-x-2 p-2 border-b items-center">
      <div>
        <ypupload ref="uploader">
          <button class="rounded-sm bg-gray-600 flex items-center py-1.5 px-3 text-white text-xs hover:bg-red-700" id="ypupload">
            <i class="ri-upload-2-line ri-lg pr-1"></i>本地上传
          </button>
        </ypupload>
      </div>
      <div>
        <button class="rounded-sm bg-gray-600 flex items-center py-1.5 px-3 text-white text-xs hover:bg-red-700" @click="openRemoteBox=true">
          <i class="ri-download-cloud-line ri-lg pr-1"></i>远程保存
        </button>
      </div>
      <div class="flex-1 md:flex-none">
        <button class="rounded-sm bg-gray-600 flex items-center py-1.5 px-3 text-white text-xs hover:bg-red-700" @click="destory">
          <i class="ri-delete-bin-6-line ri-lg pr-1"></i>删除选中
        </button>
      </div>
      <div class="flex-1"></div>
      <div>
        <ypselect v-model="searchData.ftype" :itemList="ftype_list" defaultTitle="--请选择类型--"></ypselect>
      </div>


      <div class="hidden md:block">
        <ypinput v-model="searchData.keywords" placeholder="关键词"></ypinput>
      </div>
      <div>
        <button class="rounded-sm bg-gray-600 flex items-center py-2 px-2 text-white text-xs hover:bg-red-700" @click="search">
          <i class="ri-search-line ri-lg"></i>
        </button>
      </div>
    </div>

    <div class="p-2" v-if="readyList.length">
      <div class="grid grid-cols-10 gap-1 mb-3">
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
        <div class="mb-3">
          <button class="yp-button yp-button-red rounded-sm" @click="onUpload">开始上传</button>
        </div>
    </div>
    <div class="flex flex-row  mt-5 bg-gray-50 p-5">
      <div class="flex-1">
        <div class="grid grid-cols-10 gap-2">
          <div v-for="(item,index) in dataList" class="overflow-hidden flex flex-col items-center border border-dashed">

            <div class="flex hover:text-white transition duration-150 relative overflow-hidden"
            :key="index" :class="selectIds.indexOf(item.id)>=0?'file_selected':'border'" @click="toggle(item.id)">
   
            <img :src="item.filepath" class="hover:scale-125 duration-300" v-if="item.ftype.indexOf('image')>=0">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-full fill-slate-500" v-if="item.ftype.indexOf('video')>=0"><path fill="none" d="M0 0h24v24H0z"></path><path d="M2 3.9934C2 3.44476 2.45531 3 2.9918 3H21.0082C21.556 3 22 3.44495 22 3.9934V20.0066C22 20.5552 21.5447 21 21.0082 21H2.9918C2.44405 21 2 20.5551 2 20.0066V3.9934ZM10.6219 8.41459C10.5562 8.37078 10.479 8.34741 10.4 8.34741C10.1791 8.34741 10 8.52649 10 8.74741V15.2526C10 15.3316 10.0234 15.4088 10.0672 15.4745C10.1897 15.6583 10.4381 15.708 10.6219 15.5854L15.5008 12.3328C15.5447 12.3035 15.5824 12.2658 15.6117 12.2219C15.7343 12.0381 15.6846 11.7897 15.5008 11.6672L10.6219 8.41459Z"></path></svg>

              <div class="-right-[36px] -bottom-[5px] absolute bg-blue-600 text-white w-[100px] h-[40px] flex items-center justify-center -rotate-45 z-40" v-show="selectIds.indexOf(item.id)>=0">
                <i class="ri-check-line ri-lg rotate-45"></i>
              </div>
              <div class="absolute left-0 bottom-0 w-10 h-10" v-tooltip.bottom="item.name"></div>
            </div>

            <Infos :item="item"></Infos>
          </div>
        </div>
        <div class="mt-4" v-show="pageData.pageCount>1">
          <yppage @topage="topage" :pageData="pageData" />
        </div>
        <div class="mb-3 text-center py-2 border-t mt-2" v-if="selectIds.length&&selnum">
          <button class="yp-button rounded-sm" @click="useFiles">确定</button>
        </div>
      </div>
    </div>
  </div>

  <teleport to='body' v-if="openRemoteBox">
    <div class=" absolute top-0 left-0 w-full h-full bg-black bg-opacity-80 z-40">
      <div class="absolute bg-white left-1/2 -translate-x-1/2 top-32 w-[750px] h-36 rounded p-3">
        <div>
          <yptextarea v-model="remoteData" placeholder="请输入远程URL"></yptextarea>
        </div>
        <div class="flex justify-center py-2 space-x-2 mt-5">
            <button class="btn btn-lan" type="button" @click="saveRemoteData">
                <i class="ri-save-line ri-lg pr-1"></i>
                提交
            </button>
            <button class="btn btn-hong" type="button" @click="openRemoteBox=false">
                <i class="ri-format-clear ri-lg pr-1"></i>
                取消
            </button>
        </div>
      </div>
    </div>
  </teleport>
  
</template>
<script setup>
import store from "@/store"
import { getData, postData, alter, confirms } from '@/api/data'
import { ref,watch, provide, reactive, onMounted } from 'vue'
import Infos from "./infos.vue"
const props = defineProps({
  selnum: {
    default: 0
  },
  sids:{
    default:[]
  },
  isopen: {
    default: 0
  },
  ftype:'image',
  params:{
    default:[]
  }
})
const emits = defineEmits(['useFiles'])
const isLoad=ref(false)
const upload_params=reactive(props.params)
//获取远程图片
const openRemoteBox=ref(false)
const remoteData=ref('')
const saveRemoteData=async()=>{
  if(remoteData.value==''){
    alter({ type: 'alter-error', text: '请输入远程URL' })
    return
  }
  const resp= await postData("files/downloadFile",{str:remoteData.value,category_id:props.category_id,ypcms_type:props.ypcms_type})
  if(resp.code==1){
    getDataList()
    remoteData.value=''
    openRemoteBox.value=false
  }
}
const category=ref([])
//搜索

const ftype_list=reactive([
  {id:"image",title:"图片"},
  {id:"video",title:"视频"}
])

const searchData=reactive({
  category_id:props.params.category_id||0,
  ypcms_id:props.params.ypcms_id||0,
  page:0,
  ftype:props.ftype,
  keywords:''
})
//监听模型更新
watch(()=>searchData.mod_id,(n,o)=>{
  getDataList()
})
//监听栏目更新
watch(()=>searchData.category_id,(n,o)=>{
  getDataList()
})


//分页
const  pageData=reactive({
  totalRecords:0,//总记录数
  pageCount:0,//总页数
  currentPage:1//当前页
 });
 const topage = (page) => {
  pageData.currentPage=page
  searchData.page=page
  getDataList()
}

//模型数据
const mod_list = reactive([])
const getMod=async ()=>{
  let resp=await getData('mod/index')
  if(resp.code==1){
    mod_list.length=0
    Object.keys(resp.data).map((k)=>{
      mod_list.push({id:resp.data[k].id,title:resp.data[k].alias})
    })
  }
}

//选中
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
//上传
const uploader = ref()
const onUpload = () => {
  //上传前准备好附件归属信息
  store.dispatch("GET_UPLOAD_PARAMS",props.params)
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
  getDataList()
}

const getDataList = async () => {
  readyList.length = 0
  dataList.length = 0
  const res = await getData('/files',searchData)
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

onMounted( async() => {


  if(props.category_id){
    const res= await getData('category/getDetails',{id:props.category_id})
    if(res.code==1){
      category.value=res.data
    }
    
  }
  await getDataList()
  if(props.sids){
      Object.keys(props.sids).map((k)=>{
      selectIds.push(props.sids[k])
    })
  }
  //获取模型数据
  await getMod()
  isLoad.value=true
})
</script>