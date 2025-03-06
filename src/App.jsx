import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import EditorPage from "./pages/EditorPage";
import AuthRedirect from "./pages/AuthRedirect";
import TokenHandler from "./components/TokenHandler";

function App() {
  // Add this effect to catch tokens in the URL from any path
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    
    if (token) {
      console.log("Token found in URL on app load");
      localStorage.setItem("authToken", token);
      // Optional: remove token from URL for security
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/editor" element={<EditorPage />} />
          <Route path="/auth-redirect" element={<AuthRedirect />} />
          {/* Add these routes to catch the token */}
          <Route path="/index.html" element={<TokenHandler />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;