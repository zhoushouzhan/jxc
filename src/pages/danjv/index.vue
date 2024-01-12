<template>
    <component :is='componentId' :id="Id" :page="page" :t="t" @jumpCom="jumpCom"></component>
</template>
<script setup>
    import { ref } from 'vue'
    import List from './list.vue'
    import In from "./in.vue"
    import Move from "./move.vue"
    import Moveview from "./moveview.vue"
    import View from "./view.vue"
    import Checkorder from "./checkorder.vue"
    import Checkmove from "./checkmove.vue"
    import { shallowRef } from 'vue'
    const Id=ref(0)
    const page=ref(0)
    const t=ref(0)
    const componentId = shallowRef(List)
    const jumpCom = (obj) => {
        if(obj.to=='in'){
            componentId.value=In
            Id.value=obj.id
            page.value=obj.page
            t.value=obj.t
        }
        if(obj.to=='move'){
            componentId.value=Move
            Id.value=obj.id
            page.value=obj.page
            t.value=obj.t
        }
        if(obj.to=='moveview'){
            componentId.value=Moveview
            Id.value=obj.id
            page.value=obj.page
            t.value=obj.t
        }
        if(obj.to=='edit'){
            Id.value=obj.id
            page.value=obj.page
            componentId.value=Form
        }
        if(obj.to=='view'){
            Id.value=obj.id
            page.value=obj.page
            componentId.value=View
        }

        if(obj.to=='checkorder'){
            Id.value=obj.id
            page.value=obj.page
            componentId.value=Checkorder
        }
        if(obj.to=='checkmove'){
            Id.value=obj.id
            page.value=obj.page
            componentId.value=Checkmove
        }

        if(obj.to=='list'){
            Id.value=0
            componentId.value=List
        }
    }
</script>