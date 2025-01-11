import React from 'react';
import ChatWindow from '../Chat/ChatWindow'; 

const ConversationView = () => {

  return (
    <div className="conversation-view">
      <h2>Conversation Details</h2>
      <ChatWindow /> 
    </div>
  );
};

export default ConversationView;