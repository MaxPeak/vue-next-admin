/**
 * 生成新的version
 */
const generateVersion = () => {
  const { name } = require("../package.json");
  const dayjs = require("dayjs");
  const utc = require("dayjs/plugin/utc");
  const timezone = require("dayjs/plugin/timezone");
  dayjs.extend(utc);
  dayjs.extend(timezone);
  const time = dayjs()
    .tz("Asia/Shanghai")
    .format("YYYY-MM-DD HH:mm:ss");
  return {
    name,
    time
  };
};

/**
 * 更新本地version
 * @param {Object} version
 */
const updateVersion = version => {
  const { writeFile } = require("fs");
  const { join } = require("path");
  const file = join(__dirname, "../", "public/version.json");
  const content = JSON.stringify(version, null, 2);
  writeFile(file, content, err => {
    if (err) {
      console.log("写入文件失败::", err);
      return;
    }
    console.log("写入文件成功");
  });
};

/**
 * 更新数据库
 * @param {Object} version
 */
const updateDB = version => {
  // 调接口的相关逻辑...
};

/**
 * IIFE，主要用于区分是更新还是检查
 */
(() => {
  const [, , params] = process.argv;
  const [type, enableApi] = params.split(":");
  if (type !== "update") return;
  const version = generateVersion();
  updateVersion(version);
  if (enableApi !== "api") return;
  updateDB(version);
})();

/**
 * 获取version
 */
const getVersion = enableApi => {
  // 获取本地version
  const localVersion = require("../public/version.json");
  if (!enableApi) return localVersion;
  // 获取接口之后的逻辑...
};

/**
 * 轮询检查
 * @param {Object} version
 * @param {Function} callback
 */
const pollingCheckVersion = (version, enableApi, callback) => {
  // 轮询间隔(s)
  const pollingInterval = 1 * 1000;
  const { time: oldTime } = version;
  setInterval(() => {
    const { time: newTime } = getVersion(enableApi);
    if (oldTime === newTime) return;
    callback && callback();
  }, pollingInterval);
};

/**
 * 轮询检查是否更新
 */
const checkVersion = (enableApi, callback) => {
  const version = getVersion(enableApi);
  pollingCheckVersion(version, enableApi, callback);
};

module.exports = checkVersion;
