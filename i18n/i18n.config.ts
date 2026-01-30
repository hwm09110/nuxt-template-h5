// import en from "./locales/en.json";
// import zhCN from "./locales/zh-CN.json";
// import zhHK from "./locales/zh-HK.json";

// You can use `defineI18nConfig` to get type inferences for options to pass to vue-i18n.
export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'zh-CN',
  fallbackLocale: 'zh-CN', // 区配不到的语言就用zh-CN
  // messages: {
  //   "zh-CN": zhCN,
  //   "zh-HK": zhHK,
  //   en,
  // },
}));
