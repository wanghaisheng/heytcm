import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import PageBanner from '../components/shared/PageBanner';
import SeoHeaders, { SeoHeaderProps } from '../components/SeoHeaders';

const tabKeys = [
  'data',
  'tech',
  'community',
  'financial'
] as const;

const LeaderboardPage = () => {
  const { t } = useTranslation();
  const [tab, setTab] = useState<typeof tabKeys[number]>("data");
  const [time, setTime] = useState('all');

  const stats = t('LeaderboardPage.stats', { returnObjects: true }) as Array<{number: string, label: string}>;
  const timeFilters = t('LeaderboardPage.timeFilters', { returnObjects: true }) as Array<{key: string, label: string}>;
  const tabLabels = t('LeaderboardPage.tabs', { returnObjects: true }) as Record<typeof tabKeys[number], string>;
  const tabIcons = {
    data: 'fas fa-database',
    tech: 'fas fa-code',
    community: 'fas fa-users',
    financial: 'fas fa-hand-holding-usd'
  };
  const leaderboard = t(`LeaderboardPage.leaderboard.${tab}`, { returnObjects: true }) as Array<any>;
  const wall = t('LeaderboardPage.wall', { returnObjects: true }) as Array<any>;
  const mapLegend = t('LeaderboardPage.map.legend', { returnObjects: true }) as Array<{color: string, label: string}>;

  const header: SeoHeaderProps = {
    title: t('LeaderboardPage.seo.title'),
    description: t('LeaderboardPage.seo.description'),
    keywords: t('LeaderboardPage.seo.keywords'),
    og: {
      title: t('LeaderboardPage.seo.og.title'),
      description: t('LeaderboardPage.seo.og.description'),
      image: t('LeaderboardPage.seo.og.image'),
      site_name: t('LeaderboardPage.seo.og.site_name')
    },
    canonical: t('LeaderboardPage.seo.canonical'),
    alternate: [
      { href: t('LeaderboardPage.seo.alternate.x-default'), hreflang: 'x-default' },
      { href: t('LeaderboardPage.seo.alternate.zh'), hreflang: 'zh' },
      { href: t('LeaderboardPage.seo.alternate.en'), hreflang: 'en' }
    ]
  };
  return (
    <div className="pt-16">
      <SeoHeaders header={header} />
      <PageBanner title={t('LeaderboardPage.banner.title')} image={t('LeaderboardPage.banner.image')} />
      <main className="container mx-auto px-4 py-16">
      <section className="bg-white dark:bg-dark-card rounded-xl shadow-sm p-8 mb-12">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold mb-2 font-serif">{t('LeaderboardPage.title')}</h2>
          <p className="text-gray-600 dark:text-gray-400">{t('LeaderboardPage.subtitle')}</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {stats.map((s, i) => (
            <div className="bg-primary-50 rounded-lg p-4 text-center" key={i}>
              <div className="text-2xl font-bold text-primary-600 mb-1">{s.number}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">{s.label}</div>
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-2 mb-6">
          {timeFilters.map(f => (
            <button
              key={f.key}
              className={`px-4 py-1 rounded-full border transition-colors text-sm ${time === f.key ? 'bg-primary-600 text-white border-primary-600' : 'bg-white dark:bg-dark-card border-gray-200 dark:border-neutral-700 text-gray-700 dark:text-gray-300'}`}
              onClick={() => setTime(f.key)}
            >
              {f.label}
            </button>
          ))}
        </div>
        <div className="flex justify-center gap-4 mb-8">
          {tabKeys.map(key => (
            <button
              key={key}
              className={`flex items-center gap-2 px-5 py-2 rounded-full font-medium transition-colors text-base ${tab === key ? 'bg-primary-100 text-primary-700' : 'bg-gray-100 dark:bg-dark-card text-gray-700 dark:text-gray-300'}`}
              data-tab={key}
              onClick={() => setTab(key)}
            >
              <i className={tabIcons[key]}></i>{tabLabels[key]}
            </button>
          ))}
        </div>
        <div className="contribution-list">
          <h3 className="text-lg font-semibold mb-2">{tabLabels[tab]}</h3>
          <p className="text-gray-500 mb-4">{t(`LeaderboardPage.intro.${tab}`)}</p>
          <ul className="space-y-4">
            {leaderboard.map((item, idx) => (
              <li className="flex items-center gap-4 bg-gray-50 dark:bg-dark-card rounded-lg p-4" key={idx}>
                <div className="w-12 h-12 rounded-full bg-gray-200 bg-cover bg-center" style={{backgroundImage: `url(${item.avatar})`}}></div>
                <div className="flex-1">
                  <h4 className="font-medium text-base flex items-center gap-2">{item.name}{item.badge && <span className={`ml-2 px-2 py-0.5 rounded-full text-xs font-semibold badge badge-${item.badge}`}>{t(`LeaderboardPage.badge.${item.badge}`)}</span>}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="font-bold text-primary-600">{item.score}</span>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="bg-primary-400 h-2" style={{width: item.percent}}></div>
                    </div>
                  </div>
                  <div className="mt-1">
                    {item.tags && item.tags.map((tag, i) => <span className="inline-block bg-primary-50 text-primary-700 px-2 py-0.5 rounded mr-1 text-xs" key={i}>{tag}</span>)}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-16 mb-8 text-center">
          <h2 className="text-2xl font-bold mb-2 font-serif">{t('LeaderboardPage.wall.title')}</h2>
          <p className="text-gray-600 dark:text-gray-400">{t('LeaderboardPage.wall.subtitle')}</p>
        </div>
        <section id="wall-of-faces" className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {wall.map((item, idx) => (
            <div className="flex flex-col items-center bg-white dark:bg-dark-card rounded-xl p-4 shadow-sm" key={idx}>
              <div className="w-16 h-16 rounded-full bg-gray-200 bg-cover bg-center mb-2" style={{backgroundImage: `url(${item.avatar})`}}></div>
              <div className="font-medium text-base mb-1">{item.name}</div>
              <div className="text-xs text-gray-500 text-center">{item.desc}</div>
            </div>
          ))}
        </section>
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold mb-2 font-serif">{t('LeaderboardPage.map.title')}</h2>
          <p className="text-gray-600 dark:text-gray-400">{t('LeaderboardPage.map.subtitle')}</p>
        </div>
        <section id="contribution-map" className="flex flex-col md:flex-row gap-8 items-start">
          <div id="china-map" className="flex-1 rounded-lg" style={{height: 400, background: '#f5f5f5'}}></div>
          <div className="flex flex-col gap-2">
            {mapLegend.map((item, idx) => (
              <div className="flex items-center gap-2" key={idx}>
                <div className="w-4 h-4 rounded bg-primary-400" style={{background: item.color}}></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">{item.label}</span>
              </div>
            ))}
          </div>
        </section>
      </section>
    </main>
        </div>

  );
};

export default LeaderboardPage;