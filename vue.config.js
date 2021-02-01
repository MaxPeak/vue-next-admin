const scanSystem = require("./scripts/scan-system");
const useEnv = require("./scripts/env");
const useAnalyzer = require("./scripts/analyzer");
const setAlias = require("./scripts/alias");

scanSystem();
useEnv("dev");

module.exports = {
  devServer: {
    host: require("ip").address(),
    open: true,
  },
  chainWebpack(config) {
    setAlias(config);
    useAnalyzer(config)(true);
  },
  productionSourceMap: false,
};
