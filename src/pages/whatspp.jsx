// src/components/FloatingWhatsApp.jsx
import React, { useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import styled, { keyframes } from 'styled-components';

const pulse = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.7);
  }
  70% {
    box-shadow: 0 0 0 15px rgba(37, 211, 102, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(37, 211, 102, 0);
  }
`;

const FloatContainer = styled.div`
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 1000;
  
  @media (max-width: 768px) {
    bottom: 20px;
    right: 20px;
  }
`;

const WhatsAppButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  background: #25D366;
  border-radius: 50%;
  box-shadow: 0 5px 15px rgba(37, 211, 102, 0.5);
  transition: all 0.3s ease;
  animation: ${pulse} 2s infinite;
  text-decoration: none;
  position: relative;
  cursor: pointer;
  
  &:hover {
    transform: scale(1.1);
    box-shadow: 0 8px 25px rgba(37, 211, 102, 0.7);
    animation: none;
    
    .tooltip {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @media (max-width: 768px) {
    width: 70px;
    height: 70px;
  }
  
  @media (max-width: 480px) {
    width: 60px;
    height: 60px;
  }
`;

const Icon = styled.div`
  font-size: 45px;
  color: white;
  
  @media (max-width: 768px) {
    font-size: 40px;
  }
  
  @media (max-width: 480px) {
    font-size: 35px;
  }
`;

const Tooltip = styled.div`
  position: absolute;
  top: -45px;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 8px 15px;
  border-radius: 20px;
  font-size: 14px;
  white-space: nowrap;
  opacity: 0;
  transform: translateY(10px);
  transition: all 0.3s ease;
  pointer-events: none;
`;

const FloatingWhatsApp = ({ 
  phone = "+254729159585", 
  message = "Hello! I'm interested in your services",
  tooltipText = "Chat with us on WhatsApp!",
  size = 80,
  bottom = 30,
  right = 30
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Format the phone number by removing spaces
  const formattedPhone = phone.replace(/\s+/g, '');
  
  // Create the WhatsApp URL with pre-filled message
  const whatsappUrl = `https://wa.me/${formattedPhone}?text=${encodeURIComponent(message)}`;
  
  return (
    <FloatContainer 
      style={{ bottom: `${bottom}px`, right: `${right}px` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <WhatsAppButton 
        href={whatsappUrl} 
        target="_blank" 
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
      >
        <Icon>
          <FaWhatsapp />
        </Icon>
        <Tooltip className="tooltip">
          {tooltipText}
        </Tooltip>
      </WhatsAppButton>
    </FloatContainer>
  );
};

export default FloatingWhatsApp;