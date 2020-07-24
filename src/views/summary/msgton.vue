<template>
  <div class="app-container">
    <!-- <div style="margin:0 0 5px 20px">失败短信统计</div> -->
    <el-table
      ref="singleTable"
      :data="tableData"
      highlight-current-row
      style="width: 100%; margin-bottom: 10px"
    >
      <el-table-column type="index" width="40"></el-table-column>
      <el-table-column property="date" label="日期" width="180"></el-table-column>
      <el-table-column property="creator" label="经办人" width="100"></el-table-column>
      <el-table-column property="username" label="用户" width="100"></el-table-column>
      <el-table-column property="pknum" label="短信编号" width="100"></el-table-column>
      <el-table-column property="mobile" label="电话号码"></el-table-column>
      <el-table-column property="msgid" label="短信ID"></el-table-column>
      <el-table-column property="status" label="状态"></el-table-column>
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
import { getAdminMsgtons } from '@/api/user'

export default {
  name: 'AdminGetMsgton',
  components: {},
  data() {
    return {
      tableData: [],
      currentPage: 1,
      numPerPage: 10,
      totalNum: 0,
    }
  },
  mounted: function () {
    console.log('AdminGetMsgton mounted')
    this.getAgentMsgton(this.currentPage, this.numPerPage)
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
    getAgentMsgton(curPage, numPerPage) {
      console.log('getAdminMsgtons')
      console.log(curPage, numPerPage)
      getAdminMsgtons(curPage, numPerPage).then(
        (response) => {
          console.log(response)
          if (response.code === 0) {
            let out = []
            for (let i = 0; i < response.data.data.length; i++) {
              let msg = response.data.data[i]
              // let total = msg.mobiles.length
              // let mobileSamples = msg.mobiles.slice(0, 10)

              out.push({
                date: new Date(msg.date).toLocaleString(),
                creator: msg.creator,
                username: msg.username,
                pknum: msg.pknum,
                mobile: msg.mobile,
                msgid: msg.msg_id,
                status: msg.status,
              })
            }
            this.tableData = out
            this.totalNum = response.data.amount
          }
        },
        (err) => {
          console.log(err)
          console.log('getAdminMsgton failed')
        }
      )
    },
  },
}
</script>
