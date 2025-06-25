'use client';

import { useEffect, useState } from 'react';
import './AnimatedHead.css';

export const ResponsiveAnimatedHeading = () => {
  const [heading, setHeading] = useState('');
  const [subHeading, setSubHeading] = useState('');
  const [cursorVisible, setCursorVisible] = useState(true);
  const [activeSection, setActiveSection] = useState('heading');

  const fullHeading = "DAVMAL ENT TERRAZZO";
  const fullSubHeading = "Premium terrazzo solutions for modern spaces. Crafted with marble, quartz, and glass aggregates in epoxy or cement bases. Superior durability, seamless finishes, and endless design possibilities.";

  // Typing and cursor animation
  useEffect(() => {
    // Cursor blink animation
    const cursorInterval = setInterval(() => {
      setCursorVisible(v => !v);
    }, 500);

    // Typing logic
    let typingTimeout;
    
    if (activeSection === 'heading' && heading.length < fullHeading.length) {
      typingTimeout = setTimeout(() => {
        setHeading(fullHeading.slice(0, heading.length + 1));
      }, 120);
    } 
    else if (activeSection === 'heading') {
      typingTimeout = setTimeout(() => {
        setActiveSection('subheading');
      }, 800);
    }
    else if (activeSection === 'subheading' && subHeading.length < fullSubHeading.length) {
      typingTimeout = setTimeout(() => {
        setSubHeading(fullSubHeading.slice(0, subHeading.length + 1));
      }, 40);
    }
    else if (activeSection === 'subheading') {
      typingTimeout = setTimeout(() => {
        setActiveSection('done');
      }, 2000);
    }

    return () => {
      clearInterval(cursorInterval);
      clearTimeout(typingTimeout);
    };
  }, [heading, subHeading, activeSection]);

  return (
    <div className="animated-container">
      <h1 className="davmal-heading text-center">
        {heading}
        <span className={`cursor ${cursorVisible && activeSection === 'heading' ? 'visible' : ''}`}>|</span>
      </h1>
      
      <p className="subheading-container">
        <span className="davmal-subheading">
          {subHeading}
          <span className={`cursor ${cursorVisible && activeSection === 'subheading' ? 'visible' : ''}`}>|</span>
        </span>
      </p>
      
      <div className="terrazzo-features">
        <h3>Terrazzo Advantages:</h3>
        <ul>
          <li>Custom color & aggregate blends</li>
          <li>Seamless installation</li>
          <li>Low maintenance & high durability</li>
          <li>Eco-friendly material options</li>
          <li>50+ year lifespan guarantee</li>
        </ul>
      </div>
    </div>
  );
};

export default ResponsiveAnimatedHeading;