// props mixin
export default {
  props: {
    // 原文
    source: {
      type: Array,
      default() {
        return []
      }
    },
    // 译文
    target: {
      type: Array,
      default() {
        return []
      }
    },
    // 高度
    height: String,
    // 记录的最大步骤数
    maxSteps: {
      type: Number,
      default: 50
    },
    // 缓存的名字
    cacheName: {
      type: String,
      default: 'f-util'
    }
  }
}
