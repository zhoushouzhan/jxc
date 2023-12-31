<template>
    <div class="group inline-block relative cursor-pointer w-full min-w-max" ref="select" @click="show=true" @mouseleave="show=false">
      <div class="text-sm border flex items-center rounded h-8" style="white-space:nowrap;" ref="titleBox">
        <div class="flex-1 pl-2">{{topname}}</div>
        <i class="ri-arrow-down-s-line duration-300 mr-2" :class="{'-rotate-180':show}"></i>
      </div>
      <div class="overflow-hidden w-full max-h-0 duration-300 flex flex-col text-gray-800 bg-white absolute z-30  top-[31px] border-t border-l border-r rounded" ref="optionsNode" :class="{'max-h-[300px] overflow-y-auto':show}"
        v-show="show">
        <div v-for="(options,index) in itemList" class="py-1.5 px-2 border-b hover:bg-gray-700 hover:text-white duration-300 whitespace-nowrap" :class="{'text-red-600':options.value==modelValue}" @click.stop="selected(options)">
          {{ options.title }}
        </div>
      </div>
    </div>
  </template>
  <script setup>
  import { ref, onMounted, watch, nextTick } from 'vue'
  const props = defineProps({
    modelValue: '',
    itemList: Object
  })
  const emit = defineEmits(['update:modelValue'])
  const show = ref(false)
  const topname = ref('--请选择--')
  const titleBox = ref(null)
  const select = ref(null)
  const optionsNode = ref(null)
  const getAttr = () => {
    nextTick(() => {
      if(optionsNode.value.scrollWidth){
        titleBox.value.style.width = optionsNode.value.scrollWidth + 'px'
      }
    })
  }
  const selected=(item)=>{
    topname.value = item.title
    emit('update:modelValue', item.value)
    show.value = false
  }
  watch(()=>props.itemList,(n)=>{
    topname.value='--请选择--'
  })
  onMounted(() => {
    if (props.itemList) {
      props.itemList.forEach((item) => {
        if (item.value == props.modelValue) {
          topname.value = item.title
        }
      })
    }
    getAttr()
  })
  </script>
  