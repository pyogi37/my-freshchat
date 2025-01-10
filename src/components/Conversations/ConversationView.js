import React from 'react';
import { useParams } from 'react-router-dom';
import ChatWindow from '../Chat/ChatWindow'; // Import the ChatWindow component

const ConversationView = () => {
  const { id } = useParams(); 

  return (
    <div className="conversation-view">
      <h2>Conversation Details</h2>
      <ChatWindow /> 
    </div>
  );
};

export default ConversationView;