<template>
  <div class="memo-app">
    <h1>MemoApp</h1>
    <textarea name='content' v-model="data.content"></textarea>
    <button @click="addMemo">SAVE</button>
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
      store: useStore()
    })
    const insert = () => {
      data.store.commit('addMemo',
          {
            id: '',
            content: data.content
          }
      )
    }
    return {
      data,
      addMemo: insert,
    }
  }
}
</script>
