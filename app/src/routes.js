import Master from './components/Master.vue'
import Welcome from './components/Welcome.vue'
import Login from './components/Login.vue'
import Projects from './components/Projects.vue'
import Apis from './components/Apis.vue'
import Api from './components/Api.vue'

export default [
  {
    path: '/',
    name: 'welcome',
    component: Welcome
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/master',
    name: 'master',
    component: Master,
    children: [
      {
        path: '/projects',
        component: Projects
      },

      {
        name: 'apiList',
        path: '/apis/project/:id',
        component: Apis
      },

      {
        name: 'apiTest',
        path: '/api/project/:projectId/:id',
        component: Api
      }
    ]
  },
  {
    path: '*',
    redirect: '/'
  }
]
