<template>
  <div class="memo-app">
    <h1 class="bg-secondary text-white display-4 px-3 text-center">MemoApp</h1>
    <p class="font-weight-bold" v-if="data.isTextAreaClosed" @click="openTextArea">+</p>
    <div v-else>
      <textarea class="form-control w-50 mx-auto" name='content' v-model="data.content"></textarea>
      <button class="btn btn-success m-2" @click="addMemo">SAVE</button>
      <button class="btn btn-secondary m-2" @click="initializeTextArea">CANCEL</button>
    </div>
    <ul class="list-group">
      <div v-if="data.isEditTextAreaClosed" @click="openEditTextArea">
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
      isTextAreaClosed: true,
      isEditTextAreaClosed: true,
      isSelected: false
    })
    const addMemo = () => {
      data.store.commit('addMemo', data.content)
      data.content = ''
      data.isTextAreaClosed = true
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
      data.isEditTextAreaClosed = true
    }
    const openTextArea = () => {
      data.isTextAreaClosed = false
    }
    const openEditTextArea = () => {
      data.isEditTextAreaClosed = false
      data.isTextAreaClosed = true
    }
    const initializeTextArea = () => {
      data.isTextAreaClosed = true
      data.isEditTextAreaClosed = true
      data.content = ''
    }
    const selectedMemo = (memo) => {
      data.id = memo.id
      data.content = memo.content
      data.isTextAreaClosed = false
      data.isSelected = true
    }
    const deleteMemo = () => {
      data.isSelected ? data.store.commit('deleteMemo', data) : undefined
      data.isEditTextAreaClosed = true
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
