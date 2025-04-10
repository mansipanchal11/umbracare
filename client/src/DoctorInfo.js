// // client/src/DoctorInfo.js
// import React from 'react';

// const DoctorInfo = () => {
//   return (
//     <div style={styles.container}>
//       <div style={styles.infoContainer}>
//         <h2 style={styles.heading}>Doctor Info</h2>
//         <p style={styles.info}>
//           Find information about gynecologists and nutritionists. This feature is coming soon!
//         </p>
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
//     boxSizing: 'border-box',
//   },
//   infoContainer: {
//     backgroundColor: 'rgba(255, 255, 255, 0.9)',
//     padding: '40px',
//     borderRadius: '10px',
//     boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
//     textAlign: 'center',
//     border: '2px solid #ff8c00',
//     width: '100%',
//     maxWidth: '600px',
//   },
//   heading: {
//     fontSize: '28px',
//     color: '#ff8c00',
//     marginBottom: '20px',
//     fontWeight: '600',
//   },
//   info: {
//     fontSize: '16px',
//     color: '#333',
//   },
// };

// export default DoctorInfo;



import React from 'react';

const DoctorInfo = () => {
  return (
    <div style={styles.container}>
      <div style={styles.overlay}></div> {/* Added overlay div */}
      <div style={styles.infoContainer}>
        <h2 style={styles.heading}>Doctor Info</h2>
        <p style={styles.info}>
          Find information about gynecologists and nutritionists. This feature is coming soon!
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
    boxSizing: 'border-box',
    paddingTop: '90px', // Added to match other components with navbar
    backgroundImage: 'url(/background.jpg)', // Added background image
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
    backgroundColor: 'rgba(253, 232, 233, 0.7)', // Light pink overlay with 70% opacity
    zIndex: -1,
  },
  infoContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)', // Changed to pure white to match others
    backdropFilter: 'blur(5px)', // Optional: adds a slight blur effect for better readability
    padding: '40px',
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    border: '2px solid #B15870', // Changed from #ff8c00
    width: '100%',
    maxWidth: '600px',
    position: 'relative',
    zIndex: 2,
  },
  heading: {
    fontSize: '28px',
    color: '#B85170', // Changed from #ff8c00
    marginBottom: '20px',
    fontWeight: '600',
  },
  info: {
    fontSize: '16px',
    color: '#000000', // Changed from #333 to match other components
  },
};

export default DoctorInfo;