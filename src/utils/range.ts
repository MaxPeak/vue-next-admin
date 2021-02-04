/**
 * 禁止选中
 */
export const unSelect = (ele: HTMLElement, enable: boolean) => {
  ele.onselectstart = enable ? () => false : null;
};

/**
 * 清除选中
 */
export const clearSelections = () => {
  window.getSelection()?.removeAllRanges();
};

/**
 * 选中全部文字
 */
export const selectAllRange = (ele: HTMLTextAreaElement) => {
  if (ele.setSelectionRange) {
    //说明是表单元素
    ele.setSelectionRange(0, ele.value.length);
  } else {
    //是contenteditable="true"的可编辑元素
    //创建range对象
    const range = window.getSelection();
    //选中ele元素下面的所有内容
    range?.selectAllChildren(ele);
  }
  ele.focus();
};
