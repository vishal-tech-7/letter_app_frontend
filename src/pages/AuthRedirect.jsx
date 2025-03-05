import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Extract token from URL
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (token) {
      // Store the token in localStorage
      localStorage.setItem("authToken", token);
      console.log("✅ Token saved in localStorage:", token);

      // Redirect to dashboard
      navigate("/dashboard"); 
    } else {
      console.error("❌ No token found in URL.");
      navigate("/"); // If no token, redirect to home or login
    }
  }, [navigate]);

  return <p>🔄 Logging in...</p>;
};

export default AuthRedirect;
