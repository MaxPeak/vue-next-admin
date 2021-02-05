<template>
  <div class="v-scroll">
    <div class="v-scroll-wrap" @scroll="handleScroll" ref="scroll-wrap">
      <slot></slot>
    </div>
    <v-scroll-bar :size="sizeHeight" :move="moveY" vertical />
    <v-scroll-bar :size="sizeWidth" :move="moveX" />
  </div>
</template>

<script>
import Bar from './bar'
export default {
  name: 'VScroll',
  components: {
    [Bar.name]: Bar
  },
  data() {
    return {
      moveX: 0,
      moveY: 0,
      sizeHeight: '',
      sizeWidth: ''
    }
  },
  mounted() {
    this.$nextTick(this.update)
  },
  computed: {
    wrap() {
      return this.$refs['scroll-wrap']
    }
  },
  methods: {
    handleScroll() {
      const wrap = this.wrap
      this.moveY = (wrap.scrollTop * 100) / wrap.clientHeight
      this.moveX = (wrap.scrollLeft * 100) / wrap.clientWidth
    },
    update() {
      const wrap = this.wrap
      const heightPercentage = (wrap.clientHeight * 100) / wrap.scrollHeight
      const widthPercentage = (wrap.clientWidth * 100) / wrap.scrollWidth
      this.sizeHeight = heightPercentage < 100 ? heightPercentage + '%' : '0px'
      this.sizeWidth = widthPercentage < 100 ? widthPercentage + '%' : '0px'
    }
  }
}
</script>

<style lang="scss" scoped>
.v-scroll {
  position: relative;
  width: 100%;
  height: 100%;
  &:hover,
  &:active,
  &:focus {
    .v-scroll-bar {
      opacity: 1;
      transition: opacity 340ms ease-out;
    }
  }
  &-wrap {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0;
      height: 0;
    }
  }
}
</style>
