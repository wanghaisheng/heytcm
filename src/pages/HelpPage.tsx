import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import PageBanner from '../components/shared/PageBanner';
import LdJson from '../components/LdJson';
import SeoHeaders, { SeoHeaderProps } from '../components/SeoHeaders';
import { Search, ChevronDown, ChevronUp, CreditCard, Smartphone, HelpCircle, Lock, Users, Shield } from 'lucide-react';
import { useTranslation } from 'react-i18next';

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

const HelpPage = () => {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = t('HelpPage.head.title');
  }, [t]);

  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [expandedFaqs, setExpandedFaqs] = useState<number[]>([]);

  const categories = [
    { id: 'all', label: t('HelpPage.categories.0.label'), icon: <HelpCircle size={20} /> },
    { id: 'account', label: t('HelpPage.categories.1.label'), icon: <CreditCard size={20} /> },
    { id: 'smartring', label: t('HelpPage.categories.2.label'), icon: <Smartphone size={20} /> },
    { id: 'data', label: t('HelpPage.categories.3.label'), icon: <Lock size={20} /> },
    { id: 'community', label: t('HelpPage.categories.4.label'), icon: <Users size={20} /> },
    { id: 'security', label: t('HelpPage.categories.5.label'), icon: <Shield size={20} /> },
  ];

  // const faqs = [
  //   {
  //     id: 1,
  //     question: t('HelpPage.faqs.0.question'),
  //     answer: t('HelpPage.faqs.0.answer'),
  //     category: 'smartring',
  //   },
  //   {
  //     id: 2,
  //     question: t('HelpPage.faqs.1.question'),
  //     answer: t('HelpPage.faqs.1.answer'),
  //     category: 'account',
  //   },
  //   {
  //     id: 3,
  //     question: t('HelpPage.faqs.2.question'),
  //     answer: t('HelpPage.faqs.2.answer'),
  //     category: 'data',
  //   },
  //   {
  //     id: 4,
  //     question: t('HelpPage.faqs.3.question'),
  //     answer: t('HelpPage.faqs.3.answer'),
  //     category: 'smartring',
  //   },
  //   {
  //     id: 5,
  //     question: t('HelpPage.faqs.4.question'),
  //     answer: t('HelpPage.faqs.4.answer'),
  //     category: 'community',
  //   },
  //   {
  //     id: 6,
  //     question: t('HelpPage.faqs.5.question'),
  //     answer: t('HelpPage.faqs.5.answer'),
  //     category: 'account',
  //   },
  //   {
  //     id: 7,
  //     question: t('HelpPage.faqs.6.question'),
  //     answer: t('HelpPage.faqs.6.answer'),
  //     category: 'security',
  //   },
  // ];
  //
  // 数据驱动 FAQ
  const faqs = t('HelpPage.faqs', { returnObjects: true }) as Array<{
    id: number;
    question: string;
    answer: string;
    category: string;
  }>;

  const ldJsonData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      // 填写常见问题数据
    ],
    "name": t('HelpPage.ldjson.name'),
    "description": t('HelpPage.ldjson.description'),
    "url": t('HelpPage.ldjson.url')
  };

  const toggleFaq = (id: number) => {
    setExpandedFaqs(prev => 
      prev.includes(id)
        ? prev.filter(faqId => faqId !== id)
        : [...prev, id]
    );
  };

  const filteredFaqs = faqs.filter(faq => {
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    const matchesSearch = searchTerm === '' || 
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  const header: SeoHeaderProps = {
    title: t('HelpPage.seo.title'),
    description: t('HelpPage.seo.description'),
    keywords: t('HelpPage.seo.keywords'),
    og: {
      title: t('HelpPage.seo.og.title'),
      description: t('HelpPage.seo.og.description'),
      image: 'https://heytcm.com/og-image.jpg',
      site_name: t('HelpPage.seo.og.site_name')
    },
    canonical: t('HelpPage.seo.canonical'),
    alternate: [
      { href: t('HelpPage.seo.alternate.x-default'), hreflang: 'x-default' },
      { href: t('HelpPage.seo.alternate.zh'), hreflang: 'zh' },
      { href: t('HelpPage.seo.alternate.en'), hreflang: 'en' }
    ]
  };

  return (
    <div className="pt-16">
      <SeoHeaders header={header} />
      <PageBanner 
        title={t('HelpPage.banner.title')}
        image={t('HelpPage.banner.image')}
      />

      <LdJson data={ldJsonData} />

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {/* Search Bar */}
            <div className="mb-10">
              <div className="relative">
                <input
                  type="text"
                  placeholder={t('HelpPage.search.placeholder')}
                  className="w-full py-3 pl-12 pr-4 bg-neutral-50 border border-neutral-200 rounded-full text-neutral-800 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400" size={20} />
              </div>
            </div>

            {/* Category Tabs */}
            <div className="flex flex-wrap gap-2 mb-8">
              {categories.map((category) => (
                <button
                  key={category.id}
                  className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeCategory === category.id
                      ? 'bg-primary-500 text-white'
                      : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                  }`}
                  onClick={() => setActiveCategory(category.id)}
                >
                  <span className="mr-1.5">{category.icon}</span>
                  {category.label}
                </button>
              ))}
            </div>

            {/* FAQ List */}
            <div className="space-y-4">
              {filteredFaqs.length > 0 ? (
                filteredFaqs.map((faq) => (
                  <motion.div
                    key={faq.id}
                    className="border border-neutral-200 rounded-lg overflow-hidden"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <button
                      className="flex justify-between items-center w-full px-6 py-4 text-left bg-white hover:bg-neutral-50 transition-colors"
                      onClick={() => toggleFaq(faq.id)}
                    >
                      <span className="font-medium text-neutral-800">{faq.question}</span>
                      {expandedFaqs.includes(faq.id) ? (
                        <ChevronUp size={20} className="text-neutral-500" />
                      ) : (
                        <ChevronDown size={20} className="text-neutral-500" />
                      )}
                    </button>
                    {expandedFaqs.includes(faq.id) && (
                      <div className="px-6 py-4 bg-neutral-50 border-t border-neutral-200">
                        <p className="text-neutral-600">{faq.answer}</p>
                      </div>
                    )}
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-12 bg-neutral-50 rounded-lg">
                  <HelpCircle size={48} className="mx-auto text-neutral-300 mb-4" />
                  <h3 className="text-xl font-display font-semibold mb-2 text-neutral-700">
                    {t('HelpPage.noResult.title')}
                  </h3>
                  <p className="text-neutral-500 mb-6">
                    {t('HelpPage.noResult.description')}
                  </p>
                  <button className="bg-primary-500 hover:bg-primary-600 text-white py-2 px-6 rounded-full text-sm font-medium transition-colors">
                    {t('HelpPage.contactSupport')}
                  </button>
                </div>
              )}
            </div>

            {/* Contact Support */}
            <div className="mt-16 bg-neutral-50 rounded-xl p-8 border border-neutral-200">
              <h3 className="text-xl font-display font-semibold mb-4 text-neutral-800 text-center">
                {t('HelpPage.contactSupportTitle')}
              </h3>
              <p className="text-neutral-600 text-center mb-6">
                {t('HelpPage.contactSupportDescription')}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <a
                  href="mailto:support@heytcm.com"
                  className="flex items-center justify-center bg-white border border-neutral-200 rounded-lg py-3 px-4 hover:shadow-sm transition-shadow"
                >
                  <svg className="w-5 h-5 text-neutral-700 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-neutral-700 font-medium">support@heytcm.com</span>
                </a>
                <button
                  className="flex items-center justify-center bg-primary-500 hover:bg-primary-600 text-white rounded-lg py-3 px-4 transition-colors"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <span className="font-medium">{t('HelpPage.onlineSupport')}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HelpPage;