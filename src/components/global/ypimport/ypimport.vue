<!--
 * @Author: 一品网络技术有限公司
 * @Date: 2022-08-06 14:05:19
 * @LastEditTime: 2022-10-14 10:41:07
 * @FilePath: \vue3\src\components\global\ypimport\ypimport.vue
 * @Description:
 * 联系QQ:58055648
 * Copyright (c) 2022 by 东海县一品网络技术有限公司, All Rights Reserved.
-->
<template>
  <div :id="'ypimport'+factory_id" class="bg-pink-400 py-1.5 rounded px-2 text-white cursor-pointer hover:bg-pink-500">
    <slot></slot>
  </div>
</template>
<script setup>
import {alter} from '@/api/data'
import store from '@/store'
import { onMounted } from 'vue'
import plupload from 'plupload'
const props = defineProps({
  url:{
    default:''
  },
  factory_id:{
    default:0
  }
})

const uploader = new plupload.Uploader({
  multi_selection: false,
  headers: {
    Authorization: store.state.User.token,
    //ajax方式传送
    'x-requested-with': 'XMLHttpRequest'
  },
  multipart_params:{
    factory_id:props.factory_id
  }
})
const upinit = () => {
  uploader.setOption('url',import.meta.env.VITE_BASEURL+props.url)
  uploader.setOption('browse_button', 'ypimport'+props.factory_id)
  uploader.setOption('filters', {
    mime_types: [
      { title: 'Files', extensions: 'xlsx' }
    ],
    max_file_size: store.state.Sys.sysinfo.uploadsize + 'mb', //最大上传
    prevent_duplicates: true //不允许选取重复文件
  })
  uploader.init()

  uploader.bind('FileUploaded',async (uploader, file, res) => {
    let r = JSON.parse(res.response)
    if(r.code==0){
     alter({ type: 'alter-error', text: r.msg })
    }
    setTimeout(()=>{
      window.location.reload()
    },3000)
  })
  uploader.bind('FilesAdded', (uploader, files) => {
    store.state.isLoading = true
    uploader.start()
  })

  uploader.bind('Error',async(up,arg)=>{
    await alter({ type: 'alter-error', text: arg.message })
    //window.location.reload()
  })
}
//文件上传
onMounted(() => {
  upinit()
})
</script>
