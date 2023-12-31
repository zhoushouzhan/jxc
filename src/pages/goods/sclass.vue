<template>
    <div class="flex items-center" v-for="(item,index) in childData" :key="index">
        <div class="w-24 text-right pr-5 flex-shrink-0">{{ item.title }}</div>
        <div class="flex-1">
            <div class="grid grid-cols-6 gap-3">
                <div v-for="(vo,k) in item.children" :key="k">
                    <ypradio :title="vo.title" :value="vo.id" v-model="sclass"></ypradio>
                </div>
               
            </div>
        </div>
    </div>
</template>

<script setup>
    import {getData,alter} from "@/api/data"
    import {ref,reactive,onMounted,watch} from "vue"
    const props=defineProps({
        modelValue:{
            default:[]
        },
        cid:{
            default:0
        }
    })
    const emits=defineEmits(['update:modelValue'])
    const sclass=ref(0)
    const childData=reactive([])
    watch(()=>props.cid,(n)=>{
        getTree(n)
    })
    watch(sclass,(n)=>{
        emits('update:modelValue',n)
    })

    const getTree=async(id)=>{
        if(!id){
            return
        }
        sclass.length=0
        const resp=await getData('Classify/getchild',{id:id})
        if(resp.code==1){
            childData.length=0
            Object.keys(resp.data).map((k)=>{
                childData[k]=resp.data[k]
            })
        }
    }
    onMounted(() => {
        getTree(props.cid)
        sclass.value=props.modelValue
    })

</script>