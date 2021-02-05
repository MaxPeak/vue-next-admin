<template>
  <div class="mosaic">
    <canvas
      ref="canvas"
      width="1500"
      height="1500"
      @mousedown="mousedown"
      @mousemove="mousemove"
      @mouseup="mouseup"
    ></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const restore = (arr, len) => {
  const restoreArr = []; //升维后的数组
  let index = 0; //需要截取的下标
  const num = arr.length / len;
  for (let i = 0; i < num; i++) {
    restoreArr.push(arr.slice(index, index + len));
    index += len;
  }
  return restoreArr;
};

const canvas = ref();
const ctx = ref();
onMounted(() => {
  ctx.value = canvas.value.getContext("2d");
  ctx.value.clearRect(0, 0, 500, 500);
  const img = new Image();
  img.src = "/vue-2x.png";
  img.onload = () => {
    const w = img.naturalWidth;
    const h = img.naturalHeight;
    const calcW = w / (h / 500);
    const startX = (500 - calcW) / 2;
    ctx.value.drawImage(img, 0, 0, w, h);
    // ctx.value.drawImage(img, startX, 0, calcW, 500);
  };
});

/**
 * 马赛克算法
 *
 * 在某个区域内使用一个随机像素点来代替其他的像素值，或者用这个区域的像素平均值
 */
const openCodeR = 10;
const drawMosaic = (x, y) => {
  const startX = x - openCodeR / 2 + 16;
  const startY = y - openCodeR / 2 + 16;
  //升维后的二维数组
  const colorArr = restore(
    ctx.value.getImageData(startX, startY, openCodeR, openCodeR).data,
    4
  );
  const len = colorArr.length;
  let vr = 0; //每个像素点的r像素总值
  let vg = 0; //每个像素点的g像素总值
  let vb = 0; //每个像素点的b像素总值
  for (const item of colorArr) {
    vr += item[0]; //二维数组每一项的第一个值（r）
    vg += item[1]; //二维数组每一项的第二个值（g）
    vb += item[2]; //二维数组每一项的第三个值（b）
  }
  //总值可能会有小数，所以用四舍五入进行取值，颜色总值除以总长度就是平均值
  ctx.value.fillStyle = `rgb(${Math.round(vr / len)},${Math.round(
    vg / len
  )},${Math.round(vb / len)})`;
  // 矩形
  ctx.value.fillRect(startX, startY, openCodeR, openCodeR);
  // 圆
  // ctx.beginPath();
  // ctx.arc(x + 16, y + 16, openCodeR, 0, 2 * Math.PI);
  // ctx.fill(); //实心圆
  // ctx.closePath();
};

let isDown = false;

const mousedown = e => {
  isDown = true;
  drawMosaic(e.offsetX, e.offsetY);
};
const mousemove = e => {
  if (!isDown) return;
  drawMosaic(e.offsetX, e.offsetY);
};
const mouseup = () => {
  isDown = false;
};
</script>
