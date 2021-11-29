<template>
  <div class="memo-app">
    <h1>MemoApp</h1>
    <p v-if="data.closeTextArea" @click="openTextArea">+</p>
    <div v-else @dblclick="initializeTextArea">
      <textarea name='content' v-model="data.content"></textarea>
      <button @click="addMemo">SAVE</button>
    </div>
    <!--    デバッグ用-->
    <p>{{$store.state.memos}}</p>
    <ul>
      <div v-if="data.closeEditTextArea" @click="openEditTextArea">
        <li  v-for="memo in memos" v-bind:key="memo.id" @click="selectedMemo(memo)">{{ memo.content.split('\n')[0] }}</li>
      </div>
      <div v-else>
        <textarea name="edit_content" v-model="data.content"  @dblclick="initializeTextArea"></textarea>
        <button @click="editMemo(data)">EDIT</button>
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
      content: '',
      store: useStore(),
      closeTextArea: true,
      closeEditTextArea: true,
    })
    const insert = () => {
      console.log('insert')
      data.store.commit('addMemo',
          {
            id: '',
            content: data.content
          }
      )
      data.content =  ''
    }
    const edit = () => {
      console.log(data.content)
      data.store.commit('editMemo',
          {
            content: data.content
          }
      )
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
      data.content = memo.content
      data.closeTextArea = false
    }
    return {
      data,
      addMemo: insert,
      openTextArea,
      openEditTextArea,
      initializeTextArea,
      selectedMemo,
      editMemo: edit
    }
  }
}
</script>
