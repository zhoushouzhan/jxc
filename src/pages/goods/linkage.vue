
<template>
    <div class="flex space-x-1" v-if="isload">
      <div v-for="(item,index) in group" :key="index" class="flex items-center whitespace-nowrap">
        <ypselect :itemList="item" v-model="path[index]" @click.capture="change(index)" @click.stop="isUpdatePath=true"></ypselect>
      </div>
    </div>
</template>
<script setup>
  import { getData } from '@/api/data'
  import { ref, onMounted, reactive, watch } from 'vue'
  const props = defineProps({
    modelValue: {
      default: 0
    },
    category:{
      default:[]
    }
  })
  const isload=ref(false)
  //保存父级ID
  const pid = ref(0)
  const isUpdatePath=ref(false)
  const path = reactive([])
  const pos = ref(0)
  const group = reactive([])
  //菜单更新
  watch(path, (newVal) => {
    if(!newVal[pos.value]){
      emit('update:modelValue', newVal[newVal.length-1])
      return
    }
    if(isUpdatePath.value){
      pid.value = newVal[pos.value]
      getList()
      emit('update:modelValue', newVal[newVal.length-1])
    }

  })
  //获取数据
  const getList = async () => {
    if(typeof pid.value=='undefined'){
      isload.value=true
      return
    }
    const res = await getData('category/getSelect', { pid: pid.value, ids: path })
    if (res.code == 1) {
      if(group.length){
        group.length = pos.value + 1
        path.length = pos.value+1
      }
      res.data.forEach((item) => {
        let options = []
        Object.keys(item).forEach((key) => {
          options.push({
            title: item[key].title,
            value: item[key].id,
            bfe: item[key].bfe,
            slen: item[key].slen
          })
        })
        group.push(options)
      })

    }
    isload.value=true
  }
  const emit = defineEmits(['update:modelValue'])
  const change = (index) => {
    pos.value = index
  }
  onMounted(() => {
    if(props.modelValue){
      let arr=props.category.path.split(',')
      for(let i in arr){
        
        if(arr[i]>0&&arr[i]!=pid.value){
          path.push(parseInt(arr[i]))
        }
      }
      path.push(props.modelValue)
    }
    getList()
  })

  </script>