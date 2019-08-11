<template>
  <div id="app">
    <div class="frame">
      <Background :pos="msg"/>
    </div>
    <button>This is a test button</button>
    <table>
      <tbody>
      <tr>
      <td>ID</td>
      <td>X-index</td>
      <td>Y-index</td>
      </tr>
      <tr v-for="m in msg" :key="m.id">
        <td>{{m.id}}</td>
        <td>{{m.x.toFixed(2)}}</td>
        <td>{{m.y.toFixed(2)}}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import Background from './components/Background'

export default {
  name: 'App',
  components: {
    Background: Background
  },
  data () {
    return {
      websock: null,
      msg: []
    }
  },
  destroyed: function () {
    this.websocketclose()
  },
  created () {
    this.initWebSocket()
  },
  methods: {

    initWebSocket () {
      const wsuri = 'ws://localhost:3000'

      this.$websocket = new WebSocket(wsuri)

      this.$websocket.onopen = this.websocketonopen

      this.$websocket.onerror = this.websocketonerror

      this.$websocket.onmessage = this.websocketonmessage

      this.$websocket.onclose = this.websocketclose
    },

    websocketonopen () {
      console.log('WebSocket连接成功')
    },

    websocketonerror (e) {
      console.log('WebSocket连接发生错误')
    },

    websocketonmessage (e) {
      // console.log(e.data)

      this.msg.push(JSON.parse(e.data))
      if (this.msg.length > 8) {
        this.msg = this.msg.splice(1)
      }
      // console.log(this.msg)
    },

    websocketsend (agentData) {
      this.$websocket.send(agentData)
    },

    websocketclose (e) {
      console.log('connection closed (' + e.code + ')')
    }
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
  display: inline-block;
  width: 60%;
  height: 600px;
  border: #cccccc 1px solid;
  overflow: hidden;
  float: left;
}
  button {
    color: aliceblue;
    background-color: cadetblue;
    border-radius: 4px;
    border: none;
    font-size: 16px;
    padding: 5px;
    top: 0;
  }
  table {
    float: right;
    width: 39%;
  }
  td {
    border: darkmagenta 1px solid;
    height: 40px;
    padding: 10px;
  }
</style>
