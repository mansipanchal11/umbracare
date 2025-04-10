import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found. Please log in again.');
      }
      console.log('Token for fetching notifications:', token);

      const response = await axios.get('http://localhost:5000/api/notifications', {
        headers: {
          'x-auth-token': token,
        },
      });
      setNotifications(response.data);
    } catch (err) {
      console.error('Error fetching notifications:', err.response?.data || err.message);
      setError(`Error fetching notifications: ${err.response?.data?.msg || err.message}`);
    }
  };

  const markAsRead = async (id) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found. Please log in again.');
      }

      await axios.put(`http://localhost:5000/api/notifications/${id}/read`, {}, {
        headers: {
          'x-auth-token': token,
        },
      });
      
      setNotifications(notifications.map(notification => 
        notification._id === id ? { ...notification, isRead: true } : notification
      ));
      
      setSuccessMessage('Notification marked as read');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      console.error('Error marking notification as read:', err.response?.data || err.message);
      setError(`Error marking notification as read: ${err.response?.data?.msg || err.message}`);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.overlay}></div>
      <div style={styles.notificationsContainer}>
        <h2 style={styles.heading}>Notifications</h2>
        {error && <p style={styles.error}>{error}</p>}
        {successMessage && <p style={styles.success}>{successMessage}</p>}
        {notifications.length === 0 ? (
          <p style={styles.info}>No notifications available.</p>
        ) : (
          <ul style={styles.notificationList}>
            {notifications.map((notification) => (
              <li key={notification._id} style={{
                ...styles.notificationItem,
                backgroundColor: notification.isRead ? '#f0f0f0' : '#f9f9f9',
                borderLeft: notification.isRead ? '1px solid #ddd' : '3px solid #B15870'
              }}>
                <strong>{notification.type === 'medication_reminder' ? 'Medication Reminder' : 'Appointment Reminder'}:</strong> {notification.message}
                <br />
                <small>{new Date(notification.createdAt).toLocaleString()}</small>
                <div style={styles.notificationActions}>
                  {!notification.isRead && (
                    <button 
                      onClick={() => markAsRead(notification._id)} 
                      style={styles.markReadButton}
                    >
                      Mark as Read
                    </button>
                  )}
                  {notification.isRead && <span style={styles.readStatus}>Read</span>}
                </div>
              </li>
            ))}
          </ul>
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
    paddingTop: '90px',
    backgroundImage: 'url(/background.jpg)',
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
    backgroundColor: 'rgba(253, 232, 233, 0.7)',
    zIndex: -1,
  },
  notificationsContainer: {
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
  info: {
    fontSize: '16px',
    color: '#000000',
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
  notificationList: {
    listStyleType: 'none',
    padding: 0,
    textAlign: 'left',
  },
  notificationItem: {
    padding: '15px',
    marginBottom: '10px',
    borderRadius: '5px',
    border: '1px solid #ddd',
    position: 'relative',
  },
  notificationActions: {
    marginTop: '10px',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  markReadButton: {
    backgroundColor: '#B15870',
    color: 'white',
    border: 'none',
    padding: '5px 10px',
    borderRadius: '3px',
    cursor: 'pointer',
    fontSize: '12px',
  },
  readStatus: {
    color: '#888',
    fontSize: '12px',
    fontStyle: 'italic',
  }
};

export default Notifications;