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
              :autosize="{minRows:6, maxRows:20}"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :offset="6">
          <el-button type="info" @click="input">输入</el-button>
          <el-button type="warning" @click="clear">重置</el-button>
          <el-button :loading="loading" type="primary" @click.native.prevent="send">发送</el-button>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import { validText, validMobile, validNumber } from '@/utils/validate'

export default {
  name: 'MultiMsg',
  data() {
    let mobilesValidate = (rule, value, callback) => {
      let outMobiles = this.fetchMobiles(value)

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
      return outMobiles
    },
    clear() {
      console.log('clear()')
      this.form.mobiles = ''
      this.text = ''
    },
    send() {
      console.log('send()')
      console.log('to send mobiles:')

      this.mobilesArr = this.fetchMobiles(this.form.mobiles)

      console.log(this.mobilesArr)
    },
    input() {
      console.log('input()')
    }
  }
}
</script>
