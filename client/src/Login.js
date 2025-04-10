// // client/src/Login.js
// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { Toaster } from "react-hot-toast";
// import { toast } from "react-hot-toast";
// // import "react-hot-toast/dist/react-hot-toast.css";

// const Login = ({ setIsLoggedIn }) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post('http://localhost:5000/api/users/login', { email, password });
//       localStorage.setItem('token', res.data.token);
//       localStorage.setItem('name', JSON.stringify(res.data.user.name));
//       localStorage.setItem('userId', res.data.user.id);
//       localStorage.setItem('userEmail', res.data.user.email);
//       // localStorage.setItem('medicalHistory', res.data.user.medicalHistory || '');
//       // localStorage.setItem('menstrualHistory', res.data.user.menstrualHistory || '');
//       localStorage.setItem('isSubscribed', res.data.user.isSubscribed);
//       console.log(res.data.user.name);
//       setIsLoggedIn(true);
//       toast.custom((t) => (
//         <div
//           style={{
//             animation: t.visible ? 'fadeIn 0.5s ease-out' : 'fadeOut 0.5s ease-in',
//             maxWidth: '400px',
//             width: '100%',
//             backgroundColor: 'white',
//             boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
//             borderRadius: '8px',
//             pointerEvents: 'auto',
//             display: 'flex',
//             border: '1px solid rgba(0, 0, 0, 0.05)'
//           }}
//         >
//           <div style={{ flex: '1 1 0%', width: '0', padding: '16px' }}>
//             <div style={{ display: 'flex', alignItems: 'flex-start' }}>
//               <div style={{ flexShrink: '0', paddingTop: '2px' }}>
//                 <img
//                   style={{ height: '40px', width: '40px', borderRadius: '50%' }}
//                   src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
//                   alt="User avatar"
//                 />
//               </div>
//               <div style={{ marginLeft: '12px', flex: '1 1 0%' }}>
//                 <p style={{ fontSize: '16px', fontWeight: '600', color: '#1f2937' }}>
//                   Welcome back!
//                 </p>
//                 <p style={{ marginTop: '4px', fontSize: '14px', color: '#6b7280' }}>
//                   {`Hello, ${res.data.user.name}. You've successfully logged in.`}
//                 </p>
//               </div>
//             </div>
//           </div>
//           <div style={{ display: 'flex', borderLeft: '1px solid #e5e7eb' }}>
//             <button
//               onClick={() => toast.dismiss(t.id)}
//               style={{
//                 width: '100%',
//                 border: 'none',
//                 borderRadius: '0 8px 8px 0',
//                 padding: '16px',
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 fontSize: '14px',
//                 fontWeight: '500',
//                 color: '#ff8c00',
//                 cursor: 'pointer',
//                 background: 'transparent'
//               }}
//               onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#fff8f0'}
//               onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       ), { duration: 4000 })
//       navigate('/dashboard');
//     } catch (err) {
//       setError(err.response?.data?.msg || 'Login failed');
//       toast.error('Login failed');
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <div style={styles.formContainer}>
//         <h2 style={styles.heading}>Welcome to UmbraCare</h2>
//         <p style={styles.subheading}>Login to continue your maternal health journey</p>
//         {error && <p style={styles.error}>{error}</p>}
//         <form onSubmit={handleSubmit} style={styles.form}>
//           <div style={styles.formGroup}>
//             <label style={styles.label}>Email:</label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               style={styles.input}
//               required
//             />
//           </div>
//           <div style={styles.formGroup}>
//             <label style={styles.label}>Password:</label>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               style={styles.input}
//               required
//             />
//           </div>
//           <button type="submit" style={styles.button}>Login</button>
//         </form>
//         <p style={styles.linkText}>
//           Don't have an account? <Link to="/register" style={styles.link}>Register</Link>
//         </p>
//       </div>
//       <Toaster 
//   position="top-right"
//   reverseOrder={false}
//   toastOptions={{
//     style: {
//       zIndex: 9999,
//     },
//   }}
// />
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
//     background: 'none',
//   },
//   formContainer: {
//     backgroundColor: 'rgba(255, 255, 255, 0.9)', // Increased opacity for better readability
//     padding: '40px',
//     borderRadius: '10px',
//     boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
//     textAlign: 'center',
//     border: '2px solid #ff8c00',
//     width: '100%',
//     maxWidth: '400px',
//   },
//   heading: {
//     fontSize: '28px',
//     color: '#ff8c00',
//     marginBottom: '10px',
//     fontWeight: '600',
//   },
//   subheading: {
//     fontSize: '16px',
//     color: '#666',
//     marginBottom: '20px',
//   },
//   form: {
//     display: 'flex',
//     flexDirection: 'column',
//     gap: '15px',
//   },
//   formGroup: {
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'flex-start',
//     gap: '5px',
//   },
//   label: {
//     fontSize: '16px',
//     color: '#333',
//   },
//   input: {
//     padding: '10px',
//     fontSize: '16px',
//     borderRadius: '5px',
//     border: '1px solid #ccc',
//     width: '100%',
//     boxSizing: 'border-box',
//   },
//   button: {
//     backgroundColor: '#ff8c00',
//     color: '#fff',
//     padding: '10px 20px',
//     fontSize: '16px',
//     border: 'none',
//     borderRadius: '5px',
//     cursor: 'pointer',
//     transition: 'background-color 0.3s',
//   },
//   error: {
//     color: 'red',
//     marginBottom: '15px',
//   },
//   linkText: {
//     marginTop: '15px',
//     fontSize: '14px',
//     color: '#333',
//   },
//   link: {
//     color: '#ff8c00',
//     textDecoration: 'none',
//     fontWeight: 'bold',
//   },
// };

// export default Login;

// client/src/Login.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Toaster } from "react-hot-toast";
import { toast } from "react-hot-toast";

const Login = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/users/login', { email, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('name', JSON.stringify(res.data.user.name));
      localStorage.setItem('userId', res.data.user.id);
      localStorage.setItem('userEmail', res.data.user.email);
      localStorage.setItem('isSubscribed', res.data.user.isSubscribed);
      console.log(res.data.user.name);
      setIsLoggedIn(true);
      toast.custom((t) => (
        <div
          style={{
            animation: t.visible ? 'fadeIn 0.5s ease-out' : 'fadeOut 0.5s ease-in',
            maxWidth: '400px',
            width: '100%',
            backgroundColor: '#FFFFFF',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            borderRadius: '8px',
            pointerEvents: 'auto',
            display: 'flex',
            border: '1px solid rgba(0, 0, 0, 0.05)'
          }}
        >
          <div style={{ flex: '1 1 0%', width: '0', padding: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start' }}>
              <div style={{ flexShrink: '0', paddingTop: '2px' }}>
                <img
                  style={{ height: '40px', width: '40px', borderRadius: '50%' }}
                  src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                  alt="User avatar"
                />
              </div>
              <div style={{ marginLeft: '12px', flex: '1 1 0%' }}>
                <p style={{ fontSize: '16px', fontWeight: '600', color: '#1f2937' }}>
                  Welcome back!
                </p>
                <p style={{ marginTop: '4px', fontSize: '14px', color: '#6b7280' }}>
                  {`Hello, ${res.data.user.name}. You've successfully logged in.`}
                </p>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', borderLeft: '1px solid #e5e7eb' }}>
            <button
              onClick={() => toast.dismiss(t.id)}
              style={{
                width: '100%',
                border: 'none',
                borderRadius: '0 8px 8px 0',
                padding: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px',
                fontWeight: '500',
                color: '#B85170', // Changed from #ff8c00 to primary color
                cursor: 'pointer',
                background: 'transparent'
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#B85170'} // Light pink hover
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              Close
            </button>
          </div>
        </div>
      ), { duration: 4000 });
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.msg || 'Login failed');
      toast.error('Login failed');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h2 style={styles.heading}>Welcome to UmbraCare</h2>
        <p style={styles.subheading}>Login to continue your maternal health journey</p>
        {error && <p style={styles.error}>{error}</p>}
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              required
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              required
            />
          </div>
          <button type="submit" style={styles.button}>Login</button>
        </form>
        <p style={styles.linkText}>
          Don't have an account? <Link to="/register" style={styles.link}>Register</Link>
        </p>
      </div>
      <Toaster 
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          style: {
            zIndex: 9999,
          },
        }}
      />
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
  formContainer: {
    backgroundColor: '#FFFFFF', // Changed to pure white like Newsletter
    padding: '40px',
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    border: '2px solid #B85170', // Changed from #ff8c00 to primary color
    width: '100%',
    maxWidth: '400px',
  },
  heading: {
    fontSize: '28px',
    color: '#B85170', // Changed from #ff8c00 to primary color
    marginBottom: '10px',
    fontWeight: '600',
  },
  subheading: {
    fontSize: '16px',
    color: '#666',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '5px',
  },
  label: {
    fontSize: '16px',
    color: '#B85170', // Changed to secondary color for labels
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    width: '100%',
    boxSizing: 'border-box',
    color: '#000000', // Added to match Newsletter's input text color
  },
  button: {
    backgroundColor: '#B85170', // Changed from #ff8c00 to primary color
    color: '#FFFFFF',
    padding: '10px 20px',
    fontSize: '16px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  error: {
    color: '#FF4D4D', // Changed to a standard red for errors, kept for visibility
    marginBottom: '15px',
  },
  linkText: {
    marginTop: '15px',
    fontSize: '14px',
    color: '#333',
  },
  link: {
    color: '#B85170', // Changed from #ff8c00 to primary color
    textDecoration: 'none',
    fontWeight: 'bold',
  },
};

export default Login;