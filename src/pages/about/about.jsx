import { useState, useEffect } from 'react';
import './AboutPage.css'; 
import Navbar from '../Navbar';
import Footer from '../footer.jsx';
import { FaCertificate, FaShieldAlt, FaLeaf, FaStar, FaBuilding, FaHome, FaHotel, FaDraftingCompass, FaChevronRight, FaWhatsapp } from 'react-icons/fa';
import FloatingWhatsApp from '../whatspp.jsx';
import terrazzo1 from '../images/terrazzo1.jpg';
import terrazzo2 from '../images/terrazzo2.jpg';
import terrazzo3 from '../images/terrazzo3.jpg';

export const AboutUs = () => {
  const [loadedImages, setLoadedImages] = useState(0);
  const [activeProcess, setActiveProcess] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const businessPhotos = [
    terrazzo1,
    terrazzo2,
    terrazzo3
  ];

  useEffect(() => {
    // Add scroll animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
        }
      });
    }, { threshold: 0.1 });
    
    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach(el => observer.observe(el));
    
    return () => hiddenElements.forEach(el => observer.unobserve(el));
  }, []);

  return (
    <div>
      <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

    <div id="about-container" className="professional-background">

      
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hidden">Crafting Terrazzo Masterpieces</h1>
          <p className="hero-subtitle hidden">Precision & Artistry in Every Installation</p>
          <div className="hero-stats hidden">
            <div className="stat-item">
              <span className="stat-number">15+</span>
              <span className="stat-label">Years Experience</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">2,500+</span>
              <span className="stat-label">Projects Completed</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">98%</span>
              <span className="stat-label">Client Satisfaction</span>
            </div>
          </div>
          <button 
            className="cta-button hidden"
            onClick={() => {
              const whatsappNumber = '254729159585';
              const defaultMessage = 'Hello Davmal Terrazzo! I would like to request a consultation.';
              window.open(
                `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(defaultMessage)}`,
                '_blank'
              );
            }}
          >
            <FaWhatsapp className="button-icon" />
            Request Consultation
          </button>
        </div>
      </section>

      {/* Brand Story Section */}
      <section className="content-section hidden">
        <div className="brand-story-container">
          <div className="brand-story-text">
            <h2>Our Terrazzo Legacy</h2>
            <p>
              Since 2010, Davmal Terrazzo Enterprises has transformed floors across Nairobi city and beyond,
              into stunning terrazzo masterpieces. What began as a family passion for 
              durable, beautiful surfaces has grown into a specialized installation 
              service trusted by <span className="highlight">+254 729 159585</span> satisfied customers.
            </p>
            <p>
              Our journey started with a single vision: to bring Italian craftsmanship 
              to Kenyan homes and businesses. Today, we blend traditional techniques 
              with modern innovation to create floors that stand the test of time.
            </p>
            <div className="signature">
              <div className="signature-name">David Maleku</div>
              <div className="signature-title">Founder & Lead Craftsman</div>
            </div>
          </div>
          <div className="brand-story-image">
            <div className="image-frame">
              <img 
                src={terrazzo1} 
                alt="Davmal Terrazzo craftsmanship" 
                className="elevated-image"
              />
              <div className="image-badge">
                <FaStar className="badge-icon" />
                <span>Since 2010</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="photo-gallery hidden">
        <div className="section-header">
          <h2>Our Work Speaks Volumes</h2>
          <p>Transforming spaces across Kenya with premium terrazzo installations</p>
        </div>
        <div className="gallery-grid">
          {businessPhotos.map((photo, index) => (
            <div 
              key={index} 
              className={`gallery-item ${loadedImages > index ? 'loaded' : ''}`}
              aria-label={`Terrazzo installation example ${index + 1}`}
            >
              {loadedImages > index ? null : <div className="image-placeholder" />}
              <img 
                src={photo}
                alt={`Terrazzo installation by Davmal Terrazzo Enterprises`}
                onLoad={() => setLoadedImages(prev => prev + 1)}
                style={{ display: loadedImages > index ? 'block' : 'none' }}
              />
              <div className="gallery-overlay">
                <div className="overlay-content">
                  <h3>Terrazzo Excellence</h3>
                  <p>Premium materials, expert craftsmanship</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Who We Serve */}
      <section className="content-section highlighted hidden">
        <div className="section-header">
          <h2>Perfecting Spaces For</h2>
          <p>We serve discerning clients who demand excellence in flooring solutions</p>
        </div>
        <div className="service-grid">
          <div className="service-card">
            <div className="service-icon">
              <FaBuilding />
            </div>
            <h3>Commercial Property Owners</h3>
            <p>Durable, elegant flooring solutions for high-traffic areas</p>
          </div>
          
          <div className="service-card">
            <div className="service-icon">
              <FaHome />
            </div>
            <h3>Homeowners</h3>
            <p>Luxury finishes that transform living spaces</p>
          </div>
          
          <div className="service-card">
            <div className="service-icon">
              <FaHotel />
            </div>
            <h3>Hospitality Venues</h3>
            <p>Stunning first impressions for guests</p>
          </div>
          
          <div className="service-card">
            <div className="service-icon">
              <FaDraftingCompass />
            </div>
            <h3>Architects & Designers</h3>
            <p>Premium materials for visionary projects</p>
          </div>
        </div>
      </section>

      {/* How We Operate - Interactive Process */}
      <section className="process-section hidden">
        <div className="section-header">
          <h2>Our Installation Excellence Process</h2>
          <p>Precision at every stage ensures flawless results</p>
        </div>
        <div className="process-steps">
          <div 
            className={`step ${activeProcess === 0 ? 'active' : ''}`}
            onMouseEnter={() => setActiveProcess(0)}
            onClick={() => setActiveProcess(0)}
          >
            <div className="step-number">01</div>
            <h3>Consultation & Design</h3>
            <p>On-site evaluation and tailored design recommendations</p>
            <div className="step-indicator">
              <FaChevronRight />
            </div>
          </div>
          
          <div 
            className={`step ${activeProcess === 1 ? 'active' : ''}`}
            onMouseEnter={() => setActiveProcess(1)}
            onClick={() => setActiveProcess(1)}
          >
            <div className="step-number">02</div>
            <h3>Precision Preparation</h3>
            <p>Subfloor conditioning and meticulous pattern layout</p>
            <div className="step-indicator">
              <FaChevronRight />
            </div>
          </div>
          
          <div 
            className={`step ${activeProcess === 2 ? 'active' : ''}`}
            onMouseEnter={() => setActiveProcess(2)}
            onClick={() => setActiveProcess(2)}
          >
            <div className="step-number">03</div>
            <h3>Expert Installation</h3>
            <p>Master craftsmen applying specialized techniques</p>
            <div className="step-indicator">
              <FaChevronRight />
            </div>
          </div>
          
          <div 
            className={`step ${activeProcess === 3 ? 'active' : ''}`}
            onMouseEnter={() => setActiveProcess(3)}
            onClick={() => setActiveProcess(3)}
          >
            <div className="step-number">04</div>
            <h3>Final Perfection</h3>
            <p>Grinding, polishing, and rigorous quality inspection</p>
            <div className="step-indicator">
              <FaChevronRight />
            </div>
          </div>
        </div>
        
        <div className="process-visualization">
          <div className="process-line">
            <div 
              className="process-progress" 
              style={{ width: `${(activeProcess + 1) * 25}%` }}
            ></div>
          </div>
        </div>
      </section>

      {/* Materials Section */}
      <section className="materials-section hidden">
        <div className="section-header">
          <h2>Premium Materials & Professional Equipment</h2>
          <p>We invest in the finest resources to ensure lasting terrazzo beauty</p>
        </div>

        <div className="materials-grid">
          <div className="material-group">
            <h3>🏗️ Core Materials</h3>
            <ul>
              <li>ISO-Certified White Cement</li>
              <li>Marble Chips (White, Cream, Black, Red)</li>
              <li>Premium Oxide Pigments</li>
              <li>Durable Dividing Strips</li>
              <li>Quality Block Stone Bases</li>
            </ul>
          </div>

          <div className="material-group">
            <h3>✨ Finishing System</h3>
            <ul>
              <li>Industrial-Grade Flow Polish</li>
              <li>Professional HCl Acid Solutions</li>
              <li>High-Density Washing Pads</li>
              <li>Diamond-Encrusted Grading Disks</li>
            </ul>
          </div>

          <div className="material-group">
            <h3>🔧 Professional Equipment</h3>
            <ul>
              <li>Machine Diamonds for Precision Cutting</li>
              <li>Commercial-Grade Terrazzo Grinders</li>
              <li>Skirting Timber Templates</li>
              <li>Panel Pinning Systems</li>
              <li>Specialized Hand Brushes</li>
            </ul>
          </div>
        </div>

        <div className="quality-badges">
          <div className="badge">
            <FaCertificate className="badge-icon" />
            <span>Certified Materials</span>
          </div>
          <div className="badge">
            <FaShieldAlt className="badge-icon" />
            <span>10-Year Installation Warranty</span>
          </div>
          <div className="badge">
            <FaLeaf className="badge-icon" />
            <span>Low-VOC Compounds</span>
          </div>
        </div>
      </section>

      {/* Persuasive CTA */}
      <section className="cta-section hidden">
        <div className="cta-container">
          <div className="cta-content">
            <h2>Experience the Davmal Difference</h2>
            <p>Join thousands of satisfied clients who have transformed their spaces with our premium terrazzo installations.</p>
            
            <div className="usp-grid">
              <div className="usp">
                <div className="usp-icon">✓</div>
                <div>
                  <h3>25+ Years Combined Experience</h3>
                  <p>Proven techniques for flawless results</p>
                </div>
              </div>
              <div className="usp">
                <div className="usp-icon">✓</div>
                <div>
                  <h3>10-Year Installation Guarantee</h3>
                  <p>Confidence in our workmanship</p>
                </div>
              </div>
              <div className="usp">
                <div className="usp-icon">✓</div>
                <div>
                  <h3>Custom Design Solutions</h3>
                  <p>Tailored to your unique vision</p>
                </div>
              </div>
              <div className="usp">
                <div className="usp-icon">✓</div>
                <div>
                  <h3>Nationwide Service</h3>
                  <p>Transforming spaces across Kenya</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="cta-form">
            <div className="form-header">
              <h3>Request a Consultation</h3>
              <p>Get expert advice for your project</p>
            </div>
            <button 
              className="inquiry-button"
              onClick={() => { 
                const whatsappNumber = '254729159585';
                const defaultMessage = 'Hello Davmal Terrazzo! I would like to request a consultation about terrazzo installation.';
                window.open(
                  `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(defaultMessage)}`,
                  '_blank'
                );
              }}
            >
              <span>WhatsApp Us Now</span>
              <span>+254 729 159585</span>
            </button>
            
            <div className="guarantee-badge">
              <FaShieldAlt className="badge-icon" />
              <span>10-Year Quality Guarantee</span>
            </div>
          </div>
        </div>
      </section>
      <FloatingWhatsApp 
        phone="+254 729 159585"
        message="Hello! I visited your website and would like more information."
      />
      
      <Footer />
    </div>
    </div>
  );
};

export default AboutUs;