import React from "react";
import { Link } from "react-router-dom";

const ConversationItem = ({
  id,
  user,
  pageTitle,
  messagePreview,
  timestamp,
}) => {
  return (
    <li key={id} className="bg-white p-3 rounded-md shadow-sm flex"> {/* Added flex */}
      <div className="mr-3"> {/* Added margin-right */}
        {/* You'll need to add the user's profile picture here */}
        <img
          src="user-profile-picture.png"
          alt="User Profile"
          className="w-8 h-8 rounded-full"
        />
      </div>
      <Link to={`/conversation/${id}`} className="flex-1"> {/* Added flex-1 */}
        <div>
          <span className="font-bold block">{user}</span>
          <span className="text-gray-600 text-sm block">{pageTitle}</span> {/* Added block */}
          <p className="text-sm">{messagePreview}</p>
        </div>
      </Link>
      <div className="flex flex-col items-end">
        <span className="text-gray-500 text-xs">{timestamp}</span>
        {/* Removed ConversationStatusDropdown */}
      </div>
    </li>
  );
};

export default ConversationItem;