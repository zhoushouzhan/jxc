<template>
    <component :is="componentId" :id="id" @jumpTo="jumpTo"></component>
</template>
<script setup>
  import { shallowRef,  reactive, ref } from 'vue'
  import List from './list'
  import Form from './form'
  const componentId = shallowRef(List)
  const item = reactive({ data: {} })
  const page=ref(0)
  const id=ref(0)

  const jumpTo = (obj) => {
    if(obj.to=='list'){
        componentId.value=List
    }
    if(obj.to=='edit'){
        id.value=obj.id
        page.value=obj.page
        componentId.value=Form
    }

  }

</script>
