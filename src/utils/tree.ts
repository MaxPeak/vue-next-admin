/**
 * 递归生成树节点
 */
// 方案1：
export const arrToTree = (arr: any, parentId: number | string) => {
  const tree = [];
  let temp;
  for (const item of arr) {
    if (item.parentId !== parentId) continue;
    temp = arrToTree(arr, item.id);
    if (temp.length > 0) item.children = temp;
    tree.push(item);
  }
  return tree;
};
// 方案2：
export const arrToTree1 = (list: any[]) => {
  const res = [];
  const map = list.reduce((res, v) => ((res[v.id] = v), res), {});
  for (const item of list) {
    if (item.parentId === 0) {
      res.push(item);
      continue;
    }
    if (item.parentId in map) {
      const parent = map[item.parentId];
      parent.children = parent.children || [];
      parent.children.push(item);
    }
  }
  return res;
};
