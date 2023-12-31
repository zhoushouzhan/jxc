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
    <div class="flex items-center space-x-3 border-b hover:bg-gray-50 duration-300">
        <div class="p-2 w-52 flex space-x-1 items-center cursor-pointer group" @click.stop="emit('changeMenu',item)">
            <div v-for="v in deep" class="w-5" :key="v"></div>
            <div v-if="item.islast==0">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" class="fill-yellow-500"><path d="M12.4142 5H21C21.5523 5 22 5.44772 22 6V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3H10.4142L12.4142 5Z"></path></svg>
            </div>
            <div v-else>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" class="fill-gray-300"><path d="M20 22H4C3.44772 22 3 21.5523 3 21V3C3 2.44772 3.44772 2 4 2H20C20.5523 2 21 2.44772 21 3V21C21 21.5523 20.5523 22 20 22ZM7 6V10H11V6H7ZM7 12V14H17V12H7ZM7 16V18H17V16H7ZM13 7V9H17V7H13Z"></path></svg>
            </div>


            <div class=" group-hover:text-blue-600">
                {{ item.title }}
            </div>
            <div v-if="item.children">
                ({{ item.children&&item.children.length||0 }})
            </div>
        </div>
        <div class="p-2 w-36">{{ item.id||'未定义' }}</div>
        <div class="flex-1"></div>
        <div class="p-2 w-36 flex space-x-2 justify-end">
          <button class="yp-button yp-button-gray yp-button-sm rounded" @click="categoryInject.editItem(item.id)" v-if="categoryInject.editbtn">编辑</button>
          <button class="yp-button yp-button-red yp-button-sm rounded" @click="categoryInject.removeItem(item.id)" v-if="categoryInject.deletebtn">删除</button>
        </div>
    </div>
</template>
<script setup>
    import {computed,inject} from 'vue'
    const props=defineProps({
        item:{
            type:Object
        },
        openList:{
            type:Object
        },
        currentPage:{
            default:[]
        },
        deep:{
            type:Number,
            default: 0
        }
    })
    const emit=defineEmits(['changeMenu'])
    const categoryInject = inject('category')
</script>