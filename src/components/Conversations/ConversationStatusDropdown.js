import React, { useState } from 'react';

const ConversationStatusDropdown = ({ conversationId }) => {
  const [selectedStatus, setSelectedStatus] = useState('Open');
  const statuses = ['Open', 'Resolved', 'Waiting on customer', 'Waiting on internal team'];

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
    // (For now, log the selected status to the console)
    console.log(`Conversation ${conversationId} status changed to: ${event.target.value}`);
  };

  return (
    <select value={selectedStatus} onChange={handleStatusChange}>
      {statuses.map((status) => (
        <option key={status} value={status}>
          {status}
        </option>
      ))}
    </select>
  );
};

export default ConversationStatusDropdown;