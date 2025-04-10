// import React, { useState, useEffect, useRef } from 'react';
// import { FaRobot, FaMicrophone } from 'react-icons/fa';
// import { IoSend, IoClose } from 'react-icons/io5';

// const Chatbot = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [messages, setMessages] = useState([
//     { type: 'model', text: "Welcome! What's on Your Mind Today?" }
//   ]);
//   const [inputValue, setInputValue] = useState('');
//   const [isTyping, setIsTyping] = useState(false);
//   const chatBoxRef = useRef(null);
//   const inputRef = useRef(null);
//   const recognitionRef = useRef(null);
//   const lastTopicRef = useRef("");

//   useEffect(() => {
//     if ("webkitSpeechRecognition" in window) {
//       recognitionRef.current = new window.webkitSpeechRecognition();
//       recognitionRef.current.lang = "en-US";
//       recognitionRef.current.continuous = false;
//       recognitionRef.current.interimResults = false;
//       recognitionRef.current.maxAlternatives = 1;

//       recognitionRef.current.onresult = (event) => {
//         const transcript = event.results[0][0].transcript;
//         setInputValue(transcript);
//         handleSendMessage(transcript);
//       };

//       recognitionRef.current.onerror = (event) => {
//         console.error("Speech recognition error:", event.error);
//       };
//     }

//     if (chatBoxRef.current) {
//       chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
//     }
//   }, [messages]);

//   const toggleChatbot = () => {
//     setIsOpen(!isOpen);
//   };

//   const isDoctorQuery = (userMessage) => {
//     return /doctor|specialist|hospital|clinic|treatment/i.test(userMessage);
//   };

//   const searchDoctorsOnline = async (userMessage) => {
//     const query = encodeURIComponent(userMessage);
//     const searchUrl = `https://www.google.com/search?q=${query}`;
//     return `
//       <p>Here are some top doctors based on your query:</p>
//       <ul>
//         <li><a href="${searchUrl}" target="_blank">Click here to view search results</a></li>
//       </ul>
//     `;
//   };

//   const callGeminiAPI = async (userMessage) => {
//     if (isDoctorQuery(userMessage)) {
//       return searchDoctorsOnline(userMessage);
//     }

//     if (userMessage.toLowerCase().includes("more info") && lastTopicRef.current) {
//       userMessage = `Give me more details about ${lastTopicRef.current}`;
//     } else {
//       lastTopicRef.current = userMessage;
//     }

//     try {
//       const API_KEY = "AIzaSyBlK3GWHjy_jKXXxHgHglPsm87CiFEJDJ4";
//       const url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";
//       const response = await fetch(`${url}?key=${API_KEY}`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           contents: [{ 
//             parts: [{ 
//               text: `${userMessage}. Provide concise, point-wise answer. Keep responses brief (1-3 lines per point) but cover all key details. Prioritize clarity and usefulness. If unsure, ask for clarification..` 
//             }] 
//           }],
//           generationConfig: {
//             temperature: 0.7,
//             maxOutputTokens: 512,
//           }
//         }),
//       });

//       const data = await response.json();
//       if (data.candidates && data.candidates[0].content) {
//         const aiResponse = data.candidates[0].content.parts[0].text;
//         return formatResponse(aiResponse);
//       } else {
//         return "<p>Sorry, I couldn't generate a response at this time.</p>";
//       }
//     } catch (error) {
//       console.error("Error calling API:", error);
//       return "<p>Error connecting to AI service.</p>";
//     }
//   };

//   const formatResponse = (responseText) => {
//     // Extract only the most relevant parts of the response
//     const lines = responseText.split("\n").filter(line => line.trim());
//     let formatted = "<ul>";
    
//     // Process only the most relevant points without a fixed limit
//     for (let i = 0; i < lines.length; i++) {
//       // Skip empty or very short lines that likely don't contain useful information
//       if (lines[i].length < 3) continue;
      
//       let formattedLine = lines[i].trim();
//       // Remove all asterisks from the line
//       formattedLine = formattedLine.replace(/\*/g, '');

//       if (formattedLine.includes(":")) {
//         const parts = formattedLine.split(":");
//         const header = parts[0].trim();
//         const body = parts.slice(1).join(":").trim();
//         formatted += `<li><strong>${header}</strong>: ${body}</li>`;
//       } else {
//         formatted += `<li>${formattedLine}</li>`;
//       }
//     }

//     formatted += "</ul>";
//     return formatted;
//   };

//   const typeResponse = async (formattedHTML) => {
//     setIsTyping(true);
    
//     const tempDiv = document.createElement("div");
//     tempDiv.innerHTML = formattedHTML;
//     const items = tempDiv.querySelectorAll("li");
    
//     let typedItems = [];
    
//     for (let i = 0; i < items.length; i++) {
//       const text = items[i].innerHTML;
//       let words = text.split(" ");
//       let tempText = "";
      
//       for (let j = 0; j < words.length; j++) {
//         tempText += words[j] + " ";
//         typedItems[i] = tempText.trim();
        
//         setMessages(prevMessages => {
//           const newMessages = [...prevMessages];
//           const lastMessage = newMessages[newMessages.length - 1];
//           lastMessage.items = typedItems;
//           return newMessages;
//         });
        
//         await new Promise(resolve => setTimeout(resolve, 30));
//       }
//       await new Promise(resolve => setTimeout(resolve, 300));
//     }
    
//     setIsTyping(false);
//   };

//   const handleSendMessage = async (text = inputValue) => {
//     const userMessage = text.trim();
//     if (!userMessage) return;

//     setMessages(prevMessages => [
//       ...prevMessages,
//       { type: 'user', text: userMessage }
//     ]);

//     setInputValue('');

//     setMessages(prevMessages => [
//       ...prevMessages,
//       { type: 'model', text: '...', items: [], isLoading: true }
//     ]);

//     const botResponse = await callGeminiAPI(userMessage);

//     setMessages(prevMessages => {
//       const newMessages = [...prevMessages];
//       const loadingIndex = newMessages.findIndex(msg => msg.isLoading);
//       if (loadingIndex !== -1) {
//         newMessages[loadingIndex] = { 
//           type: 'model', 
//           text: '', 
//           items: [], 
//           isLoading: false,
//           html: botResponse
//         };
//       }
//       return newMessages;
//     });

//     await typeResponse(botResponse);
//   };

//   const handleVoiceRecognition = () => {
//     if (!recognitionRef.current) {
//       alert("Your browser doesn't support speech recognition. Please use Chrome.");
//       return;
//     }
    
//     recognitionRef.current.start();
//   };

//   return (
//     <div style={styles.chatbotContainer}>
//       {isOpen && (
//         <div style={styles.chatbotWindow}>
//           <button onClick={toggleChatbot} style={styles.closeButton}>
//             <IoClose size={20} />
//           </button>
          
//           <div style={styles.chatHeader}>
//             <h3 style={styles.chatbotHeading}>UmbraCare</h3>
//             <p style={styles.chatbotSubheading}>PREDICT.PLAN.PROSPER - SMARTER WOMEN'S HEALTH</p>
//           </div>
          
//           <div style={styles.chatBox} ref={chatBoxRef}>
//             {messages.map((message, index) => (
//               <div 
//                 key={index} 
//                 style={message.type === 'user' ? styles.userMessage : styles.modelMessage}
//               >
//                 {message.type === 'user' ? (
//                   <>
//                     <p style={styles.messageText}>{message.text}</p>
//                     <div style={styles.userIcon}></div>
//                   </>
//                 ) : (
//                   <>
//                     <div style={styles.botIcon}>
//                       <FaRobot size={16} color="#fff" />
//                     </div>
//                     {message.html ? (
//                       <ul style={styles.messageList}>
//                         {message.items && message.items.map((item, i) => (
//                           <li key={i} dangerouslySetInnerHTML={{ __html: item }}></li>
//                         ))}
//                       </ul>
//                     ) : (
//                       <p style={styles.messageText}>{message.text}</p>
//                     )}
//                   </>
//                 )}
//               </div>
//             ))}
//           </div>
          
//           <div style={styles.inputArea}>
//             <button 
//               style={styles.voiceButton}
//               onClick={handleVoiceRecognition}
//             >
//               <FaMicrophone size={16} color="#ff8c00" />
//             </button>
            
//             <input
//               ref={inputRef}
//               style={styles.input}
//               value={inputValue}
//               onChange={(e) => setInputValue(e.target.value)}
//               onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
//               placeholder="Ask me anything..."
//               type="text"
//             />
            
//             <button 
//               style={styles.sendButton}
//               onClick={() => handleSendMessage()}
//             >
//               <IoSend size={16} color="#ff8c00" />
//             </button>
//           </div>
//         </div>
//       )}
      
//       <div style={styles.chatbotIcon} onClick={toggleChatbot}>
//         <FaRobot size={30} />
//       </div>
//     </div>
//   );
// };

// const styles = {
//   chatbotContainer: {
//     position: 'fixed',
//     bottom: '20px',
//     right: '20px',
//     zIndex: 1000,
//   },
//   chatbotIcon: {
//     backgroundColor: '#ff8c00',
//     color: '#fff',
//     padding: '15px',
//     borderRadius: '50%',
//     cursor: 'pointer',
//     boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   chatbotWindow: {
//     backgroundColor: '#fff',
//     borderRadius: '10px',
//     boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
//     width: '350px',
//     height: '500px',
//     marginBottom: '10px',
//     border: '2px solid #ff8c00',
//     display: 'flex',
//     flexDirection: 'column',
//     position: 'relative',
//   },
//   closeButton: {
//     position: 'absolute',
//     top: '10px',
//     right: '10px',
//     backgroundColor: 'transparent',
//     border: 'none',
//     color: '#ff8c00',
//     fontSize: '20px',
//     cursor: 'pointer',
//     zIndex: 10,
//   },
//   chatHeader: {
//     backgroundColor: '#ff8c00',
//     padding: '15px',
//     borderTopLeftRadius: '8px',
//     borderTopRightRadius: '8px',
//     textAlign: 'center',
//   },
//   chatbotHeading: {
//     fontSize: '20px',
//     color: '#fff',
//     margin: '0',
//     fontWeight: '600',
//   },
//   chatbotSubheading: {
//     fontSize: '12px',
//     color: '#fff',
//     margin: '5px 0 0',
//   },
//   chatBox: {
//     flex: 1,
//     padding: '15px',
//     overflowY: 'auto',
//     display: 'flex',
//     flexDirection: 'column',
//     gap: '15px',
//   },
//   userMessage: {
//     alignSelf: 'flex-end',
//     backgroundColor: '#f0f0f0',
//     borderRadius: '15px 15px 0 15px',
//     padding: '10px 15px',
//     maxWidth: '80%',
//     display: 'flex',
//     position: 'relative',
//   },
//   modelMessage: {
//     alignSelf: 'flex-start',
//     backgroundColor: '#fff8f0',
//     borderRadius: '15px 15px 15px 0',
//     padding: '10px 15px',
//     maxWidth: '80%',
//     display: 'flex',
//     position: 'relative',
//     border: '1px solid #ffe0c0',
//   },
//   userIcon: {
//     width: '30px',
//     height: '30px',
//     borderRadius: '50%',
//     backgroundColor: '#ff8c00',
//     marginLeft: '10px',
//   },
//   botIcon: {
//     width: '30px',
//     height: '30px',
//     borderRadius: '50%',
//     backgroundColor: '#ff8c00',
//     marginRight: '10px',
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   messageText: {
//     margin: '0',
//     fontSize: '14px',
//   },
//   messageList: {
//     margin: '0',
//     padding: '0 0 0 20px',
//     fontSize: '14px',
//   },
//   inputArea: {
//     display: 'flex',
//     padding: '10px',
//     borderTop: '1px solid #eee',
//   },
//   voiceButton: {
//     backgroundColor: '#fff',
//     border: '1px solid #ddd',
//     borderRadius: '50%',
//     width: '40px',
//     height: '40px',
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     cursor: 'pointer',
//     marginRight: '10px',
//   },
//   input: {
//     flex: 1,
//     padding: '10px 15px',
//     borderRadius: '20px',
//     border: '1px solid #ddd',
//     outline: 'none',
//     fontSize: '14px',
//   },
//   sendButton: {
//     backgroundColor: '#fff',
//     border: '1px solid #ddd',
//     borderRadius: '50%',
//     width: '40px',
//     height: '40px',
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     cursor: 'pointer',
//     marginLeft: '10px',
//   },
// };

// export default Chatbot;


import React, { useState, useEffect, useRef } from 'react';
import { FaRobot, FaMicrophone } from 'react-icons/fa';
import { IoSend, IoClose } from 'react-icons/io5';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { type: 'model', text: "Welcome! What's on Your Mind Today?" }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatBoxRef = useRef(null);
  const inputRef = useRef(null);
  const recognitionRef = useRef(null);
  const lastTopicRef = useRef("");

  useEffect(() => {
    if ("webkitSpeechRecognition" in window) {
      recognitionRef.current = new window.webkitSpeechRecognition();
      recognitionRef.current.lang = "en-US";
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.maxAlternatives = 1;

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputValue(transcript);
        handleSendMessage(transcript);
      };

      recognitionRef.current.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
      };
    }

    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  const isDoctorQuery = (userMessage) => {
    return /doctor|specialist|hospital|clinic|treatment/i.test(userMessage);
  };

  const searchDoctorsOnline = async (userMessage) => {
    const query = encodeURIComponent(userMessage);
    const searchUrl = `https://www.google.com/search?q=${query}`;
    return `
      <p>Here are some top doctors based on your query:</p>
      <ul>
        <li><a href="${searchUrl}" target="_blank">Click here to view search results</a></li>
      </ul>
    `;
  };

  const callGeminiAPI = async (userMessage) => {
    if (isDoctorQuery(userMessage)) {
      return searchDoctorsOnline(userMessage);
    }

    if (userMessage.toLowerCase().includes("more info") && lastTopicRef.current) {
      userMessage = `Give me more details about ${lastTopicRef.current}`;
    } else {
      lastTopicRef.current = userMessage;
    }

    try {
      const API_KEY = "AIzaSyBlK3GWHjy_jKXXxHgHglPsm87CiFEJDJ4";
      const url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";
      const response = await fetch(`${url}?key=${API_KEY}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [{ 
            parts: [{ 
              text: `${userMessage}. Provide concise, point-wise answer. Keep responses brief (1-3 lines per point) but cover all key details. Prioritize clarity and usefulness. If unsure, ask for clarification..` 
            }] 
          }],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 512,
          }
        }),
      });

      const data = await response.json();
      if (data.candidates && data.candidates[0].content) {
        const aiResponse = data.candidates[0].content.parts[0].text;
        return formatResponse(aiResponse);
      } else {
        return "<p>Sorry, I couldn't generate a response at this time.</p>";
      }
    } catch (error) {
      console.error("Error calling API:", error);
      return "<p>Error connecting to AI service.</p>";
    }
  };

  const formatResponse = (responseText) => {
    const lines = responseText.split("\n").filter(line => line.trim());
    let formatted = "<ul>";
    
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].length < 3) continue;
      
      let formattedLine = lines[i].trim();
      formattedLine = formattedLine.replace(/\*/g, '');

      if (formattedLine.includes(":")) {
        const parts = formattedLine.split(":");
        const header = parts[0].trim();
        const body = parts.slice(1).join(":").trim();
        formatted += `<li><strong>${header}</strong>: ${body}</li>`;
      } else {
        formatted += `<li>${formattedLine}</li>`;
      }
    }

    formatted += "</ul>";
    return formatted;
  };

  const typeResponse = async (formattedHTML) => {
    setIsTyping(true);
    
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = formattedHTML;
    const items = tempDiv.querySelectorAll("li");
    
    let typedItems = [];
    
    for (let i = 0; i < items.length; i++) {
      const text = items[i].innerHTML;
      let words = text.split(" ");
      let tempText = "";
      
      for (let j = 0; j < words.length; j++) {
        tempText += words[j] + " ";
        typedItems[i] = tempText.trim();
        
        setMessages(prevMessages => {
          const newMessages = [...prevMessages];
          const lastMessage = newMessages[newMessages.length - 1];
          lastMessage.items = typedItems;
          return newMessages;
        });
        
        await new Promise(resolve => setTimeout(resolve, 30));
      }
      await new Promise(resolve => setTimeout(resolve, 300));
    }
    
    setIsTyping(false);
  };

  const handleSendMessage = async (text = inputValue) => {
    const userMessage = text.trim();
    if (!userMessage) return;

    setMessages(prevMessages => [
      ...prevMessages,
      { type: 'user', text: userMessage }
    ]);

    setInputValue('');

    setMessages(prevMessages => [
      ...prevMessages,
      { type: 'model', text: '...', items: [], isLoading: true }
    ]);

    const botResponse = await callGeminiAPI(userMessage);

    setMessages(prevMessages => {
      const newMessages = [...prevMessages];
      const loadingIndex = newMessages.findIndex(msg => msg.isLoading);
      if (loadingIndex !== -1) {
        newMessages[loadingIndex] = { 
          type: 'model', 
          text: '', 
          items: [], 
          isLoading: false,
          html: botResponse
        };
      }
      return newMessages;
    });

    await typeResponse(botResponse);
  };

  const handleVoiceRecognition = () => {
    if (!recognitionRef.current) {
      alert("Your browser doesn't support speech recognition. Please use Chrome.");
      return;
    }
    
    recognitionRef.current.start();
  };

  return (
    <div style={styles.chatbotContainer}>
      {isOpen && (
        <div style={styles.chatbotWindow}>
          <button onClick={toggleChatbot} style={styles.closeButton}>
            <IoClose size={20} />
          </button>
          
          <div style={styles.chatHeader}>
            <h3 style={styles.chatbotHeading}>UmbraCare</h3>
            <p style={styles.chatbotSubheading}>PREDICT.PLAN.PROSPER - SMARTER WOMEN'S HEALTH</p>
          </div>
          
          <div style={styles.chatBox} ref={chatBoxRef}>
            {messages.map((message, index) => (
              <div 
                key={index} 
                style={message.type === 'user' ? styles.userMessage : styles.modelMessage}
              >
                {message.type === 'user' ? (
                  <>
                    <p style={styles.messageText}>{message.text}</p>
                    <div style={styles.userIcon}></div>
                  </>
                ) : (
                  <>
                    <div style={styles.botIcon}>
                      <FaRobot size={16} color="#fff" />
                    </div>
                    {message.html ? (
                      <ul style={styles.messageList}>
                        {message.items && message.items.map((item, i) => (
                          <li key={i} dangerouslySetInnerHTML={{ __html: item }}></li>
                        ))}
                      </ul>
                    ) : (
                      <p style={styles.messageText}>{message.text}</p>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
          
          <div style={styles.inputArea}>
            <button 
              style={styles.voiceButton}
              onClick={handleVoiceRecognition}
            >
              <FaMicrophone size={16} color="#B15870" />
            </button>
            
            <input
              ref={inputRef}
              style={styles.input}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask me anything..."
              type="text"
            />
            
            <button 
              style={styles.sendButton}
              onClick={() => handleSendMessage()}
            >
              <IoSend size={16} color="#B15870" />
            </button>
          </div>
        </div>
      )}
      
      <div style={styles.chatbotIcon} onClick={toggleChatbot}>
        <FaRobot size={30} />
      </div>
    </div>
  );
};

const styles = {
  chatbotContainer: {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    zIndex: 1000,
  },
  chatbotIcon: {
    backgroundColor: '#B15870', // Changed from #ff8c00
    color: '#fff',
    padding: '15px',
    borderRadius: '50%',
    cursor: 'pointer',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  chatbotWindow: {
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    width: '350px',
    height: '500px',
    marginBottom: '10px',
    border: '2px solid #B15870', // Changed from #ff8c00
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    backgroundColor: 'transparent',
    border: 'none',
    color: '#B15870', // Changed from #ff8c00
    fontSize: '20px',
    cursor: 'pointer',
    zIndex: 10,
  },
  chatHeader: {
    backgroundColor: '#B15870', // Changed from #ff8c00
    padding: '15px',
    borderTopLeftRadius: '8px',
    borderTopRightRadius: '8px',
    textAlign: 'center',
  },
  chatbotHeading: {
    fontSize: '20px',
    color: '#fff',
    margin: '0',
    fontWeight: '600',
  },
  chatbotSubheading: {
    fontSize: '12px',
    color: '#fff',
    margin: '5px 0 0',
  },
  chatBox: {
    flex: 1,
    padding: '15px',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#f0f0f0',
    borderRadius: '15px 15px 0 15px',
    padding: '10px 15px',
    maxWidth: '80%',
    display: 'flex',
    position: 'relative',
  },
  modelMessage: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(253, 232, 233, 1)', // Changed from #fff8f0 to match other components
    borderRadius: '15px 15px 15px 0',
    padding: '10px 15px',
    maxWidth: '80%',
    display: 'flex',
    position: 'relative',
    border: '1px solid #B15870', // Changed border color from #ffe0c0
  },
  userIcon: {
    width: '30px',
    height: '30px',
    borderRadius: '50%',
    backgroundColor: '#B15870', // Changed from #ff8c00
    marginLeft: '10px',
  },
  botIcon: {
    width: '30px',
    height: '30px',
    borderRadius: '50%',
    backgroundColor: '#B15870', // Changed from #ff8c00
    marginRight: '10px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageText: {
    margin: '0',
    fontSize: '14px',
  },
  messageList: {
    margin: '0',
    padding: '0 0 0 20px',
    fontSize: '14px',
  },
  inputArea: {
    display: 'flex',
    padding: '10px',
    borderTop: '1px solid #eee',
  },
  voiceButton: {
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    marginRight: '10px',
  },
  input: {
    flex: 1,
    padding: '10px 15px',
    borderRadius: '20px',
    border: '1px solid #ddd',
    outline: 'none',
    fontSize: '14px',
  },
  sendButton: {
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    marginLeft: '10px',
  },
};

export default Chatbot;