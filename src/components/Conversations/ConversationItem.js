import React from "react";
import { Link } from "react-router-dom";

const ConversationItem = ({
  id,
  name,
  email,
  messages,
  createdAt,
  phone,
  status,
}) => {
  return (
    <li key={id} className="bg-white p-3 rounded-md shadow-sm flex">
      <div className="mr-3">
        {" "}
        {/* Added margin-right */}
        {/* You'll need to add the user's profile picture here */}
        <img
          src="https://captiontools.com/wp-content/uploads/2017/03/testy3-1.png"
          alt="User Profile"
          className="w-8 h-8 rounded-full"
        />
      </div>
      <Link to={`/conversation/${id}`} className="flex-1">
        <div>
          <span className="font-bold block">{name}</span>
          <span className="text-gray-600 text-sm block">{email}</span>
          <p className="text-sm">{messages[0]}</p>
        </div>
      </Link>
      <div className="flex flex-col items-end">
        <span className="text-gray-500 text-xs">
          {" "}
          {new Date(createdAt.seconds * 1000).toLocaleString()}
        </span>
      </div>
    </li>
  );
};

export default ConversationItem;
