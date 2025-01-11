// src/components/Conversations/ConversationList.js

import React from "react";
import ConversationItem from "./ConversationItem";

const ConversationList = ({ conversations, filter }) => {
  // Receive filter prop
  console.log(conversations, "conversations");

  let heading = "My Open Conversations"; // Default heading

  if (filter === "all") {
    heading = "All Conversations";
  } else if (filter === "Resolved") {
    heading = "Resolved Conversations";
  } else if (filter === "Waiting on customer") {
    heading = "Waiting on Customer";
  } else if (filter === "Waiting on internal team") {
    heading = "Waiting on Internal Team";
  } // No need to change for "Open" as it's the default

  return (
    <div className="conversation-list-container p-4">
      <h2 className="text-lg font-bold mb-4">{heading}</h2>
      <ul className="space-y-2">
        {conversations?.map((conversation) => (
          <ConversationItem key={conversation.id} {...conversation} />
        ))}
      </ul>
    </div>
  );
};

export default ConversationList;
