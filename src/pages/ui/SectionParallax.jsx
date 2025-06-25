import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const SectionParallax = ({ children, speed = 0.2 }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, 100 * speed]);

  return (
    <motion.div ref={ref} style={{ y }}>
      {children}
    </motion.div>
  );
};

export default SectionParallax;