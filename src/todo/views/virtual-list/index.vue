<template>
  <div class="virtual-list">
    <v-virtual-list
      :list="list"
      :item-min-height="30"
      :finished="finished"
      @load="load"
    >
      <template #item="{item}">
        {{ item.content }}
      </template>
    </v-virtual-list>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: Array.from({ length: 100 }).map((_, i) => ({
        id: i + 1,
        content: `item${i + 1}`
      })),
      finished: false
    }
  },
  methods: {
    async load() {
      this.finished = true
      if (this.list.length >= 300) return
      const data = await this.getData()
      this.finished = false
      this.list = this.list.concat(data)
    },
    getData() {
      return new Promise(resolve => {
        setTimeout(() => {
          const newData = Array.from({ length: 100 }).map((_, i) => ({
            id: i + 1 + this.list.length,
            content: `item${i + 1 + this.list.length}`
          }))
          resolve(newData)
        }, 1 * 1000)
      })
    }
  }
}
</script>
