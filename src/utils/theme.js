import axios from "axios";

const version = require("element-ui/package.json").version; // element-ui version from node_modules
const ORIGINAL_THEME = "#409EFF"; // default color
let chalk = "";

const tintColor = (color, tint) => {
  let red = parseInt(color.slice(0, 2), 16);
  let green = parseInt(color.slice(2, 4), 16);
  let blue = parseInt(color.slice(4, 6), 16);
  if (tint === 0) {
    // when primary color is in its rgb space
    return [red, green, blue].join(",");
  } else {
    red += Math.round(tint * (255 - red));
    green += Math.round(tint * (255 - green));
    blue += Math.round(tint * (255 - blue));
    const redStr = red.toString(16);
    const greenStr = green.toString(16);
    const blueStr = blue.toString(16);
    return `#${redStr}${greenStr}${blueStr}`;
  }
};

const shadeColor = (color, shade) => {
  let red = parseInt(color.slice(0, 2), 16);
  let green = parseInt(color.slice(2, 4), 16);
  let blue = parseInt(color.slice(4, 6), 16);
  red = Math.round((1 - shade) * red);
  green = Math.round((1 - shade) * green);
  blue = Math.round((1 - shade) * blue);
  const redStr = red.toString(16);
  const greenStr = green.toString(16);
  const blueStr = blue.toString(16);
  return `#${redStr}${greenStr}${blueStr}`;
};

const getThemeCluster = theme => {
  const clusters = [theme];
  for (let i = 0; i <= 9; i++) {
    clusters.push(tintColor(theme, Number((i / 10).toFixed(2))));
  }
  clusters.push(shadeColor(theme, 0.1));
  return clusters;
};

const updateStyleString = (style, oldCluster, newCluster) => {
  let newStyle = style;
  oldCluster.forEach((color, index) => {
    newStyle = newStyle.replace(new RegExp(color, "ig"), newCluster[index]);
  });
  return newStyle;
};

const getCSSString = async url => {
  const { data } = await axios.get(url);
  return data.replace(/@font-face{[^}]+}/, "");
};

const updateStyleById = (id, themeCluster) => {
  const originalCluster = getThemeCluster(ORIGINAL_THEME.replace("#", ""));
  const newStyle = updateStyleString(chalk, originalCluster, themeCluster);
  let styleTag = document.getElementById(id);
  if (!styleTag) {
    styleTag = document.createElement("style");
    styleTag.setAttribute("id", id);
    document.head.appendChild(styleTag);
  }
  styleTag.innerText = newStyle;
};

const updateStyleByOldValue = (oldVal, originalCluster, themeCluster) => {
  const styles = [...document.querySelectorAll("style")].filter(
    ({ innerText }) =>
      new RegExp(oldVal, "i").test(innerText) &&
      !/Chalk Variables/.test(innerText)
  );
  styles.forEach(style => {
    const { innerText } = style;
    if (typeof innerText !== "string") return;
    style.innerText = updateStyleString(
      innerText,
      originalCluster,
      themeCluster
    );
  });
};

export const changeTheme = async val => {
  const oldVal = chalk ? val : ORIGINAL_THEME;
  if (typeof val !== "string") return;
  const themeCluster = getThemeCluster(val.replace("#", ""));
  const originalCluster = getThemeCluster(oldVal.replace("#", ""));
  if (!chalk) {
    const url = `https://unpkg.com/element-ui@${version}/lib/theme-chalk/index.css`;
    chalk = await getCSSString(url);
  }
  updateStyleById("chalk-style", themeCluster);
  updateStyleByOldValue(oldVal, originalCluster, themeCluster);
};
