import React from "react";
import { useParams } from "react-router-dom";
import ChatWindow from "../components/Chat/ChatWindow";
import UserDetails from "../components/UserDetails";
import { sampleConversations } from "../sampleData";

const ConversationDetails = ({ user }) => {
  const { id } = useParams();
  const conversationId = parseInt(id, 10); // Convert id to number
  const conversation = sampleConversations.find(
    (conversation) => conversation.id === conversationId
  );

  if (!conversation) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h2 className="text-2xl font-semibold text-gray-600">
          Conversation not found!
        </h2>
      </div>
    );
  }

  return (
    <div className="conversation-view-container flex p-4 space-x-4 h-full">
      {/* Chat Window */}
      <div className="flex-1">
        <ChatWindow
          messages={conversation.messages}
          user={user}
          conversationId={conversation.id}
        />
      </div>

      {/* Contact Information */}
      <div className="w-1/3 bg-white rounded-md shadow-md p-4">
        <UserDetails user={conversation} />
      </div>
    </div>
  );
};

export default ConversationDetails;
