<template>
    <yplayout>
        <template #header="head">
            <i class="ri-2x ri-database-2-line text-gray-500 ml-2"></i>
            <div class="text-xl px-3" v-html="head.meta.title"></div>
        </template>
        <template #list>
            <div class="flex items-center justify-between">
                <div class="space-x-2">
                    <button class="btn" :class="{'btn-zi':type==1&&!enabled}" @click="getTypeData(1)">入库单</button>
                    <button class="btn" :class="{'btn-zi':type==1&&enabled==1}" @click="getTypeData(1,1)">入库核验单<span class="text-hong-300 px-2 font-bold"  :class="{'text-white':type==1&&enabled==1}" v-if="incount">({{ incount }})</span></button>

                    <button class="btn" :class="{'btn-zi':type==3&&!enabled}" @click="getTypeData(3)">调拔单</button>
                    <button class="btn" :class="{'btn-zi':type==3&&enabled==1}" @click="getTypeData(3,1)">调拔核验单<span class="text-hong-300 px-2 font-bold"  :class="{'text-white':type==3&&enabled==1}" v-if="movecount">({{ movecount }})</span></button>
                </div>


                <div class="flex space-x-2">
                    <div>
                        <button class="btn btn-lan" @click="emits('jumpCom',{to:'in'})">增加入库单</button>
                    </div>
                    <div>
                        <button class="btn btn-hong" @click="emits('jumpCom',{to:'move'})">增加调拔单</button>
                    </div>
                </div>


            </div>
            <table class="table-auto w-full text-sm">
                <thead class="bg-gray-100">
                    <tr>
                        <th class="px-2 py-2 border w-10 font-thin">
                            <ypcheckbox value="all" v-model="checkedAll" v-tooltip.top="'全选'"></ypcheckbox>
                        </th>
                        <th class="px-2 py-2 border w-10 text-center">ID</th>
                        <th class="px-2 py-2 border w-44 text-center max-lg:hidden">单号</th>
                        <th class="px-2 py-2 border text-left">操作员</th>
                        <th class="px-2 py-2 border w-32">库存</th>
                        <th class="px-2 py-2 border w-32">状态</th>
                        <th class="px-2 py-2 border w-44 max-lg:hidden">录入时间</th>
                        <th class="px-2 py-2 border text-center">操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="hover:bg-gray-100" v-for="(vo,key) in dataList" :key="key">
                      <td class="border px-2">
                        <ypcheckbox :value="vo.id" v-model="selectIds"></ypcheckbox>
                      </td>
                      <td class="border px-2 text-center">{{vo.id}}</td>
                      <td class="border px-2 max-lg:hidden">{{ vo.sn }}</td>

                      <td class="border px-2 space-x-2 text-sm">
                        {{ vo.admin.truename||vo.admin.username }}
                      </td>
                      
                      <td class="border px-2 text-center">{{ vo.goodsCount }}</td>
                      <td class="border px-2 text-center">
                        <span class="bg-red-400 text-white px-2 py-[2px] rounded" v-if="vo.enabled==0">核验中</span>
                        <span class="bg-green-700 text-white px-2 py-[2px] rounded" v-else>己入库</span>
                      </td>
                      <td class="border px-2 max-lg:hidden">{{ vo.create_time }}</td>
                      <td class="border px-2 py-2 text-center">
                        <button class="btn btn-lan mr-2" @click="edit(vo)" v-if="vo.enabled==0">编辑</button>
                        <button class="btn mr-2" @click="view(vo)" v-else>查看</button>
                        <button class="btn btn-zi mr-2" @click="checkorder(vo)" v-if="isbtn('enabled')&&vo.enabled==0">核验</button>
                        <button class="btn btn-hong" @click="removeItem(vo.id)" v-if="vo.enabled==0">删除</button>
                      </td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <td class="border p-2">
                            <ypcheckbox value="all" v-model="checkedAll" v-tooltip.right="'全选'"></ypcheckbox>
                        </td>
                        <td class="border p-2" colspan="8">
                            <button class="btn btn-hong" @click="removeItem(0)" v-tooltip.bottom="'批量删除'"  v-if="isbtn('delete')">批量删除</button>
                        </td>
                    </tr>
                </tfoot>
            </table>
            <div class="mt-3" v-if="pageData.pageCount>1">
                <yppage @topage="topage" :pageData="pageData" />
            </div>
        </template>
    </yplayout>
</template>

<script setup>
    import {getData,postData,confirms,alter,authbtn} from "@/api/data"
    import {ref,reactive,watch,onMounted} from "vue"
    import { useRoute } from 'vue-router'

    const props=defineProps({
        page:{
            default:0
        }
    })
    const emits=defineEmits(['jumpCom'])

    const route = useRoute()
    const meta = route.meta
    const type=ref(1)
    const enabled=ref(null)
    const isLoad=ref(false)
    const incount=ref(0)
    const movecount=ref(0)
    //分页
    const  pageData=reactive({
        totalRecords:0,//总记录数
        pageCount:0,//总页数
        currentPage:props.page//当前页
    });
    const topage = (page) => {
        pageData.currentPage=page
        getList()
    }
    //数据对象
    const dataList=reactive([])

    //复选框
    const selectIds = reactive([])
    const checkedAll = reactive([])
    watch(checkedAll, (newVal, oldVal) => {
        selectIds.length = 0
        if (newVal.length > 0) {
            dataList.forEach((item) => {
                selectIds.push(item.id)
            })
        } else {
            selectIds.length = 0
        }
    })
    const getTypeData=(i,s)=>{
        type.value=i
        enabled.value=s
        getList()
    }
    const edit=(obj)=>{

        if(obj.type==1){
            emits('jumpCom',{to:'in',id:obj.id,page:pageData.currentPage})
        }
        if(obj.type==3){
            emits('jumpCom',{to:'move',id:obj.id,page:pageData.currentPage})
        }
    }
    const view=(vo)=>{
        if(vo.type==1){
            emits('jumpCom',{to:'view',id:vo.id,page:pageData.currentPage})
        }
        if(vo.type==3){
            emits('jumpCom',{to:'moveview',id:vo.id,page:pageData.currentPage})
        }
        
   
    }
    const checkorder=(vo)=>{
        if(vo.type==1){
            emits('jumpCom',{to:'checkorder',id:vo.id,page:pageData.currentPage})
        }
        if(vo.type==3){
            emits('jumpCom',{to:'checkmove',id:vo.id,page:pageData.currentPage})
        }
    }

    const getList=async ()=>{
        let resp= await getData('kucundan/index',{page:pageData.currentPage,type:type.value,enabled:enabled.value})
        if(resp.code==1){

            pageData.currentPage = resp.data.current_page
            pageData.pageCount = resp.data.last_page
            pageData.totalRecords = resp.data.total

            dataList.length=0
            for(let i in resp.data.data){
                dataList[i]=resp.data.data[i]
            }
        }
       
    }

    //回收站删除
    const removeItem = (id) => {
        if (id == 0) {
            id = selectIds.length?selectIds:0
        }
        
        if (!id) {
            alter({ type: 'alter-error', text: '请选择项目' })
            return
        }
        confirms({ text: '确认删除吗？' })
            .then(async () => {
            const res = await postData('kucundan/delete', {
                ids: id
            })
            if (res.code) {
                alter({ type: 'alter-success', text: res.msg })
                getList()
            }
            })
            .catch((e) => {})
    }
    //权限按钮
    const isbtn = (btn) => {
        const modname = meta.mod.name
        let arr = authbtn(modname)
        if (arr.indexOf(btn) >= 0) {
            return true
        } else {
            return false
        }
    }
    //检测单据状态
    const globalstatus=async()=>{
        const resp= await getData('kucundan/globalstatus')
        if(resp.code==1){
            incount.value=resp.data.incount
            movecount.value=resp.data.movecount
        }
    }
    onMounted(async() => {

        await getList()
        await globalstatus()
        isLoad.value=true
    })
</script>