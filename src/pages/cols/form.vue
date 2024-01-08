<!--
 * @Author: 一品网络技术有限公司
 * @Date: 2022-10-15 11:45:17
 * @LastEditTime: 2022-10-25 12:34:45
 * @FilePath: \vue3\src\pages\cols\form.vue
 * @Description:
 * 联系QQ:58055648
 * Copyright (c) 2022 by 东海县一品网络技术有限公司, All Rights Reserved.
-->
<template>
  <div class=" bg-white text-sm" v-if="isload">
    <div class="flex">
      <div class="space-y-3 p-2 w-1/2">
        <div class="flex items-center">
          <div class="w-24 text-right pr-5">名称</div>
          <div class="flex-1">
            <ypinput v-model="formData.alias" placeholder="请输入名称,字段标识"></ypinput>
          </div>
        </div>
        <div class="flex items-center">
          <div class="w-24 text-right pr-5">字段名</div>
          <div class="flex-1">
            <ypinput v-model="formData.name" placeholder="用于建表,只能英文"></ypinput>
          </div>
        </div>
        <div class="flex items-center">
          <div class="w-24 text-right pr-5">提示</div>
          <div class="flex-1">
            <ypinput v-model="formData.tips" placeholder="提示信息"></ypinput>
          </div>
        </div>
        <div class="flex items-center">
          <div class="w-24 text-right pr-5">字段类型</div>
          <div class="flex-1" itemid="type">
            <ypselect v-model="formData.type" :itemList="typeOptions"></ypselect>
          </div>
        </div>
        <div class="flex items-center">
          <div class="w-24 text-right pr-5">字段长度</div>
          <div class="flex-1">
            <ypinput v-model="formData.length" placeholder="请输入字段长度"></ypinput>
          </div>
        </div>
        <div class="flex items-center">
          <div class="w-24 text-right pr-5 pt-2">默认值</div>
          <div class="flex-1">
            <ypinput v-model="formData.defvalue" placeholder="请输入默认值"></ypinput>
          </div>
        </div>
        <div class="flex items-center">
          <div class="w-24 text-right pr-5 pt-2">表单元素</div>
          <div class="flex-1">
            <ypselect :itemList="formItem" v-model="formData.formitem"></ypselect>
          </div>
        </div>
        <div class="flex items-center">
          <div class="w-24 text-right pr-5">字段参数</div>
          <div class="flex-1">
            <ypinput v-model="formData.extends" placeholder="功能型字段需要填写参数"></ypinput>
          </div>
        </div>
        <div class="flex items-center">
          <div class="w-24 text-right pr-5">列宽</div>
          <div class="flex-1">
            <ypinput v-model="formData.colwidth" placeholder="请输入列宽"></ypinput>
          </div>
        </div>
        <div class="flex items-center">
          <div class="w-24 text-right pr-5">前缀</div>
          <div class="flex-1">
            <ypinput v-model="formData.prefix" placeholder="请输入前缀"></ypinput>
          </div>
        </div>
        <div class="flex items-center">
          <div class="w-24 text-right pr-5">后缀</div>
          <div class="flex-1">
            <ypinput v-model="formData.suffix" placeholder="请输入后缀"></ypinput>
          </div>
        </div>
        <div class="flex items-center">
          <div class="w-24 text-right pr-5">排序</div>
          <div class="flex-1" id="sort">
            <ypinput v-model="formData.sort" placeholder="请输入排序"></ypinput>
          </div>
        </div>
      </div>
      <div class="flex-1" v-if="showPreview">
        <div class="flex items-center justify-center font-bold">演示</div>
        <div class="flex h-full flex-col">
          <div>
            <cols :col="formData" v-model="colvalue" />
          </div>
          <div>
            <div class="border" :style="formData.colwidth?'width:'+formData.colwidth+'px':''">
              <div class="p-2 font-bold bg-gray-100">{{ formData.alias }}</div>
              <div class="p-2 border-t">
                <div class="nowrapstr">
                  {{ colvalue }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex justify-center py-2 space-x-2 mt-5">
      <button class="yp-button yp-button-orange rounded" type="button" @click="save">
        <i class="ri-save-line ri-lg pr-1"></i>
        提交
      </button>
      <button class="yp-button yp-button-gray rounded" type="button" @click="emits('close')">
        <i class="ri-format-clear ri-lg pr-1"></i>
        返回
      </button>
    </div>
  </div>
</template>
<script setup>
import { getData, postData, alter } from '@/api/data'
import store from '@/store'
import { ref, reactive,computed, onMounted } from 'vue'
const isload=ref(false)
const formData = reactive({
  id: '',
  alias: '',
  name: '',
  type: '',
  length: '',
  defvalue: '',
  formitem: '',
  extends: '',
  colwidth: '',
  prefix: '',
  suffix: '',
  sort: '',
  tips: ''
})
const props = defineProps({ id: { default: 0 } })
const emits = defineEmits(['getList','close'])
const colvalue=ref('')//演示字段值
const typeOptions = store.getters.colType
const formItem = reactive([])
const save = async () => {
  let path = ''
  if (props.id > 0) {
    path = '/cols/update'
  } else {
    path = '/cols/save'
  }
  const resp = await postData(path, formData)
  if (resp.code == 1) {
    alter({ type: 'alter-success', text: resp.msg })
    emits('getList')
  }
}
const showPreview=computed(()=>{
  let show=true
  if(formData.alias==''){
    show=false    
  }
  if(formData.formitem==''||formData.name==''){
    show=false    
  }
  if(formData.formitem=='none'||formData.formitem=='hidden'){
    show=false    
  }
  return show
})
onMounted(async () => {
  formItem.length = 0
  store.getters.formItem.forEach((item) => {
    formItem.push({ value: item.value, title: item.name })
  })
  if (props.id) {
    const resp = await getData('/cols/getItem', { id: props.id })
    Object.keys(formData).map((k) => {
      formData[k] = resp.data[k]
    })
  }
  isload.value=true
})
</script>
