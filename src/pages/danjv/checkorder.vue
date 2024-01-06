<template>
    <yplayout v-if="isLoad">
        <template #header>
            <i class="ri-2x text-gray-500 ml-2 ri-checkbox-multiple-fill"></i>
            <div class="text-xl px-3">审批中心</div>
            <div class="flex-1 flex flex-row-reverse space-x-reverse space-x-2"></div>
            <button class="yp-button yp-button-sm yp-button-orange rounded-sm" @click="goback">返回</button>
        </template>
        <template #list>
            <div class="flex space-x-1">
                <div class="overflow-y-auto h-[900px]">
                    <table class="yp-table">
                        <thead>
                            <tr>
                                <th class="text-center">序号</th>
                                <th class="text-center">图片</th>
                                <th>名称</th>
                                <th class="w-24">成本</th>
                                <th class="w-28">售价</th>
                                <th class="w-20">数量</th>
                                <th>备注</th>
                            </tr>
                        </thead>
                        <tbody>
                            <template v-for="(item,index) in formData.bill">
                                <tr class=" hover:bg-gray-100" :class="{'bg-gray-200':select_index==item.goods_id}" @click="chooseItem(item)">
                                    <td class="text-center">{{ index+1 }}</td>
                                    <td>
                                        <img :src="item.thumbFile" class="w-20 h-20 object-cover" @click="openimg(item.thumbFile)">
                                    </td>
                                    <td>
                                        <div>{{ item.title }}</div>
                                        <div class="text-red-600 font-bold">{{ item.code }}</div>
                                    </td>
                                    <td><ypinput v-model="item.inprice" placeholder="请输入价格"></ypinput></td>
                                    <td><ypinput v-model="item.storeprice" placeholder="销售价格"></ypinput></td>
                                    <td><ypinput v-model="item.numbers" placeholder="请输入数量"></ypinput></td>
                                    <td><ypinput v-model="item.intro" placeholder="请输入备注"></ypinput></td>
                                </tr>
                            </template>
                        </tbody>
                    </table>
                </div>
                <div class="flex-1">
                    <div class="overflow-y-auto max-h-[440px]">
                        <table class="yp-table">
                            <thead>
                                <tr>
                                    <th class="text-center w-20">序号</th>
                                    <th>名称</th>
                                    <th class="w-24">编码</th>
                                    <th class="w-24">标签</th>
                                    <th class="w-24">成本</th>
                                    <th class="w-24">零售价</th>
                                    <th class="w-28">日期</th>
                                </tr>
                            </thead>
                            <tbody v-if="hostory.length">
                                <template v-for="(item,index) in hostory">
                                    <tr class=" hover:bg-gray-100">
                                        <td class="text-center">{{ index+1 }}</td>
                                        <td class="whitespace-nowrap">{{ item.title }}</td>
                                        <td>{{ item.code }}</td>
                                        <td>{{ item.goods.label }}</td>
                                        <td>{{ item.inprice }}</td>
                                        <td>{{ item.goods.storeprice }}</td>
                                        <td class="whitespace-nowrap">{{ item.create_time.substring(0,item.create_time.indexOf(' '))}}</td>
                                    </tr>
                                </template>
                            </tbody>
                            <tbody v-else>
                                <tr>
                                    <td colspan="3">
                                        <div class="text-center py-2 text-gray-400">暂无数据</div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>


                    <div class="overflow-y-auto max-h-[440px]">
                    <table class="yp-table">
                        <thead>
                            <tr>
                                <th class="text-center w-20">图片</th>
                                <th>名称</th>
                                <th class="w-24">编码</th>
                                <th class="w-24">标签</th>
                                <th class="w-24">成本</th>
                                <th class="w-24">零售价</th>

                                <th class="w-28">日期</th>
                            </tr>
                        </thead>
                        <tbody v-if="labellist.length">
                            <template v-for="(item,index) in labellist">
                                <tr class=" hover:bg-gray-100">
                                    <td><img :src="item.goods.thumbFile" class="max-h-10" @click="openimg(item.goods.thumbFile)"></td>
                                    <td class="whitespace-nowrap">{{ item.title }}</td>
                                    <td>{{ item.goods.code }}</td>
                                    <td>{{ item.goods.label }}</td>
                                    <td>{{ item.inprice }}</td>
                                    <td>{{ item.goods.storeprice }}</td>
                                    <td class="whitespace-nowrap">{{ item.create_time.substring(0,item.create_time.indexOf(' '))}}</td>
                                </tr>
                            </template>
                        </tbody>
                        <tbody v-else>
                            <tr>
                                <td colspan="3">
                                    <div class="text-center py-2 text-gray-400">暂无数据</div>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                </div>



                </div>





            </div>
            <div class="flex py-2 space-x-2 mt-3">
                <button class="yp-button rounded" type="button" v-if="formData.bill.length" @click="save">
                    <i class="ri-save-line ri-lg pr-1"></i>
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
    const select_index=ref(0)
    const formData=reactive({
        godown_id:0,
        type:1,
        bill:[]
    })
    
    const hostory=reactive([])
    const labellist=reactive([])
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

    const chooseItem= async(item)=>{
        if(select_index.value==item.goods_id){
            return
        }

        select_index.value=item.goods_id
        let goods_id=item.goods_id
        const resp= await getData('goodsitem/near',{goods_id:goods_id})
        if(resp.code==1){
            hostory.length=0
            Object.keys(resp.data).map((k)=>{
                hostory[k]=resp.data[k]
            })
        }
        const labelres= await getData('goodsitem/label',{goods_id:goods_id})
        if(labelres.code==1){
            labellist.length=0
            Object.keys(labelres.data).map((k)=>{
                labellist[k]=labelres.data[k]
            })
        }
        console.log(labellist)
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