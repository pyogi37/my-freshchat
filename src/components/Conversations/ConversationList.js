import React from 'react';
import { Link } from 'react-router-dom';
import ConversationItem from './ConversationItem'; 
import { sampleConversations } from '../../sampleData'; 

const ConversationList = () => {
  return (
    <div className="conversation-list">
      <h2>My Open Conversations</h2>
      <ul>
        {sampleConversations.map((conversation) => (
          <ConversationItem 
            key={conversation.id} 
            user={conversation.user} 
            pageTitle={conversation.pageTitle} 
            messagePreview={conversation.messagePreview} 
            id={conversation.id} 
          />
        ))}
      </ul>
    </div>
  );
};

export default ConversationList;