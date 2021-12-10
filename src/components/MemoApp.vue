<template>
  <div class="memo-app">
    <h1 class="bg-secondary text-white display-4 px-3 text-center">MemoApp</h1>
    <p class="font-weight-bold" v-if="data.isCloseTextArea" @click="openTextArea">+</p>
    <div v-else>
      <textarea class="form-control w-50 mx-auto" name='content' v-model="data.content"></textarea>
      <button class="btn btn-success m-2" @click="addMemo">SAVE</button>
      <button class="btn btn-secondary m-2" @click="initializeTextArea">CANCEL</button>
    </div>
    <ul class="list-group">
      <div v-if="data.isCloseEditTextArea" @click="openEditTextArea">
        <li class="list-group-item list-group-item-action w-25 mx-auto" v-for="memo in memos" v-bind:key="memo.id"
            @click="selectedMemo(memo)">{{ memo.content.split('\n')[0] }}
        </li>
      </div>
      <div v-else>
        <textarea class="form-control w-50 mx-auto" name="edit_content" v-model="data.content"></textarea>
        <button class="btn btn-success m-2" @click="editMemo">EDIT</button>
        <button class="btn btn-danger m-2" @click="deleteMemo">DELETE</button>
        <button class="btn btn-secondary m-2" @click="initializeTextArea">CANCEL</button>
      </div>
    </ul>
  </div>
</template>

<script>
import {reactive} from "vue";
import {useStore} from "vuex"

export default {
  computed: {
    memos: function () {
      const memos = this.$store.state.memos
      const memosSort = memos.sort(function (memoFirstArgument, memoSecondArgument) {
        if (memoFirstArgument.id < memoSecondArgument.id) {
          return -1
        } else if (memoFirstArgument.id > memoSecondArgument.id) {
          return 1
        }
      })
      return memosSort
    }
  },
  setup() {
    const data = reactive({
      id: '',
      content: '',
      store: useStore(),
      isCloseTextArea: true,
      isCloseEditTextArea: true,
      isSelect: false
    })
    const addMemo = () => {
      data.store.commit('addMemo',
          {
            id: '',
            content: data.content
          }
      )
      data.content = ''
      data.isCloseTextArea = true
    }
    const editMemo = () => {
      data.store.commit('editMemo',
          {
            id: data.id,
            content: data.content
          }
      )
      data.id = ''
      data.content = ''
      data.isCloseEditTextArea = true
    }
    const openTextArea = () => {
      data.isCloseTextArea = false
    }
    const openEditTextArea = () => {
      data.isCloseEditTextArea = false
      data.isCloseTextArea = true
    }
    const initializeTextArea = () => {
      data.isCloseTextArea = true
      data.isCloseEditTextArea = true
      data.content = ''
    }
    const selectedMemo = (memo) => {
      data.id = memo.id
      data.content = memo.content
      data.isCloseTextArea = false
      data.isSelect = true
    }
    const deleteMemo = () => {
      if (data.isSelect) {
        data.store.commit('deleteMemo', data.id)
      } else {
        console.log('error')
      }
      data.isCloseEditTextArea = true
      data.id = ''
      data.content = ''
    }
    return {
      data,
      addMemo,
      openTextArea,
      openEditTextArea,
      initializeTextArea,
      selectedMemo,
      editMemo,
      deleteMemo
    }
  }
}
</script>
