/**
 * 是否启用资源打包分析
 * @param {Object} config
 */
const useAnalyzer = (config) => {
  return (enable) => {
    const [, , mode] = process.argv;
    if (enable && mode !== "build") return;
    const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
    config.plugin("webpack-bundle-analyzer").use(BundleAnalyzerPlugin);
  };
};

module.exports = useAnalyzer;
