import axios from 'axios';
import {errorMessage} from '../../utils/errorList';
const TOKEN_KEY = 'jwt-token'
export default {
  namespaced: true,

  state() {
    return {
      token: localStorage.getItem(TOKEN_KEY)
    }
  },

  mutations: {
    setToken(state, token) {
      state.token = token
      localStorage.setItem(TOKEN_KEY, token)
    },
    logout(state) {
      state.token = null
      localStorage.removeItem(TOKEN_KEY)
    },
  },

  actions: {
    async login({ commit, dispatch }, payload) {
      try {
        // https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]
        // https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.VUE_APP_FB_KEY}`
        const {data} = await axios.post(url, {...payload, returnSecureToken: true})
        commit('setToken', data.idToken)
        commit('setMessage', null, {root: true})
      } catch (e) {
        dispatch('setMessage', {
          value: errorMessage(e.response.data.error.message),
          type: 'danger'
        }, {root: true})
        console.log(errorMessage(e.response.data.error.message))
        throw new Error()
      }

      // Neskajy98@yandex.ua 123456
      // commit('setToken', 'test token')
    }
  },

  getters: {
    token(state) {
      return state.token
    },
    isAuthenticated(_, getters) {
      return !!getters.token
    }
  }
}
