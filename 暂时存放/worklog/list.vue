<template>
    <Narbar title="服务日志"></Narbar>
    <van-tabs v-model:active="active" background="white" title-active-color="red" @change="UpdateData">
        <van-tab title="日志列表" name="catchlist">
            <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
                <van-cell-group inset style="margin-top:1rem;" v-for="item in list" :key="item">
                    <van-cell @click="workLogClick">
                        <van-field v-model="item.date" label="日期" readonly></van-field>
                        <van-field v-if="item.complete.length > 0" v-model="item.complete" rows="1" autosize readonly
                            label="已完成工作:" type="textarea" />
                        <van-field v-if="item.unfinished.length > 0" v-model="item.unfinished" rows="1" autosize
                            readonly label="未完成工作:" type="textarea" />
                        <van-field v-if="item.coordination.length > 0" v-model="item.coordination" rows="1" autosize
                            readonly label="需协调工作:" type="textarea" />
                    </van-cell>
                </van-cell-group>
            </van-list>
        </van-tab>
        <van-tab title="填写日志">
            <van-form @submit="onSubmit" style="margin-top:1rem">
                <van-cell-group inset>
                    <van-field v-if="workTime.id > 0" input-align="right" readonly name="date" :value="workTime.date"
                        label="日期" />
                    <van-field v-model="workTime.complete" rows="2" autosize label="已完成工作" type="textarea"
                        maxlength="100" placeholder="请输入留言" show-word-limit />
                    <van-field v-model="workTime.unfinished" rows="2" autosize label="未完成工作" type="textarea"
                        maxlength="100" placeholder="请输入留言" show-word-limit />
                    <van-field v-model="workTime.coordination" rows="2" autosize label="需协调工作" type="textarea"
                        maxlength="100" placeholder="请输入留言" show-word-limit />
                    <van-field name="uploader" label="图片上传">
                        <template #input>
                            <van-uploader v-model="value" />
                        </template>
                    </van-field>

                </van-cell-group>
                <div style="margin: 16px;">
                    <van-button round block type="danger" native-type="submit">
                        提交
                    </van-button>
                </div>
            </van-form>

        </van-tab>
    </van-tabs>
</template>


<script lang="ts" setup>
import Narbar from '../../components/Narbar.vue';
import { ref, reactive, onMounted } from 'vue'
import { getWorkLogList } from "../../api/index";
// import { checkPermission } from "../../config/permission";
import { formatDate } from "../../utlis/date";
import { Toast } from 'vant'
import { editWorkLog, fileUpdate, fileDownload } from '../../api/index';
import { canvasDataBase64 } from "../../utlis/compression";



// table第一栏的数据
const active = ref(0);
let list = reactive([])
let loading = ref(false)
let finished = ref(false)


// table 第二栏数据
const value = ref([
    { url: 'https://fastly.jsdelivr.net/npm/@vant/assets/leaf.jpeg' },
]);

// 接口约束对象的属性类型
interface WorkTime {
    complete: string,
    unfinished: string,
    coordination: string,
    id: number
    date: string
}
let workTime: WorkTime = reactive({
    id: 0,
    type: 1,
    complete: '',
    unfinished: '',
    coordination: '',
    date: ''
})
const showGetFile = ref(false)
const actions = reactive([{ name: "拍照" }, { name: "从相册选照片" }])
const isFileDisabled = ref(false)
const fileList = reactive([])
const isSubmiting = ref(false)


function workLogClick() {
    active.value = 1
    workTime.complete = list.complete
    workTime.unfinished = list.unfinished
    workTime.coordination = list.coordination
}
function onLoad() {

    list.length = 0
    let maxId = 0;
    if (list.length > 0) {
        maxId = list[list.length - 1].row_num;
    }

    let data = {
        page_number: maxId,
        page_size: 20,
        type: 1
    };

    getWorkLogList(data).then(async (response) => {
        let result = await response.result || [];
        if (!response.state) {
            Toast({
                message: "加载日志数据失败，原因：" + response.message,
                type: "fail",
            });
            return;
        }

        if (result.length < 20) {
            finished.value = true;
        }
        result.forEach((task: any) => {
            task.date = formatDate(task.date)
            list.push(task);
        });
        console.log(list)
        loading.value = false;
    })
}

// 发两次请求不合适啊
function UpdateData() {
    onLoad()
}

function onSubmit() {

    if (workTime.complete.trim().length <= 0 && workTime.unfinished.trim().length <= 0 && workTime.coordination.trim().length <= 0) {
        Toast({
            message: "内容为空",
            type: "fail",
        });
        return;
    }
    isSubmiting.value = true;
    let file_data_list = reactive([]);
    (fileList || []).forEach((fl) => {
        file_data_list.push({ id: fl.response_file_id });
    });
    workTime.file_data_list = file_data_list;
    editWorkLog(workTime).then((response) => {
        if (!response.state) {
            Toast({
                message: "保存工时信息失败，原因：" + response.message,
                type: "fail",
            });
            isSubmiting.value = false;
            return;
        }

        isSubmiting.value = false;
    });
    active.value = 0
}

function getBase64(file: Blob) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
}

function CameraResult(value) {
    isFileDisabled = false;
    if (value != null && value.length > 0) {
        //let blob = dataURLtoBlob(value);
        //let file = blobToFile(blob, 'image');
        //let file = dataURLtoFile("data:image/jpeg;base64, " + value, "image");
        canvasDataBase64("data:image/jpeg;base64, " + value, (blob) => {
            var compresFile = new File([blob], "image.jpeg", {
                type: blob.type,
            });
            let data = new FormData();
            data.append("type", "过程检验");
            data.append("file", compresFile);
            fileUpdate(data).then((response) => {
                if (!response.state) {
                    $toast({
                        message: "上传图片失败，原因：" + response.message,
                        type: "fail",
                    });
                    return;
                }

                var reader = new FileReader();
                reader.readAsDataURL(blob);
                reader.onloadend = () => {
                    var base64data = reader.result;
                    fileList.push({
                        url: base64data,
                        isImage: true,
                        response_file_id: response.result.id,
                    });
                };
            });
        });
    }
}


// 选择拍照还是相册选择照片
function onGetFileSelect(item) {
    if (item.name == "拍照") {
        //CameraResult(workTime.descritpion);
        invokeXamarinFormsAction("PHOTO|CAMERA");
    } else if (item.name == "从相册选照片") {
        invokeXamarinFormsAction("SelectPhoto|CAMERA");
    }
}

// 取消 
function onCancel() {
    isFileDisabled.value = false;
}

// 图片删除
function fileClickUnload(file: Blob) {
    isFileDisabled.value = true;
    showGetFile.value = true;
}


// function IsIos() {
//     var userAgent = window.navigator.userAgent.toLowerCase(),
//         safari = /safari/.test(userAgent),
//         ios = /iphone|ipod|ipad/.test(userAgent);

//     if (ios) {
//         return true;
//     } else {
//         return false;
//     }

// }


onMounted(() => {
    window.CameraResult = CameraResult;
})

</script>

<style scoped>
</style>