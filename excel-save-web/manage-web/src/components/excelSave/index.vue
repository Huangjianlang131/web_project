<template>
  <div style="top: 0;width: 100%;height:100%;">
    <!-- <input type="file" class="inputBtn" @change="loadExcel" /> -->
    <!-- <a-upload
      ref="upload"
      @change="loadExcel"
    >
      <a-button> <a-icon type="upload" /> 打开文件 </a-button>
    </a-upload> -->
    <!-- <a-button @click="loadExcel">打开文件</a-button> -->

    <div id="luckysheet" style="width: 100%;height:100%;"></div>
    <a-button class="uploadBtn" @click="saveExcel">保存</a-button>
    <a-button class="uploadBtn" @click="downloadExcel">导出</a-button>
    <div v-show="isMaskShow" id="tip">Downloading</div>
  </div>
</template>

<script>
import { exportExcel, getExcelFile, processCellData } from './components/exports.js'
import LuckyExcel from './luckyexcel'
import { base_url } from '../../../env/dev'
import * as XLSX from 'xlsx';

export default {
  props: {
    fileObj: {
      type: File,
      require: true
    },
    fileName: {
      type: String, 
      require: true
    },
    filePath: {
      type: String,
      require: true
    }
  },
  data () {
    return {
      isMaskShow: false,
      selected: '',
    };
  },
  mounted () {
      this.loadExcel(this.fileObj)
  },
  methods: {
    loadExcel(evt) {
      // const file = evt.target.files
      const file = evt
      console.log(file)
      // if (files == null || files.length == 0) {
      //   alert('No files wait for import')
      //   // this.$refs.upload.clearFiles()
      //   return
      // }

      let name = file.name
      let suffixArr = name.split('.'),
      suffix = suffixArr[suffixArr.length - 1]
      if (suffix != 'xlsx') {
        alert('Currently only supports the import of xlsx files')
        return
      }
      var fileReader = new FileReader();
      fileReader.onload = () => {
        var data = fileReader.result; // 获取 Blob 数据
        // 处理数据
        // 处理luckyExcel组件无法读取批注的问题
        const xlsxSheet = XLSX.read(data, {type: 'array'})
        console.log(xlsxSheet)
        LuckyExcel.transformExcelToLucky(file, (exportJson, luckysheetfile) => {
          if (exportJson.sheets == null || exportJson.sheets.length == 0) {
            alert('Failed to read the content of the excel file, currently does not support xls files!')
            return
          }
          for(let i = 0; i < exportJson.sheets.length; i++) {
            exportJson.sheets[i].celldata.forEach((item) => {
              let { r, c } = item;
              var cellRef = XLSX.utils.encode_cell({ r: r, c: c });
              // 获取工作簿的第一个工作表
              const sheetName = xlsxSheet.SheetNames[i];
              const worksheet = xlsxSheet.Sheets[sheetName];
              var cell = worksheet[cellRef];
              if (cell && cell.c) {
                  const cText = cell.c && cell.c !== 0 && cell.c[0].t;
                  item.v.ps = {
                      value: cText,
                      isshow: false
                  };
              }
            });
          }
          let newExportJson = exportJson
          // 解决从excel表中导入带有公式的内容时，存在部分公式生效部分不生效的情况
          for (const item of newExportJson.sheets) {
              let calcChain = [];
              let index = item.index;
              for (const item2 of item.celldata) {
                  if (typeof(item2.v.f) !== 'undefined') {
                      calcChain.push({
                          r: item2.r,
                          c: item2.c,
                          index,
                      })
                  }
              }
              item.calcChain = calcChain;
          }
          console.log(newExportJson)
          window.luckysheet.destroy()

          window.luckysheet.create({
            container: 'luckysheet', //luckysheet is the container id
            lang: 'zh',
            showinfobar: false,
            data: newExportJson.sheets,
            title: newExportJson.info.name,
            userInfo: newExportJson.info.name.creator,
            // forceCalculation:true, //强制刷新公式
            showtoolbar: true,
            showtoolbarConfig: {
              postil: true, //'批注'
            }
          })
        })
      }
      fileReader.readAsArrayBuffer(file)


    },
    downloadExcel() {
      exportExcel(luckysheet.getAllSheets(), this.fileName.split('.')[0])
    },
    async saveExcel() {
      let file = await getExcelFile(luckysheet.getAllSheets(), this.fileName)
      let newFilePath = ''
      for (let i = 1; i < this.filePath.split('/').length - 1; i++) {
        newFilePath = newFilePath + '/' + this.filePath.split('/')[i]
      }
      let param = new FormData()
      param.append('filepath_father', newFilePath)
      param.append('file', file)
      param.append('reqType', 1)
      this.$axios.post(base_url + 'excel_save', param)
          .then(res => {
              if(res.data.status === 0) {
                  this.$message.success(res.data.msg)
              } else {
                  this.$message.error(res.data.msg)
              }
          })
          .finally(() => {
              this.$emit('backClick')
          })
    },
  }
}

</script>

<style scoped>
.luckysheet {
  margin: 0px;
  padding: 0px;
  position: absolute;
  width: 100%;
  left: 0px;
  top: 30px;
  bottom: 0px;
}

.uploadBtn {
  font-size: 16px;
  margin-left: 10px;
}

.tip {
  position: absolute;
  z-index: 1000000;
  left: 0px;
  top: 0px;
  bottom: 0px;
  right: 0px;
  background: rgba(255, 255, 255, 0.8);
  text-align: center;
  font-size: 40px;
  align-items: center;
  justify-content: center;
  display: flex;
}
.inputBtn {

}
</style>

