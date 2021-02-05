<template>
  <div class="f-header">
    <div>No.</div>
    <div>
      <span>{{ $t('alignUtil.detectLanguage') }}：</span>
      <el-select v-model="srcLang" :size="size" class="header-select">
        <el-option
          v-for="item in languageList"
          :key="item.value"
          :label="item.name"
          :value="item.id"
        ></el-option>
      </el-select>
      <file-btn :size="size" @file-change="fileChange('source', $event)">
        {{ $t('alignUtil.upload') }}
      </file-btn>
      <div class="filename">
        <ctc-iconfont :icon="fileType(sourceFilename)" class="file-icon" />
        <div>
          {{ sourceFilename }}
        </div>
      </div>
    </div>
    <div>
      <span>{{ $t('alignUtil.detectLanguage') }}：</span>
      <el-select v-model="tarLang" :size="size" class="header-select">
        <el-option
          v-for="item in languageList"
          :key="item.value"
          :label="item.name"
          :value="item.id"
        ></el-option>
      </el-select>
      <template v-if="mode">
        <file-btn :size="size" @file-change="fileChange('target', $event)">
          {{ btnText }}
        </file-btn>
        <div class="filename">
          <ctc-iconfont :icon="fileType(targetFilename)" class="file-icon" />
          <div>
            {{ targetFilename }}
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import FileBtn from './file-btn'
import IconFont from '@/components/bases/iconfont'
import { API_GET_LANGUAGES } from '@/api/common'
export default {
  name: 'FHeader',
  components: {
    [FileBtn.name]: FileBtn,
    [IconFont.name]: IconFont
  },
  props: {
    sourceLanguage: {
      type: Number,
      default: 0
    },
    targetLanguage: {
      type: Number,
      default: 0
    },
    sourceFilename: {
      type: String,
      default: ''
    },
    targetFilename: {
      type: String,
      default: ''
    },
    // 文档模式：true->双文档 false->单文档
    mode: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      languageList: [],
      size: 'mini'
    }
  },
  computed: {
    srcLang: {
      get() {
        return this.sourceLanguage
      },
      set(lang) {
        this.$emit('update:sourceLanguage', lang)
      }
    },
    tarLang: {
      get() {
        return this.targetLanguage
      },
      set(lang) {
        this.$emit('update:targetLanguage', lang)
      }
    },
    btnText() {
      return this.targetFilename
        ? this.$t('alignUtil.upload')
        : this.$t('alignUtil.continueAdd')
    }
  },
  mounted() {
    this.getLnaguage()
  },
  methods: {
    fileChange(type, file) {
      window.eventBus.$emit('upload')
      this.$emit('file-change', type, file)
    },
    async getLnaguage() {
      const { data } = await this.$axios.get(API_GET_LANGUAGES)
      this.languageList = data
    },
    fileType(filename) {
      const names = filename.split('.')
      const suffix = names[names.length - 1]
      const map = {
        docx: '#iconWord',
        txt: '#iconTXT',
        tmx: '#iconxml1',
        xlsx: '#iconexcel'
      }
      return map[suffix]
    }
  }
}
</script>

<style lang="scss" scoped>
.f-header {
  display: flex;
  height: 40px;
  background-color: #eef4fe;
  & > div {
    display: flex;
    align-items: center;
    .header-select {
      width: 110px;
      margin-right: 5px;
    }
    .header-input {
      width: 160px;
      margin-right: 5px;
    }
  }
  & > div:first-child {
    width: 50px;
    justify-content: center;
  }
  & > div:not(:first-child) {
    box-sizing: border-box;
    width: calc(50% - 25px);
    padding: 0 5px;
  }
  .filename {
    flex: 1;
    display: flex;
    align-items: center;
    height: 100%;
    padding: 0 25px 0 10px;
    overflow: hidden;
    .file-icon {
      margin-right: 10px;
      flex-shrink: 0;
      font-size: 16px;
    }
    & > div {
      font-size: 14px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
}
</style>
