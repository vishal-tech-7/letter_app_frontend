import axios from "axios";

const API_BASE_URL = "https://letter-app-new.onrender.com/auth";

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




export const getUserProfile = async (token) => {
  if (!token) {
    console.error("❌ No token provided for API request.");
    return null;
  }

  try {
    const response = await axios.get(`${API_BASE_URL}/profile`, {
      headers: { Authorization: `Bearer ${token}` }, // ✅ Ensure token is sent
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch user profile:", error);
    return null;
  }
};

