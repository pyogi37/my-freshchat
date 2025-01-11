import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { auth, db } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import Sidebar from "./components/UI/Sidebar";
import Auth from "./components/auth/Auth";
import Home from "./pages/Home";

const allowedCompanies = [
  { email: "company1@example.com", password: "password123" },
  { email: "company2@example.com", password: "securePass456" },
];

function App() {
  const [user, setUser] = useState(null);
  const [step, setStep] = useState("details");
  const [userDetails, setUserDetails] = useState({
    name: "",
    phone: "",
    email: "",
  });

  useEffect(() => {
    // Check if there is a user in localStorage when the component mounts
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    // Firebase authentication listener for users
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const userDocRef = doc(db, "users", firebaseUser.uid);
        getDoc(userDocRef).then((docSnap) => {
          if (docSnap.exists()) {
            setUser({ id: docSnap.id, ...docSnap.data() });
          } else {
            console.error("User document not found!");
          }
        });
      } else if (user?.role !== "company") {
        setUser(null); // Clear state for non-company users
      }
    });

    return () => unsubscribe();
  }, [user?.role]);

  const handleSignInSuccess = (signedInUser) => {
    if (signedInUser.role === "company") {
      // Local authentication for companies
      setUser(signedInUser);
      localStorage.setItem("user", JSON.stringify(signedInUser));
    } else {
      // Firebase authentication for users
      const userDocRef = doc(db, "users", signedInUser.uid);
      getDoc(userDocRef).then((docSnap) => {
        if (!docSnap.exists()) {
          setDoc(userDocRef, {
            uid: signedInUser.uid,
            displayName: signedInUser.displayName,
            email: signedInUser.email,
            role: "user", // Default role
            createdAt: new Date(),
          })
            .then(() => {
              console.log("User added to Firestore successfully!");
              setUser({ ...signedInUser, role: "user" });
            })
            .catch((error) => {
              console.error("Error adding user to Firestore:", error);
            });
        } else {
          setUser({ id: docSnap.id, ...docSnap.data() });
          console.log("User already exists in Firestore.");
        }
      });
    }
  };

  const handleCompanySignIn = (email, password) => {
    // Validate email and password against allowedCompanies
    const company = allowedCompanies.find(
      (c) => c.email === email && c.password === password
    );

    if (company) {
      const user = { email: company.email, role: "company" };
      // Set user state
      setUser(user);

      // Save user to localStorage
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      alert("Invalid company credentials!");
    }
  };

  const resetChat = () => {
    setStep("details");
    setUserDetails({
      name: "",
      phone: "",
      email: "",
    });
  };

  return (
    <BrowserRouter>
      <div className="app-container flex h-screen">
        {user ? (
          <>
            <Sidebar user={user} setUser={setUser} resetChat={resetChat} />
            <Home
              user={user}
              step={step}
              setStep={setStep}
              userDetails={userDetails}
              setUserDetails={setUserDetails}
            />
          </>
        ) : (
          <Auth
            onSignInSuccess={handleSignInSuccess}
            onCompanySignIn={handleCompanySignIn}
          />
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;
