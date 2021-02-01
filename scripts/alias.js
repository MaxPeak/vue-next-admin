/**
 * 路径解析
 * @param {String} path
 */
const resolve = path => {
  const { join } = require("path");
  return join(__dirname, "../", path);
};
/**
 * 设置 webpack 路径别名
 * @param {Object} config
 */
const setAlias = config => {
  config.resolve.alias
    .set("@root", resolve("/"))
    .set("@", resolve("src"))
    .set("@apis", resolve("src/apis"))
    .set("@assets", resolve("src/assets"))
    .set("@components", resolve("src/components"))
    .set("@layouts", resolve("src/layouts"))
    .set("@locales", resolve("src/locales"))
    .set("@packages", resolve("src/packages"))
    .set("@plugins", resolve("src/plugins"))
    .set("@router", resolve("src/router"))
    .set("@store", resolve("src/store"))
    .set("@styles", resolve("src/styles"))
    .set("@utils", resolve("src/utils"))
    .set("@views", resolve("src/views"));
};
module.exports = setAlias;
