<!--
 * @Author: 一品网络技术有限公司
 * @Date: 2022-07-08 14:26:03
 * @LastEditTime: 2022-09-09 10:51:09
 * @FilePath: \ypcmsvue3\src\components\global\ypdatetime.vue
 * @Description:
 * 联系QQ:58055648
 * Copyright (c) 2022 by 东海县一品网络技术有限公司, All Rights Reserved.
-->
<template>

  <div class="relative" @click.stop="">
    <input type="text" class="yp-input" :value="modelValue" @focus="calendar=true">
    <i class="ri-time-line absolute top-[11px] right-1 ri-xl text-gray-400"></i>
    <div class="w-[520px] bg-white absolute top-9 left-0 border shadow-md z-10 text-sm" v-if="calendar">
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
        <div>{{year}}-{{month}}-{{day}} {{hour}}:{{minute}}:{{second}}</div>
        <div class="flex-1 px-2 flex items-center space-x-1">
          <select class="border px-2 py-1" v-model="hour">
            <option :value="(i-1).toString().padStart(2,'0')" v-for="i in 24" :key="i">{{(i-1).toString().padStart(2,'0')}}</option>
          </select>
          <div>时</div>
          <select class="border px-2 py-1" v-model="minute">
            <option :value="(i-1).toString().padStart(2,'0')" v-for="i in 60" :key="i">{{(i-1).toString().padStart(2,'0')}}</option>
          </select>
          <div>分</div>
          <select class="border px-2 py-1" v-model="second">
            <option :value="(i-1).toString().padStart(2,'0')" v-for="i in 60" :key="i">{{(i-1).toString().padStart(2,'0')}}</option>
          </select>
          <div>秒</div>
        </div>
        <div class="flex">
          <button type="button" class="yp-button yp-button-red rounded-sm mr-1" @click="calendar=false">OK</button>
          <button type="button" class="yp-button rounded-sm" @click="toToday">Now</button>
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
  getCurrentInstance
} from 'vue'
const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  }
})
let today = new Date()
const date = ref()
const year = ref(today.getFullYear())
const month = ref((today.getMonth() + 1).toString().padStart(2, '0'))
const day = ref(today.getDate())
const hour = ref(today.getHours())
const minute = ref(today.getMinutes())
const second = ref(today.getSeconds())
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

const getDate = async(ypdate) => {
  const res= await getData('/index/date', { ypdate: ypdate })
  if (res.code == 1) {
    dataList.list = res.data
  }


}

watch(year, (newVal, oldVal) => {
  let ypdate = newVal + '-' + month.value + '-' + day.value
  getDate(ypdate)
  datetime()
})
watch(month, (newVal, oldVal) => {
  let ypdate = year.value + '-' + newVal + '-' + day.value
  getDate(ypdate)
  datetime()
})
watch(day, (newVal, oldVal) => {
  let ypdate = year.value + '-' + newVal + '-' + day.value
  datetime()
})
watch(hour, (newVal, oldVal) => {
  datetime()
})
watch(minute, (newVal, oldVal) => {
  datetime()
})
watch(second, (newVal, oldVal) => {
  datetime()
})
const emit = defineEmits(['update:modelValue'])
const datetime = () => {
  let datetime =
    year.value +
    '-' +
    month.value +
    '-' +
    day.value.toString().padStart(2, '0') +
    ' ' +
    hour.value +
    ':' +
    minute.value +
    ':' +
    second.value
  emit('update:modelValue', datetime)
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
  hour.value = today.getHours().toString().padStart(2, '0')
  minute.value = today.getMinutes().toString().padStart(2, '0')
  second.value = today.getSeconds().toString().padStart(2, '0')
  let datetime =
    year.value +
    '-' +
    month.value +
    '-' +
    day.value +
    ' ' +
    hour.value +
    ':' +
    minute.value +
    ':' +
    second.value
  calendar.value = false
  emit('update:modelValue', datetime)
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
