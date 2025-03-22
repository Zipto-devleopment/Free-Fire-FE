import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Room = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { roomID, roomPassword } = location.state || {};

  // Function to copy text to clipboard
  const copyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast.success(`✅ Copied: ${text}`);
      })
      .catch((err) => {
        toast.error("❌ Failed to copy!");
        console.error("Failed to copy:", err);
      });
  };

  if (!roomID || !roomPassword) {
    return (
      <div className="container mt-5">
        <h2 className="text-center text-danger">⚠ Access Denied! Please Wait Room Is Not Create</h2>
        <button className="btn btn-primary mt-3" onClick={() => navigate("/")}>
          Go to Verification Page
        </button>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h3 className="text-center text-success">🎉 Welcome to the Game Room!</h3>
        <hr />
        <p>
          <strong>Room ID:</strong>{" "}
          <span
            className="text-primary cursor-pointer"
            onClick={() => copyToClipboard(roomID)}
            style={{ cursor: "pointer" }}
          >
            {roomID} (Tap to Copy)
          </span>
        </p>
        <p>
          <strong>Room Password:</strong>{" "}
          <span
            className="text-primary cursor-pointer"
            onClick={() => copyToClipboard(roomPassword)}
            style={{ cursor: "pointer" }}
          >
            {roomPassword} (Tap to Copy)
          </span>
        </p>
        <button className="btn btn-secondary mt-3" onClick={() => navigate("/")}>
          Go Back
        </button>
      </div>
    </div>
  );
};

export default Room;