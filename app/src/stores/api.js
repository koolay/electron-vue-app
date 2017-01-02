import http from '../services/http'

export default {
  list (projectId, searchType, keyword, page = 1, limit = 10, cb = null) {
    // http://localhost:1337/api/apis?page=1&projectId=583b1b9f9104e901f5b79c84&searchType=name&keyword=&t=1483291269683
    page = page || 1
    searchType = searchType || 'name'
    keyword = keyword || ''
    const apiUrl = `api/apis?page=${page}&projectId=${projectId}&searchType=${searchType}&keyword=${keyword}&limit=${limit}`
    http.get(apiUrl, data => {
      cb(data)
    })
  },

  detail (apiId, cb = null) {
    if (!apiId) {
      cb(null)
    }

    const apiUrl = `api/apis/${apiId}`
    http.get(apiUrl, data => {
      cb(data)
    })
  },

  getTestCases (apiId, keyword = '', cb = null) {
    if (!apiId) {
      cb(null)
    }

    const apiUrl = `api/mocks?pathid=${apiId}&q=${keyword}`
    http.get(apiUrl, data => {
      cb(data)
    })
  },

  getTestCaseDetail (id, cb = null) {
    if (!id) {
      return null
    }
    const apiUrl = `api/mock?id=${id}`
    http.get(apiUrl, data => {
      cb(data)
    })
  }
}
