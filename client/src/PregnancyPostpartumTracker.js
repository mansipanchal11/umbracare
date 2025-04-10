import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';
import { FaCalendarAlt } from 'react-icons/fa';
import { toast, Toaster } from 'react-hot-toast';
const PregnancyPostpartumTracker = () => {
  const [mode, setMode] = useState('pregnancy');
  const [week, setWeek] = useState('');
  const [age, setAge] = useState('');
  const [systolicBP, setSystolicBP] = useState('');
  const [diastolicBP, setDiastolicBP] = useState('');
  const [bloodSugar, setBloodSugar] = useState('');
  const [bodyTemp, setBodyTemp] = useState('');
  const [heartRate, setHeartRate] = useState('');

  const [deliveryDate, setDeliveryDate] = useState(new Date());
  const [showDeliveryCalendar, setShowDeliveryCalendar] = useState(false);
  const [menopauseSymptoms, setMenopauseSymptoms] = useState('');
  const [medication, setMedication] = useState('');
  const [appointment, setAppointment] = useState('');
  const [showAppointmentCalendar, setShowAppointmentCalendar] = useState(false);
  const [result, setResult] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [pregnancyRecords, setPregnancyRecords] = useState([]);
  const [editingRecord, setEditingRecord] = useState(null);
  
  const handlePregnancySubmit = async (e) => {
    e.preventDefault();
  
    if (!week) {
      setResult("Please enter the current week of pregnancy.");
      return;
    }
  
    const fetalInsights = getFetalDevelopmentInsights(parseInt(week));
    const insights = `Week ${week}: ${fetalInsights}`;
  
    try {
      // Get prediction from ML model
      const predictionResponse = await fetch("https://pregnancy-model-api.onrender.com/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          age: parseFloat(age),
          systolic_bp: parseFloat(systolicBP),
          diastolic_bp: parseFloat(diastolicBP),
          blood_glucose: parseFloat(bloodSugar) / 10,
          body_temp: parseFloat(bodyTemp),
          heart_rate: parseFloat(heartRate),
          week: parseInt(week)
        })
      });
  
      const predictionData = await predictionResponse.json();
      let riskLevel = '';
      if (predictionData && predictionData.risk !== undefined) {
        riskLevel = `\nPredicted Risk Level: ${predictionData.risk}`;
      }
  
      // Save to our backend
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token found. Please log in again.');
  
      const response = await axios.post(
        'http://localhost:5000/api/pregnancy',
        {
          week: parseInt(week),
          age: parseFloat(age),
          systolicBP: parseFloat(systolicBP),
          diastolicBP: parseFloat(diastolicBP),
          bloodSugar: parseFloat(bloodSugar),
          bodyTemp: parseFloat(bodyTemp),
          heartRate: parseFloat(heartRate),
          riskFactor: riskLevel,
          insights: insights + riskLevel
        },
        { headers: { 'x-auth-token': token } }
      );
  
      setResult(insights + riskLevel);
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 3000);
  
      // Reset form
      setWeek('');
      setAge('');
      setSystolicBP('');
      setDiastolicBP('');
      setBloodSugar('');
      setBodyTemp('');
      setHeartRate('');
  
      // Refresh records
      fetchPregnancyRecords();
    } catch (error) {
      console.error("Error:", error);
      setResult(`Error: ${error.message}`);
    }
  };
  
  const fetchPregnancyRecords = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token found. Please log in again.');
  
      const response = await axios.get('http://localhost:5000/api/pregnancy', {
        headers: { 'x-auth-token': token }
      });
      setPregnancyRecords(response.data);
    } catch (error) {
      console.error("Error fetching records:", error);
    }
  };
  
  const handleDeleteRecord = async (id) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token found. Please log in again.');
  
      await axios.delete(`http://localhost:5000/api/pregnancy/${id}`, {
        headers: { 'x-auth-token': token }
      });
      fetchPregnancyRecords();
    } catch (error) {
      console.error("Error deleting record:", error);
    }
  };
  
  const handleEditRecord = (record) => {
    setEditingRecord(record);
    setWeek(record.week);
    setAge(record.age);
    setSystolicBP(record.systolicBP);
    setDiastolicBP(record.diastolicBP);
    setBloodSugar(record.bloodSugar);
    setBodyTemp(record.bodyTemp);
    setHeartRate(record.heartRate);
  };
  
  const handleUpdateRecord = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token found. Please log in again.');
  
      const fetalInsights = getFetalDevelopmentInsights(parseInt(week));
      const insights = `Week ${week}: ${fetalInsights}`;
  
      await axios.put(
        `http://localhost:5000/api/pregnancy/${editingRecord._id}`,
        {
          week: parseInt(week),
          age: parseFloat(age),
          systolicBP: parseFloat(systolicBP),
          diastolicBP: parseFloat(diastolicBP),
          bloodSugar: parseFloat(bloodSugar),
          bodyTemp: parseFloat(bodyTemp),
          heartRate: parseFloat(heartRate),
          insights
        },
        { headers: { 'x-auth-token': token } }
      );
  
      setEditingRecord(null);
      fetchPregnancyRecords();
      setResult('Record updated successfully!');
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 3000);
    } catch (error) {
      console.error("Error updating record:", error);
      setResult(`Error: ${error.message}`);
    }
  };
  
  // Add useEffect to fetch records on component mount
  useEffect(() => {
    fetchPregnancyRecords();
  }, []);
  
  const handlePostpartumSubmit = (e) => {
    e.preventDefault();
    const today = new Date('2025-03-22');
    const diffTime = Math.abs(today - deliveryDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const weeksSinceDelivery = Math.floor(diffDays / 7);
    const firstPeriodEstimate = 6 + weeksSinceDelivery;
    setResult(`Based on your delivery date (${deliveryDate.toDateString()}), you are ${weeksSinceDelivery} weeks postpartum. Your first period is expected around ${firstPeriodEstimate} weeks postpartum.`);
  };

  const handleMenopauseSubmit = (e) => {
    e.preventDefault();
    if (!menopauseSymptoms) {
      setResult('Please enter your symptoms.');
      return;
    }
    const guidance = getMenopauseGuidance(menopauseSymptoms.toLowerCase());
    setResult(`Symptoms: ${menopauseSymptoms}. Guidance: ${guidance}`);
  };

  const handleMedicationSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token found. Please log in again.');

      await axios.post(
        'http://localhost:5000/api/notifications',
        { type: 'medication_reminder', message: `Medication Reminder: ${medication}` },
        { headers: { 'x-auth-token': token } }
      );
      await axios.post(
        'http://localhost:5000/api/notifications',
        { type: 'appointment_reminder', message: `Next Appointment: ${appointment}` },
        { headers: { 'x-auth-token': token } }
      );
      setResult(`Medication Reminder: ${medication}\nNext Appointment: ${appointment}`);
      setShowPopup(true);
      toast.success('Medication Reminder and Appointment Reminder set successfully!');
      setTimeout(() => setShowPopup(false), 3000);
    } catch (err) {
      console.error('Error saving data:', err.response?.data || err.message);
      setResult(`Error saving data: ${err.response?.data?.msg || err.message}`);
    }
  };

  const getFetalDevelopmentInsights = (week) => {
    if (week >= 1 && week <= 4) return 'Your baby is a tiny embryo, forming the neural tube and heart.';
    if (week >= 5 && week <= 8) return 'Your babys major organs are forming, and the heart begins to beat.';
    if (week >= 9 && week <= 12) return 'Your baby is now a fetus, with facial features and limbs developing.';
    if (week >= 13 && week <= 16) return 'Your baby can make facial expressions and may start sucking their thumb.';
    if (week >= 17 && week <= 20) return 'You might feel your babys first movements, and they can hear sounds.';
    if (week >= 21 && week <= 24) return 'Your babys lungs are developing, and theyre practicing breathing movements.';
    if (week >= 25 && week <= 28) return 'Your babys eyes can open, and theyre gaining more fat.';
    if (week >= 29 && week <= 32) return "Your baby's brain is growing rapidly, and they're getting ready for birth.";
    if (week >= 33 && week <= 36) return 'Your baby is gaining weight and preparing for delivery.';
    if (week >= 37 && week <= 40) return 'Your baby is full-term and ready to meet you!';
    return 'Please enter a valid week (1-40).';
  };

  const getMenopauseGuidance = (symptoms) => {
    if (symptoms.includes('hot flashes')) return 'Try to stay cool, wear light clothing, and avoid triggers like spicy foods.';
    if (symptoms.includes('mood swings')) return 'Practice stress-relief techniques like meditation or yoga, and consider talking to a therapist.';
    if (symptoms.includes('sleep issues')) return 'Establish a bedtime routine, avoid caffeine, and create a calming sleep environment.';
    return 'Consult a doctor for personalized advice on managing your symptoms.';
  };

  return (
    <div style={styles.container}>
      <div style={styles.trackerContainer}>
        <h2 style={styles.heading}>Pregnancy & Postpartum Tracker</h2>
        <div style={styles.toggleContainer}>
          <button onClick={() => setMode('pregnancy')} style={{ ...styles.toggleButton, backgroundColor: mode === 'pregnancy' ? '#B85170' : '#ccc' }}>Pregnancy</button>
          <button onClick={() => setMode('postpartum')} style={{ ...styles.toggleButton, backgroundColor: mode === 'postpartum' ? '#B85170' : '#ccc' }}>Postpartum</button>
          <button onClick={() => setMode('medication')} style={{ ...styles.toggleButton, backgroundColor: mode === 'medication' ? '#B85170' : '#ccc' }}>Medication Reminder</button>
          <button onClick={() => setMode('menopause')} style={{ ...styles.toggleButton, backgroundColor: mode === 'menopause' ? '#B85170' : '#ccc' }}>Menopause Insights</button>
        </div>

        {mode === 'pregnancy' && (
          <form onSubmit={handlePregnancySubmit} style={styles.form}>
            <div style={styles.formGroup}>
              <label style={styles.highlightedLabel}>Current Week of Pregnancy:</label>
              <input
                type="number"
                value={week}
                onChange={(e) => setWeek(e.target.value)}
                style={styles.input}
                placeholder="e.g., 12"
                min="1"
                max="40"
                required
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.highlightedLabel}>Age:</label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                style={styles.input}
                placeholder="e.g., 28"
                required
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.highlightedLabel}>Systolic BP (mmHg):</label>
              <input
                type="number"
                value={systolicBP}
                onChange={(e) => setSystolicBP(e.target.value)}
                style={styles.input}
                placeholder="e.g., 120"
                required
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.highlightedLabel}>Diastolic BP (mmHg):</label>
              <input
                type="number"
                value={diastolicBP}
                onChange={(e) => setDiastolicBP(e.target.value)}
                style={styles.input}
                placeholder="e.g., 80"
                required
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.highlightedLabel}>Blood Sugar Level (mg/dL):</label>
              <input
                type="number"
                value={bloodSugar}
                onChange={(e) => setBloodSugar(e.target.value)}
                style={styles.input}
                placeholder="e.g., 90"
                required
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.highlightedLabel}>Body Temperature (°C):</label>
              <input
                type="number"
                step="0.1"
                value={bodyTemp}
                onChange={(e) => setBodyTemp(e.target.value)}
                style={styles.input}
                placeholder="e.g., 36.6"
                required
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.highlightedLabel}>Heart Rate (bpm):</label>
              <input
                type="number"
                value={heartRate}
                onChange={(e) => setHeartRate(e.target.value)}
                style={styles.input}
                placeholder="e.g., 75"
                required
              />
            </div>

            <button type="submit" style={styles.button}>Get Insights</button>
          </form>
        )}

        {mode === 'postpartum' && (
          <form onSubmit={handlePostpartumSubmit} style={styles.form}>
            <div style={styles.formGroup}>
              <label style={styles.highlightedLabel}>Delivery Date:</label>
              <div style={styles.calendarInputContainer}>
                <input
                  type="text"
                  value={deliveryDate.toDateString()}
                  readOnly
                  style={styles.input}
                  placeholder="Select delivery date"
                />
                <FaCalendarAlt
                  style={styles.calendarIcon}
                  onClick={() => setShowDeliveryCalendar(!showDeliveryCalendar)}
                />
              </div>
              {showDeliveryCalendar && (
                <Calendar onChange={(date) => { setDeliveryDate(date); setShowDeliveryCalendar(false); }} value={deliveryDate} style={styles.calendar} />
              )}
            </div>
            <button type="submit" style={styles.button}>Track Recovery</button>
          </form>
        )}

        {mode === 'medication' && (
          <form onSubmit={handleMedicationSubmit} style={styles.form}>
            <div style={styles.formGroup}>
              <label style={styles.highlightedLabel}>Medication Reminder:</label>
              <input type="text" value={medication} onChange={(e) => setMedication(e.target.value)} style={styles.input} placeholder="e.g., Take Follicle Stimulating Hormone at 8 AM" required />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.highlightedLabel}>Next Appointment:</label>
              <div style={styles.calendarInputContainer}>
                <input
                  type="text"
                  value={appointment}
                  readOnly
                  style={styles.input}
                  placeholder="Select appointment date"
                />
                <FaCalendarAlt
                  style={styles.calendarIcon}
                  onClick={() => setShowAppointmentCalendar(!showAppointmentCalendar)}
                />
              </div>
              {showAppointmentCalendar && (
                <Calendar
                  onChange={(date) => {
                    setAppointment(date.toDateString());
                    setShowAppointmentCalendar(false);
                  }}
                  value={appointment ? new Date(appointment) : new Date()}
                  style={styles.calendar}
                />
              )}
            </div>
            <button type="submit" style={styles.button}>Set Reminder</button>
          </form>
        )}

        {mode === 'menopause' && (
          <form onSubmit={handleMenopauseSubmit} style={styles.form}>
            <div style={styles.formGroup}>
              <label style={styles.highlightedLabel}>Symptoms (e.g., hot flashes, mood swings):</label>
              <textarea value={menopauseSymptoms} onChange={(e) => setMenopauseSymptoms(e.target.value)} style={styles.textarea} placeholder="Enter your symptoms here..." required />
            </div>
            <button type="submit" style={styles.button}>Get Guidance</button>
          </form>
        )}

        {result && <p style={styles.result}>{result}</p>}
        {showPopup && (
          <div style={styles.popup}>
            <p>Record saved successfully!</p>
          </div>
        )}

        {/* Pregnancy Records List */}
        {mode === 'pregnancy' && pregnancyRecords.length > 0 && (
          <div style={styles.recordsContainer}>
            <h3 style={styles.recordsTitle}>Your Pregnancy Records</h3>
            <div style={styles.recordsList}>
              {pregnancyRecords.map((record) => (
                <div key={record._id} style={styles.recordCard}>
                  <div style={styles.recordHeader}>
                    <h4 style={styles.recordWeek}>Week {record.week}</h4>
                    <div style={styles.recordActions}>
                      <button
                        onClick={() => handleEditRecord(record)}
                        style={styles.editButton}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteRecord(record._id)}
                        style={styles.deleteButton}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <div style={styles.recordDetails}>
                    <p><strong>Age:</strong> {record.age}</p>
                    <p><strong>Blood Pressure:</strong> {record.systolicBP}/{record.diastolicBP} mmHg</p>
                    <p><strong>Blood Sugar:</strong> {record.bloodSugar} mg/dL</p>
                    <p><strong>Body Temperature:</strong> {record.bodyTemp}°C</p>
                    <p><strong>Heart Rate:</strong> {record.heartRate} bpm</p>
                    <p><strong>Risk Factor:</strong> {record.riskFactor}</p>
                    <p style={styles.recordInsights}>{record.insights}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
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
    padding: '20px',
    paddingTop: '90px',
    backgroundImage: 'url(/background.jpg)',
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
      backgroundColor: 'rgba(253, 232, 233, 0.7)',
      zIndex: -1,
    }
  },
  trackerContainer: {
    // backgroundColor: '#FFFFFF',
    padding: '40px',
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    border: '2px solid #B85170',
    width: '100%',
    maxWidth: '1000px',
    position: 'relative',
    backgroundColor: 'rgba(255, 255, 255, 0.7)', // Added transparency to the background
    backdropFilter: 'blur(5px)', // Optional: adds a slight blur effect for better readability
  },
  heading: {
    fontSize: '28px',
    color: '#B85170',
    marginBottom: '20px',
    fontWeight: '600',
  },
  toggleContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
    marginBottom: '20px',
    flexWrap: 'nowrap',
    overflowX: 'auto',
    whiteSpace: 'nowrap',
  },
  toggleButton: {
    padding: '8px 12px',
    fontSize: '14px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    flexShrink: 0,
    backgroundColor: '#ccc',
    color: '#333',
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
  highlightedLabel: { // Updated to include all specified labels
    fontSize: '16px',
    color: '#B85170',
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
  textarea: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ddd',
    width: '100%',
    boxSizing: 'border-box',
    minHeight: '100px',
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
    textDecoration: 'none',
    textAlign: 'center',
  },
  result: {
    marginTop: '20px',
    fontSize: '16px',
    color: '#000000',
  },
  popup: {
    position: 'fixed',
    top: '20px',
    right: '20px',
    backgroundColor: '#E7E5FF',
    color: '#fff',
    padding: '10px 20px',
    borderRadius: '5px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
    zIndex: 1000,
  },
  recordsContainer: {
    marginTop: '30px',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
  },
  recordsTitle: {
    fontSize: '20px',
    color: '#ff8c00',
    marginBottom: '20px',
    textAlign: 'center',
  },
  recordsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  recordCard: {
    padding: '15px',
    border: '1px solid #eee',
    borderRadius: '8px',
    backgroundColor: '#fff',
  },
  recordHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px',
  },
  recordWeek: {
    fontSize: '18px',
    color: '#333',
    margin: '0',
  },
  recordActions: {
    display: 'flex',
    gap: '10px',
  },
  editButton: {
    padding: '5px 10px',
    backgroundColor: '#ff8c00',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  deleteButton: {
    padding: '5px 10px',
    backgroundColor: '#ff4444',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  recordDetails: {
    fontSize: '14px',
    color: '#666',
  },
  recordInsights: {
    marginTop: '10px',
    padding: '10px',
    backgroundColor: '#f8f8f8',
    borderRadius: '4px',
    fontStyle: 'italic',
  },
};

export default PregnancyPostpartumTracker;