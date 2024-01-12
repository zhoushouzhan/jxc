<template>
    <yplayout v-if="isload">
        <template #header="headProps">
            <div class="flex items-center">
                <i class="ri-2x text-gray-500 ml-2" :class="headProps.meta.icon||'ri-information-line'"></i>
                <div class="text-xl px-2" v-html="headProps.meta.title"></div>
                <div class="text-gray-400">仓库所有商品明细、状态查询</div>
            </div>
        </template>
        <template #list="listProps">
            <div class="flex space-x-1">
                <div>
                    <ypinput v-model="searchParams.keyword" placeholder="关键词|条码" @keyup.enter="tosearch"></ypinput>
                </div>
                <div>
                    <yplist controller="factory" v-model="searchParams.factory_id" colkey="title" defaultTitle="--选择厂商--"></yplist>
                </div>
                <div>
                    <ypselect v-model="searchParams.status" :itemList="statusList" defaultTitle="--所有状态--"></ypselect>
                </div>
                <div>
                    <ypselect v-model="searchParams.godown_id" :itemList="godownList" defaultTitle="--所有仓库--"></ypselect>
                </div>



                <div>
                    <button class="btn btn-chen" @click="tosearch">查询</button>
                </div>
            </div>
            <table class="yp-table-datalist">
                <thead>
                    <tr>
                        <th></th>
                        <th>序号</th>
                        <th>图片</th>
                        <th>名称</th>
                        <th>类目</th>
                        <th>仓库</th>
                        <th>厂商</th>
                        <th>
                            <div class="flex items-center space-x-1">
                                <div>成本价</div>
                                <div class="cursor-pointer" @click="setorder('inprice')">
                                    <i class="ri-menu-line text-gray-500" v-if="searchParams.ordersort==''"></i>
                                    <i class="ri-sort-desc text-gray-500" v-if="searchParams.ordersort=='desc'"></i>
                                    <i class="ri-sort-asc text-gray-500" v-if="searchParams.ordersort=='asc'"></i>
                                </div>
                            </div>
                        </th>
                        <th>销售价</th>
                        <th>利润</th>
                        <th>条码</th>
                        <th>状态</th>
                        <th>入库时间</th>
                        <th>备注</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody v-for="(item,index) in dataList">
                    <tr>
                        <td></td>
                        <td>{{ index+1 }}</td>
                        <td>
                            <img :src="item.goods.thumbFile" class="w-28 h-28 object-cover" v-viewer>
                        </td>
                        <td>{{ item.title }}</td>
                        <td>{{ item.category.title }}</td>
                        <td>{{ item.godown.title }}</td>
                        <td>{{ item.goods.factory.title }}</td>
                        <td>￥{{ item.inprice }}</td>
                        <td>￥{{ item.sellprice }}</td>
                        <td>￥{{ item.profit }}</td>
                        <td>{{ item.code }}</td>
                        <td>
                            <span v-if="item.status==1" class="bg-green-600 text-white px-2 py-1 rounded">正常</span>
                            <span v-if="item.status==2" class="bg-yellow-600 text-white px-2 py-1 rounded">异常</span>
                            <span v-if="item.status==3" class="bg-black text-white px-2 py-1 rounded">出售中</span>
                            <span v-if="item.status==4" class="bg-black text-white px-2 py-1 rounded">己售</span>
                        </td>
                        <td>{{ item.create_time }}</td>
                        <td>{{ item.intro }}</td>
                        <td>
                            <div class="space-x-2" v-if="item.status!=4">
                                <button class="btn btn-lan" @click="edit(item.id)" v-if="isbtn('edit')">编辑</button>
                                <button class="btn btn-hong" @click="removeitem(item.id)" v-if="isbtn('delete')">删除</button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div v-if="pageData.pageCount>1">
                <yppage @topage="topage" :pageData="pageData" />
            </div>
            <div v-else>
                总数：{{ pageData.totalRecords }}
            </div>
        </template>
    </yplayout>
</template>

<script setup>
    import {getData,postData,authbtn,confirms,alter} from "@/api/data"
    import {ref,reactive,onMounted} from "vue"
    import { useRoute } from 'vue-router'

    const emits=defineEmits(['jumpTo'])

    const route = useRoute()
    const meta = route.meta
    const isload=ref(false)
    const godownList=reactive([])


    //分页
    const pageData=reactive({
        pagelimit:0,
        totalRecords:0,//总记录数
        pageCount:0,//总页数
        currentPage:0//当前页
    });
    const topage = (page) => {
        searchParams.page=page
        pageData.currentPage=page
        getList()
    }

    const statusList=reactive([
        {id:1,title:'正常'},
        {id:2,title:'异常'},
        {id:3,title:'出售中'},
        {id:4,title:'己售'},
    ])

    const searchParams=reactive({
        keyword:'',
        status:null,
        orderby:'',
        ordersort:'',
        page:0
    })

    const setorder=(col)=>{
        searchParams.page=0
        searchParams.orderby=col
        searchParams.ordersort=searchParams.ordersort=='desc'?'asc':'desc'
        getList()
    }

    const dataList=reactive([])

    const getList=async()=>{
        const resp= await getData("goodsitem/index",searchParams)
        if(resp.code==1){
            dataList.length=0
            pageData.currentPage = resp.data.current_page
            pageData.pageCount = resp.data.last_page
            pageData.totalRecords = resp.data.total
            pageData.pagelimit=resp.data.per_page
           
            resp.data.data.map((item,index)=>{
                dataList.push(item)
            })
        }
    }
    const tosearch=async()=>{
        await getList()
    }

    const edit=(id)=>{
        emits('jumpTo',{to:'edit',id:id,page:searchParams.page})
    }

    const removeitem=async(id)=>{
        confirms({ text: '确认删除吗？' })
        .then(async () => {
            const resp= await postData('goodsitem/delete',{id:id})
            if(resp.code==1){
                alter({ type: 'alter-success', text: resp.msg })
                getList()
            }
        })
        .catch((e) => {})
    }

    const get_godown=async()=>{
        const resp= await getData('godown/index')
        if(resp.code==1){
            
            for(let key in resp.data.data){
                godownList.push(resp.data.data[key])
            }
        }
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

    onMounted(async()=>{
        await getList()
        await get_godown()
        isload.value=true
    })

</script>
