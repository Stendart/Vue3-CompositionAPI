import axios from '../../axios/request'
import store from '../index'
// import axios from 'axios';

export default {
  namespaced: true,

  state() {
    return {
      sidebar: false
    }
  },

  mutations: {
    openSidebar(state) {
      state.sidebar = true
    },
    closeSidebar(state) {
      state.sidebar = false
    }
  },

  actions: {
  },

  getters: {
    getSidebar(state) {
      return state.sidebar
    }
  }
}
