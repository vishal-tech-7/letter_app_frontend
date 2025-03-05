import axios from "axios";

const API_BASE_URL = `${import.meta.env.VITE_API_URL}/auth`;


export const loginWithGoogle = async () => {
    try {
      console.log("🔄 Requesting Google OAuth URL...");
      const response = await axios.get(`${API_BASE_URL}/google/url`);
      
      if (response.data.url) {
        console.log("✅ Redirecting to Google OAuth URL:", response.data.url);
        window.location.href = response.data.url; // Redirect user to Google's OAuth page
      } else {
        console.error("❌ No OAuth URL received from backend.");
      }
    } catch (error) {
      console.error("❌ Google Auth failed:", error);
    }
  };




  export const getUserProfile = async () => {
    const token = localStorage.getItem("authToken"); // ✅ Get token from storage
  
    if (!token) {
      console.error("❌ No token found, user may not be logged in.");
      return null;
    }
  
    try {
      console.log("🔄 Fetching user profile with token:", token);
  
      const response = await axios.get(`${API_BASE_URL}/profile`, {
        headers: { Authorization: `Bearer ${token}` }, // ✅ Ensure token is sent
      });
  
      console.log("✅ User profile fetched:", response.data);
      return response.data;
  
    } catch (error) {
      console.error("❌ Failed to fetch user profile:", error.response ? error.response.data : error);
      return null;
    }
  };
  

