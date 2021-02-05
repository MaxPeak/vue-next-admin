<template>
  <div class="fetch">
    <button @click="handleClick">click fetch data</button>
    <div>
      <p>Loading:{{ loading }}</p>
      <p>Error:{{ error }}</p>
      <p>Result:{{ result }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import useFetch from "@composables/useFetch";
import axios from "axios";
export default defineComponent({
  setup() {
    const { loading, error, result, createPromise } = useFetch(async url => {
      const res = await axios({ url }).catch(err => JSON.stringify(err));
      return Promise.resolve(res);
    });
    const handleClick = () => {
      createPromise("test");
    };
    return {
      loading,
      error,
      result,
      handleClick
    };
  }
});
</script>
