<template>
    <yplayout v-if="isLoad">
        <template #header>
            <i class="ri-2x text-gray-500 ml-2 ri-barcode-line"></i>
            <div class="text-xl px-3">条码打印</div>
            <div class="flex-1 flex flex-row-reverse space-x-reverse space-x-2"></div>
            <button class="yp-button yp-button-sm yp-button-orange rounded-sm" @click="goback">返回</button>
        </template>
        <template #list>
            <div class=" bg-white text-sm">
                <div>
                    <ypinput v-model="barcode" disabled="" placeholder="录入条码" @keyup.enter="get_goods"></ypinput>
                </div>
                <div v-if="formData.length">
                    <table class="yp-table">
                        <thead>
                            <tr>
                                <th class="text-center w-14">序号</th>
                                <th class=" w-36">图片</th>
                                <th>名称/条码</th>

                                <th>标签价</th>
                                <th>数量</th>
                                <th class="text-center">操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            <template v-for="(item,index) in formData">
                                <tr>
                                    <td class="text-center">{{ index+1 }}</td>
                                    <td><img :src="item.thumbFile" class="w-32 object-cover" @click="openimg(item.thumbFile)"></td>
                                    <td>
                                        <div>{{ item.title }}</div>
                                        <div class="font-bold text-pink-600 py-2 text-xl">{{ item.code }}</div>
                                    </td>
  
                                    <td>￥{{ item.labelprice }}</td>
                                    <td><ypinput v-model="item.count" placeholder="打印数量"></ypinput></td>
                                    <td>
                                        <div class="flex items-center justify-center" @click="removeitem(index)">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-5 h-5 fill-gray-600 hover:fill-red-500"><path fill="none" d="M0 0h24v24H0z"></path><path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 10.5858L9.17157 7.75736L7.75736 9.17157L10.5858 12L7.75736 14.8284L9.17157 16.2426L12 13.4142L14.8284 16.2426L16.2426 14.8284L13.4142 12L16.2426 9.17157L14.8284 7.75736L12 10.5858Z"></path></svg>
                                        </div>
                                    </td>
                                </tr>
                            </template>
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colspan="6">
                                    <div class="p-3 text-center">
                                        合计<span class="font-bold text-red-500 px-3">{{ barcodeTotal }}</span>个
                                    </div>
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
                <div class="flex justify-center py-2 space-x-2 mt-3">
                    <button class="yp-button yp-button-orange rounded" type="button" v-if="formData.length" @click="ypexport">
                        <i class="ri-printer-line ri-lg pr-1"></i>
                        生成打印模板
                    </button>
                    <button class="yp-button yp-button-black rounded" type="button" v-if="formData.length" @click="clearcode">
                        <i class="ri-format-clear ri-lg pr-1"></i>
                        清空
                    </button>
                </div>
            </div>
        </template>
    </yplayout>
</template>
<script setup>
    import {confirms,getData,Download,alter} from "@/api/data"
    import {ref,reactive,onMounted,computed} from "vue"
    const props=defineProps({
        id:{
            default:0
        },
        t:{
            default:0
        }
    })
    const emits=defineEmits(['jumpTo'])
    const barcode=ref('')
    const isLoad=ref(false)
    const formData=reactive([])
    const ids=reactive(JSON.parse(sessionStorage.getItem('printBarcode'))||[])
    const goback=()=>{
        emits('jumpTo',{to:'list'})
    }
    const barcodeTotal=computed({
        get:()=>{
            let count=0;
            formData.map((item)=>{
                count=count+parseInt(item.count)
            })
            return count
        }
    })
    const getList=async()=>{
        const resp= await getData('goods/getall',{ids:ids})
        if(resp.code==1){
            for(let i=0;i<resp.data.length;i++){
                resp.data[i].count=1
                formData.push({
                    goods_id:resp.data[i].id,
                    title:resp.data[i].title,
                    count:1,
                    labelprice:resp.data[i].labelprice,
                    code:resp.data[i].code,
                    thumbFile:resp.data[i].thumbFile
                })
            }
        }
    }
    const get_goods=async()=>{
        const resp= await getData('goods/details',{code:barcode.value})
        if(resp.code==1){
            resp.data.count=1
            formData.unshift(resp.data)
        }
        barcode.value=''
    }

    const removeitem=(index)=>{
        let removeItem=formData[index]
        ids.splice(ids.indexOf(removeItem.goods_id),1)

        formData.splice(index,1)
        sessionStorage.setItem('printBarcode',JSON.stringify(ids))
    }
    const clearcode=()=>{
        confirms({ text: '确定清空吗？' }).then(()=>{
            formData.length=0
            sessionStorage.removeItem('printBarcode')
        }).catch(()=>{
            console.log('cancel clearbarcode')
        })

    }

    //导出选中项目
    const ypexport = async() => {
        confirms({ text: '确定生成吗？' })
        .then(async () => {

            let printData=[];
            formData.map((item,index)=>{
                printData.push({id:item.goods_id,numbers:item.count})
            })

            let res=[];
            res = await Download('goods/barcode', printData)
            let blob = new Blob([res.data])
            let contentDisposition = res.headers['content-disposition']
            let patt = new RegExp('filename=([^;]+\\.[^\\.;]+);*')
            let result = patt.exec(contentDisposition)
            let thename = decodeURI(result[1]) //使用decodeURI对名字进行解码
            let downloadElement = document.createElement('a')   
            let href = window.URL.createObjectURL(blob) //创建下载的链接
            downloadElement.style.display = 'none'
            downloadElement.href = href
            downloadElement.download = thename //下载后文件名
            document.body.appendChild(downloadElement)
            downloadElement.click() //点击下载
            document.body.removeChild(downloadElement) //下载完成移除元素
            window.URL.revokeObjectURL(href) //释放掉blob对象
        })
        .catch((e) => {
            console.log('no',e)
        })
    }

    const openimg=(src)=>{
        window.open(src)
    }


    onMounted(async() => {
        await getList()
        isLoad.value=true
    })
</script>