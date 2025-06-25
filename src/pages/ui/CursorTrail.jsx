import React, { useState, useEffect } from 'react';
import './CursorTrail.css';

const CursorTrail = ({ position, theme }) => {
  const [trail, setTrail] = useState([]);
  const maxTrailLength = 10;

  useEffect(() => {
    if (position.x && position.y) {
      setTrail(prev => [...prev, position].slice(-maxTrailLength));
    }
  }, [position]);

  return (
    <>
      {trail.map((pos, index) => (
        <div
          key={index}
          className="cursor-trail"
          style={{
            left: pos.x,
            top: pos.y,
            opacity: (index + 1) / trail.length,
            background: theme === 'dark' ? 
              'radial-gradient(circle, rgba(255,255,255,0.5) 0%, transparent 70%)' : 
              'radial-gradient(circle, rgba(0,0,0,0.3) 0%, transparent 70%)'
          }}
        />
      ))}
    </>
  );
};

export default CursorTrail;