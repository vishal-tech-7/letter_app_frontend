import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const TokenHandler = ({ onSuccess = "/editor", onFailure = "/" }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const processToken = () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get("token");

        if (token) {
          localStorage.setItem("authToken", token);
          console.log("Token stored successfully");
          navigate(onSuccess, { replace: true });
        } else {
          console.warn("No token found in URL");
          navigate(onFailure, { replace: true });
        }
      } catch (error) {
        console.error("Token processing error:", error);
        navigate(onFailure, { replace: true });
      }
    };

    processToken();
  }, [navigate, onSuccess, onFailure]);

  return (
    <div className="auth-processing">
      <h2>Authenticating...</h2>
      <p>Please wait while we verify your credentials</p>
    </div>
  );
};

export default TokenHandler;