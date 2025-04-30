import React from 'react';
import { useTranslation } from 'react-i18next';
import SeoHeaders, { SeoHeaderProps } from '../components/SeoHeaders';
import PageBanner from '../components/shared/PageBanner';

// 可复用的产品介绍组件
const ProductIntro = ({ title, subtitle, image }: { title: string; subtitle: string; image: string }) => (
  <section className="product-hero py-16 md:py-24 flex flex-col items-center text-center bg-white">
    <h1 className="product-title text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">{title}</h1>
    <p className="product-subtitle text-lg md:text-2xl mb-8 text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
    <div className="product-image-container max-w-2xl mx-auto">
      <img src={image} alt={title} className="product-image rounded-2xl shadow-xl" />
    </div>
  </section>
);

// 可复用的功能亮点组件
const FeatureSection = ({ features }: { features: Array<{ title: string; desc: string; image?: string }> }) => (
  <section className="product-features py-16 bg-gray-50">
    <div className="feature-container flex flex-wrap justify-between items-center max-w-5xl mx-auto">
      {features.map((f, idx) => (
        <div key={idx} className="feature-text flex-1 min-w-[300px] p-6">
          <h2 className="feature-title text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">{f.title}</h2>
          <p className="feature-description text-base md:text-lg text-gray-700 mb-4">{f.desc}</p>
          {f.image && <img src={f.image} alt={f.title} className="feature-image rounded-xl mx-auto" />}
        </div>
      ))}
    </div>
  </section>
);

// 可复用的型号卡片组件
const ModelCards = ({ models }: { models: Array<{ name: string; price: string; features: string[] }> }) => (
  <section className="models-section py-16 text-center">
    <h2 className="models-title text-3xl md:text-4xl font-bold mb-8">型号与价格</h2>
    <div className="models-container flex flex-wrap justify-center gap-8">
      {models.map((m, idx) => (
        <div key={idx} className="model-card bg-white rounded-2xl p-8 shadow-md flex flex-col max-w-xs">
          <div className="model-name text-xl font-semibold mb-2 text-purple-600">{m.name}</div>
          <div className="model-price text-2xl font-bold mb-4">{m.price}</div>
          <ul className="model-features text-left mb-4">
            {m.features.map((f, i) => (
              <li key={i} className="pl-6 relative before:content-['✓'] before:absolute before:left-0 before:text-purple-500 mb-2">{f}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </section>
);

// 可复用的技术参数组件
const TechSpecs = ({ specs }: { specs: Array<{ group: string; items: Array<{ name: string; value: string }> }> }) => (
  <section className="tech-specs py-16 bg-gray-50">
    <h2 className="tech-title text-3xl md:text-4xl font-bold text-center mb-12">技术参数</h2>
    <div className="specs-container grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
      {specs.map((g, idx) => (
        <div key={idx} className="spec-group">
          <h3 className="text-xl font-semibold mb-4 text-purple-600">{g.group}</h3>
          {g.items.map((item, i) => (
            <div key={i} className="spec-item mb-4">
              <div className="spec-name font-medium mb-1">{item.name}</div>
              <div className="spec-value text-gray-600">{item.value}</div>
            </div>
          ))}
        </div>
      ))}
    </div>
  </section>
);

// FAQ 组件
const FAQSection = ({ faqs }: { faqs: Array<{ q: string; a: string }> }) => (
  <section className="faq-section py-16">
    <h2 className="faq-title text-3xl md:text-4xl font-bold text-center mb-12">常见问题</h2>
    <div className="faq-container max-w-2xl mx-auto">
      {faqs.map((f, idx) => (
        <div key={idx} className="mb-8">
          <h4 className="text-lg font-semibold mb-2 text-purple-700">Q: {f.q}</h4>
          <p className="text-gray-700">A: {f.a}</p>
        </div>
      ))}
    </div>
  </section>
);

const RingC1Page = () => {
  const { t } = useTranslation();
  // SEO 头部信息
  const header: SeoHeaderProps = {
    title: t('RingC1Page.seo.title'),
    description: t('RingC1Page.seo.description'),
    keywords: t('RingC1Page.seo.keywords'),
    og: {
      title: t('RingC1Page.seo.og.title'),
      description: t('RingC1Page.seo.og.description'),
      image: t('RingC1Page.seo.og.image'),
      site_name: t('RingC1Page.seo.og.site_name')
    },
    canonical: t('RingC1Page.seo.canonical'),
    alternate: [
      { href: t('RingC1Page.seo.alternate.0.href'), hreflang: t('RingC1Page.seo.alternate.0.hreflang') },
      { href: t('RingC1Page.seo.alternate.1.href'), hreflang: t('RingC1Page.seo.alternate.1.hreflang') },
      { href: t('RingC1Page.seo.alternate.2.href'), hreflang: t('RingC1Page.seo.alternate.2.hreflang') }
    ]
  };
  // 多语言数据
  const features = t('RingC1Page.features', { returnObjects: true }) as Array<{ title: string; desc: string; image?: string }>;
  const models = t('RingC1Page.models', { returnObjects: true }) as Array<{ name: string; price: string; features: string[] }>;
  const specs = t('RingC1Page.specs', { returnObjects: true }) as Array<{ group: string; items: Array<{ name: string; value: string }> }>;
  const faqs = t('RingC1Page.faqs', { returnObjects: true }) as Array<{ q: string; a: string }>;
  return (
    <div className="pt-16 product-page">
      <SeoHeaders header={header} />
      <PageBanner title={t('RingC1Page.banner.title')} image={t('RingC1Page.banner.image')} />
      <ProductIntro title={t('RingC1Page.intro.title')} subtitle={t('RingC1Page.intro.subtitle')} image={t('RingC1Page.intro.image')} />
      <FeatureSection features={features} />
      <ModelCards models={models} />
      <TechSpecs specs={specs} />
      <FAQSection faqs={faqs} />
    </div>
  );
};

export default RingC1Page;