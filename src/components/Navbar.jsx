import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, login, logout } = useContext(AuthContext);

  return (
    <nav style={{ backgroundColor: "#1f2937", color: "white", padding: "16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <Link to="/" style={{ fontSize: "1.25rem", fontWeight: "bold", textDecoration: "none", color: "white" }}>Letter App</Link>
      <div>
        {user ? (
          <>
            <Link to="/dashboard" style={{ marginRight: "16px", textDecoration: "none", color: "white" }}>Dashboard</Link>
            <Link to="/editor" style={{ marginRight: "16px", textDecoration: "none", color: "white" }}>Editor</Link>
            <button onClick={logout} style={{ backgroundColor: "#ef4444", padding: "8px 12px", borderRadius: "4px", border: "none", color: "white", cursor: "pointer" }}>Logout</button>
          </>
        ) : (
          <button onClick={login} style={{ backgroundColor: "#3b82f6", padding: "8px 12px", borderRadius: "4px", border: "none", color: "white", cursor: "pointer" }}>Login with Google</button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;