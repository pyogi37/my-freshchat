import React, { useState, useEffect } from "react";
import Inbox from "../components/Conversations/Inbox";
import ConversationDetails from "../components/Conversations/ConversationDetails";
import UserChat from "../pages/UserChat";
import { Routes, Route } from "react-router-dom";

const Home = ({ user, step, setStep, userDetails, setUserDetails }) => {
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
                element={<ConversationDetails user={user} />}
              />
            </Routes>
          </div>
        </>
      ) : (
        <div className="w-full flex flex-col items-center justify-center p-4 h-full">
          {/* Pass step and setStep to UserChat */}
          <UserChat
            step={step}
            setStep={setStep}
            userDetails={userDetails}
            setUserDetails={setUserDetails}
          />
        </div>
      )}
    </main>
  );
};

export default Home;
