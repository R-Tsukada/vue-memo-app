<template>
  <HelloWorld />
</template>

<script>
import MemoApp from './components/MemoApp.vue'

export default {
  name: 'App',
  components: {
    MemoApp
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
