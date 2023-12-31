<!--
 * @Author: 一品网络技术有限公司
 * @Date: 2022-07-01 08:36:59
 * @LastEditTime: 2022-10-06 16:32:21
 * @FilePath: \ypcmsvue3\src\pages\rule\form.vue
 * @Description:
 * 联系QQ:58055648
 * Copyright (c) 2022 by 东海县一品网络技术有限公司, All Rights Reserved.
-->

<template>
  <div class="text-sm text-gray-800" v-if="isload">
    <div class="bg-white select-none p-2 space-y-3">
      <div class="flex items-center">
        <div class="w-24 text-right pr-5">上级</div>
        <div class="flex-1">
          <yptree :itemList="ruleList" v-model="formData.pid"></yptree>
        </div>
      </div>
      <div class="flex items-center">
        <div class="w-24 text-right pr-5">名称</div>
        <div class="flex-1">
          <ypinput v-model="formData.title" placeholder="如:系统管理"></ypinput>
        </div>
      </div>
      <div class="flex items-center">
        <div class="w-24 text-right pr-5">类型</div>
        <div class="flex-1">
          <ypselect :itemList="typeitem" v-model="formData.type"></ypselect>
        </div>
      </div>
      <div class="flex items-center" v-show="formData.type==1">
        <div class="w-24 text-right pr-5">图标</div>
        <div class="flex-1">
          <ypicon v-model="formData.icon" placeholder="如:ri-home-smile-2-line"></ypicon>
        </div>
      </div>
      <div class="flex items-center" v-show="formData.type==2">
        <div class="w-24 text-right pr-5">地址</div>
        <div class="flex-1">
          <ypinput v-model="formData.path" placeholder="如:/System"></ypinput>
        </div>
      </div>

      <div class="flex items-center" v-show="formData.type==2">
        <div class="w-24 text-right pr-5">绑定模型</div>
        <div class="flex-1">
          <ypselect :itemList="modList" v-model="formData.mod_id"></ypselect>
        </div>
      </div>

      <div class="flex items-center">
        <div class="w-24 text-right pr-5">排序</div>
        <div class="flex-1">
          <ypinput v-model="formData.sort" placeholder="正序排列"></ypinput>
        </div>
      </div>
      <div class="flex items-center">
        <div class="w-24 text-right pr-5">显示</div>
        <div class="flex-1 flex items-center">
          <ypswitch v-model="formData.status"></ypswitch>
        </div>
      </div>
    </div>

    <div class="flex justify-center py-3 space-x-2">
      <button class="yp-button yp-button-orange rounded" type="button" @click="save">
        <i class="ri-save-line ri-lg pr-1"></i>
        保存
      </button>
      <button class="yp-button yp-button-gray rounded" type="button" @click="reset">
        <i class="ri-format-clear ri-lg pr-1"></i>
        重置
      </button>
    </div>
  </div>

</template>
<script setup>
  import {  getData,  postData,  alter} from '@/api/data'
  import { ref,reactive, onMounted, inject,watch } from 'vue'
  const props = defineProps({ id: Number })
  const isload=ref(false)
  const formData = reactive({
    pid: '0',
    title: '',
    icon: '',
    type: '',
    path: '',
    sort: '',
    status: '',
    mod_id: 0
  })
  const ruleList = reactive([
    {
      id: 0,
      path: '/',
      name: 'top',
      type: 1,
      status: 0,
      sort: 0,
      mod_id: 0,
      title: '顶级节点',
      children: []
    }
  ])
  const typeitem = reactive([
    { value: 1, title: '目录' },
    { value: 2, title: '页面' }
  ])
  const modList = reactive([])
  const save = async () => {
    const resp = await postData('/rule/save', formData)
    if (resp.code) {
      alter({ type: 'alter-success', text: resp.msg })
      setcom.update()
    }
  }
  const reset = () => {
    for (let key in formData) {
      formData[key] = ''
    }
  }
  const setcom = inject('setcom')
  watch(()=>formData.type,(newVal,oldVal)=>{
    if(newVal==1){
      formData.path=''
    }
  })
  onMounted(async () => {
    const resp =await getData('/rule/index')
    if (resp.code) {
      ruleList[0].children = resp.data
    }
    if (props.id) {
      formData.id = props.id
      const resp = await getData('/rule/getrule',{ id: props.id })

      Object.keys(formData).map((key) => {
        formData[key] = resp.data[key]
      })
    }
    const getmod = await getData('/mod/index')
    if (getmod.code == 1) {
      getmod.data.forEach((item) => {
        modList.push({ value: item.id, title: item.alias })
      })
    }
    isload.value=true
  })
</script>
