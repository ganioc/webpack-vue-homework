<template>
  <el-dialog
    title="增加用户"
    :visible.sync="DialogVisible"
    width="60%"
    :before-close="handleCloseCreateDialog"
  >
    <span>这是一段信息</span>

    <span slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button :loading="creating" type="primary" @click="confirm">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  props: ['createDialogVisible'],
  data() {
    return {
      creating: false,
      DialogVisible: this.createDialogVisible
    }
  },
  watch: {
    createDialogVisible(val) {
      // this.$emit('update:createDialogVisible', val)
      this.DialogVisible = val
    },
    DialogVisible(val) {
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
    }
  }
}
</script>

<style lang="scss" >
</style>
