<!--
 * @Author: 一品网络技术有限公司
 * @Date: 2022-08-06 08:31:02
 * @LastEditTime: 2022-10-26 21:07:47
 * @FilePath: \vue3\src\pages\files\index.vue
 * @Description:
 * 联系QQ:58055648
 * Copyright (c) 2022 by 东海县一品网络技术有限公司, All Rights Reserved.
-->
<template>
    <div class="bg-white w-full h-full rounded flex space-x-2 text-sm">
        <div class="w-36 border-r border-hui-50">
            <div class="text-center border-b p-3">素材分类</div>
        </div>
        <div class="flex-1 space-y-5">
            <div class="flex items-center justify-between">
                <div class="p-2 space-x-2">
                    <button class="btn btn-lan">上传素材</button>
                    <button class="btn btn-hong">删除素材</button>
                </div>
                <div>
                    <div>
                        <ypinput v-model="searchData.keyword" placeholder="关键词" @keyup.enter="search"></ypinput>
                    </div>
                </div>
            </div>
            <div>
                <div class="flex flex-wrap">
                    <div v-for="(item,index) in dataList" class="w-52 h-52 overflow-hidden flex flex-col justify-center items-center">
                        <div class="w-32 h-32 overflow-hidden" :key="index" @click="toggle(item.id)">
                            <img :src="item.filepath" class="hover:scale-125 duration-300 w-full h-full object-cover">
                        </div>
                        <div class="text-center py-2 w-32 whitespace-nowrap overflow-hidden text-ellipsis">{{ item.name }}</div>
                    </div>
                </div>
            </div>
            <div class="mt-4" v-show="pageData.pageCount>1">
                <yppage @topage="topage" :pageData="pageData" />
            </div>
        </div>
    </div>
</template>
<script setup>
import store from "@/store"
import { getData, postData, alter, confirms } from '@/api/data'
import { ref, watch, provide, reactive, onMounted } from 'vue'
import Infos from "./infos.vue"
const props = defineProps({
    selnum: {
        default: 0
    },
    sids: {
        default: []
    },
    isopen: {
        default: 0
    },
    ftype: 'image',
    params: {
        default: []
    }
})
const emits = defineEmits(['useFiles'])
const isLoad = ref(false)
const upload_params = reactive(props.params)
//获取远程图片
const openRemoteBox = ref(false)
const remoteData = ref('')
const saveRemoteData = async () => {
    if (remoteData.value == '') {
        alter({ type: 'alter-error', text: '请输入远程URL' })
        return
    }
    const resp = await postData("files/downloadFile", { str: remoteData.value, category_id: props.category_id, ypcms_type: props.ypcms_type })
    if (resp.code == 1) {
        getDataList()
        remoteData.value = ''
        openRemoteBox.value = false
    }
}
const category = ref([])
//搜索

const ftype_list = reactive([
    { id: "image", title: "图片" },
    { id: "video", title: "视频" }
])

const searchData = reactive({
    category_id: props.params.category_id || 0,
    ypcms_id: props.params.ypcms_id || 0,
    page: 0,
    ftype: props.ftype,
    keyword: ''
})
//监听模型更新
watch(() => searchData.mod_id, (n, o) => {
    getDataList()
})
//监听栏目更新
watch(() => searchData.category_id, (n, o) => {
    getDataList()
})


//分页
const pageData = reactive({
    totalRecords: 0,//总记录数
    pageCount: 0,//总页数
    currentPage: 1//当前页
});
const topage = (page) => {
    pageData.currentPage = page
    searchData.page = page
    getDataList()
}

//模型数据
const mod_list = reactive([])
const getMod = async () => {
    let resp = await getData('mod/index')
    if (resp.code == 1) {
        mod_list.length = 0
        Object.keys(resp.data).map((k) => {
            mod_list.push({ id: resp.data[k].id, title: resp.data[k].alias })
        })
    }
}

//选中
const selectIds = reactive([])
const useFiles = () => {
    let arr = dataList.filter((vol, key) => {
        if (selectIds.indexOf(vol.id) >= 0) {
            return true
        }
    })
    emits('useFiles', arr)
}
const toggle = (i) => {
    if (selectIds.indexOf(i) >= 0) {
        selectIds.splice(selectIds.indexOf(i), 1)
    } else {
        if (props.selnum == 0 || selectIds.length < props.selnum) {
            selectIds.push(i)
        } else {
            alter({ type: 'alter-error', text: '超出大最值' })
        }
    }
}
//上传
const uploader = ref()
const onUpload = () => {
    //上传前准备好附件归属信息
    store.dispatch("GET_UPLOAD_PARAMS", props.params)
    uploader.value.onupload()
}

const readyList = reactive([])
provide('uploadHandle', {
    readyList: readyList,
    addFile: (obj) => {
        readyList.push(obj)
    },
    removeFile: (id) => {
        readyList.filter((val, index) => {
            if (val.id == id) {
                readyList.splice(index, 1)
            }
        })
    },
    reload: () => {
        getDataList()
    }
})
const dataList = reactive([])
const search = () => {
    getDataList()
}

const getDataList = async () => {
    readyList.length = 0
    dataList.length = 0
    const res = await getData('/files', searchData)
    if (res.code == 1) {
        pageData.totalRecords = res.data.total
        pageData.pageCount = res.data.last_page

        res.data.data.map((item, index) => {
            dataList.push(item)
        })
    }

}
//删除
const destory = async () => {
    confirms({ text: '确认删除吗？' })
        .then(async () => {
            const res = await postData('/files/delete', { ids: selectIds })
            if (res.code) {
                alter({ type: 'alter-success', text: res.msg })
                getDataList()
            } else {
                alter({ type: 'alter-error', text: res.msg })
            }
        })
        .catch((e) => { })
}

onMounted(async () => {


    if (props.category_id) {
        const res = await getData('category/getDetails', { id: props.category_id })
        if (res.code == 1) {
            category.value = res.data
        }

    }
    await getDataList()
    if (props.sids) {
        Object.keys(props.sids).map((k) => {
            selectIds.push(props.sids[k])
        })
    }
    //获取模型数据
    await getMod()
    isLoad.value = true
})
</script>