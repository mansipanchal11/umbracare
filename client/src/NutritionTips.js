// import React from 'react';
// import { Link } from 'react-router-dom';

// const NutritionTips = () => {
//   return (
//     <div style={styles.container}>
//       <div style={styles.content}>
//         <h1 style={styles.mainHeading}>Nutrition Tips for Pregnancy</h1>
        
//         <p style={styles.introText}>
//           Here are some more tips for Nutrition During Pregnancy 🤰
//         </p>

//         <div style={styles.section}>
//           <h2 style={styles.sectionTitle}>🔹 Prioritize Key Nutrients</h2>
//           <ul style={styles.bulletList}>
//             <li><strong>Folic Acid (400 mcg/day):</strong> Helps prevent neural tube defects. Found in leafy greens, beans, and fortified cereals.</li>
//             <li><strong>Iron (27 mg/day):</strong> Prevents anemia and supports oxygen flow. Sources: lean meat, spinach, and lentils.</li>
//             <li><strong>Calcium (1,000 mg/day):</strong> Essential for baby's bone development. Get it from dairy, tofu, and almonds.</li>
//             <li><strong>Protein (75-100g/day):</strong> Fuels fetal growth. Best sources: eggs, fish, poultry, and plant-based proteins.</li>
//           </ul>
//         </div>

//         <div style={styles.section}>
//           <h2 style={styles.sectionTitle}>🔹 Eat a Variety of Nutrient-Rich Foods</h2>
//           <ul style={styles.bulletList}>
//             <li><strong>Leafy Greens & Veggies:</strong> Packed with vitamins and fiber.</li>
//             <li><strong>Fatty Fish (Low-Mercury):</strong> Supports brain development (salmon, sardines).</li>
//             <li><strong>Healthy Fats:</strong> Avocados, nuts, and olive oil improve fetal brain health.</li>
//             <li><strong>Whole Grains:</strong> Brown rice, oats, and quinoa provide sustained energy.</li>
//           </ul>
//         </div>

//         <div style={styles.section}>
//           <h2 style={styles.sectionTitle}>🔹 Foods to Avoid or Limit</h2>
//           <ul style={styles.bulletList}>
//             <li><strong>High-Mercury Fish:</strong> Avoid shark, swordfish, and king mackerel.</li>
//             <li><strong>Unpasteurized Foods:</strong> Risk of infections from soft cheeses and raw dairy.</li>
//             <li><strong>Raw or Undercooked Meats & Eggs:</strong> Prevents foodborne illnesses.</li>
//             <li><strong>Caffeine:</strong> Limit to 200 mg/day (~1 cup of coffee).</li>
//           </ul>
//         </div>

//         <div style={styles.section}>
//           <h2 style={styles.sectionTitle}>🔹 Stay Hydrated & Consider Prenatal Supplements</h2>
//           <ul style={styles.bulletList}>
//             <li><strong>Water is essential</strong> to prevent constipation and urinary tract infections. Aim for 8-10 glasses/day. 🥤</li>
//             <li><strong>Even with a balanced diet,</strong> prenatal vitamins ensure you get enough key nutrients. Consult your doctor for the right supplement.</li>
//           </ul>
//         </div>

//         <div style={styles.section}>
//           <p style={styles.sectionContent}>
//             🌸 <strong>Remember:</strong> Every pregnancy is unique! Prioritize your health & well-being to support your baby’s best start in life.
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

// export default NutritionTips;


import React from 'react';
import { Link } from 'react-router-dom';

const NutritionTips = () => {
  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.mainHeading}>Nutrition Tips for Pregnancy</h1>
        
        <p style={styles.introText}>
          Here are some more tips for Nutrition During Pregnancy 🤰
        </p>

        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>🔹 Prioritize Key Nutrients</h2>
          <ul style={styles.bulletList}>
            <li><strong>Folic Acid (400 mcg/day):</strong> Helps prevent neural tube defects. Found in leafy greens, beans, and fortified cereals.</li>
            <li><strong>Iron (27 mg/day):</strong> Prevents anemia and supports oxygen flow. Sources: lean meat, spinach, and lentils.</li>
            <li><strong>Calcium (1,000 mg/day):</strong> Essential for baby's bone development. Get it from dairy, tofu, and almonds.</li>
            <li><strong>Protein (75-100g/day):</strong> Fuels fetal growth. Best sources: eggs, fish, poultry, and plant-based proteins.</li>
          </ul>
        </div>

        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>🔹 Eat a Variety of Nutrient-Rich Foods</h2>
          <ul style={styles.bulletList}>
            <li><strong>Leafy Greens & Veggies:</strong> Packed with vitamins and fiber.</li>
            <li><strong>Fatty Fish (Low-Mercury):</strong> Supports brain development (salmon, sardines).</li>
            <li><strong>Healthy Fats:</strong> Avocados, nuts, and olive oil improve fetal brain health.</li>
            <li><strong>Whole Grains:</strong> Brown rice, oats, and quinoa provide sustained energy.</li>
          </ul>
        </div>

        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>🔹 Foods to Avoid or Limit</h2>
          <ul style={styles.bulletList}>
            <li><strong>High-Mercury Fish:</strong> Avoid shark, swordfish, and king mackerel.</li>
            <li><strong>Unpasteurized Foods:</strong> Risk of infections from soft cheeses and raw dairy.</li>
            <li><strong>Raw or Undercooked Meats & Eggs:</strong> Prevents foodborne illnesses.</li>
            <li><strong>Caffeine:</strong> Limit to 200 mg/day (~1 cup of coffee).</li>
          </ul>
        </div>

        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>🔹 Stay Hydrated & Consider Prenatal Supplements</h2>
          <ul style={styles.bulletList}>
            <li><strong>Water is essential</strong> to prevent constipation and urinary tract infections. Aim for 8-10 glasses/day. 🥤</li>
            <li><strong>Even with a balanced diet,</strong> prenatal vitamins ensure you get enough key nutrients. Consult your doctor for the right supplement.</li>
          </ul>
        </div>

        <div style={styles.section}>
          <p style={styles.sectionContent}>
            🌸 <strong>Remember:</strong> Every pregnancy is unique! Prioritize your health & well-being to support your baby’s best start in life.
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

export default NutritionTips;