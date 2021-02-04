/**
 * 锚点
 */
export const anchor = (step = 20) => {
  //获取滚动条距离
  let scrollTop = document.documentElement.scrollTop;
  const toUp = () => {
    //每次距离递减
    scrollTop -= step;
    //向上滚动
    window.scrollTo(0, scrollTop);
    //不小于0就继续调用
    if (scrollTop > 0) requestAnimationFrame(toUp);
  };
  toUp();
};
