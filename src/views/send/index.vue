<template>
  <div class="app-container">
    <div style="margin:0 0 5px 20px"></div>

    <el-form ref="form" :model="form" :rules="rules" label-width="120px">
      <el-row>
        <el-col :span="16">
          <el-form-item label="用户签名" prop="tag">
            <el-select v-if="tags.length > 0" v-model="form.tag" placeholder="请选择">
              <el-option
                v-for="item in tags"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <el-alert
              v-if="tags.length == 0"
              title="错误: 缺少用户签名!"
              type="error"
              effect="dark"
              :closable="false"
            ></el-alert>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="16">
          <el-form-item label="发送内容" prop="text">
            <el-input
              tabindex="2"
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
        <el-col :span="16">
          <el-form-item label="电话号码" prop="mobile">
            <el-input tabindex="1" type="tel" v-model="form.mobile" maxlength="11" show-word-limit />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="16">
          <el-form-item>
            <el-button type="warning" @click="clear">重置</el-button>
            <el-button
              :loading="loading"
              type="primary"
              @click.native.prevent="send"
              :disabled="enabled"
            >发送</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import { postUserSendSingle } from '@/api/user'
import { validText } from '@/utils/validate'
import { getErrMsg } from '@/utils/errmsg'
import { getUserDashboard } from '../../api/user'
export default {
  name: 'SingleMsg',
  data() {
    let validMobile = (num) => {
      let r = /^1[3456789]\d{9}$|^861[3456789]\d{9}$/
      return r.test(num.toString())
    }
    // let validText = num => {
    //   let byteLen = 0
    //   let hanLen = 0
    //   for (let i = 0; i < num.length; i++) {
    //     let ch = num.charCodeAt(i)
    //     if (ch > 127) {
    //       hanLen += 2
    //     } else {
    //       byteLen += 1
    //     }
    //   }
    //   let remain = 500 * 7 - hanLen * 2 * 8 - byteLen * 7

    //   if (remain < 0) {
    //     return Math.round(-remain / 7)
    //   } else {
    //     return 0
    //   }
    // }
    let mobileValidate = (rule, value, callback) => {
      if (!value) {
        callback(new Error('号码非空'))
      } else if (!validMobile(value)) {
        callback(new Error('号码无效'))
      } else {
        callback()
      }
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
      form: {
        mobile: '',
        text: '',
        tag: '',
      },
      rules: {
        mobile: [
          {
            validator: mobileValidate,
            required: true,
          },
        ],
        text: [
          {
            validator: textValidate,
            required: true,
          },
        ],
      },
      loading: false,
      tags: [],
    }
  },
  mounted: function () {
    console.log('send single mounted')
    this.getTags()
  },
  computed: {
    enabled: function () {
      return this.tags.length === 0
    },
  },
  methods: {
    clear() {
      this.form.mobile = ''
      this.form.text = ''
    },
    getTags() {
      console.log('getTags')
      getUserDashboard().then(
        (response) => {
          console.log(response.data)
          let strLst = response.data.tags.split(' ')
          // console.log(this.tags)
          this.tags = []
          if (strLst.length > 0) {
            for (let i = 0; i < strLst.length; i++) {
              this.tags.push({
                value: strLst[i],
                label: strLst[i],
              })
            }
            this.form.tag = strLst[0]
          }
        },
        (err) => {
          console.log('getUserTags failed')
          console.log(err.message)
        }
      )
    },
    send() {
      this.$refs.form.validate(async (valid) => {
        // console.log('into valid')
        if (valid) {
          this.loading = true
          console.log('valid')
          postUserSendSingle(this.form).then(
            (response) => {
              console.log('postUserSendSingle OK')
              console.log(response)
              this.loading = false
              const h = this.$createElement
              if (response.code === 0) {
                this.$notify({
                  title: '提交平台',
                  message: h('i', { style: 'color: green' }, '成功'),
                  duration: 2000,
                })
              } else {
                this.$notify({
                  title: '提交平台',
                  message: h(
                    'i',
                    { style: 'color: red' },
                    getErrMsg(response.code)
                  ),
                  duration: 2000,
                })
              }
            },
            (err) => {
              console.log(err)
              console.log('postUserSendSingle failed')
              this.loading = false
              const h = this.$createElement
              this.$notify({
                title: '提交平台',
                message: h('i', { style: 'color: red' }, '发送失败'),
                duration: 2000,
              })
            }
          )
        } else {
          console.log('invalid')
        }
      })
    },
  },
}
</script>
