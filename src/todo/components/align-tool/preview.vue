<template>
  <div :class="['preview', { show: showPreview }]">
    <div v-show="showPreview" class="content"></div>
    <el-button
      @click="handleToggle"
      :icon="toggleIcon"
      type="primary"
      circle
      size="mini"
      class="toggle"
    />
  </div>
</template>

<script>
export default {
  name: 'AtPreview',
  data() {
    return {
      showPreview: false
    }
  },
  computed: {
    toggleIcon() {
      const direction = this.showPreview ? 'left' : 'right'
      return `el-icon-arrow-${direction}`
    }
  },
  methods: {
    handleToggle() {
      this.showPreview = !this.showPreview
      this.$emit('toggle')
    }
  }
}
</script>

<style lang="scss" scoped>
.preview {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 14px;
  padding: 0;
  background-color: pink;
  &.show {
    width: 100%;
    padding: 14px;
  }
  .toggle {
    position: absolute;
    top: 50%;
    right: 0;
    transform: translate(50%, -50%);
  }
}
</style>
