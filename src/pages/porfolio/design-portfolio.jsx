import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import './portfolio.css';
import Navbar from '../Navbar';
import FloatingWhatsApp from '../whatspp.jsx';



const BusinessPortfolio = () => {
  const [isSticky, setIsSticky] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 100);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="terrazzo-blog">
      <Navbar/>
      <Helmet>
        <title>The Art of Terrazzo: Timeless Flooring Solutions | Terrazzo Masters</title>
        <meta name="description" content="Discover the history, craftsmanship, and modern applications of terrazzo flooring. Expert insights from industry professionals with 15+ years of experience." />
        <meta name="keywords" content="terrazzo, flooring, installation, restoration, concrete floors, design" />
      </Helmet>
      
      {/* Hero Section */}
      <header className="blog-hero">
        <div className="hero-overlay">
          <div className="hero-content">
            <h1>The Timeless Art of Terrazzo Flooring</h1>
            <p className="hero-subtitle">Craftsmanship, Innovation, and Enduring Beauty</p>
            <div className="hero-stats">
              <div className="stat">
                <span>15+</span>
                <p>Years Experience</p>
              </div>
              <div className="stat">
                <span>850+</span>
                <p>Projects Completed</p>
              </div>
              <div className="stat">
                <span>95%</span>
                <p>Client Retention</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className={`blog-nav ${isSticky ? 'sticky' : ''}`}>
        <ul>
          <li><a href="#history">History</a></li>
          <li><a href="#types">Types</a></li>
          <li><a href="#installation">Installation</a></li>
          <li><a href="#design">Design</a></li>
          <li><a href="#maintenance">Maintenance</a></li>
          <li><a href="#restoration">Restoration</a></li>
          <li><a href="#casestudies">Case Studies</a></li>
        </ul>
      </nav>

      <main className="blog-content">
        {/* Introduction */}
        <section className="intro-section">
          <div className="container">
            <p className="lead">
              Terrazzo isn't just a flooring material—it's a centuries-old art form that combines 
              durability with breathtaking design possibilities. As specialists with over 15 years 
              of experience, we've seen this versatile material transform spaces from historic 
              landmarks to cutting-edge commercial environments.
            </p>
            <div className="author-card">
              <div className="author-img"></div>
              <div className="author-info">
                <h4>John Terrazzini</h4>
                <p>Lead Installer & Material Specialist</p>
                <p>NTMA Certified, LEED Green Associate</p>
              </div>
            </div>
          </div>
        </section>

        {/* History Section */}
        <section id="history" className="history-section">
          <div className="container">
            <h2>The Ancient Origins of Modern Terrazzo</h2>
            <div className="history-timeline">
              <div className="timeline-item">
                <div className="timeline-year">15th Century</div>
                <div className="timeline-content">
                  <h3>Venetian Innovation</h3>
                  <p>
                    Venetian workers discovered they could create beautiful, durable surfaces 
                    by embedding marble fragments in clay. This resourceful approach to using 
                    leftover materials became the foundation of terrazzo as we know it today.
                  </p>
                </div>
              </div>
              
              <div className="timeline-item">
                <div className="timeline-year">1920s</div>
                <div className="timeline-content">
                  <h3>American Adoption</h3>
                  <p>
                    Italian immigrants brought terrazzo techniques to the United States, where it 
                    gained popularity in Art Deco buildings. The development of electric grinders 
                    revolutionized the finishing process, making terrazzo more accessible.
                  </p>
                </div>
              </div>
              
              <div className="timeline-item">
                <div className="timeline-year">Today</div>
                <div className="timeline-content">
                  <h3>Modern Renaissance</h3>
                  <p>
                    Contemporary terrazzo has evolved with new binders like epoxy and polyacrylate, 
                    expanding design possibilities. Sustainable practices and recycled materials 
                    have made terrazzo a preferred choice for eco-conscious projects.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Types of Terrazzo */}
        <section id="types" className="types-section">
          <div className="container">
            <h2>Exploring Terrazzo Varieties</h2>
            <p className="section-intro">
              Modern terrazzo comes in several formulations, each with unique characteristics 
              suited to different applications and design requirements.
            </p>
            
            <div className="type-grid">
              <div className="type-card">
                <div className="type-icon cement"></div>
                <h3>Cementitious Terrazzo</h3>
                <p>
                  The traditional form using Portland cement as the binder. Offers unmatched 
                  authenticity and depth but requires skilled installation and longer curing times.
                </p>
                <div className="type-stats">
                  <span>Best for: Historic restoration, large commercial spaces</span>
                  <span>Cure Time: 7-14 days</span>
                  <span>Lifespan: 75+ years</span>
                </div>
              </div>
              
              <div className="type-card">
                <div className="type-icon epoxy"></div>
                <h3>Epoxy Terrazzo</h3>
                <p>
                  Modern resin-based terrazzo with faster installation and greater design flexibility. 
                  More resistant to cracking but with slightly less depth than cementitious versions.
                </p>
                <div className="type-stats">
                  <span>Best for: Retail spaces, healthcare facilities, vertical applications</span>
                  <span>Cure Time: 24-48 hours</span>
                  <span>Lifespan: 50+ years</span>
                </div>
              </div>
              
              <div className="type-card">
                <div className="type-icon poly"></div>
                <h3>Polyacrylate Terrazzo</h3>
                <p>
                  The middle ground between cement and epoxy. Offers faster curing than cement 
                  with greater UV stability than epoxy, ideal for exterior applications.
                </p>
                <div className="type-stats">
                  <span>Best for: Outdoor spaces, areas with temperature fluctuations</span>
                  <span>Cure Time: 3-5 days</span>
                  <span>Lifespan: 60+ years</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Installation Process */}
        <section id="installation" className="installation-section">
          <div className="container">
            <h2>The Art of Terrazzo Installation</h2>
            <p className="section-intro">
              Professional terrazzo installation is a multi-stage process requiring precision at 
              every step. Here's what our 15-step process entails:
            </p>
            
            <div className="process-steps">
              <div className="step">
                <div className="step-number">1</div>
                <div className="step-content">
                  <h3>Substrate Preparation</h3>
                  <p>
                    The foundation is everything. We meticulously prepare the subfloor, ensuring 
                    it's level, clean, and structurally sound. Any imperfections at this stage 
                    will telegraph through the finished floor.
                  </p>
                </div>
              </div>
              
              <div className="step">
                <div className="step-number">2</div>
                <div className="step-content">
                  <h3>Moisture Testing</h3>
                  <p>
                    We conduct rigorous moisture testing using ASTM standards. Excessive moisture 
                    can ruin a terrazzo installation, so we never skip this critical step.
                  </p>
                </div>
              </div>
              
              <div className="step">
                <div className="step-number">3</div>
                <div className="step-content">
                  <h3>Isolation Membrane</h3>
                  <p>
                    A specialized membrane is applied to prevent cracking from substrate movement. 
                    This is especially crucial in seismic zones or areas with temperature extremes.
                  </p>
                </div>
              </div>
              
              <div className="step">
                <div className="step-number">4</div>
                <div className="step-content">
                  <h3>Divider Strips Installation</h3>
                  <p>
                    Brass, zinc, or plastic strips are precisely positioned to create expansion 
                    joints and design elements. These strips become integral design features.
                  </p>
                </div>
              </div>
              
              <div className="step">
                <div className="step-number">5</div>
                <div className="step-content">
                  <h3>Binder & Aggregate Mixing</h3>
                  <p>
                    We mix binder (cement, epoxy, or polyacrylate) with selected aggregates at 
                    precise ratios. Consistency is critical for uniform appearance and performance.
                  </p>
                </div>
              </div>
              
              <div className="step">
                <div className="step-number">6</div>
                <div className="step-content">
                  <h3>Pouring and Spreading</h3>
                  <p>
                    The mixture is poured and spread evenly using specialized tools. Timing is 
                    crucial—the material must be worked before initial set begins.
                  </p>
                </div>
              </div>
              
              <div className="step">
                <div className="step-number">7</div>
                <div className="step-content">
                  <h3>Initial Grinding</h3>
                  <p>
                    After proper curing (timing varies by binder type), we perform the first grind 
                    using diamond-embedded tools to expose aggregates and level the surface.
                  </p>
                </div>
              </div>
              
              <div className="step">
                <div className="step-number">8</div>
                <div className="step-content">
                  <h3>Fine Grinding & Polishing</h3>
                  <p>
                    Progressive grinding with finer grits creates the smooth surface. We use 
                    laser-leveling technology to ensure perfect flatness.
                  </p>
                </div>
              </div>
              
              <div className="step">
                <div className="step-number">9</div>
                <div className="step-content">
                  <h3>Sealing & Protection</h3>
                  <p>
                    A penetrating sealer is applied to protect against stains and enhance color. 
                    For high-traffic areas, we add a sacrificial topcoat for extra protection.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="installation-tip">
              <h3>Pro Tip: Aggregate Selection</h3>
              <p>
                "The magic of terrazzo lies in aggregate selection. We carefully consider size, 
                color, and composition to achieve the desired aesthetic while ensuring durability. 
                For high-traffic areas, we recommend harder aggregates like quartz or granite."
              </p>
              <p>- Maria Rodriguez, Senior Material Specialist</p>
            </div>
          </div>
        </section>

        {/* Case Studies */}
        <section id="casestudies" className="case-section">
          <div className="container">
            <h2>Terrazzo Transformation: Case Studies</h2>
            
            <div className="case-study">
              <div className="case-header">
                <h3>Vicodec High School Renovation</h3>
                <p>10,000 sqft • Custom Design • Educational Facility</p>
              </div>
              
              <div className="case-content">
                <div className="case-image"></div>
                <div className="case-details">
                  <div className="case-challenge">
                    <h4>The Challenge</h4>
                    <p>
                      The school needed flooring that could withstand 1,800+ daily students while 
                      creating an inspiring environment. The existing flooring was a patchwork of 
                      damaged materials with high maintenance costs.
                    </p>
                  </div>
                  
                  <div className="case-solution">
                    <h4>Our Solution</h4>
                    <p>
                      We developed a custom terrazzo blend using recycled glass aggregates in the 
                      school colors. Strategic divider strips created wayfinding paths while 
                      reinforcing school spirit.
                    </p>
                  </div>
                  
                  <div className="case-results">
                    <h4>Impressive Results</h4>
                    <ul>
                      <li>15% reduction in material waste through precise batch mixing</li>
                      <li>60% decrease in annual maintenance costs</li>
                      <li>Improved acoustics throughout hallways</li>
                      <li>Project completed during summer break (8 weeks)</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="case-testimonial">
                <p>
                  "The terrazzo installation has transformed our school environment. Not only is 
                  it stunning to look at, but the durability has exceeded our expectations. Three 
                  years later, it still looks brand new despite constant foot traffic."
                </p>
                <p><strong>Robert Chen</strong>, Facilities Director, Vicodec High School</p>
              </div>
            </div>
            
            <div className="case-study">
              <div className="case-header">
                <h3>Historic Museum Restoration</h3>
                <p>1930s Terrazzo • Architectural Preservation • Cultural Institution</p>
              </div>
              
              <div className="case-content">
                <div className="case-image historic"></div>
                <div className="case-details">
                  <div className="case-challenge">
                    <h4>The Challenge</h4>
                    <p>
                      A failing 1930s terrazzo floor in a landmarked building with severe cracking, 
                      delamination, and areas of complete failure. The museum needed restoration 
                      that preserved historical integrity while meeting modern accessibility 
                      requirements.
                    </p>
                  </div>
                  
                  <div className="case-solution">
                    <h4>Our Solution</h4>
                    <p>
                      We employed archival research to identify original aggregate sources and 
                      developed custom-matched restoration materials. Using minimally invasive 
                      techniques, we repaired damaged sections while preserving original fabric.
                    </p>
                  </div>
                  
                  <div className="case-results">
                    <h4>Preservation Achieved</h4>
                    <ul>
                      <li>Preserved 90% of original terrazzo material</li>
                      <li>Extended floor lifespan by 40+ years</li>
                      <li>Maintained historical authenticity</li>
                      <li>Improved ADA compliance without altering character</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="case-testimonial">
                <p>
                  "The restoration team demonstrated remarkable sensitivity to our historical 
                  space. Their expertise in matching original materials and techniques was 
                  unparalleled. The restored floor now tells the story of both its original 
                  creation and careful preservation."
                </p>
                <p><strong>Eleanor Vance</strong>, Curator, City Historical Museum</p>
              </div>
            </div>
          </div>
        </section>

        {/* Maintenance Guide */}
        <section id="maintenance" className="maintenance-section">
          <div className="container">
            <h2>Preserving Your Terrazzo Investment</h2>
            <p className="section-intro">
              Proper maintenance ensures your terrazzo floors will last for generations. 
              Follow this professional care protocol:
            </p>
            
            <div className="maintenance-grid">
              <div className="care-card">
                <h3>Daily Care</h3>
                <ul>
                  <li>Dust mop with microfiber pad</li>
                  <li>Clean spills immediately</li>
                  <li>Use walk-off mats at entrances</li>
                  <li>Avoid acidic cleaners</li>
                </ul>
              </div>
              
              <div className="care-card">
                <h3>Weekly Cleaning</h3>
                <ul>
                  <li>Damp mop with neutral pH cleaner</li>
                  <li>Use auto-scrubber with soft brush</li>
                  <li>Rinse thoroughly to avoid residue</li>
                  <li>Dry with microfiber cloth</li>
                </ul>
              </div>
              
              <div className="care-card">
                <h3>Annual Maintenance</h3>
                <ul>
                  <li>Professional deep cleaning</li>
                  <li>Reapplication of protective sealer</li>
                  <li>Inspection for wear patterns</li>
                  <li>Minor scratch repair</li>
                </ul>
              </div>
              
              <div className="care-card">
                <h3>Every 5-7 Years</h3>
                <ul>
                  <li>Professional polishing</li>
                  <li>Sealant replacement</li>
                  <li>Joint inspection and repair</li>
                  <li>Surface assessment</li>
                </ul>
              </div>
            </div>
            
            <div className="maintenance-chart">
              <h3>Common Issues & Professional Solutions</h3>
              <table>
                <thead>
                  <tr>
                    <th>Problem</th>
                    <th>Causes</th>
                    <th>Professional Solution</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Hazing/Fogging</td>
                    <td>Improper cleaning residue, worn sealer</td>
                    <td>Professional stripping and resealing</td>
                  </tr>
                  <tr>
                    <td>Scratches</td>
                    <td>Abrasive grit, improper cleaning tools</td>
                    <td>Localized polishing and resealing</td>
                  </tr>
                  <tr>
                    <td>Cracking</td>
                    <td>Substrate movement, structural issues</td>
                    <td>Epoxy injection, decorative repair</td>
                  </tr>
                  <tr>
                    <td>Staining</td>
                    <td>Penetrating liquids, inadequate sealing</td>
                    <td>Poultice treatment, surface restoration</td>
                  </tr>
                  <tr>
                    <td>Delamination</td>
                    <td>Moisture issues, poor installation</td>
                    <td>Sectional replacement, moisture mitigation</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="cta-section">
          <div className="container">
            <div className="cta-card">
              <h2>Ready to Transform Your Space with Terrazzo?</h2>
              <p>
                Schedule a consultation with our terrazzo specialists. We'll assess your project, 
                provide material samples, and develop a custom solution for your space.
              </p>
              <div className="cta-buttons">
                <a
                  href="https://wa.me/254729159585?text=Hello%2C%20I%20would%20like%20to%20request%20a%20consultation."
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="btn-primary">Request Consultation</button>
                </a>

                <button className="btn-secondary">Download Brochure</button>
              </div>
              <p className="cta-contact">
                Have questions? Call our experts: <strong>+254 729 159585</strong> or whatsapp 
                <strong> +254 722 316668</strong>
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="blog-footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-about">
              <h4>Terrazzo Masters</h4>
              <p>
                With over 15 years of specialized experience, we bring artisanal craftsmanship 
                to every terrazzo project. NTMA certified installers serving commercial, 
                institutional, and high-end residential clients nationwide.
              </p>
            </div>
            
            <div className="footer-links">
              <h4>Resources</h4>
              <ul>
                <li><a href="#">Terrazzo Maintenance Guide</a></li>
                <li><a href="#">Design Inspiration Gallery</a></li>
                <li><a href="#">Sustainability Report</a></li>
                <li><a href="#">Technical Specifications</a></li>
              </ul>
            </div>
            
            <div className="footer-contact">
              <h4>Contact Us</h4>
              <p>Kayole junction<br />Craftsmanship</p>
              <p>Phone: +254 729159585<br />Email: info@davmalterrazzo.com</p>
            </div>
          </div>
          
          <div className="footer-bottom">
            <p>© {new Date().getFullYear()} Terrazzo Masters. All rights reserved. | NTMA Certified Installers | LEED Green Associates</p>
          </div>
        </div>
      </footer>
        <FloatingWhatsApp 
        phone="+254 729 159585"
        message="Hello! I visited your website and would like more information."
      />
    </div>
  );
};

export default BusinessPortfolio;

// export default BusinessPortfolio;