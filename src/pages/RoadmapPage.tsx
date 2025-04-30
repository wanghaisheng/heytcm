import React from 'react';
import { useTranslation } from 'react-i18next';
import PageBanner from '../components/shared/PageBanner';
import SeoHeaders, { SeoHeaderProps } from '../components/SeoHeaders';

const RoadmapPage = () => {
  const { t } = useTranslation();
  const header: SeoHeaderProps = {
    title: t('RoadmapPage.seo.title'),
    description: t('RoadmapPage.seo.description'),
    keywords: t('RoadmapPage.seo.keywords'),
    og: {
      title: t('RoadmapPage.seo.og.title'),
      description: t('RoadmapPage.seo.og.description'),
      image: t('RoadmapPage.seo.og.image'),
      site_name: t('RoadmapPage.seo.og.site_name')
    },
    canonical: t('RoadmapPage.seo.canonical'),
    alternate: [
      { href: t('RoadmapPage.seo.alternate.x-default'), hreflang: 'x-default' },
      { href: t('RoadmapPage.seo.alternate.zh'), hreflang: 'zh' },
      { href: t('RoadmapPage.seo.alternate.en'), hreflang: 'en' }
    ]
  };
  const roadmap = t('RoadmapPage.roadmap', { returnObjects: true }) as Array<{
    stage: string;
    desc: string;
    tags: string[];
  }>;
  return (
    <div className="pt-16">
      <SeoHeaders header={header} />

      <PageBanner title={t('RoadmapPage.banner.title')} image={t('RoadmapPage.banner.image')} />
      <section className="container mx-auto px-4 py-16">
      <h3 className="text-2xl font-bold mb-6 font-serif">{t('RoadmapPage.title')}</h3>
      <div className="space-y-8">
        {roadmap.map((item, idx) => (
          <div className="bg-white dark:bg-dark-card rounded-xl shadow-sm p-8" key={idx}>
            <h4 className="text-xl font-medium mb-3">{item.stage}</h4>
            <p className="text-gray-700 dark:text-gray-300 mb-3">{item.desc}</p>
            <div className="flex flex-wrap gap-2 mt-2">
              {item.tags.map((tag, tagIdx) => (
                <span
                  className="px-3 py-1 bg-primary/10 text-primary dark:bg-primary/20 text-sm rounded-full"
                  key={tagIdx}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 text-center">
        <p className="text-gray-700 dark:text-gray-300">{t('RoadmapPage.footnote')}</p>
      </div>
    </section>
    </div>

  );
};

export default RoadmapPage;
