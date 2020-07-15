<template>
  <el-dialog
    :visible.sync="DialogVisible"
    width="70%"
    :title="getName"
    :before-close="closeEditDialog"
    @open="openCallback"
    center
  >
    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
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
          <el-form-item label="邮箱" prop="email">
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
          <el-button :loading="downloading" type="warning" @click="loadData">加载</el-button>
          <el-button type="warning" @click="resetData">重置</el-button>
          <el-button :loading="loading" type="success" @click.native.prevent="updateData">更新</el-button>
        </el-col>
      </el-row>
    </el-form>
  </el-dialog>
</template>

<script>
import { getAdminGetUser, postAdminSetUser } from '@/api/user'

export default {
  props: ['editDialogVisible'],
  data() {
    let emailValidate = (rule, value, callback) => {
      if (!value) {
        callback(new Error('邮箱非空'))
      } else {
        callback()
      }
    }
    return {
      DialogVisible: this.editDialogVisible,
      username: '',
      loading: false,
      downloading: false,
      form: {
        status: 'valid',
        unused: 0,
        email: '',
        phone: '',
        address: '',
        extra: '',
        username: ''
      },
      rules: {
        email: [{ validator: emailValidate, required: true }]
      }
    }
  },
  computed: {
    getName: function() {
      return '用户名:' + this.username
    }
  },
  watch: {
    editDialogVisible(val) {
      this.DialogVisible = val
    },
    DialogVisible(val) {
      if (val === false) {
        this.resetData()
      }
      this.$emit('editDialogVisible', val)
    }
  },
  mounted: function() {
    console.log('editDialog mounted')

    // load user data
  },
  methods: {
    setUsername(val) {
      this.username = val
    },
    loadData() {
      console.log('loadData()')
      this.downloading = true
      getAdminGetUser(this.username).then(
        response => {
          console.log(response)
          this.downloading = false
          if (response.code === 0) {
            this.form.status = response.data.status
            this.form.unused = response.data.unused
            this.form.email = response.data.email
            this.form.phone = response.data.phone
            this.form.address = response.data.address
            this.form.extra = response.data.extra
          }
        },
        err => {
          console.log(err)
          this.downloading = false
        }
      )
    },
    updateData() {
      console.log('updateUser')
      this.loading = true
      this.form.username = this.username
      postAdminSetUser(this.form).then(
        response => {
          this.loading = false
          const h = this.$createElement
          if (response.code === 0) {
            this.$notify({
              title: '更新用户',
              message: h('i', { style: 'color:green' }, '成功')
            })
            this.$emit('refreshDialog')
          } else {
            this.$notify({
              title: '更新用户',
              message: h(
                'i',
                { style: 'color:red' },
                '失败:' + response.data.message
              )
            })
          }
        },
        err => {
          console.log(err)
          this.loading = false
        }
      )
    },
    resetData() {
      console.log('resetData()')
      console.log(this.username)
      console.log(this.getName)
    },
    closeEditDialog(done) {
      console.log('closeEditDialog')
      done()
    },
    handleChangeUnused() {},
    openCallback() {
      console.log('openCallback()')
      this.loadData()
    }
  }
}
</script>

<style lang="scss" >
</style>
