<template>
  <div class="app-container">
    <el-table
      ref="singleTable"
      :data="tableData"
      highlight-current-row
      style="width: 100%; margin-bottom: 10px"
    ></el-table>
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
</script>

<style scoped>
</style>
