import { NewsType } from './NewsSection';

// 只负责数据，不负责样式
export interface NewsDataItem {
  type: NewsType;
  title: string;
  description: string;
  date: string;
  link: string;
}

export const NEWS_LIST: NewsDataItem[] = [
  {
    type: 'event',
    title: '2025 HeyTCM 年度用户大会',
    description: '7月20日，共同探讨未来发展方向，分享使用体验与健康故事。',
    date: '2025-07-20',
    link: '#',
  },
  {
    type: 'community',
    title: '辟谷社区突破10,000名成员',
    description: '感谢每一位用户的贡献，让我们一同推动中医科学化发展。',
    date: '2025-05-15',
    link: '#',
  },
  {
    type: 'research',
    title: 'HeyTCM 研究成果发表于权威期刊',
    description: 'AI+中医科研成果获认可，相关论文已公开发表。',
    date: '2025-04-10',
    link: '#',
  },
];
