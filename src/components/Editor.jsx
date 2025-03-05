import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { uploadLetter } from "../api/letters";

const Editor = () => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const { user } = useContext(AuthContext);

  const handleSaveToDrive = async () => {
    if (!user) {
      alert("You must be logged in to save.");
      return;
    }

    try {
      await uploadLetter(title, text, user.accessToken);
      alert("Letter saved to Google Drive!");
    } catch (error) {
      console.error("Failed to save letter:", error);
      alert("Error saving letter.");
    }
  };

  return (
    <div style={{ padding: "16px" }}>
      <input
        type="text"
        placeholder="Letter Title"
        style={{ width: "100%", padding: "8px", border: "1px solid #ccc", marginBottom: "8px" }}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        style={{ width: "100%", height: "256px", padding: "8px", border: "1px solid #ccc", borderRadius: "4px" }}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Start writing your letter..."
      />
      <button
        style={{ marginTop: "16px", backgroundColor: "#10B981", padding: "8px 16px", color: "white", borderRadius: "4px", border: "none", cursor: "pointer" }}
        onClick={handleSaveToDrive}
      >
        Save to Google Drive
      </button>
    </div>
  );
};

export default Editor;
