import React, { useState, useEffect } from 'react';
import './TypeEffect.css';

const TypeEffect = () => {
  const phrases = [
    'Custom Designs',
    '3D Rendering',
    'Pattern Generation',
    'Real-time Visualization'
  ];
  
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    if (currentPhraseIndex >= phrases.length) {
      setCurrentPhraseIndex(0);
    }
    
    const currentPhrase = phrases[currentPhraseIndex];
    
    const timer = setTimeout(() => {
      if (!isDeleting && currentIndex < currentPhrase.length) {
        // Typing forward
        setCurrentText(currentPhrase.substring(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      } else if (isDeleting && currentIndex > 0) {
        // Deleting backward
        setCurrentText(currentPhrase.substring(0, currentIndex - 1));
        setCurrentIndex(currentIndex - 1);
      } else {
        // Switch between typing and deleting
        setIsDeleting(!isDeleting);
        
        // Pause at end of phrase before deleting
        if (!isDeleting) {
          setTypingSpeed(500);
        } else {
          // Move to next phrase after deleting
          setCurrentPhraseIndex((currentPhraseIndex + 1) % phrases.length);
          setTypingSpeed(150);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [currentIndex, currentPhraseIndex, isDeleting, phrases, typingSpeed]);

  return (
    <div className="type-effect-container">
      <span className="type-effect-text">{currentText}</span>
      <span className="cursor">|</span>
    </div>
  );
};

export default TypeEffect;