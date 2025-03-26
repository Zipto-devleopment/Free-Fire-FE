import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const JoinRoom = () => {
  const [GameID, setGameID] = useState("");
  const [GameFee, setGameFee] = useState("5"); // Default to 5rs
  const [roomData, setRoomData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    if (!GameID || !GameFee) {
      setError("Please fill in all fields.");
      toast.error("❌ Please fill in all fields.");
      setLoading(false);
      return;
    }
  
    if (isNaN(GameFee)) {
      setError("Invalid Game Fee. Please select a valid fee.");
      toast.error("❌ Invalid Game Fee.");
      setLoading(false);
      return;
    }
  
    try {
      const verifyResponse = await axios.post(`${import.meta.env.VITE_BASEURL}/joinRoom/verifyUser`, {
        GameID,
        GameFee,
      });
  
      if (verifyResponse.data.message === "Payment verification pending. Please wait for admin approval.") {
        setError(verifyResponse.data.message);
        toast.error("❌ " + verifyResponse.data.message);
        return;
      }
  
      const roomResponse = await axios.get(`${import.meta.env.VITE_BASEURL}/joinRoom/getroomID`);
  
      setRoomData(roomResponse.data);
      setError("");
      toast.success("✅ Verification successful!");
  
      navigate("/room", {
        state: {
          roomID: roomResponse.data.RoomID,
          roomPassword: roomResponse.data.RoomPassword,
        },
      });
    } catch (err) {
      console.error("Error:", err);
      setError(err.response?.data?.message || "Verification failed! Please try again.");
      toast.error("❌ " + (err.response?.data?.message || "Verification failed!"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2 className="text-center mt-4">Join Room</h2>
        <span className="text-danger">Please Wait If You Are Resently send a request to join a room Wait For Admin Approve </span>

      {/* Input Fields */}
      <div className="mb-3">
        <label className="form-label">Game ID</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter your Game ID"
          value={GameID}
          onChange={(e) => setGameID(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Game Fee</label>
        <select
          className="form-control"
          value={GameFee}
          onChange={(e) => setGameFee(e.target.value)}
        >
          <option value="5">5rs</option>
          <option value="10">10rs</option>
          <option value="20">20rs</option>
        </select>
      </div>

      <button className="btn btn-primary w-100" onClick={handleVerify} disabled={loading}>
        {loading ? "Verifying..." : "Verify & Join Room"}
      </button>

      {/* Error Message */}
      {error && <div className="alert alert-danger mt-3">{error}</div>}

      {/* Room Details (after successful verification) */}
      {roomData && (
        <div className="alert alert-success mt-3" id="roomDetails">
          <h5>✅ Verified!</h5>
          <p><strong>Room ID:</strong> {roomData.RoomID}</p>
          <p><strong>Room Password:</strong> {roomData.RoomPassword}</p>
        </div>
      )}
    </div>
  );
};

export default JoinRoom;