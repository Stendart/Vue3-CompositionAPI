import { createStore, createLogger } from 'vuex'
import auth from './modules/auth'
import request from './modules/request'
import sidebar from './modules/sidebar';

const plugins = [];

if (process.env.NODE_ENV === 'development') {
  plugins.push(createLogger())
}
export default createStore({
  plugins,
  state: () => {
    return {
      message: null
    }
  },
  mutations: {
    setMessage(state, message) {
      state.message = message
    },
    clearMessage(state) {
      state.message = null
    }
  },
  actions: {
    setMessage({commit}, message) {
      commit('setMessage', message)
      setTimeout(()=>{
        commit('clearMessage')
      }, 5000)
    }
  },
  getters: {
    getMessage(state) {
      return state.message
    }
  },
  modules: {
    auth,
    request,
    sidebar
  }
})
