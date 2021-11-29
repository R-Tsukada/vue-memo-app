import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

export const store = createStore({
  state: () => {
    return {
      memos:[]
    }
  },
  plugins: [
    createPersistedState(),
  ]
})
