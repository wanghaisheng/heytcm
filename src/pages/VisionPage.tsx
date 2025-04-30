import React from 'react';
import { useTranslation } from 'react-i18next';
import { Brain, PieChart, Smartphone } from 'lucide-react';
import PageBanner from '../components/shared/PageBanner';
import SeoHeaders, { SeoHeaderProps } from '../components/SeoHeaders';

const ICON_MAP: Record<string, React.ReactNode> = {
  Brain: <Brain className="w-7 h-7" />,
  PieChart: <PieChart className="w-7 h-7" />,
  Smartphone: <Smartphone className="w-7 h-7" />
};

const VisionPage = () => {
  const { t } = useTranslation();
  const header: SeoHeaderProps = {
    title: t('VisionPage.seo.title'),
    description: t('VisionPage.seo.description'),
    keywords: t('VisionPage.seo.keywords'),
    og: {
      title: t('VisionPage.seo.og.title'),
      description: t('VisionPage.seo.og.description'),
      image: t('VisionPage.seo.og.image'),
      site_name: t('VisionPage.seo.og.site_name')
    },
    canonical: t('VisionPage.seo.canonical'),
    alternate: [
      { href: t('VisionPage.seo.alternate.x-default'), hreflang: 'x-default' },
      { href: t('VisionPage.seo.alternate.zh'), hreflang: 'zh' },
      { href: t('VisionPage.seo.alternate.en'), hreflang: 'en' }
    ]
  };
  const missionItems = t('VisionPage.mission.items', { returnObjects: true }) as Array<{
    icon: string;
    title: string;
    desc: string;
  }>;
  const principleItems = t('VisionPage.principle.beliefs', { returnObjects: true }) as Array<{
    title: string;
    desc: string;
  }>;
  const valueItems = t('VisionPage.principle.values', { returnObjects: true }) as Array<{
    title: string;
    desc: string;
  }>;
  return (
    <div className="pt-16">
      <SeoHeaders header={header} />
      <PageBanner title={t('VisionPage.banner.title')} image={t('VisionPage.banner.image')} />
      <section className="container mx-auto px-4 py-16">
        <div className="mb-16">
          <h3 className="text-2xl font-bold mb-6 font-serif">{t('VisionPage.title')}</h3>
          {/* 愿景 */}
          <div className="p-8 bg-white dark:bg-dark-card rounded-xl shadow-sm mb-8">
            <h4 className="text-xl font-medium mb-4">{t('VisionPage.vision.title')}</h4>
            <p className="text-gray-700 dark:text-gray-300">{t('VisionPage.vision.desc')}</p>
          </div>
          {/* 使命 */}
          <h4 className="text-xl font-medium mb-4">{t('VisionPage.mission.title')}</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {missionItems.map((item, idx) => (
              <div className="flex items-start space-x-4 bg-white dark:bg-dark-card rounded-xl shadow-sm p-6" key={idx}>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                  {ICON_MAP[item.icon === 'ChartPie' ? 'PieChart' : item.icon]}
                </div>
                <div>
                  <h5 className="text-lg font-medium mb-2">{item.title}</h5>
                  <p className="text-gray-600 dark:text-gray-400">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          {/* 原则 */}
          <h4 className="text-xl font-medium mb-4">{t('VisionPage.beliefs.title')}</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {principleItems.map((item, idx) => (
              <div className="flex items-start space-x-4 bg-white dark:bg-dark-card rounded-xl shadow-sm p-6" key={idx}>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                  <span className="text-xl font-bold">{idx + 1}</span>
                </div>
                <div>
                  <h5 className="text-lg font-medium mb-2">{item.title}</h5>
                  <p className="text-gray-600 dark:text-gray-400">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          {/* 价值观 */}
          <h4 className="text-xl font-medium mb-4">{t('VisionPage.values.title')}</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {valueItems.map((item, idx) => (
              <div className="flex items-start space-x-4 bg-white dark:bg-dark-card rounded-xl shadow-sm p-6" key={idx}>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                  <span className="text-xl font-bold">{idx + 1}</span>
                </div>
                <div>
                  <h5 className="text-lg font-medium mb-2">{item.title}</h5>
                  <p className="text-gray-600 dark:text-gray-400">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      </div>

    );
};

export default VisionPage;
