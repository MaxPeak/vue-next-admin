import axios, { AxiosRequestConfig, AxiosError } from "axios";
import httpCode, { onLineCode, unknownCode } from "./httpCode";

// axios实例
const instance = axios.create({
  // 表示跨域请求时是否需要使用凭证
  withCredentials: false,
  // 指定请求超时的毫秒数(0 表示无超时时间)
  timeout: 0,
  // 自定义请求头
  headers: {},
  // 使用 HTTP 基础验证，并提供凭据,这将设置一个 `Authorization` 头，覆写掉现有的任意使用 `headers` 设置的自定义 `Authorization`头
  auth: {
    username: "username",
    password: "password"
  }
});

/**
 * catch捕获
 */
const handleCatch = (error: AxiosError) => {
  const { onLine } = navigator;
  const { response } = error;
  const errCode = onLine ? response?.status : onLineCode;
  console.log(httpCode[errCode || unknownCode]);
  return error;
};

/**
 * 请求封装
 */
const request = (config: AxiosRequestConfig) => {
  return instance(config)
    .then(({ data }) => data)
    .catch(handleCatch);
};

export default request;
