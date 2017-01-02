<template>
  <div class="container">
      <!-- Main container -->
      <nav class="level">
        <!-- Left side -->
        <div class="level-left">
          <div class="level-item">
                <multiselect
                  :searchable="true"
                  :close-on-select="true"
                  :custom-label="testCaseLabel"
                  track-by="_id"
                  :allow-empty="false"
                  placeholder="选择用例"
                  @select="selectTestCase"
                  @search-change="fetchTestCases"
                  :options="testCases">
                  <template slot="option" scope="props">
                    <div>
                      <span class="is-pulled-left">
                        {{ props.option.summary }}
                      </span>
                      <span class="is-pulled-right">
                        {{ props.option.createdBy }}
                      </span>
                    </div>
                  </template>
                </multiselect>
          </div>
        </div>

        <!-- Right side -->
        <div class="level-right">
          <p class="level-item">
            <router-link class="button is-link is-primary" :to="{ name: 'apiList', params: { id: projectId } }">
            <span class="icon">
              <i class="fa fa-level-up"></i>
            </span>
            <span>接口列表</span>
            </router-link>
          </p>
        </div>
      </nav>
    <div>
    <div class="container block">
        <p class="control has-addons">
            <input v-model="request.host" 
                   v-bind:class="{'input': true, 'is-expanded': true, 'is-danger': request.host =='' }" 
                   type="text" placeholder="Enter Host">
            <a class="button is-dark" @click="saveHost">
              <span class="icon">
                <i class="fa fa-check"></i>
              </span>
              <span>Save</span>
            </a>
        </p>
    </div>
    
    <div class="container">
        <p class="control has-addons">
          <span class="select">
            <select v-model="request.m">
              <option>GET</option>
              <option>POST</option>
              <option>PUT</option>
              <option>DELETE</option>
              <option>PATCH</option>
              <option>OPTIONS</option>
            </select>
          </span>
            <input v-model="request.path"
                   v-bind:class="{'input': true, 'is-expanded': true, 'is-danger': request.path =='' }"
                   type="text" placeholder="Enter Request URL">
            <a class="button is-primary" @click="send">
              <span class="icon">
                <i class="fa fa-rocket"></i>
              </span>
              Send 
            </a>
        </p>
    <div>
    <div class="container">
      <div class="tabs rquest">
        <ul>
          <li v-bind:class="{ 'is-active': requestTab==='query' }"><a @click="switchRequestTab('query')">Query</a></li>
          <li v-bind:class="{ 'is-active': requestTab==='body' }"><a @click="switchRequestTab('body')">Body</a></li>
          <li v-bind:class="{ 'is-active': requestTab==='headers' }"><a @click="switchRequestTab('headers')">Headers</a></li>
          <li v-bind:class="{ 'is-active': requestTab==='cookies' }"><a @click="switchRequestTab('cookies')">Cookies</a></li>
        </ul>
      </div>
        <p v-if="requestTab==='query'" class="control">
          <textarea class="textarea" v-model="request.query" placeholder="query参数, 请使用json格式"></textarea>
        </p>
        <p v-if="requestTab==='body'" class="control">
          <textarea class="textarea" v-model="request.body" placeholder="body参数, 请使用json格式"></textarea>
        </p>
        <p v-if="requestTab==='headers'" class="control">
          <textarea class="textarea" v-model="request.headers" placeholder="headers, 请使用json格式"></textarea>
        </p>
        <p v-if="requestTab==='cookies'" class="control">
          <textarea class="textarea" v-model="request.cookies" placeholder="cookies, 请使用json格式"></textarea>
        </p>
    </div>

    <h3 style="margin-top: 20px">Response</h3>
    <div class="container" style="">
      <div class="tabs">
        <ul>
          <li v-bind:class="{ 'is-active': responseTab==='body' }"><a @click="switchResponseTab('body')">Body</a></li>
          <li v-bind:class="{ 'is-active': responseTab==='headers' }"><a @click="switchResponseTab('headers')">Headers</a></li>
          <li v-bind:class="{ 'is-active': responseTab==='cookies' }"><a @click="switchResponseTab('cookies')">Cookies</a></li>
        </ul>
        <ul v-if="response.status !== null" class="is-right">
          <li><span class="tag is-success">{{ response.status }}</span></li>
          <li><span class="tag is-info">{{ response.duration }}</span></li>
        </ul>
      </div>
        <p v-if="responseTab==='body'" class="control">
          <textarea class="textarea" v-model="response.body" ></textarea>
        </p>
        <p v-if="responseTab==='headers'" class="control">
          <textarea class="textarea" v-model="response.headers" ></textarea>
        </p>
        <p v-if="responseTab==='cookies'" class="control">
          <textarea class="textarea" v-model="response.cookies" ></textarea>
        </p>
    </div>

  </div>
</template>

<script>
import NProgress from 'nprogress'
import apiStore from '../stores/api'
import projectStore from '../stores/project'
import Multiselect from 'vue-multiselect'
var _ = require('lodash')

const request = require('request')

export default {
  components: { Multiselect },
  data () {
    return {
      projectId: '',
      isLoading: false,
      testCases: [],
      api: null,
      request: {
        host: '',
        m: 'GET',
        path: '',
        pathParams: '',
        query: '',
        headers: '',
        body: '',
        cookies: ''
      },

      response: {
        status: null,
        body: '',
        headers: '',
        cookies: '',
        type: '',
        duration: null
      },

      requestTab: 'query',
      responseTab: 'body'
    }
  },
  created () {
    this.projectId = this.$route.params.projectId
    this.getApi()
    this.fetchTestCases('')
    this.initHost()
  },
  methods: {

    initHost () {
      this.request.host = projectStore.getHost(this.projectId)
    },

    saveHost () {
      if (!this.request.host) {
        return
      }
      NProgress.start()
      projectStore.saveHost(this.projectId, this.request.host, () => {
        NProgress.done()
        this.$store.dispatch('showNotification', { type: 'success', message: '保存成功' })
      })
    },
    switchRequestTab (tab) {
      this.requestTab = tab
    },

    switchResponseTab (tab) {
      this.responseTab = tab
    },

    testCaseLabel ({ summary, createdBy }) {
      return `${summary}`
    },

    fetchTestCases (query) {
      this.isLoading = true
      // NProgress.start()
      apiStore.getTestCases(this.$route.params.id, query, data => {
        this.testCases = data ? data.data : []
        this.isLoading = false
      })
    },

    selectTestCase (item) {
      NProgress.start()
      apiStore.getTestCaseDetail(item._id, data => {
        if (data && data.result && data.data) {
          const tmp = data.data
          this.request.query = tmp.query || ''
          this.request.headers = tmp.headers || ''
          this.request.cookies = tmp.cookies || ''
          this.request.pathParams = tmp.pathParams || ''
          const pathParam = this.request.pathParams || {}
          let apiUrl = tmp.path
          for (const prop in pathParam) {
            apiUrl = apiUrl.replace('{' + prop + '}', pathParam[prop])
          }
          this.request.path = apiUrl
          this.request.m = tmp.method.toUpperCase()
        }
      })
    },

    getApi () {
      apiStore.detail(this.$route.params.id, data => {
        this.api = data.data
      })
    },

    send () {
      const my = this
      if (!this.request.host || !this.request.path) {
        my.$store.dispatch('showNotification', { type: 'error', message: '请设置host和path' })
        return
      }
      const apiUrl = _.trimEnd(this.request.host, '/') + '/' + _.trimStart(this.request.path, '/')
      var options = {
        url: apiUrl,
        jar: false,
        headers: this.request.headers || '',
        method: this.request.method,
        cookies: this.request.cookies,
        form: this.request.body || ''
      }

      NProgress.start()
      const startTime = new Date()
      request(options, function (error, response, body) {
        NProgress.done()
        const endTime = new Date()
        my.response.duration = `${(endTime - startTime) / 1000}s`
        if (error) {
          my.$store.dispatch('showNotification', { type: 'error', message: JSON.stringify(error) })
        } else {
          my.response.status = response.statusCode
          my.response.body = body
          my.response.headers = response.headers
          my.response.cookies = response.cookies
        }
      })
    }
  }
}
</script>

