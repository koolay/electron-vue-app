<style>
  @import '../node_modules/font-awesome/css/font-awesome.css';
  @import url(https://fonts.googleapis.com/css?family=Lato:300);

  * {
    margin: 0;
    padding: 0;
  }

  html,
  body { height: 100%; }
</style>

<template>
  <div style="width: 100%;height: 100%; padding: 20px; margin: 0;">
    <div v-if="notification.show" v-bind:class="['notification',notifyType]">
      <button class="delete" @click="hideNotification"></button>
      {{ notification.message }}
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  import store from 'src/vuex/store'

  export default {
    store,
    methods: {
      hideNotification () {
        this.$store.dispatch('hideNotification')
      }
    },
    computed: {
      notification () {
        return this.$store.getters.notification
      },
      notifyType () {
        let notifyType = 'is-info'
        switch (this.$store.getters.notification.type) {
          case 'info':
            notifyType = 'is-info'
            break
          case 'success':
            notifyType = 'is-success'
            break
          case 'error':
            notifyType = 'is-danger'
            break
          case 'warn':
            notifyType = 'is-warning'
            break
          default:
            notifyType = 'is-info'
        }
        return notifyType
      }
    }
  }
</script>
