import { createStore, createLogger} from 'vuex'
import state from './state'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'
import role from './modules/role'

const store = createStore({
  plugins: process.env.NODE_ENV === 'development' ? [createLogger()] : [],
  state,
  getters,
  mutations,
  actions,
  modules: {
    role
  }
})

export default store