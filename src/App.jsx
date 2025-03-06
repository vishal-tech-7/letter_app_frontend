import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import EditorPage from "./pages/EditorPage";
import AuthRedirect from "./pages/AuthRedirect";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/editor" element={<EditorPage />} />
          {/* Change this route path to match your auth redirect URL */}
          <Route path="/auth-redirect" element={<AuthRedirect />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;