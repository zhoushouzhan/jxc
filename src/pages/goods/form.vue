<template>
    <yplayout>
        <template #header="props">
            <div class="flex items-center">
                <i class="ri-2x text-gray-500 ml-2 ri-product-hunt-line" ></i>
                <div class="text-xl px-2">录入商品</div>
                <div class="text-gray-400"></div>
            </div>
            <div class="flex-1"></div>
        </template>
        <template #list>
                <div class=" bg-white text-sm" v-if="isload">
                    <div>
                        <div class="space-y-7 p-2">
                            <div class="flex items-center">
                                <div class="w-24 text-right pr-5">选择栏目</div>
                                <div class="flex-1">
                                    <Linkage v-model="formData.category_id" :category="formData.category"></Linkage>
                                </div>
                            </div>



                            <template v-if="formData.category_id">

                                <div class="flex items-center">
                                    <div class="w-24 text-right pr-5">厂商</div>
                                    <div class="flex-1">
                                        <yplist controller="factory" v-model="formData.factory_id" colkey="title"></yplist>
                                    </div>
                                </div>

                                <Sclass :cid="formData.category_id" v-model="formData.sclass"></Sclass>
                                <div class="flex items-center">
                                    <div class="w-24 text-right pr-5">商品名称</div>
                                    <div class="flex-1">
                                        <ypinput v-model="formData.title" placeholder="请输入产品信息"></ypinput>
                                    </div>
                                </div>
                                <div class="flex items-center">
                                    <div class="w-24 text-right pr-5">贵重金属</div>
                                    <div class="grid grid-cols-10 gap-5">
                                        <ypcheckbox :title="item.title" :value="item.id" v-model="formData.metal" v-for="(item,index) in metaldatalist"></ypcheckbox>
                                    </div>
                                </div>
                                <div class="flex">
                                    <div class="w-24 text-right pr-5">镶嵌宝石</div>
                                    <div class="grid grid-cols-10 gap-5">
                                        <ypcheckbox :title="item.title" :value="item.id" v-model="formData.stone" v-for="(item,index) in stonedatalist"></ypcheckbox>
                                    </div>
                                </div>
                                <div class="flex items-center">
                                    <div class="w-24 text-right pr-5">商品图片</div>
                                    <div class="flex-1">
                                        <ypthumb v-model="formData.thumb"></ypthumb>
                                    </div>
                                </div>
                                <div class="flex items-center">
                                    <div class="w-24 text-right pr-5">零售价格</div>
                                    <div class="flex-1">
                                        <ypinput v-model="formData.storeprice"></ypinput>
                                    </div>
                                </div>
                                <div class="flex items-center">
                                    <div class="w-24 text-right pr-5">商品编码</div>
                                    <div class="flex-1">
                                        <ypinput v-model="formData.code"></ypinput>
                                    </div>
                                </div>
                                <div class="flex items-center">
                                    <div class="w-24 text-right pr-5">商品标签</div>
                                    <div class="flex-1">
                                        <ypinput v-model="formData.label"></ypinput>
                                    </div>
                                </div>
                                <div class="flex items-center">
                                    <div class="w-24 text-right pr-5">备注</div>
                                    <div class="flex-1">
                                        <yptextarea v-model="formData.intro" placeholder="备注信息"></yptextarea>
                                    </div>
                                </div>
                            </template>
                        </div>
                    </div>
                    <div class="flex py-2 space-x-2 mt-5">
                        <div class="w-24"></div>
                        <button class="btn btn-chen" type="button" @click="save">
                            <i class="ri-save-line ri-lg pr-1"></i>
                            提交
                        </button>
                        <button class="btn" type="button" @click="goBack">
                            <i class="ri-arrow-go-back-line ri-lg pr-1"></i>
                            返回
                        </button>
                    </div>
                </div>
        </template>
    </yplayout>
</template>
<script setup>
    import {getData,postData,alter} from '@/api/data'
    import {ref,reactive,onMounted} from "vue"
    import Sclass from "./sclass.vue"
    const props=defineProps({
        id:{
            default:0
        }
    })
    const emits=defineEmits(['jumpTo'])
    const isload=ref(false)
    const metaldatalist=reactive([])
    const stonedatalist=reactive([])
    const audio= new Audio()
    const formData=reactive({
        id:0,
        title:'',
        category_id:0,
        metal:[],
        stone:[],
        thumb:0,
        storeprice:0.00,
        code:'',
        label:'',
        intro:'',
        category:''
    })
    const goBack=()=>{
        emits('jumpTo',{to:'list'})
    }
    const classify_metal=async()=>{
        const resp= await getData('/classify/index',{pid:3427})
        if(resp.code==1){
            Object.keys(resp.data).map((k)=>{
                metaldatalist[k]=resp.data[k]
            })
        }
    }
    const classify_stone=async()=>{
        const resp= await getData('/classify/index',{pid:3428})
        if(resp.code==1){
            Object.keys(resp.data).map((k)=>{
                stonedatalist[k]=resp.data[k]
            })
        }
    }
    const save=async()=>{
        if(formData.category_id==0){
            audio.src=import.meta.env.VITE_BASEURL+"error.mp3"
            await audio.play()
            alert('必须选择栏目22')
            return
        }
        const resp= await postData('goods/save',formData)
        if(resp.code==1){
            audio.src=import.meta.env.VITE_BASEURL+"success.mp3"
            await audio.play()
            alter({ type: 'alter-success', text: resp.msg })
            for(let key in formData){
                delete formData[key]
            }
        }
    }
    const detail=async(id)=>{
        if(!id){
            return
        }
        let resp=await getData('goods/details',{id:id})
        if(resp.code==1){
            Object.keys(resp.data).map((k)=>{
                formData[k]=resp.data[k]
            })
        }
    }

    onMounted(async() => {
        classify_metal()
        classify_stone()
        formData.id=props.id
        if(props.id){
            await detail(props.id)
        }
        isload.value=true
    })


</script>