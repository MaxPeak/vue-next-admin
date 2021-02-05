import Vue from 'vue'

const context = require.context('./', true, /index\.js/)
const directives = context
  .keys()
  .reduce((arr, name) => [...arr, context(name).default], [])
  .filter(item => item)

directives.forEach(directive => {
  Vue.directive(directive.name, directive)
})
