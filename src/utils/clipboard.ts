export type Action = "copy" | "cut";

const DEFAULT_ATTRIBUTE = "data-clipboard";

const getAttributeValue = (
  element: HTMLElement,
  attribute = DEFAULT_ATTRIBUTE
) => element.getAttribute(attribute) || "";

const getText = (target: HTMLElement | string, attribute?: string) => {
  return typeof target === "string"
    ? target
    : getAttributeValue(target, attribute);
};

const createFake = (
  text: string,
  firstFakeEle: HTMLTextAreaElement | undefined
) => {
  const fakeEle = firstFakeEle
    ? firstFakeEle
    : document.createElement("textarea");
  // 防止IOS缩放
  fakeEle.style.fontSize = "12pt";
  // 重置盒模型
  fakeEle.style.border = "0";
  fakeEle.style.padding = "0";
  fakeEle.style.margin = "0";
  fakeEle.setAttribute("readonly", "readonly");
  fakeEle.value = text;
  return fakeEle;
};

const appendFake = (fakeEle: HTMLTextAreaElement) => {
  fakeEle.style.position = "absolute";
  fakeEle.style.right = "-9999px";
  fakeEle.style.top = "0px";
  document.body.appendChild(fakeEle);
};

const selectFake = (fakeEle: HTMLTextAreaElement) => {
  fakeEle.select();
  fakeEle.setSelectionRange(0, fakeEle.value.length);
};

const execCommand = (action: Action) => {
  let succeeded: boolean;
  try {
    succeeded = document.execCommand(action);
  } catch (error) {
    succeeded = false;
  }
  return succeeded;
};

/**
 * 剪切板
 * @example clipboard('copy', 'copy text')
 * @example clipboard('copy', document.getElementById('#id'))
 * @example clipboard('copy', document.getElementById('#id'), 'data-copy') 'data-copy'是target的自定义属性
 */
export type Clipboard = {
  (
    action: Action,
    target: HTMLElement | string,
    attribute?: string | undefined
  ): boolean;
  fakeEle?: HTMLTextAreaElement | undefined;
};
export const clipboard: Clipboard = (
  action: Action,
  target: HTMLElement | string,
  attribute?: string
) => {
  const text = getText(target, attribute);
  const fakeEle = createFake(text, clipboard["fakeEle"]);
  clipboard["fakeEle"] = fakeEle;
  appendFake(fakeEle);
  selectFake(fakeEle);
  return execCommand(action);
};
