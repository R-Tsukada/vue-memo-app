<template>
  <div class="memo-app">
    <h1 class="bg-secondary text-white display-4 px-3 text-center">MemoApp</h1>
    <div v-if="data.isAdding">
      <textarea class="form-control w-50 mx-auto" name='content' v-model="data.addNewMemo"></textarea>
      <button class="btn btn-success m-2" @click="addMemo">SAVE</button>
      <button class="btn btn-secondary m-2" @click="initializeTextArea">CANCEL</button>
    </div>
    <p class="font-weight-bold" v-else @click="openAddTextArea">+</p>
    <ul class="list-group">
      <div v-if="data.isEditing">
        <textarea class="form-control w-50 mx-auto" name="edit_content" v-model="data.selectedMemoContent"></textarea>
        <button class="btn btn-success m-2" @click="editMemo">SAVE</button>
        <button class="btn btn-danger m-2" @click="deleteMemo">DELETE</button>
        <button class="btn btn-secondary m-2" @click="initializeTextArea">CANCEL</button>
      </div>
      <div v-else @click="openEditTextArea">
        <li class="list-group-item list-group-item-action w-25 mx-auto" v-for="memo in memos" v-bind:key="memo.id"
            @click="selectedMemo(memo)">{{ memo.content.split('\n')[0] }}
        </li>
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
      return this.$store.state.memos
    }
  },
  setup() {
    const data = reactive({
      selectedMemoId: '',
      selectedMemoContent: '',
      addNewMemo: '',
      store: useStore(),
      isAdding: false,
      isEditing: false,
    })
    const addMemo = () => {
      data.store.commit('addMemo', data.addNewMemo)
      data.addNewMemo = ''
      data.isAdding = false
    }
    const editMemo = () => {
      data.store.commit('editMemo', data)
      data.selectedMemoId = ''
      data.selectedMemoContent = ''
      data.isEditing = false
    }
    const openAddTextArea = () => {
      data.isAdding = true
    }
    const openEditTextArea = () => {
      data.isEditing = true
    }
    const initializeTextArea = () => {
      data.isAdding = false
      data.isEditing = false
      data.selectedMemoContent = ''
    }
    const selectedMemo = (memo) => {
      data.selectedMemoId = memo.id
      data.selectedMemoContent = memo.content
      data.isAdding = false
    }
    const deleteMemo = () => {
      data.store.commit('deleteMemo', data.selectedMemoId)
      data.isEditing = false
      data.selectedMemoId = ''
      data.selectedMemoContent = ''
    }
    return {
      data,
      addMemo,
      openAddTextArea,
      openEditTextArea,
      initializeTextArea,
      selectedMemo,
      editMemo,
      deleteMemo
    }
  }
}
</script>
