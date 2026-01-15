import React from 'react';
import './About.css';
import Abouthero from './Image.png';

const values = [
    {
        icon: '✂️',
        title: 'Excellence',
        text: 'We are dedicated to high-quality service, continual growth, and attention to detail.'
    },
    {
        icon: '🤍',
        title: 'Integrity',
        text: 'We value honesty, professionalism, and trust in what we do always.'
    },
    {
        icon: '🙏',
        title: 'Faith-Led Service',
        text: 'Our faith guides how we serve, love, and care for every client.'
    },
    {
        icon: '♡',
        title: "Care & Compassion",
        text: "We strive to create a welcoming environment where everyone feels seen, valued, and respected."
    },
    {
        icon: '❋',
        title: "Confidence & Beauty",
        text: "We aim to help our clients leave feeling confident, refreshed, and reminded of their God-given beauty."
    }
];

function About() {
    return (
        <section className="about-page">

            {/* Hero Section */}
            <section
                className="about-hero-section"
                style={{ backgroundImage: `url(${Abouthero})` }}
            >
                <div className="about-overlay">
                    <h1 className="about-hero-title">About Us</h1>
                    <p className="about-hero-description">
                        Where passion for hair care meets dedication to excellence
                    </p>
                </div>
            </section>

            {/* About Content Section */}
            <section className="about-section">
                <div className="about-image"></div>

                <div className="about-content">
                    <h2>More Than Just a Salon</h2>

                    <p>
                        Elegant Impressions Beauty Lounge was created from a simple but meaningful
                        vision: to offer beauty services in a space rooted in faith, care, and purpose.
                        Our salon was founded with the belief that beauty goes beyond appearance.
                        We believe every person is intentionally created by God, deserving of care.
                    </p>

                    <p>
                        Every detail of Elegant Impressions has been thoughtfully shaped to reflect
                        peace, elegance, and integrity. Our faith is the foundation of who we are and
                        how we serve. It guides our interactions, our work ethic, and the atmosphere
                        we strive to maintain each day.
                    </p>

                    <div className="about-button">
                        <button>View Our Services</button>
                    </div>
                </div>
            </section>

            {/* Mission Section */}
            <section className="mission-section">
                <div className="mission-content">
                    <h2>Our Mission</h2>
                    <p>
                        Our mission at Elegant Impressions Beauty Lounge is to serve our clients with
                        excellence, kindness, and integrity while creating a peaceful space where
                        faith, beauty, and confidence come together. We are committed to uplifting
                        others and honoring God through the way we work and serve.
                    </p>
                </div>
            </section>

            {/* Values Section */}
            <section className="values-section">
                <h2 className="values-title">Our Values</h2>

                <div className="values-grid">
                    {values.map((value, index) => (
                        <div className="value-card" key={index}>
                            <div className="value-icon">{value.icon}</div>
                            <h3>{value.title}</h3>
                            <p>{value.text}</p>
                        </div>
                    ))}
                </div>
            </section>

            <div className="hero-section">
      <div className="hero-content">
        <h1 className="hero-title">
          Ready to Experience the Difference?
        </h1>
        
        <p className="hero-subtitle">
          Visit our salon and discover why our clients trust us with their most precious
          <br />
          asset — <span className="highlight">their hair</span>.
        </p>

        <div className="hero-buttons">
          <button className="btn primary">
            Book an Appointment
          </button>
          
          <button className="btn secondary">
            Contact Us
          </button>
        </div>
      </div>
    </div>

        </section>
    );
}

export default About;
