import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const FounderMessage = () => {
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
        <motion.div 
          className="flex flex-col md:flex-row items-center gap-8 md:gap-12"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          {/* Founder image */}
          <div className="w-full md:w-1/3 relative">
            <div className="aspect-square rounded-full overflow-hidden border-4 border-primary-100">
              <img 
                src="https://images.pexels.com/photos/5698833/pexels-photo-5698833.jpeg?auto=compress&cs=tinysrgb&w=800" 
                alt="创始人生海王" 
                className="w-full h-full object-cover"
              />
            </div>
            <motion.div 
              className="absolute -top-4 -right-4 w-24 h-24 md:w-32 md:h-32 bg-secondary-100 rounded-full z-[-1]"
              initial={{ scale: 0 }}
              animate={inView ? { scale: 1 } : {}}
              transition={{ delay: 0.3, duration: 0.5 }}
            />
            <motion.div 
              className="absolute -bottom-4 -left-4 w-16 h-16 md:w-24 md:h-24 bg-primary-100 rounded-full z-[-1]"
              initial={{ scale: 0 }}
              animate={inView ? { scale: 1 } : {}}
              transition={{ delay: 0.5, duration: 0.5 }}
            />
          </div>
          
          {/* Message */}
          <div className="w-full md:w-2/3">
            <div className="bg-neutral-50 p-6 md:p-8 rounded-2xl relative">
              <svg className="absolute top-4 left-4 w-10 h-10 text-primary-200" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              
              <p className="text-lg md:text-xl text-neutral-700 mb-6 mt-8 ml-6">
                我是生海王。历经 30 年身心磨砺与 15 年医疗科技探索，我深信中医智慧值得被看见、被量化。HeyTCM，是我为自己、也为每一个渴望身心自在的你，点燃的一束光。
              </p>
              
              <Link 
                to="/about" 
                className="inline-flex items-center font-medium text-primary-600 hover:text-primary-700 transition-colors"
              >
                阅读我的完整故事
                <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FounderMessage;