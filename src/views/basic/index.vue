<template>
  <div class="dashboard-editor-container">
    <div class="filter-container">
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
      >添加用户</el-button>
    </div>
    <el-table
      ref="singleTable"
      :data="tableData"
      highlight-current-row
      @current-change="handleCurrentChange"
      style="width: 100%"
    >
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column property="date" label="日期" width="120"></el-table-column>
      <el-table-column property="name" label="姓名" width="120"></el-table-column>
      <el-table-column property="address" label="地址"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import BoxCard from './components/BoxCard'

const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145]
  },
  messages: {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130]
  },
  purchases: {
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130]
  },
  shoppings: {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130]
  }
}

export default {
  name: 'DashboardAdmin',
  components: {
    BoxCard
  },
  data() {
    return {
      lineChartData: lineChartData.newVisitis,
      tableData: [],
      currentRow: null,
      searching: false,
      deleting: false,
      editing: false
    }
  },
  methods: {
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type]
    },
    handleSearch() {
      console.log('handleSearch')
    },
    handleDelete() {
      console.log('handleDelete')
    },
    handleEdit() {
      console.log('handleEdit')
    },
    handleCreate() {
      console.log('handleCreate')
    },
    handleCurrentChange(val) {
      this.currentRow = val
      console.log('currentRow ', this.currentRow)
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
