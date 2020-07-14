<template>
  <div class="dashboard-container">
    <div class="dashboard-text" v-if="role === 0">管理员: {{ name }}</div>
    <!-- <div class="dashboard-text" v-if="role === 1">用户: {{ name }}</div>
    <div class="dashboard-text" v-if="role === 2">代理: {{ name }}</div>-->
    <panel-group
      v-if="role === 0"
      :numAgent="numAgent"
      :numUser="numUser"
      :numMsg="numMsg"
      :numBalance="numBalance"
      :numUnused="numUnused"
    />
    <!-- <panel-group-user v-if="role === 1" :numUnused="numUnused" />
    <panel-group-agent v-if="role === 2" :numUnused="numUnused" />-->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import store from '@/store'
import PanelGroup from './components/PanelGroup'
import PanelGroupUser from './components/PanelGroupUser'
import PanelGroupAgent from './components/PanelGroupAgent'
import {
  getUsers,
  getUserInfo,
  getAdminInfo,
  getMsgInfo,
  getAdminDashboard
} from '@/api/user'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters(['name'])
  },
  components: {
    PanelGroup,
    PanelGroupUser,
    PanelGroupAgent
  },

  data: function() {
    const validate = (rule, value, callback) => {
      if (value.length !== 6) {
        callback(new Error('请输入六个字符'))
      } else {
        callback()
      }
    }
    return {
      // lineChartData: lineChartData.newVisitis,
      demo: {
        title: ''
      },
      demoRules: {
        title: [{ required: true, trigger: 'change', validator: validate }]
      },
      role: '',
      numUser: 0,
      numMsg: 0,
      numUnused: 0,
      numBalance: 0,
      numAgent: 0
    }
  },
  created: function() {
    console.log('dashboard/created')
  },
  mounted: async function() {
    console.log('dashboard/mounted')
    this.updateRole()

    if (this.role === '0' || parseInt(this.role) === 0) {
      await this.updateAdminDashboard()
      await this.updateInfo()
    } else if (this.role === 1) {
      await this.udpateUserDashboard()
    } else if (this.role === 2) {
      // this.updateUnused()
      await this.updateAgentDashboard()
    } else {
      console.log('no role here ', this.role)
    }
  },
  methods: {
    updateRole() {
      this.role = store.getters.userrole
      console.log('updateRole()', this.role)
      console.log('typeof role:', typeof this.role)
    },
    updateAdminDashboard() {
      console.log('updateAdminDashboard()')
      getAdminDashboard().then(
        response => {
          console.log('updateAdminDashboard()')
          console.log(response)
          if (response.data) {
            this.numMsg = response.data.numMsg
            this.numAgent = response.data.numAgent
            this.numUser = response.data.numUser
            this.unused = response.data.unused
            this.used = response.data.used
          }
        },
        err => {
          console.log('getMsgInfo failed', err)
        }
      )
    },
    updateMsgInfo() {
      console.log('updateMsgInfo()')
      getMsgInfo().then(
        response => {
          console.log(response)
          if (response.data.msgcount) {
            this.numMsg = response.data.msgcount
          }
        },
        err => {
          console.log('getMsgInfo failed', err)
        }
      )
    },
    updateNumUser() {
      console.log('updateNumUser()')

      // this.numMsg = 12
      // this.$store.dispatch('user/getUsers').then(response => {
      //   console.log(response)
      // })
      getUsers().then(
        response => {
          console.log(response)
          if (response.data.num) {
            this.numUser = response.data.num
          }
        },
        err => {
          console.log(err)
          console.log('getUsers failed')
          this.numUser = 0
        }
      )
    },
    updateUnused() {
      console.log('getUserInfo()')
      getUserInfo().then(
        response => {
          console.log(response)
          this.numUnused = response.data.unused
        },
        err => {
          console.log(err)
          console.log('getUserInfo failed')
        }
      )
    },
    updateInfo() {
      console.log('getAdminInfo()')
      getAdminInfo().then(
        response => {
          console.log(response)
          this.numBalance = response.data.amount
        },
        err => {
          console.log(err)
          console.log('getAdminInfo failed')
        }
      )
    }
    // handleSetLineChartData(type) {
    //   this.lineChartData = lineChartData[type]
    // }
  }
  /*
  methods: {
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type]
    }
  }
  */
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
