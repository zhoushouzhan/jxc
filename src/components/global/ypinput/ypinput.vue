<!--
 * @Author: 一品网络技术有限公司
 * @Date: 2022-08-27 19:55:50
 * @LastEditTime: 2024-01-02 16:12:43
 * @FilePath: \vue3\src\components\global\ypinput\ypinput.vue
 * @Description:
 * 联系QQ:58055648
 * Copyright (c) 2022 by 东海县一品网络技术有限公司, All Rights Reserved.
-->
<template>
    <div>
        <div class="flex items-center bg-white rounded px-2 border text-sm duration-200 space-x-1 relative" :class="{'border-lan-200':input.status==1,'border-hong-300':errormsg}">
            <slot name="prefix"></slot>
            <input :type="type" class="h-8 outline-none text-hui-300 placeholder:text-hui-100 placeholder:font-light flex-1" v-model="inputValue" @input="updateVal" @blur="inputBlur" :placeholder="placeholder" @focus="input.status=1">
            <slot name="suffix">
                <div v-if="maxlength&&type!='number'" class="text-hui-100 text-xs">
                    <span>{{ inputValue.length }}</span>
                    <span>/</span>
                    <span>{{ maxlength }}</span>
                </div>
            </slot>
            <div class="absolute right-0" v-if="modelValue&&!maxlength">
                <i class="ri-close-circle-fill duration-300 mr-2 hover:text-hong-300" @click.stop="removeId"></i>
            </div>
        </div>
        <div class="text-xs py-1 text-hong-300 h-5" v-if="errormsg">{{ errormsg }}</div>
    </div>
</template>
<script setup>
    import {ref,reactive,watch} from "vue"
    const props = defineProps({
        modelValue: {
            default: ''
        },
        placeholder: {
            type: String
        },
        type: {
            type: String,
            default: 'text'
        },
        maxlength:{
            default:0
        },
        errormsg:{
            default:''
        },
        max:{
            default:null
        },
        min:{
            default:null
        }
    })
    const emit = defineEmits(['update:modelValue'])
    watch(()=>props.modelValue,(n,o)=>inputValue.value=n)
    const input=reactive({
        status:0
    })
    const inputValue=ref(props.modelValue)
    const updateVal = (e) => {
        const value = e.target.value
        const maxlength=props.maxlength

        if(maxlength&&value.length>maxlength){
            inputValue.value=inputValue.value.toString().slice(0,maxlength)
            return false
        }

        emit('update:modelValue', inputValue.value)
    }
    const inputBlur=(e)=>{
        input.status=0
        const value = e.target.value
        const max=parseFloat(props.max)
        const min=parseFloat(props.min)
        if(max&&max<value){
            inputValue.value=max.toString().replace(/,/g,'')
        }
        if(min&&min>value){
            inputValue.value=min.toString().replace(/,/g,'')
        }
        emit('update:modelValue', inputValue.value)
    }
    const removeId=()=>{
        emit('update:modelValue',null)
    }


</script>
