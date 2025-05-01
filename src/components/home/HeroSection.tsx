import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
// 类型定义
export interface HeroSectionButton {
  text: string;
  link: string;
}
export interface HeroSectionProps {
  title?: string;
  description?: string;
  buttons?: HeroSectionButton[];
}

const DEFAULT_TITLE = '为往圣继绝学，用科技焕新中医';
const DEFAULT_DESCRIPTION = 'HeyTCM 智能中医共创圈：用 AI 与开放数据，解读身体信号，量化气血阴阳，开启您的个性化健康复兴之旅。';

const HeroSection: React.FC<HeroSectionProps> = ({ title, description, buttons }) => {
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
        <h1 className="text-4xl md:text-6xl font-display font-bold mb-8 text-neutral-900 text-center drop-shadow">
          {title || DEFAULT_TITLE}
        </h1>
        <p className="text-lg md:text-2xl text-neutral-700 mb-8 text-center max-w-2xl mx-auto">
          {description || DEFAULT_DESCRIPTION}
        </p>

        {Array.isArray(buttons) && buttons.length > 0 && (
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            {buttons.map((btn, idx) => (
              btn && btn.text && btn.link ? (
                <Link key={idx} to={btn.link} className="btn btn-primary">
                  {btn.text}
                </Link>
              ) : null
            ))}
          </div>
        )}
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
    </section>
  );
};

export default HeroSection;