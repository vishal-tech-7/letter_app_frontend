import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Home = () => {
  const { user, login } = useContext(AuthContext);

  return (
    <div style={{ padding: "32px", textAlign: "center" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: "bold" }}>Welcome to the Letter App</h1>
      <p style={{ marginTop: "16px" }}>{user ? "Start writing your letters now!" : "Login to start creating and saving your letters."}</p>
      {!user && (
        <button 
          onClick={login} 
          style={{ marginTop: "16px", backgroundColor: "#3b82f6", padding: "8px 16px", color: "white", borderRadius: "4px", border: "none", cursor: "pointer" }}
        >
          Login with Google
        </button>
      )}
    </div>
  );
};

export default Home;