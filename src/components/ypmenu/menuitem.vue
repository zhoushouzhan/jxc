<template>
    <div :class="ypclass" @click.stop="cmenu(item)">
        <div class="icon">
            <i :class="item.meta.icon" class="px-1" v-if="deep==0&&item.meta.icon"></i>
        </div>
        <div v-for="v in deep" class="w-5" :key="v"></div>
        <div class="flex-1">
            {{ item.title }}
        </div>
        <div v-show="item.children&&item.children.length>0">
            <div class="yp-menu-title-arrow" :class="openList.indexOf(item.id)<0?' rotate-0':'rotate-180'">
                <i class="ri-arrow-down-s-line"></i>
            </div>
        </div>
    </div>
</template>
<script setup>
    import { useRouter } from "vue-router";
    import {computed} from 'vue'
    const router=useRouter()
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
    const emits=defineEmits(['changeMenu'])
    const ypclass=computed(()=>{
        if(props.currentPage.indexOf(props.item.id)<0){
            return 'yp-menu-title'
        }else{
            if(props.item.children){
                return 'yp-menu-title-parent-current'
            }else{
                return 'yp-menu-title-current'
            }
        }
    })
    const cmenu=(item)=>{
        if(item.type==2&&item.path==router.currentRoute.value.path){
            window.location.reload()
        }else{
            emits('changeMenu',item)
        }    
    }
</script>