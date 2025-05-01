import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { CalendarDays, Users, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

// 首页新闻类型定义，便于类型安全传值
export type NewsType = 'event' | 'community' | 'research';
export interface NewsItem {
  type: NewsType;
  icon: React.ReactNode;
  title: string;
  description: string;
  date: string;
  link: string;
}

// 页面内容变量
export interface NewsSectionProps {
  sectionTitle?: string;
  sectionDesc?: string;
  list?: any[];
  detailText?: string;
}

const NEWS_SECTION_TITLE = '社区脉动 & 最新发布';
const NEWS_SECTION_SUBTITLE = '探索 HeyTCM 生态系统的最新动态、研究成果和社区活动';
const NEWS_SECTION_CARD_BTN = '查看详情';
const NEWS_SECTION_MORE_BTN = '查看更多动态';

import { NEWS_LIST } from './newsData';

const NewsSection: React.FC<NewsSectionProps> = ({
  sectionTitle,
  sectionDesc,
  list,
  detailText
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const news = list && list.length > 0 ? list : NEWS_LIST;

  const typeColors = {
    event: 'bg-secondary-100 text-secondary-600',
    community: 'bg-primary-100 text-primary-600',
    research: 'bg-accent-100 text-accent-600',
  };

  return (
    <section 
      ref={ref}
      className="py-20 bg-neutral-50"
    >
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-neutral-800">{sectionTitle || NEWS_SECTION_TITLE}</h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            {sectionDesc || NEWS_SECTION_SUBTITLE}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {news.map((item, index) => (
            <motion.div 
              key={index} 
              className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <span className={`text-xs px-2 py-1 rounded-full inline-flex items-center gap-1 ${typeColors[item.type as keyof typeof typeColors]}`}>
                    {item.type === 'event' && <CalendarDays className="w-5 h-5" />}
                    {item.type === 'community' && <Users className="w-5 h-5" />}
                    {item.type === 'research' && <FileText className="w-5 h-5" />}
                    <span>{item.type === 'event' ? '活动' : item.type === 'community' ? '社区' : '研究'}</span>
                  </span>
                  <span className="text-sm text-neutral-500">{item.date}</span>
                </div>
                <h3 className="text-xl font-display font-semibold mb-3 text-neutral-800">{item.title}</h3>
                <p className="text-neutral-600 mb-4">{item.description}</p>
                <Link 
                  to={item.link} 
                  className="text-primary-600 hover:text-primary-700 font-medium inline-flex items-center"
                >
                  {NEWS_SECTION_CARD_BTN}
                  <svg className="w-4 h-4 ml-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="text-center mt-10"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Link 
            to="/resources" 
            className="inline-flex items-center justify-center bg-white border border-neutral-200 text-neutral-800 hover:bg-neutral-50 py-3 px-6 rounded-full font-medium transition-colors"
          >
            {NEWS_SECTION_MORE_BTN}
            <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default NewsSection;