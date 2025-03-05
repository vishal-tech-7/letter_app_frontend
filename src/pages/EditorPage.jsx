import Editor from "../components/Editor";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const EditorPage = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!user) {
    navigate("/");
    return null;
  }

  return (
    <div style={{ padding: "32px" }}>
      <h1 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "16px" }}>Letter Editor</h1>
      <Editor />
    </div>
  );
};

export default EditorPage;
