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
    },
    deleteMemo: (state, object) => {
      console.log(object)
      for (let i = 0; i < state.memos.length; i++) {
        const body = state.memos[i]
        if (body.id === object) {
          state.memos.splice(i, 1)
        } else {
          console.log('error')
        }
      }
    }
  },
  plugins: [
    createPersistedState(),
  ]
})
