/**
 * 兼容滚轮事件
 *
 * e.preventDefault()   阻止默认行为 不兼容低版本IE
 * 低版本ie使用e.returnValue = false
 * 在dom 0级事件里：可以使用return false 阻止行为
 *
 * onmousewheel  不兼容火狐,ie支持
 * 火狐使用：DOMMouseScroll,并且只能用dom二级绑定(addEventListener)
 * 滚轮的滚动方向   主流浏览器使用 e.wheelDelta : 120 代表向前滚，-120 向后滚
 * 火狐里使用：e.detail  滚动方向的值： -3 代表向前滚，3 向后滚动
 */
export function mousewheel(dom, cb, bool) {
  /*
    滚动方向为：e.wheelDetail   正值向前   负值向后
  */
  // 确定事件type
  let type = "mousewheel";
  //undefined 说明事件不存在 null只是没有赋值
  if (dom.onmousewheel === undefined) {
    type = "DOMMouseScroll";
  }
  // 真正的事件函数
  function typeFn(e) {
    e = e || window.event;
    // 把滚轮事件的方向 处理一致
    e.wheelDetail = e.wheelDelta / 120 || e.detail / -3;
    if (bool) {
      // 阻止默认行为
      if (e.preventDefault) {
        e.preventDefault();
      } else {
        e.returnValue = false;
      }
    }
    cb.call(this, e);
  }
  // 判断是否支持 addEventListener
  if (dom.addEventListener) {
    dom.addEventListener(type, typeFn);
  } else {
    dom.attachEvent("on" + type, typeFn);
  }
}
