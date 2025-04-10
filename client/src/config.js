// // client/src/config.js
// import React from 'react';
// import { createChatBotMessage } from 'react-chatbot-kit';
// import { Link } from 'react-router-dom';

// const config = {
//   initialMessages: [
//     createChatBotMessage('Hello! I’m Bhoomi, your maternal health assistant. How can I help you today?'),
//   ],
//   widgets: [
//     {
//       widgetName: 'ivfLink',
//       widgetFunc: () => <Link to="/ivf-tracker">Go to IVF Tracker</Link>,
//     },
//     {
//       widgetName: 'periodLink',
//       widgetFunc: () => <Link to="/period-tracker">Go to Period Tracker</Link>,
//     },
//   ],
//   customStyles: {
//     botMessageBox: {
//       backgroundColor: '#ff8c00',
//     },
//     chatButton: {
//       backgroundColor: '#ff8c00',
//     },
//   },
// };

// export default config;


// client/src/config.js
import React from 'react';
import { createChatBotMessage } from 'react-chatbot-kit';
import { Link } from 'react-router-dom';

const config = {
  initialMessages: [
    createChatBotMessage('Hello! I’m Bhoomi, your maternal health assistant. How can I help you today?'),
  ],
  widgets: [
    {
      widgetName: 'ivfLink',
      widgetFunc: () => <Link to="/ivf-tracker">Go to IVF Tracker</Link>,
    },
    {
      widgetName: 'periodLink',
      widgetFunc: () => <Link to="/period-tracker">Go to Period Tracker</Link>,
    },
  ],
  customStyles: {
    botMessageBox: {
      backgroundColor: '#B85170', // Changed from #ff8c00 to match Newsletter primary color
    },
    chatButton: {
      backgroundColor: '#B85170', // Changed from #ff8c00 to match Newsletter primary color
    },
  },
};

export default config;