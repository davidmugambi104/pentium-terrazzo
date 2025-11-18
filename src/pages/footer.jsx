import React from 'react';
import { FaWhatsapp, FaFacebookF, FaInstagram, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock } from 'react-icons/fa';

export const Footer = () => {
  return (
    <footer style={styles.footer}>
      {/* Subtle Terrazzo Background */}
      <div style={styles.backgroundPattern}></div>
      
      <div style={styles.footerContent}>
        {/* About Us Column */}
        <div style={styles.footerColumn}>
          <h3 style={styles.columnHeading}>About Us</h3>
          <p style={styles.companyDescription}>
            With over 40 years of excellence, Prestige Terrazzo Innovations delivers premium, custom terrazzo solutions for commercial, residential, and institutional spaces worldwide.
          </p>
          <div style={styles.socialContainer}>
            <a 
              href="https://wa.me/+254726740469?text=Hello%2C%20I%20need%20terrazzo%20%5Binstallation%5D%20or%20%5Bmaterials%5D"
              target="_blank" 
              rel="noopener noreferrer" 
              style={styles.socialLink}
              aria-label="WhatsApp"
            >
              <FaWhatsapp style={styles.icon} />
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=61568477566243"
              target="_blank"
              rel="noopener noreferrer"
              style={styles.socialLink}
              aria-label="Facebook"
            >
              <FaFacebookF style={styles.icon} />
            </a>
            <a
              href="https://www.instagram.com/yourprofile"
              target="_blank"
              rel="noopener noreferrer"
              style={styles.socialLink}
              aria-label="Instagram"
            >
              <FaInstagram style={styles.icon} />
            </a>
          </div>
        </div>

        {/* Quick Links Column */}
        <div style={styles.footerColumn}>
          <h3 style={styles.columnHeading}>Quick Links</h3>
          <ul style={styles.linkList}>
            <li style={styles.listItem}><a href="." style={styles.link}>Home</a></li>
            <li style={styles.listItem}><a href="/about" style={styles.link}>About Us</a></li>
            <li style={styles.listItem}><a href="/portfolio" style={styles.link}>Our Projects</a></li>
            <li style={styles.listItem}><a href="/photos" style={styles.link}>Terrazzo Types</a></li>
            <li style={styles.listItem}><a href="/portfolio" style={styles.link}>Sustainability</a></li>
            <li style={styles.listItem}><a href="#" style={styles.link}>Careers</a></li>
          </ul>
        </div>

        {/* Contact Column */}
        <div style={styles.footerColumn}>
          <h3 style={styles.columnHeading}>Contact Us</h3>
          <ul style={styles.contactList}>
            <li style={styles.contactItem}>
              <FaMapMarkerAlt style={styles.contactIcon} />
              <span>Moi avenue<br />Nairobi city</span>
            </li>
            <li style={styles.contactItem}>
              <FaPhoneAlt style={styles.contactIcon} />
              <span>+254 726740469</span>
            </li>
            <li style={styles.contactItem}>
              <FaEnvelope style={styles.contactIcon} />
              <span>davidmugambi104@gmail.com</span>
            </li>
            <li style={styles.contactItem}>
              <FaClock style={styles.contactIcon} />
              <span>Mon-Fri: 8:00 AM - 6:00 PM<br />Sat: 9:00 AM - 2:00 PM</span>
            </li>
          </ul>
        </div>

        {/* Newsletter Column */}
        <div style={styles.footerColumn}>
          <h3 style={styles.columnHeading}>Newsletter</h3>
          <p style={styles.newsletterText}>
            Subscribe to receive updates on new materials, installation techniques, and exclusive offers.
          </p>
          <form style={styles.newsletterForm}>
            <input 
              type="email" 
              placeholder="Your email address" 
              required 
              style={styles.newsletterInput}
            />
            <button type="submit" style={styles.newsletterButton}>Subscribe</button>
          </form>
          
          <h3 style={{...styles.columnHeading, marginTop: '1.5rem'}}>Project Types</h3>
          <div style={styles.projectTypes}>
            <span style={styles.projectType}>Commercial</span>
            <span style={styles.projectType}>Residential</span>
            <span style={styles.projectType}>Healthcare</span>
            <span style={styles.projectType}>Education</span>
            <span style={styles.projectType}>Retail</span>
            <span style={styles.projectType}>Hospitality</span>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div style={styles.footerBottom}>
        <div style={styles.copyright}>
          © {new Date().getFullYear()} Prestige Terrazzo Innovations. All rights reserved.
        </div>
        <div style={styles.legalLinks}>
          <a href="#" style={styles.legalLink}>Privacy Policy</a>
          <a href="#" style={styles.legalLink}>Terms of Service</a>
          <a href="#" style={styles.legalLink}>Sitemap</a>
          <a href="#" style={styles.legalLink}>Accessibility</a>
        </div>
      </div>
    </footer>
  );
};

// Styles
const styles = {
  footer: {
    position: 'relative',
    backgroundColor: '#1a1f27',
    color: '#e9ecef',
    padding: '5rem 2rem 2rem',
    overflow: 'hidden',
  },
  backgroundPattern: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundImage: `url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iIzIyMjgzMCIvPjxyZWN0IHg9IjIwIiB5PSIyMCIgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiBmaWxsPSIjM2MzYjQ1IiBvcGFjaXR5PSIwLjIiLz48cmVjdCB4PSI0MCIgeT0iMzAiIHdpZHRoPSIxNSIgaGVpZ2h0PSIxNSIgZmlsbD0iIzM5M2Y0OSIgb3BhY2l0eT0iMC4xNSIvPjxyZWN0IHg9IjcwIiB5PSIxMCIgd2lkdGg9IjgiIGhlaWdodD0iOCIgZmlsbD0iIzM5M2Y0OSIgb3BhY2l0eT0iMC4xIi8+PHJlY3QgeD0iMjAiIHk9IjYwIiB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIGZpbGw9IiMzOTNmNDkiIG9wYWNpdHk9IjAuMSIvPjxyZWN0IHg9IjUwIiB5PSI3MCIgd2lkdGg9IjgiIGhlaWdodD0iOCIgZmlsbD0iIzNjM2I0NSIgb3BhY2l0eT0iMC4xNSIvPjxyZWN0IHg9Ijc1IiB5PSI1MCIgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiBmaWxsPSIjM2EzYjQ1IiBvcGFjaXR5PSIwLjE1Ii8+PC9zdmc+')`,
    opacity: '0.12',
    zIndex: 0,
  },
  footerContent: {
    position: 'relative',
    zIndex: 1,
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '2.5rem',
    marginBottom: '3rem',
  },
  footerColumn: {
    position: 'relative',
    zIndex: 1,
  },
  columnHeading: {
    fontSize: '1.4rem',
    marginBottom: '1.5rem',
    position: 'relative',
    paddingBottom: '0.75rem',
    fontWeight: 600,
  },
  companyDescription: {
    lineHeight: 1.7,
    marginBottom: '1.2rem',
    color: '#ced4da',
    fontSize: '0.95rem',
  },
  socialContainer: {
    display: 'flex',
    gap: '1rem',
    marginTop: '1.5rem',
  },
  socialLink: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '40px',
    height: '40px',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: '50%',
    color: '#e9ecef',
    transition: 'all 0.3s ease',
    textDecoration: 'none',
  },
  icon: {
    fontSize: '1.1rem',
    transition: 'color 0.3s ease',
  },
  linkList: {
    listStyle: 'none',
    padding: 0,
  },
  listItem: {
    marginBottom: '0.8rem',
  },
  link: {
    textDecoration: 'none',
    color: '#ced4da',
    transition: 'all 0.3s ease',
    display: 'block',
    padding: '0.3rem 0',
    fontSize: '0.95rem',
  },
  contactList: {
    listStyle: 'none',
    padding: 0,
  },
  contactItem: {
    display: 'flex',
    alignItems: 'flex-start',
    marginBottom: '1rem',
  },
  contactIcon: {
    color: '#d4af37',
    marginRight: '12px',
    marginTop: '4px',
    fontSize: '1.1rem',
  },
  newsletterText: {
    lineHeight: 1.7,
    marginBottom: '1.2rem',
    color: '#ced4da',
    fontSize: '0.95rem',
  },
  newsletterForm: {
    marginTop: '1.2rem',
  },
  newsletterInput: {
    width: '100%',
    padding: '0.8rem 1rem',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    border: 'none',
    borderRadius: '4px',
    color: '#e9ecef',
    marginBottom: '0.8rem',
    fontSize: '0.95rem',
  },
  newsletterButton: {
    background: 'linear-gradient(to right, #d4af37, #c19b30)',
    color: '#1a1f27',
    border: 'none',
    padding: '0.8rem 1.5rem',
    borderRadius: '4px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    width: '100%',
    fontSize: '0.95rem',
  },
  projectTypes: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem',
    marginTop: '1rem',
  },
  projectType: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    padding: '0.4rem 0.8rem',
    borderRadius: '4px',
    fontSize: '0.85rem',
  },
  footerBottom: {
    position: 'relative',
    zIndex: 1,
    maxWidth: '1200px',
    margin: '0 auto',
    paddingTop: '2rem',
    borderTop: '1px solid rgba(255, 255, 255, 0.08)',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: '#adb5bd',
    fontSize: '0.9rem',
  },
  copyright: {
    color: '#adb5bd',
  },
  legalLinks: {
    display: 'flex',
    gap: '1.5rem',
  },
  legalLink: {
    color: '#adb5bd',
    textDecoration: 'none',
    transition: 'color 0.3s ease',
  },
  
  // Hover effects
  socialLinkHover: {
    ':hover': {
      backgroundColor: '#d4af37',
      transform: 'translateY(-3px)',
    }
  },
  linkHover: {
    ':hover': {
      color: '#d4af37',
      transform: 'translateX(5px)',
    }
  },
  newsletterButtonHover: {
    ':hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 5px 15px rgba(0, 0, 0, 0.2)',
    }
  },
  legalLinkHover: {
    ':hover': {
      color: '#d4af37',
    }
  },
};

// Add hover effects using JavaScript mouse events
const addHoverEffects = () => {
  // This would be implemented with CSS-in-JS or separate CSS in a real project
  // For this inline example, we're defining styles in the object above
};

export default Footer;