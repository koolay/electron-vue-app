<template>
  <div class="container">
      <!-- Main container -->
      <nav class="level">
        <!-- Left side -->
        <div class="level-left">
          <div class="level-item">
            <p class="control">
              <span class="select">
                <select v-model="selectedSearchType" required>
                  <option value="">选择方式</option>
                  <option v-for="item in searchTypes " :value="item.value">{{ item.text }}</option>
                </select>
              </span>
            </p>
          </div>
          <div class="level-item">
            <p class="control has-addons">
              <input v-model="keyword" class="input" type="text" placeholder="输入关键字">
              <button class="button is-primary" @click="fetchData()">
                Search
              </button>
            </p>
          </div>
        </div>

        <!-- Right side -->
        <div class="level-right">
          <p class="level-item">
            <router-link :to="{ name: 'apiList', params: { id: projectId } }">接口列表</router-link>
          </p>
        </div>
      </nav>
    <div>
    <div class="container">
    <div>
  </div>
</template>

<script>
import NProgress from 'nprogress'
import apiStore from '../stores/api'

export default {
  data () {
    return {
      projectId: '',
      selectedSearchType: '',
      keyword: '',
      searchTypes: [
        { value: 'summary', text: '接口名称' },
        { value: 'name', text: '接口ID' },
        { value: 'path', text: '接口PATH' },
        { value: 'tag', text: '接口模块' }
      ],

      apiList: []
    }
  },
  created () {
    this.projectId = this.$route.params.projectId
    this.fetchTestCases()
  },
  methods: {
    fetchTestCases () {
      NProgress.start()
      apiStore.detail(this.$route.params.id, data => {
        this.apiList = data ? data.data.items : null
      })
    }
  }
}
</script>

