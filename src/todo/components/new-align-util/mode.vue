<template>
  <div class="f-mode">
    <div :class="['item']">
      <ctc-iconfont icon="#iconfile-4" class="ctc-iconfont" />
      <el-button @click="handleClick(false)" :plain="mode" type="primary">
        <span class="btn-content">
          {{ $t('alignUtil.singleDoc') }}
        </span>
      </el-button>
      <div class="support">
        <div class="title">{{ $t('translate.supportedFormat') }}</div>
        <div class="type">
          <ctc-iconfont
            v-for="(item, index) in fileTypeList"
            :key="index"
            :icon="item"
            class="icon"
          />
        </div>
      </div>
    </div>
    <div :class="['item']">
      <ctc-iconfont icon="#iconwendang-" class="ctc-iconfont" />
      <el-button @click="handleClick(true)" :plain="!mode" type="primary">
        <span class="btn-content">
          {{ $t('alignUtil.doubleDoc') }}
        </span>
      </el-button>
      <div class="support">
        <div class="title">{{ $t('translate.supportedFormat') }}</div>
        <div class="type">
          <!-- 双文档取消tmx格式 -->
          <ctc-iconfont
            v-for="(item, index) in fileTypeList.slice(
              0,
              fileTypeList.length - 1
            )"
            :key="index"
            :icon="item"
            class="icon"
          />
        </div>
      </div>
    </div>
    <!-- accept=".docx,.txt,.xlsx,.tmx" -->
    <input
      ref="file"
      v-show="false"
      @change="fileChange"
      :accept="accept"
      type="file"
    />
  </div>
</template>

<script>
import IconFont from '@/components/bases/iconfont'
export default {
  name: 'FMode',
  components: {
    [IconFont.name]: IconFont
  },
  props: {
    mode: {
      type: Boolean
    }
  },
  computed: {
    // .txt 不能断句 取消掉
    fileTypeList() {
      // '#iconTXT',
      return ['#iconWord', '#iconexcel', '#iconxml1']
    },
    accept() {
      return '.docx,.doc,.txt,.xlsx,.tmx'
    }
  },
  methods: {
    handleClick(val) {
      this.$emit('update:mode', val)
      // const file = this.$refs.file
      // file.value = null
      // file.click()
    },
    fileChange({ target }) {
      if (!target.files.length) return
      const [file] = target.files
      const types = this.accept.split(',')
      const arr = file.name.split('.')
      const suffix = arr[arr.length - 1]
      if (!types.includes(`.${suffix}`)) {
        this.$message.warning(this.$t('translate.noFormatAllowed'))
        return
      }
      this.$emit('file-change', 'source', file)
    }
  }
}
</script>

<style lang="scss" scoped>
.f-mode {
  display: flex;
  width: 100%;
  height: 100%;
  .item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    &:hover {
      background-color: rgba(240, 246, 255, 0.4);
    }
    .btn-content {
      display: flex;
      align-items: center;
      .upload-icon {
        font-size: 20px;
      }
    }
    .ctc-iconfont {
      margin-bottom: 20px;
      font-size: 50px;
      color: #5c9aff;
    }
    .support {
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      margin: 35px 0;
      .title {
        position: relative;
        padding: 0 25px;
        color: #58aaff;
        font-size: 14px;
        font-weight: 500;
        margin-bottom: 20px;
        text-align: center;
        &::after,
        &::before {
          position: absolute;
          top: 0;
          bottom: 0;
          height: 1px;
          width: 20px;
          background-color: #58aaff;
          margin: auto 0;
          content: '';
        }
        &::after {
          left: 0;
        }
        &::before {
          right: 0;
        }
      }
      .type {
        .icon {
          font-size: 35px;
          margin: 0 15px;
        }
      }
    }
  }
  .item + .item {
    border-left: 1px solid #d9dee6;
  }
}
// 取消hover效果
/deep/.el-button--primary.is-plain {
  color: #418bff !important;
  background: #ecf3ff !important;
  border-color: #b3d1ff !important;
}
</style>
