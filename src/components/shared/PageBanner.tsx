import React from 'react';
import { motion } from 'framer-motion';

interface PageBannerProps {
  title: string;
  image: string;
}

const PageBanner: React.FC<PageBannerProps> = ({ title, image }) => {
  return (
    <div className="relative h-64 md:h-80 lg:h-96 overflow-hidden">
      <div 
        className="absolute inset-0 bg-neutral-800"
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.6)',
        }}
      ></div>
      
      <div className="relative h-full flex items-center justify-center">
        <motion.h1 
          className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white text-center max-w-4xl px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {title}
        </motion.h1>
      </div>
    </div>
  );
};

export default PageBanner;