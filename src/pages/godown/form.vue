<template>
    <yplayout v-if="isLoad">
        <template #header>
            <i class="ri-2x text-gray-500 ml-2 ri-play-list-add-line"></i>
            <div class="text-xl px-3">增加仓库</div>
            <div class="flex-1 flex flex-row-reverse space-x-reverse space-x-2"></div>
            <button class="yp-button yp-button-sm yp-button-orange rounded-sm" @click="goback">返回</button>
        </template>
        <template #list>
            <div class=" bg-white text-sm">
                <div class="space-y-3 p-2">
                    <div class="flex items-center">
                        <div class="w-24 text-right pr-5">名称</div>
                        <div class="flex-1">
                            <ypinput v-model="formData.title" placeholder="请输入名称"></ypinput>
                        </div>
                    </div>
                    <div class="flex items-center">
                        <div class="w-24 text-right pr-5">描述</div>
                        <div class="flex-1">
                            <yptextarea v-model="formData.intro" placeholder="请输入描述"></yptextarea>
                        </div>
                    </div>
                    <div class="flex items-center">
                        <div class="w-24 text-right pr-5">仓管员</div>
                        <div class="flex-1 flex space-x-2">
                            <template v-for="(item,index) in adminlist" :key="index">
                                <ypcheckbox :title="item.truename" :value="item.id" v-model="formData.admin"></ypcheckbox>
                            </template>
                        </div>
                    </div>
                </div>
                <div class="flex justify-center py-2 space-x-2 mt-5">
                    <button class="yp-button yp-button-orange rounded" type="button" @click="save">
                        <i class="ri-save-line ri-lg pr-1"></i>
                        提交
                    </button>
                    <button class="yp-button yp-button-gray rounded" type="button" @click="goback">
                        <i class="ri-format-clear ri-lg pr-1"></i>
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
    const adminlist = reactive([])
    const formData=reactive({admin:[]})
    const save=async()=>{
        const resp=await postData("godown/save",formData)
        if(resp.code==1){
            alter({type:'alter-success',text:resp.msg})
            setTimeout(()=>{
                emits('jumpCom',{to:'list'})
            },1000)
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
        let resp=await getData('godown/read',{id:id})
        if(resp.code==1){
            Object.keys(resp.data).map((k)=>{
                formData[k]=resp.data[k]
            })
        }
        isLoad.value=true
    }


    onMounted(async() => {

        const resp = await getData('roles/getroles',{id:3})
        if(resp.code==1){
            Object.keys(resp.data.admin).map((k)=>{
                adminlist[k]=resp.data.admin[k]
            })
        }


        if(props.id){
            read(props.id)
        }else{
            isLoad.value=true
        }
    })
</script>