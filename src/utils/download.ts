/**
 * 利用blob下载文件到本地
 * 1、正常情况下要文件压缩，没有压缩会自动在浏览器打开文件
 * 2、这个方法只有google和Firefox浏览器支持，因为a标签的download属性只有这两个浏览器支持
 * 3、url只能是同源的的url
 */
export const downloadBlob = (flieName: string, data: File) => {
  const blob = new Blob([data], { type: "text/plain" });
  //支持createObjectURL就用createObjectURL构建url
  if (window.URL.createObjectURL) {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.download = flieName;
    a.href = url;
    a.click();
  } else {
    //否者就用FileReader构建url
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.addEventListener("load", function() {
      const url = reader.result as string;
      const a = document.createElement("a");
      a.download = flieName;
      a.href = url;
      a.click();
    });
  }
};

/**
 * form表单请求,常用于下载文件
 */
export const formApi = (url: string, data: { [key: string]: string }) => {
  //创建一个frorm表单，利用表单进行提交
  const form = document.createElement("form");
  form.action = url;
  form.method = "post";
  form.style.display = "none";
  for (const key in data) {
    const input = document.createElement("input");
    input.type = "text";
    input.name = key;
    input.value = JSON.stringify(data[key]);
    form.appendChild(input);
  }
  document.body.appendChild(form);
  form.submit();
  document.body.removeChild(form);
};
