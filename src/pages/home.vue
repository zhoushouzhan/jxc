<!--
 * @Author: 一品网络技术有限公司
 * @Date: 2022-06-22 11:12:24
 * @LastEditTime: 2024-01-09 22:01:22
 * @FilePath: \ypcmsvue3\src\pages\home.vue
 * @Description:
 * 联系QQ:58055648
 * Copyright (c) 2022 by 东海县一品网络技术有限公司, All Rights Reserved.
-->
<template>
    <div class="flex overflow-hidden h-full">
      	<div class="h-full">
        	<YPMENU :dataList="routes"></YPMENU>
      	</div>
      	<div class="flex-1 flex flex-col">
			<div class="h-12 flex items-center pl-4 flex-shrink-0 space-x-2 border-b">
				<div>
					<i class="ri-home-2-line text-gray-500 text-xl"></i>
				</div>
				<div>
					<BreadCrumb />
				</div>
				<div class="flex-1 flex justify-end items-center space-x-2 text-sm mr-5">
					<div class="flex items-center space-x-5">
						<div class="flex items-center">
							<div>当前用户：</div>
							<div class="font-bold text-blue-500">
								<router-link to="/my">{{ store.state.Sys.sysinfo.admin.truename }}</router-link>
							</div>
						</div>
						<div class="flex items-center">
							<div>部门：</div>
							<div>
								{{ store.state.Sys.sysinfo.admin.roles[0].title }}
							</div>
						</div>
					</div>
					<div class=" text-white bg-stone-900 hover:bg-blue-600 cursor-pointer w-7 h-7 rounded-full border flex items-center justify-center" @click="clearCache()" v-tooltip.bottom="'清理缓存'">
						<i class="ri-brush-2-fill text-xl"></i>
					</div>
					<div class=" text-white bg-stone-900 hover:bg-blue-600 cursor-pointer w-7 h-7 rounded-full border flex items-center justify-center" @click="dropevent('loginOut')" v-tooltip.bottom="'安全退出'">
						<i class="ri-login-circle-fill text-xl"></i>
					</div>
				</div>
			</div>
			<div class="flex-1 bg-hui-5 bg-opacity-75 p-3 h-full overflow-auto flex flex-col">
				<router-view :key="key"></router-view>
			</div>
      	</div>
    </div>
</template>
<script setup>
	import {computed } from 'vue'
	import { router } from '@/router'
	import { getData,alter,confirms } from '@/api/data'
	import store from '@/store'
	import YPMENU from '@/components/ypmenu'
	import BreadCrumb from '@/components/BreadCrumb'
	const key = router.path
	const clearCache = async () => {
	const resp= await getData('index/clearCache')
		if(resp.code) {
			alter({ type: 'alter-success', text: resp.msg })
		}
	}
	const routes = computed(()=>store.getters.routes)
	const dropevent=(type)=>{
		switch(type){
			case 'personHome':
			break;
			case 'editpass':
			break;
			case 'loginOut':
			confirms({ text: '确定要退出吗？' })
			.then(()=>{
				store.commit('User/LOGIN_OUT')
				alter({ type: 'alter-success', text: '您已成功退出' })
				router.push('/login')
			})
			break;
		}
	}
</script>
