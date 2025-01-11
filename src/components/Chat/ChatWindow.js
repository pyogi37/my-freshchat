import React, { useState, useEffect } from "react";
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import EmojiPicker from "emoji-picker-react";
import { FaSmile } from "react-icons/fa";

const ChatWindow = ({ chatId, user }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("Open"); // Default status

  // Fetch messages from Firestore
  useEffect(() => {
    if (chatId) {
      const messagesRef = collection(db, `chats/${chatId}/messages`);
      const q = query(messagesRef, orderBy("timestamp", "asc"));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const fetchedMessages = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMessages(fetchedMessages);
        setLoading(false);
      });
      return unsubscribe;
    }
  }, [chatId]);

  // Handle message send
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const messagesRef = collection(db, `chats/${chatId}/messages`);
      await addDoc(messagesRef, {
        sender: user.role,
        text: newMessage,
        timestamp: serverTimestamp(),
      });
      setNewMessage("");
    }
  };

  // Handle emoji selection
  const handleEmojiClick = (event, emojiObject) => {
    setNewMessage((prev) => prev + emojiObject.emoji);
    setShowEmojiPicker(false);
  };

  // Handle status change
  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    setStatus(newStatus);

    // Update chat status in Firestore
    const chatRef = doc(db, "chats", chatId);
    await updateDoc(chatRef, {
      status: newStatus,
    });
  };

  return (
    <div className="chat-window flex flex-col h-full border rounded-md shadow-lg">
      {/* Chat Status Dropdown */}
      <div className="chat-status p-4 border-b bg-gray-100">
        <label htmlFor="status" className="mr-2">Status:</label>
        <select
          id="status"
          value={status}
          onChange={handleStatusChange}
          className="p-2 border rounded-md bg-white"
        >
          <option value={"Open"}>Open</option>
          <option value="Resolved">Resolved</option>
          <option value="Waiting on customer">Waiting on customer</option>
          <option value="Waiting on internal team">Waiting on internal team</option>
        </select>
      </div>

      {/* Chat History */}
      <div className="chat-area flex-1 overflow-y-auto p-4 bg-white">
        {loading ? (
          <div className="loading text-center text-gray-500">Loading...</div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`message flex ${msg.sender === user.role ? "justify-end" : "justify-start"} mb-4`}
            >
              <p
                className={`message-text max-w-[70%] p-2 rounded-lg ${
                  msg.sender === user.role
                    ? "bg-blue-500 text-white" // User's messages in blue
                    : "bg-gray-300 text-black" // Other's messages in gray
                }`}
              >
                {msg.text}
              </p>
            </div>
          ))
        )}
      </div>

      {/* Bottom Bar */}
      <div className="bottom-bar p-4 border-t bg-gray-100">
        <form onSubmit={handleSendMessage} className="flex items-center">
          <button
            type="button"
            className="emoji-button p-2"
            onClick={() => setShowEmojiPicker((prev) => !prev)}
          >
            <FaSmile size={24} />
          </button>
          {showEmojiPicker && (
            <div className="emoji-picker absolute bottom-16">
              <EmojiPicker onEmojiClick={handleEmojiClick} />
            </div>
          )}
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 mx-2 p-2 border rounded-md focus:outline-none"
          />
          <button
            type="submit"
            className="send-button ml-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            disabled={!newMessage.trim()} // Disable button if no message
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatWindow;
