// // client/src/Layout.js
// import React from 'react';
// import Navbar from './Navbar';
// import Chatbot from './Chatbot';
// import backgroundImage from './background.jpg';

// const Layout = ({ children, setIsLoggedIn }) => {
//   return (
//     <div style={styles.container}>
//       <Navbar setIsLoggedIn={setIsLoggedIn} />
//       <div style={styles.content}>{children}</div>
//       <Chatbot />
//     </div>
//   );
// };

// const styles = {
//   container: {
//     minHeight: '100vh',
//     backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url(${backgroundImage})`,
//     backgroundSize: 'cover',
//     backgroundPosition: '40% 60%',
//     backgroundRepeat: 'no-repeat',
//     fontFamily: "'Poppins', sans-serif",
//     boxSizing: 'border-box',
//   },
//   content: {
//     padding: '20px',
//     paddingTop: '80px',
//   },
// };

// export default Layout;


// client/src/Layout.js
import React from 'react';
import Navbar from './Navbar';
import Chatbot from './Chatbot';
import backgroundImage from './background.jpg';

const Layout = ({ children, setIsLoggedIn }) => {
  return (
    <div style={styles.container}>
      <Navbar setIsLoggedIn={setIsLoggedIn} />
      <div style={styles.content}>{children}</div>
      <Chatbot />
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    backgroundImage: `url(${backgroundImage})`, // Simplified to match Newsletter
    backgroundSize: 'cover',
    backgroundPosition: 'center', // Adjusted to match Newsletter
    backgroundRepeat: 'no-repeat',
    fontFamily: "'Poppins', sans-serif",
    boxSizing: 'border-box',
    position: 'relative', // Added for overlay positioning
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
    padding: '20px',
    paddingTop: '90px', // Adjusted to match Newsletter's paddingTop
  },
};

export default Layout;