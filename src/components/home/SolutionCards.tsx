import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Fingerprint, 
  Smartphone, 
  Gamepad2, 
  Share2,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { SOLUTION_CARDS_DATA } from './solutionCardsData';

export type SolutionCardType = 'hardware' | 'app' | 'game' | 'ecosystem';

export interface SolutionCardDataItem {
  key: string;
  type: SolutionCardType;
  title: string;
  description: string;
  link: string;
  linkText: string;
}

export interface SolutionCardsStatic {
  sectionTitle: string;
  sectionDesc: string;
  list: SolutionCardDataItem[];
}


const ICONS: Record<SolutionCardType, React.ReactNode> = {
  hardware: <Fingerprint className="w-12 h-12 text-primary-500" />,
  app: <Smartphone className="w-12 h-12 text-secondary-500" />,
  game: <Gamepad2 className="w-12 h-12 text-accent-500" />,
  ecosystem: <Share2 className="w-12 h-12 text-green-600" />,
};
const BG_COLORS: Record<SolutionCardType, string> = {
  hardware: 'bg-primary-50',
  app: 'bg-secondary-50',
  game: 'bg-accent-50',
  ecosystem: 'bg-green-50',
};

export interface SolutionCardsProps {
  sectionTitle?: string;
  sectionDesc?: string;
  list?: SolutionCardDataItem[];
}

const SolutionCards: React.FC<SolutionCardsProps> = ({
  sectionTitle = SOLUTION_CARDS_DATA.sectionTitle,
  sectionDesc = SOLUTION_CARDS_DATA.sectionDesc,
  list = SOLUTION_CARDS_DATA.list,
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

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
          {sectionTitle}
        </motion.h2>

        <motion.p 
          className="text-lg text-center text-neutral-600 max-w-3xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {sectionDesc}
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {list.map((solution, index) => (
            <motion.div 
              key={solution.key}
              className={`rounded-xl p-6 ${BG_COLORS[solution.type as SolutionCardType]} hover:shadow-md transition-all h-full flex flex-col`}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <div className="mb-4">{ICONS[solution.type as SolutionCardType]}</div>
              <h3 className="text-xl font-display font-semibold mb-3 text-neutral-800">{solution.title}</h3>
              <p className="text-neutral-600 mb-4 flex-grow">{solution.description}</p>
              <Link 
                to={solution.link} 
                className="mt-auto text-primary-600 hover:underline font-medium flex items-center gap-1"
              >
                {solution.linkText}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SolutionCards;