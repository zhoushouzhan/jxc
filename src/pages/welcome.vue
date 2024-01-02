<!--
 * @Author: 一品网络技术有限公司
 * @Date: 2022-06-22 12:07:53
 * @LastEditTime: 2024-01-01 10:33:18
 * @FilePath: \vue3\src\pages\welcome.vue
 * @Description:
 * 联系QQ:58055648
 * Copyright (c) 2022 by 东海县一品网络技术有限公司, All Rights Reserved.
-->
<template>
    <div class="p-2 grid grid-cols-6 gap-5" v-if="isLoad">
        <div class="bg-lan-300 text-white rounded-lg shadow flex items-center">
            <div>
                <i class="ri-database-2-fill ri-5x"></i>
            </div>
            <div>
                <div class="px-2 text-sm text-gray-300">总库存</div>
                <div class="text-4xl px-2">{{ stockcount }}</div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { getData, postData, alter } from '@/api/data'
import axios from '@/axios'
import store from '@/store'
import { ref, reactive, onMounted,computed } from 'vue'
import { VueEcharts } from 'vue3-echarts'
const isLoad=ref(false)
const stockcount=ref(0)
const getStock=async()=>{
    const stocks= await getData('goodsitem/getcount')
    if(stocks.code==1){
        stockcount.value=stocks.data
    }
}

onMounted(async () => {
    await getStock()
    isLoad.value=true
})
</script>