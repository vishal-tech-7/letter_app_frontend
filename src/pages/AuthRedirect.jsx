import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Current URL:", window.location.href);
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
  
    if (token) {
      localStorage.setItem("authToken", token);
      console.log("✅ Token saved to localStorage:", token);
  
      // Delay navigation to allow time for localStorage to update
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } else {
      console.error("❌ No token found in URL.");
      navigate("/login");
    }
  }, [navigate]);
  

  return <p>🔄 Logging in...</p>;
};

export default AuthRedirect;


