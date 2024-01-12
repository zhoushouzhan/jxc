<template>
    <div class="text-xs text-gray-400">
        <div class="py-1.5">{{ item.name }}</div>
        <div class="py-1.5">{{ item.create_time }}</div>
        <div class="flex space-x-2 py-1.5 justify-between">
            <div class="uppercase" :class="{'text-blue-600':type=='category','text-pink-600':type=='mod','text-green-600':type=='free'}">{{ forhost(item) }}</div>
            <div>{{ item.category_id }}</div>
            <div></div>
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-4 h-4 fill-gray-400 hover:fill-green-600 duration-300"><path d="M12.0003 3C17.3924 3 21.8784 6.87976 22.8189 12C21.8784 17.1202 17.3924 21 12.0003 21C6.60812 21 2.12215 17.1202 1.18164 12C2.12215 6.87976 6.60812 3 12.0003 3ZM12.0003 19C16.2359 19 19.8603 16.052 20.7777 12C19.8603 7.94803 16.2359 5 12.0003 5C7.7646 5 4.14022 7.94803 3.22278 12C4.14022 16.052 7.7646 19 12.0003 19ZM12.0003 16.5C9.51498 16.5 7.50026 14.4853 7.50026 12C7.50026 9.51472 9.51498 7.5 12.0003 7.5C14.4855 7.5 16.5003 9.51472 16.5003 12C16.5003 14.4853 14.4855 16.5 12.0003 16.5ZM12.0003 14.5C13.381 14.5 14.5003 13.3807 14.5003 12C14.5003 10.6193 13.381 9.5 12.0003 9.5C10.6196 9.5 9.50026 10.6193 9.50026 12C9.50026 13.3807 10.6196 14.5 12.0003 14.5Z"></path></svg>
            </div>
        </div>
    </div>
</template>
<script setup>
import {ref,reactive} from "vue"
const props=defineProps({
    item:{
        default:[]
    }
})
const type=ref('category')

const forhost=(item)=>{
    let title=''
    let category=item.category
    let mod=item.mod
    if(category !=null){
        title=category.title
    }
    if(title==''&&mod==null){
        type.value='free'
        title='闲置'
    }
    if(title==''&&mod!=null){
        type.value='mod'
        title=mod.name
    }
    return title
}

</script>