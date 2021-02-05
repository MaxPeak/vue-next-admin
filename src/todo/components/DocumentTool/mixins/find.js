export default {
  data() {
    return {
      findType: 0,
      findResult: []
    }
  },
  methods: {
    openFind() {
      this.findType = 1
    },
    openReplace() {
      this.findType = 2
    },
    nextFind(num) {
      console.log('next::', num)
    },
    prevFind(num) {
      console.log('prev::', num)
    },
    handleFind(reg) {
      console.log('find::', reg)
    },
    handleReplace(reg) {
      console.log('replace::', reg)
    },
    handleReplaceAll(reg) {
      console.log('replace all::', reg)
    }
  }
}
