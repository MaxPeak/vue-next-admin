import { ref } from "vue";
import { AxiosRequestConfig, AxiosResponse } from "axios";
/**
 * axios装饰器，用于需要loading状态的请求
 */
const useFetch = (
  axios: (config: AxiosRequestConfig) => Promise<AxiosResponse>
) => {
  const result = ref();
  const error = ref();
  const loading = ref<boolean>(false);
  const fetch = async (config: AxiosRequestConfig) => {
    try {
      loading.value = true;
      result.value = await axios(config);
    } catch (error) {
      error.value = error;
    } finally {
      loading.value = false;
    }
  };
  return {
    result,
    loading,
    error,
    fetch
  };
};
export default useFetch;
