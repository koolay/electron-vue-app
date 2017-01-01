<template>
  <div class="columns">
    <aside class="column is-2 menu">
      <p class="menu-label" style="font-size: 16px">
        我的项目
      </p>
      <ul class="menu-list">
        <li v-for="proj in projects">
          <router-link :to="{ name: 'apiList', params: { id: proj._id } }">{{ proj.info.title }}</router-link>
        </li>
      </ul>
    </aside>
    <div class="column is-10">
       <router-view></router-view>
    </div>
  </div>
</template>

<script>
import NProgress from 'nprogress'
import projectStore from '../stores/project'

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
    }
  }
}
</script>

