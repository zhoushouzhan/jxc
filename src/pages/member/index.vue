<template>
  <component :is='componentId' :id="Id" @jumpCom="jumpCom"></component>
</template>
<script setup>
  import { ref } from 'vue'
  import List from './list.vue'
  import Add from "./add.vue"
  import { shallowRef } from 'vue'
  const Id=ref(0)
  const componentId = shallowRef(List)
  const jumpCom = (obj) => {
      if(obj.to=='add'){
          componentId.value=Add
          Id.value=0
      }
      if(obj.to=='edit'){
          Id.value=obj.id
          componentId.value=Add
          
      }
      if(obj.to=='list'){
          Id.value=0
          componentId.value=List
      }
  }
</script>