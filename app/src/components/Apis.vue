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
        <tbody>
          <tr v-for="api in apiList">
            <td>{{ api.path }}</td>
            <td>{{ api.method }}</td>
            <td>{{ api.summery||api.description }}</td>
            <td>{{ api.createdBy }}</td>
            <td class="is-icon">
              <router-link :to="{ name: 'apiTest', params: { projectId: projectId, id: api._id } }">
                <i class="fa fa-rocket"></i>
              </router-link>
            </td>
          </tr>
        </tbody>
      </table>
        <nav v-if="pagination.total > 0" class="pagination">
          <a v-bind:class="{'button': true, 'is-disabled': page.previous.disable}" @click="prePage"><i class="fa fa-angle-left"></i></a>
          <div>{{ page.page }} / {{ page.totalPages }}</div>
          <a v-bind:class="{'button': true, 'is-disabled': page.next.disable}" @click="nextPage"><i class="fa fa-angle-right"></i></a>
        </nav>
    <div>
  </div>
</template>

<script>
import NProgress from 'nprogress'
import apiStore from '../stores/api'
import _ from 'lodash'

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

      apiList: [],
      pagination: {
        page: 1,
        limit: 10,
        total: 0
      }
    }
  },
  watch: {
    '$route': 'fetchData'
  },
  created () {
    this.projectId = this.$route.params.id
    this.fetchData()
  },
  computed: {
    page () {
      const totalPages = _.ceil(this.pagination.total / this.pagination.limit)
      return {
        page: this.pagination.page,
        previous: {
          to: this.pagination.page <= 1 ? 1 : this.pagination.page - 1,
          disable: this.pagination.page <= 1
        },
        next: {
          to: this.pagination.page >= totalPages ? totalPages : this.pagination.page + 1,
          disable: this.pagination.page >= totalPages
        },
        totalPages: totalPages
      }
    }
  },
  methods: {
    prePage () {
      const to = this.page.previous.to
      this.fetchData(to)
      this.pagination.page = to
    },

    nextPage () {
      const to = this.page.next.to
      this.fetchData(to)
      this.pagination.page = to
    },

    fetchData (page = 1) {
      NProgress.start()
      const my = this
      const limit = this.pagination.limit
      apiStore.list(this.$route.params.id, this.selectedSearchType, this.keyword, page, limit, data => {
        if (data.result) {
          my.apiList = data.data.items
          my.pagination.total = data.data.total
        } else {
          my.$store.dispatch('showNotification', { type: 'error', message: data.msg })
        }
      })
    }
  }
}
</script>

