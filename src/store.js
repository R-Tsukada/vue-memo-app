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
      state.memos.find((memo) => {
        memo.id === memoData.id ? memo.content = memoData.content : undefined
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
