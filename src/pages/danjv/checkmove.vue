<template>
    <yplayout v-if="isLoad">
        <template #header>
            <i class="ri-2x text-gray-500 ml-2 ri-checkbox-multiple-fill"></i>
            <div class="text-xl px-3">调拔单核验单</div>
            <div class="flex-1 flex flex-row-reverse space-x-reverse space-x-2"></div>
            <button class="btn btn-chen" @click="goback">返回</button>
        </template>
        <template #list>
            <div class="flex space-x-1">
                
                <table class="yp-table">
                    <thead>
                        <tr>
                            <th class="text-center w-20">序号</th>
                            <th class="text-center w-20">图片</th>
                            <th>名称</th>
                            <th class="w-20">数量</th>
                            <th>备注</th>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-for="(item,index) in formData.bill">
                            <tr class=" hover:bg-gray-100">
                                <td class="text-center">{{ index+1 }}</td>
                                <td>
                                    <img :src="item.thumbFile" class="w-20 h-20 object-cover" @click="openimg(item.thumbFile)">
                                </td>
                                <td>
                                    <div>{{ item.title }}</div>
                                    <div class="text-red-600 font-bold">{{ item.code }}</div>
                                </td>
                                <td>{{ item.numbers }}</td>
                                <td>{{ item.intro }}</td>
                            </tr>
                        </template>
                    </tbody>
                </table>
               

            </div>
            <div class="flex justify-center py-2 space-x-2 mt-3">
                <button class="btn btn-hong" type="button" v-if="formData.bill.length" @click="save">
                    提交
                </button>
            </div>
        </template>
    </yplayout>
</template>
<script setup>
    import {postData,getData,alter,confirms} from "@/api/data"
    import {ref,reactive,onMounted} from "vue"
    const props=defineProps({
        id:{
            default:0
        }
    })

    const emits=defineEmits(['jumpCom'])
    const isLoad=ref(false)

    const formData=reactive({
        godown_id:0,
        type:1,
        bill:[]
    })
    

    const openimg=(src)=>{
        window.open(src)
    }
    const goback=()=>{
        emits('jumpCom',{to:'list'})
    }

    const read=async(id)=>{
        const resp = await getData('kucundan/read',{id:id})
        if(resp.code==1){
            formData.id=id
            formData.enabled=1
            formData.godown_id=resp.data.godown_id
            formData.type=resp.data.type
            formData.bill=resp.data.bill
        }
    }
    const save=async()=>{

        confirms({ text: '确定入库吗？' })
        .then(async () => {


            const resp= await postData('kucundan/save',formData)
            if(resp.code==1){
                alter({ type: 'alter-success', text: resp.msg })
                emits('jumpCom',{to:'list'})
            }

        })
        .catch(()=>{
            console.log('cancel')
        })



    }

    onMounted(async()=>{

        if(props.id){
            await read(props.id)
        }

        isLoad.value=true
    })
</script>