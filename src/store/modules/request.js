import axios from '../../axios/request'
import store from '../index'
// import axios from 'axios';

export default {
  namespaced: true,

  state() {
    return {
      requests: []
    }
  },

  mutations: {
    setRequests(state, payload) {
      state.requests = payload
    },
    addRequest(state, request) {
      state.requests.push(request);
    }
  },

  actions: {
    async getData({commit}) {
      try {
        const token = store.getters['auth/token']
        const {data} = await axios.get(`/requests.json?auth=${token}`);
        const arrAns = Object.keys(data).map((id) => ({...data[id], id}))
        commit('setRequests', arrAns)
      } catch (e) {
        console.log('Ошибка', e.message)
      }
    },
    async getDataByID(_, id) {
      try {
        const token = store.getters['auth/token']
        const {data} = await axios.get(`/requests/${id}.json?auth=${token}`);
        return data
      } catch (e) {
        console.log('Ошибка', e.message)
      }
    },
    async remove({dispatch}, id) {
      try {
        const token = store.getters['auth/token']
        const data = await axios.delete(`/requests/${id}.json?auth=${token}`);
        console.log('data', data)
        dispatch('setMessage', {
          value: 'Заявка обновлена',
          type: 'primary'
        }, {root: true} )
      } catch (e) {
        console.log('Ошибка', e.message)
      }
    },
    async update({dispatch}, payload) {
      try {
        const token = store.getters['auth/token']
        const data = await axios.put(`/requests/${payload.id}.json?auth=${token}`, payload);
        console.log('data', data)
        dispatch('setMessage', {
          value: 'Заявка обновлена',
          type: 'primary'
        }, {root: true} )
      } catch (e) {
        console.log('Ошибка', e.message)
      }
    },
    async create({commit, dispatch}, payload) {
      try {
        const token = store.getters['auth/token']
        const {data} = await axios.post(`/requests.json?auth=${token}`, payload)

        commit('addRequest', {...payload, id: data.name})
        dispatch('setMessage', {
          value: 'Успешно',
          type: 'primary'
        }, {root: true})
      } catch (e) {
        dispatch('setMessage', {
          value: e.message,
          type: 'danger'
        }, {root: true})
      }
    }
  },

  getters: {
    getRequests(state) {
      return state.requests
    },
  }
}
