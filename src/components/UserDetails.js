import React from "react";
import { HiMail, HiPhone } from "react-icons/hi";

const UserDetails = ({ user }) => {
  return (
    <div className="user-details bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">User Details</h3>
      {user ? (
        <div className="flex items-center space-x-4">
          <img
            src="https://captiontools.com/wp-content/uploads/2017/03/testy3-1.png"
            alt="User Profile"
            className="w-16 h-16 rounded-full object-cover"
          />
          <div>
            <p className="text-lg font-bold text-gray-900">{user.name}</p>
            <div className="flex items-center space-x-2 text-gray-600 mt-1">
              <HiMail className="w-5 h-5 text-gray-500" />
              <p className="text-sm">{user.email}</p>
            </div>
            <div className="flex items-center space-x-2 text-gray-600 mt-1">
              <HiPhone className="w-5 h-5 text-gray-500" />
              <p className="text-sm">{user.phone}</p>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-gray-600">Select a conversation to view details.</p>
      )}
    </div>
  );
};

export default UserDetails;
