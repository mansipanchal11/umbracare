// import React, { useState, useEffect } from "react";
// import { FaEnvelope, FaPaperPlane, FaTimes, FaPlus } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import { MdDeleteSweep } from "react-icons/md";
// import axios from 'axios';
// import { Toaster } from "react-hot-toast";
// import { toast } from "react-hot-toast";

// const NEWS_API_KEY = "49d8202a37b24a62b7fd9d6fa7f6aac2"; 

// const Newsletter = () => {
//   const [email, setEmail] = useState("");
//   const [isSubscribed, setIsSubscribed] = useState(false);
//   const [showModal, setShowModal] = useState(false);
//   const [modalContent, setModalContent] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [articles, setArticles] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [showAddForm, setShowAddForm] = useState(false);
//   const [newNewsletter, setNewNewsletter] = useState({ title: "", description: "" });

  
//   React.useEffect(() => {
//     const fetchNewsletters = async () => {
//       try {
//         const response = await fetch('http://localhost:5000/api/newsletter/newsletter');
//         if (!response.ok) {
//           throw new Error('Failed to fetch newsletters');
//         }
        
//         const data = await response.json();
        
//         // Transform the data to match our component's format
//         const formattedArticles = data.map(newsletter => ({
//           _id: newsletter._id, // Ensure we capture the ID for deletion
//           title: newsletter.title,
//           date: `Published: ${new Date(newsletter.publishedAt).toLocaleDateString()}`,
//           summary: newsletter.description,
//           fullContent: "",
//           loading: false,
//         }));
        
//         setArticles(formattedArticles);
//         setLoading(false);
//       } catch (err) {
//         console.error('Error fetching newsletters:', err);
//         setError('Failed to load newsletters. Please try again later.');
//         setLoading(false);
//       }
//     };

//     fetchNewsletters();
//   }, []);
//   const navigate = useNavigate();

//   const fetchFertilityNews = async (index) => {
//     setArticles((prevArticles) =>
//       prevArticles.map((article, i) =>
//         i === index ? { ...article, loading: true } : article
//       )
//     );
//     setIsLoading(true);

//     try {
//       const response = await fetch(
//         `https://newsapi.org/v2/everything?q=fertility%20treatments&sortBy=publishedAt&apiKey=${NEWS_API_KEY}`
//       );
//       if (!response.ok) throw new Error("Failed to fetch articles");

//       const data = await response.json();
//       const newsArticles = data.articles.slice(0, 3); 
      
//       setModalContent(newsArticles.map(article => ({
//         title: article.title,
//         description: article.description,
//         content: article.content,
//         url: article.url,
//         publishedAt: new Date(article.publishedAt).toLocaleDateString(),
//         source: article.source.name
//       })));
      
//       setShowModal(true);
      
//       setArticles((prevArticles) =>
//         prevArticles.map((article, i) =>
//           i === index ? { ...article, loading: false } : article
//         )
//       );
//     } catch (error) {
//       console.error("🚨 Error fetching news:", error);
//       alert("Failed to fetch news. Please try again.");
//       setArticles((prevArticles) =>
//         prevArticles.map((article, i) =>
//           i === index ? { ...article, loading: false } : article
//         )
//       );
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleReadMore = (index, title) => {
//     if (index < articles.length) {
//       fetchFertilityNews(index); 
//     } else {
//       const query = encodeURIComponent(title);
//       window.open(`https://www.google.com/search?q=${query}`, "_blank");
//     }
//   };

//   const handleSubscribe = async (e) => {
//     e.preventDefault();
//     try {
//       const token = localStorage.getItem('token');
//       if (!token) {
//         toast.error('Please log in to subscribe');
//         return;
//       }

//       await axios.post('http://localhost:5000/api/newsletter/subscribe', {}, {
//         headers: { 'x-auth-token': token }
//       });

//       localStorage.setItem('isSubscribed', 'true');
//       toast.success('Successfully subscribed to newsletter!');
//     } catch (err) {
//       console.error('Error subscribing to newsletter:', err);
//       toast.error(err.response?.data?.msg || 'Error subscribing to newsletter');
//     }
//   };

//   const closeModal = () => {
//     setShowModal(false);
//   };

//   const handelsubscribe = async (e) => {
//     e.preventDefault();
//     if (email && email.includes("@")) {
//       try {
//         const response = await fetch('http://localhost:5000/api/newsData/subscribe', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({ 
//             email, 
//             name: localStorage.getItem('name') || 'Subscriber' 
//           }),
//         });
        
//         const data = await response.json();
        
//         if (response.ok) {
//           setIsSubscribed(true);
//           setEmail("");
//           console.log("Successfully subscribed:", data.message);
//         } else {
//           alert(data.message || "Failed to subscribe. Please try again.");
//         }
//       } catch (error) {
//         console.error("Error subscribing to newsletter:", error);
//         alert("An error occurred. Please try again later.");
//       }
//     } else {
//       alert("Please enter a valid email address");
//     }
//   };
  
//   const handleAddNewsletter = async (e) => {
//     e.preventDefault();
//     // setIsLoading(true);
//     try {
//       setIsLoading(true);
//       const token = localStorage.getItem('token');
//       if (!token) {
//         alert("You must be logged in to add a newsletter");
//         setIsLoading(false);
//         return;
//       }

//       const response = await fetch('http://localhost:5000/api/newsletter/addnewsletter', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'x-auth-token': token
//         },
//         body: JSON.stringify(newNewsletter),
//       });
      
//       const data = await response.json();
      
//       if (response.ok) {
//         alert("Newsletter created and sent to subscribers successfully!");
//         setShowAddForm(false);
//         setNewNewsletter({ title: "", description: "" });
        
//         const updatedArticles = [...articles, {
//           title: newNewsletter.title,
//           date: `Published: ${new Date().toLocaleDateString()}`,
//           summary: newNewsletter.description,
//           fullContent: "",
//           loading: false,
//         }];
//         setArticles(updatedArticles);
//         setIsLoading(false);
//       } else {
//         alert(data.error || "Failed to create newsletter");
//         setIsLoading(false);
//       }
//     } catch (error) {
//       console.error("Error creating newsletter:", error);
//       alert("An error occurred. Please try again later.");
//       setIsLoading(false);
//     }
//   };

//   const handleDeleteNewsletter = async (id) => {
//     try {
//       const token = localStorage.getItem('token');
//       if (!token) {
//         toast.error('Please log in to delete newsletters');
//         return;
//       }

//       await axios.delete(`http://localhost:5000/api/newsletter/newsletter/${id}`, {
//         headers: { 'x-auth-token': token }
//       });

//       setArticles(articles.filter(article => article._id !== id));
//       toast.success('Newsletter deleted successfully');
//     } catch (err) {
//       console.error('Error deleting newsletter:', err);
//       toast.error(err.response?.data?.msg || 'Error deleting newsletter');
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <div style={styles.content}>
//         <div style={styles.headerContainer}>
//           <h1 style={styles.mainHeading}>Fertility Health Newsletter</h1>
//           {(localStorage.getItem('userEmail') === 'reshu@exa.com' || localStorage.getItem('userEmail') === 'riyanshigupta2004@gmail.com') && (
//             <button 
//               onClick={() => setShowAddForm(!showAddForm)} 
//               style={styles.addButton}
//             >
//               <FaPlus style={styles.addIcon} /> Add Newsletter
//             </button>
//           )}
//         </div>

//         {showAddForm && (
//           <div style={styles.addFormContainer}>
//             <h2 style={styles.addFormHeading}>Create New Newsletter</h2>
//             <form onSubmit={handleAddNewsletter} style={styles.addForm}>
//               <input
//                 type="text"
//                 placeholder="Newsletter Title"
//                 value={newNewsletter.title}
//                 onChange={(e) => setNewNewsletter({...newNewsletter, title: e.target.value})}
//                 style={styles.formInput}
//                 required
//               />
//               <textarea
//                 placeholder="Newsletter Description"
//                 value={newNewsletter.description}
//                 onChange={(e) => setNewNewsletter({...newNewsletter, description: e.target.value})}
//                 style={{...styles.formInput, minHeight: '100px'}}
//                 required
//               />
//               <div style={styles.formButtons}>
//                 {isLoading ? (
//                   <button type="button" style={styles.submitButton} disabled>
//                     Creating...
//                   </button>
//                 ) : (
//                   <>
//                     <button type="submit" style={styles.submitButton}>
//                     Create Newsletter
//                   </button>
//                   </>
//                 )}
//                 <button 
//                   type="button" 
//                   onClick={() => setShowAddForm(false)} 
//                   style={styles.cancelButton}
//                 >
//                   Cancel
//                 </button>
//               </div>

//             </form>

//           </div>
//         )}

//         <div style={styles.articlesContainer}>
//           {articles.map((article, index) => (
//             <div key={index} style={styles.article}>
//               <div style={styles.articleHeader}>
//                 <h2 style={styles.articleTitle}>{article.title}</h2>
//                 {(localStorage.getItem('userEmail') === 'reshu@exa.com' || localStorage.getItem('userEmail') === 'riyanshigupta2004@gmail.com') && (
//                   <button
//                     onClick={() => handleDeleteNewsletter(article._id)}
//                     style={styles.deleteButton}
//                     aria-label="Delete newsletter"
//                   >
//                     <MdDeleteSweep />
//                   </button>
//                 )}
//               </div>
//               <p style={styles.articleDate}>{article.date}</p>
//               <p style={styles.articleContent}>{article.summary}</p>
//               <button
//                 onClick={() => handleReadMore(index, article.title)}
//                 style={styles.readMoreButton}
//                 disabled={article.loading}
//               >
//                 {article.loading ? "Loading..." : "Read More"}
//               </button>
//             </div>
//           ))}
//         </div>

//         <div style={styles.subscriptionContainer}>
//     <div style={styles.subscriptionBox}>
//       <h2 style={styles.subscriptionHeading}>
//         <FaEnvelope style={styles.subscriptionIcon} />
//         Subscribe to Our Newsletter
//       </h2>
//       <p style={styles.subscriptionText}>
//         Get the latest fertility health news, tips, and research delivered
//         directly to your inbox.
//       </p>
      
//       {localStorage.getItem('isSubscribed') === 'true' ? (
//         <div style={styles.thankYouMessage}>
//           <p>Thank you for subscribing!</p>
//           <p>You'll receive our next newsletter soon.</p>
//         </div>
//       ) : (
//         <form onSubmit={handleSubscribe} style={styles.subscriptionForm}>
//           <button type="submit" style={styles.subscribeButton}>
//             Subscribe <FaPaperPlane style={styles.buttonIcon} />
//           </button>
//         </form>
//       )}
//     </div>
//   </div>

//         {showModal && (
//           <div style={styles.modalOverlay}>
//             <div style={styles.modalContent}>
//               <button style={styles.closeButton} onClick={closeModal}>
//                 <FaTimes />
//               </button>
//               <h2 style={styles.modalTitle}>Latest Fertility News</h2>
              
//               {isLoading ? (
//                 <div style={styles.loadingContainer}>
//                   <p>Loading articles...</p>
//                 </div>
//               ) : (
//                 <div style={styles.modalArticlesContainer}>
//                   {modalContent.map((article, index) => (
//                     <div key={index} style={styles.modalArticle}>
//                       <h3 style={styles.modalArticleTitle}>{article.title}</h3>
//                       <p style={styles.modalArticleSource}>
//                         Source: {article.source} | Published: {article.publishedAt}
//                       </p>
//                       <p style={styles.modalArticleDescription}>{article.description}</p>
//                       <p style={styles.modalArticleContent}>
//                         {article.content?.replace(/\[\+\d+ chars\]$/, '') || 'No content available'}
//                       </p>
//                       <a 
//                         href={article.url} 
//                         target="_blank" 
//                         rel="noopener noreferrer"
//                         style={styles.readFullArticleButton}
//                       >
//                         Read Full Article
//                       </a>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>
//         )}
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
// }

// const styles = {
//   container: {
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     minHeight: '100vh',
//     fontFamily: "'Poppins', sans-serif",
//     padding: '20px',
//     paddingTop: '90px',
//   },
//   content: {
//     width: '100%',
//     maxWidth: '1200px',
//     padding: '30px',
//     backgroundColor: 'rgba(255, 255, 255, 0.95)',
//     borderRadius: '10px',
//     boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
//   },
//   headerContainer: {
//     display: 'flex',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: '30px',
//   },
//   mainHeading: {
//     fontSize: '36px',
//     color: '#ff8c00',
//     fontWeight: '600',
//   },
//   addButton: {
//     backgroundColor: '#ff8c00',
//     color: 'white',
//     border: 'none',
//     padding: '10px 15px',
//     borderRadius: '5px',
//     cursor: 'pointer',
//     fontSize: '16px',
//     display: 'flex',
//     alignItems: 'center',
//     transition: 'background-color 0.3s',
//   },
//   addIcon: {
//     marginRight: '8px',
//   },
//   addFormContainer: {
//     backgroundColor: '#f9f9f9',
//     padding: '20px',
//     borderRadius: '8px',
//     marginBottom: '30px',
//     boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
//   },
//   addFormHeading: {
//     fontSize: '22px',
//     color: '#ff8c00',
//     marginBottom: '15px',
//   },
//   addForm: {
//     display: 'flex',
//     flexDirection: 'column',
//     gap: '15px',
//   },
//   formInput: {
//     padding: '12px 15px',
//     borderRadius: '5px',
//     border: '1px solid #ddd',
//     fontSize: '16px',
//     width: '100%',
//   },
//   formButtons: {
//     display: 'flex',
//     gap: '10px',
//   },
//   submitButton: {
//     backgroundColor: '#ff8c00',
//     color: 'white',
//     border: 'none',
//     padding: '10px 15px',
//     borderRadius: '5px',
//     cursor: 'pointer',
//     fontSize: '16px',
//   },
//   cancelButton: {
//     backgroundColor: '#ccc',
//     color: '#333',
//     border: 'none',
//     padding: '10px 15px',
//     borderRadius: '5px',
//     cursor: 'pointer',
//     fontSize: '16px',
//   },
//   articlesContainer: {
//     display: 'grid',
//     gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
//     gap: '30px',
//     marginBottom: '50px',
//   },
//   article: {
//     backgroundColor: '#fff',
//     borderRadius: '8px',
//     padding: '20px',
//     boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
//     transition: 'transform 0.3s ease',
//     cursor: 'pointer',
//     border: '1px solid #eee',
//   },
//   articleHeader: {
//     display: 'flex',
//     justifyContent: 'space-between',
//     alignItems: 'flex-start',
//     marginBottom: '10px',
//   },
//   articleTitle: {
//     fontSize: '20px',
//     color: '#333',
//     marginBottom: '10px',
//   },
//   deleteButton: {
//     backgroundColor: 'transparent',
//     color: '#ff5252',
//     border: 'none',
//     cursor: 'pointer',
//     fontSize: '16px',
//     padding: '5px',
//   },
//   articleDate: {
//     fontSize: '14px',
//     color: '#888',
//     marginBottom: '15px',
//   },
//   articleContent: {
//     fontSize: '16px',
//     color: '#555',
//     lineHeight: '1.6',
//     marginBottom: '20px',
//   },
//   readMoreButton: {
//     backgroundColor: '#ff8c00',
//     color: 'white',
//     border: 'none',
//     padding: '8px 15px',
//     borderRadius: '5px',
//     cursor: 'pointer',
//     fontSize: '14px',
//     transition: 'background-color 0.3s',
//   },
//   subscriptionContainer: {
//     display: 'flex',
//     justifyContent: 'center',
//     marginTop: '30px',
//   },
//   subscriptionBox: {
//     backgroundColor: '#fff8e6',
//     border: '2px solid #ff8c00',
//     borderRadius: '10px',
//     padding: '10px',
//     width: '100%',
//     maxWidth: '600px',
//     textAlign: 'center',
//   },
//   subscriptionHeading: {
//     fontSize: '24px',
//     color: '#ff8c00',
//     marginBottom: '15px',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   subscriptionIcon: {
//     marginRight: '10px',
//   },
//   subscriptionText: {
//     fontSize: '16px',
//     color: '#555',
//     marginBottom: '25px',
//   },
//   subscriptionForm: {
//     display: 'flex',
//     flexDirection: 'column',
//     gap: '15px',
//   },
//   emailInput: {
//     padding: '12px 15px',
//     borderRadius: '5px',
//     border: '1px solid #ddd',
//     fontSize: '16px',
//     width: '90%',
//   },
//   subscribeButton: {
//     backgroundColor: '#ff8c00',
//     color: 'white',
//     border: 'none',
//     padding: '12px 20px',
//     borderRadius: '5px',
//     cursor: 'pointer',
//     fontSize: '16px',
//     fontWeight: 'bold',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     transition: 'background-color 0.3s',
//   },
//   buttonIcon: {
//     marginLeft: '10px',
//   },
//   thankYouMessage: {
//     backgroundColor: '#e6f7e6',
//     padding: '20px',
//     borderRadius: '5px',
//     color: '#2e7d32',
//     fontSize: '16px',
//   },
//   '@keyframes panAnimation': {
//     '0%': { transform: 'translateX(-10px)' },
//     '100%': { transform: 'translateX(10px)' },
//   },
//   modalOverlay: {
//     position: 'fixed',
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     backgroundColor: 'rgba(0, 0, 0, 0.7)',
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     zIndex: 1000,
//   },
//   modalContent: {
//     backgroundColor: 'white',
//     borderRadius: '10px',
//     padding: '30px',
//     width: '90%',
//     maxWidth: '800px',
//     maxHeight: '80vh',
//     overflow: 'auto',
//     position: 'relative',
//   },
//   closeButton: {
//     position: 'absolute',
//     top: '15px',
//     right: '15px',
//     background: 'none',
//     border: 'none',
//     fontSize: '20px',
//     cursor: 'pointer',
//     color: '#555',
//   },
//   modalTitle: {
//     fontSize: '28px',
//     color: '#ff8c00',
//     marginBottom: '20px',
//     textAlign: 'center',
//   },
//   modalArticlesContainer: {
//     display: 'flex',
//     flexDirection: 'column',
//     gap: '30px',
//   },
//   modalArticle: {
//     padding: '20px',
//     borderRadius: '8px',
//     boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
//     backgroundColor: '#f9f9f9',
//   },
//   modalArticleTitle: {
//     fontSize: '22px',
//     color: '#333',
//     marginBottom: '10px',
//   },
//   modalArticleSource: {
//     fontSize: '14px',
//     color: '#888',
//     marginBottom: '15px',
//     fontStyle: 'italic',
//   },
//   modalArticleDescription: {
//     fontSize: '16px',
//     color: '#444',
//     marginBottom: '15px',
//     fontWeight: 'bold',
//   },
//   modalArticleContent: {
//     fontSize: '16px',
//     color: '#555',
//     lineHeight: '1.6',
//     marginBottom: '20px',
//   },
//   readFullArticleButton: {
//     display: 'inline-block',
//     backgroundColor: '#ff8c00',
//     color: 'white',
//     textDecoration: 'none',
//     padding: '8px 15px',
//     borderRadius: '5px',
//     fontSize: '14px',
//     transition: 'background-color 0.3s',
//   },
//   loadingContainer: {
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     height: '200px',
//     fontSize: '18px',
//     color: '#555',
//   }
// };

// export default Newsletter;

import React, { useState, useEffect } from "react";
import { FaEnvelope, FaPaperPlane, FaTimes, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { MdDeleteSweep } from "react-icons/md";
import axios from 'axios';
import { Toaster } from "react-hot-toast";
import { toast } from "react-hot-toast";

const NEWS_API_KEY = "49d8202a37b24a62b7fd9d6fa7f6aac2"; 

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newNewsletter, setNewNewsletter] = useState({ title: "", description: "" });

  React.useEffect(() => {
    const fetchNewsletters = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/newsletter/newsletter');
        if (!response.ok) {
          throw new Error('Failed to fetch newsletters');
        }
        
        const data = await response.json();
        
        const formattedArticles = data.map(newsletter => ({
          _id: newsletter._id,
          title: newsletter.title,
          date: `Published: ${new Date(newsletter.publishedAt).toLocaleDateString()}`,
          summary: newsletter.description,
          fullContent: "",
          loading: false,
        }));
        
        setArticles(formattedArticles);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching newsletters:', err);
        setError('Failed to load newsletters. Please try again later.');
        setLoading(false);
      }
    };

    fetchNewsletters();
  }, []);
  const navigate = useNavigate();

  const fetchFertilityNews = async (index) => {
    setArticles((prevArticles) =>
      prevArticles.map((article, i) =>
        i === index ? { ...article, loading: true } : article
      )
    );
    setIsLoading(true);

    try {
      const response = await fetch(
        `https://newsapi.org/v2/everything?q=fertility%20treatments&sortBy=publishedAt&apiKey=${NEWS_API_KEY}`
      );
      if (!response.ok) throw new Error("Failed to fetch articles");

      const data = await response.json();
      const newsArticles = data.articles.slice(0, 3); 
      
      setModalContent(newsArticles.map(article => ({
        title: article.title,
        description: article.description,
        content: article.content,
        url: article.url,
        publishedAt: new Date(article.publishedAt).toLocaleDateString(),
        source: article.source.name
      })));
      
      setShowModal(true);
      
      setArticles((prevArticles) =>
        prevArticles.map((article, i) =>
          i === index ? { ...article, loading: false } : article
        )
      );
    } catch (error) {
      console.error("🚨 Error fetching news:", error);
      alert("Failed to fetch news. Please try again.");
      setArticles((prevArticles) =>
        prevArticles.map((article, i) =>
          i === index ? { ...article, loading: false } : article
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleReadMore = (index, title) => {
    if (index < articles.length) {
      fetchFertilityNews(index); 
    } else {
      const query = encodeURIComponent(title);
      window.open(`https://www.google.com/search?q=${query}`, "_blank");
    }
  };

  const handleSubscribe = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Please log in to subscribe');
        return;
      }

      await axios.post('http://localhost:5000/api/newsletter/subscribe', {}, {
        headers: { 'x-auth-token': token }
      });

      localStorage.setItem('isSubscribed', 'true');
      toast.success('Successfully subscribed to newsletter!');
    } catch (err) {
      console.error('Error subscribing to newsletter:', err);
      toast.error(err.response?.data?.msg || 'Error subscribing to newsletter');
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handelsubscribe = async (e) => {
    e.preventDefault();
    if (email && email.includes("@")) {
      try {
        const response = await fetch('http://localhost:5000/api/newsData/subscribe', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            email, 
            name: localStorage.getItem('name') || 'Subscriber' 
          }),
        });
        
        const data = await response.json();
        
        if (response.ok) {
          setIsSubscribed(true);
          setEmail("");
          console.log("Successfully subscribed:", data.message);
        } else {
          alert(data.message || "Failed to subscribe. Please try again.");
        }
      } catch (error) {
        console.error("Error subscribing to newsletter:", error);
        alert("An error occurred. Please try again later.");
      }
    } else {
      alert("Please enter a valid email address");
    }
  };
  
  const handleAddNewsletter = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const token = localStorage.getItem('token');
      if (!token) {
        alert("You must be logged in to add a newsletter");
        setIsLoading(false);
        return;
      }

      const response = await fetch('http://localhost:5000/api/newsletter/addnewsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token
        },
        body: JSON.stringify(newNewsletter),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        alert("Newsletter created and sent to subscribers successfully!");
        setShowAddForm(false);
        setNewNewsletter({ title: "", description: "" });
        
        const updatedArticles = [...articles, {
          title: newNewsletter.title,
          date: `Published: ${new Date().toLocaleDateString()}`,
          summary: newNewsletter.description,
          fullContent: "",
          loading: false,
        }];
        setArticles(updatedArticles);
        setIsLoading(false);
      } else {
        alert(data.error || "Failed to create newsletter");
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error creating newsletter:", error);
      alert("An error occurred. Please try again later.");
      setIsLoading(false);
    }
  };

  const handleDeleteNewsletter = async (id) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Please log in to delete newsletters');
        return;
      }

      await axios.delete(`http://localhost:5000/api/newsletter/newsletter/${id}`, {
        headers: { 'x-auth-token': token }
      });

      setArticles(articles.filter(article => article._id !== id));
      toast.success('Newsletter deleted successfully');
    } catch (err) {
      console.error('Error deleting newsletter:', err);
      toast.error(err.response?.data?.msg || 'Error deleting newsletter');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <div style={styles.headerContainer}>
          <h1 style={styles.mainHeading}>Fertility Health Newsletter</h1>
          {(localStorage.getItem('userEmail') === 'reshu@exa.com' || localStorage.getItem('userEmail') === 'riyanshigupta2004@gmail.com') && (
            <button 
              onClick={() => setShowAddForm(!showAddForm)} 
              style={styles.addButton}
            >
              <FaPlus style={styles.addIcon} /> Add Newsletter
            </button>
          )}
        </div>

        {showAddForm && (
          <div style={styles.addFormContainer}>
            <h2 style={styles.addFormHeading}>Create New Newsletter</h2>
            <form onSubmit={handleAddNewsletter} style={styles.addForm}>
              <input
                type="text"
                placeholder="Newsletter Title"
                value={newNewsletter.title}
                onChange={(e) => setNewNewsletter({...newNewsletter, title: e.target.value})}
                style={styles.formInput}
                required
              />
              <textarea
                placeholder="Newsletter Description"
                value={newNewsletter.description}
                onChange={(e) => setNewNewsletter({...newNewsletter, description: e.target.value})}
                style={{...styles.formInput, minHeight: '100px'}}
                required
              />
              <div style={styles.formButtons}>
                {isLoading ? (
                  <button type="button" style={styles.submitButton} disabled>
                    Creating...
                  </button>
                ) : (
                  <>
                    <button type="submit" style={styles.submitButton}>
                    Create Newsletter
                  </button>
                  </>
                )}
                <button 
                  type="button" 
                  onClick={() => setShowAddForm(false)} 
                  style={styles.cancelButton}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div style={styles.articlesContainer}>
          {articles.map((article, index) => (
            <div key={index} style={styles.article}>
              <div style={styles.articleHeader}>
                <h2 style={styles.articleTitle}>{article.title}</h2>
                {(localStorage.getItem('userEmail') === 'reshu@exa.com' || localStorage.getItem('userEmail') === 'riyanshigupta2004@gmail.com') && (
                  <button
                    onClick={() => handleDeleteNewsletter(article._id)}
                    style={styles.deleteButton}
                    aria-label="Delete newsletter"
                  >
                    <MdDeleteSweep />
                  </button>
                )}
              </div>
              <p style={styles.articleDate}>{article.date}</p>
              <p style={styles.articleContent}>{article.summary}</p>
              <button
                onClick={() => handleReadMore(index, article.title)}
                style={styles.readMoreButton}
                disabled={article.loading}
              >
                {article.loading ? "Loading..." : "Read More"}
              </button>
            </div>
          ))}
        </div>

        <div style={styles.subscriptionContainer}>
          <div style={styles.subscriptionBox}>
            <h2 style={styles.subscriptionHeading}>
              <FaEnvelope style={styles.subscriptionIcon} />
              Subscribe to Our Newsletter
            </h2>
            <p style={styles.subscriptionText}>
              Get the latest fertility health news, tips, and research delivered
              directly to your inbox.
            </p>
            
            {localStorage.getItem('isSubscribed') === 'true' ? (
              <div style={styles.thankYouMessage}>
                <p>Thank you for subscribing!</p>
                <p>You'll receive our next newsletter soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} style={styles.subscriptionForm}>
                <button type="submit" style={styles.subscribeButton}>
                  Subscribe <FaPaperPlane style={styles.buttonIcon} />
                </button>
              </form>
            )}
          </div>
        </div>

        {showModal && (
          <div style={styles.modalOverlay}>
            <div style={styles.modalContent}>
              <button style={styles.closeButton} onClick={closeModal}>
                <FaTimes />
              </button>
              <h2 style={styles.modalTitle}>Latest Fertility News</h2>
              
              {isLoading ? (
                <div style={styles.loadingContainer}>
                  <p>Loading articles...</p>
                </div>
              ) : (
                <div style={styles.modalArticlesContainer}>
                  {modalContent.map((article, index) => (
                    <div key={index} style={styles.modalArticle}>
                      <h3 style={styles.modalArticleTitle}>{article.title}</h3>
                      <p style={styles.modalArticleSource}>
                        Source: {article.source} | Published: {article.publishedAt}
                      </p>
                      <p style={styles.modalArticleDescription}>{article.description}</p>
                      <p style={styles.modalArticleContent}>
                        {article.content?.replace(/\[\+\d+ chars\]$/, '') || 'No content available'}
                      </p>
                      <a 
                        href={article.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        style={styles.readFullArticleButton}
                      >
                        Read Full Article
                      </a>
                    </div>
                  ))}
                </div>
              )}
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
}

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
    // Adding a semi-transparent overlay
    '::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(253, 232, 233, 0.7)', // Light pink overlay with 70% opacity
      zIndex: -1,
    }
  },
  content: {
    width: '100%',
    maxWidth: '1200px',
    padding: '30px',
    backgroundColor: 'rgba(255, 255, 255, 0.7)', // Added transparency to the background
    backdropFilter: 'blur(5px)', // Optional: adds a slight blur effect for better readability
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
  mainHeading: {
    fontSize: '36px',
    color: '#B85170',
    fontWeight: '600',
  },
  addButton: {
    backgroundColor: '#b15870',
    color: 'white',
    border: 'none',
    padding: '10px 15px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    display: 'flex',
    alignItems: 'center',
    transition: 'background-color 0.3s',
  },
  addIcon: {
    marginRight: '8px',
  },
  addFormContainer: {
    backgroundColor: '#f9f9f9',
    padding: '20px',
    borderRadius: '8px',
    marginBottom: '30px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
  },
  addFormHeading: {
    fontSize: '22px',
    color: '#B85170',
    marginBottom: '15px',
  },
  addForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  formInput: {
    padding: '12px 15px',
    borderRadius: '5px',
    border: '1px solid #ddd',
    fontSize: '16px',
    width: '100%',
    color: '#000000',
  },
  formButtons: {
    display: 'flex',
    gap: '10px',
  },
  submitButton: {
    backgroundColor: '#b15870',
    color: 'white',
    border: 'none',
    padding: '10px 15px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  cancelButton: {
    backgroundColor: '#ccc',
    color: '#333',
    border: 'none',
    padding: '10px 15px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  articlesContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '30px',
    marginBottom: '50px',
  },
  article: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease',
    cursor: 'pointer',
    border: '1px solid #eee',
  },
  articleHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '10px',
  },
  articleTitle: {
    fontSize: '20px',
    color: '#333',
    marginBottom: '10px',
  },
  deleteButton: {
    backgroundColor: 'transparent',
    color: '#ff5252',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
    padding: '5px',
  },
  articleDate: {
    fontSize: '14px',
    color: '#888',
    marginBottom: '15px',
  },
  articleContent: {
    fontSize: '16px',
    color: '#000000',
    lineHeight: '1.6',
    marginBottom: '20px',
  },
  readMoreButton: {
    backgroundColor: '#b15870',
    color: 'white',
    border: 'none',
    padding: '8px 15px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '14px',
    transition: 'background-color 0.3s',
  },
  subscriptionContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '30px',
  },
  subscriptionBox: {
    backgroundColor: 'rgba(253,232,233,1)',
    border: '2px solid #b15870',
    borderRadius: '10px',
    padding: '10px',
    width: '100%',
    maxWidth: '600px',
    textAlign: 'center',
  },
  subscriptionHeading: {
    fontSize: '24px',
    color: '#B85170',
    marginBottom: '15px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  subscriptionIcon: {
    marginRight: '10px',
  },
  subscriptionText: {
    fontSize: '16px',
    color: '#000000',
    marginBottom: '25px',
  },
  subscriptionForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  emailInput: {
    padding: '12px 15px',
    borderRadius: '5px',
    border: '1px solid #ddd',
    fontSize: '16px',
    width: '90%',
    color: '#000000',
  },
  subscribeButton: {
    backgroundColor: '#b15870',
    color: 'white',
    border: 'none',
    padding: '12px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background-color 0.3s',
  },
  buttonIcon: {
    marginLeft: '10px',
  },
  thankYouMessage: {
    backgroundColor: '#E7E5FF', // Changed to purple
    padding: '20px',
    borderRadius: '5px',
    color: '#3D348B', // Changed to dark purple
    fontSize: '16px',
  },
  '@keyframes panAnimation': {
    '0%': { transform: 'translateX(-10px)' },
    '100%': { transform: 'translateX(10px)' },
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: '10px',
    padding: '30px',
    width: '90%',
    maxWidth: '800px',
    maxHeight: '80vh',
    overflow: 'auto',
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: '15px',
    right: '15px',
    background: 'none',
    border: 'none',
    fontSize: '20px',
    cursor: 'pointer',
    color: '#555',
  },
  modalTitle: {
    fontSize: '28px',
    color: '#B85170',
    marginBottom: '20px',
    textAlign: 'center',
  },
  modalArticlesContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '30px',
  },
  modalArticle: {
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#f9f9f9',
  },
  modalArticleTitle: {
    fontSize: '22px',
    color: '#333',
    marginBottom: '10px',
  },
  modalArticleSource: {
    fontSize: '14px',
    color: '#888',
    marginBottom: '15px',
    fontStyle: 'italic',
  },
  modalArticleDescription: {
    fontSize: '16px',
    color: '#000000',
    marginBottom: '15px',
    fontWeight: 'bold',
  },
  modalArticleContent: {
    fontSize: '16px',
    color: '#000000',
    lineHeight: '1.6',
    marginBottom: '20px',
  },
  readFullArticleButton: {
    display: 'inline-block',
    backgroundColor: '#b15870',
    color: 'white',
    textDecoration: 'none',
    padding: '8px 15px',
    borderRadius: '5px',
    fontSize: '14px',
    transition: 'background-color 0.3s',
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '200px',
    fontSize: '18px',
    color: '#000000',
  }
};

export default Newsletter;