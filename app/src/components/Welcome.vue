<template>
   <section class="hero is-primary" >
    <div class="hero-body">
      <div class="container">
        <h1 class="title">
          Welcome to Platform
        </h1>
        <h2 class="subtitle">
          Nice day <router-link to="/login">Login</router-link>
        </h2>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data () {
    return {
      isLogined: false,
      user: { displayName: '' }
    }
  },
  methods: {
  }
}
</script>
