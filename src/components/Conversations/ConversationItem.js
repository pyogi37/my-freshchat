import React from 'react';
import { Link } from 'react-router-dom';
import ConversationStatusDropdown from './ConversationStatusDropdown'; 

const ConversationItem = ({ user, pageTitle, messagePreview, id }) => { 
  return (
    <li key={id}>
      <Link to={`/conversation/${id}`}>
        <div className="conversation-item">
          <span className="user-name">{user}</span>
          <span className="page-title">{pageTitle}</span>
          <span className="message-preview">{messagePreview}</span>
        </div>
      </Link>
      <ConversationStatusDropdown conversationId={id} /> 
    </li>
  );
};

export default ConversationItem;