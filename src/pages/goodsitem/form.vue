<template>
    <yplayout v-if="isLoad">
        <template #header="props">
            <div class="flex items-center">
                <i class="ri-2x text-gray-500 ml-2 ri-product-hunt-line" ></i>
                <div class="text-xl px-2">编辑仓库商品</div>
                <div class="text-gray-400"></div>
            </div>
            <div class="flex-1"></div>
            <div>
                <button class="yp-button yp-button-sm yp-button-orange rounded-sm" @click="goback">返回</button>
            </div>
        </template>
        <template #list>
            <div class=" bg-white text-sm space-y-3 h-screen">
                <div class="flex items-center">
                    <div class="w-24 text-right pr-5">商品名称</div>
                    <div class="flex-1 font-bold">
                        {{ r.goods.title }}
                    </div>
                </div>
                <div class="flex items-center">
                    <div class="w-24 text-right pr-5">商品条码</div>
                    <div class="flex-1">
                        {{ r.goods.code }}
                    </div>
                </div>

                <div class="flex items-center">
                    <div class="w-24 text-right pr-5">商品图片</div>
                    <div class="flex-1">
                        <img :src="r.goods.thumbFile" class="w-32 object-cover" >
                    </div>
                </div>

                <div class="flex items-center">
                    <div class="w-24 text-right pr-5">成本价</div>
                    <div class="flex-1">
                        <ypinput v-model="formData.inprice" placeholder=""></ypinput>
                    </div>
                </div>
                <div class="flex items-center">
                    <div class="w-24 text-right pr-5">零售价</div>
                    <div class="flex-1">
                        <ypinput v-model="formData.storeprice" placeholder=""></ypinput>
                    </div>
                </div>
                <div class="flex items-center">
                    <div class="w-24 text-right pr-5">状态</div>
                    <div class="flex-1">
                        <ypselect v-model="formData.status" :itemList="statusList"></ypselect>
                    </div>
                </div>

                <div class="flex items-center">
                    <div class="w-24 text-right pr-5">备注</div>
                    <div class="flex-1">
                        <ypinput v-model="formData.intro" placeholder=""></ypinput>
                    </div>
                </div>


                <div class="flex py-2 space-x-2 mt-5">
                    <div class="w-24"></div>
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
    import {getData,postData,alter} from "@/api/data"
    import {ref,reactive,onMounted} from 'vue'
    const props=defineProps({
        id:{
            default:0
        }
    })
    const emits=defineEmits(['jumpTo'])
    const isLoad=ref(false)
    const r=ref(null)
    const statusList=reactive([
        {value:0,title:'全部'},
        {value:1,title:'正常'},
        {value:2,title:'异常'},
        {value:3,title:'出售中'},
        {value:4,title:'己售'},
    ])



    const formData=reactive({
        id:0,
        goods_id:0,
        status:0
    })
    const read=async (id)=>{
        const resp= await getData('goodsitem/read',{id:id})
        if(resp.code==1){
            
            r.value=resp.data
            formData.inprice=resp.data.inprice
            formData.storeprice=resp.data.goods.storeprice
            formData.intro=resp.data.intro
            formData.goods_id=resp.data.goods_id
            formData.status=resp.data.status
        }
    }
    const goback=()=>{
        emits('jumpTo',{to:'list'})
    }
    
    const save=async()=>{
        const resp=await postData('goodsitem/save',formData)
        if(resp.code==1){
            alter({ type: 'alter-success', text: resp.msg })
            goback()
        }
    }
    onMounted(async()=>{
        if(props.id){
            formData.id=props.id
            await read(props.id)
        }
        

        isLoad.value=true
    })
</script>