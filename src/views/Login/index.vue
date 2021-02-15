<template>
  <div ref="login" class="login">
    <v-table
      :columns="columns"
      :data="data"
      :pagination="pagination"
      :height="height"
      row-key="key"
    >
      <!-- <template #title>custom title</template> -->
      <!-- <template #header-name>
        <span>custom name</span>
      </template> -->
      <!-- <template #empty>custom empty</template> -->
      <!-- <template #footer>custom footer</template> -->
      <!-- <template #pagination>custom pagination</template> -->
    </v-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
export default defineComponent({
  setup() {
    const columns = [
      {
        prop: "name",
        label: "name",
        width: "25%",
        resizeCell: true
      },
      {
        prop: "age",
        label: "age",
        width: "15%",
        resizeCell: true
      },
      {
        prop: "address",
        label: "address",
        width: "40%",
        resizeCell: true
      },
      {
        prop: "operation",
        label: "operation"
      }
    ];
    const data = Array.from({ length: 50 }).map((_, i) => ({
      key: i.toString(),
      name: `Edrward ${i}`,
      age: 32,
      address: `London Park no. ${i}`
    }));
    const pagination = () => ({
      size: 16,
      total: 300,
      current: 1,
      sizes: [10, 20, 30]
    });
    const login = ref();
    const height = ref();
    onMounted(() => {
      height.value = login.value.getBoundingClientRect().height - 20;
    });
    return {
      columns,
      data,
      pagination,
      login,
      height
    };
  }
});
</script>

<style>
.login {
  padding: 10px;
}
</style>
