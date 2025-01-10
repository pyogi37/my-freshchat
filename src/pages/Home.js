import React from "react";
import Inbox from "../pages/Inbox";
import ConversationDetails from "../pages/ConversationDetails";
import UserChat from "../pages/UserChat";
import UserDetails from "../components/UserDetails";
import { Routes, Route } from "react-router-dom";

const Home = ({ user }) => {
  return (
    <main className="main-content flex-1 flex">
      {user?.role === "company" ? (
        <>
          <div className="conversation-list w-1/3 border-r border-gray-300">
            <Inbox />
          </div>
          <div className="chat-window-container w-2/3 border-r border-gray-300">
            <Routes>
              <Route
                path="/conversation/:id"
                element={<ConversationDetails />}
              />
            </Routes>
          </div>
        </>
      ) : (
        <div className="w-full flex flex-col items-center justify-center p-4 h-full">
          <UserChat />
        </div>
      )}
    </main>
  );
};

export default Home;
