<template>
  <div class="columns">
    <aside class="column is-2 menu">
      <a href="javascript:void(0)" title="点击刷新" @click="fetchData" class="menu-label" style="font-size: 16px">
        我的项目
      </a>
      <ul class="menu-list">
        <li v-for="proj in projects">
          <router-link :to="{ name: 'apiList', params: { id: proj._id } }">{{ proj.info.title }}</router-link>
        </li>
      </ul>
      <div style="position: absolute; bottom:20px">
        <a class="is-dark" @click="logout" ><i class="fa fa-sign-out"></i>退出</a>
      </div>
    </aside>
    <div class="column is-10">
       <router-view></router-view>
    </div>
  </div>
</template>

<script>
import NProgress from 'nprogress'
import projectStore from '../stores/project'
import userStore from '../stores/user'

export default {
  data () {
    return {
      projects: []
    }
  },

  created () {
    this.fetchData()
  },

  methods: {
    fetchData () {
      NProgress.start()
      projectStore.all(data => {
        this.projects = data.data
      })
    },

    logout () {
      NProgress.start()
      userStore.logout()
      NProgress.done()
      this.$router.replace('/')
    }
  }
}
</script>

