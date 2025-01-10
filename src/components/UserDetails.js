import React from "react";

const UserDetails = ({ user }) => {
  return (
    <div className="user-details bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Contact Info</h3>
      {user ? (
        <div className="flex items-center space-x-4">
          <img
            src={user.profilePicture || "/default-profile-picture.png"}
            alt="User Profile"
            className="w-16 h-16 rounded-full object-cover"
          />
          <div>
            <p className="text-lg font-bold text-gray-900">{user.name}</p>
            <p className="text-sm text-gray-600">{user.email}</p>
          </div>
        </div>
      ) : (
        <p className="text-gray-600">Select a conversation to view details.</p>
      )}
    </div>
  );
};

export default UserDetails;
