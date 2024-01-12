<template>
    <yplayout v-if="isLoad">
        <template #header>
            <i class="ri-2x text-gray-500 ml-2 ri-money-cny-circle-fill"></i>
            <div class="text-xl px-3">销售单</div>
            <div class="flex-1 flex flex-row-reverse space-x-reverse space-x-2"></div>
            <button class="btn btn-chen" @click="goback">返回</button>
        </template>
        <template #list>
            <div class=" bg-white text-sm">
                <div v-if="formData.godown_id==0">
                    <div class="text-lg text-center">
                        选择出库仓库
                    </div>
                    <div class="flex items-center justify-center space-x-5 py-5">
                        <div v-for="(item,index) in godownList" class="px-3 py-1.5 cursor-pointer bg-red-500 hover:bg-red-600 text-white rounded" @click="formData.godown_id=item.id">
                        {{ item.title }}
                        </div>
                    </div>
                </div>
                <div class="space-y-3" v-if="formData.godown_id">
                    <div class="flex items-center">
                        <div>
                            会员：
                        </div>
                        <div>
                            <div class="flex space-x-2 items-center" v-if="member">
                                <div class="px-2 py-1 bg-lan-300 text-white rounded-full text-xs">
                                    {{ member.truename }}{{member.mobile}}
                                </div>
                                <div>
                                    <i class="ri-close-circle-line ri-lg hover:text-hong-300" @click="member=null"></i>
                                </div>
                            </div>
                            <button type="button" class="btn btn-lan btn-small" @click="VisibleDialog=true" v-else>选择会员</button>
                        </div>
                    </div>
                    <div>
                        <ypinput v-model="barcode" placeholder="录入条码" @keyup.enter="get_goods" maxlength="15"></ypinput>
                        <table class="yp-table">
                            <thead>
                                <tr>
                                    <th class="text-center">序号</th>
                                    <th>图片</th>
                                    <th class="w-40">图片</th>
                                    <th>条码</th>
                                    <th>零售价</th>
                                    <th>数量</th>
                                    <th>库存</th>
                                    <th>备注</th>
                                    <th class="text-center">操作</th>
                                </tr>
                            </thead>
                            <tbody>
                                <template v-for="(item,index) in formData.bill">
                                    <tr>
                                        <td class="text-center">{{ index+1 }}</td>
                                        <td class="w-40">
                                            <img :src="item.thumbFile" class="w-28 h-28 object-cover" v-viewer>
                                        </td>
                                        <td>{{ item.title }}</td>
                                        <td>{{ item.code }}</td>
                                        <td><ypinput v-model="item.sellprice" placeholder="请输入零售价" :min="item.storeprice" :max="item.labelprice"></ypinput></td>
                                        <td><ypinput type="number" v-model="item.numbers" placeholder="请输入数量" :max="item.stock" maxlength="9"></ypinput></td>
                                        <td class="text-center">{{ item.stock }}</td>
                                        <td><ypinput v-model="item.intro" placeholder="请输入备注" maxlength="30"></ypinput></td>
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
                </div>
                <div class="flex justify-center py-2 space-x-2 mt-3">
                    <button class="btn btn-hong" type="button" v-if="formData.bill.length" @click="save">
                        <i class="ri-save-line ri-lg pr-1"></i>
                        提交
                    </button>
                    <button class="btn" type="button" @click="goback">
                        <i class="ri-arrow-go-back-fill ri-lg pr-1"></i>
                        返回
                    </button>
                </div>
            </div>
        </template>
    </yplayout>

    <ypdialog :title="ypdialogTitle" :mask="1" v-if="VisibleDialog" @close="VisibleDialog=false">
        <MemberList @chooseMember="choose_member"></MemberList>
    </ypdialog>



</template>
<script setup>
    import {postData,getData,alter} from "@/api/data"
    import {ref,reactive,onMounted} from "vue"
    import MemberList from "./../member/index.vue"
    const props=defineProps({
        id:{
            default:0
        },
        t:{
            default:0
        },
        page:{
            default:null
        }
    })
    const emits=defineEmits(['jumpCom'])


    const ypdialogTitle = ref('选择会员')
    const VisibleDialog = ref(false)
    const member=ref(null)



    const barcode=ref('')
    const godownList=reactive([])
    const isLoad=ref(false)
    const formData=reactive({
        godown_id:0,
        enabled:1,
        type:2,
        member_id:null,
        bill:[]
    })

    const goback=()=>{
        emits('jumpCom',{to:'list'})
    }
    const get_goods=async()=>{
        if(barcode.value==''){
            return
        }
        const resp= await getData('goods/details',{code:barcode.value,godown_id:formData.godown_id})
        if(resp.code==1){
            if(resp.data.stock==0){
                alter({ type: 'alter-error', text: '库存不足'})
                return
            }
            let item={
                goods_id:resp.data.id,
                title:resp.data.title,
                godown_id:formData.godown_id,
                category_id:resp.data.category_id,
                thumbFile:resp.data.thumbFile,
                storeprice:resp.data.storeprice.toString().replace(/,/g,''),
                labelprice:resp.data.labelprice.toString().replace(/,/g,''),
                stock:resp.data.stock,
                intro:'',
                status:0,
                sellprice:resp.data.labelprice.toString().replace(/,/g,''),
                numbers:1,
                code:resp.data.code
            }
            formData.bill.unshift(item)
            barcode.value=''
        }
    }

    const removeitem=(index)=>{
        formData.splice(index,1)
    }
    const get_godown=async()=>{
        const resp= await getData('godown/index')
        if(resp.code==1){
            
            for(let key in resp.data.data){
                godownList.push(resp.data.data[key])
            }
        }
    }

    const save=async()=>{
        if(!formData.member_id){
            alter({ type: 'alter-error', text: '请选择会员'})
            return
        }
        const resp= await postData('kucundan/save',formData)
        if(resp.code==1){
            formData.bill.splice(0)
            member.value=null
            alter({ type: 'alter-success', text: resp.msg })

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
    const choose_member=(item)=>{
        member.value=item
        formData.member_id=item.id
        VisibleDialog.value=false
    }

    const openimg=(src)=>{
        window.open(src)
    }

    onMounted(async() => {
        if(props.id){
            await read(props.id)
            console
        }else{
            await get_godown()
        }
        isLoad.value=true
    })
</script>