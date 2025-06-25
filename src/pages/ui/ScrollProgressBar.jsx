import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ScrollProgressBar = ({ containerRef }) => {
  const { scrollYProgress } = useScroll({ container: containerRef });
  const width = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  
  return (
    <motion.div 
      className="scroll-progress-bar"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: '4px',
        background: 'linear-gradient(90deg, #ff008c, #9000ff)',
        zIndex: 1000,
        width
      }}
    />
  );
};

export default ScrollProgressBar;