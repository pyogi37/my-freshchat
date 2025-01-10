import React from "react";
import { HiInbox, HiChatAlt2, HiUsers, HiLogout } from "react-icons/hi";
import { Link } from "react-router-dom";
import { auth } from "../../firebase";

const Sidebar = ({ user }) => {
  const handleLogout = () => {
    auth.signOut();
  };

  return (
    <aside className="sidebar w-16 bg-gray-800 text-white flex flex-col items-center md:w-20">
      <div className="sidebar-header flex flex-col items-center p-4">
        <img
          src="company-logo.png"
          alt="Logo"
          className="w-10 h-10 rounded-full object-cover border-2 border-white"
        />
      </div>
      <nav className="navigation flex-1 flex flex-col justify-between">
        <ul className="space-y-4 mt-4">
          {user?.role === "company" ? (
            <>
              <li className="group">
                <Link
                  to="/"
                  className="flex items-center justify-center text-gray-300 hover:text-white"
                >
                  <HiInbox className="w-6 h-6" />
                </Link>
              </li>
              <li className="group">
                <Link
                  to="/conversation"
                  className="flex items-center justify-center text-gray-300 hover:text-white"
                >
                  <HiChatAlt2 className="w-6 h-6" />
                </Link>
              </li>
              <li className="group">
                <Link
                  to="/users"
                  className="flex items-center justify-center text-gray-300 hover:text-white"
                >
                  <HiUsers className="w-6 h-6" />
                </Link>
              </li>
            </>
          ) : (
            <li className="group">
              <Link
                to="/start-chat"
                className="flex items-center justify-center text-gray-300 hover:text-white"
              >
                <HiChatAlt2 className="w-6 h-6" />
                <span className="hidden md:inline-block ml-2 text-sm">
                  Chat
                </span>
              </Link>
            </li>
          )}
        </ul>
        <button
          onClick={handleLogout}
          className="p-2 mt-4 text-gray-300 hover:text-red-500 focus:outline-none"
        >
          <HiLogout className="w-6 h-6" />
        </button>
      </nav>
    </aside>
  );
};

export default Sidebar;
