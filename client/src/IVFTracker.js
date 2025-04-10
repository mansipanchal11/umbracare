// // client/src/IVFTracker.js
// import React, { useState } from 'react';
// import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';
// import { FaCalendarAlt } from 'react-icons/fa';

// const IVFTracker = () => {
//   const [transferDate, setTransferDate] = useState(new Date('2025-03-22')); // Default to 22nd March 2025
//   const [showTransferCalendar, setShowTransferCalendar] = useState(false);
//   const [transferType, setTransferType] = useState('');
//   const [result, setResult] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!transferDate || !transferType) {
//       setResult('Please select a transfer date and type.');
//       return;
//     }

//     const today = new Date('2025-03-22'); // Current date for calculation (can be dynamic: new Date())
//     const diffTime = Math.abs(today - transferDate);
//     const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

//     let pregnancyDuration = '';
//     if (transferType === 'day3') {
//       const totalDays = diffDays + 17; // 2 weeks 3 days = 17 days
//       const weeks = Math.floor(totalDays / 7);
//       const days = totalDays % 7;
//       pregnancyDuration = `${weeks} weeks and ${days} days`;
//     } else if (transferType === 'day5') {
//       const totalDays = diffDays + 19; // 2 weeks 5 days = 19 days
//       const weeks = Math.floor(totalDays / 7);
//       const days = totalDays % 7;
//       pregnancyDuration = `${weeks} weeks and ${days} days`;
//     } else if (transferType === 'eggRetrieval') {
//       const totalDays = diffDays + 14; // 2 weeks = 14 days
//       const weeks = Math.floor(totalDays / 7);
//       const days = totalDays % 7;
//       pregnancyDuration = `${weeks} weeks and ${days} days`;
//     }

//     setResult(`Based on your transfer date (${transferDate.toDateString()}) and type (${transferType === 'day3' ? 'Day 3 Embryo Transfer' : transferType === 'day5' ? 'Day 5 Embryo Transfer' : 'Day of Egg Retrieval'}), you are pregnant for ${pregnancyDuration}.`);
//   };

//   return (
//     <div style={styles.container}>
//       <div style={styles.trackerContainer}>
//         <h2 style={styles.heading}>IVF Tracker</h2>
//         <form onSubmit={handleSubmit} style={styles.form}>
//           <div style={styles.formGroup}>
//             <label style={styles.label}>Date of Transfer:</label>
//             <div style={styles.calendarInputContainer}>
//               <input
//                 type="text"
//                 value={transferDate.toDateString()}
//                 readOnly
//                 style={styles.input}
//                 placeholder="Select transfer date"
//               />
//               <FaCalendarAlt
//                 style={styles.calendarIcon}
//                 onClick={() => setShowTransferCalendar(!showTransferCalendar)}
//               />
//             </div>
//             {showTransferCalendar && (
//               <Calendar
//                 onChange={(date) => {
//                   setTransferDate(date);
//                   setShowTransferCalendar(false);
//                 }}
//                 value={transferDate}
//                 style={styles.calendar}
//               />
//             )}
//           </div>
//           <div style={styles.formGroup}>
//             <label style={styles.label}>Type of Transfer:</label>
//             <select
//               value={transferType}
//               onChange={(e) => setTransferType(e.target.value)}
//               style={styles.input}
//               required
//             >
//               <option value="">Select type</option>
//               <option value="day3">Day 3 Embryo Transfer</option>
//               <option value="day5">Day 5 Embryo Transfer</option>
//               <option value="eggRetrieval">Day of Egg Retrieval</option>
//             </select>
//           </div>
//           <button type="submit" style={styles.button}>Calculate</button>
//         </form>
//         {result && <p style={styles.result}>{result}</p>}
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
//   trackerContainer: {
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
//   calendar: {
//     width: '100%',
//     border: '1px solid #ccc',
//     borderRadius: '5px',
//   },
//   calendarInputContainer: {
//     position: 'relative',
//     width: '100%',
//   },
//   calendarIcon: {
//     position: 'absolute',
//     right: '10px',
//     top: '50%',
//     transform: 'translateY(-50%)',
//     fontSize: '20px',
//     color: '#ff8c00',
//     cursor: 'pointer',
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
//   result: {
//     marginTop: '20px',
//     fontSize: '16px',
//     color: '#333',
//   },
// };

// export default IVFTracker;


// client/src/IVFTracker.js
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { FaCalendarAlt } from 'react-icons/fa';

const IVFTracker = () => {
  const [transferDate, setTransferDate] = useState(new Date('2025-03-22')); // Default to 22nd March 2025
  const [showTransferCalendar, setShowTransferCalendar] = useState(false);
  const [transferType, setTransferType] = useState('');
  const [result, setResult] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!transferDate || !transferType) {
      setResult('Please select a transfer date and type.');
      return;
    }

    const today = new Date('2025-03-22'); // Current date for calculation (can be dynamic: new Date())
    const diffTime = Math.abs(today - transferDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    let pregnancyDuration = '';
    if (transferType === 'day3') {
      const totalDays = diffDays + 17; // 2 weeks 3 days = 17 days
      const weeks = Math.floor(totalDays / 7);
      const days = totalDays % 7;
      pregnancyDuration = `${weeks} weeks and ${days} days`;
    } else if (transferType === 'day5') {
      const totalDays = diffDays + 19; // 2 weeks 5 days = 19 days
      const weeks = Math.floor(totalDays / 7);
      const days = totalDays % 7;
      pregnancyDuration = `${weeks} weeks and ${days} days`;
    } else if (transferType === 'eggRetrieval') {
      const totalDays = diffDays + 14; // 2 weeks = 14 days
      const weeks = Math.floor(totalDays / 7);
      const days = totalDays % 7;
      pregnancyDuration = `${weeks} weeks and ${days} days`;
    }

    setResult(`Based on your transfer date (${transferDate.toDateString()}) and type (${transferType === 'day3' ? 'Day 3 Embryo Transfer' : transferType === 'day5' ? 'Day 5 Embryo Transfer' : 'Day of Egg Retrieval'}), you are pregnant for ${pregnancyDuration}.`);
  };

  return (
    <div style={styles.container}>
      <div style={styles.trackerContainer}>
        <h2 style={styles.heading}>IVF Tracker</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.transferLabel}>Date of Transfer:</label>
            <div style={styles.calendarInputContainer}>
              <input
                type="text"
                value={transferDate.toDateString()}
                readOnly
                style={styles.input}
                placeholder="Select transfer date"
              />
              <FaCalendarAlt
                style={styles.calendarIcon}
                onClick={() => setShowTransferCalendar(!showTransferCalendar)}
              />
            </div>
            {showTransferCalendar && (
              <Calendar
                onChange={(date) => {
                  setTransferDate(date);
                  setShowTransferCalendar(false);
                }}
                value={transferDate}
                style={styles.calendar}
              />
            )}
          </div>
          <div style={styles.formGroup}>
            <label style={styles.transferLabel}>Type of Transfer:</label>
            <select
              value={transferType}
              onChange={(e) => setTransferType(e.target.value)}
              style={styles.input}
              required
            >
              <option value="">Select type</option>
              <option value="day3">Day 3 Embryo Transfer</option>
              <option value="day5">Day 5 Embryo Transfer</option>
              <option value="eggRetrieval">Day of Egg Retrieval</option>
            </select>
          </div>
          <button type="submit" style={styles.button}>Calculate</button>
        </form>
        {result && <p style={styles.result}>{result}</p>}
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
    backgroundImage: 'url(/background.jpg)', // Reference from public folder
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
      backgroundColor: 'rgba(253, 232, 233, 0.7)', // Light pink overlay
      zIndex: -1,
    }
  },
  trackerContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)', // Added transparency to the background
    backdropFilter: 'blur(5px)', // Optional: adds a slight blur effect for better readability
    padding: '40px',
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    border: '2px solid #B85170',
    width: '100%',
    maxWidth: '600px',
  },
  heading: {
    fontSize: '28px',
    color: '#B85170',
    marginBottom: '20px',
    fontWeight: '600',
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
  transferLabel: {
    fontSize: '16px',
    color: '#B85170', // Changed to match your request
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ddd',
    width: '100%',
    boxSizing: 'border-box',
    color: '#000000',
  },
  calendar: {
    width: '100%',
    border: '1px solid #ddd',
    borderRadius: '5px',
  },
  calendarInputContainer: {
    position: 'relative',
    width: '100%',
  },
  calendarIcon: {
    position: 'absolute',
    right: '10px',
    top: '50%',
    transform: 'translateY(-50%)',
    fontSize: '20px',
    color: '#B85170',
    cursor: 'pointer',
  },
  button: {
    backgroundColor: '#B85170',
    color: '#fff',
    padding: '10px 20px',
    fontSize: '16px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  result: {
    marginTop: '20px',
    fontSize: '16px',
    color: '#000000',
  },
};

export default IVFTracker;