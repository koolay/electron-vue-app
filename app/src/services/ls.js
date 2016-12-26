const Config = require('electron-config')
const cfg = new Config()

export default {

  get(key) {
    return cfg.get(key)
  },

  set(key, value) {
    return cfg.set(key, value)
  },

  delete(key) {
    return cfg.delete(key)
  }

}
