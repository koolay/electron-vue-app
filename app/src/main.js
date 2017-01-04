import Vue from 'vue'
import Electron from 'vue-electron'
import Resource from 'vue-resource'
import Router from 'vue-router'
import NProgress from 'nprogress'

import App from './App'
import routes from './routes'
import 'bulma/css/bulma.css'
import 'nprogress/nprogress.css'
import config from '../../config'
import ls from './services/ls'

Vue.config.debug = true
Vue.use(Electron)
Vue.use(Resource)
Vue.use(Router)
Vue.use(require('vue-resource'))
Vue.http.options.root = config.apiHost

// [> global alert <]
Vue.http.interceptors.push((request, next) => {
  const token = ls.get('token')
  if (token) {
    Vue.http.headers.common['Authorization'] = `Bearer ${token}`
  }
  next((response) => {
    NProgress.done()
  })
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
