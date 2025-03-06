import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthRedirect = () => {
  const navigate = useNavigate();

  // Modify your useEffect to add debugging and error handling
useEffect(() => {
  try {
    console.log("Current URL:", window.location.href);
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    
    console.log("Token from URL:", token);
    
    if (token) {
      // Test localStorage access
      localStorage.setItem("test", "test");
      const testItem = localStorage.getItem("test");
      console.log("localStorage test:", testItem);
      
      // Now try to save the token
      localStorage.setItem("authToken", token);
      const savedToken = localStorage.getItem("authToken");
      console.log("Saved token verification:", savedToken);
      
      if (savedToken) {
        navigate("/dashboard");
      } else {
        console.error("Token failed to save to localStorage");
        navigate("/login?error=storage_failed");
      }
    } else {
      console.error("No token found in URL");
      navigate("/login?error=no_token");
    }
  } catch (error) {
    console.error("Auth redirect error:", error);
    navigate(`/login?error=${encodeURIComponent(error.message)}`);
  }
}, [navigate]);
  

  return <p>🔄 Logging in...</p>;
};

export default AuthRedirect;


