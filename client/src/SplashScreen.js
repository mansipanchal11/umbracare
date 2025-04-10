// import React from 'react';

// const SplashScreen = () => {
//   return (
//     <div style={styles.container}>
//       <img src="/logo192.png" alt="UmbraCare Logo" style={styles.logo} />
//       <div style={styles.loader}></div>
//     </div>
//   );
// };

// const styles = {
//   container: {
//     display: 'flex',
//     flexDirection: 'column',
//     justifyContent: 'center',
//     alignItems: 'center',
//     height: '100vh',
//     backgroundColor: '#ff8c00',
//   },
//   logo: {
//     width: '200px', // Increased from 150px to 200px
//     height: '200px', // Increased from 150px to 200px
//     marginBottom: '20px',
//     boxShadow: '0 0 20px rgba(255, 255, 255, 0.8)', // Glow effect for highlighting
//     // Removed borderRadius: '50%' to keep it square
//   },
//   loader: {
//     marginTop: '20px',
//     width: '40px',
//     height: '40px',
//     border: '5px solid #fff',
//     borderTop: '5px solid transparent',
//     borderRadius: '50%',
//     animation: 'spin 1s linear infinite',
//   },
// };

// const keyframes = `
//   @keyframes spin {
//     0% { transform: rotate(0deg); }
//     100% { transform: rotate(360deg); }
//   }
// `;

// const styleSheet = document.createElement("style");
// styleSheet.type = "text/css";
// styleSheet.innerText = keyframes;
// document.head.appendChild(styleSheet);

// export default SplashScreen;


import React from 'react';

const SplashScreen = () => {
  return (
    <div style={styles.container}>
      <img src="/logo192.png" alt="UmbraCare Logo" style={styles.logo} />
      <div style={styles.loader}></div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#B85170', // Changed from #ff8c00 to primary color
  },
  logo: {
    width: '200px',
    height: '200px',
    marginBottom: '20px',
    boxShadow: '0 0 20px rgba(255, 255, 255, 0.8)', // Kept glow effect
  },
  loader: {
    marginTop: '20px',
    width: '40px',
    height: '40px',
    border: '5px solid #FFFFFF', // Kept white for contrast
    borderTop: '5px solid transparent',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
};

const keyframes = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = keyframes;
document.head.appendChild(styleSheet);

export default SplashScreen;