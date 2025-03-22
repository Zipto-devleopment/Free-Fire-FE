import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Login() {
  const [adminID, setAdminID] = useState("");
  const [adminPassword, setAdminPassword] = useState("");

  const navigate=useNavigate("")

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!adminID || !adminPassword ) {
      toast.error("⚠ All fields are required!");
      alert("Check id pass")
      return;
    }

    try {
        const response = await axios.post(`${import.meta.env.VITE_BASEURL}/joinRoom/adminID`, {
            id: adminID,
            password: adminPassword,
          });
          toast.success("✅ Room ID & Password updated successfully!");
          navigate("/adminpage")
    } catch (error) {
      toast.error("❌ Error: " + (error.response?.data?.message || "Something went wrong"));
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center text-danger fw-bold">Admin Login</h2>
      <form onSubmit={handleSubmit} className="p-4 shadow rounded bg-light">
        
        {/* Admin ID Input */}
        <div className="mb-3">
          <label className="form-label fw-bold">Admin ID</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Admin ID"
            value={adminID}
            onChange={(e) => setAdminID(e.target.value)}
            required
          />
        </div>

        {/* Admin Password Input */}
        <div className="mb-3">
          <label className="form-label fw-bold">Admin Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter Admin Password"
            value={adminPassword}
            onChange={(e) => setAdminPassword(e.target.value)}
            required
          />
        </div>

        
        {/* <div className="mb-3">
          <label className="form-label fw-bold">Room ID</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Room ID"
            value={roomID}
            onChange={(e) => setRoomID(e.target.value)}
            
          />
        </div>

        
        <div className="mb-3">
          <label className="form-label fw-bold">Room Password</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Room Password"
            value={roomPassword}
            onChange={(e) => setRoomPassword(e.target.value)}
            
          />
        </div> */}

        {/* Submit Button */}
        <button type="submit" className="btn btn-danger w-100">
          Submit
        </button>

      </form>
    </div>
  );
}

export default Login;
