import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import EditorPage from "./pages/EditorPage";
import TokenHandler from "./components/TokenHandler";

function App() {
  // Global token capture for any initial URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    
    if (token) {
      console.log("Initial token detected");
      localStorage.setItem("authToken", token);
      
      // Clean URL and redirect to editor
      window.history.replaceState({}, document.title, "/editor");
      window.location.reload(); // Force React to recognize new route
    }
  }, []);

  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          {/* Main Pages */}
          <Route path="/" element={<Home />} />
          <Route path="/editor" element={<EditorPage />} />

          {/* Auth Handling Routes */}
          <Route 
            path="/auth-redirect" 
            element={
              <TokenHandler 
                onSuccess="/editor" 
                onFailure="/" 
              />
            } 
          />
          
          {/* Fallback for legacy/email links */}
          <Route 
            path="/index.html" 
            element={
              <TokenHandler 
                onSuccess="/editor" 
                onFailure="/" 
              />
            } 
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;