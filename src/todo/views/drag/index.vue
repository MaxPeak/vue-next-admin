<template>
  <div class="drag">
    <div class="box" v-drag></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      parent: null
    }
  },
  mounted() {
    this.parent = this.$el
  }
}
</script>

<style lang="scss" scoped>
.drag {
  .box {
    width: 200px;
    height: 200px;
    background-color: skyblue;
  }
}
</style>
