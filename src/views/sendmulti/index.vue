<template>
  <div class="app-container">
    <div style="margin:0 0 5px 20px"></div>
    <el-form ref="form" :model="form" :rules="rules" label-width="120px">
      <el-row>
        <el-col :span="18">
          <el-form-item label="发送内容" prop="text">
            <el-input
              tabindex="1"
              type="textarea"
              placeholder="请输入内容"
              v-model="form.text"
              maxlength="160"
              show-word-limit
              :autosize="{minRows:5, maxRows:10}"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="18">
          <el-form-item label="电话号码" prop="mobiles">
            <el-input
              tabindex="2"
              type="textarea"
              placeholder="最多输入100个号码,用空格' ', 逗号','或分号';'来分隔"
              v-model="form.mobiles"
              :autosize="{minRows:6, maxRows:10}"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="18">
          <el-form-item>
            <div>
              <input
                ref="excel-upload-input"
                class="excel-upload-input"
                type="file"
                accept=".xlsx, .xls"
                @change="fileSelected"
              />
              <div
                class="drop"
                @drop="handleDrop"
                @dragover="handleDragover"
                @dragenter="handleDragover"
              >
                输入Excel文件
                <el-button
                  :loading="loadingExcel"
                  style="margin-left:16px;"
                  type="success"
                  size="mini"
                  @click="handleUpload"
                >输入Excel</el-button>
              </div>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="18">
          <el-form-item>
            <el-button type="warning" @click="clear">重置</el-button>
            <el-button :loading="loading" type="primary" @click.native.prevent="send">发送</el-button>
            <!-- </el-upload> -->
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import { validText, validMobile, validNumber } from '@/utils/validate'
import { postUserSendMultiple } from '@/api/user'
import XLSX from 'xlsx'

export default {
  name: 'MultiMsg',
  data() {
    let mobilesValidate = (rule, value, callback) => {
      let outMobiles = this.fetchMobiles(value)

      if (outMobiles.length < 1) {
        callback(new Error('不能为空'))
        return
      }

      console.log('mobiles:')
      console.log(outMobiles)
      this.mobilesArr = []
      for (let i = 0; i < outMobiles.length; i++) {
        if (!validMobile(outMobiles[i])) {
          let info = '第 ' + (i + 1).toString() + ' 个号码错误'
          callback(new Error(info))
          return
        } else if (this.mobilesArr.indexOf(outMobiles[i]) !== -1) {
          let info = '第 ' + (i + 1).toString() + ' 个号码重复'
          callback(new Error(info))
        } else {
          this.mobilesArr.push(outMobiles[i])
        }
      }

      callback()
    }
    let textValidate = (rule, value, callback) => {
      if (value.length === 0) {
        callback(new Error('内容非空'))
      } else if (validText(value) > 0) {
        callback(new Error('内容过长' + validText(value)))
      } else {
        callback()
      }
    }
    return {
      maxTextLength: 170,
      maxMobiles: 100,
      loading: false,
      loadingExcel: false,
      mobilesArr: [],
      form: {
        mobiles: '',
        text: ''
      },
      rules: {
        mobiles: [
          {
            validator: mobilesValidate,
            required: true
          }
        ],
        text: [
          {
            validator: textValidate,
            required: true
          }
        ]
      }
    }
  },
  methods: {
    isExcel(file) {
      return /\.(xlsx|xls|csv)$/.test(file.name)
    },
    handleDrop(e) {
      console.log('handleDrop()')
      e.stopPropagation()
      e.preventDefault()
    },
    handleDragover(e) {
      e.stopPropagation()
      e.preventDefault()
      e.dataTransfer.dropEffect = 'copy'
    },
    handleUpload() {
      console.log('handleUpload()')
      this.$refs['excel-upload-input'].click()
      // how to clear input ?
    },
    fileSelected(e) {
      console.log('fileSelected()')
      let files = e.target.files
      if (files.length < 1) {
        return
      }
      console.log(files)
      const h = this.$createElement
      if (!this.isExcel(files[0])) {
        this.$notify({
          title: '非Excel文件',
          message: h('i', { style: 'color: red' }, '文件类型'),
          duration: 2000
        })
      } else {
        this.readData(files[0]).then(
          response => {
            console.log('open exls file OK')
            console.log(response)
            this.form.mobiles = response.join(',  ')
            this.$refs['excel-upload-input'].value = ''
          },
          err => {
            console.log('open exls file failed', err)
          }
        )
      }
    },
    readData(file) {
      console.log('readData()', file)
      this.loadingExcel = true
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = e => {
          const data = e.target.result
          const workbook = XLSX.read(data, { type: 'array' })
          const firstSheetName = workbook.SheetNames[0]
          const worksheet = workbook.Sheets[firstSheetName]
          // const header = this.getHeaderRow(worksheet)
          const headers = this.getHeaderRow(worksheet)
          console.log('headers[0]:')
          const header = headers[0]
          console.log(header)
          // const results = XLSX.utils.sheet_to_json(worksheet)
          const results = XLSX.utils.sheet_to_json(worksheet)
          console.log('results:')
          console.log(results)
          let mobiles = []
          if (validMobile(header)) {
            mobiles.push(header)
          }
          results.forEach(item => {
            mobiles.push(item[header].toString())
          })
          console.log('mobiles:')
          console.log(mobiles)
          // this.generateData({ header, results })
          this.loadingExcel = false
          resolve(mobiles)
        }
        reader.readAsArrayBuffer(file)
      })
    },
    getHeaderRow(sheet) {
      console.log('getHeaderRow()')
      const headers = []
      const range = XLSX.utils.decode_range(sheet['!ref'])
      let C
      const R = range.s.r
      /* start in the first row */
      for (C = range.s.c; C <= range.e.c; ++C) {
        /* walk every column in the range */
        const cell = sheet[XLSX.utils.encode_cell({ c: C, r: R })]
        /* find the cell in the first row */
        let hdr = 'UNKNOWN ' + C // <-- replace with your desired default
        if (cell && cell.t) hdr = XLSX.utils.format_cell(cell)
        headers.push(hdr)
      }
      return headers
    },
    fetchMobiles(value) {
      let outMobiles = []
      let mobile = ''
      let state = 'NONE'

      for (let i = 0; i < value.length; i++) {
        switch (state) {
          case 'NONE':
            if (validNumber(value[i])) {
              state = 'VALIDPART'
              mobile += value[i]
            } else {
              mobile = ''
            }
            break
          case 'VALIDPART':
            if (validNumber(value[i])) {
              mobile += value[i]
            } else {
              outMobiles.push(mobile)
              mobile = ''
              state = 'NONE'
            }
            break
          default:
            break
        }
      }
      if (mobile.length > 0) {
        outMobiles.push(mobile)
      }
      // remove redundant mobile phone number
      outMobiles = outMobiles.filter(function(element, index, self) {
        return self.indexOf(element) === index
      })

      return outMobiles
    },
    clear() {
      console.log('clear()')
      this.form.mobiles = ''
      this.form.text = ''
      this.$refs['excel-upload-input'].value = ''
    },
    send() {
      console.log('send()')
      console.log('to send mobiles:')

      this.mobilesArr = this.fetchMobiles(this.form.mobiles)

      console.log(this.mobilesArr)
      console.log('mobiles length:', this.mobilesArr.length)
      const h = this.$createElement
      if (this.mobilesArr.length > 200) {
        this.$notify({
          title: '数量过多',
          message: h('i', { style: 'color: red' }, '200条'),
          duration: 2000
        })
        return
      } else if (this.mobilesArr.length < 1) {
        console.log('empty mobiles')
        return
      }
      if (!this.form.text) {
        console.log('empty text')
        return
      }

      this.loading = true
      postUserSendMultiple({
        mobiles: this.mobilesArr,
        text: this.form.text
      }).then(
        response => {
          console.log('postUserSendMultiple OK')
          console.log(response)
          this.loading = false
          if (response.code === 0) {
            this.$notify({
              title: '提交平台',
              message: h('i', { style: 'color: green' }, '成功'),
              duration: 2000
            })
          } else {
            this.$notify({
              title: '提交平台',
              message: h('i', { style: 'color: red' }, '失败'),
              duration: 2000
            })
          }
        },
        err => {
          console.log(err)
          console.log('postUserSendMultiple failed')
          this.loading = false
          this.$notify({
            title: '提交平台',
            message: h('i', { style: 'color: red' }, '发送失败'),
            duration: 2000
          })
        }
      )
    },
    input() {
      console.log('input()')
    }
  }
}
</script>
<style scoped>
.btn-block {
  display: block;
  color: red;
  background-color: green;
}
.excel-upload-input {
  display: none;
  z-index: -9999;
}
.drop {
  border: 2px dashed #bbb;
  /* width: 600px; */
  height: 60px;
  line-height: 60px;
  margin: 0 auto;
  font-size: 20px;
  border-radius: 5px;
  text-align: center;
  color: #bbb;
  position: relative;
}
</style>
