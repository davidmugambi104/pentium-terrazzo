import React from 'react';
import { Link } from 'react-router-dom';
import './ServiceClosed.css';

const ServiceClosed = () => {
  return (
    <div className="service-closed-container">
      <h1>🚫 This Page Is Currently Closed</h1>
      <p className="reason-title">Why you're seeing this:</p>
      <ul className="reason-list">
        <li>💳 The account associated with this service has an unpaid balance.</li>
        <li>🕒 Payment for this month was not received before the due date.</li>
        <li>📪 Multiple payment reminders were ignored or not acknowledged.</li>
        <li>🔒 As a result, access to this page has been temporarily restricted.</li>
      </ul>
      <p className="contact-note">
        If you believe this is an error or would like to restore service, please contact support.
      </p>
      <a href="mailto:davidmugambi104@gmail.com" className="contact-button">Contact Support</a>
      <Link to="/" className="home-link">Return to Home</Link>
    </div>
  );
};

export default ServiceClosed;
