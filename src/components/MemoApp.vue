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
      <li v-for="memo in memos" v-bind:key="memo.id">{{ memo.content.split('\n')[0]}}</li>
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
      closeTextArea: true
    })
    const insert = () => {
      console.log('insert')
      data.store.commit('addMemo',
          {
            id: '',
            content: data.content
          }
      )
      data.content = ''
    }
    const openTextArea = () => {
      data.closeTextArea = false
    }
    const initializeTextArea = () => {
      data.closeTextArea = true
    }
    return {
      data,
      addMemo: insert,
      openTextArea,
      initializeTextArea,
    }
  }
}
</script>
