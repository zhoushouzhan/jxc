<template>
    <yplayout v-if="isLoad">
        <template #header>
            <i class="ri-2x text-gray-500 ml-2 ri-indent-increase"></i>
            <div class="text-xl px-3">入库单</div>
            <div class="flex-1 flex flex-row-reverse space-x-reverse space-x-2"></div>
            <button class="yp-button yp-button-sm yp-button-orange rounded-sm" @click="goback">返回</button>
        </template>
        <template #list>
            <div class=" bg-white text-sm">
                <div v-if="formData.godown_id==0">
                    <div class="text-lg text-center">
                        选择入库仓库
                    </div>
                    <div class="flex items-center justify-center space-x-5 py-5">
                        <div v-for="(item,index) in godownList" class="px-3 py-1.5 cursor-pointer bg-blue-500 hover:bg-blue-600 text-white rounded" @click="formData.godown_id=item.id">
                        {{ item.title }}
                        </div>
                    </div>
                </div>

                <div v-if="formData.godown_id">
                    <ypinput v-model="barcode" disabled="" placeholder="录入条码" @keyup.enter="get_goods"></ypinput>
                </div>
                <div v-if="formData.bill.length">
                    <table class="yp-table">
                        <thead>
                            <tr>
                                <th class="text-center">序号</th>
                                <th class="w-40">图片</th>
                                <th>名称/条码</th>
                                <th>数量</th>
                                <th>备注</th>
                                <th class="text-center">操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            <template v-for="(item,index) in formData.bill">
                                <tr>
                                    <td class="text-center">{{ index+1 }}</td>
                                    <td class="w-40"><img :src="item.thumbFile" class=" object-cover"></td>
                                    <td>
                                        <div>{{ item.title }}</div>
                                        <div class="text-red-600 font-bold">{{ item.code }}</div>
                                    </td>
                                    <td><ypinput v-model="item.numbers" placeholder="请输入数量"></ypinput></td>
                                    <td><ypinput v-model="item.intro" placeholder="请输入备注"></ypinput></td>
                                    <td>
                                        <div class="flex items-center justify-center" @click="removeitem(index)">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-5 h-5 fill-gray-600 hover:fill-red-500"><path fill="none" d="M0 0h24v24H0z"></path><path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 10.5858L9.17157 7.75736L7.75736 9.17157L10.5858 12L7.75736 14.8284L9.17157 16.2426L12 13.4142L14.8284 16.2426L16.2426 14.8284L13.4142 12L16.2426 9.17157L14.8284 7.75736L12 10.5858Z"></path></svg>
                                        </div>
                                    </td>
                                </tr>
                            </template>
                        </tbody>
                    </table>
                </div>

                <div class="flex justify-center py-2 space-x-2 mt-3">
                    <button class="yp-button rounded" type="button" v-if="formData.bill.length" @click="save">
                        <i class="ri-save-line ri-lg pr-1"></i>
                        申请入库
                    </button>
                </div>
            </div>
        </template>
    </yplayout>
</template>
<script setup>
    import {postData,getData,alter} from "@/api/data"
    import {ref,reactive,onMounted,watch} from "vue"
    const props=defineProps({
        id:{
            default:0
        },
        t:{
            default:0
        }
    })

    const emits=defineEmits(['jumpCom'])

    const barcode=ref('')
    const godownList=reactive([])
    const isLoad=ref(false)
    const formData=reactive({
        godown_id:0,
        enabled:0,
        type:1,
        bill:[]
    })
    const ids=reactive(JSON.parse(sessionStorage.getItem('ingodownList'))||[])
    const goback=()=>{
        emits('jumpCom',{to:'list'})
    }
    watch(()=>formData.godown_id,async (n)=>{
       await getList(n)
    })
    const get_goods=async()=>{
        const resp= await getData('goods/details',{code:barcode.value})
        if(resp.code==1){
            let item={
                goods_id:resp.data.id,
                title:resp.data.title,
                godown_id:formData.godown_id,
                category_id:resp.data.category.id,
                thumbFile:resp.data.thumbFile,
                storeprice:resp.data.storeprice,
                intro:'',
                status:0,
                inprice:0,
                numbers:0,
                code:resp.data.code
            }
            formData.bill.unshift(item)
        }
        barcode.value=''
    }

    const removeitem=(index)=>{
        formData.bill.splice(index,1)
    }
    const get_godown=async()=>{
        const resp= await getData('/godown/index')
        if(resp.code==1){
            
            for(let key in resp.data.data){
                godownList.push(resp.data.data[key])
            }
        }
    }
    const getList=async(n)=>{
        if(props.id){
            return
        }
        const resp= await getData('goods/getall',{ids:ids})
        if(resp.code==1){
            for(let i=0;i<resp.data.length;i++){
                
                let item={
                    goods_id:resp.data[i].id,
                    title:resp.data[i].title,
                    godown_id:n,
                    category_id:resp.data[i].category.id,
                    thumbFile:resp.data[i].thumbFile,
                    storeprice:resp.data[i].storeprice,
                    intro:'',
                    status:0,
                    inprice:0,
                    numbers:1,
                    code:resp.data[i].code
                }
                formData.bill.push(item)
            }
        }
    }
    const save=async()=>{
        const resp= await postData('kucundan/save',formData)
        if(resp.code==1){
            formData.bill.splice(0)
            alter({ type: 'alter-success', text: resp.msg })
            sessionStorage.removeItem('ingodownList')
        }
    }
    const read=async(id)=>{
        const resp = await getData('kucundan/read',{id:id})
        if(resp.code==1){
            formData.id=id
            formData.godown_id=resp.data.godown_id
            formData.type=resp.data.type
            formData.bill=resp.data.bill
        }
    }

    onMounted(async() => {
        if(props.id){
            await read(props.id)
        }else{
            await get_godown()
        }
        isLoad.value=true
    })
</script>