import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaStar, FaTrash, FaEdit, FaPlus } from 'react-icons/fa';
import toast, { Toaster } from 'react-hot-toast';

const Feedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [formData, setFormData] = useState({
    rating: 5,
    comments: '',
    category: 'general'
  });
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getFeedbacks();
  }, []);

  const getFeedbacks = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'x-auth-token': token
        }
      };
      
      const res = await axios.get('http://localhost:5000/api/feedback', config);
      
      setFeedbacks(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err.message);
      if (err.response && err.response.data.msg === 'No token, authorization denied') {
        toast.error('Authorization failed. Please log in again.');
      } else {
        toast.error('Failed to load feedback');
      }
      setLoading(false);
    }
  };

  const { rating, comments, category } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token
        }
      };

      
      if (editMode) {
        await axios.put(`http://localhost:5000/api/feedback/${currentId}`, formData, config);
        toast.success('Feedback updated successfully');
      } else {
        await axios.post('http://localhost:5000/api/feedback', formData, config);
        toast.success('Feedback submitted successfully');
      }
      setFormData({
        rating: 5,
        comments: '',
        category: 'general'
      });
      setEditMode(false);
      setCurrentId(null);
      setShowModal(false);
      getFeedbacks();
    } catch (err) {
      console.error(err.message);
      if (err.response && err.response.data.msg === 'No token, authorization denied') {
        toast.error('Authorization failed. Please log in again.');
      } else {
        toast.error(editMode ? 'Failed to update feedback' : 'Failed to submit feedback');
      }
    }
  };

  const onDelete = async id => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'x-auth-token': token
        }
      };
      
      await axios.delete(`/api/feedback/${id}`, config);
      setFeedbacks(feedbacks.filter(feedback => feedback._id !== id));
      toast.success('Feedback deleted successfully');
    } catch (err) {
      console.error(err.message);
      if (err.response && err.response.data.msg === 'No token, authorization denied') {
        toast.error('Authorization failed. Please log in again.');
      } else {
        toast.error('Failed to delete feedback');
      }
    }
  };

  const onEdit = feedback => {
    setFormData({
      rating: feedback.rating,
      comments: feedback.comments,
      category: feedback.category
    });
    setEditMode(true);
    setCurrentId(feedback._id);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    if (editMode) {
      setFormData({
        rating: 5,
        comments: '',
        category: 'general'
      });
      setEditMode(false);
      setCurrentId(null);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <div style={styles.headerContainer}>
          <h1 style={styles.heading}>Feedback</h1>
          <button 
            style={styles.addButton} 
            onClick={() => setShowModal(true)}
          >
            <FaPlus style={styles.addIcon} /> Add Feedback
          </button>
        </div>
        
        {showModal && (
          <div style={styles.modalOverlay}>
            <div style={styles.modalContent}>
              <h2 style={styles.subHeading}>{editMode ? 'Edit Feedback' : 'Submit Feedback'}</h2>
              <form onSubmit={onSubmit} style={styles.form}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Rating</label>
                  <div style={styles.starContainer}>
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        style={{
                          ...styles.star,
                          color: i < rating ? '#B85170' : '#e4e5e9'
                        }}
                        onClick={() => setFormData({ ...formData, rating: i + 1 })}
                      />
                    ))}
                  </div>
                </div>
                
                <div style={styles.formGroup}>
                  <label style={styles.label}>Category</label>
                  <select
                    name="category"
                    value={category}
                    onChange={onChange}
                    style={styles.select}
                  >
                    <option value="general">General</option>
                    <option value="pregnancy">Pregnancy</option>
                    <option value="postpartum">Postpartum</option>
                    <option value="menopause">Menopause</option>
                    <option value="period">Period</option>
                  </select>
                </div>
                
                <div style={styles.formGroup}>
                  <label style={styles.label}>Comments</label>
                  <textarea
                    name="comments"
                    value={comments}
                    onChange={onChange}
                    style={styles.textarea}
                    placeholder="Share your thoughts..."
                  />
                </div>
                
                <div style={styles.modalButtons}>
                  <button type="submit" style={styles.button}>
                    {editMode ? 'Update Feedback' : 'Submit Feedback'}
                  </button>
                  <button
                    type="button"
                    onClick={closeModal}
                    style={styles.cancelButton}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        
        <h2 style={styles.subHeading}>All User Feedback</h2>
        
        {loading ? (
          <p>Loading...</p>
        ) : feedbacks.length === 0 ? (
          <p>No feedback submitted yet.</p>
        ) : (
          <div style={styles.feedbackList}>
            {feedbacks.map(feedback => (
              <div
                key={feedback._id}
                style={styles.feedbackItem}
              >
                <div style={styles.feedbackHeader}>
                  <div style={styles.userInfo}>
                    <span style={styles.userName}>{feedback.name || 'Anonymous User'}</span>
                  </div>
                  <div style={styles.ratingDisplay}>
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        style={{
                          ...styles.displayStar,
                          color: i < feedback.rating ? '#B85170' : '#e4e5e9'
                        }}
                      />
                    ))}
                  </div>
                  {/* <div style={styles.feedbackActions}>
                    <FaEdit
                      style={styles.actionIcon}
                      onClick={() => onEdit(feedback)}
                    />
                    <FaTrash
                      style={styles.actionIcon}
                      onClick={() => onDelete(feedback._id)}
                    />
                  </div> */}
                </div>
                <div style={styles.feedbackCategory}>
                  Category: <span style={styles.categoryText}>{feedback.category}</span>
                </div>
                <p style={styles.feedbackComments}>{feedback.comments}</p>
                <div style={styles.feedbackDate}>
                  {new Date(feedback.date).toLocaleDateString()}
                </div>
              </div>
            ))}
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
  },
  content: {
    width: '100%',
    maxWidth: '800px',
    padding: '30px',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    backdropFilter: 'blur(5px)',
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    position: 'relative',
    zIndex: 2,
  },
  headerContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '30px',
  },
  heading: {
    fontSize: '36px',
    color: '#B85170',
    fontWeight: '600',
  },
  addButton: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#B85170',
    color: 'white',
    border: 'none',
    padding: '10px 15px',
    borderRadius: '5px',
    fontSize: '16px',
    cursor: 'pointer',
    fontWeight: '500',
  },
  addIcon: {
    marginRight: '8px',
  },
  subHeading: {
    fontSize: '24px',
    color: '#B85170',
    fontWeight: '500',
    marginBottom: '20px',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '10px',
    width: '90%',
    maxWidth: '600px',
    maxHeight: '90vh',
    overflow: 'auto',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
  },
  label: {
    fontSize: '16px',
    color: '#333',
    fontWeight: '500',
  },
  starContainer: {
    display: 'flex',
    gap: '10px',
  },
  star: {
    fontSize: '24px',
    cursor: 'pointer',
  },
  select: {
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ddd',
    fontSize: '16px',
  },
  textarea: {
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ddd',
    fontSize: '16px',
    minHeight: '100px',
    resize: 'vertical',
  },
  modalButtons: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '10px',
    marginTop: '10px',
  },
  button: {
    backgroundColor: '#B85170',
    color: 'white',
    border: 'none',
    padding: '12px 15px',
    borderRadius: '5px',
    fontSize: '16px',
    cursor: 'pointer',
    fontWeight: '500',
    flex: '1',
  },
  cancelButton: {
    backgroundColor: '#6c757d',
    color: 'white',
    border: 'none',
    padding: '12px 15px',
    borderRadius: '5px',
    fontSize: '16px',
    cursor: 'pointer',
    fontWeight: '500',
    flex: '1',
  },
  feedbackList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  feedbackItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: '15px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    border: '1px solid #eee',
  },
  feedbackHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px',
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
  },
  userName: {
    fontWeight: 'bold',
    color: '#333',
    fontSize: '16px',
  },
  ratingDisplay: {
    display: 'flex',
    gap: '5px',
  },
  displayStar: {
    fontSize: '18px',
  },
  feedbackActions: {
    display: 'flex',
    gap: '10px',
  },
  actionIcon: {
    cursor: 'pointer',
    fontSize: '18px',
    color: '#B85170',
  },
  feedbackCategory: {
    fontSize: '14px',
    color: '#666',
    marginBottom: '5px',
  },
  categoryText: {
    textTransform: 'capitalize',
    fontWeight: '500',
  },
  feedbackComments: {
    fontSize: '16px',
    color: '#333',
    marginBottom: '10px',
  },
  feedbackDate: {
    fontSize: '12px',
    color: '#888',
    textAlign: 'right',
  },
};

export default Feedback;
