<!--
 * @Author: 一品网络技术有限公司
 * @Date: 2022-09-26 16:22:44
 * @LastEditTime: 2022-09-26 22:10:48
 * @FilePath: \ypcmsvue3\src\pages\permissions\admin\view.vue
 * @Description:
 * 联系QQ:58055648
 * Copyright (c) 2022 by 东海县一品网络技术有限公司, All Rights Reserved.
-->
<template>
  <div class="text-sm">
    <table class="yp-table-datalist">

      <tbody>
        <tr>
          <td>ID</td>
          <td>{{r.id}}</td>
        </tr>
        <tr>
          <td>账号</td>
          <td>{{r.username}}</td>
        </tr>
        <tr>
          <td>姓名</td>
          <td>{{r.truename}}</td>
        </tr>
        <tr>
          <td>手机</td>
          <td>{{r.mobile}}</td>
        </tr>
        <tr>
          <td>录入时间</td>
          <td>{{r.create_time}}</td>
        </tr>
        <tr>
          <td>最后登录时间</td>
          <td>{{r.update_time}}</td>
        </tr>
        <tr>
          <td>最后登录IP</td>
          <td>{{r.last_ip}}</td>
        </tr>
        <tr>
          <td>角色</td>
          <td class="space-x-2">
            <span class="yp-badges-gray" v-for="(item,index) in r.roles" :key="index">{{item.title}}</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import { getData } from '@/api/data'
const props = defineProps({ adminId: Number })
const r = ref('2')
onMounted(async () => {
  if (props.adminId) {
    const resp = await getData('/admin/getadmin',{ id: props.adminId })
    if (resp.code == 1) {
      r.value = resp.data
    }
  }
})
</script>
