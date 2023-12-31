<!--
 * @Author: 一品网络技术有限公司
 * @Date: 2022-09-26 16:22:44
 * @LastEditTime: 2022-09-26 22:10:48
 * @FilePath: \ypcmsvue3\src\pages\permissions\admin\view.vue
 * @Description:
 * 联系QQ:58055648
 * Copyright (c) 2022 by 东海县一品网络技术有限公司, All Rights Reserved.
-->
<template>
  <yplayout>
    <template #header>
      <i class="ri-2x text-gray-500 ml-2 ri-survey-line"></i>
      <div class="text-xl px-3">个人中心</div>
    </template>
    <template #list>
      <div class="grid grid-cols-2 gap-5">
        <div>
          <component :is='componentId' :r="r" @edit="edit" v-if="isload"></component>
        </div>
      <div>
      </div>


      </div>
    </template>
  </yplayout>
</template>
<script setup>
import store from '@/store'
import { onMounted, ref,reactive,shallowRef } from 'vue'
import { getData } from '@/api/data'
import Profile from './profile.vue'
import EditProfile from './editProfile.vue'
const isload=ref(false)
const r = ref([])
const adminId=store.getters.userId
const fromParam=reactive({})
const componentId=shallowRef(Profile)
const edit=(t)=>{
  if(t=='edit'){
    componentId.value=EditProfile
  }else{
    componentId.value=Profile
    getUser()
  }
  
}

const getUser=async()=>{
  const resp = await getData('/admin/getadmin',{ id: adminId })
  if (resp.code == 1) {
    r.value = resp.data
    Object.keys(resp.data).map((k)=>{
      fromParam[k]=resp.data[k]
    })
  }


}


onMounted(() => {
  getUser()
  isload.value=true
})
</script>
