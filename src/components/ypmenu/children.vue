<!--
 * @Author: 一品网络技术有限公司
 * @Date: 2022-09-13 21:23:37
 * @LastEditTime: 2022-09-20 12:12:00
 * @FilePath: \ypcmsvue3\src\components\global\ypmenu\menuItem.vue
 * @Description:
 * 联系QQ:58055648
 * Copyright (c) 2022 by 东海县一品网络技术有限公司, All Rights Reserved.
-->
<template>
    <div>
        <template v-for="(item,index) in listItem" :key="index">
            <Menuitem :item="item" :openList="openList" @changeMenu="menuEvent(item)" :currentPage="currentPage" :deep="deep"></Menuitem>
            <transition v-bind="hanimation">
            <div v-show="openList.indexOf(item.id)>=0" class="menubox">
                <Children v-if="item.children&&item.children.length>0" :listItem="item.children" :currentPage="currentPage" :openList="openList" :deep="deep+1"></Children>
            </div>
            </transition>
        </template>
    </div>

</template>
<script setup>
import Menuitem from "./menuitem.vue"
    import {inject} from "vue"
    import { router } from '@/router'
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
        if(item.type==1&&item.children&&item.children.length>0){
            changeMenu(item.id)
        }
        if(item.type==2){
            router.push(item.path)
        }
    }
</script>