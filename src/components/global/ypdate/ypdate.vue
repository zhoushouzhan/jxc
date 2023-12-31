<!--
 * @Author: 一品网络技术有限公司
 * @Date: 2022-07-08 14:26:03
 * @LastEditTime: 2022-09-09 10:51:46
 * @FilePath: \ypcmsvue3\src\components\global\ypdate.vue
 * @Description:
 * 联系QQ:58055648
 * Copyright (c) 2022 by 东海县一品网络技术有限公司, All Rights Reserved.
-->
<template>

  <div class="relative" @click.stop="">
    <input type="text" class="yp-input" v-model="mydate" @focus="calendar=true" :placeholder="placeholder">
    <i class="ri-calendar-line absolute top-[11px] right-1 ri-xl text-gray-400"></i>
    <div class="w-[520px] bg-white absolute top-9 left-0 border shadow-md z-10 text-xs" v-if="calendar">
      <div class="flex justify-between py-3 px-3">
        <div @click="status=='calendar'?year=year-1:year=year-7">上一年</div>
        <div v-if="status=='calendar'" @click="decMonth">上一月</div>
        <div class="flex">
          <div class="px-1" @click="status='year'">{{year}}年</div>
          <div class="px-1" @click="status='month'">{{month}}月</div>
        </div>
        <div v-if="status=='calendar'" @click="incMonth">下一月</div>
        <div @click="status=='calendar'?year=year+1:year=year+7">下一年</div>
      </div>
      <div v-if="status=='year'" class="grid grid-cols-3 text-center p-1">
        <div v-for="(item,index) in yearList" :key="index" class="py-3 hover:bg-gray-100" @click="year=item,status='calendar'">{{item}}年</div>
      </div>
      <div v-if="status=='month'" class="grid grid-cols-3 text-center p-1">
        <div v-for="(item,index) in 12" :key="index" class="py-3 hover:bg-gray-100" @click="month=item,status='calendar'">{{item}}月</div>
      </div>
      <div v-if="status=='calendar'" class="grid grid-cols-7 text-center  divide-x divide-y">
        <div v-for="(item,index) in dataList.list.week" :key="index" class="py-2 hover:bg-gray-200" :class="index==0?'border-t':''">{{item}}</div>
        <div v-for="(item,index) in dataList.list.day" :key="index" class="py-4 px-1 hover:bg-gray-200 relative"
          :class="item.day==day&&item.month==month?'bg-orange-200':'',item.month==month?'bg-gray-100':''" @click="month=item.month,day=item.day" :title="item.date">
          {{item.day}}
          <div class="text-xs absolute text-red-500 bottom-0">{{item.holidays}}</div>
        </div>
      </div>
      <div class="border-t py-1 flex items-center pl-3 pr-1">
        <div class="flex-1">{{year}}-{{month}}-{{day}}</div>
        <div class="flex">
          <button type="button" class="yp-button rounded-sm" @click="toToday">Today</button>
        </div>
      </div>
    </div>
  </div>

</template>
<script setup>
import {getData} from "@/api/data"
import {
  ref,
  watch,
  onMounted,
  reactive,
  computed,
} from 'vue'
const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String
  }

})
const emit = defineEmits(['update:modelValue'])
const mydate=ref(props.modelValue)
let today = new Date()
const year = ref(today.getFullYear())
const month = ref((today.getMonth() + 1).toString().padStart(2, '0'))
const day = ref(today.getDate())

const calendar = ref(false)
const status = ref('calendar')
const yearList = computed(() => {
  let arr = []
  for (let i = 0; i < 15; i++) {
    arr.push(year.value - 7 + i)
  }
  return arr
})
const dataList = reactive({ list: [] })

const getDate = async (ypdate) => {
  const res= await getData('/index/date', { ypdate: ypdate })
  if (res.code == 1) {
    dataList.list = res.data
  }
}
watch(mydate,(newVal)=>{
  emit('update:modelValue', newVal)
})
watch(year, (newVal, oldVal) => {
  let ypdate = newVal + '-' + month.value + '-' + day.value
  getDate(ypdate)
})
watch(month, (newVal, oldVal) => {
  let ypdate = year.value + '-' + newVal + '-' + day.value
  getDate(ypdate)
})
watch(day, (newVal, oldVal) => {
  let ypdate = year.value + '-' + newVal + '-' + day.value
  datetime()
})

const datetime = () => {
  let date =
    year.value +
    '-' +
    month.value +
    '-' +
    day.value.toString().padStart(2, '0') +
    ' '
  mydate.value=date
  emit('update:modelValue', date)
  calendar.value = false
}
const incMonth = () => {
  month.value = parseInt(month.value) + 1
  if (month.value > 12) {
    year.value++
    month.value = 1
  }
  month.value = month.value.toString().padStart(2, '0')
}
const decMonth = () => {
  month.value = month.value - 1
  if (month.value <= 0) {
    year.value--
    month.value = 12
  }
  month.value = month.value.toString().padStart(2, '0')
}
const toToday = () => {
  today = new Date()
  year.value = today.getFullYear()
  month.value = (today.getMonth() + 1).toString().padStart(2, '0')
  day.value = today.getDate().toString().padStart(2, '0')
  let date = year.value + '-' + month.value + '-' + day.value + ' '

  emit('update:modelValue', date)
  calendar.value = false
}
onMounted(() => {
  window.addEventListener('click', () => {
    calendar.value = false
  })
  let formatDate =
    today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
    getDate(formatDate)
})
</script>
