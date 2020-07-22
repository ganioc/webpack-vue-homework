<template>
  <el-dialog title="提示" :visible.sync="DialogVisible" width="30%" :before-close="handleClose">
    <span>删除 {{ username }}</span>
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button :loading="loading" type="primary" @click="confirm">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { postDeleteAgent } from '@/api/user'

export default {
  props: ['deleteDialogVisible'],
  data() {
    return {
      DialogVisible: this.deleteDialogVisible,
      loading: false,
      username: ''
    }
  },
  watch: {
    deleteDialogVisible(val) {
      this.DialogVisible = val
    },
    DialogVisible(val) {
      if (val === false) {
      }
      this.$emit('deleteDialogVisible', val)
    }
  },
  methods: {
    setUsername(val) {
      this.username = val
    },
    handleClose() {
      console.log('handleClose()')
      this.DialogVisible = false
    },
    cancel() {
      console.log('cancel()')
      this.DialogVisible = false
    },
    confirm() {
      console.log('delete confirm()')
      this.loading = true
      postDeleteAgent(this.username).then(
        response => {
          this.loading = false
          const h = this.$createElement
          if (response.code === 0) {
            this.$notify({
              title: '删除代理',
              message: h('i', { style: 'color:green' }, '成功')
            })
            this.$emit('refreshDialog')
          } else {
            this.$notify({
              title: '删除代理',
              message: h(
                'i',
                { style: 'color:red' },
                '失败:' + response.data.message
              )
            })
          }

          this.DialogVisible = false
        },
        err => {
          console.log('delete failed')
          console.log(err)
          this.loading = false

          this.DialogVisible = false
        }
      )
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
