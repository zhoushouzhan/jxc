<template>
    <yplayout>
        <template #header="head">
            <i class="ri-2x ri-user-3-fill text-gray-500 ml-2"></i>
            <div class="text-xl px-3">会员管理</div>
            <div class="flex-1 flex flex-row-reverse space-x-reverse space-x-2"></div>
        </template>
        <template #list>
            <div class="flex justify-between">
                <div>
                    <ypinput v-model="keywords" placeholder="关键词+回车" @keyup.enter="getList" class=" min-w-[200px]"></ypinput>
                </div>
                <div>
                    <button class="btn btn-lan" @click="add">增加</button>
                </div>
            </div>
            <table class="yp-table-datalist text-hui-300">
                <thead class="bg-gray-100">
                    <tr>
                        <th class="w-10">
                            <ypcheckbox value="all" v-model="checkedAll" v-tooltip.top="'全选'"></ypcheckbox>
                        </th>
                        <th>ID</th>
                        <th>姓名</th>
                        <th>性别</th>
                        <th>联系电话</th>
                        <th>备注</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(vo,key) in dataList" :key="key" @dblclick="choose_member(vo)">
                      <td class="border px-2">
                        <ypcheckbox :value="vo.id" v-model="selectIds"></ypcheckbox>
                      </td>
                      <td>{{vo.id}}</td>
                      <td>{{ vo.truename }}</td>
                      <td>
                        <span v-if="vo.sex==1">男</span>    
                        <span v-if="vo.sex==2">女</span>    
                        <span v-if="vo.sex==3">保密</span>
                    </td>
                        <td>{{ vo.mobile }}</td>

                        <td>{{ vo.intro }}</td>
                      <td class="space-x-2">
                        <button class="btn" @click="edit(vo.id)">编辑</button>
                        <button class="btn btn-hong" @click="removeItem(vo.id)">删除</button>
                      </td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <td class="border p-2">
                            <ypcheckbox value="all" v-model="checkedAll" v-tooltip.right="'全选'"></ypcheckbox>
                        </td>
                        <td class="border p-2" colspan="6">
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
    import {getData,postData,confirms,alter} from "@/api/data"
    import {ref,reactive,watch,onMounted} from "vue"
    const props=defineProps({
        member:{
            default:[]
        }
    })
    const emits=defineEmits(['jumpCom','chooseMember'])
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

    const keywords=ref(null)


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
        let resp= await getData('member/index',{page:pageData.currentPage,keywords:keywords.value})
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

    //删除
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
            const res = await postData('member/delete', {
                ids: id
            })
            if (res.code) {
                alter({ type: 'alter-success', text: res.msg })
                getList()
            }
            })
            .catch((e) => {})
    }
    const choose_member=(item)=>{
        emits('chooseMember',item)
    }

    onMounted(() => {

        getList()

    })
</script>