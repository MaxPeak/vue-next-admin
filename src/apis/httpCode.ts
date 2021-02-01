// 本地网络错误
export const onLineCode = 999998;
// 未知错误
export const unknownCode = 999999;
// 约定的状态码信息
const httpCode: { [key: number]: string } = {
  401: "登录失效，请重新登录",
  404: "请求的数据接口不存在",
  500: "服务器错误",
  [onLineCode]: "网络错误，请检查网络是否正常",
  [unknownCode]: "未知错误"
};

export default httpCode;
