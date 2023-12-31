<template>
    <component :is='componentId' :id="Id" @jumpCom="jumpCom"></component>
</template>
<script setup>
    import { ref } from 'vue'
    import List from './list.vue'
    import Form from "./form.vue"
    import { shallowRef } from 'vue'
    const Id=ref(0)
    const componentId = shallowRef(List)
    const jumpCom = (obj) => {
        if(obj.to=='add'){
            componentId.value=Form
            Id.value=0
        }
        if(obj.to=='edit'){
            Id.value=obj.id
            componentId.value=Form
            
        }
        if(obj.to=='list'){
            Id.value=0
            componentId.value=List
        }
    }
</script>