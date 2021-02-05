<template>
  <transition name="find">
    <div v-show="value === 1 || value === 2" class="find">
      <div class="switch" @mousedown.prevent>
        <v-icon
          icon="arrowDown"
          :class="['icon', { bottom: value === 2 }]"
          @click="$emit('input', value === 1 ? 2 : 1)"
        />
      </div>
      <div class="main">
        <div class="item">
          <div class="input">
            <v-input
              type="text"
              placeholder="查找"
              focus
              v-model="findContent"
              @input="$emit('find', findReg)"
            >
              <template #append v-if="findContent">
                <v-icon-checkbox
                  icon="case"
                  title="区分大小写"
                  class="icon-checkbox"
                  v-model="matchCase"
                  @change="$emit('find', findReg)"
                />
              </template>
            </v-input>
            <span class="result">{{ result }}</span>
          </div>
          <div class="button-group">
            <v-icon-button icon="arrowUp" @click="handlePrev" />
            <v-icon-button icon="arrowDown" @click="handleNext" />
            <v-icon-button icon="close" @click="handleClose" />
          </div>
        </div>
        <transition name="replace">
          <div v-if="value === 2" class="item">
            <div class="input">
              <v-input
                type="text"
                placeholder="替换"
                v-model="replaceContent"
              />
              <template v-if="replaceContent">
                <v-icon-button
                  icon="replace"
                  title="替换"
                  class="replace"
                  @click="$emit('replace', replaceContent)"
                />
                <v-icon-button
                  icon="replaceAll"
                  title="替换全部"
                  class="replace"
                  @click="$emit('replace-all', replaceContent)"
                />
              </template>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </transition>
</template>

<script>
import VIconButton from './iconButton'
import VInput from './input'
import VIconCheckbox from './iconCheckbox'
import VIcon from '../icon'
export default {
  name: 'VFind',
  components: {
    VIconButton,
    VInput,
    VIconCheckbox,
    VIcon
  },
  props: {
    /**
     * 0:关闭
     * 1:查找
     * 2:替换
     */
    value: {
      type: Number,
      default: 0,
      validator: val => [0, 1, 2].includes(val)
    },
    total: {
      type: Number
    }
  },
  computed: {
    result() {
      return `${this.current}/${this.total}`
    },
    findReg() {
      const flag = this.matchCase ? '' : 'i'
      return new RegExp(this.findContent, flag)
    },
    current() {
      return this.total ? this.currentIndex + 1 : 0
    }
  },
  data() {
    return {
      matchCase: false,
      findContent: '',
      replaceContent: '',
      currentIndex: 0
    }
  },
  mounted() {
    document.body.addEventListener('keydown', this.keyboardClose)
  },
  destroyed() {
    document.body.removeEventListener('keydown', this.keyboardClose)
  },
  methods: {
    keyboardClose({ keyCode }) {
      if (keyCode !== 27) return
      this.handleClose()
    },
    handleClose() {
      Object.assign(this.$data, this.$options.data())
      this.$emit('input', 0)
      this.$emit('find', this.findReg)
    },
    handleNext() {
      if (this.currentIndex >= this.total - 1) {
        this.currentIndex = 0
      } else {
        this.currentIndex++
      }
      this.$emit('next', this.currentIndex)
    },
    handlePrev() {
      if (this.currentIndex <= 0) {
        this.currentIndex = this.total - 1
      } else {
        this.currentIndex--
      }
      this.$emit('prev', this.currentIndex)
    }
  }
}
</script>

<style lang="scss" scoped>
.find {
  display: flex;
  position: absolute;
  box-sizing: border-box;
  top: 40px;
  right: 30px;
  z-index: 2019;
  padding: 5px;
  font-size: 12px;
  color: #73767b;
  background-color: #fff;
  border-radius: 3px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  .switch {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-right: 5px;
    cursor: pointer;
    .icon {
      transform: rotate(-90deg);
      transition: transform 0.3s;
      &.bottom {
        transform: rotate(0deg);
      }
    }
  }
  .item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 30px;
    overflow: hidden;
    .input {
      .result {
        display: inline-block;
        min-width: 50px;
        text-align: center;
      }
      .case {
        font-size: 14px;
      }
      .replace {
        font-size: 12px;
      }
    }
    .button-group {
      box-sizing: border-box;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      padding: 0 5px;
    }
  }
}
// 动画过渡类名
.find-enter-active {
  animation: find 0.3s;
}
.find-leave-active {
  animation: find 0.3s reverse;
}
.replace-enter-active {
  animation: replace 0.3s;
}
.replace-leave-active {
  animation: replace 0.3s reverse;
}
@keyframes find {
  0% {
    opacity: 0;
    transform: translateY(-100%);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
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
