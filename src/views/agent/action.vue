<template>
  <div class="app-container">
    <el-table
      ref="singleTable"
      :data="tableData"
      highlight-current-row
      style="width: 100%; margin-bottom: 10px"
    >
      <el-table-column type="index" width="40"></el-table-column>
      <el-table-column property="date" label="日期" width="180"></el-table-column>
      <el-table-column property="creator" label="经办人" width="120"></el-table-column>
      <el-table-column property="username" label="用户" width="120"></el-table-column>
      <el-table-column property="type" label="类型" width="100"></el-table-column>
      <el-table-column property="content" label="内容"></el-table-column>
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
import { getAgentGetActions } from '@/api/user'
import { strAction, strContent } from '@/utils/str-action'

export default {
  name: 'AgentGetActions',
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
    console.log('getactions mounted')
    this.getAgentActions(this.currentPage, this.numPerPage)
  },
  methods: {
    handleCurrentPageChange(val) {
      console.log(`当前页: ${val}`)
      // to load the new page
      this.getAgentActions(val, this.numPerPage)
      this.currentPage = val
    },
    handlePageSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    getAgentActions(curPage, numPerpage) {
      console.log('getAdminActions()')
      console.log(curPage, numPerpage)
      getAgentGetActions(curPage, numPerpage).then(
        (response) => {
          console.log(response)
          if (response.code === 0) {
            console.log('code:', 0)
            let out = []
            for (let i = 0; i < response.data.data.length; i++) {
              let action = response.data.data[i]
              out.push({
                date: new Date(action.date).toLocaleString(),
                creator: action.creator,
                username: action.username,
                type: strAction(action.action),
                content: strContent(
                  action.action,
                  action.verb,
                  action.oldstate,
                  action.newstate
                ),
              })
            }
            this.tableData = out
            this.totalNum = response.data.amount
          }
        },
        (err) => {
          console.log(err)
        }
      )
    },
  },
}
</script>

<style scoped>
</style>
