import {createStore} from 'vuex'
import createPersistedState from 'vuex-persistedstate'

export const store = createStore({
  state: () => {
    return {
      memos: []
    }
  },
  mutations: {
    addMemo: (state, memoData) => {
      state.memos.unshift({
        id: state.memos.length + 1,
        content: memoData
      })
    },
    editMemo: (state, memoData) => {
      for (let i = 0; i < state.memos.length; i++) {
        const stateMemos = state.memos[i]
        stateMemos.id === memoData.id ? state.memos.splice(i, 1) : undefined
      }
      state.memos.unshift({
        id: memoData.id,
        content: memoData.content
      })
    },
    deleteMemo: (state, memoData) => {
      const memoSelected = state.memos.filter(function (memo) {
        return memo.id != memoData.id
      })
      state.memos = memoSelected
    }
  },
  plugins: [
    createPersistedState(),
  ]
})
