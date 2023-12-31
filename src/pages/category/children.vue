<!--
 * @Author: 一品网络技术有限公司
 * @Date: 2022-09-01 11:14:29
 * @LastEditTime: 2022-10-27 19:28:20
 * @FilePath: \vue3\src\pages\category\children.vue
 * @Description:
 * 联系QQ:58055648
 * Copyright (c) 2022 by 东海县一品网络技术有限公司, All Rights Reserved.
-->
<template>
    <template v-for="(item,index) in listItem" :key="index">
        <CategoryItem :item="item" :open-list="openList"  @changeMenu="menuEvent(item)" :deep="deep"></CategoryItem>
        <transition v-bind="hanimation">
            <div v-show="openList.indexOf(item.id)>=0" class="menubox">
                <Children v-if="item.children&&item.children.length>0" :listItem="item.children" :openList="openList" :deep="deep+1"></Children>
            </div>
        </transition>
    </template>
</template>
<script setup>
    import CategoryItem from "./categoryitem.vue"
    import {inject} from "vue"
    const props = defineProps({
            listItem: {
                type:Object,
                default: []
            },
            openList:{
                type:Object,
                default:[]
            },
            currentPage:{
                default:[]
            },

            deep: {
                type:Number,
                default: 0
            }
    })
    const menuType = inject('menuType')
    const changeMenu=(id)=>{
        menuType.changeMenu(id)
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
    const menuEvent=(item)=>{
        if(item.children&&item.children.length>0){
            changeMenu(item.id)
        }
    }
</script>