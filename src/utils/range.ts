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
