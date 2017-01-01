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
          <p class="level-item"><a href="http://localhost:1337/docs/583b1b9f9104e901f5b79c84?t=1483291269988">在线文档</a></p>
        </div>
      </nav>
    <div>
    <div class="container">
      <table class="table">
        <thead>
          <tr>
            <th>path</th>
            <th>method</th>
            <th>接口名称</th>
            <th>创建者</th>
            <th></th>
          </tr>
        </thead>
        <tfoot>
          <tr>
            <th colspan="5">Name</th>
          </tr>
        </tfoot>
        <tbody>
          <tr v-for="api in apiList">
            <td>{{ api.path }}</td>
            <td>{{ api.method }}</td>
            <td>{{ api.summery||api.description }}</td>
            <td>{{ api.createdBy }}</td>
            <td class="is-icon">
              <router-link :to="{ name: 'apiTest', params: { projectId: projectId, id: api._id } }">
                <i class="fa fa-instagram"></i>
              </router-link>
            </td>
          </tr>
        </tbody>
      </table>
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
    this.projectId = this.$route.params.id
    this.fetchData()
  },
  methods: {
    fetchData () {
      NProgress.start()
      const page = 1
      const limit = 10
      apiStore.list(this.$route.params.id, this.selectedSearchType, this.keyword, page, limit, data => {
        this.apiList = data.data.items
      })
    }
  }
}
</script>

