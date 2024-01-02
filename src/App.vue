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

    <video autoplay loop muted class="fixed w-full h-full top-0 left-0 -z-10 object-cover" poster="http://139.196.49.120/fm.jpg" ref="video">
        <source src="http://139.196.49.120/bgmv2/index.m3u8" type="application/x-mpegURL">
    </video>
    
    <router-view @contextmenu.prevent></router-view>
    <loading v-if="isLoading" />

</template>
<script setup>
    import Hls from 'hls.js'
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
        let hls = new Hls()
        hls.loadSource('http://139.196.49.120/bgmv2/index.m3u8')
        if (video.value) {
            hls.attachMedia(video.value)
            video.value.muted = true
        }
    })

</script>