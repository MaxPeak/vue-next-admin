// 扫描文件
const scanFiles = item => {
  return new Promise(resolve => {
    if (item.isDirectory) {
      const arr = []
      item.createReader().readEntries(entries => {
        for (const entry of entries) {
          arr.push(scanFiles(entry))
        }
        Promise.all(arr).then(res => {
          resolve(res)
        })
      })
    } else if (item.isFile) {
      item.file(file => {
        file.path = item.fullPath
        resolve(file)
      })
    }
  })
}

// 获取子节点
const getChildNodeByName = (parentNode, name) => {
  let res = null
  if (parentNode.children !== undefined) {
    res = parentNode.children.find(node => node.name === name)
  }
  return res
}
// 生成id
const createNextId = parentNode => {
  const parentId = parentNode.id
  const nodes = parentNode.children
  if (parentId === null) {
    return `${nodes.length + 1}`
  } else {
    return `${parentId}-${nodes.length + 1}`
  }
}
// 插入节点
const insertChildNode = (parentNode, name, item) => {
  let node = getChildNodeByName(parentNode, name)
  if (!node) {
    if (parentNode.children === undefined) {
      parentNode.children = []
    }
    node = {
      name,
      id: createNextId(parentNode)
    }
    item.id = createNextId(parentNode)
    parentNode.children.push(node)
  }
  item.id = node.id
  return node
}

const insertTreeByOnePath = (path, rootNode, item) => {
  let parentNode = rootNode
  path.forEach(nodeName => {
    parentNode = insertChildNode(parentNode, nodeName, item)
  })
}
// 生成树
const createTreeByPaths = paths => {
  const rootNode = {
    name: 'root',
    id: null,
    children: []
  }
  paths.forEach(item => {
    insertTreeByOnePath(item.directory, rootNode, item)
  })
  return rootNode.children
}

// 获取文件
export const getFiles = async items => {
  const files = await Promise.all(
    [...items].map(item => scanFiles(item.webkitGetAsEntry()))
  )
  return files.flat(Infinity).filter(({ name }) => !/^\./.test(name))
}

// 获取目录树
export const getDirectoryTree = files => {
  const paths = files.map(file => {
    const directory = file.path.split('/').filter(item => item)
    directory.pop()
    file.directory = directory
    return file
  })
  return createTreeByPaths(paths)
}

// 过滤不符合要求的文件
export const filterFile = (files, accept) => {
  const suffixs = accept.split(',').map(item => item.replace(/\./, ''))
  return files
    .filter(({ name }) => !/^\./.test(name))
    .filter(({ name }) => {
      const names = name.split('.')
      const suffix = names[names.length - 1]
      return suffixs.includes(suffix)
    })
}

// 异步函数错误捕获
export const tryAsyncFunc = async asyncFunc => {
  try {
    const res = await asyncFunc()
    return [null, res]
  } catch (error) {
    return [error, null]
  }
}

// 保留一位小数
export const oneDecimal = number => {
  return Math.floor(number * 10) / 10
}

// 树转列表
export const treeToList = tree => {
  const result = []
  for (const item of tree) {
    result.push(item)
    if (item.children !== null) {
      result.push(...treeToList(item.children))
    }
  }
  return result
}
