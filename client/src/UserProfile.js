
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserProfile = () => {
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

  // Fetch user profile on component mount
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log('Token in UserProfile:', token);
        if (!token) throw new Error('No token found. Please log in again.');
  
        console.log('Fetching profile...');
        const response = await axios.get('http://localhost:5000/api/users/me', {
          headers: { 'x-auth-token': token },
        });
        console.log('Profile Response:', response.data);
        setUser(response.data);
        setFormData({
          name: response.data.name,
          email: response.data.email,
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

  if (!user && error) return <div style={styles.container}>{error}</div>;
  if (!user) return <div style={styles.container}>Loading...</div>;

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission to update profile
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
      setTimeout(() => setSuccess(''), 3000); // Clear success message after 3 seconds
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



  

  return (
    <div style={styles.container}>
      <div style={styles.profileContainer}>
        <h2 style={styles.heading}>User Profile</h2>
        <div style={{display: 'flex', gap: '10px', justifyContent: 'center', alignItems: 'center'}}>
          <p>Use for: {localStorage.getItem('useFor')}</p>
          <select 
            value={localStorage.getItem('useFor') || ''}
            onChange={handleUseForChange}
            style={styles.select}
          >
            <option value="pregnancy">Pregnancy</option>
            <option value="period">Period</option>
            <option value="ivf">IVF</option>
          </select>
        </div>

        {error && <p style={styles.error}>{error}</p>}
        {success && <p style={styles.success}>{success}</p>}

        {!isEditing ? (
          <div style={styles.viewMode}>
            <p style={styles.info}><strong>Name:</strong> {user.name}</p>
            <p style={styles.info}><strong>Email:</strong> {user.email}</p>
            <p style={styles.info}><strong>Medical History:</strong> {user.medicalHistory || 'Not provided'}</p>
            <p style={styles.info}><strong>Menstrual History:</strong> {user.menstrualHistory || 'Not provided'}</p>
            <button onClick={() => setIsEditing(true)} style={styles.button}>Edit Profile</button>
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
  profileContainer: {
    backgroundColor: '#FFFFFF', // Changed to pure white like Newsletter
    padding: '40px',
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    border: '2px solid #B85170', // Changed from #ff8c00 to primary color
    width: '100%',
    maxWidth: '600px',
  },
  heading: {
    fontSize: '28px',
    color: '#B85170', // Changed from #ff8c00 to primary color
    marginBottom: '20px',
    fontWeight: '600',
  },
  info: {
    fontSize: '16px',
    color: '#333',
    marginBottom: '10px',
  },
  error: {
    fontSize: '16px',
    color: '#FF4D4D', // Changed to standard red for visibility
    marginBottom: '20px',
  },
  success: {
    fontSize: '16px',
    color: '#4CAF50', // Kept green for success visibility
    marginBottom: '20px',
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
  textarea: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    width: '100%',
    boxSizing: 'border-box',
    minHeight: '100px',
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
  cancelButton: {
    backgroundColor: '#CCC', // Kept as is, matches Newsletter's cancel button
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
};

export default UserProfile;