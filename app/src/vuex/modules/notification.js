import * as types from '../mutation-types'

const state = {
  options: {
    show: false,
    message: '',
    type: ''
  }
}

const mutations = {
  [types.SHOW_NOTIFICATION] (state, options) {
    state.options.show = true
    state.options.message = options.message
    state.options.type = options.type
  },
  [types.HIDE_NOTIFICATION] (state) {
    state.options.show = false
  }
}

const actions = {
  showNotification ({ commit }, notification) {
    commit(types.SHOW_NOTIFICATION, notification)
  },

  hideNotification ({ commit }) {
    commit(types.HIDE_NOTIFICATION)
  }
}

export default {
  actions,
  state,
  mutations
}
