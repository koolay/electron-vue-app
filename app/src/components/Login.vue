<template>
  <section class="section">
    <div class="container">
    <h1 class="title">Login</h1>
    <p class="control has-icon">
      <input v-model="user.username" class="input" type="email" placeholder="username">
      <i class="fa fa-envelope"></i>
    </p>
    <p class="control has-icon">
      <input v-model="user.password" class="input" type="password" placeholder="password">
      <i class="fa fa-lock"></i>
    </p>
    <p class="control">
      <button class="button is-success" @click="login">
        Login
      </button>
      <router-link to="/" class="button is-link">Home page</router-link>
    </p>
    <div class="container">
  </section>
</template>

<script>
import NProgress from 'nprogress'
import userStore from '../stores/user'

export default {
  data () {
    return {
      user: { username: '', password: '' }
    }
  },
  methods: {
    login (e) {
      NProgress.start()
      // this.$store.dispatch('showNotification', { message: 'hello, success', type: 'success' })
      userStore.login(this.user.username, this.user.password, result => {
        if (result.result === true) {
          this.$router.replace('/master')
        } else {
        }
      })
      NProgress.done()
      e.preventDefault()
    }
  }
}
</script>
