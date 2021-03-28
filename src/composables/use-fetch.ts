import { reactive, toRefs } from "vue";

const useFetch = <T extends Function, Config>(fetch: T) => {
  const result = reactive({
    respones: null,
    error: null,
    loading: false,
  });
  const api = async (config: Config) => {
    try {
      result.loading = true;
      result.respones = await fetch(config);
    } catch (error) {
      result.error = error;
    } finally {
      result.loading = false;
    }
  };
  return {
    api,
    ...toRefs(result),
  };
};

export default useFetch;
