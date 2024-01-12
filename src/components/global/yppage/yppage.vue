<!--
 * @Author: 一品网络技术有限公司
 * @Date: 2022-08-08 10:08:03
 * @LastEditTime: 2022-10-26 21:04:43
 * @FilePath: \vue3\src\components\global\yppage\yppage.vue
 * @Description:
 pageData{
  totalRecords:0,//总记录数
  pageCount:0,//总页数
  currentPage:0//当前页
 }
 * 联系QQ:58055648
 * Copyright (c) 2022 by 东海县一品网络技术有限公司, All Rights Reserved.
-->
<template>
  <div class="pages" v-if="isLoad">
    <div>总数：{{ pageData.totalRecords }}，共<span class="px-1">{{pageData.pageCount}}</span>页</div>
    <div @click="pageData.currentPage>1?topage(1):''">首页</div>
    <div @click="pageData.currentPage-1>=1?topage(pageData.currentPage-1):''">上一页</div>
    
    <template v-for="(i,k) in pagearea" :key="k">
      <div :class="{'current':pageData.currentPage==i}" @click="currentPage==i?'':topage(i)">{{i}}</div>
    </template>

    <div @click="pageData.currentPage+1<=pageData.pageCount?topage(pageData.currentPage+1):''">下一页</div>
    <div @click="pageData.currentPage<pageData.pageCount?topage(pageData.pageCount):''">尾页</div>
  </div>
</template>
<script setup>
  import { ref,reactive,onMounted,watch } from 'vue';
  const props = defineProps({
    pageData: {
      type: Object
    }
  })
  const emit = defineEmits(['topage'])
  const isLoad=ref(false)
  const pagearea=reactive([])
  const pageno=ref(0)

  const topage=(i)=>{
    emit('topage',i)
    resetPageArea()
  }

  watch(props.pageData,(n)=>{
    resetPageArea()
  })

  const resetPageArea=()=>{
    pagearea.length=0
    if(props.pageData.currentPage>3&&props.pageData.currentPage+3<props.pageData.pageCount){
      for(let i=-3;i<=3;i++){
        pagearea.push(props.pageData.currentPage+i)
      }
    }else if(props.pageData.currentPage+3>=props.pageData.pageCount&&props.pageData.pageCount>6){
      for(let i=7;i>=0;i--){
        pagearea.push(props.pageData.pageCount-i)
      }
    }else{
      for(var i=1;i<=7;i++){
        let no=i+pageno.value
        if(no<=props.pageData.pageCount){
          pagearea.push(no)
        }
      }
    }
  }
  onMounted(() => {
    resetPageArea()
    isLoad.value=true
  })
</script>