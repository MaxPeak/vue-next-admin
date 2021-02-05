<template>
  <div class="tool">
    <document-tool
      :source="source"
      :target="target"
      move-line
      drag
      @error="handleError"
    >
      <template #header>
        <th>No.</th>
        <th>
          <input type="file" @change="handleChange('source')" />
        </th>
        <th>
          <input type="file" @change="handleChange('target')" />
        </th>
      </template>
      <!-- <template #empty>自定义empty</template> -->
      <template #footer>
        <td colspan="3">
          <div>
            <span>总行数：{{ source.length }}</span>
            <span>总行数：{{ target.length }}</span>
          </div>
        </td>
      </template>
    </document-tool>
  </div>
</template>

<script>
import DocumentTool from '@/components/DocumentTool'
export default {
  components: {
    DocumentTool
  },
  data() {
    return {
      source: [],
      target: []
    }
  },
  methods: {
    handleChange(type) {
      if (type === 'source') {
        this.source = Array.from({ length: 100 }).map(
          (_, index) => `source ${index + 1}`
        )
      } else if (type === 'target') {
        this.target = Array.from({ length: 150 }).map(
          (_, index) => `target ${index + 1}`
        )
      }
    },
    handleError(message) {
      console.log(message)
    }
  }
}
</script>

<style lang="scss" scoped>
.tool {
}
</style>
