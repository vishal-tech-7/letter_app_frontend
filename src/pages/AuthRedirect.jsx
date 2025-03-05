import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Extract token from the URL query params
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (token) {
      // Save the token to localStorage
      localStorage.setItem("authToken", token);
      console.log("✅ Token saved to localStorage:", token);

      // Redirect to the dashboard after saving the token
      navigate("/dashboard");
    } else {
      console.error("❌ No token found in URL.");
      navigate("/login"); // Redirect to login if no token is found
    }
  }, [navigate]);

  return <p>🔄 Logging in...</p>;
};

export default AuthRedirect;


