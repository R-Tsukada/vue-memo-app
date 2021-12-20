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
      state.memos.unshift({id: state.memos.length + 1, content: memoData})
    },
    editMemo: (state, {id, content}) => {
      const memo = state.memos.find(memo => memo.id === id)
      memo.content = content
    },
    deleteMemo: (state, memoData) => {
      const memoSelected = state.memos.filter((memo) => memo.id != memoData.id)
      state.memos = memoSelected
    }
  },
  plugins: [
    createPersistedState(),
  ]
})
