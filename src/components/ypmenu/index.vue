<template>
    <div class="yp-menu-box">
        <template v-for="(item,index) in dataList" :key="index">
            <Menuitem :item="item" :openList="openList" :currentPage="currentPage" @changeMenu="menuEvent(item)"></Menuitem>
            <template v-if="item.children&&item.children.length>0">
                <transition v-bind="hanimation">
                    <div v-show="openList.indexOf(item.id)>=0" class="menubox">
                        <Children :listItem="item.children" :openList="openList" :currentPage="currentPage" :deep="1"></Children>
                    </div>
                </transition>
            </template>
        </template>
    </div>
</template>
<script setup>
import { router } from '@/router'
import store from '@/store'
import { ref,provide,computed, onMounted } from "vue"
import Children from "./children.vue"
import Menuitem from "./menuitem.vue"
const props=defineProps({
    dataList:{
        type:Object,
        default:[]
    }
})
const openList = computed(()=>store.getters.openMenuId)
const currentPage = computed(()=> store.getters.currentMenu)
provide('menuType',{
    changeMenu:(id)=>{
        store.commit("Sys/setMenuId",id)
    }
})

const changeMenu=(id)=>{
    store.commit("Sys/setMenuId",id)
}

const menuEvent=(item)=>{
    if(item.type==1&&item.children&&item.children.length>0){
        changeMenu(item.id)
    }
    if(item.type==2){
        router.push(item.path)
    }
}

const hanimation={
    onEnter(el){
        el.style.height='auto'
        const endH=window.getComputedStyle(el).height
        el.style.height='0px'
        el.offsetHeight
        el.style.height=endH
    },
    onAfterEnter(el){
        el.style.height = null
    },
    onLeave(el){
        el.style.height = window.getComputedStyle(el).height
        el.offsetHeight
        el.style.height = '0px'
    },
    onAfterLeave(el){
        el.style.height = null
    }
}
onMounted(()=>{

})
</script>