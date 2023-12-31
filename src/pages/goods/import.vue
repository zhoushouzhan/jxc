<template>
    <yplayout v-if="isLoad">
        <template #header>
            <i class="ri-2x text-gray-500 ml-2 ri-import-line"></i>
            <div class="text-xl px-3">选择厂商导入商品</div>
            <div class="flex-1 flex flex-row-reverse space-x-reverse space-x-2"></div>
            <button class="yp-button yp-button-sm yp-button-orange rounded-sm" @click="goback">返回</button>
        </template>
        <template #list>
            <div class=" bg-white text-sm">
                <div class="grid grid-cols-6 gap-3">
                    <ypimport url="goods/importxlsx" :factory_id="item.id" v-for="(item,index) in factoryList" :key="index">
                    <i class="ri-download-2-fill ri-lg pr-1"></i>
                    {{ item.title }}
                    </ypimport>
                </div>
            </div>
        </template>
    </yplayout>
</template>
<script setup>
    import {getData} from "@/api/data"
    import {ref,reactive,onMounted} from "vue"
    const props=defineProps({
        id:{
            default:0
        },
        t:{
            default:0
        }
    })
    const emits=defineEmits(['jumpTo'])
    const factoryList=reactive([])
    const isLoad=ref(false)
    const goback=()=>{
        emits('jumpTo',{to:'list'})
    }
    const get_factory=async()=>{
        const resp= await getData('/factory/index')
        if(resp.code==1){
            
            for(let key in resp.data.data){
                factoryList.push(resp.data.data[key])
            }
        }
    }

    onMounted(async() => {
        await get_factory()
        isLoad.value=true
    })
</script>