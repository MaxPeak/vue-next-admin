export type RectInfo = {
  left: number;
  right: number;
  top: number;
  bottom: number;
};

/**
 * 矩形碰撞检测
 */
export const rectCollision = (current: RectInfo, target: RectInfo) => {
  return !(
    current.right < target.left ||
    current.top > target.bottom ||
    current.bottom < target.top ||
    current.left > target.right
  );
};
