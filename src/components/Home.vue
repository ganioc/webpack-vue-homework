<template>
  <div>
    <h1>Home Page</h1>
    <div class="input-wrap">
      <button @click="toLogin">Login</button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'home',
  data() {
    return {}
  },
  methods: {
    toLogin() {
      // const { $router } = this
      this.$router.go({ name: 'login' })
    }
  }
}
</script>
