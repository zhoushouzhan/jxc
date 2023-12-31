<template>
    <Body></Body>
</template>    
<script setup>
    import { h, useSlots,useAttrs } from 'vue';
    const props=defineProps(['case'])
    const slots=useSlots()

    const Body=()=>{
        if(slots[props.case]){
            console.log(slots[props.case]())
            return h("div",{class:"flex"},{default:()=>[slots[props.case]()]})
        }
        if(slots['default']){
            return h("div",{},{default:()=>[slots['default']()]})
        }
    }
</script>
