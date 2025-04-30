import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

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
          为往圣继绝学，用科技焕新中医
        </motion.h1>
        
        <motion.p 
          className="text-lg md:text-xl text-neutral-700 max-w-3xl mx-auto mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          HeyTCM 智能中医共创圈：用 AI 与开放数据，解读身体信号，量化气血阴阳，开启您的个性化健康复兴之旅。
        </motion.p>
        
        <motion.div 
          className="flex flex-wrap justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Link 
            to="/products" 
            className="bg-primary-500 hover:bg-primary-600 text-white py-3 px-6 rounded-full text-lg font-medium transition-colors"
          >
            探索智能戒指
          </Link>
          <Link 
            to="/ecosystem" 
            className="bg-secondary-400 hover:bg-secondary-500 text-white py-3 px-6 rounded-full text-lg font-medium transition-colors"
          >
            加入共创社区
          </Link>
          <Link 
            to="/about" 
            className="bg-white hover:bg-neutral-100 text-neutral-800 border border-neutral-300 py-3 px-6 rounded-full text-lg font-medium transition-colors"
          >
            了解我们的故事
          </Link>
        </motion.div>
        
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