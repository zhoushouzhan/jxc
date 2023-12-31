<template>
    <yplayout>
        <template #header="head">
            <i class="ri-2x ri-yuque-fill text-gray-500 ml-2"></i>
            <div class="text-xl px-3" v-html="head.meta.title"></div>
            <div class="flex-1 flex flex-row-reverse space-x-reverse space-x-2"></div>
            <button class="yp-button yp-button-sm yp-button-purple rounded-sm" @click="add">增加</button>
        </template>
        <template #list>
            <table class="table-auto w-full text-sm">
                <thead class="bg-gray-100">
                    <tr>
                        <th class="px-2 py-2 border w-10 font-thin">
                            <ypcheckbox value="all" v-model="checkedAll" v-tooltip.top="'全选'"></ypcheckbox>
                        </th>
                        <th class="px-2 py-2 border w-10 text-center">ID</th>
                        <th class="px-2 py-2 border text-left">名称</th>
                        <th class="px-2 py-2 border text-left">仓管</th>
                        <th class="px-2 py-2 border w-44">总计</th>
                        <th class="px-2 py-2 border w-32 text-center">操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="hover:bg-gray-100" v-for="(vo,key) in dataList" :key="key">
                      <td class="border px-2">
                        <ypcheckbox :value="vo.id" v-model="selectIds"></ypcheckbox>
                      </td>
                      <td class="border px-2 text-center">{{vo.id}}</td>
                      <td class="border px-2">{{ vo.title }}</td>
                      <td class="border px-2 space-x-2 text-sm text-white">
                        <span class="space-x-2 bg-gray-800 rounded px-1 py-1" v-for="(item,index) in vo.adminlist">{{ item.truename }}</span>
                      </td>
                      <td class="border px-2">{{ vo.count }}</td>
                      <td class="border px-2 py-2 text-center">
                        <button class="yp-button yp-button-sm rounded-sm mr-2" @click="edit(vo.id)">编辑</button>
                        <button class="yp-button yp-button-red yp-button-sm rounded-sm" @click="removeItem(vo.id)">删除</button>
                      </td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <td class="border p-2">
                            <ypcheckbox value="all" v-model="checkedAll" v-tooltip.right="'全选'"></ypcheckbox>
                        </td>
                        <td class="border p-2" colspan="6">
                            <button class="yp-button yp-button-red yp-button-sm rounded-sm" @click="removeItem(0)" v-tooltip.bottom="'批量删除'">批量删除</button>
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
    import {getData,postData,confirms,alter} from "@/api/data"
    import {ref,reactive,watch,onMounted} from "vue"
    
    const emits=defineEmits(['jumpCom'])
    const isLoad=ref(false)
    const add=()=>{
        emits('jumpCom',{to:'add'})
    }
    //分页
    const  pageData=reactive({
        totalRecords:0,//总记录数
        pageCount:0,//总页数
        currentPage:1//当前页
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
    const edit=(id)=>{
        emits('jumpCom',{to:'edit',id:id})
    }

    const getList=async ()=>{
        let resp= await getData('godown/index',{page:pageData.currentPage})
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
            const res = await postData('godown/delete', {
                ids: id
            })
            if (res.code) {
                alter({ type: 'alter-success', text: res.msg })
                getList()
            }
            })
            .catch((e) => {})
    }


    onMounted(() => {

        getList()

    })
</script>