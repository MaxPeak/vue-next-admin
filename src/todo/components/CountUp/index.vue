<template>
  <span class="v-count-up">{{ count }}</span>
</template>

<script>
export default {
  name: 'VCountUp',
  props: {
    target: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      count: 0
    }
  },
  mounted() {
    this.run()
  },
  methods: {
    run() {
      this.count++
      if (this.count < this.target) {
        requestAnimationFrame(this.run)
      }
    }
  }
}
</script>
