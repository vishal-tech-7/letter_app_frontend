import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (token) {
      localStorage.setItem("authToken", token); // ✅ Standardizing token key
      console.log("✅ Token saved in localStorage:", token);
      navigate("/dashboard"); // ✅ Redirect to user dashboard
    } else {
      console.error("❌ No token found in URL. Redirecting home.");
      navigate("/");
    }
  }, [navigate]); // ✅ Include `navigate` in dependency array

  return <p>🔄 Logging in...</p>;
};

export default AuthRedirect;
