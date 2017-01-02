import http from '../services/http'
import ls from '../services/ls'

export default {
  all (cb = null) {
    http.get('api/projects', data => {
      cb(data)
    })
  },

  getHost (projectId, cb = null) {
    const host = ls.get(`host_project_${projectId}`)
    if (cb) {
      cb(host)
    }
    return host
  },

  saveHost (projectId, host, cb = null) {
    if (!projectId) {
      return false
    }

    ls.set(`host_project_${projectId}`, host)
    if (cb) {
      cb(true)
    }
    return true
  }
}
