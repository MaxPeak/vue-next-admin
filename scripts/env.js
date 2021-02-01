/**
 * 获取分支名
 * @returns {String}
 */
const getBranch = () => {
  const childProcess = require("child_process");
  return childProcess
    .execSync("git rev-parse --abbrev-ref HEAD")
    .toString()
    .replace(/\s+/, "")
    .replace("heads/", "");
};

/**
 * 动态更新环境变量
 * @param {Object} currentEnv required
 */
const updateEnv = (currentEnv) => {
  Object.entries(currentEnv).forEach(([key, value]) => {
    process.env[key] = value;
  });
};

/**
 * 设置环境变量
 * @param {String} env required
 */
const useEnv = (env) => {
  // 环境变量配置表
  const envs = require("./envMap.json");
  // 是否是开发环境
  const isDev = process.env.NODE_ENV === "development";
  // 获取当前环境配置表
  const currentEnv = envs[isDev ? env : getBranch()];
  // 动态设置环境变量
  updateEnv(currentEnv);
  console.table(currentEnv);
};

module.exports = useEnv;
