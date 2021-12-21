<template>
  <div class="memo-app">
    <h1 class="bg-secondary text-white display-4 px-3 text-center">MemoApp</h1>
    <div v-if="data.isAdding">
      <textarea class="form-control w-50 mx-auto" name='content' v-model="data.addingNewMemoContent"></textarea>
      <button class="btn btn-success m-2" @click="addMemo">SAVE</button>
      <button class="btn btn-secondary m-2" @click="closeAddTextArea">CANCEL</button>
    </div>
    <p class="font-weight-bold" v-else @click="openAddTextArea">+</p>
    <ul class="list-group">
      <div v-if="data.isEditing">
        <textarea class="form-control w-50 mx-auto" name="edit_content" v-model="data.selectedMemoContent"></textarea>
        <button class="btn btn-success m-2" @click="editMemo">SAVE</button>
        <button class="btn btn-danger m-2" @click="deleteMemo">DELETE</button>
        <button class="btn btn-secondary m-2" @click="closeEditTextArea">CANCEL</button>
      </div>
      <div v-else>
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
      addingNewMemoContent: '',
      store: useStore(),
      isAdding: false,
      isEditing: false,
    })
    const addMemo = () => {
      data.store.commit('addMemo', data.addingNewMemoContent)
      initializeAddTextArea()
      closeAddTextArea()
    }
    const editMemo = () => {
      data.store.commit('editMemo', data)
      initializeEditTextArea()
      closeEditTextArea()
    }
    const deleteMemo = () => {
      data.store.commit('deleteMemo', data.selectedMemoId)
      data.isEditing = false
      initializeEditTextArea()
    }
    const selectedMemo = (memo) => {
      data.selectedMemoId = memo.id
      data.selectedMemoContent = memo.content
      openEditTextArea()
    }
    const openAddTextArea = () => {
      data.isAdding = true
    }
    const openEditTextArea = () => {
      data.isEditing = true
    }
    const closeAddTextArea = () => {
      data.isAdding = false
    }
    const closeEditTextArea = () => {
      data.isEditing = false
    }
    const initializeAddTextArea = () => {
      data.addingNewMemoContent = ''
    }
    const initializeEditTextArea = () => {
      data.selectedMemoId = ''
      data.selectedMemoContent = ''
    }
    return {
      data,
      addMemo,
      editMemo,
      deleteMemo,
      selectedMemo,
      openAddTextArea,
      openEditTextArea,
      closeAddTextArea,
      closeEditTextArea,
      initializeAddTextArea,
      initializeEditTextArea
    }
  }
}
</script>
