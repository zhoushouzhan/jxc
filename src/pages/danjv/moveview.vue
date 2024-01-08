<template>
    <div class="p-5" v-if="isload">

        <div class="text-center">
            <div class="text-xl px-2">出库单查看</div>
        </div>
        <div>
            
            <div class="flex justify-between px-3">
                <div class="flex items-center space-x-2">
                    <div>操作员：</div>
                    <div>{{ res.admin.truename }}</div>
                </div>
                <div class="flex items-center space-x-2">
                    <div>录入时间：</div>
                    <div>{{ res.create_time }}</div>
                    <div class="pl-5">单号：</div>
                    <div>{{ res.sn }}</div>
                </div>
            </div>
            <div>
                <table class="yp-table-p-2">
                    <thead>
                        <tr>
                            <th class="text-center w-20">序号</th>
                            <th class="w-32">图片</th>
                            <th>名称</th>
                            <th>零售价</th>
                            <th>数量</th>
                            <th>备注</th>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-for="(item,index) in res.bill">
                            <tr>
                                <td class="text-center">{{ index+1 }}</td>
                                <td><img :src="item.thumbFile" class="w-32 h-32 object-cover" @click="openimg(item.thumbFile)"></td>
                                <td class="space-y-2">
                                    <div>{{ item.title }}</div>
                                    <div>{{ item.code }}</div>
                                </td>
                                <td>
                                    ￥{{ item.sellprice }}
                                </td>
                                <td>
                                    {{ item.numbers }}
                                </td>
                                <td>
                                    {{ item.intro }}
                                </td>
                            </tr>
                        </template>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="flex justify-center py-2 space-x-2 mt-3">
            <button class="yp-button yp-button-orange rounded" type="button" @click="goback">
                <i class="ri-arrow-go-back-fill ri-lg pr-1"></i>
                返回
            </button>
            <button class="yp-button yp-button-black rounded" @click="ypexport">
                <i class="ri-barcode-line ri-lg pr-1"></i>
                打印所有条码
            </button>

        </div>
    </div>
</template>

<script setup>
    import {getData,confirms,Download,alter} from '@/api/data'
    import {ref,reactive,onMounted} from 'vue'
    
    const props=defineProps({
        type:{
            default:1
        },
        id:{
            default:0
        }
    })
    const emits=defineEmits(['jumpCom'])
    const isload=ref(false)
    const res=reactive({})
    const printData=reactive([])
    const printBarcode=reactive(JSON.parse(sessionStorage.getItem('printBarcode'))||[])
    const read=async(id)=>{
        const resp= await getData('kucundan/read',{id:id})
        if(resp.code==1){
            for(let k in resp.data){
                res[k]=resp.data[k]
            }

            res.bill.map((item,index)=>{
                printData.push({'id':item.goods_id,'numbers':item.numbers})
            })
        }
    }
    const goback=()=>{
        emits('jumpCom',{to:'list'})
    }
    const openimg=(src)=>{
        window.open(src)
    }

    //导出选中项目
    const ypexport = async() => {
        confirms({ text: '确定生成吗？' })
        .then(async () => {
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
            formData.length=0
            sessionStorage.removeItem('printBarcode')
        })
        .catch((e) => {
            console.log('no',e)
        })
    }





    onMounted(async () => {
        if(props.id){
           await read(props.id)
        }
        
        isload.value=true

    })

</script>