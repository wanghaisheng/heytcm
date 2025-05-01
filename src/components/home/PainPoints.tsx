import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Battery, Moon, Settings as Lungs, Merge as Allergen, BrainCircuit } from 'lucide-react';
import { PAIN_POINTS_LIST } from './painPointsData';

// 组件本地类型定义，便于类型安全和 IDE 智能提示
export type PainPointType = 'battery' | 'sleep' | 'digest' | 'skin' | 'emotion';
export interface PainPointDataItem {
  key: string;
  type: PainPointType;
  text: string;
}
export interface PainPointsProps {
  list?: PainPointDataItem[];
  sectionTitle?: string;
  sectionBottom?: string;
}

const DEFAULT_TITLE = '感觉身体"不对劲"，却说不清、查不出？';
const DEFAULT_BOTTOM = 'HeyTCM 正在用数据"翻译"身体的语言...';

const PainPoints: React.FC<PainPointsProps> = ({ list, sectionTitle, sectionBottom }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const painPoints = list && list.length > 0 ? list : PAIN_POINTS_LIST;


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
          {sectionTitle || DEFAULT_TITLE}
        </motion.h2>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {painPoints.map((point, index) => (
            <motion.div 
              key={index}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow flex items-center gap-4"
              variants={itemVariants}
            >
              <div className="flex-shrink-0">
                {point.type === 'battery' && <Battery className="w-10 h-10 text-primary-500" />}
                {point.type === 'sleep' && <Moon className="w-10 h-10 text-primary-500" />}
                {point.type === 'digest' && <Lungs className="w-10 h-10 text-primary-500" />}
                {point.type === 'skin' && <Allergen className="w-10 h-10 text-primary-500" />}
                {point.type === 'emotion' && <BrainCircuit className="w-10 h-10 text-primary-500" />}
              </div>
              <p className="text-lg text-neutral-700">{point.text}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.p 
          className="mt-10 text-center text-neutral-500"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          {sectionBottom || DEFAULT_BOTTOM}
        </motion.p>
      </div>
    </section>
  );
};

export default PainPoints;