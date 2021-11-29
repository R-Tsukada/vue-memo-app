import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

export const store = createStore({
  state: () => {
    return {
      memos:[]
    }
  },
  mutations: {
    addMemo: (state, object) => {
      console.log('addMemo')
      state.memos.unshift({
        id: state.memos.length + 1,
        content: object.content
      })
    },
    editMemo: (state, object) => {
      state.memos.unshift({
        id: state.memos.length + 1,
        content: object.content
      })
      const number = state.memos.length - 1
      state.memos.splice(number - 1, 1)
    }
  },
  plugins: [
    createPersistedState(),
  ]
})
