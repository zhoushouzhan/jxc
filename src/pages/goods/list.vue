<template>
    <yplayout v-if="isLoad">
        <template #header="props">
            <div class="flex items-center">
                <i class="ri-2x text-gray-500 ml-2 ri-product-hunt-line" ></i>
                <div class="text-xl px-2">{{ props.meta.title }}</div>
                <div class="text-gray-400"></div>
            </div>
            <div class="flex-1"></div>
            <div class="flex items-center space-x-3">
                <button class="yp-button yp-button-red rounded py-2" type="button" @click="add" v-if="isbtn('add')">
                    <i class="ri-add-line ri-lg pr-1"></i>
                    录入商品
                </button>

                <button class="yp-button yp-button-pink rounded" @click="emits('jumpTo',{to:'import'})">
                    <i class="ri-download-2-fill ri-lg pr-1"></i>
                    导入商品
                </button>


                <button class="yp-button yp-button-orange rounded" @click="ypexport">
                    <i class="ri-upload-2-fill ri-lg pr-1"></i>
                    导出
                </button>
                <button class="yp-button yp-button-black rounded" @click="barcode">
                    <i class="ri-barcode-line ri-lg pr-1"></i>
                    打印条码
                </button>
            </div>
        </template>
        <template #list>
            <div class="flex items-center space-x-2">
                <div>
                    <Linkage v-model="searchParam.category_id"></Linkage>
                </div>
                <div>
                    <ypselect v-model="searchParam.stone" :itemList="stoneList"></ypselect>
                </div>
                <div>
                    <ypinput v-model="searchParam.code" placeholder="条码" @keyup.enter="getList"></ypinput>
                </div>
                <div>
                    <ypinput v-model="searchParam.keyword" placeholder="名称关键词" @keyup.enter="getList"></ypinput>
                </div>
                <div>
                    <ypinput v-model="searchParam.label" placeholder="标签" @keyup.enter="getList"></ypinput>
                </div>
                <div>
                    <button class="yp-button yp-button-sm yp-button-orange rounded" @click="gosearch">查询</button>
                </div>
            </div>
            <div>
                <table class="yp-table-datalist">
                    <thead>
                        <tr>
                            <th><ypcheckbox value="all" v-model="checkedAll" v-tooltip.top="'全选'"></ypcheckbox></th>
                            <th>序号</th>
                            <th>图片</th>
                            <th>名称</th>
                            <th>类别</th>
                            <th>金属</th>
                            <th>原石</th>
                            <th>
                                <div class="flex items-center space-x-1">
                                    <div>零售价</div>
                                    <div class="cursor-pointer" @click="setorder('storeprice')">
                                        <i class="ri-menu-line text-gray-500" v-if="searchParam.orderby!='storeprice'"></i>
                                        <i class="ri-menu-line text-gray-500" v-if="searchParam.orderby=='storeprice'&&searchParam.ordersort==''"></i>
                                        <i class="ri-sort-desc text-gray-500" v-if="searchParam.orderby=='storeprice'&&searchParam.ordersort=='desc'"></i>
                                        <i class="ri-sort-asc text-gray-500" v-if="searchParam.orderby=='storeprice'&&searchParam.ordersort=='asc'"></i>
                                    </div>
                                </div>
                            </th>
                            <th>标签价</th>
                            <th>
                                <div class="flex items-center space-x-1">
                                    <div>库存</div>
                                    <div class="cursor-pointer" @click="setorder('stock')">
                                        <i class="ri-menu-line text-gray-500" v-if="searchParam.orderby!='stock'"></i>
                                        <i class="ri-menu-line text-gray-500" v-if="searchParam.orderby=='stock'&&searchParam.ordersort==''"></i>
                                        
                                        <i class="ri-sort-desc text-gray-500" v-if="searchParam.orderby=='stock'&&searchParam.ordersort=='desc'"></i>
                                        <i class="ri-sort-asc text-gray-500" v-if="searchParam.orderby=='stock'&&searchParam.ordersort=='asc'"></i>
                                    </div>
                                </div>
                            </th>
                            <th>条码</th>
                            <th>标签</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item,index) in dataList" :class="{'bg-pink-50':(printBarcode.indexOf(item.id)>=0),'bg-lime-100':(ingodownList.indexOf(item.id)>=0)}">
                            <td><ypcheckbox :value="item.id" v-model="selectIds"></ypcheckbox></td>
                            <td>{{ getOrder(index) }}</td>
                            <td><img :src="item.thumbFile" class="max-h-10" @click="openimg(item.thumbFile)"></td>
                            <td>{{ item.title }}</td>
                            <td>{{ item.category&&item.category.title||'/' }}</td>
                            <td><div v-for="(vo,index) in item.metalInfo">{{ vo.title }}</div></td>
                            <td><div v-for="(vo,index) in item.stoneInfo">{{ vo.title }}</div></td>
                            <td>￥{{ item.storeprice }}</td>
                            <td>￥{{ item.labelprice }}</td>
                            <td>{{ item.stock }}</td>
                            <td>{{ item.code }}</td>
                            <td>{{ item.label}}</td>
                            <td><button class="yp-button yp-button-sm" @click="edit(item.id)" v-if="isbtn('edit')">编辑</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>



            <div class="flex space-x-1 items-center">

                <div class="p-2">
                    <ypcheckbox value="all" v-model="checkedAll" v-tooltip.top="'全选'"></ypcheckbox>
                </div>
                <div>
                    <button class="yp-button yp-button-red yp-button-sm rounded-sm" @click="removeItem(0)" v-tooltip.bottom="'批量删除'">批量删除</button>
                </div>
                <div>
                    <button class="yp-button yp-button-sm rounded-sm" @click="barcodeItem(0)" v-tooltip.bottom="'加入打印标签'">加入打印</button>
                </div>
                <div>
                    <button class="yp-button yp-button-sm yp-button-black rounded-sm" @click="ingodownItem(0)" v-tooltip.bottom="'添加到入库队列'">添加到入库单</button>
                </div>

                <div v-if="pageData.pageCount>1">
                    <yppage @topage="topage" :pageData="pageData" />
                </div>

            </div>
        </template>
    </yplayout>
</template>
<script setup>
    import {getData,postData,alter,confirms,Download,authbtn} from '@/api/data'
    import { ref,reactive,onMounted,watch } from 'vue';
    import { useRoute } from 'vue-router'
    import Linkage from "./linkage"
    const props=defineProps({
        page:{
            default:0
        }
    })

    const emits=defineEmits(['jumpTo'])
    

    const route = useRoute()
    const meta = route.meta

    const isLoad=ref(false)
    const godownList=reactive([])
    //分页
    const  pageData=reactive({
        pagelimit:30,
        totalRecords:0,//总记录数
        pageCount:0,//总页数
        currentPage:props.page//当前页
    });
    const getOrder=(index)=>{
       return pageData.totalRecords - ((index)+(pageData.currentPage-1)*pageData.pagelimit)
    }
    const topage = (page) => {
        searchParam.page=page
        pageData.currentPage=page
        getList()
    }
    //复选框
    const selectIds = reactive([])
    const printBarcode=reactive(JSON.parse(sessionStorage.getItem('printBarcode'))||[])
    const ingodownList=reactive(JSON.parse(sessionStorage.getItem('ingodownList'))||[])
    
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

    //search
    const searchParam=reactive({
        orderby:'',
        ordersort:'',
        category_id:0,
        page:props.page,
        stone:0,
        code:'',
        keyword:'',
        label:'',
        godown:[]
    })
    const dataList=reactive([])

    const openimg=(src)=>{
        window.open(src)
    }
    const add=()=>{
        emits('jumpTo',{to:'add',page:searchParam.page})

    }
    const edit=(id)=>{
        emits('jumpTo',{to:'edit',id:id,page:searchParam.page})
    }
    const barcode=()=>{
        emits('jumpTo',{to:'barcode'})
    }

    const removeItem=async(id)=>{
        if(selectIds.length==0){
            alter({ type: 'alter-error', text: '请选择条目' })
            return
        }
        confirms({ text: '确认删除吗？' })
        .then(async () => {
            const resp= await postData('goods/delete',{id:selectIds})
            if(resp.code==1){
                alter({ type: 'alter-success', text: resp.msg })
                selectIds.length = 0
                checkedAll.length=0
                getList()
            }
        })
        .catch((e) => {})

    }
    //添加条码打印
    const barcodeItem=()=>{
        if(selectIds.length==0){
            alter({ type: 'alter-error', text: '请选择要打印的商品' })
            return
        }
        for(let i=0;i<selectIds.length;i++){
            if(printBarcode.indexOf(selectIds[i])<0){
                printBarcode.push(selectIds[i])
            }else{
                printBarcode.splice(printBarcode.indexOf(selectIds[i]),1)
            }
        }
        sessionStorage.setItem('printBarcode',JSON.stringify(printBarcode))
        alter({ type: 'alter-success', text: '己加入打印队列' })
    }
    //添加到入库队列
    const ingodownItem=()=>{
        if(selectIds.length==0){
            alter({ type: 'alter-error', text: '请选择要打印的商品' })
            return
        }
        for(let i=0;i<selectIds.length;i++){
            if(ingodownList.indexOf(selectIds[i])<0){
                ingodownList.push(selectIds[i])
            }else{
                ingodownList.splice(ingodownList.indexOf(selectIds[i]),1)
            }
        }
        sessionStorage.setItem('ingodownList',JSON.stringify(ingodownList))
        alter({ type: 'alter-success', text: '添加入库队列成功' })
    }
    const getList=async()=>{
        let resp= await getData('/goods',searchParam)
        if(resp.code==1){
            pageData.currentPage = resp.data.current_page
            pageData.pageCount = resp.data.last_page
            pageData.totalRecords = resp.data.total
            pageData.pagelimit=resp.data.per_page
            dataList.length=0
            for(let i in resp.data.data){
                dataList.push(resp.data.data[i])
            }
        }
        isLoad.value=true
    }

    const gosearch=()=>{
        searchParam.page=0
        pageData.currentPage=0
        getList()
    }


    const setorder=(col)=>{
        searchParam.page=0
        searchParam.orderby=col
        searchParam.ordersort=searchParam.ordersort=='desc'?'asc':'desc'
        getList()
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



    //导出选中项目
    const ypexport = async() => {
        confirms({ text: '确定导出吗？' })
        .then(async () => {
            let res=[];
            if(selectIds.length){
                 res = await Download('goods/export', {ids:selectIds})
            }else{
                 res = await Download('goods/export', searchParam)
            }
            let blob = new Blob([res.data])
            let contentDisposition = res.headers['content-disposition']
            let patt = new RegExp('filename=([^;]+\\.[^\\.;]+);*')
            let result = patt.exec(contentDisposition)
            let thename = decodeURI(result[1]) //使用decodeURI对名字进行解码
            let downloadElement = document.createElement('a')
            let href = window.URL.createObjectURL(blob) //创建下载的链接
            downloadElement.style.display = 'none'
            downloadElement.href = href
            downloadElement.download = thename //下载后文件名
            document.body.appendChild(downloadElement)
            downloadElement.click() //点击下载
            document.body.removeChild(downloadElement) //下载完成移除元素
            window.URL.revokeObjectURL(href) //释放掉blob对象
        })
        .catch((e) => {
            console.log('no',e)
        })
    }
    const stoneList=reactive([])
    const classify_stone=async()=>{
        const resp= await getData('/classify/index',{pid:3428})
        if(resp.code==1){
            Object.keys(resp.data).map((k)=>{
                stoneList[k]={value:resp.data[k].id,title:resp.data[k].title}
            })
        }
    }

    onMounted(async() => {
        const godownres=await getData('/godown/index')
        if(godownres.code==1){
            let dataList=godownres.data.data
            Object.keys(dataList).map((k)=>{
                godownList[k]=dataList[k]
            })
        }
        await classify_stone()
        await getList()
        document.addEventListener("click",()=>{
            //store.state.isLoading = true
            //checkedAll.length=0
        })

    })
</script>