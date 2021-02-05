<template>
  <div class="scroll">
    <v-scroll>
      <ul>
        <li v-for="(item, index) in list" :key="index">{{ item }}</li>
      </ul>
    </v-scroll>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: Array.from({ length: 1000 }).map((_, idx) => `item${idx}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.scroll {
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  ul {
    margin: 0;
    padding: 0;
    li {
      border-bottom: 1px solid #ebeef5;
    }
  }
}
</style>
