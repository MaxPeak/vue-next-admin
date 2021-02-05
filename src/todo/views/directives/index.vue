<template>
  <div class="directives">
    <button v-shake>click shake</button>
    <button v-jelly>click jelly</button>
    <button v-waves-in>click waves-in</button>
    <button v-waves-out>click waves-out</button>
    <button v-menu="menus">contextmenu</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menus: Array.from({ length: 3 }).map((_, idx) => ({
        label: `label${idx}`,
        after: `after${idx}`
      }))
    }
  }
}
</script>

<style lang="scss" scoped>
.directives {
  button {
    padding: 10px 20px;
    margin: 0 10px;
    cursor: pointer;
  }
}
</style>
