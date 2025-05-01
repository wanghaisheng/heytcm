import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Battery, Moon, Settings as Lungs, Merge as Allergen, BrainCircuit } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const PainPoints = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const painPoints = [
    {
      icon: <Battery className="w-10 h-10 text-primary-500" />,
      text: '莫名疲惫，精力不济？',
    },
    {
      icon: <Moon className="w-10 h-10 text-primary-500" />,
      text: '辗转难眠，越睡越累？（我曾失眠20余年）',
    },
    {
      icon: <Lungs className="w-10 h-10 text-primary-500" />,
      text: '肠胃敏感，饮食处处小心？',
    },
    {
      icon: <Allergen className="w-10 h-10 text-primary-500" />,
      text: '皮肤问题反复，痘痘、疹子不断？（我曾战痘十年、荨麻疹四年）',
    },
    {
      icon: <BrainCircuit className="w-10 h-10 text-primary-500" />,
      text: '情绪波动，焦虑不安？',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section 
      ref={ref}
      className="py-20 bg-neutral-50"
    >
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-3xl md:text-4xl font-display font-bold text-center mb-12 text-neutral-800"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {t('HomePage.painPointsDesc')}
        </motion.h2>

        <motion.ul 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {painPoints.map((point, idx) => {
            const Icon = icons[idx] || Battery;
            return (
              <motion.li 
                key={idx}
                className="flex flex-col items-center text-center"
                variants={itemVariants}
              >
                <Icon className="w-10 h-10 text-primary-500" />
                <span className="mt-4 text-lg text-neutral-700">{point.text}</span>
              </motion.li>
            );
          })}
        </motion.ul>

        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <p className="text-center text-neutral-500 text-base mt-4">
            {t('HomePage.painPointsBottom')}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default PainPoints;