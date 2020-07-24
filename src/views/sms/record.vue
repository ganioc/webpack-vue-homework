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
import { getUserGetActions } from '@/api/user'

export default {
  name: 'UserGetActions',
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
    this.getAdminActions(this.currentPage, this.numPerPage)
  },
  methods: {
    strAction(str) {
      if (str === 1) {
        return '创建账户'
      } else if (str === 2) {
        return '修改账户'
      } else if (str === 3) {
        return '删除账户'
      } else if (str === 4) {
        return '发送失败'
      } else {
        return '未知操作'
      }
    },
    strVerb(verb) {
      if (verb === 'status') {
        return '状态'
      } else if (verb === 'unused') {
        return '短信条数'
      } else {
        return verb
      }
    },
    strEdit(verb, oldstate, newstate) {
      if (verb) {
        if (oldstate) {
          return '修改' + this.strVerb(verb) + '从' + oldstate + '到' + newstate
        } else {
          return '修改' + this.strVerb(verb) + '为' + newstate
        }
      } else {
        if (oldstate) {
          return '修改' + oldstate + '到' + newstate
        } else {
          return '修改为' + newstate
        }
      }
    },
    strContent(action, verb, oldstate, newstate) {
      if (action === 1) {
        return '成功创建账户'
      } else if (action === 2) {
        return this.strEdit(verb, oldstate, newstate)
      } else if (action === 3) {
        return '成功删除账户'
      } else if (action === 4) {
        return '返还短信' + newstate + '条'
      } else {
        return ''
      }
    },
    handleCurrentPageChange(val) {
      console.log(`当前页: ${val}`)
      // to load the new page
      this.getAdminActions(val, this.numPerPage)
      this.currentPage = val
    },
    handlePageSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    getAdminActions(curPage, numPerpage) {
      console.log('getUserActions()')
      console.log(curPage, numPerpage)
      getUserGetActions(curPage, numPerpage).then(
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
                type: this.strAction(action.action),
                content: this.strContent(
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
