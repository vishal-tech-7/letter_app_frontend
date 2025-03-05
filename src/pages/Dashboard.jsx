import { useEffect, useState, useContext } from "react";
import { listLetters } from "../api/letters";
import { AuthContext } from "../context/AuthContext";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [letters, setLetters] = useState([]);

  useEffect(() => {
    if (!user) {
      console.log("❌ No user logged in, skipping letter fetch.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      console.log("❌ No token in localStorage, skipping letter fetch.");
      return;
    }

    listLetters(token)
      .then((res) => {
        if (res) setLetters(res);
        else console.log("❌ Failed to fetch letters.");
      })
      .catch((err) => console.error("❌ Error fetching letters:", err));
  }, [user]);

  return (
    <div style={{ padding: "32px" }}>
      <h1 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "16px" }}>Your Letters</h1>
      {letters.length === 0 ? (
        <p>No letters found.</p>
      ) : (
        <ul style={{ listStyleType: "disc", paddingLeft: "16px" }}>
          {letters.map((letter) => (
            <li key={letter.id}>{letter.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dashboard;