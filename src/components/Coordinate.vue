<template>
  <div>
    <div :style="{left:x + 'px', top:y+ 'px'}" class="dot">Position ({{x.toFixed(2)}}, {{y.toFixed(2)}})</div>
  </div>
</template>
<script>
export default {
  props: {
    x: {
      type: Number,
      default: 10
    },
    y: {
      type: Number,
      default: 10
    }
  },
  methods: {
  }
}
</script>
<style>
  .dot {
    position: absolute;
    background-color: blueviolet;
    width: 10px;
    height: 10px;
  }
</style>
