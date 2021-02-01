<template>
  <component :is="$route.meta.layout">
    <router-view />
  </component>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Default from "@layouts/Default.vue";
import Sidebar from "@layouts/Sidebar.vue";
export default defineComponent({
  components: {
    Default,
    Sidebar
  }
});
</script>
