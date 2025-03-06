import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import EditorPage from "./pages/EditorPage";
import AuthRedirect from "./pages/AuthRedirect";
import TokenHandler from "./components/TokenHandler";

// Add these at the top of your file
const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

// Add this error boundary component
class ErrorBoundary extends React.Component {
  state = { hasError: false };
  
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  
  componentDidCatch(error, info) {
    console.error("App Error:", error, info);
  }
  
  render() {
    return this.state.hasError ? (
      <div className="error-fallback">Authentication flow error - Please refresh</div>
    ) : (
      this.props.children
    );
  }
}

function App() {
  // Add OAuth state tracking
  const [oauthInitialized, setOauthInitialized] = useState(false);

  // Existing token handling (keep this)
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    
    if (token) {
      console.log("Token found in URL on app load");
      localStorage.setItem("authToken", token);
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  // Add OAuth initialization (new)
  useEffect(() => {
    const initializeOAuth = async () => {
      try {
        // Verify backend connectivity
        const ping = await fetch(`${API_BASE_URL}/auth/google/url`);
        if (!ping.ok) throw new Error("OAuth endpoint unavailable");
        setOauthInitialized(true);
      } catch (error) {
        console.error("OAuth initialization failed:", error);
        // Add retry logic or error display here
      }
    };
    
    initializeOAuth();
  }, []);

  return (
    <ErrorBoundary> {/* Wrap existing content */}
      <AuthProvider>
        <Router>
          <Navbar oauthReady={oauthInitialized} /> {/* Pass status to Navbar */}
          <Routes>
            {/* Existing routes remain unchanged */}
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/editor" element={<EditorPage />} />
            <Route path="/auth-redirect" element={<AuthRedirect />} />
            <Route path="/index.html" element={<TokenHandler />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;