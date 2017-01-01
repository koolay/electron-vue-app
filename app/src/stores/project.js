import http from '../services/http'

export default {
  all (cb = null) {
    http.get('api/projects', data => {
      cb(data)
    })
  }
}
