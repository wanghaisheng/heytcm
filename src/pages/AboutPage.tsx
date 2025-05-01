import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import PageBanner from '../components/shared/PageBanner';
import CallToAction from '../components/shared/CallToAction';
import LdJson from '../components/LdJson';
import SeoHeaders, { SeoHeaderProps } from '../components/SeoHeaders';

const AboutPage = () => {
  const { t, i18n } = useTranslation();
  const { lang } = useParams();

  useEffect(() => {
    if (lang && (lang === 'zh' || lang === 'en')) {
      i18n.changeLanguage(lang);
    }
    document.title = t('AboutPage.head.title');
  }, [t, lang, i18n]);

  const sections = t('AboutPage.sections', { returnObjects: true }) as Array<{
    type: string;
    title: string;
    body?: Array<{ title?: string; para?: string }>;
    items?: Array<{ icon?: string; title: string; para: string }>;
  }>;

  const [sectionRefs, setSectionRefs] = React.useState<any[]>([]);
  React.useEffect(() => {
    setSectionRefs((refs) =>
      Array(sections.length)
        .fill(null)
        .map((_, i) => refs[i] || React.createRef())
    );
  }, [sections.length]);

  const [storyRef, storyInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [visionRef, visionInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const ldJsonData = t('AboutPage.ldjson', { returnObjects: true }) as SupportedLdJson[];

  const header: SeoHeaderProps = {
    title: t('AboutPage.seo.title'),
    description: t('AboutPage.seo.description'),
    keywords: t('AboutPage.seo.keywords'),
    og: {
      title: t('AboutPage.seo.og.title'),
      description: t('AboutPage.seo.og.description'),
      image: 'https://heytcm.com/og-image.jpg',
      site_name: t('AboutPage.seo.og.site_name')
    },
    canonical: t('AboutPage.seo.canonical'),
    alternate: [
      { href: t('AboutPage.seo.alternate.x-default'), hreflang: 'x-default' },
      { href: t('AboutPage.seo.alternate.zh'), hreflang: 'zh' },
      { href: t('AboutPage.seo.alternate.en'), hreflang: 'en' }
    ]
  };

  return (
    <div className="pt-16">
      <SeoHeaders header={header} />
      <PageBanner 
        title={t('AboutPage.banner.title')}
        image={t('AboutPage.banner.image')}
      />
      {sections.map((section, idx) => (
        <section
          key={section.type}
          ref={sectionRefs[idx]}
          className={
            section.type === 'story'
              ? 'py-16 md:py-20 bg-white'
              : section.type === 'vision'
              ? 'py-16 md:py-20 bg-neutral-50'
              : 'py-16 md:py-20'
          }
        >
          <div className="container mx-auto px-4">
            <motion.div
              className={
                section.type === 'vision'
                  ? 'max-w-4xl mx-auto text-center mb-12'
                  : 'max-w-4xl mx-auto'
              }
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
            >
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 text-neutral-800">
                {section.title}
              </h2>
              {section.body && (
                <div className="prose prose-lg max-w-none text-neutral-700">
                  {section.body.map((item, i) => (
                    <React.Fragment key={i}>
                      {item.title && (
                        <h3 className="text-xl font-display font-semibold text-primary-600 mt-8">{item.title}</h3>
                      )}
                      {item.para && <p>{item.para}</p>}
                    </React.Fragment>
                  ))}
                </div>
              )}
              {section.items && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                  {section.items.map((item, i) => (
                    <div key={i} className="bg-white p-6 rounded-xl shadow-sm">
                      {/* 可根据 item.icon 渲染不同 SVG 或图标 */}
                      <h4 className="text-lg font-medium mb-2 text-neutral-800">{item.title}</h4>
                      <p className="text-neutral-600">{item.para}</p>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </section>
      ))}
      <CallToAction 
        title={t('AboutPage.cta.title')}
        description={t('AboutPage.cta.description')}
        buttonText={t('AboutPage.cta.buttonText')}
        buttonLink="/ecosystem"
      />
      <LdJson data={ldJsonData} />
    </div>
  );
};

export default AboutPage;