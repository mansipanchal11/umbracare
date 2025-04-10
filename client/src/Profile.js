import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    medicalHistory: '',
    menstrualHistory: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('No token found. Please log in again.');

        const response = await axios.get('http://localhost:5000/api/users/me', {
          headers: { 'x-auth-token': token },
        });
        setUser(response.data);
        setFormData({
          name: response.data.name || '',
          email: response.data.email || '',
          medicalHistory: response.data.medicalHistory || '',
          menstrualHistory: response.data.menstrualHistory || '',
        });
      } catch (err) {
        console.error('Error fetching user profile:', err.response?.data || err.message);
        setError(`Error fetching profile: ${err.response?.data?.msg || err.message}`);
      }
    };

    fetchUserProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found. Please log in again.');
      }
      const response = await axios.put(
        'http://localhost:5000/api/users/me',
        formData,
        {
          headers: {
            'x-auth-token': token,
          },
        }
      );
      setUser(response.data);
      setIsEditing(false);
      setSuccess('Profile updated successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      console.error('Error updating profile:', err.response?.data || err.message);
      setError(`Error updating profile: ${err.response?.data?.msg || err.message}`);
    }
  };

  const handleUseForChange = async (e) => {
    const { useFor } = e.target.value;
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found. Please log in again.');
      }
      const response = await axios.put(
        'http://localhost:5000/api/users/useFor',
        { useFor },
        { headers: { 'x-auth-token': token } }
      );
      setUser(response.data);
      setSuccess('Use for updated successfully!');
      setTimeout(() => setSuccess(''), 3000);
      localStorage.setItem('useFor', useFor);
    } catch (err) {
      console.error('Error updating use for:', err.response?.data || err.message);
      setError(`Error updating use for: ${err.response?.data?.msg || err.message}`);
    }
  };

  if (!user && error) return <div style={styles.container}>{error}</div>;
  if (!user) return <div style={styles.container}>Loading...</div>;

  return (
    <div style={styles.container}>
      <div style={styles.profileContainer}>
        <h2 style={styles.heading}>User Profile</h2>
        <div style={{display: 'flex', gap: '10px', justifyContent: 'center', alignItems: 'center'}}>
          <p>You are using for: {localStorage.getItem('useFor')}</p>
          <select 
            value={localStorage.getItem('useFor') || ''}
            onChange={(e) => {
              const useFor = e.target.value;
              handleUseForChange({ target: { value: { useFor } } });
            }}
            style={{...styles.input, padding: '5px 10px', fontSize: '14px', width: 'auto'}}
          >
            <option value="pregnancy">Pregnancy</option>
            <option value="period">Period</option>
          </select>
        </div>
        {error && <p style={styles.error}>{error}</p>}
        {success && <p style={styles.success}>{success}</p>}

        {!isEditing ? (
          <div style={styles.viewMode}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Name:</label>
              <input
                type="text"
                value={user.name || 'Not provided'}
                readOnly
                style={styles.readOnlyInput}
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Email:</label>
              <input
                type="email"
                value={user.email || 'Not provided'}
                readOnly
                style={styles.readOnlyInput}
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Medical History:</label>
              <textarea
                value={user.medicalHistory || 'e.g., Allergies, past surgeries, chronic conditions...'}
                readOnly
                style={{
                  ...styles.readOnlyTextarea,
                  color: user.medicalHistory ? '#000000' : '#999',
                }}
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Menstrual History:</label>
              <textarea
                value={user.menstrualHistory || 'e.g., Average cycle length, last period date, any irregularities...'}
                readOnly
                style={{
                  ...styles.readOnlyTextarea,
                  color: user.menstrualHistory ? '#000000' : '#999',
                }}
              />
            </div>
            <button onClick={() => setIsEditing(true)} style={styles.button}>Update Profile</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                style={styles.input}
                required
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                style={styles.input}
                required
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Medical History:</label>
              <textarea
                name="medicalHistory"
                value={formData.medicalHistory}
                onChange={handleChange}
                style={styles.textarea}
                placeholder="e.g., Any allergies, chronic conditions, or past surgeries"
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Menstrual History:</label>
              <textarea
                name="menstrualHistory"
                value={formData.menstrualHistory}
                onChange={handleChange}
                style={styles.textarea}
                placeholder="e.g., Average cycle length, last period date, any irregularities"
              />
            </div>
            <div style={styles.buttonGroup}>
              <button type="submit" style={styles.button}>Save Changes</button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                style={styles.cancelButton}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
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
    paddingTop: '80px',
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
  profileContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)', // Added transparency to the background
    backdropFilter: 'blur(5px)', // Optional: adds a slight blur effect for better readability
    padding: '40px',
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    border: '2px solid #B15870',
    width: '100%',
    maxWidth: '600px',
    position: 'relative',
    zIndex: 2,
  },
  heading: {
    fontSize: '28px',
    color: '#B85170',
    marginBottom: '20px',
    fontWeight: '600',
  },
  viewMode: {
    textAlign: 'left',
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
    color: '#B85170',
    fontWeight: '500',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    width: '100%',
    boxSizing: 'border-box',
    color: '#000000',
  },
  readOnlyInput: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    width: '100%',
    boxSizing: 'border-box',
    backgroundColor: '#f9f9f9',
    color: '#000000',
  },
  textarea: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    width: '100%',
    boxSizing: 'border-box',
    minHeight: '100px',
    color: '#000000',
  },
  readOnlyTextarea: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    width: '100%',
    boxSizing: 'border-box',
    minHeight: '100px',
    backgroundColor: '#f9f9f9',
  },
  button: {
    backgroundColor: '#B15870',
    color: '#fff',
    padding: '10px 20px',
    fontSize: '16px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    width: '100%',
  },
  cancelButton: {
    backgroundColor: '#ccc',
    color: '#333',
    padding: '10px 20px',
    fontSize: '16px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    marginLeft: '10px',
  },
  buttonGroup: {
    display: 'flex',
    gap: '10px',
    justifyContent: 'center',
  },
  error: {
    fontSize: '16px',
    color: '#FF4444',
    marginBottom: '20px',
  },
  success: {
    fontSize: '16px',
    backgroundColor: '#E7E5FF', // Changed from implied green to purple
    color: '#3D348B', // Changed from #4CAF50 (green) to dark purple
    marginBottom: '20px',
    padding: '10px', // Added padding for better appearance
    borderRadius: '5px', // Added border radius for consistency
  },
};

export default Profile;