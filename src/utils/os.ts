export const os = () => {
  // im.qq.com
  const ua = navigator.userAgent;
  const isQB = /(?:MQQBrowser|QQ)/.test(ua);
  const isWindowsPhone = /(?:Windows Phone)/.test(ua);
  const isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone;
  const isAndroid = /(?:Android)/.test(ua);
  const isFireFox = /(?:Firefox)/.test(ua);
  const isChrome = /(?:Chrome|CriOS)/.test(ua);
  const isIpad = /(?:iPad|PlayBook)/.test(ua);
  const isTablet =
    /(?:iPad|PlayBook)/.test(ua) || (isFireFox && /(?:Tablet)/.test(ua));
  const isSafari = /(?:Safari)/.test(ua);
  const isPhone = /(?:iPhone)/.test(ua) && !isTablet;
  const isOpen = /(?:Opera Mini)/.test(ua);
  const isUC = /(?:UCWEB|UCBrowser)/.test(ua);
  const isPc = !isPhone && !isAndroid && !isSymbian;
  return {
    isQB,
    isWindowsPhone,
    isSymbian,
    isAndroid,
    isFireFox,
    isChrome,
    isIpad,
    isTablet,
    isSafari,
    isPhone,
    isOpen,
    isUC,
    isPc
  };
};
