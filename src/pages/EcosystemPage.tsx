import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTranslation } from 'react-i18next';
import PageBanner from '../components/shared/PageBanner';
import CallToAction from '../components/shared/CallToAction';
import SeoHeaders, { SeoHeaderProps } from '../components/SeoHeaders';
import { Database, Github, Users, BookOpen } from 'lucide-react';
import LdJson from '../components/LdJson';
import type { SupportedLdJson } from '../components/LdJson';

const EcosystemPage = () => {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = t('EcosystemPage.head.title', 'HeyTCM - 生态系统');
  }, [t]);

  const [openDataRef, openDataInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [openSourceRef, openSourceInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [communityRef, communityInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  function safeSection(section: any) {
    if (!section || typeof section !== 'object') return { items: [], cta: {} };
    return {
      ...section,
      items: Array.isArray(section.items) ? section.items : [],
      cta: typeof section.cta === 'object' && section.cta !== null ? section.cta : {}
    };
  }
  const sections = {
    openData: safeSection(t('EcosystemPage.sections.openData', { returnObjects: true }) || {}),
    openSource: safeSection(t('EcosystemPage.sections.openSource', { returnObjects: true }) || {}),
    community: safeSection(t('EcosystemPage.sections.community', { returnObjects: true }) || {})
  };
  const ldJsonData = t('EcosystemPage.ldjson', { returnObjects: true }) as SupportedLdJson[];

  const header: SeoHeaderProps = {
    title: t('EcosystemPage.seo.title', 'HeyTCM 生态系统'),
    description: t('EcosystemPage.seo.description', 'HeyTCM 生态系统介绍'),
    keywords: t('EcosystemPage.seo.keywords', 'HeyTCM, 生态系统'),
    og: {
      title: t('EcosystemPage.seo.og.title', 'HeyTCM 生态系统'),
      description: t('EcosystemPage.seo.og.description', 'HeyTCM 生态系统介绍'),
      image: t('EcosystemPage.seo.og.image', 'https://heytcm.com/og-image.jpg'),
      site_name: t('EcosystemPage.seo.og.site_name', 'HeyTCM')
    },
    canonical: t('EcosystemPage.seo.canonical', 'https://heytcm.com/ecosystem'),
    alternate: [
      { href: t('EcosystemPage.seo.alternate.x-default', 'https://heytcm.com/ecosystem'), hreflang: 'x-default' },
      { href: t('EcosystemPage.seo.alternate.zh', 'https://heytcm.com/zh/ecosystem'), hreflang: 'zh' },
      { href: t('EcosystemPage.seo.alternate.en', 'https://heytcm.com/en/ecosystem'), hreflang: 'en' }
    ]
  };

  function getCta(cta: any) {
    if (!cta) return null;
    if (typeof cta === 'string') return { buttonText: cta };
    return cta;
  }

  return (
    <div className="pt-16">
      <SeoHeaders header={header} />
      <PageBanner 
        title={t('EcosystemPage.banner.title', 'HeyTCM 生态系统')}
        image="https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      />

      {/* Open Data Section */}
      <section ref={openDataRef} className="py-16 bg-white" id="data">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-4xl mx-auto mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={openDataInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center mb-4">
              <Database className="w-8 h-8 text-primary-500 mr-3" />
              <h2 className="text-3xl md:text-4xl font-display font-bold text-neutral-800">
                {sections.openData?.title || ''}
              </h2>
            </div>
            <p className="text-lg text-neutral-600">
              {sections.openData?.desc || ''}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {Array.isArray(sections.openData?.items) && sections.openData.items.map((item: any, idx: number) => (
              <motion.div 
                key={item.title}
                className="bg-neutral-50 rounded-xl p-6 border border-neutral-200"
                initial={{ opacity: 0, y: 30 }}
                animate={openDataInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + idx * 0.1 }}
              >
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                  <Database className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="text-xl font-display font-semibold mb-3 text-neutral-800">{item.title || ''}</h3>
                <p className="text-neutral-600 mb-4">{item.desc || ''}</p>
                <div className="flex space-x-2">
                  {item.cta?.detail && <a href={item.cta['detail.url'] || '#'} className="text-primary-600 hover:text-primary-700 font-medium text-sm">{item.cta.detail}</a>}
                  {item.cta?.standard && <a href={item.cta['standard.url'] || '#'} className="text-primary-600 hover:text-primary-700 font-medium text-sm">{item.cta.standard}</a>}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div 
            className="max-w-4xl mx-auto bg-primary-50 rounded-xl p-8 border border-primary-100"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={openDataInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            {sections.openData?.cta && (
              <CallToAction
                title={sections.openData.cta.title || ''}
                description={sections.openData.cta.desc || ''}
                buttonText={sections.openData.cta.buttonText || ''}
                buttonLink={sections.openData.cta.url || '#'}
              />
            )}
          </motion.div>
        </div>
      </section>

      {/* Open Source Section */}
      <section ref={openSourceRef} className="py-16 bg-neutral-50" id="opensource">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-4xl mx-auto mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={openSourceInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center mb-4">
              <Github className="w-8 h-8 text-neutral-800 mr-3" />
              <h2 className="text-3xl md:text-4xl font-display font-bold text-neutral-800">
                {sections.openSource?.title || ''}
              </h2>
            </div>
            <p className="text-lg text-neutral-600">
              {sections.openSource?.desc || ''}
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {Array.isArray(sections.openSource?.items) && sections.openSource.items.map((item: any, idx: number) => (
              <motion.div 
                key={item.title}
                className="bg-white rounded-xl p-6 shadow-sm"
                initial={{ opacity: 0, y: 30 }}
                animate={openSourceInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + idx * 0.1 }}
              >
                <h3 className="text-lg font-display font-semibold text-neutral-800 mb-2">{item.title || ''}</h3>
                <p className="text-neutral-600 mb-4">{item.desc || ''}</p>
                {item.cta?.detail && <a href={item.cta['detail.url'] || '#'} className="text-primary-600 hover:text-primary-700 font-medium text-sm">{item.cta.detail}</a>}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section ref={communityRef} className="py-16 bg-white" id="community">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-4xl mx-auto mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={communityInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center mb-4">
              <Users className="w-8 h-8 text-accent-600 mr-3" />
              <h2 className="text-3xl md:text-4xl font-display font-bold text-neutral-800">
                {sections.community?.title || ''}
              </h2>
            </div>
            <p className="text-lg text-neutral-600">
              {sections.community?.desc || ''}
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {Array.isArray(sections.community?.items) && sections.community.items.map((item: any, idx: number) => (
              <motion.div 
                key={item.title}
                className="bg-white rounded-xl p-6 shadow-sm"
                initial={{ opacity: 0, y: 30 }}
                animate={communityInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + idx * 0.1 }}
              >
                <h3 className="text-lg font-display font-semibold text-neutral-800 mb-2">{item.title || ''}</h3>
                <p className="text-neutral-600 mb-4">{item.desc || ''}</p>
                {item.cta?.detail && <a href={item.cta['detail.url'] || '#'} className="text-primary-600 hover:text-primary-700 font-medium text-sm">{item.cta.detail}</a>}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CallToAction 
        title={t('EcosystemPage.cta.title', '加入 HeyTCM 生态社区')}
        description={t('EcosystemPage.cta.description', '与全球中医爱好者共建开放生态')}
        buttonText={t('EcosystemPage.cta.buttonText', '立即加入')}
        buttonLink={t('EcosystemPage.cta.buttonLink', '/community')}
      />
            <LdJson data={ldJsonData} />

    </div>
  );
};

export default EcosystemPage;