import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import PageBanner from '../components/shared/PageBanner';
import CallToAction from '../components/shared/CallToAction';
import LdJson from '../components/LdJson';
import SeoHeaders, { SeoHeaderProps } from '../components/SeoHeaders';
import { Activity, Heart, Brain, Gamepad2, FileText } from 'lucide-react';

const ICON_MAP: Record<string, React.ReactNode> = {
  Activity: <Activity className="w-6 h-6" />,
  Heart: <Heart className="w-6 h-6" />,
  Brain: <Brain className="w-6 h-6" />,
  Gamepad2: <Gamepad2 className="w-6 h-6" />,
  FileText: <FileText className="w-6 h-6" />,
};

export const header: SeoHeaderProps = {
  title: '',
  description: '',
  keywords: '',
  og: {
    title: '',
    description: '',
    image: 'https://heytcm.com/og-image.jpg',
    site_name: ''
  },
  canonical: '',
  alternate: [
    { href: '', hreflang: 'x-default' },
    { href: '', hreflang: 'zh' },
    { href: '', hreflang: 'en' }
  ]
};

const ProductsPage = () => {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = t('ProductsPage.head.title', 'HeyTCM - 产品与服务');
  }, [t]);

  // 获取四大分组
  const sections = t('ProductsPage.sections', { returnObjects: true }) as Array<{
    id: string;
    title: string;
    desc: string;
    filters: { id: string; label: string }[];
    items: Array<{
      id: string;
      title: string;
      description: string;
      link: string;
      image: string;
      tags: string[];
      icon: string;
    }>;
  }>;

  // 每个分组独立 filter 状态
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({});

  // 初始化每组 filter
  React.useEffect(() => {
    const initial: Record<string, string> = {};
    sections.forEach(sec => {
      initial[sec.id] = 'all';
    });
    setActiveFilters(initial);
  }, [sections.length]);

  const ldJsonData = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": t('ProductsPage.ldjson.name'),
    "brand": {
      "@type": "Brand",
      "name": t('ProductsPage.ldjson.brand')
    },
    "description": t('ProductsPage.ldjson.description'),
    "url": t('ProductsPage.ldjson.url')
  };

  const header: SeoHeaderProps = {
    title: t('ProductsPage.seo.title'),
    description: t('ProductsPage.seo.description'),
    keywords: t('ProductsPage.seo.keywords'),
    og: {
      title: t('ProductsPage.seo.og.title'),
      description: t('ProductsPage.seo.og.description'),
      image: 'https://heytcm.com/og-image.jpg',
      site_name: t('ProductsPage.seo.og.site_name')
    },
    canonical: t('ProductsPage.seo.canonical'),
    alternate: [
      { href: t('ProductsPage.seo.alternate.x-default'), hreflang: 'x-default' },
      { href: t('ProductsPage.seo.alternate.zh'), hreflang: 'zh' },
      { href: t('ProductsPage.seo.alternate.en'), hreflang: 'en' }
    ]
  };

  // 渲染每个分组
  return (
    <div className="pt-16">
      <SeoHeaders header={header} />
      <PageBanner
        title={t('ProductsPage.banner.title', '智能健康产品 & 服务')}
        image="https://images.pexels.com/photos/4046988/pexels-photo-4046988.jpeg"
      />
      {sections.map(section => {
        const filterVal = activeFilters[section.id] || 'all';
        const filteredItems =
          filterVal === 'all'
            ? section.items
            : section.items.filter(item => item.id === filterVal || (item.tags && item.tags.includes(filterVal)));
        return (
          <section key={section.id} className="py-12">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl font-bold mb-2">{section.title}</h2>
              <p className="text-neutral-600 mb-4">{section.desc}</p>
              {/* 分组 Filter */}
              <div className="flex overflow-x-auto hide-scrollbar py-2 mb-6">
                {section.filters.map(filter => (
                  <button
                    key={filter.id}
                    className={`px-4 py-2 mx-2 rounded-full text-sm font-medium transition-colors ${
                      filterVal === filter.id
                        ? 'bg-primary-500 text-white'
                        : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                    }`}
                    onClick={() => setActiveFilters(f => ({ ...f, [section.id]: filter.id }))}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
              {/* 分组 Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItems.map(item => (
                  <motion.div
                    key={item.id}
                    className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="relative h-48">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 right-4">
                        {ICON_MAP[item.icon]}
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-semibold mb-2 text-neutral-800">{item.title}</h3>
                      <p className="text-neutral-600 mb-4">{item.description}</p>
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-primary-500 hover:bg-primary-600 text-white py-2 px-4 rounded-full text-sm font-medium transition-colors"
                      >
                        {t('ProductsPage.viewDetail', '查看详情')}
                      </a>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        );
      })}
      <LdJson data={ldJsonData} />
      <CallToAction
        title={t('ProductsPage.cta.title', '开启您的健康复兴之旅')}
        description={t('ProductsPage.cta.description', '探索 HeyTCM 的智能产品与服务，发现中医的现代价值，重新连接身心平衡。')}
        buttonText={t('ProductsPage.cta.buttonText', '加入 HeyTCM 社区')}
        buttonLink="/ecosystem"
      />
    </div>
  );
};

export default ProductsPage;