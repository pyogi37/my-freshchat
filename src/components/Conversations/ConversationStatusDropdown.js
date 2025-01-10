import React, { useState } from "react";

const ConversationStatusDropdown = ({ conversationId, status }) => {
  const [selectedStatus, setSelectedStatus] = useState(status);
  const statuses = [
    "Open",
    "Resolved",
    "Waiting on customer",
    "Waiting on internal team",
  ];

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
    console.log(
      `Conversation ${conversationId} status changed to: ${event.target.value}`
    );
  };

  return (
    <select
      value={selectedStatus}
      onChange={handleStatusChange}
      className="text-xs border border-gray-300 rounded-md px-2 py-1 mt-1"
    >
      {statuses.map((status) => (
        <option key={status} value={status}>
          {status}
        </option>
      ))}
    </select>
  );
};

export default ConversationStatusDropdown;