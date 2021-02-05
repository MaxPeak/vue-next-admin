<template>
  <div class="file">
    <v-file
      trigger="click"
      :webkitdirectory="false"
      multiple
      accept=".jpg"
      @change="changeFile"
    >
      <div class="box"></div>
    </v-file>
  </div>
</template>

<script>
export default {
  methods: {
    changeFile(files, tree) {
      console.log(files, tree)
    }
  }
}
</script>

<style lang="scss" scoped>
.file {
  .box {
    width: 200px;
    height: 200px;
    background-color: skyblue;
  }
}
</style>
