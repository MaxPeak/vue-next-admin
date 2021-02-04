/**
 * 动画
 * @example animate("#wrap")
  .run({ left: 500 }, 2000)
  .run({ top: 500 }, 2000)
  .run({ left: 0 }, 2000)
  .run({ top: 0 }, 2000);
 */
export const animate = selector => {
  const animateMap = new Map();

  const dom = document.querySelector(selector);
  if (!dom) throw new Error("dom不存在");

  const init = () => {
    if (!animateMap.has(dom)) {
      const animateQueue = [];
      animateMap.set(dom, animateQueue);
    }
  };
  const start = animateQueue => {
    if (start["isRun"]) return;
    start["isRun"] = true;
    const r = () => {
      if (animateQueue.length) {
        new Promise(animateQueue.shift()).then(r);
      } else {
        start["isRun"] = false;
      }
    };
    r();
  };

  const run = (options, time = 300) => {
    const animateQueue = animateMap.get(dom) || [];

    animateQueue.push(fn => {
      // 利用css
      dom.style.transition = `${time / 1000}s`;
      // 利用重绘
      dom.offsetTop;
      Object.entries(options).forEach(
        ([key, value]) => (dom.style[key] = `${value}px`)
      );
      setTimeout(fn, time);
    });

    start(animateQueue);

    return { run };
  };

  init();

  return { run };
};

/**
 * 时间版运动函数
 * fps:每秒传输帧数,动画,即连续的画,当每秒帧数 > 60 时，看到的就是流畅的动画
 * @example animation(document.getElementById("wrap"), { top: 500 }, 500, () =>
    console.log("动画完成")
  );
 */
export const animation = (ele, options, time, cb) => {
  const getStyle = ele => ele.currentStyle || getComputedStyle(ele);
  const startValue = {}; //初始值
  const changeValue = {}; //目标值 - 初始值 = 中间变化的值
  const startTime = new Date(); //起始时间
  const eleStyle = getStyle(ele); //ele所有样式
  for (const key in options) {
    const val = parseFloat(eleStyle[key]);
    //初始化初始值
    startValue[key] = isNaN(val) ? 0 : val;
    // 目标值 - 起始值  =  变化量
    changeValue[key] = parseFloat(options[key]) - startValue[key];
  }

  function run() {
    const nowTime = new Date() - startTime; //时间戳
    let t1 = nowTime / time; //拿到已经花费时间在总时间的比例
    if (t1 >= 1) {
      //时间用完了，应该到终点
      t1 = 1;
    } else {
      requestAnimationFrame(run);
    }
    for (const key in changeValue) {
      const val = t1 * changeValue[key] + startValue[key]; //每个时刻点的目标值
      if (key.toLowerCase() === "opacity") {
        ele.style[key] = val;
        ele.style.filter = `alpha(opacity=${val * 100})`; // IE透明度
        if (val === 0) ele.style.display = `none`;
      } else {
        ele.style[key] = `${val}px`;
      }
    }
    //到终点了就执行回调函数
    if (t1 === 1) cb && cb();
  }
  run();
};
