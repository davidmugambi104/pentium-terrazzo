import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useSwipeable } from 'react-swipeable';
import './MovieCarousel.css';

const importAll = (r) => r.keys().map(r);
const terrazzoImages = Object.values(import.meta.glob('./images/*.jpg', { eager: true })).map(mod => mod.default);

const MOVIE_TEMPLATES = [
  {
    title: "The Midnight Zone",
    description: "A sci-fi thriller exploring parallel dimensions",
    duration: 8
  },
  {
    title: "Cyber Revolution",
    description: "Futuristic warfare in a digital age",
    duration: 8
  },
  {
    title: "Ocean's Depth",
    description: "Mysterious creatures of the deep sea",
    duration: 8
  },
  {
    title: "Space Pioneers",
    description: "Colonizing Mars in 22nd century",
    duration: 8
  },
  {
    title: "Ancient Secrets",
    description: "Uncovering lost civilizations",
    duration: 8
  }
];

const generateMockData = (imageCount) => {
  return Array.from({ length: imageCount }, (_, i) => ({
    id: i + 1,
    ...MOVIE_TEMPLATES[i % MOVIE_TEMPLATES.length],
    image: terrazzoImages[i],
    thumbnail: terrazzoImages[i]
  }));
};

const useMovieData = () => {
  const [movies, setMovies] = useState([]);
  
  useEffect(() => {
    const loadMovies = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const mockData = generateMockData(69);
      setMovies(mockData);
      preloadImages(mockData);
    };
    
    loadMovies();
  }, []);

  return movies;
};

const preloadImages = (movies) => {
  movies.forEach(({ image, thumbnail }) => {
    const img1 = new Image();
    const img2 = new Image();
    img1.src = image;
    img2.src = thumbnail;
  });
};

const useCarouselControls = (movies, isPlaying) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const intervalRef = useRef(null);
  const transitionRef = useRef(null);

  const startInterval = useCallback(() => {
    if (!movies.length) return;
    
    const duration = (movies[currentIndex]?.duration || 8) * 1000;
    
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setIsTransitioning(true);
      
      // Start transition
      setTimeout(() => {
        setCurrentIndex(prev => (prev + 1) % movies.length);
      }, 50);
      
      // End transition
      setTimeout(() => {
        setIsTransitioning(false);
      }, 1850);
      
    }, duration);

    return () => clearInterval(intervalRef.current);
  }, [movies, currentIndex]);

  useEffect(() => {
    if (isPlaying && movies.length && !isTransitioning) {
      startInterval();
    }
    return () => clearInterval(intervalRef.current);
  }, [isPlaying, movies, startInterval, isTransitioning]);

  const handleNavigation = useCallback((direction) => {
    setIsTransitioning(true);
    clearInterval(intervalRef.current);
    
    setTimeout(() => {
      setCurrentIndex(prev => {
        const newIndex = (prev + direction + movies.length) % movies.length;
        return newIndex;
      });
    }, 50);
    
    setTimeout(() => {
      setIsTransitioning(false);
      if (isPlaying) startInterval();
    }, 1850);
  }, [movies.length, isPlaying, startInterval]);

  return { currentIndex, isTransitioning, handleNavigation };
};

const Slide = React.memo(({ movie, position, isActive }) => (
  <div className={`slide ${position} ${isActive ? 'active' : ''}`}>
    <div className="slide-image-container">
      <img 
        src={movie.image} 
        alt={movie.title} 
        className="slide-image"
        loading="eager"
      />
      <div className="image-overlay" />
    </div>
  </div>
));

const Thumbnail = React.memo(({ movie, isActive, onClick }) => (
  <div 
    className={`thumbnail ${isActive ? 'active' : ''}`} 
    onClick={onClick}
    role="button"
    tabIndex={0}
    onKeyDown={(e) => e.key === 'Enter' && onClick()}
  >
    <div className="thumbnail-hover-layer" />
    <img 
      src={movie.thumbnail} 
      alt={movie.title} 
      className="thumbnail-image"
      loading="lazy"
    />
  </div>
));

const ThumbnailCarousel = React.memo(({ movies, currentIndex, onThumbnailClick }) => {
  const containerRef = useRef(null);
  
  const visibleThumbnails = useMemo(() => {
    if (!containerRef.current) return 5;
    return Math.floor(containerRef.current.offsetWidth / 160);
  }, []);

  const startIndex = Math.max(0, currentIndex - Math.floor(visibleThumbnails / 2));
  const endIndex = Math.min(movies.length, startIndex + visibleThumbnails);

  return (
    <div className="thumbnail-carousel" ref={containerRef}>
      {movies.slice(startIndex, endIndex).map((movie, index) => (
        <Thumbnail
          key={movie.id}
          movie={movie}
          isActive={startIndex + index === currentIndex}
          onClick={() => onThumbnailClick(startIndex + index)}
        />
      ))}
    </div>
  );
});

export const MovieCarousel = () => {
  const movies = useMovieData();
  const [isPlaying, setIsPlaying] = useState(true);
  const { currentIndex, isTransitioning, handleNavigation } = useCarouselControls(movies, isPlaying);
  
  const handlers = useSwipeable({
    onSwipedLeft: () => !isTransitioning && handleNavigation(1),
    onSwipedRight: () => !isTransitioning && handleNavigation(-1),
    trackMouse: true,
    delta: 10
  });

  const handleThumbnailClick = useCallback((index) => {
    if (!isTransitioning) {
      handleNavigation(index - currentIndex);
    }
  }, [currentIndex, isTransitioning, handleNavigation]);

  if (!movies.length) return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p>Loading images...</p>
    </div>
  );

  return (
    <div className="carousel-container">
      <div 
        {...handlers} 
        className={`main-display ${isTransitioning ? 'transitioning' : ''}`}
      >
        {movies.map((movie, index) => {
          let position = 'next';
          if (index === currentIndex) position = 'active';
          else if (index === (currentIndex - 1 + movies.length) % movies.length) position = 'prev';
          
          return (
            <Slide 
              key={movie.id} 
              movie={movie} 
              position={position}
              isActive={index === currentIndex}
            />
          );
        })}
        
        <div className="carousel-controls">
          <button 
            className="nav-button prev"
            onClick={() => !isTransitioning && handleNavigation(-1)}
            disabled={isTransitioning}
            aria-label="Previous movie"
          >
            ‹
          </button>
          <button 
            className="nav-button next"
            onClick={() => !isTransitioning && handleNavigation(1)}
            disabled={isTransitioning}
            aria-label="Next movie"
          >
            ›
          </button>
        </div>
      </div>

      <div className="thumbnail-section">
        <ThumbnailCarousel
          movies={movies}
          currentIndex={currentIndex}
          onThumbnailClick={handleThumbnailClick}
        />
      </div>
    </div>
  );
};

export default MovieCarousel;