import React, { useState, useEffect } from "react";
import { collection, addDoc, serverTimestamp, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "../firebase";

const UserChat = () => {
  const [step, setStep] = useState("details"); // 'details' or 'chat'
  const [userDetails, setUserDetails] = useState({
    name: "",
    phone: "",
    email: "",
  });
  const [message, setMessage] = useState(""); // Initial message for chat
  const [chatId, setChatId] = useState(null); // Chat document ID
  const [messages, setMessages] = useState([]); // Chat messages
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle input changes for user details
  const handleDetailsChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prev) => ({ ...prev, [name]: value }));
  };

  // Submit user details and start chat
  const handleDetailsSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Create a new chat document in Firestore
      const docRef = await addDoc(collection(db, "chats"), {
        ...userDetails,
        messages: [],
        status: "Open",
        createdAt: serverTimestamp(),
      });

      setChatId(docRef.id); // Save chat document ID
      setStep("chat"); // Move to chat screen
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
    <div className="user-chat-container p-4 max-w-lg mx-auto">
      {step === "details" && (
        <form onSubmit={handleDetailsSubmit} className="space-y-4">
          <h2 className="text-xl font-bold">Enter Your Details</h2>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={userDetails.name}
            onChange={handleDetailsChange}
            required
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone"
            value={userDetails.phone}
            onChange={handleDetailsChange}
            required
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={userDetails.email}
            onChange={handleDetailsChange}
            required
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700"
          >
            {isSubmitting ? "Submitting..." : "Start Chat"}
          </button>
        </form>
      )}

      {step === "chat" && (
        <div className="chat-screen flex flex-col h-full">
          <div className="chat-messages flex-1 overflow-y-auto border border-gray-300 p-4 rounded-md mb-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`message-bubble ${
                  msg.sender === "user"
                    ? "bg-blue-500 text-white ml-auto"
                    : "bg-gray-300 text-black mr-auto"
                } px-4 py-2 rounded-lg mb-2`}
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
              className="flex-1 border border-gray-300 rounded-md px-3 py-2 mr-2"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700"
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
