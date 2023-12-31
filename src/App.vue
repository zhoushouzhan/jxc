<!--
 * @Author: 一品网络技术有限公司
 * @Date: 2022-06-21 16:12:37
 * @LastEditTime: 2022-09-12 09:06:26
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
    import { computed, onUnmounted } from 'vue'
    import { useStore } from 'vuex'
    const store = useStore()
    let isLoading = computed(() => {
        return store.state.isLoading
    })

    onUnmounted(() => {
        localStorage.removeItem('token')
    })
</script>