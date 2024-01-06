<!--
 * @Author: 一品技术 5166651888@163.com
 * @Date: 2023-12-31 19:38:15
 * @LastEditors: 一品技术 5166651888@163.com
 * @LastEditTime: 2024-01-06 09:58:12
 * @FilePath: /jxcui/src/components/global/yptree/yptree.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="group inline-block relative cursor-pointer w-full min-w-max" ref="select" @click="show=true" @mouseleave="show=false">
    <div class="text-sm border flex items-center rounded h-8" style="white-space:nowrap;" ref="titleBox">
      <div class="flex-1 pl-2">{{topname}}</div>
      <template v-if="modelValue">
        <i class="ri-close-circle-fill duration-300 mr-2 hover:text-hong-300" @click.stop="removeId"></i>
      </template>
      <template v-else>
        <i class="ri-arrow-down-s-line duration-300 mr-2" :class="{'-rotate-180':show}"></i>
      </template>
      

    </div>
    <div class="overflow-hidden w-full max-h-0 duration-300 flex flex-col text-gray-800 bg-white rounded-sm absolute z-30  top-[31px]" ref="optionsNode" :class="{'max-h-[300px] overflow-y-auto':show}">
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
    },
    defaultTitle:{
      default:'--请选择--'
    }
  })
  const emit = defineEmits(['update:modelValue'])
  const chitem = ref('')
  const show = ref(false)//是否显示菜单
  const topname = ref(props.defaultTitle)//选取的标题
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
    console.log(newVal)
    emit('update:modelValue', newVal.id+'')
    show.value = false
  })
  const removeId=()=>{
    topname.value=props.defaultTitle
    emit('update:modelValue',null)
  }
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
