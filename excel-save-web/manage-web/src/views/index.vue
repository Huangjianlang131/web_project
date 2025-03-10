<template>
    <div id="main" style="width: 100%;height:100%;">
        <webHeader></webHeader>
        <a-spin :spinning="spinning" tip="加载中..." style="height: 88%;">
            <div style="display: flex;justify-content: space-between;">
                <div class="backBt" :style="{visibility: initPath !== '' || initPath.includes('.') == true ? 'visible' : 'hidden'}" @click="backClick">
                    <a-icon type="left" /><a-icon type="left" />
                    <span style="margin-left: 5px;">返回上一级</span>
                </div>
                <div class="createFile" v-if="editVisible == false">
                    <a-upload
                        :before-upload="beforeUpload"
                        :fileList="loadFileList"
                        accept=".xlsx"
                        style="margin-right: 20px;display: inline-block;"
                    >
                        <a-button> <a-icon type="upload" />上传文件</a-button>
                    </a-upload>
                    <a-button @click="createFolder">新建文件夹</a-button>
                    <a-popconfirm
                        :title="'是否删除？'"
                        placement="bottomRight"
                        ok-text="确定"
                        cancel-text="取消"
                        @confirm="deleteFile()"
                    >
                        <a-button style="margin-left: 20px;" @click="clickDelete($event)">删除</a-button>
                    </a-popconfirm>
                </div>
            </div>
            <div :key="folderListId" v-if="editVisible == false" style="width: 100%;height: calc(100vh - 150px);padding: 0 0 0 20px;overflow-y: auto;">
                <div :id="filename" v-for="(filename, index) in folderList" :key="index" class="file" @click="fileClick($event, filename)">
                    <img :src="fileIcon(filename)" :class="fileIconClass(filename)"/>
                    <div class="file_name" :title="filename">{{filename}}</div>
                </div>
            </div>
            <div v-else style="width: 100%;height: calc(100vh - 150px);">
                <excel-save :key="excelSaveKey" :fileObj="fileObj" :fileName="fileName" :filePath="initPath" @backClick="backClick"></excel-save>
                <!-- <UniverSheet id="sheet" ref="univerRef" :data="fileObj" /> -->
            </div>
        </a-spin>

        <!-- 新建文件夹 -->
        <a-modal
            :width="600"
            :visible="createVisible"
            :maskClosable="false"
            :keyboard="false"
            :title="'新建'"
            @ok="createSubmit"
            @cancel="createCancel"
        >				
            <a-form-model
                v-bind="{
                    labelCol: { span: 6 },
                    wrapperCol: { span: 14 },
                }"
                :model="createForm"
                :rules="createFormRules"
                ref="createFormRef"
                style="margin-left: 0px"
            >
                <a-form-model-item label="文件夹名称" prop="name">
                    <a-input placeholder="请输入名称" v-model="createForm.name"/>
                </a-form-model-item>
            </a-form-model>
        </a-modal>
    </div>
</template>

<script>
import webHeader from './header/index.vue'
import excelSave from './excelSave/index.vue'
import UniverSheet from './excelSave/UniverSheet.vue'
import { request } from '@/api/index'
import { base_url } from '../../env/dev'

export default {
    components: {
        webHeader,
        excelSave,
        UniverSheet
    }, 
    data () {
        return {
            folderList: [],
            initPath: '',
            editVisible: false,
            folderListId: 0,
            fileObj: {},
            fileName: '',
            spinning: false,
            createForm: {
                name: '',
            },
            createVisible: false,
            createFormRules: {
                name:[
                    { required: true, message: "请输入名称", trigger: "blur" },
                    { validator: this.nameValid, trigger: "change" }
                ]
            },
            isClicked: false,
            clickedId: '',
            clickedIdOld: '',
            loadFileList: [],
            excelSaveKey: 0,
            univerSheetData: {},
        };
    },
    mounted () {
        this.getFileList('')
        var mainDiv = document.getElementById("main")
        mainDiv.addEventListener("click", (e) => {
            if(this.clickedIdOld !== '' && this.editVisible === false) {
                var folderElement_old = document.getElementById(this.clickedIdOld)
                folderElement_old.className = 'file'
                this.clickedIdOld = ''
            }
        })
    },
    methods: {
        // 校验
        nameValid(rule, value, callback) {
            const pattern = /^[\w\u4e00-\u9fa5]+$/
            if (value) {
                if (!pattern.test(value)) {
                callback(new Error('名称只能由数字、大小写字母、中文以及下划线组成'))
                } else {
                callback()
                }
            } else {
                callback()
            }
        },
        getFileList(filepath) {
            this.spinning = true
            let param = new FormData()
            param.append('filepath', filepath)
            this.$axios.post(base_url + 'get_filename', param)
                .then(res => {
                    console.log(res.data)
                    if(res.data.status === 0) {
                        if(res.data.data.length > 0) {
                            this.folderList = res.data.data
                            // this.clickedId = ''
                            // this.clickedIdOld = ''
                        } else {
                            this.folderList = []
                        }
                        this.clickedId = ''
                        this.clickedIdOld = ''
                    }
                })
                .finally(() => {
                    this,this.spinning = false
                })
        },
        getFile(filepath, filename) {
            this.spinning = true
            let param = new FormData()
            param.append('filepath', filepath)
            this.$axios.post(base_url + 'read_file', param, {responseType: "blob"}).then(res => {
                this.fileName = filename
                this.fileObj = this.dataToFile(res.data)
                this.editVisible = true
                this.folderListId += 1
                this.excelSaveKey += 1
                // let blob = new Blob([res.data], {type: 'application/vnd.ms-excel'})
                // var link = document.createElement('a')
                // link.href = window.URL.createObjectURL(blob)
                // link.download = '123.xlsx'
                // link.click()
                // //释放内存
                // window.URL.revokeObjectURL(link.href)
            })
            .finally(() => {
                this,this.spinning = false
            })
        },
        //excel二进制流转file对象
        dataToFile(data) {
            // 创建Blob对象
            const blobObj = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
            // 创建File对象
            // const file = new File([blobObj], "filename.xlsx", {
            //     type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            // })
            const file = new File([blobObj], "filename.xlsx", {type: blobObj.type})
            return file
        },
        fileIcon(filename) {
            if(filename.includes('.xls') || filename.includes('.xlsx') || filename.includes('.csv')) {
                return require('@/assets/jujia/excel.png')
            } else if(filename.includes('.doc') || filename.includes('.docx')) {
                return require('@/assets/jujia/word.png')
            } else {
                return require('@/assets/jujia/folder.png')
            }
        },
        fileIconClass(filename) {
            if(filename.includes('.xls') || filename.includes('.xlsx') || filename.includes('.csv')) {
                return 'file_icon1'
            } else if(filename.includes('.doc') || filename.includes('.docx')) {
                return 'file_icon1'
            } else {
                return 'file_icon'
            }
        },
        fileClick(e, filename) {
            // 阻止事件在DOM中的进一步传播，即停止事件冒泡
            e.stopPropagation()
            var folderElement = document.getElementById(filename)
            folderElement.className = 'file_click'
            if(this.clickedIdOld !== filename && this.clickedIdOld !== '') {
                var folderElement_old = document.getElementById(this.clickedIdOld)
                folderElement_old.className = 'file'
            }
            this.clickedIdOld = filename
            if(this.clickedId === filename) {
                this.isClicked = true
            } else {
                this.clickedId = filename
            }
            setTimeout(() => {
                this.clickedId = ''
                this.isClicked = false
            }, 1000)
            if(this.isClicked === true && this.clickedId === filename) {
                this.initPath = this.initPath + '/' + filename
                if(filename.includes('.xls') || filename.includes('.xlsx') || filename.includes('.csv')) {
                    this.getFile(this.initPath, filename)
                } else if(filename.includes('.doc') || filename.includes('.docx')) {

                } else {
                    this.getFileList(this.initPath)
                    var folderElement_old = document.getElementById(this.clickedIdOld)
                    folderElement_old.className = 'file'
                    this.clickedIdOld = ''
                }
            }
        },
        backClick() {
            if(this.fileName.includes('.xls') || this.fileName.includes('.xlsx') || this.fileName.includes('.csv')) {
                this.editVisible = false
            }
            let initPathList = this.initPath.split('/')
            let newInitPath = ''
            for (let i = 1; i < initPathList.length - 1; i++) {
                newInitPath += '/' + initPathList[i]
            }
            this.initPath = newInitPath == '/'?'':newInitPath
            this.getFileList(this.initPath)
        },
        createFolder() {
            this.createVisible = true
        },
        createSubmit() {
            this.createVisible = false
            this.$refs.createFormRef.validate((valid) => {
                if (valid) {
                    let param = new FormData()
                    param.append('filepath_father', this.initPath)
                    param.append('filename', this.createForm.name)
                    this.$axios.post(base_url + 'file_create', param)
                        .then(res => {
                            if(res.data.status === 0) {
                                this.$message.success(res.data.msg)
                            } else {
                                this.$message.error(res.data.msg)
                            }
                        })
                        .finally(() => {
                            this.getFileList(this.initPath)
                            this.$refs.createFormRef.resetFields()
                        })
                }
            })

        },
        createCancel() {
            this.createVisible = false
        },
        beforeUpload(file) {
            let param = new FormData()
            param.append('filepath_father', this.initPath)
            param.append('file', file)
            param.append('reqType', 0)
            this.$axios.post(base_url + 'excel_save', param)
                .then(res => {
                    if(res.data.status === 0) {
                        this.$message.success(res.data.msg)
                    } else {
                        this.$message.error(res.data.msg)
                    }
                })
                .finally(() => {
                    this.getFileList(this.initPath)
                })
            return false // 阻止默认上传行为
        },
        clickDelete(e) {
            // 阻止事件在DOM中的进一步传播，即停止事件冒泡
            e.stopPropagation()
        },
        deleteFile() {
            let param = new FormData()
            param.append('filepath_father', this.initPath)
            param.append('filename', this.clickedIdOld)
            this.$axios.post(base_url + 'file_delete', param)
                .then(res => {
                    if(res.data.status === 0) {
                        this.$message.success(res.data.msg)
                    } else {
                        this.$message.error(res.data.msg)
                    }
                })
                .finally(() => {
                    var folderElement_old = document.getElementById(this.clickedIdOld)
                    folderElement_old.className = 'file'
                    this.clickedIdOld = ''
                    this.getFileList(this.initPath)
                })
        },
    }
}

</script>

<style scoped>
/* .file{
    width: 90px;
    height: 90px;
    display: inline-block;
    margin: 10px 0 0 20px;
    cursor: pointer;
    padding: 2px;
    justify-content: center;
}
.file_click{
    width: 90px;
    height: 90px;
    display: inline-block;
    margin: 10px 0 0 20px;
    cursor: pointer;
    padding: 2px;
    background-color: rgba(204, 232, 255, 1.00);
    border: 1px solid rgba(153, 209, 255, 1.00) !important;
}
.file_icon{
    width: 60px;
    margin-left: 12px;
}
.file_icon1{
    width: 50px;
    margin: 0 0 7px 17px;
} */
.file{
    width: 95%;
    height: 33px;
    margin: 5px 0 0 20px;
    cursor: pointer;
    padding: 2px;
    border: 1px solid rgba(255, 255, 255, 1.0) !important;
    white-space: nowrap;
}
.file_click{
    width: 95%;
    height: 33px;
    margin: 5px 0 0 20px;
    cursor: pointer;
    padding: 2px;
    background-color: rgba(204, 232, 255, 1.00);
    border: 1px solid rgba(153, 209, 255, 1.00) !important;
    white-space: nowrap;
}
.file_icon{
    width: 25px;
    margin: 0 10px 17px 5px;
}
.file_icon1{
    width: 20px;
    margin: 2px 10px 17px 5px;
}
.file_name{
    display: inline-block;
    width: 100%; /* 定义容器宽度 */
    white-space: nowrap; /* 不换行 */
    overflow: hidden; /* 超出部分隐藏 */
    text-overflow: ellipsis; /* 使用省略符号 */
}
.backBt{
    margin: 10px 0 3px 20px;
    cursor: pointer;
}
.createFile{
    margin: 10px 10px 3px 0;

}
</style>

  