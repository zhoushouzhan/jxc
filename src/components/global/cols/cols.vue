<template>
  <div class="flex py-1" v-if="isload">
    <div class="w-36 text-right pr-5 text-sm flex pt-2 justify-end items-center" v-if="col.alias">{{col.alias}}</div>
    <div class="flex-1 pt-2">
      <div class="flex items-center">
        <div class="text-xs text-gray-500 pr-1" v-if="col.prefix">{{col.prefix}}</div>
        <component :is="componentId" v-model="colval" :col="col" :formData="formData" v-if="col"></component>
        <div class="text-xs text-gray-500 pl-1" v-if="col.suffix">{{col.suffix}}</div>
      </div>
      <div class="text-xs py-1 text-gray-400" v-if="col.tips&&col.formitem!='password'">{{col.tips}}</div>
    </div>
  </div>
</template>
<script setup>
  import { ref, watch,onMounted,shallowRef } from 'vue'
  import Tree from "./tree.vue"
  import Dselect from "./dselect.vue"
  import Linkage from "./linkage.vue"
  const props = defineProps({
    modelValue: {
      default: ''
    },
    col: {
      type: Object
    },
    formData: {
      type: Object
    }
  })
  const emit = defineEmits(['update:modelValue'])
  const isload=ref(false)
  const colval = ref(props.modelValue)
  const componentId=shallowRef('')
  watch(colval, (n) => {
    emit('update:modelValue', n)
  })
  onMounted(() => {
    let formitem=props.col.formitem
    switch(formitem){
      case 'tree':
      componentId.value=Tree
      break;
      case 'select':
      componentId.value=Dselect
      break;
      case 'linkage':
      componentId.value=Linkage
      break;
      default:
        componentId.value='yp'+formitem
    }
    isload.value=true
  })


</script>
