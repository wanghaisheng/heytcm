import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import HeroSection from '../components/home/HeroSection';
import FounderMessage from '../components/home/FounderMessage';
import PainPoints from '../components/home/PainPoints';
import SolutionCards from '../components/home/SolutionCards';
import NewsSection from '../components/home/NewsSection';
import CallToAction from '../components/shared/CallToAction';
import LdJson from '../components/LdJson';
import SeoHeaders, { SeoHeaderProps } from '../components/SeoHeaders';

const HomePage = () => {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    document.title = t('HomePage.head.title');
  }, [t]);

  // 动态组装 ldjson 数据
  const ldJsonData = {
    "@context": "https://schema.org",
    "@type": t('HomePage.ldjson.type'),
    "name": t('HomePage.ldjson.name'),
    "url": t('HomePage.ldjson.url'),
    "applicationCategory": t('HomePage.ldjson.software.applicationCategory'),
    "operatingSystem": t('HomePage.ldjson.software.operatingSystem'),
    "description": t('HomePage.ldjson.software.description'),
    "publisher": {
      "@type": t('HomePage.ldjson.publisher.type'),
      "name": t('HomePage.ldjson.publisher.name')
    }
  };

  const header: SeoHeaderProps = {
    title: t('HomePage.seo.title'),
    description: t('HomePage.seo.description'),
    keywords: t('HomePage.seo.keywords'),
    og: {
      title: t('HomePage.seo.og.title'),
      description: t('HomePage.seo.og.description'),
      image: 'https://heytcm.com/og-image.jpg',
      site_name: t('HomePage.seo.og.site_name')
    },
    canonical: t('HomePage.seo.canonical'),
    alternate: [
      { href: t('HomePage.seo.alternate.x-default'), hreflang: 'x-default' },
      { href: t('HomePage.seo.alternate.zh'), hreflang: 'zh' },
      { href: t('HomePage.seo.alternate.en'), hreflang: 'en' }
    ]
  };

  return (
    <div className="pt-20">
      <SeoHeaders header={header} />
      {/* Hero Section */}
      <HeroSection />

      {/* Founder's Message */}
      <FounderMessage />

      {/* Pain Points Section */}
      <PainPoints />

      {/* Solutions Section */}
      <SolutionCards />

      {/* Latest News */}
      <NewsSection />

      {/* Final CTA */}
      <CallToAction 
        title={t('HomePage.cta.title')}
        description={t('HomePage.cta.desc')}
        buttonText={t('HomePage.cta.button')}
        buttonLink="/support"
      />
      <LdJson data={ldJsonData} />
    </div>
  );
};

export default HomePage;