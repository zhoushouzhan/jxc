<template>
    <div class="text-sm text-hui-100 h-full flex select-none">
        <div class="bg-hui-900 h-full space-y-2">
            <div class="flex justify-center pb-2 pt-1" @click="toogle_child">
                <img src="./../../assets/logo.png" class="w-10 object-cover">
            </div>
            <div class="w-14 py-2 text-center space-y-1 duration-300 cursor-pointer hover:bg-blue-500 hover:text-white" :class="{'bg-blue-500 text-white':item.id==pageData.pid}" v-for="(item,index) in dataList" :key="index" @click.stop="select_item(item)">
                <div><i class="ri-xl" :class="item.meta.icon"></i></div>
                <div>{{ item.title }}</div>
            </div>
        </div>
        <div class="overflow-hidden whitespace-nowrap duration-300 shadow-lg" :class="{'w-36':pageData.openChild,'w-0':!pageData.openChild}">
            <div class="h-12 flex items-center justify-center text-hui-900 font-bold text-base border-b">泽玛珠宝</div>
            <div class="text-hui-900">
                <div class="h-12 flex items-center justify-center hover:bg-[#E8F4FF] hover:text-blue-600 cursor-pointer"
                :class="{'bg-[#E8F4FF] text-blue-600':pageData.sid==item.id}"
                v-for="(item,index) in pageData.children" :key="index" @click.stop="cmenu(item)">{{ item.title }}</div>
            </div>
        </div>
    </div>
</template>
<script setup>
    import store from '@/store'
    import { useRouter } from "vue-router"
    import {computed,reactive,onMounted } from "vue"
    const router=useRouter()
    const props=defineProps({
        dataList:{
            type:Object,
            default:[]
        }
    })

    const openList = computed(()=>store.getters.openMenuId)
    const currentPage = computed(()=> store.getters.currentMenu)
    const pageData=reactive({
        pid:0,
        sid:0,
        children:[],
        openChild:false
    })
    const select_item=(item)=>{
        pageData.pid=item.id
        if(item.children){
            pageData.children=item.children
            pageData.sid=item.children[0].id
            router.push(item.children[0].path)
            pageData.openChild=true
        }else{
            pageData.openChild=false
  

            router.push(item.path)
        }
    }
    const toogle_child=()=>{
        if(pageData.children.length==0){
            return
        }
        pageData.openChild=!pageData.openChild
    }
    const cmenu=(item)=>{
        if(item.type==2){
            pageData.sid=item.id

            router.push(item.path)
        }   
    }
    //展开当前菜单
    const currentMenu=()=>{
        props.dataList.forEach(element => {
            if(openList.value[0]==element.id){
                pageData.pid=element.id
                if(element.children){
                    pageData.children=element.children
                    element.children.forEach(son=>{
                        if(currentPage.value.indexOf(son.id)>=0){
                            pageData.sid=son.id
                            pageData.openChild=true
                        }
                    })
                }
            }
        });
    }
    onMounted(()=>{
        currentMenu()
    })
</script>