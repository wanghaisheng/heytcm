import React from 'react';
import { Helmet } from 'react-helmet-async';
import { locales, defaultLang, domain } from '../config/site';
import i18n from '../i18n';

export interface OgType {
  title?: string;
  description?: string;
  image?: string;
  site_name?: string;
  [key: string]: string | undefined;
}

export interface AlternateType {
  href: string;
  hreflang: string;
}

export interface SeoHeaderProps {
  title?: string;
  description?: string;
  keywords?: string;
  og?: OgType;
  canonical?: string;
  alternate?: AlternateType[];
  robots?: string;
  author?: string;
  ogImageAlt?: string;
  ogImageWidth?: string;
  ogImageHeight?: string;
  googleNotranslate?: boolean;
  manifest?: string;
  appleTouchIcon?: string;
  preloadImages?: string[];
  metaTags?: Array<{ name: string; content: string }>;
  linkTags?: Array<{ rel: string; href: string; [key: string]: any }>;
  [key: string]: any;
}

function getDefaultAlternates(currentUrl: string, languages: string[], defaultLang: string): AlternateType[] {
  // 生成 alternate hreflang 配置，支持 x-default 和所有语言
  const alternates: AlternateType[] = [];
  if (languages && languages.length > 0) {
    alternates.push({ href: currentUrl.replace(`/${defaultLang}/`, '/'), hreflang: 'x-default' });
    languages.forEach(lang => {
      alternates.push({
        href: lang === defaultLang ? currentUrl.replace(`/${defaultLang}/`, '/') : currentUrl.replace(`/${defaultLang}/`, `/${lang}/`),
        hreflang: lang
      });
    });
  }
  return alternates;
}

const SeoHeaders: React.FC<{ header: SeoHeaderProps }> = ({ header }) => {
  // 获取当前语言，优先使用 i18n 当前语言
  const currentLang = (typeof window !== 'undefined' && i18n.language) ? i18n.language : defaultLang;
  // 智能默认 alternate 处理
  let alternates = header.alternate;
  if (!alternates || alternates.length === 0) {
    if (typeof window !== 'undefined') {
      const currentUrl = window.location.href;
      alternates = getDefaultAlternates(currentUrl, locales, currentLang);
    }
  }
  // 智能 canonical 默认处理
  let canonical = header.canonical;
  if (!canonical && typeof window !== 'undefined') {
    canonical = window.location.origin + window.location.pathname;
    if (canonical.endsWith('/')) canonical = canonical.slice(0, -1);
  }
  // 智能 robots 默认处理
  let robots = header.robots;
  if (!robots) {
    robots = 'index,follow';
  }
  // 智能 og 默认处理
  let og = header.og ? { ...header.og } : {};
  if (!og.title && header.title) og.title = header.title;
  if (!og.description && header.description) og.description = header.description;
  if (!og.site_name && typeof window !== 'undefined') og.site_name = domain;
  if (!og.image) og.image = 'https://heytcm.com/og-image.jpg';
  // og:url 自动补全
  if (!og.url && typeof window !== 'undefined') og.url = window.location.href;
  // og:locale 自动补全，优先用 i18n 当前语言
  if (!og.locale) {
    if (currentLang === 'en') {
      og.locale = 'en_US';
    } else {
      og.locale = 'zh_CN';
    }
  }
  return (
    <Helmet>
      {header.title && <title>{header.title}</title>}
      {header.description && <meta name="description" content={header.description} />}
      {header.keywords && <meta name="keywords" content={header.keywords} />}
      {robots && <meta name="robots" content={robots} />}
      {header.author && <meta name="author" content={header.author} />}
      {og && Object.entries(og).map(([k, v]) =>
        v ? <meta property={`og:${k}`} content={v} key={`og:${k}`} /> : null
      )}
      {header.ogImageAlt && <meta property="og:image:alt" content={header.ogImageAlt} />}
      {header.ogImageWidth && <meta property="og:image:width" content={header.ogImageWidth} />}
      {header.ogImageHeight && <meta property="og:image:height" content={header.ogImageHeight} />}
      {canonical && <link rel="canonical" href={canonical} />}
      {alternates && alternates.map((alt, i) =>
        <link rel="alternate" hrefLang={alt.hreflang} href={alt.href} key={i} />
      )}
      {header.googleNotranslate && <meta property="google" content="notranslate" />}
      {header.manifest && <link rel="manifest" href={header.manifest} />}
      {header.appleTouchIcon && <link rel="apple-touch-icon" href={header.appleTouchIcon} />}
      {header.preloadImages && header.preloadImages.map((img, i) =>
        <link rel="preload" href={img} as="image" key={`preload-${i}`} />
      )}
      {header.metaTags && header.metaTags.map((meta, i) =>
        <meta {...meta} key={`meta-${i}`} />
      )}
      {header.linkTags && header.linkTags.map((link, i) =>
        <link {...link} key={`link-${i}`} />
      )}


<script
    src="https://app.rybbit.io/api/script.js"
    data-site-id="357"
    defer
></script>
    </Helmet>
  );
};

export default SeoHeaders;
