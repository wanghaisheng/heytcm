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
import type { SupportedLdJson } from '../components/LdJson';

const HomePage = () => {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    document.title = t('HomePage.head.title');
  }, [t]);

  // 结构化数据 ldjson 直接从 JSON 获取数组，类型断言保证类型安全
  const ldJsonData = t('HomePage.ldjson', { returnObjects: true }) as SupportedLdJson[];

  // SEO 信息全部从 JSON 获取，结构与 SeoHeaderProps 对齐
  const header: SeoHeaderProps = {
    title: t('HomePage.seo.title'),
    description: t('HomePage.seo.description'),
    keywords: t('HomePage.seo.keywords'),
    og: {
      title: t('HomePage.seo.og.title'),
      description: t('HomePage.seo.og.description'),
      image: t('HomePage.seo.og.image'),
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
      <HeroSection 
        title={t('HomePage.hero.title')}
        description={t('HomePage.hero.desc')}
        buttons={t('HomePage.hero.buttons', { returnObjects: true }) as any[]}

      />

      {/* Founder's Message */}
      <FounderMessage 
        title={t('HomePage.founder.title')}
        link={t('HomePage.founder.link')}
        imageUrl={t('HomePage.founder.imageUrl')}
        founderAlt={t('HomePage.founder.founderAlt')}
      />

      {/* Pain Points Section */}
      <PainPoints 
        list={t('HomePage.painPoints', { returnObjects: true }) as any[]}

      />

      {/* Solutions Section */}
      <SolutionCards
        sectionTitle={t('HomePage.solutions.title')}
        sectionDesc={t('HomePage.solutions.desc')}
        list={t('HomePage.solutions', { returnObjects: true }) as any[]}

      />

      {/* Latest News */}
      <NewsSection 
        sectionTitle={t('HomePage.news.title')}
        sectionDesc={t('HomePage.news.desc')}
        list={t('HomePage.news', { returnObjects: true }) as any[]}
        detailText={t('HomePage.news.detail')}
      />

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