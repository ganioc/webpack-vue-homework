<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
    <panel-group @handleSetLineChartData="handleSetLineChartData" />

    <!-- <el-row :gutter="8">
      <el-col
        :xs="{span: 24}"
        :sm="{span: 24}"
        :md="{span: 24}"
        :lg="{span: 12}"
        :xl="{span: 12}"
        style="padding-right:8px;margin-bottom:30px;"
      >
        <transaction-table />
      </el-col>
    </el-row>-->
    <el-row :gutter="20" style="margin-top:50px;">
      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>API接口信息</span>
          </div>
          <div style="height:100px;">
            <el-form :model="demo" :rules="demoRules">
              <el-form-item prop="title">
                <p>标题</p>
              </el-form-item>
            </el-form>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20" style="margin-top:50px;">
      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>短信发送统计</span>
          </div>
          <div style="height:100px;">
            <el-form :model="demo" :rules="demoRules">
              <el-form-item prop="title">
                <p>标题</p>
              </el-form-item>
            </el-form>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20" style="margin-top:50px;">
      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>系统通知</span>
          </div>
          <div style="height:100px;">
            <el-form :model="demo" :rules="demoRules">
              <el-form-item prop="title">
                <p>通知1</p>
              </el-form-item>
            </el-form>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import PanelGroup from './components/PanelGroup'
import TransactionTable from './components/TransactionTable'

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
  name: 'Dashboard',
  computed: {
    ...mapGetters(['name'])
  },
  components: {
    PanelGroup,
    TransactionTable
  },
  data() {
    const validate = (rule, value, callback) => {
      if (value.length !== 6) {
        callback(new Error('请输入六个字符'))
      } else {
        callback()
      }
    }
    return {
      lineChartData: lineChartData.newVisitis,
      demo: {
        title: ''
      },
      demoRules: {
        title: [{ required: true, trigger: 'change', validator: validate }]
      }
    }
  },
  methods: {
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type]
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
