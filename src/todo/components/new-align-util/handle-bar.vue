<template>
  <div class="handle-bar">
    <div class="left">
      <icon-btn
        :disabled="disabled"
        icon="#iconhuitui"
        @click="handleClick('goback')"
        >{{ $t('alignUtil.fallback') }}</icon-btn
      >
      <icon-btn
        :disabled="disabled"
        icon="#iconqianjin"
        @click="handleClick('goahead')"
        >{{ $t('alignUtil.forward') }}</icon-btn
      >
      <divider></divider>
      <icon-btn
        :disabled="disabled"
        icon="#iconhebingduanla"
        @click="handleClick('merge')"
        >{{ $t('alignUtil.merge') }}</icon-btn
      >
      <icon-btn
        :disabled="disabled"
        icon="#iconzhuanchaifen"
        @click="handleClick('split')"
        >{{ $t('alignUtil.breakUp') }}</icon-btn
      >
      <divider></divider>
      <icon-btn
        :disabled="disabled"
        icon="#iconmoveup"
        @click="handleClick('moveup')"
        >{{ $t('alignUtil.moveUp') }}</icon-btn
      >
      <icon-btn
        :disabled="disabled"
        icon="#iconmovedown"
        @click="handleClick('movedown')"
        >{{ $t('alignUtil.moveDown') }}</icon-btn
      >
      <divider></divider>
      <icon-btn
        :disabled="disabled"
        icon="#icontiaohuansu"
        @click="handleClick('swop')"
        >{{ $t('alignUtil.switch') }}</icon-btn
      >
      <divider></divider>
      <icon-btn
        :disabled="disabled"
        icon="#iconcharu"
        @click="handleClick('insert')"
        >{{ $t('alignUtil.insert') }}</icon-btn
      >
      <icon-btn
        :disabled="disabled"
        icon="#iconchuyidong"
        color="#D35060"
        @click="handleClick('remove')"
        >{{ $t('alignUtil.del') }}</icon-btn
      >
      <divider></divider>
      <icon-btn
        :disabled="disabled"
        icon="#iconsousuo"
        color="#373737"
        @click="handleClick('search')"
        >{{ $t('alignUtil.find') }}</icon-btn
      >
      <icon-btn
        :disabled="disabled"
        icon="#iconreplace"
        color="#373737"
        @click="handleClick('replace')"
        >{{ $t('alignUtil.replace') }}</icon-btn
      >
      <divider></divider>
      <!-- 闪光class -->
      <!-- class="align-btn" -->
      <el-button
        :disabled="disabled || btnDisabled"
        :class="{ 'btn-disabled': disabled || btnDisabled }"
        type="gradient ripple"
        size="small"
        @click="align"
      >
        <ctc-iconfont icon="#iconduiqi-"></ctc-iconfont>
        <span>{{ $t('alignUtil.aligned') }}</span>
      </el-button>
    </div>
    <div class="right">
      <ctc-download-select
        :file-types="types"
        :auto-download="false"
        @command="download"
        :disabled="disabled"
      >
        <div class="download">
          <ctc-iconfont icon="#icondaochu1" class="download-icon" />
          <p>{{ $t('common.export') }}</p>
        </div>
      </ctc-download-select>
      <el-button
        :disabled="disabled"
        type="gradient ripple"
        size="small"
        @click="handleClick('add-memory')"
        >{{ $t('postEditor.addMemory') }}</el-button
      >
    </div>
  </div>
</template>

<script>
import Iconfont from '../../bases/iconfont'
import IconBtn from './icon-btn'
import Divider from './divider'
import downloadSelect from '@/components/bases/download-select'
export default {
  name: 'HandleBar',
  components: {
    [Iconfont.name]: Iconfont,
    [IconBtn.name]: IconBtn,
    [Divider.name]: Divider,
    [downloadSelect.name]: downloadSelect
  },
  props: {
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      btnDisabled: false
    }
  },
  computed: {
    types() {
      // .txt 不能断句 取消掉
      return ['xlsx', 'docx', 'tmx']
    }
  },
  mounted() {
    window.eventBus.$on('upload', () => {
      this.btnDisabled = false
    })
  },
  methods: {
    handleClick(eventName) {
      this.$emit(eventName)
    },
    align() {
      this.$emit('align')
      this.btnDisabled = true
    },
    download({ type }) {
      this.$emit('download', type)
    }
  }
}
</script>

<style lang="scss" scoped>
.handle-bar {
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 42px;
  background-color: #eef4fe;
  padding: 0 15px;
  border-bottom: 1px solid #d9dee6;
  user-select: none;
  .left {
    height: 42px;
    display: flex;
    align-items: center;
  }
  .right {
    display: flex;
    align-items: center;
    .download {
      display: flex;
      align-items: center;
      margin-right: 10px;
      color: #3885ff;
      cursor: pointer;
    }
  }
}
/deep/.align-btn {
  position: relative;
  overflow: hidden;
  &::after {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    height: 150%;
    width: 150%;
    margin: auto;
    background: rgba(255, 255, 255, 0.6);
    opacity: 0.6;
    animation: move 1s infinite ease-out;
    filter: blur(6px);
    content: '';
  }
}
@keyframes move {
  0% {
    transform: translate(-100px, -100px) rotate(-45deg);
  }
  100% {
    transform: translate(100px, 100px) rotate(-45deg);
  }
}
.btn-disabled {
  opacity: 0.5;
}
</style>
