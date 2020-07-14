<template>
  <div class="dashboard-editor-container">
    <div class="filter-container">
      <!--
      <el-button
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        :loading="searching"
        @click="handleSearch"
      >查找</el-button>
      <el-button
        :loading="deleting"
        class="filter-item"
        type="primary"
        icon="el-icon-delete"
        @click="handleDelete"
      >删除</el-button>
      <el-button
        :loading="editing"
        class="filter-item"
        type="primary"
        icon="el-icon-edit"
        @click="handleEdit"
      >修改</el-button>
      <el-button
        class="filter-item"
        style="margin-left: 10px;"
        type="primary"
        icon="el-icon-edit"
        @click="handleCreate"
      >新增</el-button>
      <el-button
        :loading="refreshing"
        class="filter-item"
        style="margin-left: 10px;"
        type="primary"
        icon="el-icon-refresh"
        @click="handleRefresh"
      >刷新</el-button>
      -->
    </div>
    <el-table
      ref="singleTable"
      :data="tableData"
      highlight-current-row
      @current-change="handleCurrentRowChange"
      style="width: 100%; margin-bottom: 10px"
    >
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column property="date" label="日期" width="200"></el-table-column>
      <el-table-column property="name" label="姓名" width="120"></el-table-column>
      <el-table-column property="status" label="有效"></el-table-column>
      <el-table-column property="unused" label="剩余短信"></el-table-column>
      <el-table-column property="used" label="已发短信"></el-table-column>
      <el-table-column property="creator" label="经办人"></el-table-column>
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

    <create-dialog
      :createDialogVisible="createDialogVisible"
      @createDialogVisible="updateDialogVisible"
    />
    <edit-dialog
      ref="editDialog"
      :editDialogVisible="editDialogVisible"
      @editDialogVisible="updateEditDialogVisible"
      @refreshDialog="handleRefresh"
    />
    <delete-dialog
      ref="deleteDialog"
      :deleteDialogVisible="deleteDialogVisible"
      @deleteDialogVisible="updateDeleteDialogVisible"
      @refreshDialog="handleRefresh"
    />
  </div>
</template>

<script>
import CreateDialog from './components/CreateDialog'
import EditDialog from './components/EditDialog'
import DeleteDialog from './components/DeleteDialog'
import { getAdminGetUsers } from '../../api/user'

export default {
  name: 'DashboardAdmin',
  components: {
    CreateDialog,
    EditDialog,
    DeleteDialog
  },
  data() {
    return {
      tableData: [],
      currentRow: null,
      currentName: '',
      searching: false,
      deleting: false,
      editing: false,
      refreshing: false,
      creating: false,
      currentPage: 1,
      numPerPage: 10,
      totalNum: 0,
      createDialogVisible: false,
      editDialogVisible: false,
      deleteDialogVisible: false
    }
  },
  mounted: function() {
    console.log('basic mounted')
    this.getusers(this.currentPage, this.numPerPage)
  },
  computed: {},
  // watch: {
  //   currentRow: function(val) {
  //     this.currentName = val.name
  //   }
  // },
  methods: {
    // handleSetLineChartData(type) {
    //   this.lineChartData = lineChartData[type]
    // },
    handleSearch() {
      console.log('handleSearch')
      console.log(this.currentName)
    },
    handleDelete() {
      console.log('handleDelete')
      if (this.currentName !== '') {
        this.deleteDialogVisible = true
      }
    },
    handleEdit() {
      console.log('handleEdit')
      if (this.currentName !== '') {
        this.editDialogVisible = true
      }
    },
    handleCreate() {
      console.log('handleCreate')
      this.createDialogVisible = true
    },
    updateDialogVisible(val) {
      console.log('updateDialogVisible')
      this.createDialogVisible = val
    },
    updateEditDialogVisible(val) {
      console.log('udpateEditDialogVisible')
      this.editDialogVisible = val
    },
    updateDeleteDialogVisible(val) {
      console.log('updateDeleteDialogVisible')
      this.deleteDialogVisible = val
    },
    handleCurrentRowChange(val) {
      this.currentRow = val
      console.log('currentRow ', val)
      if (val) {
        console.log('current username', this.currentRow.name)
        this.currentName = this.currentRow.name
        console.log('currentName:', this.currentName)
        this.$refs.editDialog.setUsername(this.currentName)
        this.$refs.deleteDialog.setUsername(this.currentName)
      }
    },
    handleRefresh() {
      console.log('handleRefresh')
      this.getusers(this.currentPage, this.numPerPage)
    },
    handlePageSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentPageChange(val) {
      console.log(`当前页: ${val}`)
      // to load the new page
      this.getusers(val, this.numPerPage)
      this.currentPage = val
    },
    getusers(curPage, numPerPage) {
      console.log('getusers')
      console.log(curPage, numPerPage)
      getAdminGetUsers(curPage, numPerPage).then(
        response => {
          console.log(response)
          if (response.code === 0) {
            let out = []
            for (let i = 0; i < response.data.data.length; i++) {
              let user = response.data.data[i]
              out.push({
                date: new Date(user.createdate).toLocaleString(),
                name: user.username,
                status: user.status,
                unused: user.unused,
                used: user.used,
                creator: user.creator
              })
            }
            this.tableData = out
            this.totalNum = response.data.amount
          }
        },
        err => {
          console.log(err)
          console.log('getAdminGetUsers failed')
        }
      )
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

@media (max-width: 1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
