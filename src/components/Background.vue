<template>
  <div class="hello" @mousedown="move">
    <Coordinate v-for="m in msg" :key="m.x" :x="m.x" :y="m.y"/>
  </div>
</template>

<script>
import Coordinate from './Coordinate'
export default {
  name: 'HelloWorld',
  components: {Coordinate},
  data () {
    return {
      positionX: 0,
      positionY: 0,
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
    move (e) {
      let odiv = e.target // 获取目标元素
      let parent = e.target.parentNode

      // 算出鼠标相对元素的位置
      let disX = e.clientX - odiv.offsetLeft
      let disY = e.clientY - odiv.offsetTop
      document.onmousemove = (e) => { // 鼠标按下并移动的事件
        // 用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
        let left = e.clientX - disX
        let top = e.clientY - disY

        // 绑定元素位置到positionX和positionY上面
        this.positionX = top
        this.positionY = left

        // 移动当前元素
        if (left <= parent.offsetLeft - odiv.offsetWidth) {
          odiv.style.left = 20 - odiv.offsetWidth + 'px'
        } else if (left >= parent.offsetLeft + parent.offsetWidth) {
          odiv.style.left = parent.offsetWidth - 20 + 'px'
        } else {
          odiv.style.left = left - parent.offsetLeft + 'px'
        }
        if (top <= parent.offsetTop - odiv.offsetHeight) {
          odiv.style.top = 20 - odiv.offsetHeight + 'px'
        } else if (top >= parent.offsetTop + parent.offsetHeight + odiv.offsetHeight - 20) {
          odiv.style.top = odiv.offsetHeight - 20 + 'px'
        } else {
          odiv.style.top = top - parent.offsetTop + 'px'
        }
      }
      document.onmouseup = (e) => {
        document.onmousemove = null
        document.onmouseup = null
      }
    },
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
      // console.log(this.msg)
    },

    websocketsend (agentData) {
      this.$websocket.send(agentData)
    },

    websocketclose (e) {
      console.log('connection closed (' + e.code + ')')
    }
  },
  computed: {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .hello {
    position: relative;
    background-color: aquamarine;
    height: 2000px;
    width: 1000px;
  }
h1, h2 {
  font-weight: normal;
}
</style>
