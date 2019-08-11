<template>
  <div class="hello" @mousedown="move">
    <Coordinate v-for="m in pos" :key="m.id" :x="m.x" :y="m.y"/>
  </div>
</template>

<script>
import Coordinate from './Coordinate'
export default {
  name: 'HelloWorld',
  components: {Coordinate},
  props: {
    pos: {
      type: Array,
      required: true
    }
  },
  methods: {
    move (e) {
      let odiv = e.target // 获取目标元素
      let parent = e.target.parentNode

      // 算出鼠标相对元素的位置
      let disX = e.clientX - odiv.offsetLeft
      let disY = e.clientY - odiv.offsetTop
      document.onmousemove = (e) => {
        let left = e.clientX - disX
        let top = e.clientY - disY

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
    }
  },
  computed: {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .hello {
    position: relative;
    height: 1500px;
    width: 1500px;
    background:
      -webkit-linear-gradient(top, transparent 99px, aquamarine 100px),
      -webkit-linear-gradient(left, transparent 99px, aquamarine 100px)
  ;
    background-size: 100px 100px;
    border: 1px aquamarine solid;
  }
h1, h2 {
  font-weight: normal;
}
</style>
