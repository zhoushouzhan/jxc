<template>
    <div class="text-sm box-border rounded bg-white p-2 flex flex-col min-w-[1250px]">
        <div class="flex my-2 items-center pb-9">
            <slot name="header" :meta="meta">
            </slot>
        </div>
        <div class="space-y-3 pb-9">
            <slot name="list" :data="meta">
            </slot>
        </div>
    </div>

</template>
<script setup>

    import { useRoute } from 'vue-router'
    import { ref,onMounted} from 'vue'
    //获取路由信息
    const route = useRoute()


    const meta = ref(route.meta)


    onMounted(()=>{



    })

</script>
