// import React from 'react';
// import { Link } from 'react-router-dom';

// const MenstrualCycle = () => {
//   return (
//     <div style={styles.container}>
//       <div style={styles.content}>
//         <h1 style={styles.mainHeading}>Understanding Your Menstrual Cycle</h1>
        
//         <p style={styles.introText}>
//           Your menstrual cycle is more than just your period – it’s a vital indicator of your reproductive and overall health. Understanding it helps with tracking ovulation, managing symptoms, and improving fertility awareness. Here are some information for Understanding Your Menstrual Cycle.
//         </p>

//         <div style={styles.section}>
//           <h2 style={styles.sectionTitle}>🔹 The Four Phases of the Menstrual Cycle</h2>
//           <ul style={styles.bulletList}>
//             <li><strong>1. Menstrual Phase (Days 1-5):</strong> 🩸 The shedding of the uterine lining (your period).<br />Symptoms: Cramps, fatigue, bloating.</li>
//             <li><strong>2. Follicular Phase (Days 1-13):</strong> 🌱 Estrogen levels rise, and an egg matures in the ovary.<br />Best time for energy & focus! Studies show that women may have better endurance and strength during this phase.</li>
//             <li><strong>3. Ovulation Phase (Day 14, varies):</strong> 🌟 The fertile window when the ovary releases an egg.<br />Best time to conceive! The egg survives for 12-24 hours, and sperm can live for 3-5 days in the reproductive tract.</li>
//             <li><strong>4. Luteal Phase (Days 15-28):</strong> 🌙 Progesterone rises to prepare for pregnancy. If no fertilization occurs, hormone levels drop, triggering the next period.<br />Common symptoms: Mood swings, cravings, bloating (PMS). 80-90% of women experience some form of PMS, with 5-8% having severe symptoms (PMDD).</li>
//           </ul>
//         </div>

//         <div style={styles.section}>
//           <h2 style={styles.sectionTitle}>🔹 Tracking Your Cycle for Better Health</h2>
//           <p style={styles.sectionContent}><strong>Why Track?</strong></p>
//           <ul style={styles.bulletList}>
//             <li>✅ Identify irregular cycles 🛑</li>
//             <li>✅ Predict fertile days for pregnancy planning 🤰</li>
//             <li>✅ Spot hormonal imbalances early 🏥</li>
//           </ul>
//           <p style={styles.sectionContent}>A normal cycle length ranges from 21-35 days, but 1 in 4 women experiences irregular cycles.</p>
//           <p style={styles.sectionContent}><strong>How to Track?</strong></p>
//           <ul style={styles.bulletList}>
//             <li>📅 Use a UmbraCare 📲</li>
//             <li>💗 Monitor your start date, symptoms, & next cycle dates. 🩸</li>
//             <li>💡 Look for patterns in cycle length and never worry about your period cycle reminders again!</li>
//           </ul>
//         </div>

//         <div style={styles.section}>
//           <h2 style={styles.sectionTitle}>🔹 Supporting Your Cycle with Nutrition</h2>
//           <ul style={styles.bulletList}>
//             <li><strong>Iron-rich foods:</strong> Prevents fatigue & anemia (spinach, lentils, red meat). 🍎</li>
//             <li><strong>Healthy fats:</strong> Supports hormone balance (avocados, nuts, salmon). 🥑</li>
//             <li><strong>Hydration:</strong> Reduces bloating & cramps (drink at least 8 glasses/day). 💧</li>
//           </ul>
//           <p style={styles.sectionContent}>Research suggests magnesium & vitamin B6 can help ease PMS symptoms.</p>
//         </div>

//         <div style={styles.section}>
//           <h2 style={styles.sectionTitle}>🔹 When to See a Doctor?</h2>
//           <p style={styles.sectionContent}>⚠ Consult a doctor if you experience:</p>
//           <ul style={styles.bulletList}>
//             <li>Cycles shorter than 21 days or longer than 35 days.</li>
//             <li>Extremely heavy bleeding (soaking a pad/tampon every 1-2 hours).</li>
//             <li>Severe pain that disrupts daily life.</li>
//             <li>Missed periods for 3+ months (not due to pregnancy).</li>
//           </ul>
//           <p style={styles.sectionContent}>Irregular cycles can be linked to PCOS, thyroid disorders, or stress-related hormonal imbalances.</p>
//         </div>

//         <div style={styles.section}>
//           <p style={styles.sectionContent}>
//             💖 Your menstrual cycle is unique! Tracking and understanding it helps you take control of your reproductive health. Stay informed & listen to your body.
//           </p>
//           <p style={styles.sectionContent}>
//             Stay tuned for more insights on maternal health, fertility, and period tracking right here! 🌸✨
//           </p>
//           <p style={styles.signature}>
//             Love & Care,<br />
//             Team UmbraCare
//           </p>
//         </div>

//         <div style={styles.backButtonContainer}>
//           <Link to="/newsletter">
//             <button style={styles.backButton}>Back to Newsletter</button>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// const styles = {
//   container: {
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     minHeight: '100vh',
//     fontFamily: "'Poppins', sans-serif",
//     padding: '20px',
//     paddingTop: '90px',
//   },
//   content: {
//     width: '100%',
//     maxWidth: '1000px', // Matches AboutUs.js
//     padding: '30px',
//     backgroundColor: 'rgba(255, 255, 255, 0.95)',
//     borderRadius: '10px',
//     boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
//   },
//   mainHeading: {
//     fontSize: '36px',
//     color: '#ff8c00',
//     textAlign: 'center',
//     marginBottom: '30px',
//     fontWeight: '600',
//   },
//   introText: {
//     fontSize: '16px',
//     color: '#555',
//     textAlign: 'center',
//     marginBottom: '30px',
//     lineHeight: '1.6',
//   },
//   section: {
//     marginBottom: '30px',
//   },
//   sectionTitle: {
//     fontSize: '24px',
//     color: '#ff8c00',
//     marginBottom: '15px',
//     fontWeight: '600',
//   },
//   sectionContent: {
//     fontSize: '16px',
//     color: '#555',
//     lineHeight: '1.6',
//     marginBottom: '15px',
//   },
//   bulletList: {
//     listStyleType: 'disc',
//     paddingLeft: '25px',
//     marginBottom: '20px',
//     color: '#555',
//     fontSize: '16px',
//     lineHeight: '1.6',
//   },
//   signature: {
//     fontSize: '16px',
//     color: '#ff8c00',
//     textAlign: 'center',
//     marginTop: '30px',
//     lineHeight: '1.5',
//     fontWeight: '600',
//   },
//   backButtonContainer: {
//     display: 'flex',
//     justifyContent: 'center',
//     marginTop: '40px',
//   },
//   backButton: {
//     backgroundColor: '#ff8c00',
//     color: 'white',
//     border: 'none',
//     padding: '12px 20px',
//     borderRadius: '5px',
//     cursor: 'pointer',
//     fontSize: '16px',
//     fontWeight: 'bold',
//     transition: 'background-color 0.3s',
//   },
// };

// export default MenstrualCycle;

import React from 'react';
import { Link } from 'react-router-dom';

const MenstrualCycle = () => {
  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.mainHeading}>Understanding Your Menstrual Cycle</h1>
        
        <p style={styles.introText}>
          Your menstrual cycle is more than just your period – it’s a vital indicator of your reproductive and overall health. Understanding it helps with tracking ovulation, managing symptoms, and improving fertility awareness. Here are some information for Understanding Your Menstrual Cycle.
        </p>

        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>🔹 The Four Phases of the Menstrual Cycle</h2>
          <ul style={styles.bulletList}>
            <li><strong>1. Menstrual Phase (Days 1-5):</strong> 🩸 The shedding of the uterine lining (your period).<br />Symptoms: Cramps, fatigue, bloating.</li>
            <li><strong>2. Follicular Phase (Days 1-13):</strong> 🌱 Estrogen levels rise, and an egg matures in the ovary.<br />Best time for energy & focus! Studies show that women may have better endurance and strength during this phase.</li>
            <li><strong>3. Ovulation Phase (Day 14, varies):</strong> 🌟 The fertile window when the ovary releases an egg.<br />Best time to conceive! The egg survives for 12-24 hours, and sperm can live for 3-5 days in the reproductive tract.</li>
            <li><strong>4. Luteal Phase (Days 15-28):</strong> 🌙 Progesterone rises to prepare for pregnancy. If no fertilization occurs, hormone levels drop, triggering the next period.<br />Common symptoms: Mood swings, cravings, bloating (PMS). 80-90% of women experience some form of PMS, with 5-8% having severe symptoms (PMDD).</li>
          </ul>
        </div>

        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>🔹 Tracking Your Cycle for Better Health</h2>
          <p style={styles.sectionContent}><strong>Why Track?</strong></p>
          <ul style={styles.bulletList}>
            <li>✅ Identify irregular cycles 🛑</li>
            <li>✅ Predict fertile days for pregnancy planning 🤰</li>
            <li>✅ Spot hormonal imbalances early 🏥</li>
          </ul>
          <p style={styles.sectionContent}>A normal cycle length ranges from 21-35 days, but 1 in 4 women experiences irregular cycles.</p>
          <p style={styles.sectionContent}><strong>How to Track?</strong></p>
          <ul style={styles.bulletList}>
            <li>📅 Use a UmbraCare 📲</li>
            <li>💗 Monitor your start date, symptoms, & next cycle dates. 🩸</li>
            <li>💡 Look for patterns in cycle length and never worry about your period cycle reminders again!</li>
          </ul>
        </div>

        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>🔹 Supporting Your Cycle with Nutrition</h2>
          <ul style={styles.bulletList}>
            <li><strong>Iron-rich foods:</strong> Prevents fatigue & anemia (spinach, lentils, red meat). 🍎</li>
            <li><strong>Healthy fats:</strong> Supports hormone balance (avocados, nuts, salmon). 🥑</li>
            <li><strong>Hydration:</strong> Reduces bloating & cramps (drink at least 8 glasses/day). 💧</li>
          </ul>
          <p style={styles.sectionContent}>Research suggests magnesium & vitamin B6 can help ease PMS symptoms.</p>
        </div>

        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>🔹 When to See a Doctor?</h2>
          <p style={styles.sectionContent}>⚠ Consult a doctor if you experience:</p>
          <ul style={styles.bulletList}>
            <li>Cycles shorter than 21 days or longer than 35 days.</li>
            <li>Extremely heavy bleeding (soaking a pad/tampon every 1-2 hours).</li>
            <li>Severe pain that disrupts daily life.</li>
            <li>Missed periods for 3+ months (not due to pregnancy).</li>
          </ul>
          <p style={styles.sectionContent}>Irregular cycles can be linked to PCOS, thyroid disorders, or stress-related hormonal imbalances.</p>
        </div>

        <div style={styles.section}>
          <p style={styles.sectionContent}>
            💖 Your menstrual cycle is unique! Tracking and understanding it helps you take control of your reproductive health. Stay informed & listen to your body.
          </p>
          <p style={styles.sectionContent}>
            Stay tuned for more insights on maternal health, fertility, and period tracking right here! 🌸✨
          </p>
          <p style={styles.signature}>
            Love & Care,<br />
            Team UmbraCare
          </p>
        </div>

        <div style={styles.backButtonContainer}>
          <Link to="/newsletter">
            <button style={styles.backButton}>Back to Newsletter</button>
          </Link>
        </div>
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
    padding: '20px',
    paddingTop: '90px',
    backgroundImage: 'url(/background.jpg)', // Added from Newsletter
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    position: 'relative',
    zIndex: 1,
    '::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(253, 232, 233, 0.7)', // Light pink overlay from Newsletter
      zIndex: -1,
    }
  },
  content: {
    width: '100%',
    maxWidth: '1000px',
    padding: '30px',
    backgroundColor: '#FFFFFF', // Changed to pure white like Newsletter
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
  },
  mainHeading: {
    fontSize: '36px',
    color: '#B85170', // Changed from #ff8c00 to primary color
    textAlign: 'center',
    marginBottom: '30px',
    fontWeight: '600',
  },
  introText: {
    fontSize: '16px',
    color: '#555',
    textAlign: 'center',
    marginBottom: '30px',
    lineHeight: '1.6',
  },
  section: {
    marginBottom: '30px',
  },
  sectionTitle: {
    fontSize: '24px',
    color: '#B85170', // Changed from #ff8c00 to primary color
    marginBottom: '15px',
    fontWeight: '600',
  },
  sectionContent: {
    fontSize: '16px',
    color: '#555',
    lineHeight: '1.6',
    marginBottom: '15px',
  },
  bulletList: {
    listStyleType: 'disc',
    paddingLeft: '25px',
    marginBottom: '20px',
    color: '#555',
    fontSize: '16px',
    lineHeight: '1.6',
  },
  signature: {
    fontSize: '16px',
    color: '#B85170', // Changed from #ff8c00 to primary color
    textAlign: 'center',
    marginTop: '30px',
    lineHeight: '1.5',
    fontWeight: '600',
  },
  backButtonContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '40px',
  },
  backButton: {
    backgroundColor: '#B85170', // Changed from #ff8c00 to primary color
    color: '#FFFFFF',
    border: 'none',
    padding: '12px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
    transition: 'background-color 0.3s',
  },
};

export default MenstrualCycle;