import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { auth, db } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import Sidebar from "./components/UI/Sidebar";
import Auth from "./components/auth/Auth";
import Home from "./pages/Home";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        getDoc(userDocRef).then((docSnap) => {
          if (docSnap.exists()) {
            setUser({ id: docSnap.id, ...docSnap.data() });
          } else {
            console.error("User document not found!");
          }
        });
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSignInSuccess = (user) => {
    const userDocRef = doc(db, "users", user.uid);
    getDoc(userDocRef).then((docSnap) => {
      if (!docSnap.exists()) {
        setDoc(userDocRef, {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          role: "user", // Default role
          createdAt: new Date(),
        })
          .then(() => {
            console.log("User added to Firestore successfully!");
          })
          .catch((error) => {
            console.error("Error adding user to Firestore:", error);
          });
      } else {
        console.log("User already exists in Firestore.");
      }
    });
  };

  return (
    <BrowserRouter>
      <div className="app-container flex h-screen">
        {user ? (
          <>
            <Sidebar user={user} />
            <Home user={user} />
          </>
        ) : (
          <Auth onSignInSuccess={handleSignInSuccess} />
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;
