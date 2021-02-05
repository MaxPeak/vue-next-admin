<template>
  <div
    class="v-file"
    @click="handleClick"
    @drop.stop.prevent="handelDrop"
    @dragover.stop.prevent
  >
    <input
      ref="file"
      v-show="false"
      @change="handelChange"
      v-bind="$attrs"
      type="file"
    />
    <slot></slot>
  </div>
</template>

<script>
import { getFiles, getDirectoryTree } from './file'
export default {
  name: 'VFile',
  inheritAttrs: false,
  props: {
    // 触发条件 [drag,click]
    trigger: {
      type: String,
      default: 'click'
    }
  },
  computed: {
    isDirectory() {
      return this.$attrs.webkitdirectory
    }
  },
  methods: {
    // 验证触发条件
    validata(trigger) {
      return this.trigger.split(',').includes(trigger)
    },
    // 点击触发
    handleClick() {
      if (!this.validata('click')) return
      this.$refs.file.value = null
      this.$refs.file.click()
    },
    handelChange({ target }) {
      const { files } = target
      const data = [...files].map(file => {
        file.path = file.webkitRelativePath
        return file
      })
      const tree = getDirectoryTree(data)
      this.$emit('change', data, tree)
    },
    // 拖拽触发
    async handelDrop({ dataTransfer }) {
      if (!this.validata('drag')) return
      const files = await this.getFiles(dataTransfer)
      const tree = getDirectoryTree(files)
      this.$emit('change', files, tree)
    },
    // 获取文件列表
    async getFiles(dataTransfer) {
      const { files, items } = dataTransfer
      if (this.isDirectory) {
        return await getFiles(items)
      } else {
        return [...files].map(file => {
          file.path = file.webkitRelativePath
          return file
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.v-file {
  display: inline-block;
}
</style>
