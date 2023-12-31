<template>
    <div v-if="isload">
        <div class="flex space-x-2">
            <div @click="showList=true">
                <div class="border rounded h-8 w-32 flex items-center px-2 text-blue-600" v-text="title"></div>
            </div>
        </div>
        <teleport to='body'>
            <div class="absolute left-0 top-0 w-full h-full bg-black bg-opacity-60 flex justify-center" v-if="showList">
                <div class="bg-white w-1/2 mt-52 max-h-[770px] rounded overflow-hidden">
                    <div class="flex justify-between border-b bg-gray-50">
                        <div class="p-3 font-bold">选择数据</div>
                        <div class="p-3" @click="showList=false">
                            <i class="ri ri-close-line ri-xl hover:text-red-500"></i>
                        </div>
                    </div>
                    <div class="flex items-center space-x-2 p-5">
                        <div>
                            <ypinput v-model="searchData.keyword" placeholder="关键词" @keyup.enter="gosearch"></ypinput>
                        </div>
                        <div>
                            <button class="yp-button rounded" @click.stop="gosearch">查询</button>
                        </div>
                    </div>
                    <div class="max-h-[600px] p-5 overflow-hidden overflow-y-auto">
                        <div class="grid grid-cols-3 gap-5">
                            <div class="text-center p-2 bg-gray-50 text-gray-700 hover:bg-blue-50" v-for="(item,index) in dataList" @click="selected(item)">{{ item.title }}</div>
                        </div>
                    </div>
                    <div class="mt-3" v-if="pageData.pageCount>1">
                        <yppage @topage="topage" :pageData="pageData" />
                    </div>

                </div>
            </div>
        </teleport>
    </div>
</template>

<script setup>
    import {getData} from "@/api/data"
    import {ref,watch,reactive,onMounted} from "vue"
    const props=defineProps({
        modelValue: {
            default: 0
        },
        id:{
            default:0
        },
        controller:{
            default:''
        },
        colkey:{
            default:'title'
        }
    })
    const emits = defineEmits(['update:modelValue'])
    const isload=ref(false)
    const showList=ref(false)



    const title=ref('请选择')

    //search
    const searchData=reactive({
        keyword:'',
        page:0
    })

    //分页
    const  pageData=reactive({
        totalRecords:0,//总记录数
        pageCount:0,//总页数
        currentPage:1//当前页
    });

    const topage = (page) => {
        pageData.currentPage=page
        searchData.page=page
        getList()
    }


    const dataList=reactive([])

    const selected=(obj)=>{
        emits('update:modelValue', obj.id)
        title.value=obj.title
        showList.value=false
    }
    watch(showList,async (n,o)=>{
        if(n){
            searchData.page=0
           await getList()
        }
    })

    const getList=async ()=>{
        const resp= await getData(props.controller+'/index',searchData)
        if(resp.code==1){

            pageData.currentPage = resp.data.current_page
            pageData.pageCount = resp.data.last_page
            pageData.totalRecords = resp.data.total
            dataList.length=0

            Object.keys(resp.data.data).map((k)=>{
                dataList.push({id:resp.data.data[k].id,title:resp.data.data[k].title})
            })
        }
    }
    const gosearch=async ()=>{
        searchData.page=0
        await getList()
    }
    const read=async(id)=>{
        const resp= await getData(props.controller+'/read',{id:id})
        if(resp.code){
            title.value=resp.data.title
        }

    }
    onMounted(async()=>{
        if(props.modelValue){
            await read(props.modelValue)
        }
        isload.value=true
    })

</script>