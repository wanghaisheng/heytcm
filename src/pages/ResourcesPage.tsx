import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import PageBanner from '../components/shared/PageBanner';
import LdJson from '../components/LdJson';
import SeoHeaders, { SeoHeaderProps } from '../components/SeoHeaders';
import { FileText, Download, BookOpen, FileSpreadsheet } from 'lucide-react';
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

const ResourcesPage = () => {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = t('ResourcesPage.head.title');
  }, [t]);

  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', label: t('ResourcesPage.categories.0.label') },
    { id: 'whitepapers', label: t('ResourcesPage.categories.1.label'), icon: <FileText size={16} /> },
    { id: 'guides', label: t('ResourcesPage.categories.2.label'), icon: <BookOpen size={16} /> },
    { id: 'literature', label: t('ResourcesPage.categories.3.label'), icon: <FileText size={16} /> },
    { id: 'templates', label: t('ResourcesPage.categories.4.label'), icon: <FileSpreadsheet size={16} /> },
  ];

  // const resources = [
  //   {
  //     id: 1,
  //     title: t('ResourcesPage.resources.0.title'),
  //     description: t('ResourcesPage.resources.0.description'),
  //     category: 'whitepapers',
  //     downloadLink: '#',
  //     thumbnailUrl: t('ResourcesPage.resources.0.thumbnailUrl'),
  //     date: t('ResourcesPage.resources.0.date'),
  //   },
  //   {
  //     id: 2,
  //     title: t('ResourcesPage.resources.1.title'),
  //     description: t('ResourcesPage.resources.1.description'),
  //     category: 'whitepapers',
  //     downloadLink: '#',
  //     thumbnailUrl: t('ResourcesPage.resources.1.thumbnailUrl'),
  //     date: t('ResourcesPage.resources.1.date'),
  //   },
  //   {
  //     id: 3,
  //     title: t('ResourcesPage.resources.2.title'),
  //     description: t('ResourcesPage.resources.2.description'),
  //     category: 'guides',
  //     downloadLink: '#',
  //     thumbnailUrl: t('ResourcesPage.resources.2.thumbnailUrl'),
  //     date: t('ResourcesPage.resources.2.date'),
  //   },
  //   {
  //     id: 4,
  //     title: t('ResourcesPage.resources.3.title'),
  //     description: t('ResourcesPage.resources.3.description'),
  //     category: 'templates',
  //     downloadLink: '#',
  //     thumbnailUrl: t('ResourcesPage.resources.3.thumbnailUrl'),
  //     date: t('ResourcesPage.resources.3.date'),
  //   },
  //   {
  //     id: 5,
  //     title: t('ResourcesPage.resources.4.title'),
  //     description: t('ResourcesPage.resources.4.description'),
  //     category: 'literature',
  //     downloadLink: '#',
  //     thumbnailUrl: t('ResourcesPage.resources.4.thumbnailUrl'),
  //     date: t('ResourcesPage.resources.4.date'),
  //   },
  //   {
  //     id: 6,
  //     title: t('ResourcesPage.resources.5.title'),
  //     description: t('ResourcesPage.resources.5.description'),
  //     category: 'templates',
  //     downloadLink: '#',
  //     thumbnailUrl: t('ResourcesPage.resources.5.thumbnailUrl'),
  //     date: t('ResourcesPage.resources.5.date'),
  //   },
  // ];
  //
  // 数据驱动资源
  const resources = t('ResourcesPage.resources', { returnObjects: true }) as Array<{
    id: number;
    title: string;
    description: string;
    category: string;
    downloadLink: string;
    thumbnailUrl: string;
    date: string;
  }>;

  const filteredResources = activeCategory === 'all' 
    ? resources 
    : resources.filter(resource => resource.category === activeCategory);

  const ldJsonData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": t('ResourcesPage.ldjson.name'),
    "description": t('ResourcesPage.ldjson.description'),
    "url": t('ResourcesPage.ldjson.url')
  };

  const header: SeoHeaderProps = {
    title: t('ResourcesPage.seo.title'),
    description: t('ResourcesPage.seo.description'),
    keywords: t('ResourcesPage.seo.keywords'),
    og: {
      title: t('ResourcesPage.seo.og.title'),
      description: t('ResourcesPage.seo.og.description'),
      image: 'https://heytcm.com/og-image.jpg',
      site_name: t('ResourcesPage.seo.og.site_name')
    },
    canonical: t('ResourcesPage.seo.canonical'),
    alternate: [
      { href: t('ResourcesPage.seo.alternate.x-default'), hreflang: 'x-default' },
      { href: t('ResourcesPage.seo.alternate.zh'), hreflang: 'zh' },
      { href: t('ResourcesPage.seo.alternate.en'), hreflang: 'en' }
    ]
  };

  return (
    <div className="pt-16">
      <SeoHeaders header={header} />
      <PageBanner 
        title={t('ResourcesPage.banner.title')}
        image={t('ResourcesPage.banner.image')}
      />

      <LdJson data={ldJsonData} />

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="mb-10">
              <p className="text-lg text-neutral-600 max-w-3xl mx-auto text-center mb-8">
                {t('ResourcesPage.description')}
              </p>

              {/* Category Filter */}
              <div className="flex flex-wrap justify-center gap-3 mb-10">
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
                    {category.icon && <span className="mr-1.5">{category.icon}</span>}
                    {t(`ResourcesPage.categories.${categories.indexOf(category)}.label`)}
                  </button>
                ))}
              </div>

              {/* Resources Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredResources.map((resource) => (
                  <motion.div
                    key={resource.id}
                    className="bg-white rounded-xl overflow-hidden shadow-sm border border-neutral-200 hover:shadow-md transition-shadow"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="h-40 overflow-hidden">
                      <img
                        src={resource.thumbnailUrl}
                        alt={resource.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-5">
                      <div className="flex justify-between items-center mb-3">
                        <span className="inline-block px-2.5 py-1 bg-neutral-100 text-neutral-700 rounded-full text-xs font-medium">
                          {categories.find(cat => cat.id === resource.category)?.label}
                        </span>
                        <span className="text-xs text-neutral-500">{resource.date}</span>
                      </div>
                      <h3 className="text-lg font-display font-semibold mb-2 text-neutral-800">
                        {resource.title}
                      </h3>
                      <p className="text-neutral-600 text-sm mb-4 line-clamp-2">
                        {resource.description}
                      </p>
                      <a
                        href={resource.downloadLink}
                        className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium text-sm"
                      >
                        <Download size={16} className="mr-1" />
                        {t('ResourcesPage.download')}
                      </a>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Empty State */}
              {filteredResources.length === 0 && (
                <div className="text-center py-12">
                  <FileText size={48} className="mx-auto text-neutral-300 mb-4" />
                  <h3 className="text-xl font-display font-semibold mb-2 text-neutral-700">
                    {t('ResourcesPage.empty.title')}
                  </h3>
                  <p className="text-neutral-500">
                    {t('ResourcesPage.empty.description')}
                  </p>
                </div>
              )}
            </div>

            {/* Request Resources */}
            <div className="max-w-3xl mx-auto bg-neutral-50 rounded-xl p-8 border border-neutral-200">
              <h3 className="text-xl font-display font-semibold mb-4 text-neutral-800 text-center">
                {t('ResourcesPage.request.title')}
              </h3>
              <p className="text-neutral-600 text-center mb-6">
                {t('ResourcesPage.request.description')}
              </p>
              <div className="flex justify-center">
                <button className="bg-primary-500 hover:bg-primary-600 text-white py-2 px-6 rounded-full text-sm font-medium transition-colors">
                  {t('ResourcesPage.request.button')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ResourcesPage;