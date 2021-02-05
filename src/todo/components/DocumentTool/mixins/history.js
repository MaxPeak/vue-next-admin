export default {
  data() {
    return {}
  },
  methods: {
    updateHistory(info) {
      console.log('updadte history', info)
    },
    goBack() {
      console.log('后退')
    },
    goAhead() {
      console.log('前进')
    }
  }
}
