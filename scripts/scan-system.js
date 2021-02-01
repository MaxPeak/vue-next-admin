/**
 * 字节转MB
 * @param {Number} bit
 * @returns {String}
 */
const bit2MB = (bit) => (bit / (1024 * 1024 * 1024)).toFixed(1);

/**
 * 扫描系统，输出日志
 */
const scanSystem = () => {
  const { cpus, totalmem, freemem } = require("os");
  console.table({
    cpu数量: cpus().length,
    内存总量: `${bit2MB(totalmem())}MB`,
    可用内存量: `${bit2MB(freemem())}MB`,
  });
};

module.exports = scanSystem;
