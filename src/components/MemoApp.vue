<template>
  <div class="memo-app">
    <h1 class="bg-secondary text-white display-4 px-3 text-center">MemoApp</h1>
    <p class="font-weight-bold" v-if="data.closeTextArea" @click="openTextArea">+</p>
    <div v-else @dblclick="initializeTextArea">
      <textarea class="form-control w-50 mx-auto" name='content' v-model="data.content"></textarea>
      <button class="btn btn-info m-2" @click="addMemo">SAVE</button>
    </div>
    <ul class="list-group">
      <div v-if="data.closeEditTextArea" @click="openEditTextArea">
        <li class="list-group-item list-group-item-action w-25 mx-auto" v-for="memo in memos" v-bind:key="memo.id" @click="selectedMemo(memo)">{{ memo.content.split('\n')[0] }}</li>
      </div>
      <div v-else>
        <textarea class="form-control w-50 mx-auto" name="edit_content" v-model="data.content"  @dblclick="initializeTextArea"></textarea>
        <button class="btn btn-info m-2" @click="editMemo(data)">EDIT</button>
        <button class="btn btn-info m-2" @click="deleteMemo(data)">DELETE</button>
      </div>
    </ul>
  </div>
</template>

<script>
import { reactive } from "vue";
import { useStore } from "vuex"

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
      closeTextArea: true,
      closeEditTextArea: true,
      select: false
    })
    const insert = () => {
      data.store.commit('addMemo',
          {
            id: '',
            content: data.content
          }
      )
      data.content =  ''
      data.closeTextArea = true
    }
    const edit = () => {
      data.store.commit('editMemo',
          {
            id: data.id,
            content: data.content
          }
      )
      data.id = ''
      data.content = ''
      data.closeEditTextArea = true
    }
    const openTextArea = () => {
      data.closeTextArea = false
    }
    const openEditTextArea = () => {
      data.closeEditTextArea = false
      data.closeTextArea = true
    }
    const initializeTextArea = () => {
      data.closeTextArea = true
      data.closeEditTextArea = true
      data.content = ''
    }
    const selectedMemo = (memo) => {
      data.id = memo.id
      data.content = memo.content
      data.closeTextArea = false
      data.select = true
    }
    const deleteMemo = () => {
      if (data.select) {
        data.store.commit('deleteMemo', data.id)
      } else {
        console.log('error')
      }
      data.closeEditTextArea = true
      data.id = ''
      data.content = ''
    }
    return {
      data,
      addMemo: insert,
      openTextArea,
      openEditTextArea,
      initializeTextArea,
      selectedMemo,
      editMemo: edit,
      deleteMemo
    }
  }
}
</script>
