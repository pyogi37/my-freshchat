import React from 'react';
import { useParams } from 'react-router-dom';
import ChatWindow from '../components/Chat/ChatWindow';
import ContactInfo from '../components/UI/ContactInfo'; // Example

const ConversationDetails = () => {
  const { id } = useParams(); 

  return (
    <div>
      <h2>Conversation Details</h2>
      <ContactInfo /> 
      <ChatWindow /> 
    </div>
  );
};

export default ConversationDetails;