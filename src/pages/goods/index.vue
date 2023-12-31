<template>
    <component :is='componentId' :id="id" :page="page" v-if="isload" @jumpTo="jumpTo"></component>
</template>
<script setup>
    import { ref,shallowRef,onMounted } from 'vue';
    import List from './list.vue'
    import Form from './form.vue';
    import Barcode from './barcode.vue';
    import Import from './import.vue';

    const isload=ref('')
    const componentId=shallowRef(List)
    const id=ref(0)
    const page=ref(0)


    const jumpTo=(obj)=>{
        if(obj.to=='add'){
            id.value=0
            page.value=obj.page
            componentId.value=Form
        }
        if(obj.to=='list'){
            componentId.value=List
        }
        if(obj.to=='edit'){
            id.value=obj.id
            page.value=obj.page
            componentId.value=Form
        }
        if(obj.to=='barcode'){
            id.value=0
            componentId.value=Barcode
        }
        if(obj.to=='import'){
            id.value=0
            componentId.value=Import
        }
    }


    onMounted(() => {
        isload.value=true

    })

</script>