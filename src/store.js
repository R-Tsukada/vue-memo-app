import {createStore} from 'vuex'
import createPersistedState from 'vuex-persistedstate'

export const store = createStore({
  state: () => {
    return {
      memos: []
    }
  },
  mutations: {
    addMemo: (state, content) => {
      state.memos.unshift({id: state.memos.length + 1, content: content})
    },
    editMemo: (state, {id, content}) => {
      const memo = state.memos.find(memo => memo.id === id)
      memo.content = content
    },
    deleteMemo: (state, id) => {
      state.memos = state.memos.filter(memo => memo.id !== id)
    }
  },
  plugins: [
    createPersistedState(),
  ]
})
