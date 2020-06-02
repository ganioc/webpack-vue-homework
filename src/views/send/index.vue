<template>
  <div class="app-container">
    <div style="margin:0 0 5px 20px"></div>

    <el-form ref="form" :model="form" :rules="rules" label-width="120px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="电话号码">
            <el-input tabindex="1" type="tel" v-model="form.mobile" maxlength="11" show-word-limit />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="18">
          <el-form-item label="发送内容">
            <el-input
              tabindex="2"
              type="textarea"
              placeholder="请输入内容"
              v-model="form.text"
              maxlength="170"
              show-word-limit
              :autosize="{minRows:5, maxRows:10}"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :offset="6">
          <el-button type="warning" @click="clear">重置</el-button>
          <el-button type="primary">发送</el-button>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
export default {
  name: 'SingleMsg',
  data() {
    let textValidate = (rule, value, callback) => {}

    let mobileValidate = (rule, value, callback) => {
      if (!value) {
        callback(new Error('号码非空'))
      }
    }
    return {
      form: {
        mobile: '',
        text: ''
      },
      rules: {
        mobile: [
          {
            validator: mobileValidate,
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
      this.form.mobile = ''
      this.form.text = ''
    }
  }
}
</script>
