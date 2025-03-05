import axios from "axios";

const API_BASE_URL = "https://letter-app-new.onrender.com/drive"; // ✅ Ensure this matches backend

export const listLetters = async () => {
  const token = localStorage.getItem("token"); // ✅ Fetch token

  if (!token) {
    console.error("❌ No token found. Cannot fetch letters.");
    return null;
  }

  try {
    const response = await axios.get(`${API_BASE_URL}/list`, {
      headers: { Authorization: `Bearer ${token}` }, // ✅ Send token
    });
    return response.data;
  } catch (error) {
    console.error("❌ Failed to fetch letters:", error);
    return null;
  }
};

export const uploadLetter = async (title, content, folderId = null) => {
  const token = localStorage.getItem("token");

  if (!token) {
    console.error("❌ No token found. Cannot upload letter.");
    return null;
  }

  try {
    const response = await axios.post(
      `${API_BASE_URL}/save`, // ✅ Corrected to `/save`
      { title, content, folderId },
      { headers: { Authorization: `Bearer ${token}` } } // ✅ Send token
    );
    return response.data;
  } catch (error) {
    console.error("❌ Failed to upload letter:", error);
    return null;
  }
};
