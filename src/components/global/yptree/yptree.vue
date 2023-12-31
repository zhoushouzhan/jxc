<template>
    <div class="group inline-block relative cursor-pointer w-full min-w-max" ref="select" @click="show=true" @mouseleave="show=false">
      <div class="text-sm border flex items-center rounded h-8" style="white-space:nowrap;" ref="titleBox">
        <div class="flex-1 pl-2">{{topname}}</div>
        <i class="ri-arrow-down-s-line duration-300 mr-2" :class="{'-rotate-180':show}"></i>
      </div>
      <div class="overflow-hidden w-full max-h-0 duration-300 flex flex-col text-gray-800 bg-white rounded-sm absolute z-30  top-[31px]" ref="optionsNode" :class="{'max-h-[300px] overflow-y-auto':show}"
        v-show="show">
        <ypmenu v-model="chitem" :dataList="itemList" :value="modelValue" ref="ypmenu_dom"></ypmenu>
      </div>
    </div>
  </template>
  <script setup>
    import { ref, onMounted, watch, nextTick } from 'vue'
    const props = defineProps({
      modelValue: '',
      itemList: Object,
      col:{
        default:[]
      }
    })
    const emit = defineEmits(['update:modelValue'])
    const chitem = ref('')
    const show = ref(false)//是否显示菜单
    const topname = ref('--请选择--')//选取的标题
    const titleBox = ref(null)
    const select = ref(null)
    const optionsNode = ref(null)
    const ypmenu_dom=ref(null)
    const getAttr = () => {
      nextTick(() => {
        if(optionsNode.value.scrollWidth){
          titleBox.value.style.width = optionsNode.value.scrollWidth + 'px'
        }
      })
    }
    
    watch(chitem, (newVal, oldVal) => {
      topname.value = newVal.title
      emit('update:modelValue', newVal.id+'')
      show.value = false
    })
    watch(()=>props.modelValue,(newVal,oldVal)=>{
      if(!newVal){
        topname.value='--请选择--'
      }
      if(optionsNode.value.scrollWidth){
          titleBox.value.style.width = optionsNode.value.scrollWidth+ 'px'
      }
    })
    
    onMounted(() => {
      if (props.itemList) {
        props.itemList.forEach((item) => {
          if (item.id == props.modelValue) {
            topname.value = item.title
          }
        })
      }
      getAttr()
    })
  </script>
  