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
      <el-table-column property="type" label="短信类型" width="100"></el-table-column>
      <el-table-column property="mobiles" label="电话号码"></el-table-column>
      <el-table-column property="content" label="短信内容"></el-table-column>
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
import { getUserSmsHistory } from '@/api/user'

export default {
  name: 'SmsHistory',
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
    console.log('smshistory mounted')
    this.getUserHistory(this.currentPage, this.numPerPage)
  },
  methods: {
    handleCurrentPageChange(val) {
      console.log(`当前页: ${val}`)
      // to load the new page
      this.getUserHistory(val, this.numPerPage)
      this.currentPage = val
    },
    handlePageSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    getUserHistory(curPage, numPerPage) {
      console.log('getUserHistory')
      console.log(curPage, numPerPage)
      getUserSmsHistory(curPage, numPerPage).then(
        response => {
          console.log(response)
          if (response.code === 0) {
            let out = []
            for (let i = 0; i < response.data.data.length; i++) {
              let msg = response.data.data[i]
              out.push({
                date: new Date(msg.date).toLocaleString(),
                type: msg.type === 1 ? '单号码' : '多号码',
                mobiles: msg.mobiles.join(','),
                content: msg.content
              })
            }
            this.tableData = out
            this.totalNum = response.data.amount
          }
        },
        err => {
          console.log(err)
          console.log('getUserSmsHistory failed')
        }
      )
    }
  }
}
</script>
