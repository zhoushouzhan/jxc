<template>
  <div class="text-sm text-gray-800" v-if="isload">
    <div class="bg-white p-2 space-y-3">

      <div class="flex items-center">
        <div class="w-24 text-right pr-5">账号</div>
        <div class="flex-1">
          {{ r.username }}
        </div>
      </div>
      <div class="flex items-center">
        <div class="w-24 text-right pr-5">姓名</div>
        <div class="flex-1">
          {{ r.truename }}
        </div>
      </div>

      <div class="flex items-center">
        <div class="w-24 text-right pr-5">手机</div>
        <div class="flex-1">
          <ypinput v-model="formData.mobile" type="tel" placeholder="最多32位字符"></ypinput>
        </div>
      </div>
      <div class="flex items-center">
        <div class="w-24 text-right pr-5">密码</div>
        <div class="flex-1">
          <ypinput v-model="formData.password" type="password" :placeholder="passplaceholder"></ypinput>
        </div>
      </div>
      <div class="flex items-center">
        <div class="w-24 text-right pr-5">重复密码</div>
        <div class="flex-1">
          <ypinput v-model="formData.confirm_password" type="password" :placeholder="passplaceholder"></ypinput>
        </div>
      </div>


    </div>
    <div class="flex justify-center py-3 space-x-2">
      <button class="yp-button yp-button-orange rounded" type="button" @click="save">
        <i class="ri-save-line ri-lg pr-1"></i>
        保存
      </button>
      <button class="yp-button yp-button-gray rounded" type="button" @click="emits('edit','1')">
        <i class="ri-arrow-go-back-fill ri-lg pr-1"></i>
        返回
      </button>
    </div>
  </div>


</template>
<script setup>
    import {getData,postData,alter } from '@/api/data'
    import {ref,reactive,onMounted} from "vue"
    const props=defineProps({
        r:Object
    })
    const emits=defineEmits(['edit'])
    const isload=ref(false)
    const formData=reactive({
        id:props.r.id,
        mobile:props.r.mobile,
        password:'',
        confirm_password:''
    })
    const passplaceholder = ref('6-18位英文字符')


    const save = async () => {
        const resp = await postData('/admin/update',formData)
        if (resp.code) {
            alter({ type: 'alter-success', text: resp.msg })
            emits('edit','save')
        }
    }




    onMounted(() => {
     
        isload.value=true
    })
</script>