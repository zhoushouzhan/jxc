<template>
    <yplayout>
        <template #header="head">
            <i class="ri-2x ri-database-2-line text-gray-500 ml-2"></i>
            <div class="text-xl px-3" v-html="head.meta.title"></div>
        </template>
        <template #list>
            <div class="flex items-center justify-between">
                <div class="space-x-2">

                </div>
                <div class="flex space-x-2">
                    <div>
                        <button class="btn btn-hong" @click="emits('jumpCom',{to:'out'})">增加</button>
                    </div>
                </div>


            </div>
            <table class="yp-table-datalist text-hui-300">
                <thead class="bg-gray-100">
                    <tr>
                        <th class="px-2 py-2 w-10 font-thin">
                            <ypcheckbox value="all" v-model="checkedAll" v-tooltip.top="'全选'"></ypcheckbox>
                        </th>
                        <th>ID</th>
                        <th>会员</th>
                        <th>单号</th>
                        
                        <th>商品数量</th>
                        <th>商品金额</th>
                        <th>操作员</th>
                        <th>录入时间</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="hover:bg-gray-100 py-1" v-for="(vo,key) in dataList" :key="key">
                      <td class="px-2">
                        <ypcheckbox :value="vo.id" v-model="selectIds"></ypcheckbox>
                      </td>
                      <td>{{vo.id}}</td>
                      <td>{{ vo.member.truename||'无' }}</td>
                      <td>{{ vo.sn }}</td>
                      <td>{{ vo.goodsCount }}</td>
                      <td>
                        ￥{{ vo.sumprice }}
                      </td>
                      <td>
                        {{ vo.admin.truename||vo.admin.username }}
                      </td>
                      <td>{{ vo.create_time }}</td>
                      <td class="text-right">
                        <button class="btn btn-lan mr-2" @click="edit(vo)" v-if="vo.enabled==0">编辑</button>
                        <button class="btn mr-2" @click="view(vo)" v-else>查看</button>
                        <button class="btn btn-zi mr-2" @click="checkorder(vo.id)" v-if="isbtn('enabled')&&vo.enabled==0">核验</button>
                        <button class="btn btn-hong" @click="removeItem(vo.id)" v-if="vo.enabled==0">删除</button>
                      </td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <td class="px-2">
                            <ypcheckbox value="all" v-model="checkedAll" v-tooltip.right="'全选'"></ypcheckbox>
                        </td>
                        <td colspan="8">
                            <button class="btn btn-hong" @click="removeItem(0)" v-tooltip.bottom="'批量删除'">批量删除</button>
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
    const enabled=ref(null)
    const isLoad=ref(false)

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

    const edit=(obj)=>{
        if(obj.type==1){
            emits('jumpCom',{to:'in',id:obj.id,page:pageData.currentPage})
        }
        if(obj.type==2){
            emits('jumpCom',{to:'out',id:obj.id,page:pageData.currentPage})
        }
    }
    const view=(vo)=>{
        emits('jumpCom',{to:'view',id:vo.id,page:pageData.currentPage})
    }
    const checkorder=(id)=>{
        emits('jumpCom',{to:'checkorder',id:id,page:pageData.currentPage})
    }

    const getList=async ()=>{
        let resp= await getData('kucundan/sellorder',{page:pageData.currentPage,type:2,enabled:enabled.value})
        if(resp.code==1){

            pageData.currentPage = resp.data.current_page
            pageData.pageCount = resp.data.last_page
            pageData.totalRecords = resp.data.total

            dataList.length=0
            for(let i in resp.data.data){
                dataList[i]=resp.data.data[i]
            }
        }
        isLoad.value=true
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

    onMounted(() => {

        getList()


    })
</script>