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
          <el-button type="warning" @click="clear">重置</el-button>
          <el-button :loading="loading" type="primary" @click.native.prevent="send">发送</el-button>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
export default {
  name: 'MultiMsg',
  data() {
    let mobilesValidate = (rule, value, callback) => {
      callback()
    }
    let textValidate = (rule, value, callback) => {
      callback()
    }
    return {
      maxTextLength: 170,
      maxMobiles: 100,
      loading: false,
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
    clear() {
      console.log('clear()')
      this.form.mobiles = ''
      this.text = ''
    },
    send() {
      console.log('send()')
    }
  }
}
</script>
