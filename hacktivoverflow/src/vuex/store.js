import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    mainlist: []
  },
  mutations: {
    masterlist (state, payload) {
      state.mainlist = payload
      console.log('this is mainlist at store', state.mainlist)
    }
  },
  actions: {
    getQuestions ({ commit }, payload) {
      axios.get('http://localhost:3000/questions')
        .then(function (response) {
          console.log('this is the data', response.data)
          commit('masterlist', response.data)
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }

})

export default store
