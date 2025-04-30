import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Vite 动态导入所有 locales 下的 json 文件（zh/en）
const zhModules = import.meta.glob('../locales/zh/*.json', { eager: true });
const enModules = import.meta.glob('../locales/en/*.json', { eager: true });

function flatten(modules: Record<string, any>) {
  const result: Record<string, any> = {};
  Object.entries(modules).forEach(([path, mod]) => {
    Object.assign(result, mod.default || mod);
  });
  return result;
}

// 修复：资源结构加 translation namespace
const resources = {
  zh: { translation: flatten(zhModules) },
  en: { translation: flatten(enModules) },
};

// 获取 url 中的语言前缀
function detectLangFromUrl() {
  const match = window.location.pathname.match(/^\/(zh|en)(\/|$)/);
  return match ? match[1] : 'zh'; // 默认中文
}

const initialLang = localStorage.getItem('lang') || detectLangFromUrl();

i18n
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'zh',
    lng: initialLang,
    interpolation: { escapeValue: false },
    react: { useSuspense: false }
  });

console.log('i18n loaded resources:', resources);

export default i18n;