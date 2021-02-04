const scanFiles = item => {
  return new Promise(resolve => {
    if (item.isDirectory) {
      const arr = [];
      item.createReader().readEntries(entries => {
        for (const entry of entries) {
          arr.push(scanFiles(entry));
        }
        Promise.all(arr).then(res => {
          resolve(res);
        });
      });
    } else if (item.isFile) {
      item.file(file => {
        // 拖拽的file webkitRelativePath为空，需要重写一个path属性，因为webkitRelativePath是只读属性
        file.path = item.fullPath;
        resolve(file);
      });
    }
  });
};

const getChildNodeByName = (parentNode, name) => {
  let res = null;
  if (parentNode.children !== undefined) {
    res = parentNode.children.find(node => node.name === name);
  }
  return res;
};

const createNextId = parentNode => {
  const parentId = parentNode.id;
  const nodes = parentNode.children;
  if (parentId === null) {
    return `${nodes.length + 1}`;
  } else {
    return `${parentId}-${nodes.length + 1}`;
  }
};

const insertChildNode = (parentNode, name) => {
  let node = getChildNodeByName(parentNode, name);
  if (!node) {
    if (parentNode.children === undefined) {
      parentNode.children = [];
    }
    node = {
      name,
      id: createNextId(parentNode)
    };
    parentNode.children.push(node);
  }
  return node;
};

const insertTreeByOnePath = (path, rootNode) => {
  let parentNode = rootNode;
  path.forEach(nodeName => {
    parentNode = insertChildNode(parentNode, nodeName);
  });
};

const createTreeByPaths = paths => {
  const rootNode = {
    name: "root",
    id: null,
    children: []
  };
  paths.forEach(path => {
    insertTreeByOnePath(path, rootNode);
  });
  return rootNode.children;
};

export const getFiles = async items => {
  const files = await Promise.all(
    [...items].map(item => scanFiles(item.webkitGetAsEntry()))
  );
  // 过滤掉.开头的隐藏文件
  return files.flat(Infinity).filter(({ name }) => !/^\./.test(name));
};

export const getDirectoryTree = files => {
  const paths = files.map(({ path }) => {
    const directory = path.split("/").filter(item => item);
    // 最后一级是文件，我这里只需要文件夹，所以删除掉了文件
    directory.pop();
    return directory;
  });
  return createTreeByPaths(paths);
};
