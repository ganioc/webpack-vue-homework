<template>
  <div class="app-container">
    <!-- <div style="margin:0 0 5px 20px">短信发送统计</div> -->
    <el-table
      ref="singleTable"
      :data="tableData"
      highlight-current-row
      style="width: 100%; margin-bottom: 10px"
    >
      <el-table-column type="index" width="40"></el-table-column>
      <el-table-column property="date" label="日期" width="180"></el-table-column>
      <el-table-column property="username" label="用户" width="120"></el-table-column>
      <el-table-column property="mobile" label="电话号码"></el-table-column>
      <el-table-column property="status" label="状态"></el-table-column>
      <el-table-column property="msgid" label="消息号"></el-table-column>
      <el-table-column property="batchid" label="任务号"></el-table-column>
    </el-table>
    <div class="block">
      <span class="demonstration"></span>
      <el-pagination
        layout="prev, pager, next"
        :size="numPerPage"
        :total="totalNum"
        @size-change="handlePageSizeChange"
        @current-change="handleCurrentPageChange"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
// import FixedThead from './components/FixedThead'
// import UnfixedThead from './components/UnfixedThead'
import { getAdminSmsMsgton } from '@/api/user'

export default {
  name: 'AdminSmsMsgton',
  components: {},
  data() {
    return {
      tableData: [],
      currentPage: 1,
      numPerPage: 10,
      totalNum: 0
    }
  },
  mounted: function() {
    console.log('adminsmsmsgton mounted')
    this.getAdminMsgton(this.currentPage, this.numPerPage)
  },
  methods: {
    handleCurrentPageChange(val) {
      console.log(`当前页: ${val}`)
      // to load the new page
      this.getAdminMsgton(val, this.numPerPage)
      this.currentPage = val
    },
    handlePageSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    getAdminMsgton(curPage, numPerPage) {
      console.log('getAdminSmsMsgton')
      console.log(curPage, numPerPage)
      getAdminSmsMsgton(curPage, numPerPage).then(
        response => {
          console.log(response)
          if (response.code === 0) {
            let out = []
            for (let i = 0; i < response.data.data.length; i++) {
              let msg = response.data.data[i]
              out.push({
                date: new Date(msg.date).toLocaleString(),
                username: msg.username,
                mobile: msg.mobile,
                content: msg.content,
                status: msg.status === 3 ? '提交成功' : msg.status,
                msgid: msg.msg_id,
                batchid: msg.batch_id
              })
            }
            this.tableData = out
            this.totalNum = response.data.amount
          }
        },
        err => {
          console.log(err)
          console.log('getAdminSmsMsgton failed')
        }
      )
    }
  }
}
</script>
