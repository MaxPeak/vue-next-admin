<template>
  <div :class="[BASECLASSNAME, ROWCLASSNAME(row)]">
    <span ref="contentRef">
      <span ref="textRef">{{ realText }}</span>
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed, watch } from "vue";
export default defineComponent({
  name: "VEllipsis",
  props: {
    row: {
      type: Number,
      default: 1,
    },
  },
  setup(props, { slots }) {
    const BASECLASSNAME = "v-ellipsis";
    const ellipsis = "...";
    const offset = ref(0);
    const contentRef = ref();
    const textRef = ref();
    const text = ref("");
    const clampedText = computed(
      () => text.value.slice(0, offset.value) + ellipsis
    );
    const isClamped = computed(() => {
      if (!text.value) return false;
      return offset.value !== text.value.length;
    });
    const realText = computed(() =>
      isClamped ? clampedText.value : text.value
    );
    const isStyleSupport = (styleName: string | Array<string>): boolean => {
      if (
        typeof window !== "undefined" &&
        window.document &&
        window.document.documentElement
      ) {
        const styleNameList = Array.isArray(styleName)
          ? styleName
          : [styleName];
        const { documentElement } = window.document;

        return styleNameList.some((name) => name in documentElement.style);
      }
      return false;
    };
    const ROWCLASSNAME = (row: number): string => {
      if (row === 1) return `${BASECLASSNAME}-single`;
      const isLineClampSupport = isStyleSupport("webkitLineClamp");
      if (isLineClampSupport) return `${BASECLASSNAME}-multiple`;
      return "";
    };

    const applyChange = () => {
      textRef.value.textContent = realText.value;
    };

    const moveEdge = (steps: number) => {
      clampAt(offset.value + steps);
    };

    const fill = () => {
      while (!isOverflow() && offset.value < text.value.length) {
        moveEdge(1);
      }
    };

    const clamp = () => {
      while (isOverflow() && offset.value > 0) {
        moveEdge(-1);
      }
    };

    const stepToFit = () => {
      fill();
      clamp();
    };

    const clampAt = (value: number) => {
      offset.value = value;
      applyChange();
    };

    const search = (from: number = 0, to: number = offset.value) => {
      if (to - from <= 3) {
        stepToFit();
        return;
      }
      const target = Math.floor((to + from) / 2);
      clampAt(target);
      if (isOverflow()) {
        search(from, target);
      } else {
        search(target, to);
      }
    };

    const isOverflow = () => {
      const ele = contentRef.value;
      return ele.getClientRects().length > props.row;
    };

    const update = () => {
      applyChange();
      if (isOverflow() || isClamped.value) {
        search();
      }
    };

    const init = () => {
      offset.value = text.value.length;
      update();
    };

    const getText = () => {
      const [content] = slots.default ? slots.default() : [];
      return content ? (content.children as string) : "";
    };

    onMounted(() => {
      text.value = getText();
      init();
    });
    watch(
      () => props.row,
      (val) => {
        init();
      }
    );

    return {
      BASECLASSNAME,
      ROWCLASSNAME,
      contentRef,
      textRef,
      realText,
    };
  },
});
</script>

<style vars="{row}" lang="scss" scoped>
.v-ellipsis {
  display: inline-block;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-word;
  &-single {
    white-space: nowrap;
    // https://blog.csdn.net/iefreer/article/details/50421025
    vertical-align: bottom;
  }
  &-multiple {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: var(--row);
  }
}
</style>
