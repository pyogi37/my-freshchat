import React, { useState } from "react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, db } from "../../firebase";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";

const allowedCompanies = [
  { email: "company1@example.com", password: "password123" },
];

const Auth = ({ onSignInSuccess }) => {
  const [mode, setMode] = useState("user"); // 'user' or 'company'
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Handle user sign-in with Google
  const handleGoogleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const user = result.user;
        const userDocRef = doc(db, "users", user.uid);

        const docSnap = await getDoc(userDocRef);
        if (!docSnap.exists()) {
          // Add new user to Firestore
          await setDoc(userDocRef, {
            uid: user.uid,
            displayName: user.displayName,
            email: user.email,
            role: "user", // Default role
            createdAt: serverTimestamp(),
          });
        }
        onSignInSuccess(user);
      })
      .catch((error) => {
        console.error("Error signing in with Google:", error);
        setError("Failed to sign in. Please try again.");
      });
  };

  // Handle company sign-in
  const handleCompanySignIn = (e) => {
    e.preventDefault();

    // Check if credentials match any allowed company
    const isAllowed = allowedCompanies.some(
      (company) => company.email === email && company.password === password
    );

    if (isAllowed) {
      const companyData = { email, role: "company" };
      onSignInSuccess(companyData,); // Notify parent of success
    } else {
      setError("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen bg-gradient-to-r from-blue-500 to-indigo-600">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center w-96">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">
          Welcome to My FreshChat
        </h1>

        <div className="flex justify-center mb-6">
          <button
            onClick={() => setMode("user")}
            className={`px-4 py-2 rounded-l-md ${
              mode === "user" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            User
          </button>
          <button
            onClick={() => setMode("company")}
            className={`px-4 py-2 rounded-r-md ${
              mode === "company" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            Company
          </button>
        </div>

        {mode === "user" && (
          <>
            <p className="text-gray-600 mb-4">
              Sign in with Google to chat with companies.
            </p>
            <button
              onClick={handleGoogleSignIn}
              className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
            >
              Sign in with Google
            </button>
          </>
        )}

        {mode === "company" && (
          <form onSubmit={handleCompanySignIn} className="space-y-4">
            <p className="text-gray-600">Sign in with your company account.</p>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
            >
              Sign In
            </button>
          </form>
        )}
      </div>
      <footer className="mt-4 text-gray-200 text-sm">
        © {new Date().getFullYear()} My FreshChat. All rights reserved.
      </footer>
    </div>
  );
};

export default Auth;
