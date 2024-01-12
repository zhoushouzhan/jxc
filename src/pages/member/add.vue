<template>
  <yplayout v-if="isLoad">
      <template #header>
          <i class="ri-2x text-gray-500 ml-2 ri-user-line"></i>
          <div class="text-xl px-3">增加会员</div>
          <div class="flex-1 flex flex-row-reverse space-x-reverse space-x-2"></div>
          <button class="btn btn-chen" @click="goback">返回</button>
      </template>
      <template #list>
          <div class=" bg-white text-sm">
              <div class="space-y-3 p-2">
                  <div class="flex items-center">
                      <div class="w-24 text-right pr-5">姓名</div>
                      <div class="flex-1">
                          <ypinput v-model="formData.truename" placeholder="请输入名称"></ypinput>
                      </div>
                  </div>
                  <div class="flex items-center">
                      <div class="w-24 text-right pr-5">性别</div>
                      <div class="flex-1 flex space-x-3">
                        <ypradio value="1" v-model="formData.sex" title="男"></ypradio>
                        <ypradio value="2" v-model="formData.sex" title="女"></ypradio>
                        <ypradio value="3" v-model="formData.sex" title="保密"></ypradio>
                      </div>
                  </div>
                  <div class="flex items-center">
                      <div class="w-24 text-right pr-5">手机号</div>
                      <div class="flex-1">
                          <ypinput v-model="formData.mobile" placeholder="请输入手机号"></ypinput>
                      </div>
                  </div>
                  <div class="flex items-center">
                      <div class="w-24 text-right pr-5">来源</div>
                      <div class="flex-1">
                          <ypinput v-model="formData.source" placeholder="客户从哪个渠道来的"></ypinput>
                      </div>
                  </div>

                  <div class="flex items-center">
                      <div class="w-24 text-right pr-5">描述</div>
                      <div class="flex-1">
                          <yptextarea v-model="formData.intro" placeholder="请输入描述"></yptextarea>
                      </div>
                  </div>

              </div>
              <div class="flex justify-center py-2 space-x-2 mt-5">
                  <button class="btn btn-hong" type="button" @click="save">
                      提交
                  </button>
                  <button class="btn" type="button" @click="goback">
                      返回
                  </button>
              </div>
          </div>

      </template>
  </yplayout>
</template>
<script setup>
  import {postData,getData,alter} from "@/api/data"
  import {ref,reactive,onMounted} from "vue"
  const props=defineProps({
      id:{
          default:0
      }
  })
  const emits=defineEmits(['jumpCom'])

  const isLoad=ref(false)
  const formData=reactive({sex:0})
  const save=async()=>{
      const resp=await postData("member/save",formData)
      if(resp.code==1){
          alter({type:'alter-success',text:resp.msg})
          emits('jumpCom',{to:'list'})
      }
  }
  const goback=()=>{
      emits('jumpCom',{to:'list'})
  }


  const read=async(id)=>{
      if(!id){
          isLoad.value=true
          return
      }
      let resp=await getData('member/read',{id:id})
      if(resp.code==1){
          Object.keys(resp.data).map((k)=>{
              formData[k]=resp.data[k]
          })
      }
      isLoad.value=true
  }


  onMounted(async() => {



      if(props.id){
          read(props.id)
      }else{
          isLoad.value=true
      }
  })
</script>