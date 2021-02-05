import { ComponentPublicInstance, onMounted, onUnmounted, Ref, ref } from "vue";

export type DownRect = {
  targetLeft: number;
  targetTop: number;
  targetWidth: number;
  targetHeight: number;
  parentLeft: number;
  parentTop: number;
  parentWidth: number;
  parentHeight: number;
  downClientX: number;
  downClientY: number;
};

export const useDraggable = (el: Ref<ComponentPublicInstance | undefined>) => {
  const x = ref(0);
  const y = ref(0);
  const isDown = ref(false);
  let downRect: DownRect;
  const mousedown = (e: Event) => {
    isDown.value = true;
    document.onselectstart = () => false;
    document.ondragstart = () => false;
    const {
      clientX: downClientX,
      clientY: downClientY,
      target
    } = e as MouseEvent;
    const {
      left: targetLeft,
      top: targetTop,
      width: targetWidth,
      height: targetHeight
    } = (target as Element).getBoundingClientRect();
    const {
      left: parentLeft,
      top: parentTop,
      width: parentWidth,
      height: parentHeight
    } = ((target as Node).parentElement as Element).getBoundingClientRect();
    downRect = {
      targetLeft,
      targetTop,
      targetWidth,
      targetHeight,
      parentLeft,
      parentTop,
      parentWidth,
      parentHeight,
      downClientX,
      downClientY
    };
  };
  const mousemove = ({ clientX, clientY }: MouseEvent) => {
    if (!isDown.value) return;
    const {
      targetLeft,
      targetTop,
      targetWidth,
      targetHeight,
      parentLeft,
      parentTop,
      parentWidth,
      parentHeight,
      downClientX,
      downClientY
    } = downRect;
    let left = targetLeft - downClientX - parentLeft + clientX;
    let top = targetTop - downClientY - parentTop + clientY;
    left = Math.max(0, Math.min(left, parentWidth - targetWidth));
    top = Math.max(0, Math.min(top, parentHeight - targetHeight));
    x.value = left;
    y.value = top;
  };
  const mouseup = () => {
    isDown.value = false;
    document.onselectstart = null;
    document.ondragstart = null;
  };
  onMounted(() => {
    el.value?.$el.addEventListener("mousedown", mousedown, false);
    document.addEventListener("mousemove", mousemove, false);
    document.addEventListener("mouseup", mouseup, false);
  });
  onUnmounted(() => {
    el.value?.$el.removeEventListener("mousedown", mousedown, false);
    document.removeEventListener("mousemove", mousemove, false);
    document.removeEventListener("mouseup", mouseup, false);
  });
  return {
    x,
    y
  };
};
