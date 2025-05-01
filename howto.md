# React/Vite 多语言页面 SEO、结构化数据与数组章节最佳实践

以 `src/pages/SupportPage.tsx` 为例，总结 SEO、结构化数据（ldjson）、多语言数组章节的最佳实践，供团队后续页面开发参考。

---

## 1. SEO 字段最佳实践
- 所有 SEO 字段（title/description/keywords/og/canonical/alternate）均存于 i18n JSON 文件，key 需带页面前缀（如 `SupportPage.seo.title`）。
- 页面中统一读取后组装为 header 对象，类型安全传递给 `<SeoHeaders header={header} />`。
- 支持多语言切换，SEO 自动适配。

**示例代码：**
```tsx
const header = {
  title: t('SupportPage.seo.title', '默认标题'),
  description: t('SupportPage.seo.description', '默认描述'),
  keywords: t('SupportPage.seo.keywords', '关键词'),
  og: {
    title: t('SupportPage.seo.og.title', 'OG标题'),
    description: t('SupportPage.seo.og.description', 'OG描述'),
    site_name: t('SupportPage.seo.og.site_name', '站点名'),
    image: t('SupportPage.seo.og.image', 'https://example.com/og.jpg'),
  },
  canonical: t('SupportPage.seo.canonical', 'https://example.com/page'),
  alternate: [
    { hreflang: 'x-default', href: t('SupportPage.seo.alternate.x-default', 'https://example.com/page') },
    { hreflang: 'zh', href: t('SupportPage.seo.alternate.zh', 'https://example.com/zh/page') },
    { hreflang: 'en', href: t('SupportPage.seo.alternate.en', 'https://example.com/en/page') },
  ],
};
```

---

## 2. ldjson 结构化数据最佳实践
- 结构化数据建议全部写入 i18n JSON，支持多语言（如 `SupportPage.ldjson`）。
- 读取时用 `t('SupportPage.ldjson', { returnObjects: true }) as SupportedLdJson[]`，**务必加类型断言，保证类型安全**。
- 传递给 `<LdJson data={ldJsonData} />` 组件。

**示例代码：**
```tsx
import type { SupportedLdJson } from '../components/LdJson';
const ldJsonData = t('SupportPage.ldjson', { returnObjects: true }) as SupportedLdJson[];
<LdJson data={ldJsonData} />
```
> ⚠️ 建议：始终为 ldjson 的国际化读取加上类型断言，防止类型不符导致运行或类型检查报错。

---

## 3. 多语言数组章节最佳实践（如 plans、testimonials、otherWays 等）
- 所有数组结构（如 pricing plans、支持方式、志愿者福利、用户评价等）均写入 i18n JSON，key 带页面前缀。
- 读取时用 `t('SupportPage.xxx', { returnObjects: true }) as Type`，并做好 fallback 机制。
- 渲染前务必判断数组存在与否，防止 undefined.map 报错。

**示例代码：**
```tsx
const supportSection = (t('SupportPage.supportSection', { returnObjects: true }) as SupportSection) || { ...默认对象 };
const plans = Array.isArray(supportSection.plans) ? supportSection.plans : [];

// 渲染
{plans.map(plan => (<PlanCard ... />))}

// 处理多语言数组章节通用写法
const sectionI18n = Array.isArray(section) && section.length > 0 ? section : fallbackArray;
```

---

## 4. i18n JSON 命名规范
- 一级 key 必须加页面前缀，如 `SupportPage.bannerSection`、`SupportPage.supportSection` 等，避免 key 冲突。
- 所有字段均可多语言覆盖，英文、中文、日文等各自维护。

---

## 5. 推荐的类型定义（TypeScript）
```ts
type Plan = { id: string; name: string; price: string; desc: string; features: string[]; highlight?: boolean; };
type SupportSection = { title: string; desc: string; planHotTag: string; otherWaysTitle: string; otherWays?: { title: string; description: string }[]; plans: Plan[]; };
// 其余类型依页面实际扩展
```

---

## 6. 组件调用与传参
- 推荐所有页面头部统一 `<SeoHeaders header={header} />`
- 结构化数据统一 `<LdJson data={ldJsonData} />`
- 章节内容均通过 i18n 读取，类型断言，数组渲染前判断数组有效性。

---

## 7. 常见错误防范
- `.map()` 前务必判断为数组，否则 fallback，避免运行时报错。
- JSON key 命名不规范会导致国际化失效，务必加前缀。

---

如需批量生成页面模板或有其他最佳实践建议，欢迎补充！
