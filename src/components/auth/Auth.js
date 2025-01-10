import React from "react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../firebase";
import { HiOutlineLogin } from "react-icons/hi";

const Auth = ({ onSignInSuccess }) => {
  const handleGoogleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        onSignInSuccess(user);
      })
      .catch((error) => {
        console.error("Error logging in with Google:", error);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen bg-gradient-to-r from-blue-500 to-indigo-600">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-2xl font-semibold text-gray-800">
          Welcome to My FreshChat
        </h1>
        <p className="text-gray-600 mt-2">
          Sign in to start chatting with your users!
        </p>
        <button
          onClick={handleGoogleSignIn}
          className="mt-6 flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg focus:outline-none transition-all duration-300"
        >
          <HiOutlineLogin className="w-5 h-5 mr-2" />
          Sign in with Google
        </button>
      </div>
      <footer className="mt-4 text-gray-200 text-sm">
        © {new Date().getFullYear()} My FreshChat. All rights reserved.
      </footer>
    </div>
  );
};

export default Auth;
