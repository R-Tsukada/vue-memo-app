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
    editMemo: (state, {selectedMemoId, selectedMemoContent}) => {
      const memo = state.memos.find(memo => memo.id === selectedMemoId)
      memo.content = selectedMemoContent
    },
    deleteMemo: (state, memoData) => {
      const memoSelected = state.memos.filter(memo => memo.id != memoData.selectedMemoId)
      state.memos = memoSelected
    }
  },
  plugins: [
    createPersistedState(),
  ]
})
