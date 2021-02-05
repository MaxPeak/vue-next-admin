<template>
  <transition name="search" @after-leave="afterLeave">
    <div v-show="visible" class="f-search">
      <div class="f-search-item">
        <f-search-input
          v-model="searchText"
          :focus="focus"
          :placeholder="$t('alignUtil.find')"
          icon="#iconcase"
          tabindex="1"
          @input="handleInput"
          @enter="handleEnter"
          @case-change="caseChange"
        ></f-search-input>
        <div class="result">
          <span v-show="searchText">{{ result }}</span>
        </div>
        <div class="divider"></div>
        <f-search-button
          :disabled="disabled"
          :title="$t('alignUtil.prevMatch')"
          icon="#iconarrowUp"
          @click="prev"
        ></f-search-button>
        <f-search-button
          :disabled="disabled"
          :title="$t('alignUtil.nextMatch')"
          icon="#iconarrowDown"
          @click="next"
        ></f-search-button>
        <f-search-button
          :title="$t('alignUtil.closed')"
          icon="#iconclose"
          @click="handleHide"
        ></f-search-button>
      </div>
      <transition name="replace">
        <div v-if="showReplace" class="f-search-item">
          <f-search-input
            v-model="replaceText"
            :placeholder="$t('alignUtil.replace')"
            tabindex="2"
          ></f-search-input>
          <f-search-button
            v-show="replaceText"
            :title="$t('alignUtil.replace')"
            icon="#iconreplace"
            @click="replaceCurrent"
          ></f-search-button>
          <f-search-button
            v-show="replaceText"
            :title="$t('alignUtil.replaceAll')"
            icon="#iconreplaceAll"
            @click="replaceAll"
          ></f-search-button>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
import { debounce } from '../../utils/common'
import SearchInput from './searchInput'
import SearchButton from './searchButton'
export default {
  name: 'FSearch',
  components: {
    [SearchInput.name]: SearchInput,
    [SearchButton.name]: SearchButton
  },
  props: {
    // 是否显示
    visible: Boolean,
    // 弹窗的类型
    type: {
      type: String,
      default: 'search',
      validator: value => ['search', 'replace'].includes(value)
    },
    // 当前索引位置
    currentIndex: {
      type: Number,
      default: 0
    },
    // 查找到的总数
    total: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      // 搜索的内容
      searchText: '',
      // 替换的内容
      replaceText: '',
      // 是否大小写敏感
      case: false,
      // 自动获取焦点
      focus: false
    }
  },
  computed: {
    showReplace() {
      return this.type === 'replace'
    },
    result() {
      return `${this.currentIndex}/${this.total}`
    },
    disabled() {
      return !this.total
    },
    search() {
      const flag = this.case ? '' : 'i'
      return new RegExp(this.searchText, flag)
    }
  },
  watch: {
    visible(val) {
      this.focus = val
      if (val) return
      // 关闭弹窗把查找数据重置
      this.$emit('search', new RegExp(''))
      this.$emit('update:type', 'search')
    }
  },
  methods: {
    // 关闭
    handleHide() {
      this.$emit('update:visible', false)
    },
    // 动画结束的钩子
    afterLeave() {
      this.reset()
    },
    // 重置数据
    reset() {
      this.searchText = ''
      this.replaceText = ''
      this.case = false
    },
    // enter快捷键
    handleEnter() {
      if (this.disabled) return
      this.next()
    },
    // input数据响应
    handleInput: debounce(function() {
      this.$emit('search', this.search)
    }),
    // 大小写敏感切换
    caseChange(val) {
      this.case = val
      this.$emit('case-change', this.search)
    },
    // 查找下一个
    next() {
      this.$emit('search-next')
    },
    // 查找上一个
    prev() {
      this.$emit('search-prev')
    },
    // 替换当前条
    replaceCurrent() {
      this.$emit('replace', this.replaceText)
    },
    // 替换所有
    replaceAll() {
      this.$emit('replace-all', this.replaceText)
    }
  }
}
</script>

<style lang="scss" scoped>
.f-search {
  position: fixed;
  box-sizing: border-box;
  top: 10px;
  right: 30px;
  z-index: 2019;
  padding: 5px;
  font-size: 12px;
  color: #73767b;
  background-color: #fff;
  border-radius: 3px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  &-item {
    display: flex;
    align-items: center;
    height: 30px;
    overflow: hidden;
    .result {
      width: 50px;
      text-align: center;
    }
    .divider {
      display: inline-block;
      height: 20px;
      width: 1px;
      margin: 0 8px;
      background-color: #c0c4cc;
    }
  }
}

// 动画过渡类名
.search-enter-active {
  animation: search 0.3s;
}
.search-leave-active {
  animation: search 0.3s reverse;
}
@keyframes search {
  0% {
    opacity: 0;
    transform: translateY(-100%);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.replace-enter-active {
  animation: replace 0.3s;
}
.replace-leave-active {
  animation: replace 0.3s reverse;
}
@keyframes replace {
  0% {
    height: 0;
  }
  100% {
    height: 30px;
  }
}
</style>
