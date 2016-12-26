import Vue from 'vue'
import Electron from 'vue-electron'
import Resource from 'vue-resource'
import Router from 'vue-router'
import NProgress from 'nprogress'

import App from './App'
import routes from './routes'
import 'bulma/css/bulma.css'

Vue.config.debug = true
Vue.use(Electron)
Vue.use(Resource)
Vue.use(Router)
Vue.use(require('vue-resource'))
// Vue.http.options.root = `${ls.get('apiHost')}/api`
Vue.http.interceptors.push({
  request (r) {
    // let token = ls.get('apiToken')
    // let token = ls.get('apiToken')
    // if (token) {
    // Vue.http.headers.common.Authorization = `Bearer ${token}`
    // }
    return r
  },

  response (r) {
    NProgress.done()
    return r
  }
})

const router = new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes
})

/* eslint-disable no-new */
new Vue({
  router,
  ...App
}).$mount('#app')
