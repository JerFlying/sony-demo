<template>
  <div id="app">
    <div class="frame">
      <HelloWorld/>
    </div>
  </div>
</template>

<script>
import HelloWorld from './components/Background'

export default {
  name: 'App',
  components: {
    HelloWorld
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.frame {
  width: 1000px;
  height: 600px;
  border: #cccccc 1px solid;
  overflow: hidden;
}
</style>
