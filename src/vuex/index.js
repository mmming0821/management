import Vue from 'vue'
import Vuex from 'vuex'
import table from './modules/table'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    table
  }
})

export default store
