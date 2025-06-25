import React, { useRef, useEffect } from 'react';
import './HolographicCard.css';

const HolographicCard = ({ children }) => {
  const cardRef = useRef(null);
  
  useEffect(() => {
    const card = cardRef.current;
    
    const handleMouseMove = (e) => {
      const { left, top, width, height } = card.getBoundingClientRect();
      const x = (e.clientX - left) / width;
      const y = (e.clientY - top) / height;
      
      card.style.setProperty('--mouse-x', x);
      card.style.setProperty('--mouse-y', y);
    };
    
    card.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  return (
    <div ref={cardRef} className="holographic-card">
      <div className="holographic-effect"></div>
      <div className="card-content">
        {children}
      </div>
    </div>
  );
};

export default HolographicCard;