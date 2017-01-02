<template>
   <section class="hero is-primary" >
    <div class="hero-body">
      <div class="container">
        <h1 class="title">
          Welcome to Platform
        </h1>
        <h2 class="subtitle">
          Nice day
          <router-link to="/login" v-if="!isLogined">Login</router-link>
          <router-link to="/master" v-if="isLogined">Go</router-link>
        </h2>
      </div>
    </div>
  </section>
</template>

<script>
import userStore from '../stores/user'
export default {
  data () {
    return {
      isLogined: false,
      user: { displayName: '' }
    }
  },
  created () {
    this.isLogined = userStore.isLogined()
  },
  methods: {
  }
}
</script>
