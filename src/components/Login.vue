<template>
  <div class="login">
    <div class="input-wrap">
      <input type="text" v-model="name" />
      <span v-if="error.name" class="err-msg">
        <br />
        {{error.name}}
      </span>
    </div>
    <div class="input-wrap">
      <input type="password" v-model="pwd" />
      <span v-if="error.pwd" class="err-msg">
        <br />
        {{error.pwd}}
      </span>
    </div>
    <div class="input-wrap">
      <button @click="login">提交</button>
    </div>
  </div>
</template>
<script>
import authSrv from '../api/auth' // import service moudle

export default {
  name: 'login',
  data() {
    return {
      name: '',
      pwd: '',
      error: {
        name: '',
        pwd: ''
      }
    }
  },
  methods: {
    check(name, pwd) {
      if (!name) {
        this.error.name = '请输入姓名'
        return false
      }
      if (!pwd) {
        this.error.pwd = '请输入密码'
        return false
      }
      return true
    },
    login() {
      // const { $router } = this
      if (!this.check(this.name, this.pwd)) return
      // if (this.name === 'admin' && this.pwd === '123') {
      //   this.$router.replace({ name: 'home' })
      //   console.log('go to main page')
      // } else {
      //   alert('用户名密码错误')
      // }
      authSrv.login(this, this.name, this.pwd)
            .then(rep => {
              /// console.log(rep)
              if(!rep.body.code){
                this.$router.replace({ name: 'home' })
                console.log('go to main page')
              }else{
                alert('Invalid username or password')
              }
            })
    }
  }
}
</script>
<style scoped style="scss">
.logn {
  width: 300px;
  margin: 10% auto;
}
.err-msg {
  color: red;
}
</style>
