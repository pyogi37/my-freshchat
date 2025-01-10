import React, { useState, useEffect } from "react";
import { collection, addDoc, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import EmojiPicker from "emoji-picker-react";
import { FaPaperclip, FaSmile } from "react-icons/fa";

const ChatWindow = ({ chatId, user }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  useEffect(() => {
    if (chatId) {
      const messagesRef = collection(db, `conversations/${chatId}/messages`);
      const q = query(messagesRef, orderBy("timestamp", "asc"));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const fetchedMessages = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMessages(fetchedMessages);
      });
      return unsubscribe;
    }
  }, [chatId]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const messagesRef = collection(db, `conversations/${chatId}/messages`);
      await addDoc(messagesRef, {
        sender: user.role,
        text: newMessage,
        timestamp: new Date(),
      });
      setNewMessage("");
    }
  };

  const handleEmojiClick = (event, emojiObject) => {
    setNewMessage((prev) => prev + emojiObject.emoji);
    setShowEmojiPicker(false);
  };

  return (
    <div className="chat-window flex flex-col h-full border rounded-md shadow-lg">
      {/* Chat History */}
      <div className="chat-area flex-1 overflow-y-auto p-4 bg-white">
        {messages.map((msg) => (
          <div key={msg.id} className={`message ${msg.sender === user.role ? "text-right" : "text-left"}`}>
            <p className="inline-block p-2 my-1 rounded-md bg-gray-200">{msg.text}</p>
          </div>
        ))}
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
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatWindow;
