import http from '../services/http'
import ls from '../services/ls'
export default {
  login (username, password, cb = null) {
    if (!username || !password) {
      cb({ result: false, msg: '帐号或密码错误' })
    }

    http.post('api/login', { username, password }, data => {
      if (data.result) {
        ls.set('token', data.token)
        cb({ result: true, token: data.token })
      } else {
        cb({ result: false, msg: data.msg })
      }
    })
  }
}
