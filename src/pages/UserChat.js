import React, { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "../firebase";

const UserChat = ({ step, setStep,userDetails, setUserDetails }) => {
 
  const [message, setMessage] = useState(""); // Initial message for chat
  const [chatId, setChatId] = useState(null); // Chat document ID
  const [messages, setMessages] = useState([]); // Chat messages
  const [isSubmitting, setIsSubmitting] = useState(false);
  

  // Handle input changes for user details
  const handleDetailsChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prev) => ({ ...prev, [name]: value }));
  };

  // Submit user details and start or retrieve chat
  const handleDetailsSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!userDetails.name || !userDetails.email || !userDetails.phone) {
      alert("Please fill all the details.");
      setIsSubmitting(false);
      return;
    }

    try {
      const chatsQuery = query(
        collection(db, "chats"),
        where("email", "==", userDetails.email)
      );
      const chatSnapshot = await getDocs(chatsQuery);

      if (!chatSnapshot.empty) {
        const existingChat = chatSnapshot.docs[0];
        setChatId(existingChat.id);
        setStep("chat");
      } else {
        // Create a new chat document
        const docRef = await addDoc(collection(db, "chats"), {
          ...userDetails,
          messages: [],
          status: "Open",
          createdAt: serverTimestamp(),
        });

        setChatId(docRef.id);

        // Send the template message as the first message
        const chatRef = collection(db, "chats", docRef.id, "messages");
        await addDoc(chatRef, {
          sender: "company",
          text: "Hello there! Reach out to us right here, and we'll get back to you as soon as we can!",
          timestamp: serverTimestamp(),
        });

        setStep("chat");
      }
    } catch (error) {
      console.error("Error saving user details: ", error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle new message input
  const handleMessageChange = (e) => setMessage(e.target.value);

  // Send a new message
  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (message.trim() !== "" && chatId) {
      try {
        // Add the new message to the chat document
        const chatRef = collection(db, "chats", chatId, "messages");
        await addDoc(chatRef, {
          sender: "user",
          text: message.trim(),
          timestamp: serverTimestamp(),
        });

        setMessage(""); // Clear the input field
      } catch (error) {
        console.error("Error sending message: ", error);
      }
    }
  };

  // Subscribe to Firestore for real-time updates
  useEffect(() => {
    if (chatId) {
      const messagesQuery = query(
        collection(db, "chats", chatId, "messages"),
        orderBy("timestamp", "asc")
      );

      const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
        const fetchedMessages = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMessages(fetchedMessages);
      });

      return () => unsubscribe(); // Clean up subscription
    }
  }, [chatId]);

  return (
    <div className="user-chat-container p-4 max-w-lg mx-auto bg-white rounded-lg shadow-md">
      {step === "details" && (
        <form onSubmit={handleDetailsSubmit} className="space-y-4">
          <h2 className="text-2xl font-semibold text-center">Enter Your Details</h2>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={userDetails.name}
            onChange={handleDetailsChange}
            required
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone"
            value={userDetails.phone}
            onChange={handleDetailsChange}
            required
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={userDetails.email}
            onChange={handleDetailsChange}
            required
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {isSubmitting ? "Submitting..." : "Start Chat"}
          </button>
        </form>
      )}

      {step === "chat" && (
        <div className="chat-screen flex flex-col h-full">
          <div className="chat-messages flex-1 overflow-y-auto border border-gray-300 p-4 rounded-md mb-4 bg-gray-50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`message-bubble ${
                  msg.sender === "user"
                    ? "bg-blue-500 text-white ml-auto"
                    : "bg-gray-300 text-black mr-auto"
                } px-4 py-2 rounded-lg mb-2 max-w-[70%]`}
              >
                {msg.text}
              </div>
            ))}
          </div>
          <form onSubmit={handleSendMessage} className="flex">
            <input
              type="text"
              value={message}
              onChange={handleMessageChange}
              placeholder="Type your message..."
              className="flex-1 border border-gray-300 rounded-md px-4 py-2 mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default UserChat;
