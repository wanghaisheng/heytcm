import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const HeroSection = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-neutral-50">
        <motion.div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: "url('https://images.pexels.com/photos/6765882/pexels-photo-6765882.jpeg?auto=compress&cs=tinysrgb&w=1200')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          transition={{ duration: 1.5 }}
        />
        
        {/* Flowing Qi animation elements */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute bg-primary-300 rounded-full opacity-10"
              style={{
                width: Math.random() * 300 + 100,
                height: Math.random() * 300 + 100,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                x: [0, Math.random() * 100 - 50, 0],
                y: [0, Math.random() * 100 - 50, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: Math.random() * 10 + 15,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 text-center">
        <motion.h1 
          className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-neutral-900 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {t('HomePage.hero.title')}
        </motion.h1>
        
        <motion.p 
          className="text-lg md:text-xl text-neutral-700 max-w-3xl mx-auto mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {t('HomePage.hero.desc')}
        </motion.p>
        
        <div className="flex flex-wrap justify-center gap-4">
          {buttons.map((btn, idx) => (
            <Link
              key={btn.text + idx}
              to={btn.link}
              className={
                idx === 0 ? "bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-full font-medium text-lg transition-colors shadow-lg" :
                idx === 1 ? "bg-secondary-600 hover:bg-secondary-700 text-white px-6 py-3 rounded-full font-medium text-lg transition-colors shadow-lg" :
                "bg-neutral-200 hover:bg-neutral-300 text-neutral-800 px-6 py-3 rounded-full font-medium text-lg transition-colors shadow-lg"
              }
            >
              {btn.text}
            </Link>
          ))}
        </div>
        
        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ 
            opacity: { delay: 1.5, duration: 1 },
            y: { repeat: Infinity, duration: 1.5, ease: "easeInOut" }
          }}
        >
          <div className="w-8 h-12 rounded-full border-2 border-neutral-400 flex justify-center">
            <div className="w-1 h-3 bg-neutral-400 rounded-full mt-2"></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;