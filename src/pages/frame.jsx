import { useState, useEffect, useRef } from 'react';
import { 
  XMarkIcon, 
  ArrowLeftIcon, 
  ArrowRightIcon, 
  ShareIcon,
  HeartIcon,
  PhotoIcon,
  MagnifyingGlassPlusIcon,
  MagnifyingGlassMinusIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid';

// Import your images
import terrazzo58 from './images/terrazzo58.jpg';
import terrazzo53 from './images/terrazzo18.jpg';
import terrazzo69 from './images/terrazzo69.jpg';
import terrazzo46 from './images/terrazzo46.jpg';
import "./ShopGallery.css";

const ShopGallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [favorites, setFavorites] = useState(new Set());
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });
  const [activeFilter, setActiveFilter] = useState('all');
  const modalRef = useRef(null);
  const imageRef = useRef(null);

  const images = [
    {
      id: 1,
      url: terrazzo58,
      title: 'Modern Terrazzo Pattern',
      description: 'Designed a unique terrazzo pattern with a modern touch for a client in downtown Miami',
      category: 'residential',
      tags: ['modern', 'custom', 'luxury'],
      date: '2024-01-15',
      location: 'Miami, FL'
    },
    {
      id: 2,
      url: terrazzo53,
      title: 'Educational Institution Project',
      description: 'Completed a large-scale terrazzo installation in a high school with durable, low-maintenance finish',
      category: 'commercial',
      tags: ['durable', 'large-scale', 'educational'],
      date: '2024-02-20',
      location: 'Orlando, FL'
    },
    {
      id: 3,
      url: terrazzo69, // Replace with actual image
      title: 'Hospital Restoration',
      description: 'Restored historic terrazzo floors with authentic period patterns and colors',
      category: 'historic',
      tags: ['restoration', 'art-deco', 'historic'],
      date: '2024-03-10',
      location: 'ngong hills'
    },
    {
      id: 4,
      url: terrazzo46, // Replace with actual image
      title: 'Contemporary Office Space',
      description: 'Custom terrazzo design for corporate headquarters featuring company branding',
      category: 'commercial',
      tags: ['corporate', 'branding', 'contemporary'],
      date: '2024-01-30',
      location: 'Tampa, FL'
    }
  ];

  const categories = ['all', 'residential', 'commercial', 'historic'];

  // Filter images based on active category
  const filteredImages = activeFilter === 'all' 
    ? images 
    : images.filter(img => img.category === activeFilter);

  // Preload images
  useEffect(() => {
    images.forEach(img => {
      const image = new Image();
      image.src = img.url;
    });
  }, []);

  // Handle body scroll and keyboard events
  useEffect(() => {
    const handleBodyScroll = (shouldLock) => {
      document.body.style.overflow = shouldLock ? 'hidden' : 'auto';
    };

    const handleKeyDown = (e) => {
      if (!selectedImage) return;
      
      switch(e.key) {
        case 'Escape':
          closeModal();
          break;
        case 'ArrowLeft':
          navigate(-1);
          break;
        case 'ArrowRight':
          navigate(1);
          break;
        default:
          break;
      }
    };

    if (selectedImage) {
      handleBodyScroll(true);
      window.addEventListener('keydown', handleKeyDown);
    } else {
      handleBodyScroll(false);
      window.removeEventListener('keydown', handleKeyDown);
    }

    return () => {
      handleBodyScroll(false);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedImage, currentImageIndex]);

  const openImage = (index) => {
    setCurrentImageIndex(index);
    setSelectedImage(filteredImages[index]);
    setZoomLevel(1);
    setImagePosition({ x: 0, y: 0 });
  };

  const closeModal = () => {
    setSelectedImage(null);
    setZoomLevel(1);
    setImagePosition({ x: 0, y: 0 });
  };

  const navigate = (direction) => {
    const newIndex = (currentImageIndex + direction + filteredImages.length) % filteredImages.length;
    setCurrentImageIndex(newIndex);
    setSelectedImage(filteredImages[newIndex]);
    setZoomLevel(1);
    setImagePosition({ x: 0, y: 0 });
  };

  const toggleFavorite = (imageId, e) => {
    e.stopPropagation();
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(imageId)) {
        newFavorites.delete(imageId);
      } else {
        newFavorites.add(imageId);
      }
      return newFavorites;
    });
  };

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.25, 1));
  };

  const handleZoomReset = () => {
    setZoomLevel(1);
    setImagePosition({ x: 0, y: 0 });
  };

  // Mouse events for panning zoomed image
  const handleMouseDown = (e) => {
    if (zoomLevel <= 1) return;
    setIsDragging(true);
    setDragStart({
      x: e.clientX - imagePosition.x,
      y: e.clientY - imagePosition.y
    });
  };

  const handleMouseMove = (e) => {
    if (!isDragging || zoomLevel <= 1) return;
    
    const newX = e.clientX - dragStart.x;
    const newY = e.clientY - dragStart.y;
    
    // Calculate bounds to prevent dragging beyond image edges
    const img = imageRef.current;
    if (img) {
      const maxX = (img.naturalWidth * zoomLevel - img.clientWidth) / 2;
      const maxY = (img.naturalHeight * zoomLevel - img.clientHeight) / 2;
      
      setImagePosition({
        x: Math.max(Math.min(newX, maxX), -maxX),
        y: Math.max(Math.min(newY, maxY), -maxY)
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const shareImage = async (e) => {
    e.stopPropagation();
    try {
      if (navigator.share) {
        await navigator.share({
          title: selectedImage.title,
          text: selectedImage.description,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
      }
    } catch (err) {
      console.log('Error sharing:', err);
    }
  };

  return (
    <div className="shop-gallery">
      {/* Filter Tabs */}
      <div className="gallery-filters">
        {categories.map(category => (
          <button
            key={category}
            className={`filter-btn ${activeFilter === category ? 'active' : ''}`}
            onClick={() => setActiveFilter(category)}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      {/* Image Grid */}
      <div className="image-grid">
        {filteredImages.map((img, index) => (
          <div 
            key={img.id}
            className="image-card"
            onClick={() => openImage(index)}
          >
            <div className="image-container">
              <img 
                src={img.url} 
                alt={img.title}
                className="grid-image"
                loading="lazy"
              />
              <div className="image-overlay">
                <button 
                  className={`favorite-btn ${favorites.has(img.id) ? 'favorited' : ''}`}
                  onClick={(e) => toggleFavorite(img.id, e)}
                >
                  {favorites.has(img.id) ? (
                    <HeartSolid className="icon" />
                  ) : (
                    <HeartIcon className="icon" />
                  )}
                </button>
                <button className="view-button">
                  <PhotoIcon className="icon" />
                  View Details
                </button>
              </div>
            </div>
            <div className="image-meta">
              <h3>{img.title}</h3>
              <p>{img.description}</p>
              <div className="image-tags">
                {img.tags.map(tag => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedImage && (
        <div 
          className="modal-overlay"
          onClick={closeModal}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <div 
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            ref={modalRef}
          >
            {/* Header Controls */}
            <div className="modal-header">
              <div className="modal-info">
                <h2>{selectedImage.title}</h2>
                <p>{selectedImage.location} • {new Date(selectedImage.date).toLocaleDateString()}</p>
              </div>
              <div className="modal-controls">
                <button 
                  className="control-btn"
                  onClick={handleZoomOut}
                  disabled={zoomLevel <= 1}
                >
                  <MagnifyingGlassMinusIcon className="icon" />
                </button>
                <button 
                  className="control-btn"
                  onClick={handleZoomReset}
                >
                  {Math.round(zoomLevel * 100)}%
                </button>
                <button 
                  className="control-btn"
                  onClick={handleZoomIn}
                  disabled={zoomLevel >= 3}
                >
                  <MagnifyingGlassPlusIcon className="icon" />
                </button>
                <button 
                  className="control-btn"
                  onClick={shareImage}
                >
                  <ShareIcon className="icon" />
                </button>
                <button 
                  className={`control-btn ${favorites.has(selectedImage.id) ? 'favorited' : ''}`}
                  onClick={(e) => toggleFavorite(selectedImage.id, e)}
                >
                  {favorites.has(selectedImage.id) ? (
                    <HeartSolid className="icon" />
                  ) : (
                    <HeartIcon className="icon" />
                  )}
                </button>
                <button 
                  className="control-btn close-btn"
                  onClick={closeModal}
                >
                  <XMarkIcon className="icon" />
                </button>
              </div>
            </div>

            {/* Image Container */}
            <div 
              className="image-viewer"
              onMouseDown={handleMouseDown}
            >
              <img 
                ref={imageRef}
                src={selectedImage.url} 
                alt={selectedImage.title}
                className="modal-image"
                style={{
                  transform: `scale(${zoomLevel}) translate(${imagePosition.x}px, ${imagePosition.y}px)`,
                  cursor: zoomLevel > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default'
                }}
              />
            </div>

            {/* Footer Info */}
            <div className="modal-footer">
              <div className="image-details">
                <p>{selectedImage.description}</p>
                <div className="detail-grid">
                  <div className="detail-item">
                    <strong>Category:</strong>
                    <span>{selectedImage.category}</span>
                  </div>
                  <div className="detail-item">
                    <strong>Location:</strong>
                    <span>{selectedImage.location}</span>
                  </div>
                  <div className="detail-item">
                    <strong>Date:</strong>
                    <span>{new Date(selectedImage.date).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="image-tags">
                  {selectedImage.tags.map(tag => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Navigation */}
            <button 
              className="nav-btn prev"
              onClick={() => navigate(-1)}
            >
              <ArrowLeftIcon className="icon" />
            </button>
            <button 
              className="nav-btn next"
              onClick={() => navigate(1)}
            >
              <ArrowRightIcon className="icon" />
            </button>

            {/* Counter */}
            <div className="image-counter">
              {currentImageIndex + 1} / {filteredImages.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShopGallery;