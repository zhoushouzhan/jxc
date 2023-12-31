<template>
    <ypselect :itemList="list" v-model="selectId" v-if="isload"></ypselect>
</template>
<script setup>
    import {getData} from "@/api/data"
    import {ref,watch,onMounted} from "vue"
    const props=defineProps({
        modelValue:{
            default:0
        },
        col:Object
    })
    const emits = defineEmits(['update:modelValue'])
    const isload=ref(false)
    const selectId=ref(props.modelValue)
    const list=ref([])
    watch(selectId,(n)=>{
        emits('update:modelValue', n)
    })
    onMounted(async () => {
        let colext=JSON.parse(props.col.extends)
        let resp= await getData(colext.url,{pid:colext.pid})
        if(resp.code==1){
            list.value=resp.data
        }
        isload.value=true
    })

</script>