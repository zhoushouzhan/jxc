<!--
 * @Author: 一品网络技术有限公司
 * @Date: 2022-06-21 16:12:37
 * @LastEditTime: 2024-01-02 14:09:10
 * @FilePath: \ypcmsvue3\src\App.vue
 * @Description:
 * 联系QQ:58055648
 * Copyright (c) 2022 by 东海县一品网络技术有限公司, All Rights Reserved.
-->

<template>
    <router-view @contextmenu.prevent></router-view>
    <loading v-if="isLoading" />
</template>
<script setup>
    import { ref,computed, onUnmounted,onMounted } from 'vue'
    import { useStore } from 'vuex'
    const store = useStore()
    let isLoading = computed(() => {
        return store.state.isLoading
    })
    const video=ref(null)
    onUnmounted(() => {
        localStorage.removeItem('token')
    })
    onMounted(()=>{

    })

</script>