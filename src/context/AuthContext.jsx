import { createContext, useState, useEffect } from "react";
import { getUserProfile, loginWithGoogle } from "../api/auth";
import { auth } from "../firebase/config";
import { signOut } from "firebase/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("❌ No token found in localStorage, skipping profile fetch.");
      return;
    }
    getUserProfile(token)
      .then((userData) => {
        if (userData) setUser(userData);
        else console.log("❌ Failed to fetch user profile.");
      })
      .catch((error) => {
        console.error("❌ Error fetching profile:", error);
        localStorage.removeItem("token");
      });
  }, []);

  const login = async () => {
    console.log("🔄 Redirecting to Google Login...");
    await loginWithGoogle();
  };

  const logout = async () => {
    await signOut(auth);
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>
  );
};