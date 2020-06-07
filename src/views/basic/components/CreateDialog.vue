<template>
  <el-dialog :visible.sync="DialogVisible" width="60%" :before-close="handleCloseCreateDialog">
    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
      <el-row>
        <el-col :span="16">
          <el-form-item label="用户名" prop="username">
            <el-input type="text" maxlength="20" v-model="form.username" show-word-limit></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="16">
          <el-form-item label="密码" prop="password">
            <el-input type="text" maxlength="20" v-model="form.password" placeholder="记住密码"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="16">
          <el-form-item label="是否有效">
            <el-switch
              v-model="form.status"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-value="valid"
              inactive-value="invalid"
            ></el-switch>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="16">
          <el-form-item label="短信数量">
            <el-input-number
              v-model="form.unused"
              @change="handleChangeUnused"
              :min="0"
              :max="50000"
            ></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="18">
          <el-form-item label="邮箱">
            <el-input type="email" maxlength="50" v-model="form.email"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="18">
          <el-form-item label="电话">
            <el-input type="tel" maxlength="20" v-model="form.phone"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="22">
          <el-form-item label="地址">
            <el-input type="textarea" v-model="form.address"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="22">
          <el-form-item label="其它">
            <el-input type="textarea" v-model="form.extra"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :offset="6">
          <el-button type="warning" @click="resetData">重置</el-button>
          <el-button :loading="creating" type="primary" @click.native.prevent="create">创建</el-button>
        </el-col>
      </el-row>
    </el-form>

    <!-- <span slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button :loading="creating" type="primary" @click="confirm">确 定</el-button>
    </span>-->
  </el-dialog>
</template>

<script>
export default {
  props: ['createDialogVisible'],
  data() {
    let usernameValidate = (rule, value, callback) => {
      if (!value) {
        callback(new Error('用户名非空'))
      } else if (value.length < 5) {
        callback(new Error('用户名大于5个英文字符'))
      } else if (value.indexOf(' ') !== -1) {
        callback(new Error('包含非法字符'))
      } else {
        callback()
      }
    }
    let passwordValidate = (rule, value, callback) => {
      if (!value) {
        callback(new Error('密码非空'))
      } else if (value.length < 8) {
        callback(new Error('用户名大于8个字符'))
      } else {
        callback()
      }
    }
    return {
      creating: false,
      DialogVisible: this.createDialogVisible,
      form: {
        username: '',
        password: '',
        status: 'valid',
        unused: 0,
        email: '',
        phone: '',
        address: '',
        extra: ''
      },
      rules: {
        username: [
          {
            validator: usernameValidate,
            required: true
          }
        ],
        password: [
          {
            validator: passwordValidate,
            required: true
          }
        ]
      }
    }
  },
  watch: {
    createDialogVisible(val) {
      // this.$emit('update:createDialogVisible', val)
      this.DialogVisible = val
    },
    DialogVisible(val) {
      if (val === false) {
        this.resetData()
      }
      this.$emit('createDialogVisible', val)
    }
  },
  methods: {
    handleCloseCreateDialog(done) {
      console.log('createDialog closed')
      done()
    },
    cancel() {
      console.log('createDialog cancel')
      this.DialogVisible = false
      console.log(this.DialogVisible)
    },
    confirm() {
      console.log('createDialog confirm')
      this.DialogVisible = false
      console.log(this.DialogVisible)
    },
    handleChangeUnused(val) {
      console.log(val)
    },
    resetData() {
      console.log('resetData()')
      this.form.username = ''
      this.form.password = ''
      this.form.status = 'valid'
      this.form.unused = 0
      this.form.email = ''
      this.form.phone = ''
      this.form.address = ''
      this.form.extra = ''
    },
    create() {
      console.log('create()')
      this.$refs.form.validate(async valid => {
        if (valid) {
          this.creating = true

          this.creating = false
        } else {
          console.log('invalid form data')
        }
      })
    }
  }
}
</script>

<style lang="scss" >
</style>
