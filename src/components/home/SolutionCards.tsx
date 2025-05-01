import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Fingerprint, 
  Smartphone, 
  Gamepad2, 
  Share2
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const SolutionCards = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const solutions = [
    {
      icon: <Fingerprint className="w-12 h-12 text-primary-500" />,
      title: '智能感知',
      description: '戒指 24h 监测，量化气血、睡眠、五脏状态。',
      link: '/products#ring',
      linkText: '了解智能硬件',
      color: 'bg-primary-50',
      delay: 0,
    },
    {
      icon: <Smartphone className="w-12 h-12 text-secondary-500" />,
      title: '个性管理',
      description: 'App 工具追踪症状、管理五行、评估疗效。',
      link: '/products#app',
      linkText: '探索工具应用',
      color: 'bg-secondary-50',
      delay: 0.2,
    },
    {
      icon: <Gamepad2 className="w-12 h-12 text-accent-500" />,
      title: '趣味成长',
      description: '在游戏中学习中医，养成健康习惯。',
      link: '/products#games',
      linkText: '体验中医游戏',
      color: 'bg-accent-50',
      delay: 0.4,
    },
    {
      icon: <Share2 className="w-12 h-12 text-green-600" />,
      title: '开放共创',
      description: '共享数据，参与研究，共建中医未来。',
      link: '/ecosystem',
      linkText: '访问开放生态',
      color: 'bg-green-50',
      delay: 0.6,
    },
  ];

  return (
    <section 
      ref={ref}
      className="py-20 bg-white"
    >
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-3xl md:text-4xl font-display font-bold text-center mb-4 text-neutral-800"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          用数据看见"气血"，用智能管理健康
        </motion.h2>

        <motion.p 
          className="text-lg text-center text-neutral-600 max-w-3xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          中医智慧与现代科技的完美结合，为您提供专业、个性化的健康管理方案
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {solutions.map((solution, index) => (
            <motion.div 
              key={index}
              className={`rounded-xl p-6 ${solution.color} hover:shadow-md transition-all h-full flex flex-col`}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: solution.delay }}
            >
              <div className="mb-4">{solution.icon}</div>
              <h3 className="text-xl font-display font-semibold mb-3 text-neutral-800">{solution.title}</h3>
              <p className="text-neutral-600 mb-4 flex-grow">{solution.description}</p>
              <Link 
                to={solution.link} 
                className="text-primary-600 hover:text-primary-700 font-medium inline-flex items-center"
              >
                {solution.linkText}
                <svg className="w-4 h-4 ml-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SolutionCards;