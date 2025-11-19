import React, { useEffect, useState, useContext, useMemo, useRef, useReducer, useCallback } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { debounce, throttle } from 'lodash';
import { useInView } from 'react-intersection-observer';
import { ThemeContext } from '../context/ThemeContext';
import PatternGenerator from '../pages/products/custom-design-lab/PatternGenerator';
import RealTimeRender from '../pages/products/custom-design-lab/RealTimeRender';
import YouTubeAntiquePlayer from './VideoPopup';
import YouTubeAntiquePlayer1 from './youtube2';
import YouTubeAntiquePlayer2 from './youtube3';
import YouTubeAntiquePlayer3 from './youtube4';
import { blogPosts } from './data/blogPosts'
import ShopGallery from './frame';
import Navbar from './Navbar';
import AnimatedHead from './AnimatedHead'
import MovieCarousel from './MovieCarousel';
import ResponsiveAnimatedHeading from './AnimatedHead';
import AntiquePhotoFrame from './frame';
import Footer from './footer';
import GlowingTicker from './newsHeadlines';
import './home.css';
import { motion, AnimatePresence } from 'framer-motion';
import { useScroll, useTransform } from 'framer-motion';
import FloatingWhatsApp from './whatspp';
import SEO from './SEO';

// Dummy SectionParallax implementation (replace with your actual import if available)
const SectionParallax = ({ speed, children }) => <div>{children}</div>;
// import Navbar from './Navbar';
// import { Canvas } from '@react-three/fiber';

// 1. Complex State Management System
const globalStateReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_SESSION':
      return { ...state, userSession: { ...state.userSession, ...action.payload } };
    case 'ADD_NOTIFICATION':
      return { ...state, notifications: [...state.notifications, action.payload] };
    case 'REMOVE_NOTIFICATION':
      return { ...state, notifications: state.notifications.filter(n => n.id !== action.payload) };
    case 'UPDATE_PERFORMANCE':
      return { ...state, performanceMetrics: { ...state.performanceMetrics, ...action.payload } };
    case 'SET_ACTIVE_MODULE':
      return { ...state, activeModule: action.payload };
    case 'CACHE_RESOURCE':
      return { 
        ...state, 
        resourceCache: {
          ...state.resourceCache,
          [action.payload.key]: action.payload.data
        }
      };
    case 'TRACK_INTERACTION':
      return {
        ...state,
        interactionLog: [
          ...state.interactionLog,
          {
            timestamp: Date.now(),
            type: action.payload.type,
            details: action.payload.details
          }
        ]
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

const initialState = {
  isLoading: true,
  userSession: {
    id: null,
    preferences: {},
    authToken: null,
    lastActive: Date.now()
  },
  notifications: [],
  performanceMetrics: {
    fps: 0,
    memory: 0,
    loadTime: 0
  },
  activeModule: 'home',
  resourceCache: {},
  interactionLog: []
};

// 2. Advanced Performance Monitoring
const usePerformanceMonitor = () => {
  const [metrics, setMetrics] = useState({
    fps: 60,
    memoryUsage: 0,
    loadTimes: {}
  });
  
  const perfRef = useRef({
    frameCount: 0,
    lastFpsUpdate: Date.now(),
    memorySampler: null
  });

  useEffect(() => {
    // FPS tracking
    const fpsInterval = setInterval(() => {
      const now = Date.now();
      const delta = now - perfRef.current.lastFpsUpdate;
      
      if (delta >= 1000) {
        const fps = Math.round(
          (perfRef.current.frameCount * 1000) / delta
        );
        
        setMetrics(prev => ({
          ...prev,
          fps: Math.max(1, Math.min(60, fps))
        }));
        
        perfRef.current.frameCount = 0;
        perfRef.current.lastFpsUpdate = now;
      }
    }, 500);

    // Memory tracking
    if (window.performance && window.performance.memory) {
      perfRef.current.memorySampler = setInterval(() => {
        setMetrics(prev => ({
          ...prev,
          memoryUsage: window.performance.memory.usedJSHeapSize
        }));
      }, 3000);
    }

    // Animation frame counter
    const countFrame = () => {
      perfRef.current.frameCount++;
      requestAnimationFrame(countFrame);
    };
    countFrame();

    return () => {
      clearInterval(fpsInterval);
      clearInterval(perfRef.current.memorySampler);
    };
  }, []);

  return metrics;
};

const featuredPosts = blogPosts.slice(0, 3);

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Terrazzo Excellence',
    description: 'Premium terrazzo installation, restoration, and maintenance services',
    url: 'https://terrazzoexcellence.com',
    telephone: '+1-555-123-4567',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '123 Design District',
      addressLocality: 'Portland',
      addressRegion: 'OR',
      postalCode: '97209',
      addressCountry: 'US'
    },
    areaServed: 'Portland Metro Area',
    knowsAbout: [
      'Terrazzo flooring installation',
      'Terrazzo restoration services',
      'Polished terrazzo maintenance',
      'Terrazzo countertops installation',
      'Sustainable terrazzo design'
    ]
  };


// 3. AI Recommendation Engine
const useDesignRecommendationEngine = (userPreferences, interactionHistory) => {
  const [recommendations, setRecommendations] = useState([]);
  
  const generateRecommendations = useCallback(throttle(() => {
    // Complex recommendation algorithm
    const styleWeights = {
      vintage: 0.3,
      modern: 0.4,
      abstract: 0.2,
      geometric: 0.1
    };

    // Analyze interaction history
    interactionHistory.forEach(interaction => {
      if (interaction.type === 'PATTERN_SELECT') {
        const style = interaction.details.style;
        styleWeights[style] = (styleWeights[style] || 0) + 0.1;
      }
    });

    // Normalize weights
    const totalWeight = Object.values(styleWeights).reduce((sum, w) => sum + w, 0);
    for (let style in styleWeights) {
      styleWeights[style] = styleWeights[style] / totalWeight;
    }

    // Generate recommendations (simplified)
    const newRecs = [];
    for (let i = 0; i < 12; i++) {
      const styles = Object.keys(styleWeights);
      const selectedStyle = styles.reduce((acc, style) => {
        const rand = Math.random();
        return rand < styleWeights[style] ? style : acc;
      }, styles[0]);
      
      newRecs.push({
        id: `rec-${Date.now()}-${i}`,
        style: selectedStyle,
        complexity: Math.floor(Math.random() * 5) + 1,
        popularity: Math.floor(Math.random() * 100),
        elements: ['geometric', 'organic', 'typographic', 'photographic'][
          Math.floor(Math.random() * 4)
        ]
      });
    }

    setRecommendations(newRecs);
  }, 2000), []);

  return { recommendations, generateRecommendations };
};

// 4. Real-time Collaboration System
const useCollaborationService = () => {
  const [collaborators, setCollaborators] = useState([]);
  const [designUpdates, setDesignUpdates] = useState([]);
  const wsRef = useRef(null);

  useEffect(() => {
    // Simulated WebSocket connection
    const mockCollaborators = [
      { id: 'user-1', name: 'Designer 1', avatar: '/avatar1.png', active: true },
      { id: 'user-2', name: 'Client', avatar: '/avatar2.png', active: true },
      { id: 'user-3', name: 'Designer 2', avatar: '/avatar3.png', active: false }
    ];
    
    setCollaborators(mockCollaborators);
    
    // Simulate real-time updates
    const updateInterval = setInterval(() => {
      setDesignUpdates(prev => [
        ...prev,
        {
          id: `update-${Date.now()}`,
          user: mockCollaborators[Math.floor(Math.random() * mockCollaborators.length)].id,
          component: ['Pattern', 'Color', 'Texture', 'Layout'][Math.floor(Math.random() * 4)],
          change: Math.random() > 0.5 ? 'Modified' : 'Added',
          timestamp: Date.now() - Math.floor(Math.random() * 60000)
        }
      ]);
    }, 3000);

    return () => clearInterval(updateInterval);
  }, []);

  const sendUpdate = (update) => {
    // In a real implementation, this would send via WebSocket
    setDesignUpdates(prev => [...prev, {
      ...update,
      id: `user-update-${Date.now()}`,
      user: 'current-user',
      timestamp: Date.now()
    }]);
  };

  return { collaborators, designUpdates, sendUpdate };
};

// 5. Enterprise-grade Security Layer
const SecurityContext = React.createContext();

const SecurityProvider = ({ children }) => {
  const [securityState, setSecurityState] = useState({
    isAuthenticated: false,
    permissions: [],
    auditLog: [],
    threatLevel: 0
  });

  const detectThreats = useCallback(throttle(() => {
    // Advanced threat detection logic would go here
    const newThreatLevel = Math.random() > 0.9 ? 1 : 0;
    if (newThreatLevel > securityState.threatLevel) {
      setSecurityState(prev => ({
        ...prev,
        threatLevel: newThreatLevel,
        auditLog: [
          ...prev.auditLog,
          {
            timestamp: Date.now(),
            event: 'THREAT_DETECTED',
            level: newThreatLevel,
            action: 'Logged'
          }
        ]
      }));
    }
  }, 5000), []);

  const value = {
    ...securityState,
    authenticate: (credentials) => {
      // Real authentication would happen here
      setSecurityState(prev => ({
        ...prev,
        isAuthenticated: true,
        permissions: ['design:edit', 'content:view', 'collaborate'],
        auditLog: [
          ...prev.auditLog,
          {
            timestamp: Date.now(),
            event: 'AUTH_SUCCESS',
            user: credentials.username
          }
        ]
      }));
    },
    detectThreats
  };

  return (
    <SecurityContext.Provider value={value}>
      {children}
    </SecurityContext.Provider>
  );
};

// 6. Multi-step Animation Orchestrator
const AnimationOrchestrator = ({ children }) => {
  const [animationSequence, setAnimationSequence] = useState(0);
  const scrollRef = useRef(null);

  useScroll({
    target: scrollRef,
    offset: ["start end", "end start"]
  }).scrollYProgress.onChange((v) => {
    setAnimationSequence(Math.floor(v * 10));
  });

  const getAnimationProps = (step) => ({
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: animationSequence >= step ? 1 : 0,
      y: animationSequence >= step ? 0 : 20
    },
    transition: { duration: 0.5, delay: 0.1 * step }
  });

  return (
    <div ref={scrollRef}>
      {React.Children.map(children, (child, index) =>
        React.cloneElement(child, getAnimationProps(index))
      )}
    </div>
  );
};

// 7. Enhanced Performance Dashboard
const PerformanceDashboard = ({ metrics }) => {
  const [selectedMetric, setSelectedMetric] = useState('fps');
  
  const chartData = useMemo(() => {
    return {
      fps: Array.from({ length: 30 }, (_, i) => ({
        time: Date.now() - (30 - i) * 1000,
        value: Math.max(10, metrics.fps - Math.random() * 10)
      })),
      memory: Array.from({ length: 30 }, (_, i) => ({
        time: Date.now() - (30 - i) * 1000,
        value: metrics.memoryUsage / 1024 / 1024 + Math.random() * 0.5
      }))
    };
  }, [metrics]);

  return (
    <div className="performance-dashboard">
      <div className="metric-selector">
        {['fps', 'memory'].map(metric => (
          <button
            key={metric}
            className={`metric-btn ${selectedMetric === metric ? 'active' : ''}`}
            onClick={() => setSelectedMetric(metric)}
          >
            {metric.toUpperCase()}
          </button>
        ))}
      </div>
      
      <div className="chart-container">
        <svg viewBox="0 0 500 200">
          {chartData[selectedMetric].map((point, i, arr) => {
            if (i === 0) return null;
            const prev = arr[i - 1];
            return (
              <line
                key={i}
                x1={(i - 1) * (500 / arr.length)}
                y1={200 - (prev.value / 60) * 200}
                x2={i * (500 / arr.length)}
                y2={200 - (point.value / 60) * 200}
                stroke="#4a90e2"
                strokeWidth="2"
              />
            );
          })}
        </svg>
      </div>
      
      <div className="metric-summary">
        <div className="metric-value">
          {selectedMetric === 'fps' 
            ? `${Math.round(metrics.fps)} FPS` 
            : `${(metrics.memoryUsage / 1024 / 1024).toFixed(2)} MB`}
        </div>
        <div className="metric-status">
          {selectedMetric === 'fps' 
            ? (metrics.fps > 45 ? 'Excellent' : metrics.fps > 30 ? 'Good' : 'Needs Optimization')
            : (metrics.memoryUsage < 50000000 ? 'Optimal' : 'High Usage')}
        </div>
      </div>
    </div>
  );
};

// 8. Error Boundary Enhancement
const HomePageErrorFallback = ({ error, resetErrorBoundary }) => {
  const [errorDetails, setErrorDetails] = useState('');
  
  useEffect(() => {
    const details = `
      Error: ${error.message}
      Stack: ${error.stack}
      Component: ${error.componentName || 'Unknown'}
      Timestamp: ${new Date().toISOString()}
      User Agent: ${navigator.userAgent}
    `;
    setErrorDetails(details);
  }, [error]);

  const reportError = () => {
    console.error('Error reported:', errorDetails);
    // In real app, send to error tracking service
    resetErrorBoundary();
  };

  return (
    <div className="error-fallback">
      <div className="error-header">
        <h2>Design Studio Encountered an Issue</h2>
        <p>Our creative engine needs a quick restart</p>
      </div>
      
      <div className="error-details">
        <h3>Technical Details:</h3>
        <pre>{error.message}</pre>
      </div>
      
      <div className="error-actions">
        <button className="recovery-btn" onClick={resetErrorBoundary}>
          Restart Design Module
        </button>
        <button className="report-btn" onClick={reportError}>
          Send Error Report
        </button>
      </div>
      
      <div className="safety-note">
        <p>Your work has been automatically saved. All changes are preserved.</p>
      </div>
    </div>
  );
};

// 9. Main HomePage Component with Enhancements
const HomePage = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [state, dispatch] = useReducer(globalStateReducer, initialState);
  const [threeEnv, setThreeEnv] = useState(null);
  const [sectionRef, isSectionVisible] = useInView({ threshold: 0.1, rootMargin: '200px' });
  const [activeTab, setActiveTab] = useState('design');
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [designSession, setDesignSession] = useState({
    version: 12,
    history: [],
    currentDesign: null
  });
  
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ container: containerRef });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);
  const performanceMetrics = usePerformanceMonitor();
  const security = useContext(SecurityContext);
  
  const { recommendations, generateRecommendations } = 
    useDesignRecommendationEngine(state.userPreferences, state.interactionLog);
  
  const collaboration = useCollaborationService();
  
  // Configuration
  const envConfig = useMemo(() => ({
    textureResolution: '4k',
    lightingPreset: theme === 'dark' ? 'moonlit' : 'sunny',
    shadowQuality: 'high',
    antialias: true,
    physicsEnabled: true,
    reflectionQuality: 'ultra'
  }), [theme]);

  // Initialize systems
  useEffect(() => {
    const initApplication = async () => {
      try {
        // Initialize authentication
        security.authenticate({ username: 'designer', token: 'demo-token' });
        
        // Load initial design session
        const savedSession = localStorage.getItem('designSession');
        if (savedSession) {
          setDesignSession(JSON.parse(savedSession));
        }
        
        // Start monitoring
        setInterval(() => security.detectThreats(), 3000);
        
        // Generate initial recommendations
        generateRecommendations();
        
        dispatch({ type: 'SET_LOADING', payload: false });
      } catch (error) {
        dispatch({ 
          type: 'ADD_NOTIFICATION', 
          payload: {
            id: Date.now(),
            type: 'error',
            message: 'Initialization failed',
            details: error.message
          }
        });
      }
    };
    
    initApplication();
  }, []);

  // Three.js setup and resize handling
  useEffect(() => {
    const handleResize = debounce(() => {
      threeEnv?.updateCameraAspect(window.innerWidth / window.innerHeight);
    }, 200);

    const handleMouseMove = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    const initializeEnvironment = () => {
      window.addEventListener('resize', handleResize);
      window.addEventListener('mousemove', handleMouseMove);
    };

    initializeEnvironment();

    return () => {
      threeEnv?.dispose();
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      handleResize.cancel();
    };
  }, [envConfig, threeEnv]);

  // Session persistence
  useEffect(() => {
    const saveSession = throttle(() => {
      localStorage.setItem('designSession', JSON.stringify(designSession));
    }, 5000);
    
    saveSession();
    return () => saveSession.cancel();
  }, [designSession]);

  // Interaction tracking
  const trackInteraction = (type, details) => {
    dispatch({
      type: 'TRACK_INTERACTION',
      payload: { type, details }
    });
  };

  // Loading skeleton with shimmer effect
  const renderLoadingSkeleton = () => (
    <div className="skeleton-grid">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="skeleton-card">
          <div className="shimmer-animation" />
          <div className="skeleton-content">
            <div className="skeleton-line long" />
            <div className="skeleton-line medium" />
            <div className="skeleton-line short" />
          </div>
        </div>
      ))}
    </div>
  );

  // Hero section with 3D particles
  const renderHeroSection = () => (
    <motion.section 
      className="hero-section" 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      
    </motion.section>
  );

  // Recommendations section with holographic cards
  const renderRecommendations = () => (
    <SectionParallax speed={0.2}>
      <section className="recommendations-section">
        <h2 className="section-title">Design Inspirations</h2>
        <div className="inspiration-grid">
          {recommendations.slice(0, 8).map(item => (
            <HolographicCard key={item.id}>
              <AntiquePhotoFrame 
                imageUrl={`/designs/${item.style}-${item.id}.jpg`}
                caption={`${item.style.charAt(0).toUpperCase() + item.style.slice(1)} Concept`}
                metadata={`Complexity: ${item.complexity}/5`}
              />
            </HolographicCard>
          ))}
        </div>
      </section>
    </SectionParallax>
  );

  // Enhanced design section with collaboration
  const renderDesignSection = () => (
    <section className="design-section">
      <div className="design-header">
        <h2 className="section-title">Live Design Studio</h2>
        
        <div className="collaboration-panel">
          <span>Collaborators:</span>
          <div className="avatar-group">
            {collaboration.collaborators.filter(c => c.active).map(collab => (
              <div key={collab.id} className="collaborator-avatar">
                <img src={collab.avatar} alt={collab.name} />
                <div className="status-indicator" />
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="design-tabs">
        {['design', 'render', 'gallery', 'collaborate'].map(tab => (
          <button
            key={tab}
            className={`tab-button ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>
      
      <div className="design-workspace">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'design' && (
              <PatternGenerator 
                theme={theme} 
                onDesignChange={(design) => {
                  setDesignSession(prev => ({
                    ...prev,
                    history: [...prev.history, prev.currentDesign],
                    currentDesign: design
                  }));
                  trackInteraction('DESIGN_UPDATE', { elements: design.elements });
                }}
              />
            )}
            
            {activeTab === 'render' && (
              <RealTimeRender 
                resolution="8k"
                qualityPreset="cinematic"
                className="render-viewer"
                design={designSession.currentDesign}
              />
            )}
            
            {activeTab === 'gallery' && (
              <div className="gallery-container">
                <MovieCarousel theme={theme} />
              </div>
            )}
            
            {activeTab === 'collaborate' && (
              <div className="collaboration-feed">
                <h3>Real-time Updates</h3>
                <div className="updates-list">
                  {collaboration.designUpdates.map(update => (
                    <div key={update.id} className="update-item">
                      <div className="update-meta">
                        <span className="user-badge">
                          {collaboration.collaborators.find(c => c.id === update.user)?.name}
                        </span>
                        <span className="update-time">
                          {Math.floor((Date.now() - update.timestamp) / 1000)}s ago
                        </span>
                      </div>
                      <div className="update-content">
                        {update.change} {update.component}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
      <SEO
        title="Terrazzo Excellence"
        description="Premium terrazzo installation, restoration, and maintenance services. Sustainable, beautiful terrazzo solutions for residential and commercial projects."
        keywords="terrazzo flooring, terrazzo installation, terrazzo restoration, polished terrazzo"
        structuredData={structuredData}
      />
  // Performance monitoring dashboard
  const renderPerformanceDashboard = () => (
    <section className="performance-section">
      <h2 className="section-title">System Performance</h2>
      <PerformanceDashboard metrics={performanceMetrics} />
      
      <div className="optimization-tips">
        <h3>Optimization Recommendations</h3>
        <ul>
          {performanceMetrics.fps < 45 && (
            <li>Reduce particle count in 3D scenes</li>
          )}
          {performanceMetrics.memoryUsage > 50000000 && (
            <li>Enable lazy loading for background assets</li>
          )}
          <li>Use lower resolution textures on mobile devices</li>
          <li>Disable unused real-time collaboration sessions</li>
        </ul>
      </div>
    </section>
  );

  return (
    <SecurityProvider>
      <ErrorBoundary FallbackComponent={HomePageErrorFallback}>
        {/* <div 
          className={`home-container ${theme}-theme`} 
          ref={containerRef}
        > */}
          {/* <CursorTrail position={cursorPosition} theme={theme} /> */}
          {/* <ScrollProgressBar containerRef={containerRef} /> */}
          <Navbar theme={theme} />
          <div className="hero-content">
          <ResponsiveAnimatedHeading />
          </div>

          {/* <AnimateHead/> */}
          
          <div className="antique-players-container">
            {/* <div className="player"><YouTubeAntiquePlayer /></div>
            <div className="player"><YouTubeAntiquePlayer1 /></div>
            <div className="player"><YouTubeAntiquePlayer2 /></div>
            <div className="player"><YouTubeAntiquePlayer3 /></div> */}
          </div>
          <AntiquePhotoFrame />
          <ShopGallery/>

          {/* <MovieCarousel/> */}
          <GlowingTicker/>
          <FloatingWhatsApp 
                phone="+254 728422571"
                message="Hello! I visited your website and would like more information."
          />
          {/* <ThemeToggle theme={theme} toggleTheme={toggleTheme} /> */}
          
          {/* {renderHeroSection()} */}
           {/* {renderRecommendations()}
           {renderDesignSection()}
           {renderPerformanceDashboard()} */}
          
          
          <Footer theme={theme} />
        {/* </div> */}
      </ErrorBoundary>
    </SecurityProvider>
  );
};

export default HomePage;