import domElements from "./domElements";
import generateName from "./generateName";
import { h } from "vue";
const styled: any = (() => {
  let style: any = null;
  return function (tag: string, content: string[], ...props: any[]) {
    if (!style) {
      style = document.createElement("style");
      document.head.appendChild(style);
    }
    const styleContent = content.reduce((str, cur, i) => {
      str += `${cur.replace(/\n/g, "")}${props[i] ? props[i]() : ""}`;
      return str;
    }, "");
    const className = `vsc-${generateName("vsc")}`;
    style.innerText += `.${className}{${styleContent}}`;
    const vnode = h(tag, { className });
    // 卡在了如何把组件的props传回到模板字符串内部的callback
    return vnode;
  };
})();

domElements.forEach((domElement) => {
  styled[domElement] = styled.bind(null, domElement);
});

export default styled;
