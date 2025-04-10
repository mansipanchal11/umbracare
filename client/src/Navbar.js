// import React from 'react';
// import { Link, useNavigate, useLocation } from 'react-router-dom';
// import { FaSignOutAlt } from 'react-icons/fa';

// const Navbar = ({ setIsLoggedIn }) => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//     localStorage.removeItem('isLoggedIn');
//     localStorage.removeItem('email');
//     localStorage.removeItem('isSubscribed');
//     localStorage.removeItem('fertilityNews');
//     setIsLoggedIn(false);
//     navigate('/');
//   };

//   // Modified isActive to include /newsletter/fertility-treatments, /newsletter/nutrition-tips, and /newsletter/menstrual-cycle
//   const isActive = (path) => {
//     if (path === '/newsletter') {
//       return (
//         location.pathname === '/newsletter' ||
//         location.pathname === '/newsletter/fertility-treatments' ||
//         location.pathname === '/newsletter/nutrition-tips' ||
//         location.pathname === '/newsletter/menstrual-cycle'
//       );
//     }
//     return location.pathname === path;
//   };

//   return (
//     <nav style={styles.navbar}>
//       <Link to="/dashboard" style={styles.logo}>
//         <img src="/logo192.png" alt="UmbraCare Logo" style={styles.logoImg} />
//       </Link>
//       <div style={styles.navLinks}>
//         <Link to="/dashboard" style={{ ...styles.navLink, ...(isActive('/dashboard') ? styles.activeLink : {}) }}>Home</Link>
//         <Link to="/pregnancy-postpartum-tracker" style={{ ...styles.navLink, ...(isActive('/pregnancy-postpartum-tracker') ? styles.activeLink : {}) }}>Pregnancy & Postpartum Tracker</Link>
//         <Link to="/period-tracker" style={{ ...styles.navLink, ...(isActive('/period-tracker') ? styles.activeLink : {}) }}>Period Tracker</Link>
//         <Link to="/ivf-tracker" style={{ ...styles.navLink, ...(isActive('/ivf-tracker') ? styles.activeLink : {}) }}>IVF Tracker</Link>
//         <Link to="/doctor-info" style={{ ...styles.navLink, ...(isActive('/doctor-info') ? styles.activeLink : {}) }}>Doctor Info</Link>
//         <Link to="/notifications" style={{ ...styles.navLink, ...(isActive('/notifications') ? styles.activeLink : {}) }}>Notifications</Link>
//         <Link to="/profile" style={{ ...styles.navLink, ...(isActive('/profile') ? styles.activeLink : {}) }}>Profile</Link>
//         <Link to="/about" style={{ ...styles.navLink, ...(isActive('/about') ? styles.activeLink : {}) }}>About Us</Link>
//         <Link to="/newsletter" style={{ ...styles.navLink, ...(isActive('/newsletter') ? styles.activeLink : {}) }}>Newsletter</Link>
//         <button onClick={handleLogout} style={styles.logoutButton}><FaSignOutAlt style={{ marginRight: '5px' }} /> Logout</button>
//       </div>
//     </nav>
//   );
// };

// const styles = {
//   navbar: { 
//     display: 'flex', 
//     justifyContent: 'space-between', 
//     alignItems: 'center', 
//     padding: '10px 30px', 
//     backgroundColor: '#ff8c00', 
//     color: '#fff', 
//     boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)', 
//     position: 'fixed', 
//     top: 0, 
//     width: '100%', 
//     zIndex: 1000, 
//     boxSizing: 'border-box',
//     height: '90px',
//   },
//   logo: { 
//     fontSize: '24px', 
//     fontWeight: 'bold', 
//     color: '#fff', 
//     textDecoration: 'none', 
//     display: 'flex', 
//     alignItems: 'center' 
//   },
//   logoImg: { 
//     width: '70px',
//     height: '70px',
//     marginRight: '25px',
//     boxShadow: '0 0 10px rgba(255, 255, 255, 0.8)',
//   },
//   navLinks: { 
//     display: 'flex', 
//     alignItems: 'center', 
//     gap: '20px' 
//   },
//   navLink: { 
//     color: '#fff', 
//     textDecoration: 'none', 
//     fontSize: '16px', 
//     transition: 'color 0.3s, background-color 0.3s', 
//     padding: '5px 10px', 
//     borderRadius: '5px' 
//   },
//   activeLink: { 
//     backgroundColor: '#fff', 
//     color: '#ff8c00' 
//   },
//   logoutButton: { 
//     display: 'flex', 
//     alignItems: 'center', 
//     backgroundColor: '#fff', 
//     color: '#ff8c00', 
//     padding: '8px 15px', 
//     border: 'none', 
//     borderRadius: '5px', 
//     cursor: 'pointer', 
//     fontSize: '16px', 
//     transition: 'background-color 0.3s' 
//   },
// };

// export default Navbar;


import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaSignOutAlt } from 'react-icons/fa';

const Navbar = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('email');
    localStorage.removeItem('isSubscribed');
    localStorage.removeItem('fertilityNews');
    setIsLoggedIn(false);
    navigate('/');
  };

  const isActive = (path) => {
    if (path === '/newsletter') {
      return (
        location.pathname === '/newsletter' ||
        location.pathname === '/newsletter/fertility-treatments' ||
        location.pathname === '/newsletter/nutrition-tips' ||
        location.pathname === '/newsletter/menstrual-cycle'
      );
    }
    return location.pathname === path;
  };

  return (
    <nav style={styles.navbar}>
      <Link to="/dashboard" style={styles.logo}>
        <img src="/logo192.png" alt="UmbraCare Logo" style={styles.logoImg} />
      </Link>
      <div style={styles.navLinks}>
        <Link to="/dashboard" style={{ ...styles.navLink, ...(isActive('/dashboard') ? styles.activeLink : {}) }}>Home</Link>
        <Link to="/pregnancy-postpartum-tracker" style={{ ...styles.navLink, ...(isActive('/pregnancy-postpartum-tracker') ? styles.activeLink : {}) }}>Pregnancy & Postpartum Tracker</Link>
        <Link to="/period-tracker" style={{ ...styles.navLink, ...(isActive('/period-tracker') ? styles.activeLink : {}) }}>Period Tracker</Link>
        <Link to="/ivf-tracker" style={{ ...styles.navLink, ...(isActive('/ivf-tracker') ? styles.activeLink : {}) }}>IVF Tracker</Link>
        <Link to="/doctor-info" style={{ ...styles.navLink, ...(isActive('/doctor-info') ? styles.activeLink : {}) }}>Doctor Info</Link>
        <Link to="/notifications" style={{ ...styles.navLink, ...(isActive('/notifications') ? styles.activeLink : {}) }}>Notifications</Link>
        <Link to="/profile" style={{ ...styles.navLink, ...(isActive('/profile') ? styles.activeLink : {}) }}>Profile</Link>
        <Link to="/about" style={{ ...styles.navLink, ...(isActive('/about') ? styles.activeLink : {}) }}>About Us</Link>
        <Link to="/newsletter" style={{ ...styles.navLink, ...(isActive('/newsletter') ? styles.activeLink : {}) }}>Newsletter</Link>
        <Link to="/feedback" style={{ ...styles.navLink, ...(isActive('/feedback') ? styles.activeLink : {}) }}>Feedback</Link>
        <button onClick={handleLogout} style={styles.logoutButton}><FaSignOutAlt style={{ marginRight: '5px' }} /> Logout</button>
      </div>
    </nav>
  );
};

const styles = {
  navbar: { 
    display: 'flex', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    padding: '10px 30px', 
    backgroundColor: '#b15870', 
    color: '#fff', 
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)', 
    position: 'fixed', 
    top: 0, 
    width: '100%', 
    zIndex: 1000, 
    boxSizing: 'border-box',
    height: '90px',
  },
  logo: { 
    fontSize: '24px', 
    fontWeight: 'bold', 
    color: '#fff', 
    textDecoration: 'none', 
    display: 'flex', 
    alignItems: 'center' 
  },
  logoImg: { 
    width: '70px',
    height: '70px',
    marginRight: '25px',
    boxShadow: '0 0 10px rgba(255, 255, 255, 0.8)',
  },
  navLinks: { 
    display: 'flex', 
    alignItems: 'center', 
    gap: '20px' 
  },
  navLink: { 
    color: '#fff', 
    textDecoration: 'none', 
    fontSize: '16px', 
    transition: 'color 0.3s, background-color 0.3s', 
    padding: '5px 10px', 
    borderRadius: '5px' 
  },
  activeLink: { 
    backgroundColor: '#fff', 
    color: '#b15870' 
  },
  logoutButton: { 
    display: 'flex', 
    alignItems: 'center', 
    backgroundColor: '#fff', 
    color: '#b15870', 
    padding: '8px 15px', 
    border: 'none', 
    borderRadius: '5px', 
    cursor: 'pointer', 
    fontSize: '16px', 
    transition: 'background-color 0.3s' 
  },
};

export default Navbar;