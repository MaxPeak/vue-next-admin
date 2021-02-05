<template>
  <div class="file-btn">
    <el-button :size="size" type="gradient ripple" @click="handleClick">
      <ctc-iconfont icon="#iconfolder"></ctc-iconfont>
      <span>
        <slot></slot>
      </span>
    </el-button>
    <input
      ref="file"
      :accept="accept"
      type="file"
      hidden
      @change="handleChange"
    />
  </div>
</template>

<script>
import Iconfont from '../../bases/iconfont'
export default {
  name: 'FileBtn',
  components: {
    [Iconfont.name]: Iconfont
  },
  props: {
    size: {
      type: String,
      default: ''
    },
    accept: {
      type: String,
      // .txt 不能断句 取消掉
      default: '.docx,.doc,.xlsx,.tmx'
    }
  },
  methods: {
    handleChange({ target }) {
      if (!target.files.length) return
      const [file] = target.files
      const types = this.accept.split(',')
      const arr = file.name.split('.')
      const suffix = arr[arr.length - 1]
      if (!types.includes(`.${suffix}`)) {
        this.$message.warning(this.$t('translate.noFormatAllowed'))
        return
      }
      this.$emit('file-change', file)
    },
    handleClick() {
      const file = this.$refs.file
      file.value = null
      file.click()
    }
  }
}
</script>

<style lang="scss" scoped>
.file-btn {
  display: inline-block;
}
</style>
