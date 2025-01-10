import React, { useState, useEffect } from "react";
import ConversationList from "../components/Conversations/ConversationList";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const Inbox = () => {
  const [filter, setFilter] = useState("all"); // State for filter
  const [conversations, setConversations] = useState([]); // State for conversations

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const conversationsRef = collection(db, "conversations");
        let q;

        if (filter === "all") {
          q = query(conversationsRef); // Fetch all conversations
        } else {
          q = query(conversationsRef, where("status", "==", filter)); // Filter conversations by status
        }

        const querySnapshot = await getDocs(q);
        const fetchedConversations = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setConversations(fetchedConversations);
      } catch (error) {
        console.error("Error fetching conversations: ", error);
      }
    };

    fetchConversations();
  }, [filter]); // Refetch whenever the filter changes

  return (
    <div className="inbox-container p-4">
      <h1 className="text-xl font-bold mb-4">Inbox</h1>
      <div className="filters mb-4">
        <button
          onClick={() => setFilter("all")}
          className={`mr-2 px-3 py-1 rounded-md ${
            filter === "all" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilter("Open")}
          className={`mr-2 px-3 py-1 rounded-md ${
            filter === "Open" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Open
        </button>
        <button
          onClick={() => setFilter("Waiting on customer")}
          className={`mr-2 px-3 py-1 rounded-md ${
            filter === "Waiting on customer"
              ? "bg-blue-500 text-white"
              : "bg-gray-200"
          }`}
        >
          Waiting on customer
        </button>
        <button
          onClick={() => setFilter("Resolved")}
          className={`px-3 py-1 rounded-md ${
            filter === "Resolved" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Resolved
        </button>
      </div>
      <ConversationList conversations={conversations} filter={filter} />
    </div>
  );
};

export default Inbox;
