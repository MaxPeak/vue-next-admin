export const lazyLoad = (imgList: HTMLImageElement[]) => {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(item => {
      if (item.intersectionRatio > 0) {
        const img = item.target as HTMLImageElement;
        img.src = img.dataset.src as string;
      }
    });
  });
  imgList.forEach(item => {
    observer.observe(item);
  });
};
