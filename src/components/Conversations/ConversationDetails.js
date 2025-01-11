import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ChatWindow from "../Chat/ChatWindow";
import UserDetails from "../UserDetails";
import { db } from "../../firebase";
import { doc, getDoc, onSnapshot } from "firebase/firestore";

const ConversationDetails = ({ user }) => {
  const { id } = useParams();
  const [conversation, setConversation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const conversationRef = doc(db, "chats", id);

      // Subscribe to real-time updates for the conversation
      const unsubscribe = onSnapshot(conversationRef, (docSnapshot) => {
        if (docSnapshot.exists()) {
          setConversation({ id: docSnapshot.id, ...docSnapshot.data() });
          console.log("Conversation data: ", docSnapshot.data()); 
        } else {
          setConversation(null); // Handle case where conversation doesn't exist
        }
        setLoading(false);
      });

      // Cleanup subscription on unmount
      return () => unsubscribe();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h2 className="text-2xl font-semibold text-gray-600">Loading...</h2>
      </div>
    );
  }

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
          user={user}
          chatId={conversation.id}
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
