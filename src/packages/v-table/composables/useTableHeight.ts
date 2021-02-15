import { Ref, ref, watch } from "vue";
const getHeight = (ref: Ref) => {
  if (!ref.value) return 0;
  const ele = ref.value.$el ? ref.value.$el : ref.value;
  return ele.getBoundingClientRect().height;
};
const useTableHeight = (height: Ref<number> | Ref<undefined>) => {
  const titleRef = ref();
  const headerRef = ref();
  const footerRef = ref();
  const paginationRef = ref();
  const bodyHeight = ref();
  const handleLayout = () => {
    const headerHeight = getHeight(headerRef);
    const titleHeight = getHeight(titleRef);
    const footerHeight = getHeight(footerRef);
    const paginationHeight = getHeight(paginationRef);
    bodyHeight.value = height.value
      ? `${height.value -
          titleHeight -
          headerHeight -
          footerHeight -
          paginationHeight}px`
      : "auto";
  };
  watch(
    height,
    () => {
      handleLayout();
    },
    { immediate: true }
  );
  return {
    titleRef,
    headerRef,
    footerRef,
    paginationRef,
    bodyHeight
  };
};

export default useTableHeight;
