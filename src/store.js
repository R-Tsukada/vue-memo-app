import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

export const store = createStore({
  state: () => {
    return {
      memos:[]
    }
  },
  mutations: {
    addMemo: (state, memoData) => {
      state.memos.unshift({
        id: state.memos.length + 1,
        content: memoData.content
      })
    },
    editMemo: (state, memoData) => {
      for (let i = 0; i < state.memos.length; i++) {
        const stateMemos = state.memos[i]
        if (stateMemos.id === memoData.id) {
          state.memos.splice(i, 1)
        } else {
          console.log('error')
        }
      }
      state.memos.unshift({
        id: memoData.id,
        content: memoData.content
      })
    },
    deleteMemo: (state, memoId) => {
      for (let i = 0; i < state.memos.length; i++) {
        const body = state.memos[i]
        if (body.id === memoId) {
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
