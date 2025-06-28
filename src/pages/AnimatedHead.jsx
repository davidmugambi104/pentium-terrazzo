import React from 'react';
import './AnimatedHead.css';

class ResponsiveAnimatedHeading extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      heading: '',
      subHeading: '',
      cursorVisible: true,
      index: 0
    };

    this.fullHeading = "DAVMAL ENT TERRAZZO";
    this.fullSubHeading = "Premium terrazzo solutions for modern spaces. Crafted with marble, quartz, and glass aggregates in epoxy or cement bases. Superior durability, seamless finishes, and endless design possibilities, all in a range of stunning colors. Whatsapp us or call  on +254729159585";

    this.combinedText = this.fullHeading + this.fullSubHeading;
    this.typingSpeed = Math.floor(1000 / this.combinedText.length); // ≈4ms
    this.cursorInterval = null;
    this.typingInterval = null;
  }

  componentDidMount() {
    // Blink cursor
    this.cursorInterval = setInterval(() => {
      this.setState(prev => ({ cursorVisible: !prev.cursorVisible }));
    }, 400);

    // Fast typing animation
    this.typingInterval = setInterval(() => {
      const { index } = this.state;
      if (index < this.combinedText.length) {
        const newHeading = this.combinedText.slice(0, Math.min(this.fullHeading.length, index + 1));
        const newSubHeading =
          index >= this.fullHeading.length
            ? this.combinedText.slice(this.fullHeading.length, index + 1)
            : '';
        this.setState({ heading: newHeading, subHeading: newSubHeading, index: index + 1 });
      } else {
        clearInterval(this.typingInterval);
      }
    }, this.typingSpeed);
  }

  componentWillUnmount() {
    clearInterval(this.cursorInterval);
    clearInterval(this.typingInterval);
  }

  render() {
    const { heading, subHeading, cursorVisible, index } = this.state;

    const showHeadingCursor = index < this.fullHeading.length;
    const showSubHeadingCursor = index >= this.fullHeading.length && index < this.combinedText.length;

    return (
      <div className="animated-container">
        <h1 className="davmal-heading text-center">
          {heading}
          <span className={`cursor ${cursorVisible && showHeadingCursor ? 'visible' : ''}`}>|</span>
        </h1>
        
        <p className="subheading-container">
          <span className="davmal-subheading">
            {subHeading}
            <span className={`cursor ${cursorVisible && showSubHeadingCursor ? 'visible' : ''}`}>|</span>
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
  }
}

export default ResponsiveAnimatedHeading;
