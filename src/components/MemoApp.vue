<template>
  <div class="memo-app">
    <h1 class="bg-secondary text-white display-4 px-3 text-center">MemoApp</h1>
    <p class="font-weight-bold" v-if="data.isAdding" @click="openAddTextArea">+</p>
    <div v-else>
      <textarea class="form-control w-50 mx-auto" name='content' v-model="data.content"></textarea>
      <button class="btn btn-success m-2" @click="addMemo">SAVE</button>
      <button class="btn btn-secondary m-2" @click="initializeTextArea">CANCEL</button>
    </div>
    <ul class="list-group">
      <div v-if="data.isShowing" @click="openEditTextArea">
        <li class="list-group-item list-group-item-action w-25 mx-auto" v-for="memo in memos" v-bind:key="memo.id"
            @click="selectedMemo(memo)">{{ memo.content.split('\n')[0] }}
        </li>
      </div>
      <div v-else>
        <textarea class="form-control w-50 mx-auto" name="edit_content" v-model="data.content"></textarea>
        <button class="btn btn-success m-2" @click="editMemo">SAVE</button>
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
      return this.$store.state.memos
    }
  },
  setup() {
    const data = reactive({
      id: '',
      content: '',
      store: useStore(),
      isAdding: true,
      isShowing: true,
    })
    const addMemo = () => {
      data.store.commit('addMemo', data.content)
      data.content = ''
      data.isAdding = true
    }
    const editMemo = () => {
      data.store.commit('editMemo', {id: data.id, content: data.content})
      data.id = ''
      data.content = ''
      data.isShowing = true
    }
    const openAddTextArea = () => {
      data.isAdding = false
    }
    const openEditTextArea = () => {
      data.isShowing = false
      data.isAdding = true
    }
    const initializeTextArea = () => {
      data.isAdding = true
      data.isShowing = true
      data.content = ''
    }
    const selectedMemo = (memo) => {
      data.id = memo.id
      data.content = memo.content
      data.isAdding = false
    }
    const deleteMemo = () => {
      data.isShowing = true
      data.store.commit('deleteMemo', data)
      data.id = ''
      data.content = ''
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
