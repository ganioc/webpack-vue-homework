<template>
  <div class="login-container">
    <nav>
      <div class="nav-container">
        <h1>SMS Platform</h1>
      </div>
    </nav>
    <div class="logo-img">
      <img src="@/assets/eleps.png" />
    </div>
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">用户登录</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="Username"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="Password"
          name="password"
          tabindex="2"
          auto-complete="on"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="captcha" />
        </span>
        <el-input
          placeholder="验证码"
          v-model="loginForm.captcha"
          name="captcha"
          tabindex="3"
          @keyup.enter.native="handleLogin"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-col :span="11">
          <div class="captcha-container" v-html="svg_captcha"></div>
        </el-col>
        <el-col :span="11">
          <div class="captcha-refresh">
            <el-button type="text" style="margin-top:5px;" @click.native.prevent="getCaptcha">刷新</el-button>
          </div>
        </el-col>
      </el-form-item>

      <el-button
        :loading="loading"
        type="primary"
        style="width:100%;margin-bottom:30px;"
        @click.native.prevent="handleLogin"
      >登录</el-button>
    </el-form>

    <footer class="footer">
      <div class="container">
        <p>
          主办单位：本来生活（深圳）商贸有限公司
          备案号：
          <a href="http://www.beian.miit.gov.cn/">粤ICP备20039060号</a>
        </p>
      </div>
    </footer>
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'
import { defaultCaptcha } from '@/utils/config'
import { resetRouter } from '@/router'

export default {
  name: 'Login',
  data: function() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('Please enter the correct user name'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 3) {
        callback(new Error('The password can not be less than 3 digits'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: '',
        password: '',
        captcha: ''
      },
      loginRules: {
        username: [
          { required: true, trigger: 'blur', validator: validateUsername }
        ],
        password: [
          { required: true, trigger: 'blur', validator: validatePassword }
        ]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined,
      svg_captcha: defaultCaptcha,
      captchaLoading: false
    }
  },
  created: function() {
    console.log('login/ created')
  },
  mounted: function() {
    console.log('login/ mounted')
    this.getCaptcha()
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(async valid => {
        if (valid) {
          this.loading = true
          // loginForm is the data
          console.log('hanldelogin:')
          console.log(this.loginForm)
          this.$store
            .dispatch('user/login', this.loginForm)
            .then(async () => {
              console.log('this.redirect', this.redirect)
              // reset router,
              resetRouter()
              // const accessRoutes = await store.dispatch(
              //   'permission/generateRoutes',
              //   store.getters.userrole
              // )

              // router.addRoutes(accessRoutes)

              this.$router.push({ path: this.redirect || '/' })
              this.loading = false
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    getCaptcha() {
      console.log('getCaptcha')
      this.captchaLoading = true
      this.$store
        .dispatch('user/captcha')
        .then(data => {
          this.captchaLoading = false
          // console.log('fb of user/captcha:')
          // console.log(data.captcha)
          this.svg_captcha = data.captcha
        })
        .catch(() => {
          this.captchaLoading = false
        })
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
// $bg: white;
$dark_gray: #889aa4;
$light_gray: #eee;
$newbg: white;

#app {
  .login-container {
    // background: url('./assets/1.png');
    // min-height: 100%;
    width: 100%;
    background-color: $bg;
    //background-color: white;
    overflow: hidden;

    .login-form {
      display: block;
      position: relative;
      width: 400px;
      // max-width: 100%;
      padding: 10px 35px 0;
      margin: 20px auto 20px 20px;
      overflow: hidden;
      background: $bg;
    }

    .tips {
      font-size: 14px;
      color: #fff;
      margin-bottom: 10px;

      span {
        &:first-of-type {
          margin-right: 16px;
        }
      }
    }

    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
    }

    .title-container {
      position: relative;

      .title {
        font-size: 26px;
        color: $light_gray;
        margin: 0px auto 40px auto;
        text-align: center;
        font-weight: bold;
      }
    }

    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
      user-select: none;
    }

    .captcha-container {
      // height: 50px;
      // border-radius: 4px;
      display: block;
      height: 50px;
      background-color: wheat;
    }
    .captcha-refresh {
      display: block;
      height: 52px;
    }
    .logo-img {
      display: block;
    }
    nav {
      .nav-container {
        margin: 0px 0px 0px 0px;
        position: relative;
        width: 100%;
        height: 80px;
        line-height: 80px;
        background-color: $bg;
        color: black;
        text-align: left;
        vertical-align: middle;
        font-size: small;
        border-bottom: 1px solid $dark_gray;
        padding-left: 20px;
        h1 {
          margin: 0px;
          font-size: 32px;
          color: #889aa4;
        }
        p {
          margin: 0px;
        }
      }
    }
    .footer {
      position: relative;
      bottom: 0px;
      width: 100%;
      height: 200px;
      background-color: $bg;
      .container {
        padding-top: 10px;

        text-align: center;
        font-size: small;
        p {
          color: #fff;
        }
        a {
          color: #eee;
        }
      }
    }
  }
}
</style>
