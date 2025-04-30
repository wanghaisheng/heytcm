import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import PageBanner from '../components/shared/PageBanner';
import LdJson from '../components/LdJson';
import SeoHeaders, { SeoHeaderProps } from '../components/SeoHeaders';
import { Share, Heart, MessageSquare, UserCheck, Code, Database, Glasses as MagnifyingGlass } from 'lucide-react';

export const header: SeoHeaderProps = {
  title: '支持与合作 | HeyTCM',
  description: '加入 HeyTCM，共同推动中医智能化发展，欢迎合作与支持。',
  keywords: '中医, 合作, 支持, 志愿者',
  og: {
    title: '支持与合作 | HeyTCM',
    description: '加入 HeyTCM，共同推动中医智能化发展，欢迎合作与支持。',
    image: 'https://heytcm.com/og-image.jpg',
    site_name: 'HeyTCM'
  },
  canonical: 'https://heytcm.com/support',
  alternate: [
    { href: 'https://heytcm.com/support', hreflang: 'x-default' },
    { href: 'https://heytcm.com/zh/support', hreflang: 'zh' },
    { href: 'https://heytcm.com/en/support', hreflang: 'en' }
  ]
};

const SupportPage = () => {
  // Set page title
  useEffect(() => {
    document.title = 'HeyTCM - 支持我们';
  }, []);

  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const [supportRef, supportInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const plans = [
    {
      id: 'free',
      name: '随喜版',
      price: '自定义',
      features: [
        '基础工具使用权（广告版）',
        '社区只读权限',
        '公共研究数据访问',
      ],
      highlight: false,
    },
    {
      id: 'basic',
      name: '基础版',
      price: '¥299',
      features: [
        '智能终端使用权（1年）',
        '工具会员（1年）',
        '灵石 300 赠送',
        '报告兑换权（1次）',
        '数据共享徽章',
      ],
      highlight: false,
    },
    {
      id: 'couple',
      name: '情侣版',
      price: '¥699',
      features: [
        '智能终端使用权（2套）',
        '工具会员（1年）',
        '灵石 800 赠送',
        '报告兑换权（8次）',
        '数据共享徽章',
        '私人顾问服务（2次）',
      ],
      highlight: true,
    },
    {
      id: 'family',
      name: '家庭版',
      price: '¥999',
      features: [
        '智能终端使用权（3套）',
        '工具会员（1年）',
        '灵石 1200 赠送',
        '报告兑换权（12次）',
        '数据共享徽章',
        '私人顾问服务（3次）',
        '荣誉墙展示',
      ],
      highlight: false,
    },
    {
      id: 'ultimate',
      name: '至尊版',
      price: '¥2999',
      features: [
        '智能终端使用权（5套）',
        '工具会员（终身）',
        '灵石 5000 赠送',
        '报告兑换权（10）',
        '数据共享徽章（特殊版）',
        '私人顾问服务（无限）',
        '荣誉墙展示（突出位置）',
        '产品方向投票权',
        '早期测试资格',
      ],
      highlight: false,
    },
  ];

  const otherWays = [
    {
      icon: <Share />,
      title: '传播分享',
      description: '将 HeyTCM 推荐给朋友，分享您的使用心得，扩大社区影响力。',
    },
    {
      icon: <Heart />,
      title: '使用游戏 (点广告)',
      description: '玩中医游戏时观看广告，每次都能为项目贡献小额资金。',
    },
    {
      icon: <MessageSquare />,
      title: '参与社区讨论/维护',
      description: '回答问题，参与讨论，维护社区氛围，帮助新用户。',
    },
    {
      icon: <Code />,
      title: '参与开源开发',
      description: '贡献代码，修复bug，开发新功能，提高产品质量。',
    },
    {
      icon: <Database />,
      title: '贡献健康数据',
      description: '安全匿名地分享您的健康数据，帮助研究与算法优化。',
    },
    {
      icon: <MagnifyingGlass />,
      title: '参与研究项目',
      description: '作为志愿者参与各类研究实验，验证产品疗效。',
    },
  ];

  const ldJsonData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "支持与合作 | HeyTCM",
    "description": "加入 HeyTCM，共同推动中医智能化发展，欢迎合作与支持。",
    "url": "https://heytcm.com/support"
  };

  return (
    <div className="pt-16">
      <SeoHeaders header={header} />
      <PageBanner 
        title="支持 HeyTCM，共筑中医智能化未来" 
        image="https://images.pexels.com/photos/8942582/pexels-photo-8942582.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      />

      <LdJson data={ldJsonData} />

      <section ref={supportRef} className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-3xl mx-auto text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={supportInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <p className="text-lg text-neutral-700 italic mb-6">
              "为往圣继绝学"的道路充满挑战，需要持续的数据积累与资金投入。这不是纯粹的慈善，而是需要您共同参与的价值探索。您的每一份支持，都是点亮中医未来的光芒。
            </p>
            <div className="w-16 h-1 bg-primary-500 mx-auto"></div>
          </motion.div>

          <motion.h2 
            className="text-3xl md:text-4xl font-display font-bold text-center mb-12 text-neutral-800"
            initial={{ opacity: 0, y: 30 }}
            animate={supportInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            成为核心共创者
          </motion.h2>

          {/* Pricing Plans */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-16">
            {plans.map((plan, index) => (
              <motion.div 
                key={plan.id}
                className={`rounded-xl border ${
                  selectedPlan === plan.id 
                    ? 'border-primary-500 ring-2 ring-primary-200' 
                    : plan.highlight 
                      ? 'border-secondary-300 bg-secondary-50'
                      : 'border-neutral-200 bg-white'
                } p-6 flex flex-col relative`}
                initial={{ opacity: 0, y: 30 }}
                animate={supportInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                onClick={() => setSelectedPlan(plan.id)}
              >
                {plan.highlight && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-secondary-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    热门选择
                  </div>
                )}
                <div className="mb-4">
                  <h3 className="text-lg font-display font-semibold text-neutral-800">
                    {plan.name}
                  </h3>
                  <div className="mt-2">
                    <span className="text-2xl font-bold text-neutral-900">{plan.price}</span>
                    {plan.id !== 'free' && <span className="text-neutral-500 text-sm">/一次性</span>}
                  </div>
                </div>
                <ul className="space-y-3 mb-6 flex-grow">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm text-neutral-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button 
                  className={`w-full py-2 px-4 rounded-full text-sm font-medium transition-colors ${
                    selectedPlan === plan.id 
                      ? 'bg-primary-500 text-white' 
                      : plan.highlight 
                        ? 'bg-secondary-500 text-white hover:bg-secondary-600'
                        : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                  }`}
                >
                  {selectedPlan === plan.id ? '已选择' : '选择此方案'}
                </button>
              </motion.div>
            ))}
          </div>

          {/* Selected Plan Action */}
          {selectedPlan && (
            <motion.div 
              className="max-w-xl mx-auto bg-neutral-50 rounded-xl p-6 mb-16 text-center"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <h3 className="text-xl font-display font-semibold mb-4 text-neutral-800">
                您已选择: {plans.find(p => p.id === selectedPlan)?.name}
              </h3>
              <p className="text-neutral-600 mb-6">
                感谢您对 HeyTCM 的支持！点击下方按钮完成支付，开始您的中医智能化探索之旅。
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <button className="bg-primary-500 hover:bg-primary-600 text-white py-3 px-8 rounded-full text-sm font-medium transition-colors">
                  立即支持
                </button>
                <button 
                  className="bg-white border border-neutral-300 text-neutral-700 hover:bg-neutral-100 py-3 px-8 rounded-full text-sm font-medium transition-colors"
                  onClick={() => setSelectedPlan(null)}
                >
                  重新选择
                </button>
              </div>
            </motion.div>
          )}

          {/* Other Ways to Support */}
          <motion.div 
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0 }}
            animate={supportInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <h2 className="text-2xl md:text-3xl font-display font-bold text-center mb-12 text-neutral-800">
              贡献您的力量 (非资金形式)
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherWays.map((way, index) => (
                <motion.div 
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
                  initial={{ opacity: 0, y: 20 }}
                  animate={supportInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                >
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4 text-primary-600">
                    {way.icon}
                  </div>
                  <h3 className="text-lg font-display font-semibold mb-2 text-neutral-800">
                    {way.title}
                  </h3>
                  <p className="text-neutral-600 text-sm">
                    {way.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Volunteer Section */}
      <section className="py-16 bg-neutral-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 text-neutral-800">
                寻找同路人
              </h2>
              <p className="text-lg text-neutral-600">
                我们需要技术、内容、运营、医学等各领域的人才加入，共同构建智能中医的美好未来。
              </p>
            </div>

            <div className="bg-white rounded-xl overflow-hidden shadow-sm">
              <div className="p-8 md:p-10">
                <div className="flex items-center mb-6">
                  <UserCheck className="w-8 h-8 text-primary-500 mr-3" />
                  <h3 className="text-xl font-display font-semibold text-neutral-800">
                    志愿者招募
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <h4 className="text-lg font-medium mb-3 text-neutral-700">我们在寻找</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center text-neutral-600">
                        <span className="w-2 h-2 rounded-full bg-primary-500 mr-2"></span>
                        中医专业顾问
                      </li>
                      <li className="flex items-center text-neutral-600">
                        <span className="w-2 h-2 rounded-full bg-primary-500 mr-2"></span>
                        AI/机器学习工程师
                      </li>
                      <li className="flex items-center text-neutral-600">
                        <span className="w-2 h-2 rounded-full bg-primary-500 mr-2"></span>
                        内容创作者/科普写手
                      </li>
                      <li className="flex items-center text-neutral-600">
                        <span className="w-2 h-2 rounded-full bg-primary-500 mr-2"></span>
                        社区运营
                      </li>
                      <li className="flex items-center text-neutral-600">
                        <span className="w-2 h-2 rounded-full bg-primary-500 mr-2"></span>
                        UI/UX 设计师
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg font-medium mb-3 text-neutral-700">志愿者福利</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center text-neutral-600">
                        <span className="w-2 h-2 rounded-full bg-secondary-500 mr-2"></span>
                        免费产品使用权
                      </li>
                      <li className="flex items-center text-neutral-600">
                        <span className="w-2 h-2 rounded-full bg-secondary-500 mr-2"></span>
                        优先参与新产品测试
                      </li>
                      <li className="flex items-center text-neutral-600">
                        <span className="w-2 h-2 rounded-full bg-secondary-500 mr-2"></span>
                        技能提升培训机会
                      </li>
                      <li className="flex items-center text-neutral-600">
                        <span className="w-2 h-2 rounded-full bg-secondary-500 mr-2"></span>
                        志愿者专属徽章
                      </li>
                      <li className="flex items-center text-neutral-600">
                        <span className="w-2 h-2 rounded-full bg-secondary-500 mr-2"></span>
                        潜在的全职机会
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="text-center">
                  <button className="bg-primary-500 hover:bg-primary-600 text-white py-3 px-8 rounded-full text-sm font-medium transition-colors">
                    查看开放职位/申请加入
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 text-neutral-800">
                支持者心声
              </h2>
              <p className="text-lg text-neutral-600">
                听听已经成为 HeyTCM 支持者的朋友们怎么说
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-neutral-50 rounded-xl p-6 border border-neutral-200">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                    <img 
                      src="https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                      alt="李医生" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-neutral-800">李医生</h3>
                    <p className="text-sm text-neutral-500">中医师，基础版支持者</p>
                  </div>
                </div>
                <p className="text-neutral-600 italic">
                  "作为一名中医师，我很高兴看到有人尝试用现代科技来量化中医理论。HeyTCM 的数据可视化帮助我的患者更好地理解气血变化，增强了治疗依从性。"
                </p>
              </div>

              <div className="bg-neutral-50 rounded-xl p-6 border border-neutral-200">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                    <img 
                      src="https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                      alt="王女士" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-neutral-800">王女士</h3>
                    <p className="text-sm text-neutral-500">软件工程师，家庭版支持者</p>
                  </div>
                </div>
                <p className="text-neutral-600 italic">
                  "我全家人都在使用 HeyTCM 的产品。作为工程师，我很欣赏其开源理念。我的父母以前对健康管理不太上心，现在通过游戏化的方式，他们对传统养生知识产生了浓厚兴趣。"
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SupportPage;