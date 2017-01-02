<template>
  <section class="section">
    <div class="columns">
      <div class="column is-3">
      </div>
      <div class="column is-6">
        <h1 class="title">Login</h1>
        <p class="control has-icon">
          <input v-model="user.username" class="input" type="email" placeholder="username">
          <i class="fa fa-address-card"></i>
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
      </div>
      <div class="column is-3">
      </div>
   </div>
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
      if (!this.user.username || !this.user.password) {
        return
      }

      NProgress.start()
      userStore.login(this.user.username, this.user.password, result => {
        if (result.result === true) {
          this.$router.replace('/master')
        } else {
        }
      }, error => {
        this.$store.dispatch('showNotification', { message: JSON.stringify(error), type: 'error' })
      })
      NProgress.done()
      e.preventDefault()
    }
  }
}
</script>
