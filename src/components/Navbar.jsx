import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = ({ oauthReady }) => {
  const { user, logout } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await fetch(`${API_BASE_URL}/auth/google/url`);
      if (!response.ok) throw new Error("Failed to get OAuth URL");
      
      const { url } = await response.json();
      window.location.href = url;
    } catch (err) {
      console.error("Login error:", err);
      setError("Failed to initiate login. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <nav style={{ 
      backgroundColor: "#1f2937", 
      color: "white", 
      padding: "16px", 
      display: "flex", 
      justifyContent: "space-between", 
      alignItems: "center"
    }}>
      <Link to="/" style={{ 
        fontSize: "1.25rem", 
        fontWeight: "bold", 
        textDecoration: "none", 
        color: "white"
      }}>
        Letter App
      </Link>
      
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        {user ? (
          <>
            <Link to="/dashboard" style={{ 
              textDecoration: "none", 
              color: "white"
            }}>
              Dashboard
            </Link>
            <Link to="/editor" style={{ 
              textDecoration: "none", 
              color: "white"
            }}>
              Editor
            </Link>
            <button 
              onClick={logout}
              style={{ 
                backgroundColor: "#ef4444",
                padding: "8px 12px",
                borderRadius: "4px",
                border: "none",
                color: "white",
                cursor: "pointer"
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <div style={{ position: "relative" }}>
            <button 
              onClick={handleLogin}
              disabled={!oauthReady || isLoading}
              style={{ 
                backgroundColor: "#3b82f6",
                padding: "8px 12px",
                borderRadius: "4px",
                border: "none",
                color: "white",
                cursor: "pointer",
                opacity: (!oauthReady || isLoading) ? 0.7 : 1
              }}
            >
              {isLoading ? "Loading..." : "Login with Google"}
            </button>
            
            {error && (
              <div style={{
                position: "absolute",
                top: "100%",
                right: 0,
                marginTop: "8px",
                padding: "8px",
                backgroundColor: "#fee2e2",
                color: "#dc2626",
                borderRadius: "4px",
                fontSize: "0.875rem"
              }}>
                {error}
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;