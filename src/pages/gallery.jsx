import React, { useState, useEffect, useCallback } from 'react';
import './gallery.css';
import Navbar from '../pages/Navbar';
import Footer from './footer';
import FloatingWhatsApp from './whatspp.jsx';
import MovieCarousel from './MovieCarousel.jsx';

const TerrazzoGallery = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [isModalOpening, setIsModalOpening] = useState(false);
  const [isModalClosing, setIsModalClosing] = useState(false);
  
  const terrazzoImages = Object.values(import.meta.glob('./images/*.jpg', { 
    eager: true,
    query: {
      auto: 'format',
      fit: 'crop',
      w: '600', // Increased for better quality
      h: '600',
      q: '90' // Higher quality
    }
  })).map((mod) => mod.default);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (selectedImageIndex !== null) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
      document.documentElement.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
      document.documentElement.style.overflow = 'auto';
    };
  }, [selectedImageIndex]);

  const handleImageClick = useCallback((index) => {
    setSelectedImageIndex(index);
    setIsModalOpening(true);
    setTimeout(() => setIsModalOpening(false), 600);
  }, []);

  const closeFullscreen = useCallback(() => {
    if (selectedImageIndex === null) return;
    
    setIsModalClosing(true);
    setTimeout(() => {
      setSelectedImageIndex(null);
      setIsModalClosing(false);
    }, 500);
  }, [selectedImageIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedImageIndex === null) return;

      switch(e.key) {
        case 'Escape':
          closeFullscreen();
          break;
        case 'ArrowLeft':
          setSelectedImageIndex(prev => 
            prev > 0 ? prev - 1 : terrazzoImages.length - 1
          );
          break;
        case 'ArrowRight':
          setSelectedImageIndex(prev => 
            prev < terrazzoImages.length - 1 ? prev + 1 : 0
          );
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImageIndex, terrazzoImages.length, closeFullscreen]);

  const navigateImage = useCallback((direction) => {
    setSelectedImageIndex(prev => {
      if (direction === 'next') {
        return prev < terrazzoImages.length - 1 ? prev + 1 : 0;
      } else {
        return prev > 0 ? prev - 1 : terrazzoImages.length - 1;
      }
    });
  }, [terrazzoImages.length]);

  return (
    <div className="terrazzo-gallery">
      <Navbar />
      <MovieCarousel />
      
      <div className="gallery-header">
        <h1 className="gallery-title">Premium Terrazzo Designs</h1>
        <p className="gallery-subtitle">Experience Timeless Elegance In Every Pattern</p>
      </div>
      
      <div className="image-grid">
        {terrazzoImages.map((img, index) => (
          <div 
            className="image-tile" 
            key={img}
            onClick={() => handleImageClick(index)}
          >
            <img 
              src={img}
              alt={`Terrazzo design ${index + 1}`} 
              className="terrazzo-image"
              loading="lazy"
            />
            <div className="image-overlay">
              <button 
                className="inquiry-button"
                onClick={(e) => { 
                  e.stopPropagation();
                  const whatsappNumber = '+254726740469';
                  const defaultMessage = 'Hello! I would like to request a sample of this terrazzo design.';
                  window.open(
                    `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(defaultMessage)}`,
                    '_blank'
                  );
                }}
              >
                Request Sample
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedImageIndex !== null && (
        <div 
          className={`fullscreen-overlay ${isModalOpening ? 'opening' : ''} ${isModalClosing ? 'closing' : ''}`}
          onClick={closeFullscreen}
        >
          <button 
            className="close-button"
            onClick={closeFullscreen}
            aria-label="Close image"
          >
            &times;
          </button>
          
          <button 
            className="nav-button modal-nav prev"
            onClick={(e) => {
              e.stopPropagation();
              navigateImage('prev');
            }}
            aria-label="Previous image"
          >
            ‹
          </button>
          
          <button 
            className="nav-button modal-nav next"
            onClick={(e) => {
              e.stopPropagation();
              navigateImage('next');
            }}
            aria-label="Next image"
          >
            ›
          </button>

          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <img
              className="fullscreen-image"
              src={terrazzoImages[selectedImageIndex].replace('w=600', 'w=1920').replace('h=600', 'h=1080').replace('q=90', 'q=95')}
              alt={`Fullscreen view - Terrazzo design ${selectedImageIndex + 1}`}
            />
            
            <div className="image-counter">
              {selectedImageIndex + 1} / {terrazzoImages.length}
            </div>
          </div>
        </div>
      )}
      
      <FloatingWhatsApp 
        phone="+254 726740469"
        message="Hello! I visited your website and would like more information."
      />

      <Footer />
    </div>
  );
};

export default TerrazzoGallery;