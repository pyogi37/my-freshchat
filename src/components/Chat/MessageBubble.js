import React from 'react';

const MessageBubble = ({ type, message, timestamp }) => {
  return (
    <div className={`message-bubble ${type}`}>
      <p>{message}</p>
      <span className="timestamp">{timestamp}</span>
    </div>
  );
};

export default MessageBubble;