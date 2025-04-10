 

import React from 'react';

const AboutUs = () => {
  return (
    <div style={styles.container}>
      <div style={styles.overlay}></div> {/* Overlay as a separate div */}
      <div style={styles.infoContainer}>
        <h2 style={styles.heading}>About Us</h2>
        <h3 style={styles.subHeading}>PREDICT. PLAN. PROSPER - SMARTER WOMEN'S HEALTH 🌿</h3>
        <p style={styles.info}>
          Welcome to <strong>UmbraCare</strong>, your all-in-one Maternal and Menstrual Health Companion. Whether you’re tracking your cycle, navigating pregnancy, embracing motherhood, or managing menopause, we’re here to support, inform, and empower you every step of the way.
        </p>
        <p style={styles.info}>
          Our mission is to provide a Safe, Inclusive, and Scientifically-backed Platform that prioritizes women’s health and well-being. UmbraCare covers a wide range of topics, including Menstruation, Pregnancy, Postpartum Recovery, Fertility, Menopause, and overall Reproductive Health.
        </p>
        <p style={styles.info}>
          We, at UmbraCare, understand that every woman’s journey is unique, which is why our platform offers personalized Tracking, Expert Insights, and a Community-driven Space to help you make informed decisions about your health, driven by women themselves!
        </p>

        <h3 style={styles.subHeading}>✨ What UmbraCare Offers</h3>

        <div style={styles.featureSection}>
          <h4 style={styles.featureTitle}>Pregnancy & Postpartum Tracker</h4>
          <ul style={styles.featureList}>
            <li>Monitor fetal development with weekly updates.</li>
            <li>Receive personalized postpartum recovery tips and reminders.</li>
          </ul>

          <h4 style={styles.featureTitle}>Menopause Insights</h4>
          <ul style={styles.featureList}>
            <li>Track perimenopause and menopause symptoms over time.</li>
            <li>Get expert-backed advice on hormone balance and lifestyle changes.</li>
            <li>Learn about nutrition and exercises that support this phase.</li>
          </ul>

          <h4 style={styles.featureTitle}>Period & Menstrual Health Tracker</h4>
          <ul style={styles.featureList}>
            <li>Predict your next period and track cycle irregularities.</li>
            <li>Get timely reminders to stay prepared for your cycle.</li>
          </ul>

          <h4 style={styles.featureTitle}>IVF & Fertility Tracker</h4>
          <ul style={styles.featureList}>
            <li>Track your ovulation and fertility window with precision.</li>
            <li>Log your IVF cycle progress and check according to your embryo transfer.</li>
          </ul>

          <h4 style={styles.featureTitle}>Smart Notifications & Reminders</h4>
          <ul style={styles.featureList}>
            <li>Receive personalized alerts for upcoming periods, ovulation, fertility windows, and doctor visits.</li>
            <li>Stay updated on hydration, nutrition, and self-care tips.</li>
          </ul>

          <h4 style={styles.featureTitle}>AI-Powered Chatbot</h4>
          <ul style={styles.featureList}>
            <li>A compassionate, 24/7 assistant to answer your health-related queries.</li>
            <li>Covers menstruation, pregnancy, postpartum care, fertility, and menopause.</li>
            <li>Has voice search feature for easy implementation and supports Multi-Language effectively for user's ease.</li>
          </ul>

          <h4 style={styles.featureTitle}>Weekly Wellness Newsletter</h4>
          <ul style={styles.featureList}>
            <li>Stay informed with expert advice on reproductive health, self-care, fitness, and mental well-being.</li>
            <li>Get personalized insights and updates delivered straight to your dashboard.</li>
          </ul>

          <h4 style={styles.featureTitle}>Doctor’s Information (Coming Soon! 🚀)</h4>
          <ul style={styles.featureList}>
            <li>We’re working on a feature that will allow you to connect with trusted gynecologists and healthcare professionals for expert consultations and appointment booking.</li>
          </ul>
        </div>

        <p style={styles.info}>
          At UmbraCare, we believe that your health journey deserves care, precision, and compassion. From the first period to motherhood and beyond, we’re here to make every phase smoother, healthier, and more empowering.
        </p>
        <p style={styles.tagline}>
          🌸 Your Health. Your Journey. Your UmbraCare.
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    fontFamily: "'Poppins', sans-serif",
    padding: '20px', // Matches Newsletter
    paddingTop: '90px', // Matches Newsletter for navbar
    backgroundImage: 'url(/background.jpg)', // Same as Newsletter
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    position: 'relative',
    zIndex: 1,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  
    zIndex: -1,
  },
  infoContainer: {
    width: '100%',
    maxWidth: '1000px', // Slightly smaller than Newsletter's 1200px, but consistent with AboutUs intent
    padding: '40px', // Matches original padding
    
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    position: 'relative',
    zIndex: 2,
    // border: '2px solid #b15870',
    textAlign: 'center',
  },
  heading: {
    fontSize: '28px',
    color: '#B85170',
    marginBottom: '20px',
    fontWeight: '600',
  },
  subHeading: {
    fontSize: '20px',
    color: '#B85170',
    marginBottom: '15px',
    fontWeight: '500',
  },
  info: {
    fontSize: '16px',
    color: '#000000',
    marginBottom: '15px',
    lineHeight: '1.5',
  },
  tagline: {
    fontSize: '18px',
    color: '#B85170',
    fontWeight: '500',
    marginTop: '20px',
  },
  featureSection: {
    textAlign: 'left',
    marginBottom: '20px',
  },
  featureTitle: {
    fontSize: '18px',
    color: '#B85170',
    marginBottom: '10px',
    fontWeight: '500',
  },
  featureList: {
    listStyleType: 'disc',
    paddingLeft: '20px',
    marginBottom: '20px',
    color: '#000000',
  },
};

export default AboutUs;