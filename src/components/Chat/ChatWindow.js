import React, { useState } from 'react';
import MessageBubble from './MessageBubble'; 

const ChatWindow = () => {
  const [messages, setMessages] = useState([
    { type: 'company', message: 'Hello there! Need help?', timestamp: '2 minutes ago' },
  ]);
  const [newMessage, setNewMessage] = useState('');

  // ... (rest of the code)

  return (
    <div className="chat-window">
      <div className="chat-history">
        {messages.map((msg, index) => (
          <MessageBubble key={index} type={msg.type} message={msg.message} timestamp={msg.timestamp} />
        ))}
      </div>
      {/* ... */}
    </div>
  );
};

export default ChatWindow;