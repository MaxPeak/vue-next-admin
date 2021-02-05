import { getOS } from '../utils'
export default {
  data() {
    const ctrlSymbolMap = {
      Window: 'ctrl',
      Mac: '⌘'
    }
    this.ctrlKeySymbol = ctrlSymbolMap[getOS()]
    return {}
  },
  computed: {
    contextmenu() {
      return [
        {
          label: `回退`,
          after: `${this.ctrlKeySymbol}+Z`,
          handle: this.contextmenuHandle(this.goBack)
        },
        {
          label: `前进`,
          after: `${this.ctrlKeySymbol}+U`,
          handle: this.contextmenuHandle(this.goAhead)
        },
        {
          label: `合并`,
          after: `${this.ctrlKeySymbol}+E`,
          handle: this.contextmenuHandle(this.handleMerge)
        },
        {
          label: `插入`,
          after: `${this.ctrlKeySymbol}+I`,
          handle: this.contextmenuHandle(this.handleInsert)
        },
        {
          label: `上移`,
          after: `${this.ctrlKeySymbol}+↑`,
          handle: this.contextmenuHandle(this.handleMoveUp)
        },
        {
          label: `下移`,
          after: `${this.ctrlKeySymbol}+↓`,
          handle: this.contextmenuHandle(this.handleMoveDown)
        },
        {
          label: `调换`,
          after: `${this.ctrlKeySymbol}+J`,
          handle: this.contextmenuHandle(this.handleSwop)
        },
        {
          label: `删除`,
          after: `Delete`,
          handle: this.contextmenuHandle(this.handleDelete)
        },
        {
          label: `查找`,
          after: `${this.ctrlKeySymbol}+F`,
          handle: this.contextmenuHandle(this.openFind, true)
        },
        {
          label: `替换`,
          after: `${this.ctrlKeySymbol}+G`,
          handle: this.contextmenuHandle(this.openReplace, true)
        },
        {
          label: `拆分`,
          handle: this.contextmenuHandle(this.handleSplit)
        }
      ]
    }
  },
  methods: {
    contextmenuHandle(callback, isValidateTableData) {
      return () => {
        if (isValidateTableData) {
          if (!this.validateTableData()) return
        } else {
          if (!this.validateSelect()) return
        }
        return callback()
      }
    }
  }
}
