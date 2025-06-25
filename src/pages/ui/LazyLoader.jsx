import React, { useState, useRef, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

const LazyLoader = ({ children, rootMargin = '200px', threshold = 0.1 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold,
    rootMargin
  });

  useEffect(() => {
    if (inView) {
      const timer = setTimeout(() => setIsVisible(true), 300);
      return () => clearTimeout(timer);
    }
  }, [inView]);

  return (
    <div ref={ref}>
      {isVisible ? children : (
        <div className="lazy-placeholder">
          <div className="loading-spinner"></div>
        </div>
      )}
    </div>
  );
};

export default LazyLoader;