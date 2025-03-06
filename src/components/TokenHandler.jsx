import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const TokenHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get("token");
      
      console.log("TokenHandler checking for token...");
      
      if (token) {
        // Set token in localStorage
        localStorage.setItem("authToken", token);
        
        // Verify it was saved
        const savedToken = localStorage.getItem("authToken");
        console.log("Token saved successfully:", !!savedToken);
        
        // Navigate to dashboard
        navigate("/dashboard", { replace: true });
      } else {
        console.error("No token found in URL parameters");
        navigate("/login", { replace: true });
      }
    } catch (error) {
      console.error("Error in TokenHandler:", error);
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  return <div>Processing authentication...</div>;
};

export default TokenHandler;