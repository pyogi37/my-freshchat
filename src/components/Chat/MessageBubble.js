import React from "react";

const MessageBubble = ({ sender, text, timestamp }) => {
  const isUser = sender === "user"; // Adjust based on your sender type

  return (
    <div
      className={`chat-bubble p-3 rounded-md mb-2 ${
        isUser ? "bg-blue-100 ml-auto" : "bg-gray-200 mr-auto"
      }`}
      style={{ maxWidth: "70%" }}
    >
      <p>{text}</p>
      <span className="text-gray-500 text-xs">{timestamp}</span>
    </div>
  );
};

export default MessageBubble;