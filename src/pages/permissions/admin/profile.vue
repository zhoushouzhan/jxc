<template>
    <table class="yp-table-datalist">
        <tbody>
            <tr>
                <td class="font-bold text-right w-36">ID：</td>
                <td>{{ r.id }}</td>
            </tr>
            <tr>
                <td class="font-bold text-right">账号：</td>
                <td>{{ r.username }}</td>
            </tr>
            <tr>
                <td class="font-bold text-right">姓名：</td>
                <td>{{ r.truename }}</td>
            </tr>
            <tr>
                <td class="font-bold text-right">手机：</td>
                <td>{{ r.mobile }}</td>
            </tr>
            <tr>
                <td class="font-bold text-right">录入时间：</td>
                <td>{{ r.create_time }}</td>
            </tr>
            <tr>
                <td class="font-bold text-right">最后登录时间：</td>
                <td>{{ r.update_time }}</td>
            </tr>
            <tr>
                <td class="font-bold text-right">最后登录IP：</td>
                <td>{{ r.last_ip }}</td>
            </tr>
            <tr>
                <td class="font-bold text-right">角色：</td>
                <td class="space-x-2">
                    <span class="yp-badges-gray" v-for="(item, index) in r.roles" :key="index">{{ item.title }}</span>
                </td>
            </tr>
        </tbody>
    </table>

    <div class="text-center py-3">
        <button class="yp-button yp-button-green rounded" type="button" @click="emits('edit','edit')">
            <i class="ri-edit-box-line ri-lg pr-1"></i>
            编辑
        </button>
    </div>

</template>
<script setup>

    const props=defineProps({
        r:Object
    })
    const emits=defineEmits(['edit'])
</script>